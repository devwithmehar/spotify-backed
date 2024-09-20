require('dotenv').config();

const PORT = process.env.PORT;

const corsUrl = process.env.CORS_URL;

const redirectUri = process.env.REDIRECT_URI;
 const client_id = process.env.CLIENT_ID;
const client_secret = process.env.CLIENT_SECRET;

 const client_url = process.env.CLIENT_URL;

module.exports = {
     PORT,
     corsUrl,
     redirectUri,
     client_id,
     client_secret

    };