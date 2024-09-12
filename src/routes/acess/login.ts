import express, { Request, Response, Router } from 'express';
import {redirectUri , client_id , client_secret } from '../../config.js';
import { Buffer } from 'buffer';


const router = Router();

function generateRandomString(length: number) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result: string = '';
    const charactersLength = characters.length;
  
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
  
    return result;
  }

  router.get('/', (req: Request, res: Response): void => {
    const state: string = generateRandomString(16);
    const scope: string = 'streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state';
  
    const data = {
      client_id: client_id,
      response_type: 'code',
      redirect_uri: redirectUri,
      state: state,
      scope: scope
    };
  
    const formBody: string = Object.keys(data)
  .map((key: string) => {
    const value: string = (data[key as keyof typeof data] as string) || ''; // Default to empty string if undefined
    return encodeURIComponent(key) + '=' + encodeURIComponent(value);
  })
  .join('&');
  
    res.redirect('https://accounts.spotify.com/authorize?' + formBody);
  });



  router.post('/auth', async (req: Request, res: Response) => {
    try {
      // Extracting code from the request body
      const code: string = req.body.code;
  
      // Define the token endpoint and data to be sent
      const url: string = 'https://accounts.spotify.com/api/token';
      const data = {
        grant_type: 'authorization_code',
        code: code,
        redirect_uri: redirectUri
      };
  
      // Convert the data object to a URL-encoded form body
      const formBody: string = Object.keys(data)
        .map((key: string) => {
          const value: string = (data[key as keyof typeof data] as string) || '';
          return encodeURIComponent(key) + '=' + encodeURIComponent(value);
        })
        .join('&');
  
      // Create the credentials and encode them in base64
      const credentials: string = `${client_id}:${client_secret}`;
      const encodedCredentials: string = Buffer.from(credentials).toString('base64');
  
      // Send a POST request to the Spotify token endpoint
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'content-type': 'application/x-www-form-urlencoded',
          'Authorization': 'Basic ' + Buffer.from(`${client_id}:${client_secret}`).toString('base64')
        },
        body: formBody
      });
  
      const result = await response.json();
  
      // Check if there's an invalid grant error
      if (result.error === 'invalid_grant' && result.error_description === 'Authorization code expired') {
        // Returning the response as Promise<void>
        return res.status(400).json({ error: 'Authorization code expired' });
      }
  
      // Send the successful result back to the client
      res.status(200).json(result);
  
    } catch (error) {
      // In case of an error, send a 500 status with the error message
      res.status(500).json({ error: 'Internal server error', details: error });
    }
  });

  export default router;