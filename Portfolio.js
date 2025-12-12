import React, { useState } from 'react';
import './Portfolio.css';

function Portfolio() {
  const [orderForm, setOrderForm] = useState({
    symbol: '',
    quantity: '',
    side: 'buy',
    orderType: 'market'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Order submitted:', orderForm);
    // API call to place order would go here
  };

  return (
    <div className="portfolio">
      <h1>Portfolio Management</h1>

      <div className="portfolio-grid">
        <div className="order-form-card">
          <h2>Place Order</h2>
          <form onSubmit={handleSubmit} className="order-form">
            <div className="form-group">
              <label>Symbol</label>
              <input
                type="text"
                value={orderForm.symbol}
                onChange={(e) => setOrderForm({...orderForm, symbol: e.target.value.toUpperCase()})}
                placeholder="AAPL"
                required
              />
            </div>

            <div className="form-group">
              <label>Quantity</label>
              <input
                type="number"
                value={orderForm.quantity}
                onChange={(e) => setOrderForm({...orderForm, quantity: e.target.value})}
                placeholder="10"
                required
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Side</label>
                <select 
                  value={orderForm.side}
                  onChange={(e) => setOrderForm({...orderForm, side: e.target.value})}
                >
                  <option value="buy">Buy</option>
                  <option value="sell">Sell</option>
                </select>
              </div>

              <div className="form-group">
                <label>Order Type</label>
                <select
                  value={orderForm.orderType}
                  onChange={(e) => setOrderForm({...orderForm, orderType: e.target.value})}
                >
                  <option value="market">Market</option>
                  <option value="limit">Limit</option>
                  <option value="stop">Stop</option>
                </select>
              </div>
            </div>

            <button type="submit" className="btn-submit">Place Order</button>
          </form>
        </div>

        <div className="holdings-card">
          <h2>Holdings</h2>
          <div className="holdings-list">
            <div className="holding-item">
              <div className="holding-info">
                <span className="holding-symbol">AAPL</span>
                <span className="holding-shares">100 shares</span>
              </div>
              <div className="holding-value">
                <span className="value">$15,025.00</span>
                <span className="pnl positive">+$1,234.56</span>
              </div>
            </div>
            <div className="holding-item">
              <div className="holding-info">
                <span className="holding-symbol">TSLA</span>
                <span className="holding-shares">50 shares</span>
              </div>
              <div className="holding-value">
                <span className="value">$12,500.00</span>
                <span className="pnl negative">-$456.78</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Portfolio;
