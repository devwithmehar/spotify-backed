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


  router.post('/auth', async(req, res) =>{
    try {
      const code = await req.body.code;
      const url = 'https://accounts.spotify.com/api/token';
  
      const data = {
        grant_type: 'authorization_code',
        code: code,
        redirect_uri: redirectUri
      }
  
      const formBody = Object.keys(data).map(key => {
        return encodeURIComponent(key) + '=' + encodeURIComponent(data[key]);
    }).join('&');
  
    const credentials = `${client_id}:${client_secret}`;
    const encodedCredentials = Buffer.from(credentials).toString('base64');
  
    
  
      const response = await fetch(url,{
        method: 'POST',
        headers: {
          'content-type': 'application/x-www-form-urlencoded',
          'Authorization': 'Basic ' + Buffer.from(`${spotify_client_id}:${spotify_client_secret}`).toString('base64')
        },
        body: formBody
      })
  
      
  
      const result = await response.json();
  
      // Check if the response contains an error
      if (result.error === 'invalid_grant' && result.error_description === 'Authorization code expired') {
        return res.status(400).json({ error: 'Authorization code expired' });
      }
  
      res.status(200).send(result);
  
      
    } catch (error) {
      res.status(500).status(error);
    }
  })
  
  

module.exports = router;