# 🔧 PROTRADER-TERMINAL FIX CHECKLIST

**Quick Reference for Implementation**

---

## ✅ PHASE 1: CRITICAL FIXES (15 minutes)

### [ ] Fix 1: Alpaca Environment Variables
**File:** `protrade/data/alpaca_client.py`
**Lines:** 9-10

```python
# CHANGE FROM:
os.getenv('ALPACA_API_KEY')
os.getenv('ALPACA_SECRET_KEY')

# CHANGE TO:
os.getenv('ALPACA_KEY')
os.getenv('ALPACA_SECRET')
```

---

### [ ] Fix 2: Gemini Environment Variables
**File:** `protrade/data/gemini_client.py`
**Lines:** 6-7

```python
# CHANGE FROM:
'apiKey': os.getenv('GEMINI_API_KEY')
'secret': os.getenv('GEMINI_API_SECRET')

# CHANGE TO:
'apiKey': os.getenv('GEMINI_KEY')
'secret': os.getenv('GEMINI_SECRET')
```

---

### [ ] Fix 3: Add Environment Variable Loading
**File:** `app.py`
**Location:** Top of file (after first line)

```python
import streamlit as st
from dotenv import load_dotenv  # ADD THIS
import os  # ADD THIS

load_dotenv()  # ADD THIS

from protrade.ui.dashboard import render_dashboard
# ... rest of imports
```

---

### [ ] Fix 4: Remove Hardcoded Port
**File:** `.streamlit/config.toml`
**Line:** 3

```toml
[server]
headless = true
# port = 8501  <-- DELETE THIS LINE
enableCORS = false
enableXsrfProtection = true
```

---

## ✅ PHASE 2: HIGH PRIORITY FIXES (1-2 hours)

### [ ] Fix 5: Add Error Handling to get_live_data
**File:** `protrade/data/market_data.py`
**Function:** `get_live_data()`

```python
@st.cache_data(ttl=60)
def get_live_data(symbol, period='1d', interval='5m'):
    """Fetch live stock data using yfinance"""
    try:
        data = yf.download(
            symbol, 
            period=period, 
            interval=interval, 
            progress=False,  # ADD THIS
            show_errors=False  # ADD THIS
        )
        if data.empty:
            st.warning(f"No data available for {symbol}")
            return None
        return data
    except Exception as e:
        st.error(f"Error fetching data for {symbol}: {str(e)}")
        return None
```

---

### [ ] Fix 6: Add Error Handling to get_historical_data
**File:** `protrade/data/market_data.py`
**Function:** `get_historical_data()`

```python
@st.cache_data(ttl=3600)
def get_historical_data(symbol, period='1y', interval='1d', source='stocks'):
    """Fetch historical data for backtesting (up to 3 years)"""
    try:
        if source == 'stocks':
            data = yf.download(
                symbol, 
                period=period, 
                interval=interval,
                progress=False,  # ADD THIS
                show_errors=False  # ADD THIS
            )
            if data.empty:
                st.warning(f"No historical data for {symbol}")
                return None
        else:  # crypto
            gemini = ccxt.gemini()
            ohlcv = gemini.fetch_ohlcv(symbol, timeframe=interval, limit=1000)
            data = pd.DataFrame(ohlcv, columns=['timestamp', 'Open', 'High', 'Low', 'Close', 'Volume'])
            data['timestamp'] = pd.to_datetime(data['timestamp'], unit='ms')
            data.set_index('timestamp', inplace=True)
        return data
    except Exception as e:
        st.error(f"Error fetching historical data: {str(e)}")
        return None
```

---

### [ ] Fix 7: Add Null Checks in Charts
**File:** `protrade/ui/charts.py`
**Function:** `render_candlestick_chart()`

```python
def render_candlestick_chart(df, title="Price Chart"):
    """Render candlestick chart with volume"""
    # ADD THIS CHECK AT START:
    if df is None or df.empty:
        st.warning("No data to display")
        return
    
    fig = go.Figure()
    # ... rest of function
```

---

### [ ] Fix 8: Generate Sample Backtest Signals
**File:** `app.py`
**Section:** Backtesting (around line 44)

```python
if st.button("Run Backtest"):
    df = get_historical_data(symbol, period=period, interval='1d')
    
    # ADD THIS: Check if data is valid
    if df is None or df.empty:
        st.error("Unable to fetch data for backtest")
    else:
        engine = BacktestEngine(initial_cash=100000)
        
        # REPLACE: signals = {}
        # WITH: Generate sample signals
        signals = {}
        buy_interval = len(df) // 10  # Buy 10 times throughout period
        
        for i in range(0, len(df), buy_interval):
            if i < len(df):
                # Buy signal
                signals[df.index[i]] = {'action': 'BUY', 'qty': 10}
                # Sell signal 3 days later
                sell_idx = min(i + 3, len(df) - 1)
                if sell_idx < len(df):
                    signals[df.index[sell_idx]] = {'action': 'SELL', 'qty': 10}
        
        metrics = engine.run(df, signals)
        
        # ... rest of backtest display code
```

---

### [ ] Fix 9: Fix Sharpe Ratio Division by Zero
**File:** `protrade/backtest/engine.py`
**Function:** `_calculate_metrics()`
**Line:** ~57

```python
# CHANGE FROM:
sharpe_ratio = returns.mean() / returns.std() * np.sqrt(252) if returns.std() > 0 else 0

# CHANGE TO:
std_dev = returns.std()
if std_dev > 0 and not np.isnan(std_dev):
    sharpe_ratio = returns.mean() / std_dev * np.sqrt(252)
else:
    sharpe_ratio = 0
```

---

### [ ] Fix 10: Fix Max Drawdown Division by Zero
**File:** `protrade/backtest/engine.py`
**Function:** `_calculate_metrics()`
**Line:** ~58

```python
# CHANGE FROM:
max_drawdown = (df_equity['equity'].cummax() - df_equity['equity']).max() / df_equity['equity'].cummax().max()

# CHANGE TO:
max_equity = df_equity['equity'].cummax().max()
if max_equity > 0:
    max_drawdown = (df_equity['equity'].cummax() - df_equity['equity']).max() / max_equity
else:
    max_drawdown = 0
```

---

### [ ] Fix 11: Fix CVaR Calculation
**File:** `protrade/backtest/engine.py`
**Function:** `_calculate_metrics()`
**Line:** ~61

```python
# CHANGE FROM:
var_95 = returns.quantile(0.05)
cvar_95 = returns[returns <= var_95].mean()

# CHANGE TO:
var_95 = returns.quantile(0.05) if len(returns) > 0 else 0
at_risk_returns = returns[returns <= var_95]
cvar_95 = at_risk_returns.mean() if len(at_risk_returns) > 0 else 0
```

---

### [ ] Fix 12: Fix Win Rate Calculation
**File:** `protrade/backtest/engine.py`
**Function:** `_calculate_metrics()`
**Lines:** ~63-64

```python
# REPLACE:
win_trades = [t for t in self.trades if t['action'] == 'SELL']
win_rate = len([t for t in win_trades if t['price'] > self.trades[self.trades.index(t)-1]['price']]) / len(win_trades) if win_trades else 0

# WITH:
# Track buy/sell pairs for accurate win rate
winning_trades = 0
losing_trades = 0
buy_prices = []

for trade in self.trades:
    if trade['action'] == 'BUY':
        buy_prices.append(trade['price'])
    elif trade['action'] == 'SELL' and buy_prices:
        buy_price = buy_prices.pop(0)
        if trade['price'] > buy_price:
            winning_trades += 1
        else:
            losing_trades += 1

total_closed_trades = winning_trades + losing_trades
win_rate = winning_trades / total_closed_trades if total_closed_trades > 0 else 0
```

---

## ✅ TESTING CHECKLIST

### [ ] Local Testing
```bash
# 1. Set up environment
cp .env.example .env
# Edit .env with test API keys

# 2. Install dependencies
pip install -r requirements.txt

# 3. Run app
streamlit run app.py

# 4. Test each page
# [ ] Dashboard - Check connection status
# [ ] Live Trading - Verify form works
# [ ] Screener - Run and verify results
# [ ] Backtesting - Run and check metrics
# [ ] Check terminal for errors
```

---

### [ ] Git Commit
```bash
git add .
git commit -m "Fix critical deployment issues

- Fix Alpaca/Gemini env var names
- Add dotenv loading
- Add error handling to data fetching
- Fix backtest signal generation
- Fix backtest metrics calculations
- Remove hardcoded port from config
"
git push origin main
```

---

### [ ] Render Deployment
- [ ] Go to Render dashboard
- [ ] Click "Manual Deploy" → "Deploy latest commit"
- [ ] Monitor build logs (no errors)
- [ ] Wait for "Live" status
- [ ] Check "Logs" tab for errors

---

### [ ] Live Testing
- [ ] Open Render URL in browser
- [ ] Dashboard loads without errors
- [ ] Charts render properly
- [ ] No error messages in UI
- [ ] Test screener functionality
- [ ] Test backtest with sample data
- [ ] Verify metrics display correctly (no NaN)

---

## 📊 SUCCESS CRITERIA

✅ **Phase 1 Complete When:**
- All 4 critical fixes applied
- No syntax errors in modified files
- Local app starts without crashing

✅ **Phase 2 Complete When:**
- All 8 high priority fixes applied
- App runs locally without errors
- All features testable (may show API errors if no keys)

✅ **Deployment Success When:**
- Render build completes successfully
- Service shows "Live" status
- Dashboard accessible at public URL
- No critical errors in Render logs

✅ **Full Success When:**
- All pages load without crashes
- Data fetching works (with valid API keys)
- Backtest displays valid metrics
- No console errors in browser
- Render logs show only info/warnings

---

## 🚨 ROLLBACK PLAN

If deployment fails:

1. **Check Render Logs:**
   ```
   Render Dashboard → Your Service → Logs
   Look for error stack traces
   ```

2. **Revert Changes:**
   ```bash
   git log --oneline  # Find last working commit
   git revert <commit-hash>
   git push origin main
   ```

3. **Local Debug:**
   ```bash
   # Test specific module
   python -c "from protrade.data.alpaca_client import AlpacaClient"
   
   # Check imports
   python -c "import app"
   ```

---

## 📝 NOTES

- **DO NOT SKIP** Phase 1 fixes - they are blocking
- **TEST LOCALLY** before pushing to GitHub
- **BACKUP** .env file before editing
- **NEVER COMMIT** .env file with real API keys
- **USE PAPER/SANDBOX** API keys for testing

---

**Estimated Time:**
- Phase 1: 15 minutes
- Phase 2: 1-2 hours
- Testing: 30 minutes
- **Total: 2-3 hours**

---

*Generated: December 14, 2024*
*For: protrader-terminal-fullstack deployment*
