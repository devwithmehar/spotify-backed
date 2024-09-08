import 'dotenv/config';

export const environment = process.env.NODE_ENV;
export const port = process.env.PORT || 8000;

export const corsUrl = process.env.CORS_URL;

export const redirectUri = process.env.REDIRECT_URI;
export const client_id = process.env.CLIENT_ID;
export const client_secret = process.env.CLIENT_SECRET;