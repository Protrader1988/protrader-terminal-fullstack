const express = require('express');
const axios = require('axios');
const router = express.Router();

const RENDER_API_KEY = process.env.RENDER_API_KEY;
const RENDER_BASE_URL = 'https://api.render.com/v1';

// Get services
router.get('/services', async (req, res) => {
  try {
    const response = await axios.get(`${RENDER_BASE_URL}/services`, {
      headers: {
        Authorization: `Bearer ${RENDER_API_KEY}`,
        Accept: 'application/json'
      }
    });
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Deploy service
router.post('/deploy/:serviceId', async (req, res) => {
  try {
    const { serviceId } = req.params;
    const response = await axios.post(
      `${RENDER_BASE_URL}/services/${serviceId}/deploys`,
      {},
      {
        headers: {
          Authorization: `Bearer ${RENDER_API_KEY}`,
          Accept: 'application/json'
        }
      }
    );
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
