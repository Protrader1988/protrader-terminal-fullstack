const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const alpacaRoutes = require('./routes/alpaca');
const geminiRoutes = require('./routes/gemini');
const githubRoutes = require('./routes/github');
const renderRoutes = require('./routes/render');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/alpaca', alpacaRoutes);
app.use('/api/gemini', geminiRoutes);
app.use('/api/github', githubRoutes);
app.use('/api/render', renderRoutes);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

app.listen(PORT, () => {
  console.log(`🚀 ProTrader Terminal Backend running on port ${PORT}`);
});

module.exports = app;
