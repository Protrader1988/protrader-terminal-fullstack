import yfinance as yf
import pandas as pd
import ccxt
import streamlit as st

@st.cache_data(ttl=60)
def get_live_data(symbol, period='1d', interval='5m'):
    """Fetch live stock data using yfinance"""
    data = yf.download(symbol, period=period, interval=interval)
    return data

@st.cache_data(ttl=3600)
def get_historical_data(symbol, period='1y', interval='1d', source='stocks'):
    """Fetch historical data for backtesting (up to 3 years)"""
    if source == 'stocks':
        data = yf.download(symbol, period=period, interval=interval)
    else:  # crypto
        gemini = ccxt.gemini()
        ohlcv = gemini.fetch_ohlcv(symbol, timeframe=interval, limit=1000)
        data = pd.DataFrame(ohlcv, columns=['timestamp', 'Open', 'High', 'Low', 'Close', 'Volume'])
        data['timestamp'] = pd.to_datetime(data['timestamp'], unit='ms')
        data.set_index('timestamp', inplace=True)
    return data

def volume_confirm(df):
    """Add volume confirmation signals"""
    df['volume_surge'] = df['Volume'] > df['Volume'].rolling(20).mean() * 1.5
    return df
