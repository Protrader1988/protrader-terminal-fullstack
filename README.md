# 🚀 ProTrader Terminal - Python/Streamlit Edition

**100% Python** trading dashboard with paper trading, backtesting, and crypto support.

## 🎯 Features
- 📈 **Live Paper Trading** (Alpaca stocks)
- ₿ **Crypto Trading** (Gemini sandbox)
- 📊 **Stock Screener**
- ⏮️ **Backtesting Engine** (up to 3 years historical data)
- 🤖 **Trading Bots**: WickMasterPro, MomentumBot, MeanReversionBot
- 📉 **Risk Metrics**: CVaR, Sharpe Ratio, Max Drawdown
- 🚨 **Price Alerts**
- 💰 **P&L Tracking**

## 🛠️ Setup

### 1. Clone Repository
```bash
git clone https://github.com/Protrader1988/protrader-terminal-fullstack.git
cd protrader-terminal-fullstack
```

### 2. Create Virtual Environment
```bash
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

### 3. Install Dependencies
```bash
pip install -r requirements.txt
```

### 4. Configure Environment Variables
Create `.env` file:
```env
ALPACA_KEY=your_alpaca_paper_key
ALPACA_SECRET=your_alpaca_paper_secret
GEMINI_KEY=your_gemini_sandbox_key
GEMINI_SECRET=your_gemini_sandbox_secret
```

### 5. Run Application
```bash
streamlit run app.py
```

## 🚀 Deploy to Render

1. Push to GitHub
2. Connect Render to your repo
3. Build Command: `pip install -r requirements.txt`
4. Start Command: `streamlit run app.py --server.port=$PORT --server.address=0.0.0.0`
5. Add environment variables in Render dashboard

## 📁 Project Structure
```
protrade/
├── data/         # API clients & market data
├── bots/         # Trading bots
├── features/     # Screener, alerts, portfolio
├── backtest/     # Backtesting engine
└── ui/           # Streamlit UI components
```

## 🤖 Trading Bots
- **WickMasterPro**: Wick rejection patterns
- **MomentumBot**: RSI-based signals
- **MeanReversionBot**: Bollinger Bands strategy

## 📊 Backtesting
- Historical data: 1 month to 3 years
- Intervals: 1m, 5m, 15m, 30m, 1h, 1d
- Metrics: Win rate, Sharpe, CVaR, drawdown
- Stress testing with -20% shock

## 🔐 Security
- Paper trading only (Alpaca)
- Sandbox mode only (Gemini)
- No real money at risk

## 📝 License
MIT License - See LICENSE file

## 🙏 Credits
Built with Streamlit, Alpaca, Gemini, and yfinance
