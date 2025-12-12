const express = require('express');
const router = express.Router();

// Health check endpoint
router.get('/health', (req, res) => {
    res.status(200).json({
          status: 'healthy',
          service: 'protrader-backend',
          timestamp: new Date().toISOString(),
          uptime: process.uptime()
    });
});

// Deployment status endpoint
router.get('/status', (req, res) => {
    res.status(200).json({
          service: 'ProTrader Terminal Backend',
          version: '1.0.0',
          environment: process.env.NODE_ENV || 'development',
          timestamp: new Date().toISOString(),
          features: {
                  alpaca: !!process.env.ALPACA_API_KEY,
                  gemini: !!process.env.GEMINI_API_KEY
          }
    });
});

// Service info endpoint
router.get('/info', (req, res) => {
    res.status(200).json({
          name: 'ProTrader Terminal Backend',
          description: 'Real-time trading backend service',
          version: '1.0.0',
          endpoints: {
                  alpaca: '/api/alpaca',
                  gemini: '/api/gemini',
                  github: '/api/github',
                  render: '/api/render'
          }
    });
});

// Metrics endpoint (basic)
router.get('/metrics', (req, res) => {
    res.status(200).json({
          uptime: process.uptime(),
          memory: process.memoryUsage(),
          timestamp: new Date().toISOString(),
          platform: process.platform,
          nodeVersion: process.version
    });
});

module.exports = router;
