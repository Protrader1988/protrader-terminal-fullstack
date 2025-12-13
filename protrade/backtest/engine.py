import pandas as pd
import numpy as np

class BacktestEngine:
    def __init__(self, initial_cash=100000):
        self.initial_cash = initial_cash
        self.cash = initial_cash
        self.positions = {}
        self.trades = []
        self.equity_curve = []
    
    def run(self, df, signals):
        """Run backtest on historical data with signals"""
        for idx, row in df.iterrows():
            # Check for signals
            signal = signals.get(idx)
            if signal:
                if signal['action'] == 'BUY':
                    self._execute_buy(idx, row['Close'], signal.get('qty', 1))
                elif signal['action'] == 'SELL':
                    self._execute_sell(idx, row['Close'], signal.get('qty', 1))
            
            # Track equity
            equity = self._calculate_equity(row['Close'])
            self.equity_curve.append({'timestamp': idx, 'equity': equity})
        
        return self._calculate_metrics()
    
    def _execute_buy(self, timestamp, price, qty):
        cost = price * qty
        if cost <= self.cash:
            self.cash -= cost
            self.positions['stock'] = self.positions.get('stock', 0) + qty
            self.trades.append({'timestamp': timestamp, 'action': 'BUY', 'price': price, 'qty': qty})
    
    def _execute_sell(self, timestamp, price, qty):
        if self.positions.get('stock', 0) >= qty:
            self.cash += price * qty
            self.positions['stock'] -= qty
            self.trades.append({'timestamp': timestamp, 'action': 'SELL', 'price': price, 'qty': qty})
    
    def _calculate_equity(self, current_price):
        return self.cash + self.positions.get('stock', 0) * current_price
    
    def _calculate_metrics(self):
        df_equity = pd.DataFrame(self.equity_curve)
        returns = df_equity['equity'].pct_change().dropna()
        
        total_return = (df_equity['equity'].iloc[-1] - self.initial_cash) / self.initial_cash
        sharpe_ratio = returns.mean() / returns.std() * np.sqrt(252) if returns.std() > 0 else 0
        max_drawdown = (df_equity['equity'].cummax() - df_equity['equity']).max() / df_equity['equity'].cummax().max()
        
        # CVaR calculation (95% confidence)
        var_95 = returns.quantile(0.05)
        cvar_95 = returns[returns <= var_95].mean()
        
        win_trades = [t for t in self.trades if t['action'] == 'SELL']
        win_rate = len([t for t in win_trades if t['price'] > self.trades[self.trades.index(t)-1]['price']]) / len(win_trades) if win_trades else 0
        
        return {
            'total_return': total_return,
            'sharpe_ratio': sharpe_ratio,
            'max_drawdown': max_drawdown,
            'cvar_95': cvar_95,
            'win_rate': win_rate,
            'total_trades': len(self.trades)
        }
