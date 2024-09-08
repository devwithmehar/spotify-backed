import 'dotenv/config';

export const environment = process.env.NODE_ENV;
export const port = process.env.PORT || 5000;

export const corsUrl = process.env.CORS_URL;