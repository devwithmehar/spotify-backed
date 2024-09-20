var express = require('express');
const {redirectUri , client_id , client_secret } = require('../../config/config');
const { Buffer } = require('buffer');

var router = express.Router();


router.post('/',async(req,res) => {
    try {
 
     const refreshToken = await req.body.refresh_token;
 
  
 
     const url = "https://accounts.spotify.com/api/token";
 
 
     const data = {
       grant_type: 'refresh_token',
       refresh_token: refreshToken,
       client_id: client_id
     }
 
     const formBody = Object.keys(data).map(key => {
       return encodeURIComponent(key) + '=' + encodeURIComponent(data[key]);
   }).join('&');
 
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


module.exports = router;