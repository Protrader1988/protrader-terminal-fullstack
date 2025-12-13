class PriceAlert:
    def __init__(self):
        self.alerts = []
    
    def add_alert(self, symbol, target_price, condition='above'):
        self.alerts.append({
            'symbol': symbol,
            'target_price': target_price,
            'condition': condition
        })
    
    def check_alerts(self, current_prices):
        triggered = []
        for alert in self.alerts:
            price = current_prices.get(alert['symbol'])
            if price:
                if alert['condition'] == 'above' and price >= alert['target_price']:
                    triggered.append(alert)
                elif alert['condition'] == 'below' and price <= alert['target_price']:
                    triggered.append(alert)
        return triggered
