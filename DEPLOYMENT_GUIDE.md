# 🚀 ProTrader Terminal - Deployment Guide

## Overview
This guide covers deploying ProTrader Terminal to Render.com using the Streamlit framework.

## 📋 Prerequisites
- GitHub account with repository access
- Render.com account (free tier available)
- API credentials for:
  - Alpaca (Paper Trading): https://alpaca.markets/
  - Gemini (Sandbox): https://exchange.gemini.com/

## 🔧 Render.com Deployment

### Option 1: Automatic Deployment (Recommended)
The repository includes `render.yaml` for automatic deployment:

1. **Connect to Render:**
   - Go to https://render.com/
   - Click "New +" → "Blueprint"
   - Connect your GitHub repository
   - Render will automatically detect `render.yaml`

2. **Configure Environment Variables:**
   In Render dashboard, add these environment variables:
   ```
   ALPACA_KEY=your_alpaca_paper_trading_key
   ALPACA_SECRET=your_alpaca_paper_trading_secret
   GEMINI_KEY=your_gemini_sandbox_key
   GEMINI_SECRET=your_gemini_sandbox_secret
   ```

3. **Deploy:**
   - Click "Apply" to start deployment
   - Render will automatically build and deploy
   - Your app will be live at: `https://your-app-name.onrender.com`

### Option 2: Manual Web Service Setup

1. **Create New Web Service:**
   - Go to Render Dashboard
   - Click "New +" → "Web Service"
   - Connect GitHub repository

2. **Configure Build Settings:**
   ```
   Name: protrader-terminal
   Runtime: Python 3
   Build Command: pip install -r requirements.txt
   Start Command: streamlit run app.py --server.port=$PORT --server.address=0.0.0.0 --server.headless=true
   ```

3. **Add Environment Variables:**
   Same as Option 1 above

4. **Deploy:**
   Click "Create Web Service"

## 🔐 Environment Variables

### Required for Production:
```bash
ALPACA_KEY=<your-alpaca-key>
ALPACA_SECRET=<your-alpaca-secret>
GEMINI_KEY=<your-gemini-key>
GEMINI_SECRET=<your-gemini-secret>
```

### Optional:
```bash
ENVIRONMENT=paper  # or 'production' for live trading
PYTHON_VERSION=3.11.0
```

## 🧪 Local Development

1. **Clone Repository:**
   ```bash
   git clone https://github.com/Protrader1988/protrader-terminal-fullstack.git
   cd protrader-terminal-fullstack
   ```

2. **Create Virtual Environment:**
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. **Install Dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

4. **Configure Secrets:**
   Create `.streamlit/secrets.toml`:
   ```toml
   ALPACA_KEY = "your_key"
   ALPACA_SECRET = "your_secret"
   GEMINI_KEY = "your_key"
   GEMINI_SECRET = "your_secret"
   ```

5. **Run Application:**
   ```bash
   streamlit run app.py
   ```
   Access at: http://localhost:8501

## 📦 Project Structure
```
protrader-terminal-fullstack/
├── app.py                    # Main Streamlit application
├── requirements.txt          # Python dependencies
├── runtime.txt              # Python version specification
├── render.yaml              # Render deployment config
├── .env.example             # Environment variables template
├── .streamlit/
│   ├── config.toml          # Streamlit production settings
│   └── secrets.toml         # Local API credentials (git-ignored)
└── protrade/                # Core application modules
    ├── data/                # Market data fetching
    ├── bots/                # Trading bots
    ├── features/            # Stock screener, indicators
    ├── backtest/            # Backtesting engine
    └── ui/                  # Streamlit UI components
```

## ✅ Deployment Checklist

- [ ] GitHub repository is up to date
- [ ] `render.yaml` is present in repository root
- [ ] `requirements.txt` includes all dependencies
- [ ] `runtime.txt` specifies Python 3.11.0
- [ ] Environment variables configured in Render
- [ ] API credentials tested (paper/sandbox accounts)
- [ ] `.streamlit/config.toml` configured for production
- [ ] `.streamlit/secrets.toml` in .gitignore
- [ ] Application deployed and accessible

## 🔄 Continuous Deployment

Render automatically redeploys when you push to the main branch:

```bash
git add .
git commit -m "Update feature"
git push origin main
```

Render will detect the push and automatically rebuild/redeploy.

## 🐛 Troubleshooting

### Build Failures:
- Check Render logs for missing dependencies
- Verify Python version matches `runtime.txt`
- Ensure all imports in `app.py` are available

### Runtime Errors:
- Verify environment variables are set correctly
- Check API credentials are valid
- Review Render logs for stack traces

### Port Issues:
- Ensure start command uses `$PORT` variable
- Verify `--server.address=0.0.0.0` is set

### API Connection Errors:
- Confirm using paper/sandbox endpoints
- Check API key permissions
- Verify rate limits not exceeded

## 📚 Additional Resources

- [Render Documentation](https://render.com/docs)
- [Streamlit Documentation](https://docs.streamlit.io/)
- [Alpaca API Docs](https://alpaca.markets/docs/)
- [Gemini API Docs](https://docs.gemini.com/)

## 🔒 Security Notes

- **Never commit API credentials** to GitHub
- Use environment variables for all secrets
- Keep `.streamlit/secrets.toml` in `.gitignore`
- Use paper/sandbox accounts for testing
- Enable 2FA on all exchange accounts

## 📞 Support

For issues or questions:
- GitHub Issues: Repository issues tab
- Render Support: https://render.com/support
- Streamlit Community: https://discuss.streamlit.io/

---

**Last Updated:** December 2024
**Version:** 2.0 (Python/Streamlit Architecture)
