import { port } from './config.js';
import app from './app.js';


app.listen(port, () => {
    console.log(`App is listening to the Port ${port}`);
})