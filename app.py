import streamlit as st
from protrade.ui.dashboard import render_dashboard
from protrade.ui.trading import render_trading_interface
from protrade.ui.charts import render_candlestick_chart
from protrade.data.market_data import get_live_data, get_historical_data
from protrade.features.screener import screen_stocks
from protrade.backtest.engine import BacktestEngine

st.set_page_config(page_title="ProTrader Terminal", layout="wide", page_icon="🚀")

# Sidebar navigation
page = st.sidebar.selectbox("Navigation", [
    "Dashboard",
    "Live Trading",
    "Screener",
    "Backtesting",
    "Bots",
    "Settings"
])

if page == "Dashboard":
    render_dashboard()
    
elif page == "Live Trading":
    render_trading_interface()
    symbol = st.text_input("Chart Symbol", "AAPL")
    if symbol:
        df = get_live_data(symbol, period='5d', interval='5m')
        render_candlestick_chart(df, f"{symbol} Live Chart")

elif page == "Screener":
    st.title("📊 Stock Screener")
    if st.button("Run Screener"):
        results = screen_stocks()
        st.dataframe(results)

elif page == "Backtesting":
    st.title("⏮️ Backtest Engine")
    symbol = st.text_input("Symbol for Backtest", "AAPL")
    period = st.selectbox("Period", ["1mo", "3mo", "6mo", "1y", "2y", "3y"])
    
    if st.button("Run Backtest"):
        df = get_historical_data(symbol, period=period, interval='1d')
        engine = BacktestEngine(initial_cash=100000)
        # Generate sample signals (replace with actual bot logic)
        signals = {}
        metrics = engine.run(df, signals)
        
        st.subheader("Backtest Results")
        col1, col2, col3 = st.columns(3)
        col1.metric("Total Return", f"{metrics['total_return']*100:.2f}%")
        col2.metric("Sharpe Ratio", f"{metrics['sharpe_ratio']:.2f}")
        col3.metric("Max Drawdown", f"{metrics['max_drawdown']*100:.2f}%")
        
        col4, col5 = st.columns(2)
        col4.metric("Win Rate", f"{metrics['win_rate']*100:.2f}%")
        col5.metric("CVaR (95%)", f"{metrics['cvar_95']*100:.2f}%")

elif page == "Bots":
    st.title("🤖 Trading Bots")
    st.write("**WickMasterPro** - Wick rejection strategy")
    st.write("**MomentumBot** - RSI-based momentum")
    st.write("**MeanReversionBot** - Bollinger Bands strategy")

elif page == "Settings":
    st.title("⚙️ Settings")
    st.write("Configure API keys in .env file")
