const express = require('express');
const axios = require('axios');
const crypto = require('crypto');
const router = express.Router();

// Gemini API credentials (hardcoded for deployment)
const GEMINI_API_KEY = process.env.GEMINI_API_KEY || 'YOUR_GEMINI_API_KEY';
const GEMINI_API_SECRET = process.env.GEMINI_API_SECRET || 'YOUR_GEMINI_SECRET_KEY';
const GEMINI_BASE_URL = 'https://api.sandbox.gemini.com';

// Helper function to create authenticated request
function createGeminiRequest(endpoint, payload = {}) {
  const nonce = Date.now();
  const payloadWithNonce = { ...payload, nonce, request: endpoint };
  const encodedPayload = Buffer.from(JSON.stringify(payloadWithNonce)).toString('base64');
  const signature = crypto
    .createHmac('sha384', GEMINI_API_SECRET)
    .update(encodedPayload)
    .digest('hex');

  return {
    headers: {
      'Content-Type': 'text/plain',
      'X-GEMINI-APIKEY': GEMINI_API_KEY,
      'X-GEMINI-PAYLOAD': encodedPayload,
      'X-GEMINI-SIGNATURE': signature,
      'Cache-Control': 'no-cache'
    }
  };
}

// Get account balance
router.get('/balances', async (req, res) => {
  try {
    const endpoint = '/v1/balances';
    const config = createGeminiRequest(endpoint);
    const response = await axios.post(`${GEMINI_BASE_URL}${endpoint}`, {}, config);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get ticker
router.get('/ticker/:symbol', async (req, res) => {
  try {
    const { symbol } = req.params;
    const response = await axios.get(`${GEMINI_BASE_URL}/v1/pubticker/${symbol}`);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Place order
router.post('/orders', async (req, res) => {
  try {
    const { symbol, amount, price, side, type } = req.body;
    const endpoint = '/v1/order/new';
    const payload = {
      symbol,
      amount,
      price,
      side,
      type: type || 'exchange limit'
    };
    const config = createGeminiRequest(endpoint, payload);
    const response = await axios.post(`${GEMINI_BASE_URL}${endpoint}`, {}, config);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get active orders
router.get('/orders', async (req, res) => {
  try {
    const endpoint = '/v1/orders';
    const config = createGeminiRequest(endpoint);
    const response = await axios.post(`${GEMINI_BASE_URL}${endpoint}`, {}, config);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
