import { useState } from 'react';
import { 
  FaStickyNote, 
  FaCheckCircle, 
  FaSearch, 
  FaEdit, 
  FaTrash, 
  FaPlus,
  FaTable,
  FaTh,
  FaExclamationTriangle,
  FaTag,
  FaStar,
  FaLock,
  FaGlobe,
  FaUsers,
  FaArchive,
  FaFolder
} from 'react-icons/fa';
import "./notes.scss";

// Mock notes data
const mockNotes = [
  {
    id: 1,
    title: "React Hooks Best Practices",
    content: "useState: Always initialize with proper default values. useEffect: Include dependencies array to prevent infinite loops. useCallback: Use for functions passed as props to prevent unnecessary re-renders. useMemo: Use for expensive calculations that don't need to run on every render.",
    author: {
      name: "Aarav Sharma",
      email: "aarav@gmail.com",
      avatar: "https://images.pexels.com/photos/8405873/pexels-photo-8405873.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load"
    },
    category: "Development",
    status: "active",
    priority: "high",
    visibility: "private",
    tags: ["react", "hooks", "best-practices", "frontend"],
    createdAt: "2024-01-15",
    updatedAt: "2024-01-18",
    lastAccessed: "2024-01-20",
    isStarred: true,
    isArchived: false,
    folder: "Frontend Development"
  },
  {
    id: 2,
    title: "Database Optimization Techniques",
    content: "Indexing: Create indexes on frequently queried columns. Query optimization: Use EXPLAIN to analyze query performance. Connection pooling: Implement connection pooling to reduce overhead. Caching: Use Redis or Memcached for frequently accessed data.",
    author: {
      name: "Kiara Patel",
      email: "kiara@gmail.com",
      avatar: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1600"
    },
    category: "Database",
    status: "active",
    priority: "medium",
    visibility: "public",
    tags: ["database", "optimization", "performance", "sql"],
    createdAt: "2024-01-14",
    updatedAt: "2024-01-16",
    lastAccessed: "2024-01-19",
    isStarred: false,
    isArchived: false,
    folder: "Backend Development"
  },
  {
    id: 3,
    title: "Meeting Notes - Project Planning",
    content: "Discussed project timeline and deliverables. Key decisions: Use React for frontend, Node.js for backend. Timeline: 3 months for MVP. Team assignments: Frontend team handles UI/UX, Backend team handles API development. Next meeting: Friday 2 PM.",
    author: {
      name: "Zara Khan",
      email: "zara@gmail.com",
      avatar: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=1600"
    },
    category: "Meeting",
    status: "active",
    priority: "high",
    visibility: "members",
    tags: ["meeting", "planning", "project", "timeline"],
    createdAt: "2024-01-13",
    updatedAt: "2024-01-13",
    lastAccessed: "2024-01-17",
    isStarred: true,
    isArchived: false,
    folder: "Project Management"
  },
  {
    id: 4,
    title: "CSS Grid Layout Patterns",
    content: "Grid areas: Define named grid areas for better readability. Responsive grids: Use fr units and minmax() for flexible layouts. Grid gaps: Use gap property instead of margin for consistent spacing. Auto-fit vs auto-fill: Use auto-fit for responsive columns that collapse when empty.",
    author: {
      name: "Adeline Chen",
      email: "adeline@gmail.com",
      avatar: "https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=1600"
    },
    category: "Design",
    status: "active",
    priority: "medium",
    visibility: "public",
    tags: ["css", "grid", "layout", "responsive"],
    createdAt: "2024-01-12",
    updatedAt: "2024-01-15",
    lastAccessed: "2024-01-18",
    isStarred: false,
    isArchived: false,
    folder: "Frontend Development"
  },
  {
    id: 5,
    title: "API Security Checklist",
    content: "Authentication: Implement JWT tokens with proper expiration. Authorization: Use role-based access control (RBAC). Input validation: Validate all inputs on both client and server side. Rate limiting: Implement rate limiting to prevent abuse. HTTPS: Always use HTTPS in production. CORS: Configure CORS properly for cross-origin requests.",
    author: {
      name: "Aanya Singh",
      email: "aanya@gmail.com",
      avatar: "https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=1600"
    },
    category: "Security",
    status: "active",
    priority: "high",
    visibility: "private",
    tags: ["api", "security", "authentication", "authorization"],
    createdAt: "2024-01-11",
    updatedAt: "2024-01-17",
    lastAccessed: "2024-01-19",
    isStarred: true,
    isArchived: false,
    folder: "Security"
  },
  {
    id: 6,
    title: "Docker Container Best Practices",
    content: "Multi-stage builds: Use multi-stage builds to reduce image size. .dockerignore: Create .dockerignore file to exclude unnecessary files. Health checks: Implement health checks for containers. Resource limits: Set memory and CPU limits for containers. Base images: Use official base images when possible.",
    author: {
      name: "Vihaan Kumar",
      email: "vihaan@gmail.com",
      avatar: "https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=1600"
    },
    category: "DevOps",
    status: "active",
    priority: "medium",
    visibility: "public",
    tags: ["docker", "containers", "devops", "deployment"],
    createdAt: "2024-01-10",
    updatedAt: "2024-01-14",
    lastAccessed: "2024-01-16",
    isStarred: false,
    isArchived: false,
    folder: "DevOps"
  },
  {
    id: 7,
    title: "Team Standup Notes",
    content: "Yesterday: Completed user authentication module. Today: Working on dashboard UI components. Blockers: Waiting for API documentation from backend team. Questions: Need clarification on user role permissions. Action items: Update project timeline, schedule design review meeting.",
    author: {
      name: "Avani Reddy",
      email: "avani@gmail.com",
      avatar: "https://images.pexels.com/photos/874158/pexels-photo-874158.jpeg?auto=compress&cs=tinysrgb&w=1600"
    },
    category: "Meeting",
    status: "active",
    priority: "low",
    visibility: "members",
    tags: ["standup", "team", "progress", "blockers"],
    createdAt: "2024-01-09",
    updatedAt: "2024-01-09",
    lastAccessed: "2024-01-15",
    isStarred: false,
    isArchived: false,
    folder: "Team Management"
  },
  {
    id: 8,
    title: "TypeScript Advanced Types",
    content: "Utility types: Use Partial, Required, Pick, Omit for type transformations. Conditional types: Use conditional types for complex type logic. Template literal types: Use template literal types for string manipulation. Mapped types: Use mapped types to transform existing types. Generic constraints: Use extends keyword to constrain generic types.",
    author: {
      name: "Rohan Gupta",
      email: "rohan@gmail.com",
      avatar: "https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=1600"
    },
    category: "Development",
    status: "active",
    priority: "medium",
    visibility: "public",
    tags: ["typescript", "types", "advanced", "generics"],
    createdAt: "2024-01-08",
    updatedAt: "2024-01-12",
    lastAccessed: "2024-01-17",
    isStarred: false,
    isArchived: false,
    folder: "Frontend Development"
  },
  {
    id: 9,
    title: "Archived: Old Project Ideas",
    content: "This note contains old project ideas that are no longer relevant. Mobile app for task management. E-commerce platform with advanced filtering. Social media dashboard. These ideas were archived as they don't align with current business goals.",
    author: {
      name: "Aarav Sharma",
      email: "aarav@gmail.com",
      avatar: "https://images.pexels.com/photos/8405873/pexels-photo-8405873.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load"
    },
    category: "Ideas",
    status: "archived",
    priority: "low",
    visibility: "private",
    tags: ["ideas", "archived", "projects", "old"],
    createdAt: "2023-12-15",
    updatedAt: "2024-01-05",
    lastAccessed: "2024-01-05",
    isStarred: false,
    isArchived: true,
    folder: "Archived"
  },
  {
    id: 10,
    title: "Performance Monitoring Setup",
    content: "Application monitoring: Set up APM tools like New Relic or DataDog. Error tracking: Implement Sentry for error tracking and reporting. Logging: Use structured logging with Winston or Pino. Metrics: Set up Prometheus and Grafana for metrics visualization. Alerts: Configure alerts for critical metrics and errors.",
    author: {
      name: "Kiara Patel",
      email: "kiara@gmail.com",
      avatar: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1600"
    },
    category: "Monitoring",
    status: "active",
    priority: "high",
    visibility: "private",
    tags: ["monitoring", "performance", "logging", "alerts"],
    createdAt: "2024-01-07",
    updatedAt: "2024-01-16",
    lastAccessed: "2024-01-19",
    isStarred: true,
    isArchived: false,
    folder: "DevOps"
  }
];

const Notes = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [visibilityFilter, setVisibilityFilter] = useState('all');
  const [folderFilter] = useState('all');
  const [viewMode, setViewMode] = useState('table');

  // Filter notes based on search and filters
  const filteredNotes = mockNotes.filter(note => {
    const matchesSearch = note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         note.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         note.author.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         note.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesStatus = statusFilter === 'all' || note.status === statusFilter;
    const matchesCategory = categoryFilter === 'all' || note.category === categoryFilter;
    const matchesPriority = priorityFilter === 'all' || note.priority === priorityFilter;
    const matchesVisibility = visibilityFilter === 'all' || note.visibility === visibilityFilter;
    const matchesFolder = folderFilter === 'all' || note.folder === folderFilter;
    
    return matchesSearch && matchesStatus && matchesCategory && matchesPriority && matchesVisibility && matchesFolder;
  });

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return '#ef4444';
      case 'medium': return '#f59e0b';
      case 'low': return '#10b981';
      default: return '#6b7280';
    }
  };

  const getPriorityText = (priority: string) => {
    switch (priority) {
      case 'high': return 'High';
      case 'medium': return 'Medium';
      case 'low': return 'Low';
      default: return priority;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return '#10b981';
      case 'archived': return '#6b7280';
      case 'draft': return '#f59e0b';
      default: return '#6b7280';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active': return 'Active';
      case 'archived': return 'Archived';
      case 'draft': return 'Draft';
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

  const getTotalNotes = () => {
    return mockNotes.length;
  };

  const getActiveNotes = () => {
    return mockNotes.filter(note => note.status === 'active').length;
  };

  const getStarredNotes = () => {
    return mockNotes.filter(note => note.isStarred).length;
  };

  const getArchivedNotes = () => {
    return mockNotes.filter(note => note.isArchived).length;
  };

  return (
    <div className='notes'>
      <div className="notes-header">
        <div className="header-left">
          <h1>Notes Management</h1>
          <p>Organize and manage your notes and documentation</p>
        </div>
        <div className="header-right">
          <button className="add-note-btn">
            <FaPlus />
            Add Note
          </button>
        </div>
      </div>

      <div className="notes-stats">
        <div className="stat-card">
          <div className="stat-icon">
            <FaStickyNote />
          </div>
          <div className="stat-content">
            <h3>{getTotalNotes()}</h3>
            <p>Total Notes</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">
            <FaCheckCircle />
          </div>
          <div className="stat-content">
            <h3>{getActiveNotes()}</h3>
            <p>Active</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">
            <FaStar />
          </div>
          <div className="stat-content">
            <h3>{getStarredNotes()}</h3>
            <p>Starred</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">
            <FaArchive />
          </div>
          <div className="stat-content">
            <h3>{getArchivedNotes()}</h3>
            <p>Archived</p>
          </div>
        </div>
      </div>

      <div className="notes-controls">
        <div className="search-section">
          <div className="search-box">
            <FaSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search notes..."
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
            <option value="archived">Archived</option>
            <option value="draft">Draft</option>
          </select>
          
          <select 
            value={categoryFilter} 
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="filter-select"
          >
            <option value="all">All Categories</option>
            <option value="Development">Development</option>
            <option value="Database">Database</option>
            <option value="Meeting">Meeting</option>
            <option value="Design">Design</option>
            <option value="Security">Security</option>
            <option value="DevOps">DevOps</option>
            <option value="Ideas">Ideas</option>
            <option value="Monitoring">Monitoring</option>
          </select>

          <select 
            value={priorityFilter} 
            onChange={(e) => setPriorityFilter(e.target.value)}
            className="filter-select"
          >
            <option value="all">All Priority</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
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
{/* 
          <select 
            value={folderFilter} 
            onChange={(e) => setFolderFilter(e.target.value)}
            className="filter-select"
          >
            <option value="all">All Folders</option>
            <option value="Frontend Development">Frontend Development</option>
            <option value="Backend Development">Backend Development</option>
            <option value="Project Management">Project Management</option>
            <option value="Security">Security</option>
            <option value="DevOps">DevOps</option>
            <option value="Team Management">Team Management</option>
            <option value="Archived">Archived</option>
          </select> */}
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
        <div className="notes-table-container">
          <table className="notes-table">
            <thead>
              <tr>
                <th>Note</th>
                <th>Author</th>
                <th>Category</th>
                <th>Priority</th>
                <th>Status</th>
                <th>Visibility</th>
                {/* <th>Folder</th> */}
                <th>Updated</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredNotes.map(note => (
                <tr key={note.id}>
                  <td>
                    <div className="note-info">
                      <div className="note-header">
                        <span className="note-title">{note.title}</span>
                        {note.isStarred && <FaStar className="star-icon" />}
                      </div>
                      <span className="note-content">{note.content}</span>
                      <div className="note-tags">
                        {note.tags.slice(0, 3).map(tag => (
                          <span key={tag} className="tag">
                            <FaTag />
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="author-info">
                      <img src={note.author.avatar} alt={note.author.name} />
                      <div className="author-details">
                        <span className="author-name">{note.author.name}</span>
                        <span className="author-email">{note.author.email}</span>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className="category-badge">
                      {note.category}
                    </span>
                  </td>
                  <td>
                    <span 
                      className="priority-badge"
                      style={{ backgroundColor: getPriorityColor(note.priority) }}
                    >
                      {getPriorityText(note.priority)}
                    </span>
                  </td>
                  <td>
                    <span 
                      className="status-badge"
                      style={{ backgroundColor: getStatusColor(note.status) }}
                    >
                      {getStatusText(note.status)}
                    </span>
                  </td>
                  <td>
                    <span className="visibility-badge">
                      {getVisibilityIcon(note.visibility)}
                      {note.visibility}
                    </span>
                  </td>
                  {/* <td>
                    <span className="folder-badge">
                      <FaFolder />
                      {note.folder}
                    </span>
                  </td> */}
                  <td>
                    <span className="updated-date">{formatDate(note.updatedAt)}</span>
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
        <div className="notes-cards">
          {filteredNotes.map(note => (
            <div key={note.id} className="note-card">
              <div className="card-header">
                <div className="note-title-section">
                  <h3 className="note-title">{note.title}</h3>
                  {note.isStarred && <FaStar className="star-icon" />}
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
                <p className="note-content">{note.content}</p>
                
                <div className="note-meta">
                  <div className="author-info">
                    <img src={note.author.avatar} alt={note.author.name} />
                    <div className="author-details">
                      <span className="author-name">{note.author.name}</span>
                      <span className="note-date">{formatDate(note.updatedAt)}</span>
                    </div>
                  </div>
                </div>

                <div className="note-tags">
                  {note.tags.map(tag => (
                    <span key={tag} className="tag">
                      <FaTag />
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="card-footer">
                <div className="note-status">
                  <span 
                    className="priority-badge"
                    style={{ backgroundColor: getPriorityColor(note.priority) }}
                  >
                    {getPriorityText(note.priority)}
                  </span>
                  <span 
                    className="status-badge"
                    style={{ backgroundColor: getStatusColor(note.status) }}
                  >
                    {getStatusText(note.status)}
                  </span>
                  <span className="category-badge">
                    {note.category}
                  </span>
                  <span className="visibility-badge">
                    {getVisibilityIcon(note.visibility)}
                    {note.visibility}
                  </span>
                </div>
                <div className="folder-info">
                  <FaFolder />
                  <span>{note.folder}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {filteredNotes.length === 0 && (
        <div className="no-results">
          <div className="no-results-icon">
            <FaExclamationTriangle />
          </div>
          <h3>No notes found</h3>
          <p>Try adjusting your search or filter criteria</p>
        </div>
      )}
    </div>
  );
};

export default Notes;
