import React, { useState } from 'react';
import './TradingBots.css';

function TradingBots() {
  const [bots, setBots] = useState([
    { id: 1, name: 'Momentum Bot', status: 'active', profit: 1234.56, trades: 45 },
    { id: 2, name: 'Mean Reversion', status: 'active', profit: 892.34, trades: 32 },
    { id: 3, name: 'Arbitrage Bot', status: 'paused', profit: 456.78, trades: 12 }
  ]);

  const toggleBot = (id) => {
    setBots(bots.map(bot => 
      bot.id === id 
        ? { ...bot, status: bot.status === 'active' ? 'paused' : 'active' }
        : bot
    ));
  };

  return (
    <div className="trading-bots">
      <div className="header">
        <h1>Trading Bots</h1>
        <button className="btn-primary">+ Create New Bot</button>
      </div>

      <div className="bots-grid">
        {bots.map(bot => (
          <div className="bot-card" key={bot.id}>
            <div className="bot-header">
              <h3>{bot.name}</h3>
              <span className={`status ${bot.status}`}>
                {bot.status === 'active' ? '🟢' : '⏸️'} {bot.status}
              </span>
            </div>

            <div className="bot-stats">
              <div className="bot-stat">
                <span className="label">Profit</span>
                <span className="value positive">${bot.profit.toFixed(2)}</span>
              </div>
              <div className="bot-stat">
                <span className="label">Trades</span>
                <span className="value">{bot.trades}</span>
              </div>
            </div>

            <div className="bot-actions">
              <button 
                className="btn-toggle"
                onClick={() => toggleBot(bot.id)}
              >
                {bot.status === 'active' ? 'Pause' : 'Start'}
              </button>
              <button className="btn-settings">⚙️ Settings</button>
            </div>
          </div>
        ))}
      </div>

      <div className="bot-templates">
        <h2>Bot Templates</h2>
        <div className="templates-grid">
          <div className="template-card">
            <h4>📈 Trend Following</h4>
            <p>Follows market trends using moving averages</p>
            <button className="btn-secondary">Use Template</button>
          </div>
          <div className="template-card">
            <h4>🎯 Scalping Bot</h4>
            <p>Quick trades for small profits</p>
            <button className="btn-secondary">Use Template</button>
          </div>
          <div className="template-card">
            <h4>🔄 Grid Trading</h4>
            <p>Places buy/sell orders at intervals</p>
            <button className="btn-secondary">Use Template</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TradingBots;
