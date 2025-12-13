import streamlit as st
import plotly.graph_objects as go
from protrade.data.alpaca_client import AlpacaClient
from protrade.data.gemini_client import GeminiClient

def render_dashboard():
    st.title("🚀 ProTrader Terminal")
    
    # Account Status
    col1, col2 = st.columns(2)
    
    with col1:
        st.subheader("📈 Alpaca (Stocks - Paper)")
        try:
            alpaca = AlpacaClient()
            account = alpaca.get_account()
            st.metric("Cash", f"${float(account.cash):,.2f}")
            st.metric("Portfolio Value", f"${float(account.portfolio_value):,.2f}")
        except Exception as e:
            st.error(f"Error: {e}")
    
    with col2:
        st.subheader("₿ Gemini (Crypto - Sandbox)")
        try:
            gemini = GeminiClient()
            balance = gemini.get_balance()
            st.metric("USD Balance", f"${balance.get('USD', {}).get('free', 0):,.2f}")
        except Exception as e:
            st.error(f"Error: {e}")
