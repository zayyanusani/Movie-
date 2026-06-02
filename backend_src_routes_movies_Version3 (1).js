const express = require('express');
const axios = require('axios');
const router = express.Router();

const TMDB_API_KEY = process.env.TMDB_API_KEY;

router.get('/search', async (req, res) => {
  const { query } = req.query;
  if (!query) return res.status(400).json({ msg: 'Query is required' });
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/search/movie`,
      {
        params: {
          api_key: TMDB_API_KEY,
          query,
        },
        headers: {
          'Accept': 'application/json',
        },
      }
    );
    // Ensure response is valid JSON
    if (response.data && typeof response.data === 'object') {
      res.json(response.data);
    } else {
      res.status(500).json({ msg: 'Invalid response format from TMDB' });
    }
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ 
      msg: 'TMDB search failed', 
      error: error.message 
    });
  }
});

module.exports = router;