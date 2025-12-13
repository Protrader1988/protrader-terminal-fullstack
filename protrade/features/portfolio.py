import pandas as pd

class Portfolio:
    def __init__(self, initial_cash=100000):
        self.cash = initial_cash
        self.positions = {}
        self.history = []
    
    def buy(self, symbol, qty, price):
        cost = qty * price
        if cost <= self.cash:
            self.cash -= cost
            self.positions[symbol] = self.positions.get(symbol, 0) + qty
            self.history.append({'action': 'BUY', 'symbol': symbol, 'qty': qty, 'price': price})
            return True
        return False
    
    def sell(self, symbol, qty, price):
        if self.positions.get(symbol, 0) >= qty:
            self.cash += qty * price
            self.positions[symbol] -= qty
            self.history.append({'action': 'SELL', 'symbol': symbol, 'qty': qty, 'price': price})
            return True
        return False
    
    def get_value(self, current_prices):
        total = self.cash
        for symbol, qty in self.positions.items():
            total += qty * current_prices.get(symbol, 0)
        return total
    
    def get_pnl(self, current_prices, initial_cash):
        return self.get_value(current_prices) - initial_cash
