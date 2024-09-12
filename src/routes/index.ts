import express from 'express';
import login from './acess/login.js';

const router = express.Router();


router.use('/login', login);



export default router;