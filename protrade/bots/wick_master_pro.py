import pandas as pd

class WickMasterPro:
    def __init__(self, wick_threshold=0.6):
        self.wick_threshold = wick_threshold
    
    def detect_signals(self, df):
        """Detect wick rejection signals"""
        df['wick_ratio'] = (df['High'] - df['Low']) / (df['Close'] - df['Open']).abs()
        df['wick_signal'] = df['wick_ratio'] > self.wick_threshold
        return df
    
    def generate_trades(self, df):
        """Generate buy/sell signals based on wick patterns"""
        signals = []
        for idx, row in df.iterrows():
            if row['wick_signal']:
                signals.append({
                    'timestamp': idx,
                    'signal': 'BUY' if row['Close'] > row['Open'] else 'SELL',
                    'price': row['Close']
                })
        return signals
