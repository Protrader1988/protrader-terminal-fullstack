# ProTrader Terminal

A professional full-stack trading platform with real-time market data, automated trading bots, and portfolio management.

![ProTrader Terminal](https://img.shields.io/badge/version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)

## 🚀 Features

- **Real-time Market Data**: Integration with Alpaca and Gemini APIs
- **Automated Trading Bots**: Create and manage custom trading strategies
- **Portfolio Management**: Track positions, orders, and performance
- **Advanced Charting**: Interactive charts with multiple timeframes
- **Multi-Exchange Support**: Trade on both stock and crypto markets

## 📋 Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Alpaca API account (Paper trading enabled)
- Gemini API account (Sandbox mode)

## 🔧 Installation

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/protrader-terminal.git
cd protrader-terminal
```

### 2. Install Backend Dependencies

```bash
cd backend
npm install
```

### 3. Install Frontend Dependencies

```bash
cd ../frontend
npm install
```

### 4. Configure Environment Variables

Create a `.env` file in the backend directory:

```bash
cd ../backend
cp .env.example .env
```

Edit `.env` and add your API keys:

```env
# Alpaca API Keys
ALPACA_API_KEY=PK5XZDGQ2YBMQ9QSM9DZ
ALPACA_SECRET_KEY=your_alpaca_secret_key_here

# Gemini API Keys
GEMINI_API_KEY=your_gemini_api_key_here
GEMINI_API_SECRET=your_gemini_secret_key_here

# Optional: GitHub and Render Integration
GITHUB_TOKEN=your_github_token_here
RENDER_API_KEY=your_render_api_key_here

# Server Configuration
PORT=5000
```

## 🏃 Running Locally

### Start Backend Server

```bash
cd backend
npm start
```

The backend server will run on `http://localhost:5000`

### Start Frontend Development Server

Open a new terminal:

```bash
cd frontend
npm start
```

The frontend will run on `http://localhost:3000`

## 🌐 Deployment

### Deploy to Render

1. **Backend Deployment**:
   - Go to [Render Dashboard](https://dashboard.render.com)
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Configure:
     - Build Command: `cd backend && npm install`
     - Start Command: `cd backend && npm start`
     - Add environment variables from `.env`

2. **Frontend Deployment**:
   - Create another Web Service
   - Configure:
     - Build Command: `cd frontend && npm install && npm run build`
     - Start Command: `npm install -g serve && serve -s frontend/build`

### Deploy to Vercel (Frontend)

```bash
cd frontend
npm install -g vercel
vercel --prod
```

### Deploy to Heroku (Backend)

```bash
cd backend
heroku create protrader-backend
git push heroku main
heroku config:set ALPACA_API_KEY=your_key_here
```

## 📚 API Documentation

### Alpaca Endpoints

- `GET /api/alpaca/account` - Get account information
- `GET /api/alpaca/positions` - Get open positions
- `GET /api/alpaca/orders` - Get orders
- `POST /api/alpaca/orders` - Place new order
- `GET /api/alpaca/bars/:symbol` - Get historical data
- `GET /api/alpaca/quote/:symbol` - Get latest quote

### Gemini Endpoints

- `GET /api/gemini/balances` - Get account balances
- `GET /api/gemini/ticker/:symbol` - Get ticker data
- `POST /api/gemini/orders` - Place order
- `GET /api/gemini/orders` - Get active orders

## 🔐 API Keys Setup

### Alpaca API

1. Go to [Alpaca](https://alpaca.markets/)
2. Sign up for a paper trading account
3. Navigate to "Your API Keys" section
4. Generate new API keys
5. Copy API Key and Secret Key to `.env`

### Gemini API

1. Go to [Gemini](https://www.gemini.com/)
2. Create an account
3. Navigate to API Settings
4. Create new API key with trading permissions
5. Copy API Key and Secret to `.env`

## 🛠️ Technology Stack

**Frontend:**
- React 18
- Recharts for charting
- Axios for API calls
- Material-UI components

**Backend:**
- Node.js
- Express.js
- Alpaca Trade API
- WebSocket for real-time data

## 📱 Screenshots

### Dashboard
View your portfolio performance, positions, and market overview.

### Trading Bots
Create and manage automated trading strategies.

### Charts
Advanced charting with multiple timeframes and indicators.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## ⚠️ Disclaimer

This software is for educational purposes only. Use at your own risk. The authors and contributors are not responsible for any financial losses incurred while using this software.

## 📞 Support

For support, email support@protrader.com or open an issue on GitHub.

## 🔄 Version History

- **1.0.0** (2025-01-11)
  - Initial release
  - Alpaca and Gemini integration
  - Trading bot framework
  - Real-time charts
  - Portfolio management

---

Made with ❤️ by ProTrader Team
