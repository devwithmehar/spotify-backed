import express from 'express';
import { corsUrl, environment } from './config.js';
import cors from 'cors';

const app = express();

app.use(express.json({
    limit:"10mb"
}));

app.use(
    express.urlencoded({
        limit: "10mb",
        extended: true,
        parameterLimit: 50000
    }),
);

app.use(cors({
    origin: corsUrl,
    optionsSuccessStatus: 200
}));

export default app;