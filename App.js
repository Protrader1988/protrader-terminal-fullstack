import React, { useState } from 'react';
import Dashboard from './components/Dashboard';
import TradingBots from './components/TradingBots';
import Charts from './components/Charts';
import Portfolio from './components/Portfolio';
import Settings from './components/Settings';
import './App.css';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'bots':
        return <TradingBots />;
      case 'charts':
        return <Charts />;
      case 'portfolio':
        return <Portfolio />;
      case 'settings':
        return <Settings />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="app">
      <nav className="sidebar">
        <div className="logo">
          <h1>ProTrader</h1>
          <span>Terminal</span>
        </div>
        <ul className="nav-menu">
          <li className={activeTab === 'dashboard' ? 'active' : ''} onClick={() => setActiveTab('dashboard')}>
            📊 Dashboard
          </li>
          <li className={activeTab === 'bots' ? 'active' : ''} onClick={() => setActiveTab('bots')}>
            🤖 Trading Bots
          </li>
          <li className={activeTab === 'charts' ? 'active' : ''} onClick={() => setActiveTab('charts')}>
            📈 Charts
          </li>
          <li className={activeTab === 'portfolio' ? 'active' : ''} onClick={() => setActiveTab('portfolio')}>
            💼 Portfolio
          </li>
          <li className={activeTab === 'settings' ? 'active' : ''} onClick={() => setActiveTab('settings')}>
            ⚙️ Settings
          </li>
        </ul>
      </nav>
      <main className="main-content">
        {renderContent()}
      </main>
    </div>
  );
}

export default App;
