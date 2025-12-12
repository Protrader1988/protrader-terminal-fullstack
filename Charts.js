import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import axios from 'axios';
import './Charts.css';

function Charts() {
  const [symbol, setSymbol] = useState('AAPL');
  const [chartData, setChartData] = useState([]);
  const [timeframe, setTimeframe] = useState('1Day');

  useEffect(() => {
    fetchChartData();
  }, [symbol, timeframe]);

  const fetchChartData = async () => {
    try {
      const response = await axios.get(`/api/alpaca/bars/${symbol}`, {
        params: { timeframe, limit: 50 }
      });

      const formattedData = response.data.map(bar => ({
        time: new Date(bar.Timestamp).toLocaleDateString(),
        price: bar.ClosePrice,
        volume: bar.Volume
      }));

      setChartData(formattedData);
    } catch (error) {
      console.error('Error fetching chart data:', error);
    }
  };

  return (
    <div className="charts">
      <div className="chart-header">
        <h1>Market Charts</h1>
        <div className="chart-controls">
          <input
            type="text"
            value={symbol}
            onChange={(e) => setSymbol(e.target.value.toUpperCase())}
            placeholder="Symbol"
            className="symbol-input"
          />
          <select value={timeframe} onChange={(e) => setTimeframe(e.target.value)} className="timeframe-select">
            <option value="1Min">1 Min</option>
            <option value="5Min">5 Min</option>
            <option value="15Min">15 Min</option>
            <option value="1Hour">1 Hour</option>
            <option value="1Day">1 Day</option>
          </select>
        </div>
      </div>

      <div className="chart-container">
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
            <XAxis dataKey="time" stroke="#8b92b0" />
            <YAxis stroke="#8b92b0" />
            <Tooltip 
              contentStyle={{ background: '#1e2139', border: '1px solid rgba(255,255,255,0.1)' }}
              labelStyle={{ color: '#fff' }}
            />
            <Legend />
            <Line type="monotone" dataKey="price" stroke="#667eea" strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="watchlist">
        <h2>Watchlist</h2>
        <div className="watchlist-items">
          {['AAPL', 'TSLA', 'GOOGL', 'MSFT', 'AMZN'].map(sym => (
            <div 
              key={sym} 
              className={`watchlist-item ${symbol === sym ? 'active' : ''}`}
              onClick={() => setSymbol(sym)}
            >
              <span className="sym">{sym}</span>
              <span className="price">$150.25</span>
              <span className="change positive">+2.4%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Charts;
