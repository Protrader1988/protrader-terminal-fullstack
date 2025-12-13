import streamlit as st
from protrade.data.alpaca_client import AlpacaClient
from protrade.data.gemini_client import GeminiClient

def render_trading_interface():
    st.subheader("💼 Paper Trading")
    
    tab1, tab2 = st.tabs(["Stocks (Alpaca)", "Crypto (Gemini)"])
    
    with tab1:
        symbol = st.text_input("Stock Symbol", "AAPL")
        qty = st.number_input("Quantity", min_value=1, value=1)
        side = st.selectbox("Side", ["buy", "sell"])
        
        if st.button("Place Stock Order"):
            try:
                alpaca = AlpacaClient()
                order = alpaca.place_order(symbol, qty, side)
                st.success(f"Order placed: {order.id}")
            except Exception as e:
                st.error(f"Error: {e}")
    
    with tab2:
        crypto_symbol = st.text_input("Crypto Pair", "BTC/USD")
        crypto_amount = st.number_input("Amount", min_value=0.001, value=0.01, step=0.001)
        crypto_side = st.selectbox("Side ", ["buy", "sell"])
        
        if st.button("Place Crypto Order"):
            try:
                gemini = GeminiClient()
                order = gemini.place_order(crypto_symbol, crypto_side, crypto_amount)
                st.success(f"Order placed: {order}")
            except Exception as e:
                st.error(f"Error: {e}")
