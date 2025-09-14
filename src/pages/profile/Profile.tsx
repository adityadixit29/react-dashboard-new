import { useState } from 'react';
import {
  FaUser,
  FaEdit,
  FaSave,
  FaTimes,
  FaCamera,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaGlobe,
  FaLinkedin,
  FaTwitter,
  FaGithub,
  FaKey,
  FaShieldAlt,
  FaCog,
  FaComment,
  FaShare,
  FaChartLine,
  FaTrophy,
  FaAward,
  FaUsers,
  FaProjectDiagram
} from 'react-icons/fa';
import "./profile.scss";

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [showChangePassword, setShowChangePassword] = useState(false);

  const userData = {
    id: '12345',
    name: 'Aditya Dixit',
    email: 'dixitaditya2001@gmail.com',
    phone: '+91 7440900511',
    avatar: 'https://images.pexels.com/photos/8405873/pexels-photo-8405873.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load',
    title: 'Senior Full Stack Developer',
    company: 'Educase India',
    location: 'Hyderabad, Telangana, India',
    bio: 'Experienced full-stack developer with expertise in React, Node.js, and modern web technologies. Passionate about creating scalable and user-friendly applications.',
    joinDate: '2022-03-15',
    lastActive: '2024-01-15 14:30:25',
    status: 'online',
    skills: ['React', 'Node.js', 'TypeScript', 'Python', 'AWS', 'Docker', 'MongoDB', 'PostgreSQL'],
    socialLinks: {
      linkedin: 'https://www.linkedin.com/in/aditya-dixit-499798225',
      twitter: 'https://x.com/AdityaDixit2911',
      github: 'https://github.com/adityadixit29',
      website: 'https://adityadixit.dev'
    },
    stats: {
      projects: 24,
      followers: 1250,
      following: 340,
      posts: 89,
      likes: 2340,
      comments: 567
    },
    recentActivity: [
      {
        id: '1',
        type: 'project',
        title: 'E-commerce Dashboard',
        description: 'Created a new project',
        timestamp: '2 hours ago',
        icon: FaProjectDiagram
      },
      {
        id: '2',
        type: 'post',
        title: 'React Best Practices',
        description: 'Shared a new post',
        timestamp: '1 day ago',
        icon: FaComment
      },
      {
        id: '3',
        type: 'achievement',
        title: 'Code Master Badge',
        description: 'Earned a new badge',
        timestamp: '3 days ago',
        icon: FaTrophy
      }
    ],
    achievements: [
      {
        id: '1',
        title: 'Code Master',
        description: 'Completed 100+ coding challenges',
        icon: FaTrophy,
        color: '#f59e0b',
        earnedDate: '2024-01-10'
      },
      {
        id: '2',
        title: 'Team Player',
        description: 'Collaborated on 50+ projects',
        icon: FaUsers,
        color: '#3b82f6',
        earnedDate: '2024-01-05'
      },
      {
        id: '3',
        title: 'Innovator',
        description: 'Created 10+ innovative solutions',
        icon: FaAward,
        color: '#10b981',
        earnedDate: '2023-12-20'
      }
    ]
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: FaUser },
    { id: 'activity', label: 'Activity', icon: FaChartLine },
    { id: 'achievements', label: 'Achievements', icon: FaTrophy },
    { id: 'settings', label: 'Settings', icon: FaCog }
  ];

  const handleSave = () => {
    setIsEditing(false);
    console.log('Profile saved');
  };

  const handleCancel = () => {
    setIsEditing(false);
    console.log('Changes cancelled');
  };

  const renderOverview = () => (
    <div className="profile-overview">
      <div className="profile-header">
        <div className="avatar-section">
          <div className="avatar-container">
            <img src={userData.avatar} alt="Profile" className="profile-avatar" />
            <button className="change-avatar-btn">
              <FaCamera />
            </button>
          </div>
          <div className="profile-info">
            <h1>{userData.name}</h1>
            <p className="title">{userData.title}</p>
            <p className="company">{userData.company}</p>
            <div className="status">
              <span className={`status-indicator ${userData.status}`}></span>
              <span className="status-text">Online</span>
            </div>
          </div>
        </div>
        <div className="profile-actions">
          <button 
            className="edit-btn"
            onClick={() => setIsEditing(!isEditing)}
          >
            <FaEdit />
            {isEditing ? 'Cancel' : 'Edit Profile'}
          </button>
          <button className="share-btn">
            <FaShare />
            Share Profile
          </button>
        </div>
      </div>

      <div className="profile-stats">
        <div className="stat-card">
          <div className="stat-icon">
            <FaProjectDiagram />
          </div>
          <div className="stat-content">
            <h3>{userData.stats.projects}</h3>
            <p>Projects</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">
            <FaUsers />
          </div>
          <div className="stat-content">
            <h3>{userData.stats.followers}</h3>
            <p>Followers</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">
            <FaUsers />
          </div>
          <div className="stat-content">
            <h3>{userData.stats.following}</h3>
            <p>Following</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">
            <FaComment />
          </div>
          <div className="stat-content">
            <h3>{userData.stats.posts}</h3>
            <p>Posts</p>
          </div>
        </div>
      </div>

      <div className="profile-details">
        <div className="details-section">
          <h3>About</h3>
          <p className="bio">{userData.bio}</p>
        </div>

        <div className="details-section">
          <h3>Contact Information</h3>
          <div className="contact-info">
            <div className="contact-item">
              <FaEnvelope />
              <span>{userData.email}</span>
            </div>
            <div className="contact-item">
              <FaPhone />
              <span>{userData.phone}</span>
            </div>
            <div className="contact-item">
              <FaMapMarkerAlt />
              <span>{userData.location}</span>
            </div>
            <div className="contact-item">
              <FaCalendarAlt />
              <span>Joined {new Date(userData.joinDate).toLocaleDateString()}</span>
            </div>
          </div>
        </div>

        <div className="details-section">
          <h3>Skills</h3>
          <div className="skills-container">
            {userData.skills.map((skill, index) => (
              <span key={index} className="skill-tag">{skill}</span>
            ))}
          </div>
        </div>

        <div className="details-section">
          <h3>Social Links</h3>
          <div className="social-links">
            <a href={userData.socialLinks.linkedin} target="_blank" rel="noopener noreferrer">
              <FaLinkedin />
              LinkedIn
            </a>
            <a href={userData.socialLinks.twitter} target="_blank" rel="noopener noreferrer">
              <FaTwitter />
              Twitter
            </a>
            <a href={userData.socialLinks.github} target="_blank" rel="noopener noreferrer">
              <FaGithub />
              GitHub
            </a>
            <a href={userData.socialLinks.website} target="_blank" rel="noopener noreferrer">
              <FaGlobe />
              Website
            </a>
          </div>
        </div>
      </div>
    </div>
  );

  const renderActivity = () => (
    <div className="profile-activity">
      <div className="activity-header">
        <h3>Recent Activity</h3>
        <div className="activity-filters">
          <select className="filter-select">
            <option value="all">All Activity</option>
            <option value="projects">Projects</option>
            <option value="posts">Posts</option>
            <option value="achievements">Achievements</option>
          </select>
        </div>
      </div>
      
      <div className="activity-list">
        {userData.recentActivity.map(activity => {
          const IconComponent = activity.icon;
          return (
            <div key={activity.id} className="activity-item">
              <div className="activity-icon">
                <IconComponent />
              </div>
              <div className="activity-content">
                <h4>{activity.title}</h4>
                <p>{activity.description}</p>
                <span className="activity-time">{activity.timestamp}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  const renderAchievements = () => (
    <div className="profile-achievements">
      <div className="achievements-header">
        <h3>Achievements & Badges</h3>
        <p>Your accomplishments and milestones</p>
      </div>
      
      <div className="achievements-grid">
        {userData.achievements.map(achievement => (
          <div key={achievement.id} className="achievement-card">
            <div className="achievement-icon" style={{ color: achievement.color }}>
              <achievement.icon />
            </div>
            <div className="achievement-content">
              <h4>{achievement.title}</h4>
              <p>{achievement.description}</p>
              <span className="achievement-date">
                Earned on {new Date(achievement.earnedDate).toLocaleDateString()}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderSettings = () => (
    <div className="profile-settings">
      <div className="settings-section">
        <h3>Account Settings</h3>
        <div className="settings-form">
          <div className="form-group">
            <label>Display Name</label>
            <input type="text" defaultValue={userData.name} disabled={!isEditing} />
          </div>
          <div className="form-group">
            <label>Email Address</label>
            <input type="email" defaultValue={userData.email} disabled={!isEditing} />
          </div>
          <div className="form-group">
            <label>Phone Number</label>
            <input type="tel" defaultValue={userData.phone} disabled={!isEditing} />
          </div>
          <div className="form-group">
            <label>Location</label>
            <input type="text" defaultValue={userData.location} disabled={!isEditing} />
          </div>
        </div>
      </div>

      <div className="settings-section">
        <h3>Security</h3>
        <div className="security-options">
          <button 
            className="security-btn"
            onClick={() => setShowChangePassword(!showChangePassword)}
          >
            <FaKey />
            Change Password
          </button>
          <button className="security-btn">
            <FaShieldAlt />
            Two-Factor Authentication
          </button>
        </div>
      </div>

      <div className="settings-section">
        <h3>Privacy</h3>
        <div className="privacy-options">
          <div className="privacy-item">
            <span>Profile Visibility</span>
            <select className="privacy-select">
              <option value="public">Public</option>
              <option value="friends">Friends Only</option>
              <option value="private">Private</option>
            </select>
          </div>
          <div className="privacy-item">
            <span>Activity Status</span>
            <select className="privacy-select">
              <option value="show">Show Online Status</option>
              <option value="hide">Hide Online Status</option>
            </select>
          </div>
        </div>
      </div>

      {isEditing && (
        <div className="settings-actions">
          <button className="save-btn" onClick={handleSave}>
            <FaSave />
            Save Changes
          </button>
          <button className="cancel-btn" onClick={handleCancel}>
            <FaTimes />
            Cancel
          </button>
        </div>
      )}
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return renderOverview();
      case 'activity':
        return renderActivity();
      case 'achievements':
        return renderAchievements();
      case 'settings':
        return renderSettings();
      default:
        return renderOverview();
    }
  };

  return (
    <div className='profile-page'>
      <div className="profile-container">
        <div className="profile-sidebar">
          <div className="profile-tabs">
            {tabs.map(tab => {
              const IconComponent = tab.icon;
              return (
                <button
                  key={tab.id}
                  className={`profile-tab ${activeTab === tab.id ? 'active' : ''}`}
                  onClick={() => setActiveTab(tab.id)}
                >
                  <IconComponent />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="profile-content">
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
};

export default Profile;
