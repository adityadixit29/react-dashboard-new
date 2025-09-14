import { useState } from 'react';
import { 
  FaFileAlt, 
  FaCheckCircle, 
  FaClock, 
  FaEye, 
  FaSearch, 
  FaEdit, 
  FaTrash, 
  FaPlus,
  FaTable,
  FaTh,
  FaExclamationTriangle,
  FaHeart,
  FaComment,
  FaShare,
  FaTag,
  FaGlobe,
  FaLock,
  FaUsers
} from 'react-icons/fa';
import "./posts.scss";

// Mock post data
const mockPosts = [
  {
    id: 1,
    title: "The Future of Web Development: Trends to Watch in 2024",
    content: "Web development is evolving rapidly with new frameworks, tools, and methodologies emerging every year. In 2024, we're seeing significant shifts towards...",
    author: {
      name: "Aarav Sharma",
      email: "aarav@gmail.com",
      avatar: "https://images.pexels.com/photos/8405873/pexels-photo-8405873.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load"
    },
    category: "Technology",
    status: "published",
    visibility: "public",
    tags: ["web-development", "trends", "2024", "frontend"],
    createdAt: "2024-01-15",
    updatedAt: "2024-01-15",
    publishedAt: "2024-01-15",
    views: 1247,
    likes: 89,
    comments: 23,
    shares: 12,
    featuredImage: "https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=400"
  },
  {
    id: 2,
    title: "Building Scalable React Applications: Best Practices",
    content: "Creating scalable React applications requires careful planning and adherence to best practices. From component architecture to state management...",
    author: {
      name: "Kiara Patel",
      email: "kiara@gmail.com",
      avatar: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1600"
    },
    category: "Programming",
    status: "published",
    visibility: "public",
    tags: ["react", "scalability", "best-practices", "frontend"],
    createdAt: "2024-01-14",
    updatedAt: "2024-01-14",
    publishedAt: "2024-01-14",
    views: 892,
    likes: 67,
    comments: 18,
    shares: 8,
    featuredImage: "https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=400"
  },
  {
    id: 3,
    title: "Understanding TypeScript: Advanced Types and Patterns",
    content: "TypeScript offers powerful type system features that can significantly improve code quality and developer experience. Let's explore advanced types...",
    author: {
      name: "Zara Khan",
      email: "zara@gmail.com",
      avatar: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=1600"
    },
    category: "Programming",
    status: "draft",
    visibility: "private",
    tags: ["typescript", "types", "advanced", "javascript"],
    createdAt: "2024-01-13",
    updatedAt: "2024-01-16",
    publishedAt: null,
    views: 0,
    likes: 0,
    comments: 0,
    shares: 0,
    featuredImage: "https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=400"
  },
  {
    id: 4,
    title: "CSS Grid vs Flexbox: When to Use Which",
    content: "Both CSS Grid and Flexbox are powerful layout tools, but they serve different purposes. Understanding when to use each can make your layouts more efficient...",
    author: {
      name: "Adeline Chen",
      email: "adeline@gmail.com",
      avatar: "https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=1600"
    },
    category: "Design",
    status: "published",
    visibility: "public",
    tags: ["css", "grid", "flexbox", "layout", "frontend"],
    createdAt: "2024-01-12",
    updatedAt: "2024-01-12",
    publishedAt: "2024-01-12",
    views: 1563,
    likes: 124,
    comments: 31,
    shares: 19,
    featuredImage: "https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=400"
  },
  {
    id: 5,
    title: "Node.js Performance Optimization Techniques",
    content: "Node.js applications can benefit from various optimization techniques to improve performance and scalability. Here are some proven strategies...",
    author: {
      name: "Aanya Singh",
      email: "aanya@gmail.com",
      avatar: "https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=1600"
    },
    category: "Backend",
    status: "published",
    visibility: "public",
    tags: ["nodejs", "performance", "optimization", "backend"],
    createdAt: "2024-01-11",
    updatedAt: "2024-01-11",
    publishedAt: "2024-01-11",
    views: 743,
    likes: 56,
    comments: 14,
    shares: 7,
    featuredImage: "https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=400"
  },
  {
    id: 6,
    title: "Database Design Patterns for Modern Applications",
    content: "Modern applications require thoughtful database design to ensure scalability and maintainability. Let's explore some essential patterns...",
    author: {
      name: "Vihaan Kumar",
      email: "vihaan@gmail.com",
      avatar: "https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=1600"
    },
    category: "Database",
    status: "scheduled",
    visibility: "public",
    tags: ["database", "design-patterns", "scalability", "architecture"],
    createdAt: "2024-01-10",
    updatedAt: "2024-01-17",
    publishedAt: "2024-01-25",
    views: 0,
    likes: 0,
    comments: 0,
    shares: 0,
    featuredImage: "https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=400"
  },
  {
    id: 7,
    title: "Microservices Architecture: Benefits and Challenges",
    content: "Microservices architecture has become increasingly popular for building large-scale applications. However, it comes with its own set of challenges...",
    author: {
      name: "Avani Reddy",
      email: "avani@gmail.com",
      avatar: "https://images.pexels.com/photos/874158/pexels-photo-874158.jpeg?auto=compress&cs=tinysrgb&w=1600"
    },
    category: "Architecture",
    status: "published",
    visibility: "public",
    tags: ["microservices", "architecture", "scalability", "backend"],
    createdAt: "2024-01-09",
    updatedAt: "2024-01-09",
    publishedAt: "2024-01-09",
    views: 2103,
    likes: 178,
    comments: 42,
    shares: 25,
    featuredImage: "https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=400"
  },
  {
    id: 8,
    title: "Getting Started with Docker: Containerization Made Easy",
    content: "Docker has revolutionized how we deploy and manage applications. This guide will help you get started with containerization...",
    author: {
      name: "Rohan Gupta",
      email: "rohan@gmail.com",
      avatar: "https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=1600"
    },
    category: "DevOps",
    status: "published",
    visibility: "public",
    tags: ["docker", "containers", "devops", "deployment"],
    createdAt: "2024-01-08",
    updatedAt: "2024-01-08",
    publishedAt: "2024-01-08",
    views: 1456,
    likes: 98,
    comments: 27,
    shares: 15,
    featuredImage: "https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=400"
  },
  {
    id: 9,
    title: "API Security Best Practices: Protecting Your Endpoints",
    content: "API security is crucial for protecting your application and user data. Here are essential best practices every developer should follow...",
    author: {
      name: "Aarav Sharma",
      email: "aarav@gmail.com",
      avatar: "https://images.pexels.com/photos/8405873/pexels-photo-8405873.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load"
    },
    category: "Security",
    status: "draft",
    visibility: "private",
    tags: ["api", "security", "best-practices", "backend"],
    createdAt: "2024-01-07",
    updatedAt: "2024-01-18",
    publishedAt: null,
    views: 0,
    likes: 0,
    comments: 0,
    shares: 0,
    featuredImage: "https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=400"
  },
  {
    id: 10,
    title: "Modern JavaScript: ES2024 Features and Updates",
    content: "JavaScript continues to evolve with new features and improvements. Let's explore the latest additions in ES2024 and how they can benefit your code...",
    author: {
      name: "Kiara Patel",
      email: "kiara@gmail.com",
      avatar: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1600"
    },
    category: "Programming",
    status: "published",
    visibility: "public",
    tags: ["javascript", "es2024", "modern-js", "frontend"],
    createdAt: "2024-01-06",
    updatedAt: "2024-01-06",
    publishedAt: "2024-01-06",
    views: 1876,
    likes: 145,
    comments: 38,
    shares: 22,
    featuredImage: "https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=400"
  }
];

const Posts = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [visibilityFilter, setVisibilityFilter] = useState('all');
  const [viewMode, setViewMode] = useState('table');

  // Filter posts based on search and filters
  const filteredPosts = mockPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.author.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesStatus = statusFilter === 'all' || post.status === statusFilter;
    const matchesCategory = categoryFilter === 'all' || post.category === categoryFilter;
    const matchesVisibility = visibilityFilter === 'all' || post.visibility === visibilityFilter;
    
    return matchesSearch && matchesStatus && matchesCategory && matchesVisibility;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published': return '#10b981';
      case 'draft': return '#f59e0b';
      case 'scheduled': return '#3b82f6';
      case 'archived': return '#6b7280';
      default: return '#6b7280';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'published': return 'Published';
      case 'draft': return 'Draft';
      case 'scheduled': return 'Scheduled';
      case 'archived': return 'Archived';
      default: return status;
    }
  };

  const getVisibilityIcon = (visibility: string) => {
    switch (visibility) {
      case 'public': return <FaGlobe />;
      case 'private': return <FaLock />;
      case 'members': return <FaUsers />;
      default: return <FaGlobe />;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-US').format(num);
  };

  const getTotalViews = () => {
    return mockPosts.reduce((sum, post) => sum + post.views, 0);
  };

  const getPublishedPosts = () => {
    return mockPosts.filter(post => post.status === 'published').length;
  };

  const getDraftPosts = () => {
    return mockPosts.filter(post => post.status === 'draft').length;
  };

  return (
    <div className='posts'>
      <div className="posts-header">
        <div className="header-left">
          <h1>Posts Management</h1>
          <p>Create and manage blog posts and content</p>
        </div>
        <div className="header-right">
          <button className="add-post-btn">
            <FaPlus />
            Add Post
          </button>
        </div>
      </div>

      <div className="posts-stats">
        <div className="stat-card">
          <div className="stat-icon">
            <FaFileAlt />
          </div>
          <div className="stat-content">
            <h3>{mockPosts.length}</h3>
            <p>Total Posts</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">
            <FaCheckCircle />
          </div>
          <div className="stat-content">
            <h3>{getPublishedPosts()}</h3>
            <p>Published</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">
            <FaClock />
          </div>
          <div className="stat-content">
            <h3>{getDraftPosts()}</h3>
            <p>Drafts</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">
            <FaEye />
          </div>
          <div className="stat-content">
            <h3>{formatNumber(getTotalViews())}</h3>
            <p>Total Views</p>
          </div>
        </div>
      </div>

      <div className="posts-controls">
        <div className="search-section">
          <div className="search-box">
            <FaSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search posts..."
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
            <option value="published">Published</option>
            <option value="draft">Draft</option>
            <option value="scheduled">Scheduled</option>
            <option value="archived">Archived</option>
          </select>
          
          <select 
            value={categoryFilter} 
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="filter-select"
          >
            <option value="all">All Categories</option>
            <option value="Technology">Technology</option>
            <option value="Programming">Programming</option>
            <option value="Design">Design</option>
            <option value="Backend">Backend</option>
            <option value="Database">Database</option>
            <option value="Architecture">Architecture</option>
            <option value="DevOps">DevOps</option>
            <option value="Security">Security</option>
          </select>

          <select 
            value={visibilityFilter} 
            onChange={(e) => setVisibilityFilter(e.target.value)}
            className="filter-select"
          >
            <option value="all">All Visibility</option>
            <option value="public">Public</option>
            <option value="private">Private</option>
            <option value="members">Members Only</option>
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
        <div className="posts-table-container">
          <table className="posts-table">
            <thead>
              <tr>
                <th>Post</th>
                <th>Author</th>
                <th>Category</th>
                <th>Status</th>
                <th>Visibility</th>
                <th>Views</th>
                <th>Engagement</th>
                {/* <th>Published</th> */}
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredPosts.map(post => (
                <tr key={post.id}>
                  <td>
                    <div className="post-info">
                      <img src={post.featuredImage} alt={post.title} />
                      <div className="post-details">
                        <span className="post-title">{post.title}</span>
                        <span className="post-content">{post.content}</span>
                        <div className="post-tags">
                          {post.tags.slice(0, 3).map(tag => (
                            <span key={tag} className="tag">
                              <FaTag />
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="author-info">
                      <img src={post.author.avatar} alt={post.author.name} />
                      <div className="author-details">
                        <span className="author-name">{post.author.name}</span>
                        <span className="author-email">{post.author.email}</span>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className="category-badge">
                      {post.category}
                    </span>
                  </td>
                  <td>
                    <span 
                      className="status-badge"
                      style={{ backgroundColor: getStatusColor(post.status) }}
                    >
                      {getStatusText(post.status)}
                    </span>
                  </td>
                  <td>
                    <span className="visibility-badge">
                      {getVisibilityIcon(post.visibility)}
                      {post.visibility}
                    </span>
                  </td>
                  <td>
                    <span className="views">{formatNumber(post.views)}</span>
                  </td>
                  <td>
                    <div className="engagement-stats">
                      <span className="likes">
                        <FaHeart />
                        {formatNumber(post.likes)}
                      </span>
                      <span className="comments">
                        <FaComment />
                        {formatNumber(post.comments)}
                      </span>
                    </div>
                  </td>
                  {/* <td>
                    <span className="published-date">
                      {post.publishedAt ? formatDate(post.publishedAt) : 'Not published'}
                    </span>
                  </td> */}
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
        <div className="posts-cards">
          {filteredPosts.map(post => (
            <div key={post.id} className="post-card">
              <div className="card-header">
                <img src={post.featuredImage} alt={post.title} />
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
                <h3 className="post-title">{post.title}</h3>
                <p className="post-content">{post.content}</p>
                
                <div className="post-meta">
                  <div className="author-info">
                    <img src={post.author.avatar} alt={post.author.name} />
                    <div className="author-details">
                      <span className="author-name">{post.author.name}</span>
                      <span className="post-date">{formatDate(post.createdAt)}</span>
                    </div>
                  </div>
                </div>

                <div className="post-tags">
                  {post.tags.map(tag => (
                    <span key={tag} className="tag">
                      <FaTag />
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="post-stats">
                  <div className="stat-item">
                    <span className="stat-icon">
                      <FaEye />
                    </span>
                    <span className="stat-number">{formatNumber(post.views)}</span>
                    <span className="stat-label">Views</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-icon">
                      <FaHeart />
                    </span>
                    <span className="stat-number">{formatNumber(post.likes)}</span>
                    <span className="stat-label">Likes</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-icon">
                      <FaComment />
                    </span>
                    <span className="stat-number">{formatNumber(post.comments)}</span>
                    <span className="stat-label">Comments</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-icon">
                      <FaShare />
                    </span>
                    <span className="stat-number">{formatNumber(post.shares)}</span>
                    <span className="stat-label">Shares</span>
                  </div>
                </div>
              </div>

              <div className="card-footer">
                <div className="post-status">
                  <span 
                    className="status-badge"
                    style={{ backgroundColor: getStatusColor(post.status) }}
                  >
                    {getStatusText(post.status)}
                  </span>
                  <span className="category-badge">
                    {post.category}
                  </span>
                  <span className="visibility-badge">
                    {getVisibilityIcon(post.visibility)}
                    {post.visibility}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {filteredPosts.length === 0 && (
        <div className="no-results">
          <div className="no-results-icon">
            <FaExclamationTriangle />
          </div>
          <h3>No posts found</h3>
          <p>Try adjusting your search or filter criteria</p>
        </div>
      )}
    </div>
  );
};

export default Posts;
