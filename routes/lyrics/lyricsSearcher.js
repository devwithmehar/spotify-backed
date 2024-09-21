const axios = require('axios');


const API_URL = 'https://api.lyrics.ovh/v1';


const lyricsSearcher = async (artist, title )  => {
    const url = `${API_URL}/${artist}/${title}`;
    
    try {
        // Set a timeout of 10 seconds (10000 milliseconds)
        const response = await axios.get(url, {
            timeout: 10000 // Timeout in milliseconds
        });

        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            // Handle axios-specific errors
            if (error.code === 'ECONNABORTED') {
                // Handle timeout error
                console.error('Request timed out');
                return { lyrics: 'No lyrics found' };
            } else {
                // Handle other axios errors
                console.error('Error fetching lyrics:', error.message);
                return { lyrics: 'No lyrics found' };
            }
        } else {
            // Handle non-axios errors
            console.error('Unexpected error:', error);
            return { lyrics: 'No lyrics found' };
        }
    }
};



module.exports = lyricsSearcher;