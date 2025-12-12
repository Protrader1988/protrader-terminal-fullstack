import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Dashboard.css';

function Dashboard() {
  const [accountData, setAccountData] = useState(null);
  const [positions, setPositions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAccountData();
    fetchPositions();
  }, []);

  const fetchAccountData = async () => {
    try {
      const response = await axios.get('/api/alpaca/account');
      setAccountData(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching account data:', error);
      setLoading(false);
    }
  };

  const fetchPositions = async () => {
    try {
      const response = await axios.get('/api/alpaca/positions');
      setPositions(response.data);
    } catch (error) {
      console.error('Error fetching positions:', error);
    }
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="dashboard">
      <h1>Dashboard</h1>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-label">Portfolio Value</div>
          <div className="stat-value">${accountData?.portfolio_value || '0.00'}</div>
          <div className="stat-change positive">+2.4%</div>
        </div>

        <div className="stat-card">
          <div className="stat-label">Buying Power</div>
          <div className="stat-value">${accountData?.buying_power || '0.00'}</div>
        </div>

        <div className="stat-card">
          <div className="stat-label">Cash</div>
          <div className="stat-value">${accountData?.cash || '0.00'}</div>
        </div>

        <div className="stat-card">
          <div className="stat-label">Day P&L</div>
          <div className="stat-value">${accountData?.equity || '0.00'}</div>
          <div className="stat-change positive">+$124.50</div>
        </div>
      </div>

      <div className="positions-section">
        <h2>Open Positions</h2>
        <div className="positions-table">
          {positions.length > 0 ? (
            <table>
              <thead>
                <tr>
                  <th>Symbol</th>
                  <th>Qty</th>
                  <th>Avg Price</th>
                  <th>Current Price</th>
                  <th>P&L</th>
                </tr>
              </thead>
              <tbody>
                {positions.map((pos, idx) => (
                  <tr key={idx}>
                    <td className="symbol">{pos.symbol}</td>
                    <td>{pos.qty}</td>
                    <td>${parseFloat(pos.avg_entry_price).toFixed(2)}</td>
                    <td>${parseFloat(pos.current_price).toFixed(2)}</td>
                    <td className={parseFloat(pos.unrealized_pl) >= 0 ? 'positive' : 'negative'}>
                      ${parseFloat(pos.unrealized_pl).toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="no-data">No open positions</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
