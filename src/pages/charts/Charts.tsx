import { useState } from 'react';
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ScatterChart,
  Scatter,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ComposedChart
} from 'recharts';
import {
  FaChartLine,
  FaChartBar,
  FaChartPie,
  FaChartArea,
  FaDownload,
  FaDollarSign,
  FaUsers,
  FaShoppingCart,
  FaEye,
  FaArrowUp,
  FaArrowDown,
  FaMinus,
  FaCog,
  FaExpand,
  FaCompress
} from 'react-icons/fa';
import "./charts.scss";

const Charts = () => {
  const [selectedChart, setSelectedChart] = useState('line');
  const [timeRange, setTimeRange] = useState('6M');
  const [viewMode] = useState('grid');

  // Mock data for different chart types
  const salesData = [
    { month: 'Jan', sales: 4000, revenue: 2400, orders: 24, users: 120 },
    { month: 'Feb', sales: 3000, revenue: 1398, orders: 18, users: 98 },
    { month: 'Mar', sales: 2000, revenue: 9800, orders: 32, users: 156 },
    { month: 'Apr', sales: 2780, revenue: 3908, orders: 28, users: 134 },
    { month: 'May', sales: 1890, revenue: 4800, orders: 22, users: 112 },
    { month: 'Jun', sales: 2390, revenue: 3800, orders: 26, users: 128 },
    { month: 'Jul', sales: 3490, revenue: 4300, orders: 35, users: 145 },
    { month: 'Aug', sales: 4200, revenue: 5200, orders: 42, users: 168 },
    { month: 'Sep', sales: 3800, revenue: 4800, orders: 38, users: 152 },
    { month: 'Oct', sales: 4500, revenue: 5500, orders: 45, users: 180 },
    { month: 'Nov', sales: 5200, revenue: 6200, orders: 52, users: 208 },
    { month: 'Dec', sales: 4800, revenue: 5800, orders: 48, users: 192 }
  ];

  const categoryData = [
    { name: 'Electronics', value: 400, color: '#8884d8' },
    { name: 'Clothing', value: 300, color: '#82ca9d' },
    { name: 'Books', value: 200, color: '#ffc658' },
    { name: 'Home & Garden', value: 150, color: '#ff7300' },
    { name: 'Sports', value: 100, color: '#00ff00' },
    { name: 'Beauty', value: 80, color: '#ff00ff' }
  ];


  const performanceData = [
    { subject: 'Speed', A: 120, B: 110, fullMark: 150 },
    { subject: 'Reliability', A: 98, B: 130, fullMark: 150 },
    { subject: 'Comfort', A: 86, B: 130, fullMark: 150 },
    { subject: 'Safety', A: 99, B: 100, fullMark: 150 },
    { subject: 'Efficiency', A: 85, B: 90, fullMark: 150 },
    { subject: 'Design', A: 65, B: 85, fullMark: 150 }
  ];

  const scatterData = [
    { x: 100, y: 200, z: 200 },
    { x: 120, y: 100, z: 260 },
    { x: 170, y: 300, z: 400 },
    { x: 140, y: 250, z: 280 },
    { x: 150, y: 400, z: 500 },
    { x: 110, y: 280, z: 200 }
  ];

  const chartTypes = [
    { id: 'line', label: 'Line Chart', icon: FaChartLine },
    { id: 'area', label: 'Area Chart', icon: FaChartArea },
    { id: 'bar', label: 'Bar Chart', icon: FaChartBar },
    { id: 'pie', label: 'Pie Chart', icon: FaChartPie },
    { id: 'scatter', label: 'Scatter Plot', icon: FaChartLine },
    { id: 'radar', label: 'Radar Chart', icon: FaChartLine },
    { id: 'composed', label: 'Composed Chart', icon: FaChartBar }
  ];

  const timeRanges = [
    { value: '1M', label: '1 Month' },
    { value: '3M', label: '3 Months' },
    { value: '6M', label: '6 Months' },
    { value: '1Y', label: '1 Year' },
    { value: 'ALL', label: 'All Time' }
  ];

  const statsCards = [
    {
      title: 'Total Revenue',
      value: '$124,500',
      change: '+12.5%',
      trend: 'up',
      icon: FaDollarSign,
      color: '#10b981'
    },
    {
      title: 'Active Users',
      value: '2,847',
      change: '+8.2%',
      trend: 'up',
      icon: FaUsers,
      color: '#3b82f6'
    },
    {
      title: 'Total Orders',
      value: '1,234',
      change: '-2.1%',
      trend: 'down',
      icon: FaShoppingCart,
      color: '#f59e0b'
    },
    {
      title: 'Page Views',
      value: '45,678',
      change: '+15.3%',
      trend: 'up',
      icon: FaEye,
      color: '#8b5cf6'
    }
  ];

  const renderChart = () => {
    const commonProps = {
      width: '100%',
      height: 400,
      data: salesData
    };

    switch (selectedChart) {
      case 'line':
        return (
          <ResponsiveContainer {...commonProps}>
            <LineChart data={salesData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.1)" />
              <XAxis dataKey="month" stroke="rgba(255, 255, 255, 0.6)" />
              <YAxis stroke="rgba(255, 255, 255, 0.6)" />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'rgba(0, 26, 75, 0.95)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '8px',
                  color: '#ffffff'
                }}
              />
              <Legend />
              <Line type="monotone" dataKey="sales" stroke="#8884d8" strokeWidth={2} />
              <Line type="monotone" dataKey="revenue" stroke="#82ca9d" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        );

      case 'area':
        return (
          <ResponsiveContainer {...commonProps}>
            <AreaChart data={salesData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.1)" />
              <XAxis dataKey="month" stroke="rgba(255, 255, 255, 0.6)" />
              <YAxis stroke="rgba(255, 255, 255, 0.6)" />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'rgba(0, 26, 75, 0.95)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '8px',
                  color: '#ffffff'
                }}
              />
              <Legend />
              <Area type="monotone" dataKey="sales" stackId="1" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
              <Area type="monotone" dataKey="revenue" stackId="1" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.6} />
            </AreaChart>
          </ResponsiveContainer>
        );

      case 'bar':
        return (
          <ResponsiveContainer {...commonProps}>
            <BarChart data={salesData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.1)" />
              <XAxis dataKey="month" stroke="rgba(255, 255, 255, 0.6)" />
              <YAxis stroke="rgba(255, 255, 255, 0.6)" />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'rgba(0, 26, 75, 0.95)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '8px',
                  color: '#ffffff'
                }}
              />
              <Legend />
              <Bar dataKey="sales" fill="#8884d8" radius={[4, 4, 0, 0]} />
              <Bar dataKey="revenue" fill="#82ca9d" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        );

      case 'pie':
        return (
          <ResponsiveContainer {...commonProps}>
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={120}
                fill="#8884d8"
                dataKey="value"
              >
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'rgba(0, 26, 75, 0.95)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '8px',
                  color: '#ffffff'
                }}
              />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        );

      case 'scatter':
        return (
          <ResponsiveContainer {...commonProps}>
            <ScatterChart data={scatterData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.1)" />
              <XAxis type="number" dataKey="x" name="Price" stroke="rgba(255, 255, 255, 0.6)" />
              <YAxis type="number" dataKey="y" name="Sales" stroke="rgba(255, 255, 255, 0.6)" />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'rgba(0, 26, 75, 0.95)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '8px',
                  color: '#ffffff'
                }}
              />
              <Scatter dataKey="z" fill="#8884d8" />
            </ScatterChart>
          </ResponsiveContainer>
        );

      case 'radar':
        return (
          <ResponsiveContainer {...commonProps}>
            <RadarChart data={performanceData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <PolarGrid stroke="rgba(255, 255, 255, 0.1)" />
              <PolarAngleAxis dataKey="subject" stroke="rgba(255, 255, 255, 0.6)" />
              <PolarRadiusAxis stroke="rgba(255, 255, 255, 0.6)" />
              <Radar name="Product A" dataKey="A" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
              <Radar name="Product B" dataKey="B" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.6} />
              <Legend />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'rgba(0, 26, 75, 0.95)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '8px',
                  color: '#ffffff'
                }}
              />
            </RadarChart>
          </ResponsiveContainer>
        );

      case 'composed':
        return (
          <ResponsiveContainer {...commonProps}>
            <ComposedChart data={salesData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.1)" />
              <XAxis dataKey="month" stroke="rgba(255, 255, 255, 0.6)" />
              <YAxis stroke="rgba(255, 255, 255, 0.6)" />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'rgba(0, 26, 75, 0.95)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '8px',
                  color: '#ffffff'
                }}
              />
              <Legend />
              <Bar dataKey="orders" fill="#8884d8" radius={[4, 4, 0, 0]} />
              <Line type="monotone" dataKey="users" stroke="#82ca9d" strokeWidth={2} />
            </ComposedChart>
          </ResponsiveContainer>
        );

      default:
        return null;
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return <FaArrowUp className="trend-icon up" />;
      case 'down':
        return <FaArrowDown className="trend-icon down" />;
      default:
        return <FaMinus className="trend-icon neutral" />;
    }
  };

  return (
    <div className='charts-page'>
      <div className="charts-header">
        <div className="header-left">
          <h1>Analytics Dashboard</h1>
          <p>Comprehensive data visualization and insights</p>
        </div>
        <div className="header-right">
          <div className="chart-controls">
            <select 
              value={timeRange} 
              onChange={(e) => setTimeRange(e.target.value)}
              className="time-range-select"
            >
              {timeRanges.map(range => (
                <option key={range.value} value={range.value}>
                  {range.label}
                </option>
              ))}
            </select>
            <button className="refresh-btn">
              <FaDownload />
            </button>
            <button className="download-btn">
              <FaDownload />
            </button>
            <button className="settings-btn">
              <FaCog />
            </button>
          </div>
        </div>
      </div>

      <div className="stats-grid">
        {statsCards.map((stat, index) => {
          const IconComponent = stat.icon;
          return (
            <div key={index} className="stat-card">
              <div className="stat-header">
                <div className="stat-icon" style={{ backgroundColor: `${stat.color}20` }}>
                  <IconComponent style={{ color: stat.color }} />
                </div>
                <div className="stat-trend">
                  {getTrendIcon(stat.trend)}
                  <span className={`trend-text ${stat.trend}`}>{stat.change}</span>
                </div>
              </div>
              <div className="stat-content">
                <h3>{stat.value}</h3>
                <p>{stat.title}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="charts-container">
        <div className="charts-sidebar">
          <div className="chart-types">
            <h3>Chart Types</h3>
            <div className="chart-type-list">
              {chartTypes.map(chart => {
                const IconComponent = chart.icon;
                return (
                  <button
                    key={chart.id}
                    className={`chart-type-btn ${selectedChart === chart.id ? 'active' : ''}`}
                    onClick={() => setSelectedChart(chart.id)}
                  >
                    <IconComponent />
                    <span>{chart.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="chart-filters">
            <h3>Filters</h3>
            <div className="filter-group">
              <label>Data Source</label>
              <select className="filter-select">
                <option value="sales">Sales Data</option>
                <option value="users">User Data</option>
                <option value="orders">Order Data</option>
                <option value="revenue">Revenue Data</option>
              </select>
            </div>
            <div className="filter-group">
              <label>Chart Style</label>
              <select className="filter-select">
                <option value="default">Default</option>
                <option value="minimal">Minimal</option>
                <option value="colorful">Colorful</option>
                <option value="monochrome">Monochrome</option>
              </select>
            </div>
          </div>
        </div>

        <div className="charts-main">
          <div className="chart-header">
            <div className="chart-title">
              <h2>
                {chartTypes.find(chart => chart.id === selectedChart)?.label}
              </h2>
              <p>Data visualization for {timeRange} period</p>
            </div>
            <div className="chart-actions">
              <button className="view-toggle-btn">
                {viewMode === 'grid' ? <FaCompress /> : <FaExpand />}
              </button>
            </div>
          </div>

          <div className="chart-container">
            <div className="chart-wrapper">
              {renderChart()}
            </div>
          </div>

          <div className="chart-insights">
            <h3>Key Insights</h3>
            <div className="insights-grid">
              <div className="insight-item">
                <div className="insight-icon">
                  <FaChartLine />
                </div>
                <div className="insight-content">
                  <h4>Growth Trend</h4>
                  <p>Sales have increased by 12.5% compared to last month</p>
                </div>
              </div>
              <div className="insight-item">
                <div className="insight-icon">
                  <FaUsers />
                </div>
                <div className="insight-content">
                  <h4>User Engagement</h4>
                  <p>Active users are up 8.2% with improved retention</p>
                </div>
              </div>
              <div className="insight-item">
                <div className="insight-icon">
                  <FaShoppingCart />
                </div>
                <div className="insight-content">
                  <h4>Order Volume</h4>
                  <p>Order count decreased slightly but revenue per order increased</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Charts;
