import { Request, Response, Router } from 'express'; 
import login from './acess/login.js';
import refresh from './acess/refresh.js';
import { client_url } from '../config.js';

const router = Router();

router.get('/', (req: Request, res: Response) => {
    if (!client_url) {
        throw new Error('client_url is not defined');
    }
    res.redirect(client_url);
})


router.use('/login', login);
router.use('/refresh',refresh);



export default router;