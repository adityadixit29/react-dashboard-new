import { useState } from 'react';
import { 
  FaUser, 
  FaBell, 
  FaShieldAlt, 
  FaPalette, 
  FaCog, 
  FaSave, 
  FaEye, 
  FaEyeSlash,
  FaGlobe,
  FaMoon,
  FaSun,
  FaDesktop,
  FaEnvelope,
  FaPhone,
  FaKey,
  FaDatabase,
  FaDownload,
  FaUpload,
  FaTrash,
  FaTimes,
  FaEdit,
  FaPlus
} from 'react-icons/fa';
import "./settings.scss";

const Settings = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [showPassword, setShowPassword] = useState(false);
  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    sms: true,
    marketing: false
  });
  const [privacy, setPrivacy] = useState({
    profileVisibility: 'public',
    dataSharing: false,
    analytics: true,
    cookies: true
  });
  const [appearance, setAppearance] = useState({
    theme: 'dark',
    language: 'en',
    timezone: 'UTC',
    dateFormat: 'MM/DD/YYYY'
  });

  const tabs = [
    { id: 'profile', label: 'Profile', icon: FaUser },
    { id: 'notifications', label: 'Notifications', icon: FaBell },
    { id: 'privacy', label: 'Privacy', icon: FaShieldAlt },
    { id: 'appearance', label: 'Appearance', icon: FaPalette },
    { id: 'security', label: 'Security', icon: FaKey },
    { id: 'data', label: 'Data & Storage', icon: FaDatabase }
  ];

  const handleSave = () => {
    // Handle save logic here
    console.log('Settings saved');
  };

  const renderProfileSettings = () => (
    <div className="settings-section">
      <div className="section-header">
        <h3>Profile Information</h3>
        <p>Update your personal information and profile details</p>
      </div>
      
      <div className="profile-form">
        <div className="profile-avatar-section">
          <div className="avatar-container">
            <img 
              src="https://images.pexels.com/photos/8405873/pexels-photo-8405873.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load" 
              alt="Profile" 
              className="profile-avatar"
            />
            <button className="change-avatar-btn">
              <FaEdit />
              Change Photo
            </button>
          </div>
        </div>

        <div className="form-grid">
          <div className="form-group">
            <label>First Name</label>
            <input type="text" defaultValue="Aarav" />
          </div>
          <div className="form-group">
            <label>Last Name</label>
            <input type="text" defaultValue="Sharma" />
          </div>
          <div className="form-group">
            <label>Email Address</label>
            <input type="email" defaultValue="aarav@gmail.com" />
          </div>
          <div className="form-group">
            <label>Phone Number</label>
            <input type="tel" defaultValue="+91 98765 43210" />
          </div>
          <div className="form-group">
            <label>Job Title</label>
            <input type="text" defaultValue="Senior Developer" />
          </div>
          <div className="form-group">
            <label>Department</label>
            <input type="text" defaultValue="Engineering" />
          </div>
          <div className="form-group full-width">
            <label>Bio</label>
            <textarea 
              defaultValue="Experienced full-stack developer with expertise in React, Node.js, and modern web technologies. Passionate about creating scalable and user-friendly applications."
              rows={4}
            />
          </div>
          <div className="form-group full-width">
            <label>Address</label>
            <textarea 
              defaultValue="123 Tech Street, Mumbai, Maharashtra 400001, India"
              rows={2}
            />
          </div>
        </div>
      </div>
    </div>
  );

  const renderNotificationSettings = () => (
    <div className="settings-section">
      <div className="section-header">
        <h3>Notification Preferences</h3>
        <p>Choose how you want to be notified about updates and activities</p>
      </div>
      
      <div className="notification-settings">
        <div className="notification-group">
          <h4>Communication</h4>
          <div className="notification-item">
            <div className="notification-info">
              <FaEnvelope />
              <div>
                <span className="notification-title">Email Notifications</span>
                <span className="notification-desc">Receive updates via email</span>
              </div>
            </div>
            <label className="toggle-switch">
              <input 
                type="checkbox" 
                checked={notifications.email}
                onChange={(e) => setNotifications({...notifications, email: e.target.checked})}
              />
              <span className="toggle-slider"></span>
            </label>
          </div>
          <div className="notification-item">
            <div className="notification-info">
              <FaBell />
              <div>
                <span className="notification-title">Push Notifications</span>
                <span className="notification-desc">Browser push notifications</span>
              </div>
            </div>
            <label className="toggle-switch">
              <input 
                type="checkbox" 
                checked={notifications.push}
                onChange={(e) => setNotifications({...notifications, push: e.target.checked})}
              />
              <span className="toggle-slider"></span>
            </label>
          </div>
          <div className="notification-item">
            <div className="notification-info">
              <FaPhone />
              <div>
                <span className="notification-title">SMS Notifications</span>
                <span className="notification-desc">Text message alerts</span>
              </div>
            </div>
            <label className="toggle-switch">
              <input 
                type="checkbox" 
                checked={notifications.sms}
                onChange={(e) => setNotifications({...notifications, sms: e.target.checked})}
              />
              <span className="toggle-slider"></span>
            </label>
          </div>
        </div>

        <div className="notification-group">
          <h4>Marketing</h4>
          <div className="notification-item">
            <div className="notification-info">
              <FaGlobe />
              <div>
                <span className="notification-title">Marketing Emails</span>
                <span className="notification-desc">Product updates and promotions</span>
              </div>
            </div>
            <label className="toggle-switch">
              <input 
                type="checkbox" 
                checked={notifications.marketing}
                onChange={(e) => setNotifications({...notifications, marketing: e.target.checked})}
              />
              <span className="toggle-slider"></span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );

  const renderPrivacySettings = () => (
    <div className="settings-section">
      <div className="section-header">
        <h3>Privacy & Security</h3>
        <p>Control your privacy settings and data sharing preferences</p>
      </div>
      
      <div className="privacy-settings">
        <div className="privacy-group">
          <h4>Profile Visibility</h4>
          <div className="privacy-item">
            <div className="privacy-info">
              <FaUser />
              <div>
                <span className="privacy-title">Profile Visibility</span>
                <span className="privacy-desc">Who can see your profile information</span>
              </div>
            </div>
            <select 
              value={privacy.profileVisibility}
              onChange={(e) => setPrivacy({...privacy, profileVisibility: e.target.value})}
              className="privacy-select"
            >
              <option value="public">Public</option>
              <option value="friends">Friends Only</option>
              <option value="private">Private</option>
            </select>
          </div>
        </div>

        <div className="privacy-group">
          <h4>Data Sharing</h4>
          <div className="privacy-item">
            <div className="privacy-info">
              <FaShieldAlt />
              <div>
                <span className="privacy-title">Data Sharing</span>
                <span className="privacy-desc">Allow data sharing with third parties</span>
              </div>
            </div>
            <label className="toggle-switch">
              <input 
                type="checkbox" 
                checked={privacy.dataSharing}
                onChange={(e) => setPrivacy({...privacy, dataSharing: e.target.checked})}
              />
              <span className="toggle-slider"></span>
            </label>
          </div>
          <div className="privacy-item">
            <div className="privacy-info">
              <FaCog />
              <div>
                <span className="privacy-title">Analytics</span>
                <span className="privacy-desc">Help improve our service with usage analytics</span>
              </div>
            </div>
            <label className="toggle-switch">
              <input 
                type="checkbox" 
                checked={privacy.analytics}
                onChange={(e) => setPrivacy({...privacy, analytics: e.target.checked})}
              />
              <span className="toggle-slider"></span>
            </label>
          </div>
          <div className="privacy-item">
            <div className="privacy-info">
              <FaDatabase />
              <div>
                <span className="privacy-title">Cookies</span>
                <span className="privacy-desc">Accept cookies for better experience</span>
              </div>
            </div>
            <label className="toggle-switch">
              <input 
                type="checkbox" 
                checked={privacy.cookies}
                onChange={(e) => setPrivacy({...privacy, cookies: e.target.checked})}
              />
              <span className="toggle-slider"></span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );

  const renderAppearanceSettings = () => (
    <div className="settings-section">
      <div className="section-header">
        <h3>Appearance & Language</h3>
        <p>Customize the look and feel of your dashboard</p>
      </div>
      
      <div className="appearance-settings">
        <div className="appearance-group">
          <h4>Theme</h4>
          <div className="theme-options">
            <div 
              className={`theme-option ${appearance.theme === 'light' ? 'active' : ''}`}
              onClick={() => setAppearance({...appearance, theme: 'light'})}
            >
              <FaSun />
              <span>Light</span>
            </div>
            <div 
              className={`theme-option ${appearance.theme === 'dark' ? 'active' : ''}`}
              onClick={() => setAppearance({...appearance, theme: 'dark'})}
            >
              <FaMoon />
              <span>Dark</span>
            </div>
            <div 
              className={`theme-option ${appearance.theme === 'auto' ? 'active' : ''}`}
              onClick={() => setAppearance({...appearance, theme: 'auto'})}
            >
              <FaDesktop />
              <span>Auto</span>
            </div>
          </div>
        </div>

        <div className="appearance-group">
          <h4>Language & Region</h4>
          <div className="form-grid">
            <div className="form-group">
              <label>Language</label>
              <select 
                value={appearance.language}
                onChange={(e) => setAppearance({...appearance, language: e.target.value})}
              >
                <option value="en">English</option>
                <option value="es">Spanish</option>
                <option value="fr">French</option>
                <option value="de">German</option>
                <option value="hi">Hindi</option>
              </select>
            </div>
            <div className="form-group">
              <label>Timezone</label>
              <select 
                value={appearance.timezone}
                onChange={(e) => setAppearance({...appearance, timezone: e.target.value})}
              >
                <option value="UTC">UTC</option>
                <option value="EST">Eastern Time</option>
                <option value="PST">Pacific Time</option>
                <option value="IST">India Standard Time</option>
                <option value="GMT">Greenwich Mean Time</option>
              </select>
            </div>
            <div className="form-group">
              <label>Date Format</label>
              <select 
                value={appearance.dateFormat}
                onChange={(e) => setAppearance({...appearance, dateFormat: e.target.value})}
              >
                <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                <option value="YYYY-MM-DD">YYYY-MM-DD</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderSecuritySettings = () => (
    <div className="settings-section">
      <div className="section-header">
        <h3>Security Settings</h3>
        <p>Manage your account security and authentication</p>
      </div>
      
      <div className="security-settings">
        <div className="security-group">
          <h4>Password</h4>
          <div className="form-grid">
            <div className="form-group">
              <label>Current Password</label>
              <div className="password-input">
                <input 
                  type={showPassword ? "text" : "password"} 
                  placeholder="Enter current password"
                />
                <button 
                  type="button" 
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>
            <div className="form-group">
              <label>New Password</label>
              <div className="password-input">
                <input 
                  type={showPassword ? "text" : "password"} 
                  placeholder="Enter new password"
                />
                <button 
                  type="button" 
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>
            <div className="form-group">
              <label>Confirm New Password</label>
              <div className="password-input">
                <input 
                  type={showPassword ? "text" : "password"} 
                  placeholder="Confirm new password"
                />
                <button 
                  type="button" 
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>
          </div>
          <button className="update-password-btn">
            <FaKey />
            Update Password
          </button>
        </div>

        <div className="security-group">
          <h4>Two-Factor Authentication</h4>
          <div className="security-item">
            <div className="security-info">
              <FaShieldAlt />
              <div>
                <span className="security-title">Enable 2FA</span>
                <span className="security-desc">Add an extra layer of security to your account</span>
              </div>
            </div>
            <button className="enable-2fa-btn">
              <FaPlus />
              Enable 2FA
            </button>
          </div>
        </div>

        <div className="security-group">
          <h4>Active Sessions</h4>
          <div className="sessions-list">
            <div className="session-item">
              <div className="session-info">
                <FaDesktop />
                <div>
                  <span className="session-title">Chrome on Windows</span>
                  <span className="session-desc">Last active: 2 hours ago</span>
                </div>
              </div>
              <button className="end-session-btn">
                <FaTimes />
                End Session
              </button>
            </div>
            <div className="session-item">
              <div className="session-info">
                <FaDesktop />
                <div>
                  <span className="session-title">Safari on Mac</span>
                  <span className="session-desc">Last active: 1 day ago</span>
                </div>
              </div>
              <button className="end-session-btn">
                <FaTimes />
                End Session
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderDataSettings = () => (
    <div className="settings-section">
      <div className="section-header">
        <h3>Data & Storage</h3>
        <p>Manage your data, backups, and storage preferences</p>
      </div>
      
      <div className="data-settings">
        <div className="data-group">
          <h4>Data Export</h4>
          <div className="data-item">
            <div className="data-info">
              <FaDownload />
              <div>
                <span className="data-title">Export Data</span>
                <span className="data-desc">Download all your data in JSON format</span>
              </div>
            </div>
            <button className="export-data-btn">
              <FaDownload />
              Export Data
            </button>
          </div>
        </div>

        <div className="data-group">
          <h4>Data Import</h4>
          <div className="data-item">
            <div className="data-info">
              <FaUpload />
              <div>
                <span className="data-title">Import Data</span>
                <span className="data-desc">Upload and restore your data from a backup</span>
              </div>
            </div>
            <button className="import-data-btn">
              <FaUpload />
              Import Data
            </button>
          </div>
        </div>

        <div className="data-group">
          <h4>Account Deletion</h4>
          <div className="data-item">
            <div className="data-info">
              <FaTrash />
              <div>
                <span className="data-title">Delete Account</span>
                <span className="data-desc">Permanently delete your account and all data</span>
              </div>
            </div>
            <button className="delete-account-btn">
              <FaTrash />
              Delete Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'profile':
        return renderProfileSettings();
      case 'notifications':
        return renderNotificationSettings();
      case 'privacy':
        return renderPrivacySettings();
      case 'appearance':
        return renderAppearanceSettings();
      case 'security':
        return renderSecuritySettings();
      case 'data':
        return renderDataSettings();
      default:
        return renderProfileSettings();
    }
  };

  return (
    <div className='settings-page'>
      <div className="settings-header">
        <div className="header-left">
          <h1>Settings</h1>
          <p>Manage your account settings and preferences</p>
        </div>
        <div className="header-right">
          <button className="save-settings-btn" onClick={handleSave}>
            <FaSave />
            Save Changes
          </button>
        </div>
      </div>

      <div className="settings-container">
        <div className="settings-sidebar">
          <div className="settings-tabs">
            {tabs.map(tab => {
              const IconComponent = tab.icon;
              return (
                <button
                  key={tab.id}
                  className={`settings-tab ${activeTab === tab.id ? 'active' : ''}`}
                  onClick={() => setActiveTab(tab.id)}
                >
                  <IconComponent />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="settings-content">
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
};

export default Settings;
