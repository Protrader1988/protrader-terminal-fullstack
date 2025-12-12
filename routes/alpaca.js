const express = require('express');
const router = express.Router();
const Alpaca = require('@alpacahq/alpaca-trade-api');

// Initialize Alpaca client
const alpaca = new Alpaca({
  keyId: process.env.ALPACA_API_KEY,
  secretKey: process.env.ALPACA_SECRET_KEY,
  paper: true,
  usePolygon: false
});

// Get account information
router.get('/account', async (req, res) => {
  try {
    const account = await alpaca.getAccount();
    res.json(account);
  } catch (error) {
    console.error('Error fetching account:', error);
    res.status(500).json({ error: error.message });
  }
});

// Get positions
router.get('/positions', async (req, res) => {
  try {
    const positions = await alpaca.getPositions();
    res.json(positions);
  } catch (error) {
    console.error('Error fetching positions:', error);
    res.status(500).json({ error: error.message });
  }
});

// Get orders
router.get('/orders', async (req, res) => {
  try {
    const orders = await alpaca.getOrders({ status: 'all' });
    res.json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ error: error.message });
  }
});

// Place an order
router.post('/orders', async (req, res) => {
  try {
    const { symbol, qty, side, type, time_in_force } = req.body;
    const order = await alpaca.createOrder({
      symbol,
      qty,
      side,
      type,
      time_in_force
    });
    res.json(order);
  } catch (error) {
    console.error('Error placing order:', error);
    res.status(500).json({ error: error.message });
  }
});

// Get market data
router.get('/bars/:symbol', async (req, res) => {
  try {
    const { symbol } = req.params;
    const bars = await alpaca.getBarsV2(symbol, {
      limit: 100,
      timeframe: '1Day'
    });
    res.json(bars);
  } catch (error) {
    console.error('Error fetching bars:', error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
