


from dotenv import load_dotenv
from protrade.ui.dashboard import render_dashboard
from protrade.ui.trading import render_trading_interface
from protrade.ui.charts import render_candlestick_chart
from protrade.data.market_data import get_live_data, get_historical_data
from protrade.features.screener import screen_stocks
from protrade.backtest.engine import BacktestEngine

# Load environment variables from .env file
load_dotenv()

st.set_page_config(page_title="ProTrader Terminal", layout="wide", page_icon="🚀")

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
        
        if df.empty:
            st.error("No data available for backtesting. Please check the symbol and try again.")
        elif len(df) < 50:
            st.warning(f"Insufficient data for backtesting. Only {len(df)} data points available. Need at least 50 for this strategy.")
        else:
            # Validate required columns
            required_cols = ['Open', 'High', 'Low', 'Close']
            if not all(col in df.columns for col in required_cols):
                st.error("Data missing required columns for backtesting")
            else:
                engine = BacktestEngine(initial_cash=100000)
                
                # Generate sample signals for demonstration (Simple moving average crossover)
                # In production, this would be replaced with actual bot logic
                signals = {}
                
                try:
                    df['SMA_20'] = df['Close'].rolling(20).mean()
                    df['SMA_50'] = df['Close'].rolling(50).mean()
                    
                    # Remove NaN values from rolling calculations
                    df = df.dropna()
                    
                    for i in range(1, len(df)):
                        idx = df.index[i]
                        prev_idx = df.index[i-1]
                        
                        # Buy signal: SMA 20 crosses above SMA 50
                        if (df.loc[idx, 'SMA_20'] > df.loc[idx, 'SMA_50'] and 
                            df.loc[prev_idx, 'SMA_20'] <= df.loc[prev_idx, 'SMA_50']):
                            signals[idx] = {'action': 'BUY', 'qty': 10}
                        
                        # Sell signal: SMA 20 crosses below SMA 50
                        elif (df.loc[idx, 'SMA_20'] < df.loc[idx, 'SMA_50'] and 
                              df.loc[prev_idx, 'SMA_20'] >= df.loc[prev_idx, 'SMA_50']):
                            signals[idx] = {'action': 'SELL', 'qty': 10}
                    
                    metrics = engine.run(df, signals)
                    
                    st.subheader("Backtest Results")
                    
                    if metrics['total_trades'] == 0:
                        st.warning("No trades were executed during this backtest period. Try a different period or symbol.")
                    else:
                        col1, col2, col3 = st.columns(3)
                        col1.metric("Total Return", f"{metrics['total_return']*100:.2f}%")
                        col2.metric("Sharpe Ratio", f"{metrics['sharpe_ratio']:.2f}")
                        col3.metric("Max Drawdown", f"{metrics['max_drawdown']*100:.2f}%")
                        
                        col4, col5, col6 = st.columns(3)
                        col4.metric("Win Rate", f"{metrics['win_rate']*100:.2f}%")
                        col5.metric("CVaR (95%)", f"{metrics['cvar_95']*100:.2f}%")
                        col6.metric("Total Trades", metrics['total_trades'])
                        
                        st.info("💡 This backtest uses a simple SMA crossover strategy (20/50) for demonstration. Replace with actual bot strategies for production use.")
                
                except Exception as e:
                    st.error(f"Error during backtesting: {str(e)}")

elif page == "Bots":
    st.title("🤖 Trading Bots")
    st.write("**WickMasterPro** - Wick rejection strategy")
    st.write("**MomentumBot** - RSI-based momentum")
    st.write("**MeanReversionBot** - Bollinger Bands strategy")

elif page == "Settings":
    st.title("⚙️ Settings")
    st.write("Configure API keys in .env file")
