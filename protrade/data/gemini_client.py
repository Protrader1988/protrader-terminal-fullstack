import ccxt
import os

class GeminiClient:
    def __init__(self):
        self.exchange = ccxt.gemini({
            'apiKey': os.getenv('GEMINI_API_KEY'),
            'secret': os.getenv('GEMINI_API_SECRET'),
            'sandbox': True
        })
    
    def get_balance(self):
        return self.exchange.fetch_balance()
    
    def get_ticker(self, symbol):
        return self.exchange.fetch_ticker(symbol)
    
    def place_order(self, symbol, side, amount):
        return self.exchange.create_market_order(symbol, side, amount)
