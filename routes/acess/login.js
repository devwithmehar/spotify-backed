var express = require('express');
const {redirectUri , client_id , client_secret } = require('../../config/config');
const { Buffer } = require('buffer');



var router = express.Router();

function generateRandomString(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result= '';
    const charactersLength = characters.length;
  
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
  
    return result;
  }


  router.get('/', function(req, res) {


    var state = generateRandomString(16);
    var scope = 'streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state';
  
    const data = {
      client_id: client_id,
      response_type: 'code',
      redirect_uri: redirectUri,
      state: state,
      scope: scope
    }
  
    const formBody = Object.keys(data).map(key => {
      return encodeURIComponent(key) + '=' + encodeURIComponent(data[key]);
  }).join('&');
  
    res.redirect('https://accounts.spotify.com/authorize?' + formBody);
  });


  router.post('/auth', async (req, res) => {
    try {
      console.log('API is called');
  
      const code = req.body.code;
      if (!code) {
        return res.status(400).json({ error: 'Authorization code is missing' });
      }
  
      const url = 'https://accounts.spotify.com/api/token';
      const data = {
        grant_type: 'authorization_code',
        code: code,
        redirect_uri: redirectUri
      };
  
      const formBody = Object.keys(data).map(key => {
        return encodeURIComponent(key) + '=' + encodeURIComponent(data[key]);
      }).join('&');
  
      const credentials = `${client_id}:${client_secret}`;
      const encodedCredentials = Buffer.from(credentials).toString('base64');
  
      
  
      const fetchWithTimeout = (url, options, timeout = 10000) => {
        return Promise.race([
          fetch(url, options),
          new Promise((_, reject) =>
            setTimeout(() => reject(new Error('Request timed out')), timeout)
          )
        ]);
      };
  
      const response = await fetchWithTimeout(url, {
        method: 'POST',
        headers: {
          'content-type': 'application/x-www-form-urlencoded',
          'Authorization': 'Basic ' + encodedCredentials
        },
        body: formBody
      }, 10000); // 10-second timeout
  
      if (!response.ok) {
        const errorDetails = await response.text();
        return res.status(response.status).json({ error: 'Failed to fetch token', details: errorDetails });
      }
  
      const result = await response.json();
  
      // Check if the response contains an error
      if (result.error === 'invalid_grant' && result.error_description === 'Authorization code expired') {
        return res.status(400).json({ error: 'Authorization code expired' });
      }
  
     
      res.status(200).json(result);
  
    } catch (error) {
      console.error('Error occurred:', error);
      res.status(500).json({ error: 'Internal Server Error', details: error.message });
    }
  });
  
  
  

module.exports = router;