const express = require('express');
const router = express.Router();
const axios = require('axios');

// Gemini API configuration
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_API_SECRET = process.env.GEMINI_API_SECRET;
const GEMINI_BASE_URL = 'https://api.gemini.com/v1';

// Helper function to create Gemini API headers
function createGeminiHeaders(payload) {
    const crypto = require('crypto');
    const nonce = Date.now().toString();
    const b64Payload = Buffer.from(JSON.stringify(payload)).toString('base64');
    const signature = crypto
      .createHmac('sha384', GEMINI_API_SECRET)
      .update(b64Payload)
      .digest('hex');

  return {
        'Content-Type': 'text/plain',
        'X-GEMINI-APIKEY': GEMINI_API_KEY,
        'X-GEMINI-PAYLOAD': b64Payload,
        'X-GEMINI-SIGNATURE': signature,
        'Cache-Control': 'no-cache'
  };
}

// Get account balance
router.get('/balance', async (req, res) => {
    try {
          const payload = {
                  request: '/v1/balances',
                  nonce: Date.now().toString()
          };

      const response = await axios.post(
              `${GEMINI_BASE_URL}/balances`,
        {},
        { headers: createGeminiHeaders(payload) }
            );

      res.json(response.data);
    } catch (error) {
          console.error('Gemini balance error:', error.response?.data || error.message);
          res.status(500).json({ error: error.message });
    }
});

// Get ticker data
router.get('/ticker/:symbol', async (req, res) => {
    try {
          const { symbol } = req.params;
          const response = await axios.get(`${GEMINI_BASE_URL}/pubticker/${symbol}`);
          res.json(response.data);
    } catch (error) {
          console.error('Gemini ticker error:', error.message);
          res.status(500).json({ error: error.message });
    }
});

// Place order
router.post('/order', async (req, res) => {
    try {
          const { symbol, amount, price, side, type } = req.body;

      const payload = {
              request: '/v1/order/new',
              nonce: Date.now().toString(),
              symbol,
              amount: amount.toString(),
              price: price.toString(),
              side,
              type: type || 'exchange limit'
      };

      const response = await axios.post(
              `${GEMINI_BASE_URL}/order/new`,
        {},
        { headers: createGeminiHeaders(payload) }
            );

      res.json(response.data);
    } catch (error) {
          console.error('Gemini order error:', error.response?.data || error.message);
          res.status(500).json({ error: error.message });
    }
});

module.exports = router;
