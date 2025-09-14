import { useState, useMemo } from 'react';
import {
  FaSearch,
  FaDownload,
  FaTrash,
  FaPlay,
  FaPause,
  FaExclamationTriangle,
  FaInfoCircle,
  FaTimesCircle,
  FaBug,
  FaServer,
  FaUser,
  FaDatabase,
  FaGlobe,
  FaClock,
  FaTerminal,
  FaFileAlt,
  FaChevronDown,
  FaChevronUp,
  FaCopy
} from 'react-icons/fa';
import "./logs.scss";

const Logs = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [levelFilter, setLevelFilter] = useState('all');
  const [serviceFilter, setServiceFilter] = useState('all');
  const [timeFilter, setTimeFilter] = useState('1h');
  const [viewMode, setViewMode] = useState('table');
  const [isLive, setIsLive] = useState(false);
  const [expandedLogs, setExpandedLogs] = useState<Set<string>>(new Set());

  // Mock log data
  const logsData = [
    {
      id: '1',
      timestamp: '2024-01-15 14:30:25.123',
      level: 'error',
      service: 'auth-service',
      message: 'Authentication failed for user: john.doe@example.com',
      details: {
        userId: '12345',
        ip: '192.168.1.100',
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        sessionId: 'sess_abc123def456',
        errorCode: 'AUTH_001',
        stackTrace: 'Error: Invalid credentials\n    at AuthService.validate (/app/services/auth.js:45:12)\n    at AuthController.login (/app/controllers/auth.js:23:8)'
      },
      tags: ['authentication', 'security', 'user-error']
    },
    {
      id: '2',
      timestamp: '2024-01-15 14:29:18.456',
      level: 'info',
      service: 'api-gateway',
      message: 'Request processed successfully',
      details: {
        method: 'GET',
        path: '/api/users/profile',
        statusCode: 200,
        responseTime: '45ms',
        requestId: 'req_789xyz012',
        userId: '67890'
      },
      tags: ['api', 'success', 'performance']
    },
    {
      id: '3',
      timestamp: '2024-01-15 14:28:42.789',
      level: 'warning',
      service: 'database',
      message: 'Connection pool utilization high: 85%',
      details: {
        poolSize: 20,
        activeConnections: 17,
        maxConnections: 20,
        avgResponseTime: '120ms',
        query: 'SELECT * FROM users WHERE status = ?'
      },
      tags: ['database', 'performance', 'monitoring']
    },
    {
      id: '4',
      timestamp: '2024-01-15 14:27:15.321',
      level: 'debug',
      service: 'payment-service',
      message: 'Processing payment for order #ORD-2024-001',
      details: {
        orderId: 'ORD-2024-001',
        amount: '$99.99',
        currency: 'USD',
        paymentMethod: 'credit_card',
        transactionId: 'txn_456def789',
        customerId: 'cust_123abc'
      },
      tags: ['payment', 'order', 'transaction']
    },
    {
      id: '5',
      timestamp: '2024-01-15 14:26:33.654',
      level: 'error',
      service: 'email-service',
      message: 'Failed to send email notification',
      details: {
        recipient: 'user@example.com',
        template: 'welcome_email',
        errorCode: 'EMAIL_002',
        smtpError: 'Connection timeout',
        retryCount: 3,
        maxRetries: 5
      },
      tags: ['email', 'notification', 'external-service']
    },
    {
      id: '6',
      timestamp: '2024-01-15 14:25:47.987',
      level: 'info',
      service: 'user-service',
      message: 'User profile updated successfully',
      details: {
        userId: '54321',
        fields: ['firstName', 'lastName', 'email'],
        updatedBy: 'self',
        timestamp: '2024-01-15T14:25:47.987Z'
      },
      tags: ['user', 'profile', 'update']
    },
    {
      id: '7',
      timestamp: '2024-01-15 14:24:12.135',
      level: 'warning',
      service: 'cache-service',
      message: 'Cache miss rate exceeded threshold',
      details: {
        missRate: '15.2%',
        threshold: '10%',
        cacheType: 'redis',
        keyspace: 'user_sessions',
        ttl: '3600s'
      },
      tags: ['cache', 'performance', 'redis']
    },
    {
      id: '8',
      timestamp: '2024-01-15 14:23:28.468',
      level: 'debug',
      service: 'analytics-service',
      message: 'Event tracked: page_view',
      details: {
        eventType: 'page_view',
        page: '/dashboard/analytics',
        userId: '98765',
        sessionId: 'sess_xyz789abc',
        properties: {
          referrer: 'https://google.com',
          device: 'desktop',
          browser: 'chrome'
        }
      },
      tags: ['analytics', 'tracking', 'user-behavior']
    },
    {
      id: '9',
      timestamp: '2024-01-15 14:22:55.792',
      level: 'error',
      service: 'file-service',
      message: 'File upload failed: size limit exceeded',
      details: {
        fileName: 'large-image.jpg',
        fileSize: '15.2MB',
        maxSize: '10MB',
        userId: '11111',
        uploadId: 'upload_123456'
      },
      tags: ['file', 'upload', 'validation']
    },
    {
      id: '10',
      timestamp: '2024-01-15 14:21:41.246',
      level: 'info',
      service: 'notification-service',
      message: 'Push notification sent successfully',
      details: {
        notificationId: 'notif_789abc123',
        userId: '22222',
        deviceToken: 'device_token_xyz',
        platform: 'ios',
        title: 'New message received',
        body: 'You have a new message from John Doe'
      },
      tags: ['notification', 'push', 'mobile']
    }
  ];

  const logLevels = [
    { value: 'all', label: 'All Levels', color: '#6b7280' },
    { value: 'error', label: 'Error', color: '#ef4444' },
    { value: 'warning', label: 'Warning', color: '#f59e0b' },
    { value: 'info', label: 'Info', color: '#3b82f6' },
    { value: 'debug', label: 'Debug', color: '#10b981' }
  ];

  const services = [
    { value: 'all', label: 'All Services' },
    { value: 'auth-service', label: 'Auth Service' },
    { value: 'api-gateway', label: 'API Gateway' },
    { value: 'database', label: 'Database' },
    { value: 'payment-service', label: 'Payment Service' },
    { value: 'email-service', label: 'Email Service' },
    { value: 'user-service', label: 'User Service' },
    { value: 'cache-service', label: 'Cache Service' },
    { value: 'analytics-service', label: 'Analytics Service' },
    { value: 'file-service', label: 'File Service' },
    { value: 'notification-service', label: 'Notification Service' }
  ];

  const timeRanges = [
    { value: '1h', label: 'Last Hour' },
    { value: '6h', label: 'Last 6 Hours' },
    { value: '24h', label: 'Last 24 Hours' },
    { value: '7d', label: 'Last 7 Days' },
    { value: '30d', label: 'Last 30 Days' }
  ];

  const filteredLogs = useMemo(() => {
    return logsData.filter(log => {
      const matchesSearch = log.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           log.service.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           log.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesLevel = levelFilter === 'all' || log.level === levelFilter;
      const matchesService = serviceFilter === 'all' || log.service === serviceFilter;
      
      return matchesSearch && matchesLevel && matchesService;
    });
  }, [searchTerm, levelFilter, serviceFilter]);

  const getLevelIcon = (level: string) => {
    switch (level) {
      case 'error':
        return <FaTimesCircle className="level-icon error" />;
      case 'warning':
        return <FaExclamationTriangle className="level-icon warning" />;
      case 'info':
        return <FaInfoCircle className="level-icon info" />;
      case 'debug':
        return <FaBug className="level-icon debug" />;
      default:
        return <FaInfoCircle className="level-icon info" />;
    }
  };

  const getServiceIcon = (service: string) => {
    switch (service) {
      case 'auth-service':
        return <FaUser />;
      case 'api-gateway':
        return <FaGlobe />;
      case 'database':
        return <FaDatabase />;
      case 'payment-service':
        return <FaServer />;
      case 'email-service':
        return <FaServer />;
      case 'user-service':
        return <FaUser />;
      case 'cache-service':
        return <FaServer />;
      case 'analytics-service':
        return <FaServer />;
      case 'file-service':
        return <FaFileAlt />;
      case 'notification-service':
        return <FaServer />;
      default:
        return <FaServer />;
    }
  };

  const toggleLogExpansion = (logId: string) => {
    const newExpanded = new Set(expandedLogs);
    if (newExpanded.has(logId)) {
      newExpanded.delete(logId);
    } else {
      newExpanded.add(logId);
    }
    setExpandedLogs(newExpanded);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleString();
  };

  const logStats = {
    total: logsData.length,
    errors: logsData.filter(log => log.level === 'error').length,
    warnings: logsData.filter(log => log.level === 'warning').length,
    info: logsData.filter(log => log.level === 'info').length,
    debug: logsData.filter(log => log.level === 'debug').length
  };

  return (
    <div className='logs-page'>
      <div className="logs-header">
        <div className="header-left">
          <h1>System Logs</h1>
          <p>Monitor and analyze application logs in real-time</p>
        </div>
        <div className="header-right">
          <div className="log-controls">
            <button 
              className={`live-toggle-btn ${isLive ? 'active' : ''}`}
              onClick={() => setIsLive(!isLive)}
            >
              {isLive ? <FaPause /> : <FaPlay />}
              {isLive ? 'Pause' : 'Live'}
            </button>
            <button className="refresh-btn">
              <FaDownload />
            </button>
            <button className="download-btn">
              <FaDownload />
            </button>
            <button className="clear-btn">
              <FaTrash />
            </button>
          </div>
        </div>
      </div>

      <div className="logs-stats">
        <div className="stat-card">
          <div className="stat-icon error">
            <FaTimesCircle />
          </div>
          <div className="stat-content">
            <h3>{logStats.errors}</h3>
            <p>Errors</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon warning">
            <FaExclamationTriangle />
          </div>
          <div className="stat-content">
            <h3>{logStats.warnings}</h3>
            <p>Warnings</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon info">
            <FaInfoCircle />
          </div>
          <div className="stat-content">
            <h3>{logStats.info}</h3>
            <p>Info</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon debug">
            <FaBug />
          </div>
          <div className="stat-content">
            <h3>{logStats.debug}</h3>
            <p>Debug</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon total">
            <FaTerminal />
          </div>
          <div className="stat-content">
            <h3>{logStats.total}</h3>
            <p>Total Logs</p>
          </div>
        </div>
      </div>

      <div className="logs-filters">
        <div className="search-section">
          <div className="search-input">
            <FaSearch />
            <input
              type="text"
              placeholder="Search logs by message, service, or tags..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        
        <div className="filter-section">
          <div className="filter-group">
            <label>Level</label>
            <select 
              value={levelFilter} 
              onChange={(e) => setLevelFilter(e.target.value)}
              className="filter-select"
            >
              {logLevels.map(level => (
                <option key={level.value} value={level.value}>
                  {level.label}
                </option>
              ))}
            </select>
          </div>
          
          <div className="filter-group">
            <label>Service</label>
            <select 
              value={serviceFilter} 
              onChange={(e) => setServiceFilter(e.target.value)}
              className="filter-select"
            >
              {services.map(service => (
                <option key={service.value} value={service.value}>
                  {service.label}
                </option>
              ))}
            </select>
          </div>
          
          <div className="filter-group">
            <label>Time Range</label>
            <select 
              value={timeFilter} 
              onChange={(e) => setTimeFilter(e.target.value)}
              className="filter-select"
            >
              {timeRanges.map(range => (
                <option key={range.value} value={range.value}>
                  {range.label}
                </option>
              ))}
            </select>
          </div>
          
          <div className="filter-group">
            <label>View</label>
            <div className="view-toggle">
              <button 
                className={`view-btn ${viewMode === 'table' ? 'active' : ''}`}
                onClick={() => setViewMode('table')}
              >
                <FaTerminal />
              </button>
              <button 
                className={`view-btn ${viewMode === 'cards' ? 'active' : ''}`}
                onClick={() => setViewMode('cards')}
              >
                <FaFileAlt />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="logs-content">
        {viewMode === 'table' ? (
          <div className="logs-table">
            <div className="table-header">
              <div className="col-timestamp">Timestamp</div>
              <div className="col-level">Level</div>
              <div className="col-service">Service</div>
              <div className="col-message">Message</div>
              <div className="col-tags">Tags</div>
              <div className="col-actions">Actions</div>
            </div>
            
            <div className="table-body">
              {filteredLogs.map(log => (
                <div key={log.id} className={`log-row ${log.level}`}>
                  <div className="col-timestamp">
                    <FaClock />
                    <span>{formatTimestamp(log.timestamp)}</span>
                  </div>
                  <div className="col-level">
                    {getLevelIcon(log.level)}
                    <span className="level-text">{log.level}</span>
                  </div>
                  <div className="col-service">
                    {getServiceIcon(log.service)}
                    <span>{log.service}</span>
                  </div>
                  <div className="col-message">
                    <span className="message-text">{log.message}</span>
                  </div>
                  <div className="col-tags">
                    <div className="tags-container">
                      {log.tags.map((tag, index) => (
                        <span key={index} className="tag">{tag}</span>
                      ))}
                    </div>
                  </div>
                  <div className="col-actions">
                    <button 
                      className="action-btn expand"
                      onClick={() => toggleLogExpansion(log.id)}
                    >
                      {expandedLogs.has(log.id) ? <FaChevronUp /> : <FaChevronDown />}
                    </button>
                    <button 
                      className="action-btn copy"
                      onClick={() => copyToClipboard(JSON.stringify(log, null, 2))}
                    >
                      <FaCopy />
                    </button>
                  </div>
                  
                  {expandedLogs.has(log.id) && (
                    <div className="log-details">
                      <div className="details-header">
                        <h4>Log Details</h4>
                        <button 
                          className="copy-details-btn"
                          onClick={() => copyToClipboard(JSON.stringify(log.details, null, 2))}
                        >
                          <FaCopy />
                          Copy Details
                        </button>
                      </div>
                      <div className="details-content">
                        <pre>{JSON.stringify(log.details, null, 2)}</pre>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="logs-cards">
            {filteredLogs.map(log => (
              <div key={log.id} className={`log-card ${log.level}`}>
                <div className="card-header">
                  <div className="log-meta">
                    <div className="timestamp">
                      <FaClock />
                      <span>{formatTimestamp(log.timestamp)}</span>
                    </div>
                    <div className="level-service">
                      {getLevelIcon(log.level)}
                      <span className="level-text">{log.level}</span>
                      {getServiceIcon(log.service)}
                      <span className="service-text">{log.service}</span>
                    </div>
                  </div>
                  <div className="card-actions">
                    <button 
                      className="action-btn expand"
                      onClick={() => toggleLogExpansion(log.id)}
                    >
                      {expandedLogs.has(log.id) ? <FaChevronUp /> : <FaChevronDown />}
                    </button>
                    <button 
                      className="action-btn copy"
                      onClick={() => copyToClipboard(JSON.stringify(log, null, 2))}
                    >
                      <FaCopy />
                    </button>
                  </div>
                </div>
                
                <div className="card-content">
                  <p className="log-message">{log.message}</p>
                  <div className="tags-container">
                    {log.tags.map((tag, index) => (
                      <span key={index} className="tag">{tag}</span>
                    ))}
                  </div>
                </div>
                
                {expandedLogs.has(log.id) && (
                  <div className="card-details">
                    <div className="details-header">
                      <h4>Log Details</h4>
                      <button 
                        className="copy-details-btn"
                        onClick={() => copyToClipboard(JSON.stringify(log.details, null, 2))}
                      >
                        <FaCopy />
                        Copy Details
                      </button>
                    </div>
                    <div className="details-content">
                      <pre>{JSON.stringify(log.details, null, 2)}</pre>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Logs;
