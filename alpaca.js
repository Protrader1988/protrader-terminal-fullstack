const express = require('express');
const Alpaca = require('@alpacahq/alpaca-trade-api');
const router = express.Router();

// Initialize Alpaca client with hardcoded keys for deployment
const alpaca = new Alpaca({
  keyId: process.env.ALPACA_API_KEY || 'PK5XZDGQ2YBMQ9QSM9DZ',
  secretKey: process.env.ALPACA_SECRET_KEY || 'YOUR_ALPACA_SECRET_KEY',
  paper: true,
  usePolygon: false
});

// Get account information
router.get('/account', async (req, res) => {
  try {
    const account = await alpaca.getAccount();
    res.json(account);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get positions
router.get('/positions', async (req, res) => {
  try {
    const positions = await alpaca.getPositions();
    res.json(positions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get orders
router.get('/orders', async (req, res) => {
  try {
    const orders = await alpaca.getOrders({ status: 'all', limit: 50 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Place order
router.post('/orders', async (req, res) => {
  try {
    const { symbol, qty, side, type, time_in_force } = req.body;
    const order = await alpaca.createOrder({
      symbol,
      qty,
      side,
      type: type || 'market',
      time_in_force: time_in_force || 'gtc'
    });
    res.json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get bars (historical data)
router.get('/bars/:symbol', async (req, res) => {
  try {
    const { symbol } = req.params;
    const { timeframe, start, end, limit } = req.query;

    const bars = await alpaca.getBarsV2(symbol, {
      timeframe: timeframe || '1Day',
      start: start,
      end: end,
      limit: limit || 100
    });

    const barsArray = [];
    for await (const bar of bars) {
      barsArray.push(bar);
    }

    res.json(barsArray);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get quote
router.get('/quote/:symbol', async (req, res) => {
  try {
    const { symbol } = req.params;
    const quote = await alpaca.getLatestTrade(symbol);
    res.json(quote);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
