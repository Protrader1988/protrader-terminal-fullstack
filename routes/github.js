const express = require('express');
const router = express.Router();

// GitHub webhook endpoint for deployment notifications
router.post('/webhook', (req, res) => {
    try {
          const event = req.headers['x-github-event'];
          const payload = req.body;

      console.log(`GitHub webhook received: ${event}`);

      // Handle push events
      if (event === 'push') {
              console.log('Push event detected:', {
                        ref: payload.ref,
                        commits: payload.commits?.length || 0,
                        repository: payload.repository?.full_name
              });
      }

      res.status(200).json({ message: 'Webhook received successfully' });
    } catch (error) {
          console.error('GitHub webhook error:', error.message);
          res.status(500).json({ error: error.message });
    }
});

// Get repository information
router.get('/repo', (req, res) => {
    try {
          const repoInfo = {
                  name: 'protrader-terminal-fullstack',
                  owner: 'Protrader1988',
                  branch: 'main',
                  status: 'active'
          };
          res.json(repoInfo);
    } catch (error) {
          console.error('GitHub repo info error:', error.message);
          res.status(500).json({ error: error.message });
    }
});

module.exports = router;
