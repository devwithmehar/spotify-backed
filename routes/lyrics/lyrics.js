var express = require('express');
var lyricsSearcher = require('./lyricsSearcher');

var router = express.Router();


router.get("/", async (req, res ) => {
    const artist =  req.query.artist 
    const title =  req.query.title 

    // Get lyrics from the lyricsSearcher function
    const result = await lyricsSearcher(artist, title);

    // Ensure that the response is formatted correctly
    const lyrics = result.lyrics || "No Lyrics Found";
    
    res.json({ lyrics });
  })



module.exports = router;