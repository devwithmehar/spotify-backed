import { Request, Response, Router } from 'express'; 
import login from './acess/login.js';
import refresh from './acess/refresh.js';
import { client_url } from '../config.js';
import lyrics from './lyrics/lyrics.js';


const router = Router();

router.get('/', (req: Request, res: Response) => {
    if (!client_url) {
        console.error('Error: client_url is not defined');
        return res.status(500).send('Internal Server Error: client_url is not defined');
    }

    try {
        res.redirect(client_url);
    } catch (error) {
        console.error('Error during redirect:', error);
        res.status(500).send('Internal Server Error during redirect');
    }
});

router.get('/health', (req: Request, res: Response) => {
    res.status(200).send('OK');
});

router.use('/login', login);
router.use('/refresh',refresh);
router.use('/lyrics',lyrics);


export default router;