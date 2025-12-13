class MomentumBot:
    def __init__(self, period=14):
        self.period = period
    
    def detect_signals(self, df):
        """Detect momentum signals using RSI"""
        delta = df['Close'].diff()
        gain = (delta.where(delta > 0, 0)).rolling(window=self.period).mean()
        loss = (-delta.where(delta < 0, 0)).rolling(window=self.period).mean()
        rs = gain / loss
        df['RSI'] = 100 - (100 / (1 + rs))
        df['momentum_signal'] = (df['RSI'] < 30) | (df['RSI'] > 70)
        return df
