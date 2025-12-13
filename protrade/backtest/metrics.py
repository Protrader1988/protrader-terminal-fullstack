import numpy as np
import pandas as pd

def calculate_sharpe_ratio(returns, risk_free_rate=0.02):
    """Calculate Sharpe Ratio"""
    excess_returns = returns - risk_free_rate/252
    return np.sqrt(252) * excess_returns.mean() / excess_returns.std()

def calculate_max_drawdown(equity_curve):
    """Calculate Maximum Drawdown"""
    peak = equity_curve.expanding(min_periods=1).max()
    drawdown = (equity_curve - peak) / peak
    return drawdown.min()

def calculate_cvar(returns, confidence=0.95):
    """Calculate Conditional Value at Risk (CVaR)"""
    var = returns.quantile(1 - confidence)
    return returns[returns <= var].mean()

def stress_test(returns, shock=-0.20):
    """Apply stress test to returns"""
    stressed_returns = returns * (1 + shock)
    return stressed_returns
