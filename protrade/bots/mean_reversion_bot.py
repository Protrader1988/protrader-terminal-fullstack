class MeanReversionBot:
    def __init__(self, window=20, std_dev=2):
        self.window = window
        self.std_dev = std_dev
    
    def detect_signals(self, df):
        """Detect mean reversion using Bollinger Bands"""
        df['SMA'] = df['Close'].rolling(window=self.window).mean()
        df['STD'] = df['Close'].rolling(window=self.window).std()
        df['Upper_BB'] = df['SMA'] + (self.std_dev * df['STD'])
        df['Lower_BB'] = df['SMA'] - (self.std_dev * df['STD'])
        df['mean_reversion_signal'] = (df['Close'] < df['Lower_BB']) | (df['Close'] > df['Upper_BB'])
        return df
