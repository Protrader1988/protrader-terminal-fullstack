import React, { useState } from 'react';
import './Settings.css';

function Settings() {
  const [apiKeys, setApiKeys] = useState({
    alpacaKey: 'PK5XZDGQ2YBMQ9QSM9DZ',
    alpacaSecret: '••••••••••••',
    geminiKey: '••••••••••••',
    geminiSecret: '••••••••••••'
  });

  return (
    <div className="settings">
      <h1>Settings</h1>

      <div className="settings-sections">
        <div className="settings-card">
          <h2>API Connections</h2>
          <div className="api-status">
            <div className="status-item">
              <span className="status-label">Alpaca API</span>
              <span className="status-badge connected">Connected</span>
            </div>
            <div className="status-item">
              <span className="status-label">Gemini API</span>
              <span className="status-badge connected">Connected</span>
            </div>
          </div>

          <div className="api-keys">
            <div className="key-group">
              <label>Alpaca API Key</label>
              <input type="text" value={apiKeys.alpacaKey} readOnly />
            </div>
            <div className="key-group">
              <label>Alpaca Secret Key</label>
              <input type="password" value={apiKeys.alpacaSecret} readOnly />
            </div>
            <div className="key-group">
              <label>Gemini API Key</label>
              <input type="password" value={apiKeys.geminiKey} readOnly />
            </div>
            <div className="key-group">
              <label>Gemini Secret Key</label>
              <input type="password" value={apiKeys.geminiSecret} readOnly />
            </div>
          </div>
        </div>

        <div className="settings-card">
          <h2>Trading Preferences</h2>
          <div className="preferences">
            <div className="pref-item">
              <label>Default Order Size</label>
              <input type="number" defaultValue="100" />
            </div>
            <div className="pref-item">
              <label>Risk Level</label>
              <select defaultValue="medium">
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
            <div className="pref-item">
              <label>
                <input type="checkbox" defaultChecked />
                Enable Notifications
              </label>
            </div>
            <div className="pref-item">
              <label>
                <input type="checkbox" />
                Auto-execute Bot Trades
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Settings;
