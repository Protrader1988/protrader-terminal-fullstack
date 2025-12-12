const express = require('express');
const axios = require('axios');
const router = express.Router();

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

// Get user repositories
router.get('/repos', async (req, res) => {
  try {
    const response = await axios.get('https://api.github.com/user/repos', {
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`,
        Accept: 'application/vnd.github.v3+json'
      }
    });
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create repository
router.post('/repos', async (req, res) => {
  try {
    const { name, description, private: isPrivate } = req.body;
    const response = await axios.post(
      'https://api.github.com/user/repos',
      {
        name,
        description,
        private: isPrivate || false
      },
      {
        headers: {
          Authorization: `token ${GITHUB_TOKEN}`,
          Accept: 'application/vnd.github.v3+json'
        }
      }
    );
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
