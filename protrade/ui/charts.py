import plotly.graph_objects as go
import streamlit as st

def render_candlestick_chart(df, title="Price Chart"):
    """Render candlestick chart with volume"""
    fig = go.Figure()
    
    fig.add_trace(go.Candlestick(
        x=df.index,
        open=df['Open'],
        high=df['High'],
        low=df['Low'],
        close=df['Close'],
        name='OHLC'
    ))
    
    fig.update_layout(
        title=title,
        xaxis_title="Time",
        yaxis_title="Price",
        height=500
    )
    
    st.plotly_chart(fig, use_container_width=True)
    
    # Volume chart
    fig_volume = go.Figure()
    fig_volume.add_trace(go.Bar(
        x=df.index,
        y=df['Volume'],
        name='Volume'
    ))
    fig_volume.update_layout(title="Volume", height=200)
    st.plotly_chart(fig_volume, use_container_width=True)
