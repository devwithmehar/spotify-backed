import express from 'express';
import login from './acess/login.js';
import refresh from './acess/refresh.js';

const router = express.Router();


router.use('/login', login);
router.use('/refresh',refresh);



export default router;