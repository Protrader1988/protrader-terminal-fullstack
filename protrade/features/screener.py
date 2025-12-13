import yfinance as yf
import pandas as pd

def screen_stocks(criteria={'volume': 1000000, 'price_min': 5, 'price_max': 500}):
    """Screen stocks based on criteria"""
    # Example: Screen S&P 500 stocks
    symbols = ['AAPL', 'MSFT', 'GOOGL', 'AMZN', 'TSLA', 'META', 'NVDA', 'AMD']
    results = []
    
    for symbol in symbols:
        try:
            ticker = yf.Ticker(symbol)
            info = ticker.info
            if info.get('regularMarketVolume', 0) >= criteria['volume']:
                if criteria['price_min'] <= info.get('regularMarketPrice', 0) <= criteria['price_max']:
                    results.append({
                        'Symbol': symbol,
                        'Price': info.get('regularMarketPrice'),
                        'Volume': info.get('regularMarketVolume'),
                        'Change': info.get('regularMarketChangePercent')
                    })
        except:
            continue
    
    return pd.DataFrame(results)
