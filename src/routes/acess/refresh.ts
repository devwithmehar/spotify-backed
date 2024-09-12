import express, { Request, Response, Router } from 'express';
import {redirectUri , client_id , client_secret } from '../../config.js';
import { Buffer } from 'buffer';

const router = Router();


router.post('/',async(req : Request,res : Response) => {
    try {
 
     const refreshToken = await req.body.refresh_token;
 
  
 
     const url: string = "https://accounts.spotify.com/api/token";
 
 
     const data = {
       grant_type: 'refresh_token',
       refresh_token: refreshToken,
       client_id: client_id
     }
 
     // Convert the data object to a URL-encoded form body
     const formBody: string = Object.keys(data)
     .map((key: string) => {
       const value: string = (data[key as keyof typeof data] as string) || '';
       return encodeURIComponent(key) + '=' + encodeURIComponent(value);
     })
     .join('&');
 
   const response = await fetch(url,{
     method: 'POST',
     headers: {
       'content-type': 'application/x-www-form-urlencoded',
       'Authorization': 'Basic ' + Buffer.from(`${client_id}:${client_secret}`).toString('base64')
     },
     body: formBody
   })
 
   
 
   const result = await response.json();
   res.status(200).send(result);
 
     
    } catch (error) {
       console.log('Error is', error);
    }  
 })


export default router;