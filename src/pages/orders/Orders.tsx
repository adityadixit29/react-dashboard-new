import { useState } from 'react';
import { 
  FaShoppingCart, 
  FaCheckCircle, 
  FaClock, 
  FaDollarSign, 
  FaSearch, 
  FaEdit, 
  FaTrash, 
  FaPlus,
  FaTable,
  FaTh,
  FaExclamationTriangle,
  FaTruck,
  FaMapMarkerAlt
} from 'react-icons/fa';
import "./orders.scss";

// Mock order data
const mockOrders = [
  {
    id: 1,
    orderNumber: "ORD-2024-001",
    customer: {
      name: "Aarav Sharma",
      email: "aarav@gmail.com",
      phone: "+91 98765 43210",
      avatar: "https://images.pexels.com/photos/8405873/pexels-photo-8405873.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load"
    },
    items: [
      { name: "MacBook Pro 16-inch", quantity: 1, price: 2499.99 },
      { name: "AirPods Pro 2nd Gen", quantity: 1, price: 249.99 }
    ],
    status: "delivered",
    total: 2749.98,
    shippingAddress: "123 Tech Street, Mumbai, Maharashtra 400001",
    orderDate: "2024-01-15",
    deliveryDate: "2024-01-18",
    paymentMethod: "Credit Card",
    trackingNumber: "TRK123456789"
  },
  {
    id: 2,
    orderNumber: "ORD-2024-002",
    customer: {
      name: "Kiara Patel",
      email: "kiara@gmail.com",
      phone: "+91 87654 32109",
      avatar: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1600"
    },
    items: [
      { name: "iPhone 15 Pro", quantity: 1, price: 999.99 },
      { name: "Apple Watch Series 9", quantity: 1, price: 399.99 }
    ],
    status: "shipped",
    total: 1399.98,
    shippingAddress: "456 Business Ave, Delhi, Delhi 110001",
    orderDate: "2024-01-16",
    deliveryDate: "2024-01-20",
    paymentMethod: "UPI",
    trackingNumber: "TRK987654321"
  },
  {
    id: 3,
    orderNumber: "ORD-2024-003",
    customer: {
      name: "Zara Khan",
      email: "zara@gmail.com",
      phone: "+91 76543 21098",
      avatar: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=1600"
    },
    items: [
      { name: "Sony WH-1000XM5", quantity: 2, price: 399.99 }
    ],
    status: "processing",
    total: 799.98,
    shippingAddress: "789 Garden Road, Bangalore, Karnataka 560001",
    orderDate: "2024-01-17",
    deliveryDate: "2024-01-22",
    paymentMethod: "Net Banking",
    trackingNumber: null
  },
  {
    id: 4,
    orderNumber: "ORD-2024-004",
    customer: {
      name: "Adeline Chen",
      email: "adeline@gmail.com",
      phone: "+91 65432 10987",
      avatar: "https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=1600"
    },
    items: [
      { name: "Samsung Galaxy S24", quantity: 1, price: 799.99 },
      { name: "Nintendo Switch OLED", quantity: 1, price: 349.99 }
    ],
    status: "pending",
    total: 1149.98,
    shippingAddress: "321 Innovation Hub, Pune, Maharashtra 411001",
    orderDate: "2024-01-18",
    deliveryDate: "2024-01-25",
    paymentMethod: "Credit Card",
    trackingNumber: null
  },
  {
    id: 5,
    orderNumber: "ORD-2024-005",
    customer: {
      name: "Aanya Singh",
      email: "aanya@gmail.com",
      phone: "+91 54321 09876",
      avatar: "https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=1600"
    },
    items: [
      { name: "Canon EOS R6 Mark II", quantity: 1, price: 2499.99 },
      { name: "MacBook Pro 16-inch", quantity: 1, price: 2499.99 }
    ],
    status: "delivered",
    total: 4999.98,
    shippingAddress: "654 Creative District, Chennai, Tamil Nadu 600001",
    orderDate: "2024-01-12",
    deliveryDate: "2024-01-16",
    paymentMethod: "Bank Transfer",
    trackingNumber: "TRK456789123"
  },
  {
    id: 6,
    orderNumber: "ORD-2024-006",
    customer: {
      name: "Vihaan Kumar",
      email: "vihaan@gmail.com",
      phone: "+91 43210 98765",
      avatar: "https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=1600"
    },
    items: [
      { name: "Dell XPS 13", quantity: 1, price: 1299.99 }
    ],
    status: "cancelled",
    total: 1299.99,
    shippingAddress: "987 Startup Lane, Hyderabad, Telangana 500001",
    orderDate: "2024-01-14",
    deliveryDate: null,
    paymentMethod: "Credit Card",
    trackingNumber: null
  },
  {
    id: 7,
    orderNumber: "ORD-2024-007",
    customer: {
      name: "Avani Reddy",
      email: "avani@gmail.com",
      phone: "+91 32109 87654",
      avatar: "https://images.pexels.com/photos/874158/pexels-photo-874158.jpeg?auto=compress&cs=tinysrgb&w=1600"
    },
    items: [
      { name: "iPad Air 5th Gen", quantity: 1, price: 599.99 },
      { name: "AirPods Pro 2nd Gen", quantity: 1, price: 249.99 }
    ],
    status: "shipped",
    total: 849.98,
    shippingAddress: "147 Digital Park, Kochi, Kerala 682001",
    orderDate: "2024-01-19",
    deliveryDate: "2024-01-23",
    paymentMethod: "UPI",
    trackingNumber: "TRK789123456"
  },
  {
    id: 8,
    orderNumber: "ORD-2024-008",
    customer: {
      name: "Rohan Gupta",
      email: "rohan@gmail.com",
      phone: "+91 21098 76543",
      avatar: "https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=1600"
    },
    items: [
      { name: "Apple Watch Series 9", quantity: 2, price: 399.99 },
      { name: "iPhone 15 Pro", quantity: 1, price: 999.99 }
    ],
    status: "processing",
    total: 1799.97,
    shippingAddress: "258 Tech Valley, Ahmedabad, Gujarat 380001",
    orderDate: "2024-01-20",
    deliveryDate: "2024-01-25",
    paymentMethod: "Net Banking",
    trackingNumber: null
  }
];

const Orders = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [paymentFilter, setPaymentFilter] = useState('all');
  const [viewMode, setViewMode] = useState('table');

  // Filter orders based on search and filters
  const filteredOrders = mockOrders.filter(order => {
    const matchesSearch = order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.customer.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    const matchesPayment = paymentFilter === 'all' || order.paymentMethod === paymentFilter;
    
    return matchesSearch && matchesStatus && matchesPayment;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered': return '#10b981';
      case 'shipped': return '#3b82f6';
      case 'processing': return '#f59e0b';
      case 'pending': return '#6b7280';
      case 'cancelled': return '#ef4444';
      default: return '#6b7280';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'delivered': return 'Delivered';
      case 'shipped': return 'Shipped';
      case 'processing': return 'Processing';
      case 'pending': return 'Pending';
      case 'cancelled': return 'Cancelled';
      default: return status;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'delivered': return <FaCheckCircle />;
      case 'shipped': return <FaTruck />;
      case 'processing': return <FaClock />;
      case 'pending': return <FaClock />;
      case 'cancelled': return <FaExclamationTriangle />;
      default: return <FaClock />;
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getTotalRevenue = () => {
    return mockOrders
      .filter(order => order.status !== 'cancelled')
      .reduce((sum, order) => sum + order.total, 0);
  };

  const getTotalOrders = () => {
    return mockOrders.length;
  };

  const getDeliveredOrders = () => {
    return mockOrders.filter(order => order.status === 'delivered').length;
  };

  const getPendingOrders = () => {
    return mockOrders.filter(order => ['pending', 'processing', 'shipped'].includes(order.status)).length;
  };

  return (
    <div className='orders'>
      <div className="orders-header">
        <div className="header-left">
          <h1>Orders Management</h1>
          <p>Track and manage customer orders</p>
        </div>
        <div className="header-right">
          <button className="add-order-btn">
            <FaPlus />
            Add Order
          </button>
        </div>
      </div>

      <div className="orders-stats">
        <div className="stat-card">
          <div className="stat-icon">
            <FaShoppingCart />
          </div>
          <div className="stat-content">
            <h3>{getTotalOrders()}</h3>
            <p>Total Orders</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">
            <FaCheckCircle />
          </div>
          <div className="stat-content">
            <h3>{getDeliveredOrders()}</h3>
            <p>Delivered</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">
            <FaClock />
          </div>
          <div className="stat-content">
            <h3>{getPendingOrders()}</h3>
            <p>Pending</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">
            <FaDollarSign />
          </div>
          <div className="stat-content">
            <h3>{formatPrice(getTotalRevenue())}</h3>
            <p>Total Revenue</p>
          </div>
        </div>
      </div>

      <div className="orders-controls">
        <div className="search-section">
          <div className="search-box">
            <FaSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search orders..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        
        <div className="filters-section">
          <select 
            value={statusFilter} 
            onChange={(e) => setStatusFilter(e.target.value)}
            className="filter-select"
          >
            <option value="all">All Status</option>
            <option value="delivered">Delivered</option>
            <option value="shipped">Shipped</option>
            <option value="processing">Processing</option>
            <option value="pending">Pending</option>
            <option value="cancelled">Cancelled</option>
          </select>
          
          <select 
            value={paymentFilter} 
            onChange={(e) => setPaymentFilter(e.target.value)}
            className="filter-select"
          >
            <option value="all">All Payment Methods</option>
            <option value="Credit Card">Credit Card</option>
            <option value="UPI">UPI</option>
            <option value="Net Banking">Net Banking</option>
            <option value="Bank Transfer">Bank Transfer</option>
          </select>
        </div>

        <div className="view-toggle">
          <button 
            className={viewMode === 'table' ? 'active' : ''}
            onClick={() => setViewMode('table')}
          >
            <FaTable />
            Table
          </button>
          <button 
            className={viewMode === 'cards' ? 'active' : ''}
            onClick={() => setViewMode('cards')}
          >
            <FaTh />
            Cards
          </button>
        </div>
      </div>

      {viewMode === 'table' ? (
        <div className="orders-table-container">
          <table className="orders-table">
            <thead>
              <tr>
                <th>Order</th>
                <th>Customer</th>
                <th>Items</th>
                <th>Total</th>
                <th>Status</th>
                <th>Payment</th>
                <th>Order Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map(order => (
                <tr key={order.id}>
                  <td>
                    <div className="order-info">
                      <span className="order-number">{order.orderNumber}</span>
                      <span className="tracking-number">
                        {order.trackingNumber ? `Tracking: ${order.trackingNumber}` : 'No tracking'}
                      </span>
                    </div>
                  </td>
                  <td>
                    <div className="customer-info">
                      <img src={order.customer.avatar} alt={order.customer.name} />
                      <div className="customer-details">
                        <span className="customer-name">{order.customer.name}</span>
                        <span className="customer-email">{order.customer.email}</span>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="items-info">
                      <span className="items-count">{order.items.length} item(s)</span>
                      <span className="items-preview">
                        {order.items.map(item => item.name).join(', ')}
                      </span>
                    </div>
                  </td>
                  <td>
                    <span className="total">{formatPrice(order.total)}</span>
                  </td>
                  <td>
                    <span 
                      className="status-badge"
                      style={{ backgroundColor: getStatusColor(order.status) }}
                    >
                      {getStatusIcon(order.status)}
                      {getStatusText(order.status)}
                    </span>
                  </td>
                  <td>
                    <span className="payment-method">{order.paymentMethod}</span>
                  </td>
                  <td>
                    <span className="order-date">{formatDate(order.orderDate)}</span>
                  </td>
                  <td>
                    <div className="action-buttons">
                      <button className="edit-btn">
                        <FaEdit />
                      </button>
                      <button className="delete-btn">
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="orders-cards">
          {filteredOrders.map(order => (
            <div key={order.id} className="order-card">
              <div className="card-header">
                <div className="order-number">{order.orderNumber}</div>
                <div className="card-actions">
                  <button className="edit-btn">
                    <FaEdit />
                  </button>
                  <button className="delete-btn">
                    <FaTrash />
                  </button>
                </div>
              </div>
              
              <div className="customer-section">
                <img src={order.customer.avatar} alt={order.customer.name} />
                <div className="customer-info">
                  <h3>{order.customer.name}</h3>
                  <p>{order.customer.email}</p>
                  <p>{order.customer.phone}</p>
                </div>
              </div>

              <div className="order-details">
                <div className="info-row">
                  <span className="label">Items:</span>
                  <span className="items-count">{order.items.length} item(s)</span>
                </div>
                <div className="info-row">
                  <span className="label">Total:</span>
                  <span className="total">{formatPrice(order.total)}</span>
                </div>
                <div className="info-row">
                  <span className="label">Status:</span>
                  <span 
                    className="status-badge"
                    style={{ backgroundColor: getStatusColor(order.status) }}
                  >
                    {getStatusIcon(order.status)}
                    {getStatusText(order.status)}
                  </span>
                </div>
                <div className="info-row">
                  <span className="label">Payment:</span>
                  <span className="payment-method">{order.paymentMethod}</span>
                </div>
                <div className="info-row">
                  <span className="label">Order Date:</span>
                  <span className="order-date">{formatDate(order.orderDate)}</span>
                </div>
                {order.deliveryDate && (
                  <div className="info-row">
                    <span className="label">Delivery Date:</span>
                    <span className="delivery-date">{formatDate(order.deliveryDate)}</span>
                  </div>
                )}
                {order.trackingNumber && (
                  <div className="info-row">
                    <span className="label">Tracking:</span>
                    <span className="tracking-number">{order.trackingNumber}</span>
                  </div>
                )}
              </div>

              <div className="shipping-info">
                <FaMapMarkerAlt />
                <span>{order.shippingAddress}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {filteredOrders.length === 0 && (
        <div className="no-results">
          <div className="no-results-icon">
            <FaExclamationTriangle />
          </div>
          <h3>No orders found</h3>
          <p>Try adjusting your search or filter criteria</p>
        </div>
      )}
    </div>
  );
};

export default Orders;
