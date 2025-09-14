import { useState } from 'react';
import { 
  FaBox, 
  FaCheckCircle, 
  FaDollarSign, 
  FaSearch, 
  FaEdit, 
  FaTrash, 
  FaPlus,
  FaTable,
  FaTh,
  FaExclamationTriangle,
  FaTag,
  FaWarehouse
} from 'react-icons/fa';
import "./products.scss";

// Mock product data
const mockProducts = [
  {
    id: 1,
    name: "MacBook Pro 16-inch",
    category: "Electronics",
    price: 2499.99,
    stock: 45,
    status: "active",
    sku: "MBP-16-2024",
    image: "https://images.pexels.com/photos/18105/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=400",
    description: "Latest MacBook Pro with M3 Pro chip",
    createdAt: "2024-01-15",
    updatedAt: "2024-01-20",
    sales: 127,
    revenue: 317493.73
  },
  {
    id: 2,
    name: "iPhone 15 Pro",
    category: "Electronics",
    price: 999.99,
    stock: 89,
    status: "active",
    sku: "IPH-15-PRO",
    image: "https://images.pexels.com/photos/788946/pexels-photo-788946.jpeg?auto=compress&cs=tinysrgb&w=400",
    description: "Apple iPhone 15 Pro with titanium design",
    createdAt: "2024-01-10",
    updatedAt: "2024-01-18",
    sales: 234,
    revenue: 233997.66
  },
  {
    id: 3,
    name: "AirPods Pro 2nd Gen",
    category: "Audio",
    price: 249.99,
    stock: 156,
    status: "active",
    sku: "APP-2ND-GEN",
    image: "https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=400",
    description: "Wireless earbuds with active noise cancellation",
    createdAt: "2024-01-05",
    updatedAt: "2024-01-15",
    sales: 445,
    revenue: 111245.55
  },
  {
    id: 4,
    name: "Samsung Galaxy S24",
    category: "Electronics",
    price: 799.99,
    stock: 23,
    status: "low-stock",
    sku: "SGS-24-128",
    image: "https://images.pexels.com/photos/788946/pexels-photo-788946.jpeg?auto=compress&cs=tinysrgb&w=400",
    description: "Samsung Galaxy S24 with AI-powered features",
    createdAt: "2024-01-12",
    updatedAt: "2024-01-22",
    sales: 89,
    revenue: 71199.11
  },
  {
    id: 5,
    name: "Sony WH-1000XM5",
    category: "Audio",
    price: 399.99,
    stock: 67,
    status: "active",
    sku: "SONY-WH-1000XM5",
    image: "https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=400",
    description: "Premium noise-canceling wireless headphones",
    createdAt: "2024-01-08",
    updatedAt: "2024-01-16",
    sales: 156,
    revenue: 62398.44
  },
  {
    id: 6,
    name: "iPad Air 5th Gen",
    category: "Electronics",
    price: 599.99,
    stock: 0,
    status: "out-of-stock",
    sku: "IPA-AIR-5TH",
    image: "https://images.pexels.com/photos/18105/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=400",
    description: "iPad Air with M1 chip and Liquid Retina display",
    createdAt: "2024-01-03",
    updatedAt: "2024-01-25",
    sales: 78,
    revenue: 46799.22
  },
  {
    id: 7,
    name: "Apple Watch Series 9",
    category: "Wearables",
    price: 399.99,
    stock: 134,
    status: "active",
    sku: "AWS-9-GPS",
    image: "https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=400",
    description: "Apple Watch Series 9 with advanced health features",
    createdAt: "2024-01-07",
    updatedAt: "2024-01-19",
    sales: 298,
    revenue: 119197.02
  },
  {
    id: 8,
    name: "Dell XPS 13",
    category: "Electronics",
    price: 1299.99,
    stock: 12,
    status: "low-stock",
    sku: "DLL-XPS-13-2024",
    image: "https://images.pexels.com/photos/18105/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=400",
    description: "Dell XPS 13 laptop with Intel Core i7",
    createdAt: "2024-01-14",
    updatedAt: "2024-01-21",
    sales: 45,
    revenue: 58499.55
  },
  {
    id: 9,
    name: "Nintendo Switch OLED",
    category: "Gaming",
    price: 349.99,
    stock: 78,
    status: "active",
    sku: "NIN-SW-OLED",
    image: "https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=400",
    description: "Nintendo Switch with OLED display",
    createdAt: "2024-01-06",
    updatedAt: "2024-01-17",
    sales: 167,
    revenue: 58448.33
  },
  {
    id: 10,
    name: "Canon EOS R6 Mark II",
    category: "Photography",
    price: 2499.99,
    stock: 8,
    status: "low-stock",
    sku: "CAN-EOS-R6-MK2",
    image: "https://images.pexels.com/photos/18105/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=400",
    description: "Professional mirrorless camera with 24MP sensor",
    createdAt: "2024-01-11",
    updatedAt: "2024-01-23",
    sales: 23,
    revenue: 57499.77
  }
];

const Products = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [viewMode, setViewMode] = useState('table');

  // Filter products based on search and filters
  const filteredProducts = mockProducts.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || product.status === statusFilter;
    const matchesCategory = categoryFilter === 'all' || product.category === categoryFilter;
    
    return matchesSearch && matchesStatus && matchesCategory;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return '#10b981';
      case 'low-stock': return '#f59e0b';
      case 'out-of-stock': return '#ef4444';
      default: return '#6b7280';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active': return 'Active';
      case 'low-stock': return 'Low Stock';
      case 'out-of-stock': return 'Out of Stock';
      default: return status;
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-US').format(num);
  };

  return (
    <div className='products'>
      <div className="products-header">
        <div className="header-left">
          <h1>Products Management</h1>
          <p>Manage and monitor product inventory</p>
        </div>
        <div className="header-right">
          <button className="add-product-btn">
            <FaPlus />
            Add Product
          </button>
        </div>
      </div>

      <div className="products-stats">
        <div className="stat-card">
          <div className="stat-icon">
            <FaBox />
          </div>
          <div className="stat-content">
            <h3>{mockProducts.length}</h3>
            <p>Total Products</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">
            <FaCheckCircle />
          </div>
          <div className="stat-content">
            <h3>{mockProducts.filter(p => p.status === 'active').length}</h3>
            <p>Active Products</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">
            <FaWarehouse />
          </div>
          <div className="stat-content">
            <h3>{formatNumber(mockProducts.reduce((sum, p) => sum + p.stock, 0))}</h3>
            <p>Total Stock</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">
            <FaDollarSign />
          </div>
          <div className="stat-content">
            <h3>{formatPrice(mockProducts.reduce((sum, p) => sum + p.revenue, 0))}</h3>
            <p>Total Revenue</p>
          </div>
        </div>
      </div>

      <div className="products-controls">
        <div className="search-section">
          <div className="search-box">
            <FaSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search products..."
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
            <option value="active">Active</option>
            <option value="low-stock">Low Stock</option>
            <option value="out-of-stock">Out of Stock</option>
          </select>
          
          <select 
            value={categoryFilter} 
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="filter-select"
          >
            <option value="all">All Categories</option>
            <option value="Electronics">Electronics</option>
            <option value="Audio">Audio</option>
            <option value="Wearables">Wearables</option>
            <option value="Gaming">Gaming</option>
            <option value="Photography">Photography</option>
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
        <div className="products-table-container">
          <table className="products-table">
            <thead>
              <tr>
                <th>Product</th>
                <th>Category</th>
                <th>Price</th>
                <th>Stock</th>
                <th>Status</th>
                <th>SKU</th>
                <th>Sales</th>
                <th>Revenue</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map(product => (
                <tr key={product.id}>
                  <td>
                    <div className="product-info">
                      <img src={product.image} alt={product.name} />
                      <div className="product-details">
                        <span className="product-name">{product.name}</span>
                        <span className="product-description">{product.description}</span>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className="category-badge">
                      <FaTag />
                      {product.category}
                    </span>
                  </td>
                  <td>
                    <span className="price">{formatPrice(product.price)}</span>
                  </td>
                  <td>
                    <span className={`stock ${product.stock === 0 ? 'out-of-stock' : product.stock < 20 ? 'low-stock' : 'in-stock'}`}>
                      {formatNumber(product.stock)}
                    </span>
                  </td>
                  <td>
                    <span 
                      className="status-badge"
                      style={{ backgroundColor: getStatusColor(product.status) }}
                    >
                      {getStatusText(product.status)}
                    </span>
                  </td>
                  <td>
                    <span className="sku">{product.sku}</span>
                  </td>
                  <td>
                    <span className="sales">{formatNumber(product.sales)}</span>
                  </td>
                  <td>
                    <span className="revenue">{formatPrice(product.revenue)}</span>
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
        <div className="products-cards">
          {filteredProducts.map(product => (
            <div key={product.id} className="product-card">
              <div className="card-header">
                <img src={product.image} alt={product.name} />
                <div className="product-details">
                  <h3>{product.name}</h3>
                  <p>{product.description}</p>
                </div>
                <div className="card-actions">
                  <button className="edit-btn">
                    <FaEdit />
                  </button>
                  <button className="delete-btn">
                    <FaTrash />
                  </button>
                </div>
              </div>
              <div className="card-body">
                <div className="info-row">
                  <span className="label">Category:</span>
                  <span className="category-badge">
                    <FaTag />
                    {product.category}
                  </span>
                </div>
                <div className="info-row">
                  <span className="label">Price:</span>
                  <span className="price">{formatPrice(product.price)}</span>
                </div>
                <div className="info-row">
                  <span className="label">Stock:</span>
                  <span className={`stock ${product.stock === 0 ? 'out-of-stock' : product.stock < 20 ? 'low-stock' : 'in-stock'}`}>
                    {formatNumber(product.stock)}
                  </span>
                </div>
                <div className="info-row">
                  <span className="label">Status:</span>
                  <span 
                    className="status-badge"
                    style={{ backgroundColor: getStatusColor(product.status) }}
                  >
                    {getStatusText(product.status)}
                  </span>
                </div>
                <div className="info-row">
                  <span className="label">SKU:</span>
                  <span className="sku">{product.sku}</span>
                </div>
              </div>
              <div className="card-footer">
                <div className="stat-item">
                  <span className="stat-number">{formatNumber(product.sales)}</span>
                  <span className="stat-label">Sales</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">{formatPrice(product.revenue)}</span>
                  <span className="stat-label">Revenue</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {filteredProducts.length === 0 && (
        <div className="no-results">
          <div className="no-results-icon">
            <FaExclamationTriangle />
          </div>
          <h3>No products found</h3>
          <p>Try adjusting your search or filter criteria</p>
        </div>
      )}
    </div>
  );
};

export default Products;