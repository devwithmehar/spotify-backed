import { Request, Response, Router } from 'express';
import lyricsSearcher from './lyricsSearcher.js';

const router = Router();

router.get("/", async (req: Request, res: Response ) => {
    const artist = typeof req.query.artist === 'string' ? req.query.artist : '';
    const title = typeof req.query.title === 'string' ? req.query.title : '';

    // Get lyrics from the lyricsSearcher function
    const result = await lyricsSearcher(artist, title);

    // Ensure that the response is formatted correctly
    const lyrics = result.lyrics || "No Lyrics Found";
    
    res.json({ lyrics });
  })
  

export default router;