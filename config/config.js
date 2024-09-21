require('dotenv').config();

const PORT = process.env.PORT;



const redirectUri = process.env.REDIRECT_URI;
 const client_id = process.env.CLIENT_ID;
const client_secret = process.env.CLIENT_SECRET;

const client_url = process.env.CLIENT_URL;



module.exports = {
     PORT,
    
     redirectUri,
     client_id,
     client_secret,
     client_url

    };