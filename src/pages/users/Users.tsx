import { useState } from 'react';
import { 
  FaUsers, 
  FaCheckCircle, 
  FaShoppingCart, 
  FaDollarSign, 
  FaSearch, 
  FaEdit, 
  FaTrash, 
  FaPlus,
  FaTable,
  FaTh,
  FaExclamationTriangle
} from 'react-icons/fa';
import "./users.scss";

// Mock user data
const mockUsers = [
  {
    id: 1,
    img: "https://images.pexels.com/photos/8405873/pexels-photo-8405873.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load",
    username: "Aarav Sharma",
    email: "aarav@gmail.com",
    phone: "+91 98765 43210",
    status: "active",
    role: "Admin",
    joinDate: "2023-01-15",
    lastActive: "2 hours ago",
    totalOrders: 45,
    totalSpent: "$3,668"
  },
  {
    id: 2,
    img: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1600",
    username: "Kiara Patel",
    email: "kiara@gmail.com",
    phone: "+91 87654 32109",
    status: "active",
    role: "User",
    joinDate: "2023-02-20",
    lastActive: "1 day ago",
    totalOrders: 32,
    totalSpent: "$2,256"
  },
  {
    id: 3,
    img: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=1600",
    username: "Zara Khan",
    email: "zara@gmail.com",
    phone: "+91 76543 21098",
    status: "inactive",
    role: "User",
    joinDate: "2023-03-10",
    lastActive: "1 week ago",
    totalOrders: 18,
    totalSpent: "$1,998"
  },
  {
    id: 4,
    img: "https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=1600",
    username: "Adeline Chen",
    email: "adeline@gmail.com",
    phone: "+91 65432 10987",
    status: "active",
    role: "Moderator",
    joinDate: "2023-04-05",
    lastActive: "30 minutes ago",
    totalOrders: 67,
    totalSpent: "$4,512"
  },
  {
    id: 5,
    img: "https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=1600",
    username: "Aanya Singh",
    email: "aanya@gmail.com",
    phone: "+91 54321 09876",
    status: "active",
    role: "User",
    joinDate: "2023-05-12",
    lastActive: "3 hours ago",
    totalOrders: 28,
    totalSpent: "$2,134"
  },
  {
    id: 6,
    img: "https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=1600",
    username: "Vihaan Kumar",
    email: "vihaan@gmail.com",
    phone: "+91 43210 98765",
    status: "active",
    role: "User",
    joinDate: "2023-06-18",
    lastActive: "5 hours ago",
    totalOrders: 41,
    totalSpent: "$2,932"
  },
  {
    id: 7,
    img: "https://images.pexels.com/photos/874158/pexels-photo-874158.jpeg?auto=compress&cs=tinysrgb&w=1600",
    username: "Avani Reddy",
    email: "avani@gmail.com",
    phone: "+91 32109 87654",
    status: "pending",
    role: "User",
    joinDate: "2023-07-25",
    lastActive: "2 days ago",
    totalOrders: 12,
    totalSpent: "$1,560"
  },
  {
    id: 8,
    img: "https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=1600",
    username: "Rohan Gupta",
    email: "rohan@gmail.com",
    phone: "+91 21098 76543",
    status: "active",
    role: "User",
    joinDate: "2023-08-30",
    lastActive: "1 hour ago",
    totalOrders: 35,
    totalSpent: "$2,789"
  }
];

const Users = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [roleFilter, setRoleFilter] = useState('all');
  const [viewMode, setViewMode] = useState('table'); // 'table' or 'cards'

  // Filter users based on search and filters
  const filteredUsers = mockUsers.filter(user => {
    const matchesSearch = user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || user.status === statusFilter;
    const matchesRole = roleFilter === 'all' || user.role === roleFilter;
    
    return matchesSearch && matchesStatus && matchesRole;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return '#4ade80';
      case 'inactive': return '#f87171';
      case 'pending': return '#fbbf24';
      default: return '#6b7280';
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'Admin': return '#8b5cf6';
      case 'Moderator': return '#06b6d4';
      case 'User': return '#10b981';
      default: return '#6b7280';
    }
  };

  return (
    <div className='users'>
      <div className="users-header">
        <div className="header-left">
          <h1>Users Management</h1>
          <p>Manage and monitor user accounts</p>
        </div>
        <div className="header-right">
          <button className="add-user-btn">
            <FaPlus />
            Add User
          </button>
        </div>
      </div>

      <div className="users-stats">
        <div className="stat-card">
          <div className="stat-icon">
            <FaUsers />
          </div>
          <div className="stat-content">
            <h3>{mockUsers.length}</h3>
            <p>Total Users</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">
            <FaCheckCircle />
          </div>
          <div className="stat-content">
            <h3>{mockUsers.filter(u => u.status === 'active').length}</h3>
            <p>Active Users</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">
            <FaShoppingCart />
          </div>
          <div className="stat-content">
            <h3>{mockUsers.reduce((sum, u) => sum + u.totalOrders, 0)}</h3>
            <p>Total Orders</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">
            <FaDollarSign />
          </div>
          <div className="stat-content">
            <h3>${mockUsers.reduce((sum, u) => sum + parseFloat(u.totalSpent.replace('$', '').replace(',', '')), 0).toLocaleString()}</h3>
            <p>Total Revenue</p>
          </div>
        </div>
      </div>

      <div className="users-controls">
        <div className="search-section">
          <div className="search-box">
            <FaSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search users..."
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
            <option value="inactive">Inactive</option>
            <option value="pending">Pending</option>
          </select>
          
          <select 
            value={roleFilter} 
            onChange={(e) => setRoleFilter(e.target.value)}
            className="filter-select"
          >
            <option value="all">All Roles</option>
            <option value="Admin">Admin</option>
            <option value="Moderator">Moderator</option>
            <option value="User">User</option>
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
        <div className="users-table-container">
          <table className="users-table">
            <thead>
              <tr>
                <th>User</th>
                <th>Contact</th>
                <th>Status</th>
                <th>Role</th>
                <th>Join Date</th>
                <th>Last Active</th>
                <th>Orders</th>
                <th>Spent</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map(user => (
                <tr key={user.id}>
                  <td>
                    <div className="user-info">
                      <img src={user.img} alt={user.username} />
                      <span>{user.username}</span>
                    </div>
                  </td>
                  <td>
                    <div className="contact-info">
                      <div>{user.email}</div>
                      <div className="phone">{user.phone}</div>
                    </div>
                  </td>
                  <td>
                    <span 
                      className="status-badge"
                      style={{ backgroundColor: getStatusColor(user.status) }}
                    >
                      {user.status}
                    </span>
                  </td>
                  <td>
                    <span 
                      className="role-badge"
                      style={{ backgroundColor: getRoleColor(user.role) }}
                    >
                      {user.role}
                    </span>
                  </td>
                  <td>{user.joinDate}</td>
                  <td>{user.lastActive}</td>
                  <td>{user.totalOrders}</td>
                  <td>{user.totalSpent}</td>
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
        <div className="users-cards">
          {filteredUsers.map(user => (
            <div key={user.id} className="user-card">
              <div className="card-header">
                <img src={user.img} alt={user.username} />
                <div className="user-details">
                  <h3>{user.username}</h3>
                  <p>{user.email}</p>
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
                  <span className="label">Status:</span>
                  <span 
                    className="status-badge"
                    style={{ backgroundColor: getStatusColor(user.status) }}
                  >
                    {user.status}
                  </span>
                </div>
                <div className="info-row">
                  <span className="label">Role:</span>
                  <span 
                    className="role-badge"
                    style={{ backgroundColor: getRoleColor(user.role) }}
                  >
                    {user.role}
                  </span>
                </div>
                <div className="info-row">
                  <span className="label">Phone:</span>
                  <span>{user.phone}</span>
                </div>
                <div className="info-row">
                  <span className="label">Join Date:</span>
                  <span>{user.joinDate}</span>
                </div>
                <div className="info-row">
                  <span className="label">Last Active:</span>
                  <span>{user.lastActive}</span>
                </div>
              </div>
              <div className="card-footer">
                <div className="stat-item">
                  <span className="stat-number">{user.totalOrders}</span>
                  <span className="stat-label">Orders</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">{user.totalSpent}</span>
                  <span className="stat-label">Spent</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {filteredUsers.length === 0 && (
        <div className="no-results">
          <div className="no-results-icon">
            <FaExclamationTriangle />
          </div>
          <h3>No users found</h3>
          <p>Try adjusting your search or filter criteria</p>
        </div>
      )}
    </div>
  );
};

export default Users;