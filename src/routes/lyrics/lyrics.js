import lyricsFinder from 'lyrics-finder';
import { Router } from 'express';

const router = Router();

router.get("/", async (req, res) => {
  
    const lyrics =
      (await lyricsFinder(req.query.artist, req.query.title)) || "No Lyrics Found"
    res.json({ lyrics })
  })
  
export default router;