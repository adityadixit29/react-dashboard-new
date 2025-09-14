import { useState, useMemo } from 'react';
import Calendar from 'react-calendar';
import { format, isSameDay } from 'date-fns';
import { 
  FaCalendarAlt, 
  FaPlus, 
  FaSearch, 
  FaEdit, 
  FaTrash, 
  FaClock,
  FaMapMarkerAlt,
  FaUser,
  FaUsers,
  FaVideo,
  FaExclamationTriangle,
  FaCheckCircle,
  FaTimes,
  FaList
} from 'react-icons/fa';
import 'react-calendar/dist/Calendar.css';
import "./calendar.scss";

// Mock calendar events data
const mockEvents = [
  {
    id: 1,
    title: "Team Standup Meeting",
    start: new Date(2024, 0, 15, 9, 0),
    end: new Date(2024, 0, 15, 9, 30),
    description: "Daily team standup to discuss progress and blockers",
    location: "Conference Room A",
    attendees: ["Aarav Sharma", "Kiara Patel", "Zara Khan"],
    type: "meeting",
    priority: "high",
    status: "confirmed",
    organizer: "Aarav Sharma",
    color: "#3b82f6"
  },
  {
    id: 2,
    title: "Project Planning Session",
    start: new Date(2024, 0, 16, 14, 0),
    end: new Date(2024, 0, 16, 16, 0),
    description: "Planning session for Q1 project deliverables and timeline",
    location: "Main Conference Room",
    attendees: ["Aarav Sharma", "Kiara Patel", "Adeline Chen", "Aanya Singh"],
    type: "meeting",
    priority: "high",
    status: "confirmed",
    organizer: "Kiara Patel",
    color: "#10b981"
  },
  {
    id: 3,
    title: "Code Review Session",
    start: new Date(2024, 0, 17, 10, 0),
    end: new Date(2024, 0, 17, 11, 0),
    description: "Review of React components and TypeScript implementation",
    location: "Development Room",
    attendees: ["Zara Khan", "Rohan Gupta"],
    type: "review",
    priority: "medium",
    status: "confirmed",
    organizer: "Zara Khan",
    color: "#f59e0b"
  },
  {
    id: 4,
    title: "Client Presentation",
    start: new Date(2024, 0, 18, 15, 0),
    end: new Date(2024, 0, 18, 16, 30),
    description: "Present project progress and demo to client stakeholders",
    location: "Client Office",
    attendees: ["Aarav Sharma", "Kiara Patel"],
    type: "presentation",
    priority: "high",
    status: "confirmed",
    organizer: "Aarav Sharma",
    color: "#8b5cf6"
  },
  {
    id: 5,
    title: "Sprint Retrospective",
    start: new Date(2024, 0, 19, 11, 0),
    end: new Date(2024, 0, 19, 12, 0),
    description: "Review sprint outcomes and plan improvements",
    location: "Team Room",
    attendees: ["Aarav Sharma", "Kiara Patel", "Zara Khan", "Adeline Chen", "Aanya Singh", "Vihaan Kumar"],
    type: "meeting",
    priority: "medium",
    status: "confirmed",
    organizer: "Kiara Patel",
    color: "#06b6d4"
  },
  {
    id: 6,
    title: "Technical Training - Docker",
    start: new Date(2024, 0, 22, 13, 0),
    end: new Date(2024, 0, 22, 15, 0),
    description: "Training session on Docker containerization best practices",
    location: "Training Room",
    attendees: ["Vihaan Kumar", "Avani Reddy", "Rohan Gupta"],
    type: "training",
    priority: "medium",
    status: "confirmed",
    organizer: "Vihaan Kumar",
    color: "#84cc16"
  },
  {
    id: 7,
    title: "One-on-One Meeting",
    start: new Date(2024, 0, 23, 10, 0),
    end: new Date(2024, 0, 23, 10, 30),
    description: "Weekly one-on-one with team member",
    location: "Private Office",
    attendees: ["Aarav Sharma", "Adeline Chen"],
    type: "meeting",
    priority: "low",
    status: "confirmed",
    organizer: "Aarav Sharma",
    color: "#6366f1"
  },
  {
    id: 8,
    title: "Product Demo",
    start: new Date(2024, 0, 24, 14, 0),
    end: new Date(2024, 0, 24, 15, 0),
    description: "Demo new features to product team",
    location: "Demo Room",
    attendees: ["Kiara Patel", "Aanya Singh", "Avani Reddy"],
    type: "demo",
    priority: "high",
    status: "confirmed",
    organizer: "Kiara Patel",
    color: "#ec4899"
  },
  {
    id: 9,
    title: "Architecture Review",
    start: new Date(2024, 0, 25, 9, 0),
    end: new Date(2024, 0, 25, 10, 30),
    description: "Review system architecture and scalability plans",
    location: "Architecture Room",
    attendees: ["Aarav Sharma", "Vihaan Kumar", "Rohan Gupta"],
    type: "review",
    priority: "high",
    status: "confirmed",
    organizer: "Vihaan Kumar",
    color: "#f97316"
  },
  {
    id: 10,
    title: "Team Building Event",
    start: new Date(2024, 0, 26, 16, 0),
    end: new Date(2024, 0, 26, 18, 0),
    description: "Monthly team building activity",
    location: "Recreation Center",
    attendees: ["Aarav Sharma", "Kiara Patel", "Zara Khan", "Adeline Chen", "Aanya Singh", "Vihaan Kumar", "Avani Reddy", "Rohan Gupta"],
    type: "event",
    priority: "low",
    status: "confirmed",
    organizer: "Kiara Patel",
    color: "#22c55e"
  },
  {
    id: 11,
    title: "Deadline - Project Milestone",
    start: new Date(2024, 0, 29, 17, 0),
    end: new Date(2024, 0, 29, 17, 0),
    description: "Deadline for completing Phase 1 of the project",
    location: "N/A",
    attendees: ["All Team Members"],
    type: "deadline",
    priority: "high",
    status: "confirmed",
    organizer: "Project Manager",
    color: "#ef4444"
  },
  {
    id: 12,
    title: "Holiday - Republic Day",
    start: new Date(2024, 0, 26, 0, 0),
    end: new Date(2024, 0, 26, 23, 59),
    description: "National holiday - Republic Day",
    location: "N/A",
    attendees: ["All Team Members"],
    type: "holiday",
    priority: "low",
    status: "confirmed",
    organizer: "HR",
    color: "#6b7280"
  }
];

const CalendarPage = () => {
  const [events] = useState(mockEvents);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showEventModal, setShowEventModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [viewMode, setViewMode] = useState('calendar');

  // Filter events based on search and filters
  const filteredEvents = useMemo(() => {
    return events.filter(event => {
      const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           event.organizer.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType = typeFilter === 'all' || event.type === typeFilter;
      const matchesPriority = priorityFilter === 'all' || event.priority === priorityFilter;
      
      return matchesSearch && matchesType && matchesPriority;
    });
  }, [events, searchTerm, typeFilter, priorityFilter]);

  const getEventsForDate = (date: Date) => {
    return filteredEvents.filter(event => 
      isSameDay(new Date(event.start), date)
    );
  };

  const handleDateChange = (value: any) => {
    setSelectedDate(value);
  };

  const handleEventClick = (event: any) => {
    setSelectedEvent(event);
    setShowEventModal(true);
  };

  const handleAddEvent = () => {
    const newEvent = {
      id: Date.now(),
      title: 'New Event',
      start: selectedDate,
      end: new Date(selectedDate.getTime() + 60 * 60 * 1000), // 1 hour later
      description: '',
      location: '',
      attendees: [],
      type: 'meeting',
      priority: 'medium',
      status: 'confirmed',
      organizer: 'Current User',
      color: '#3b82f6'
    };
    setSelectedEvent(newEvent as any);
    setShowEventModal(true);
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'meeting': return <FaUsers />;
      case 'presentation': return <FaVideo />;
      case 'review': return <FaCheckCircle />;
      case 'training': return <FaUser />;
      case 'demo': return <FaVideo />;
      case 'event': return <FaCalendarAlt />;
      case 'deadline': return <FaExclamationTriangle />;
      case 'holiday': return <FaCalendarAlt />;
      default: return <FaCalendarAlt />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return '#ef4444';
      case 'medium': return '#f59e0b';
      case 'low': return '#10b981';
      default: return '#6b7280';
    }
  };

  const formatDate = (date: Date) => {
    return format(new Date(date), 'MMM dd, yyyy');
  };

  const formatTime = (date: Date) => {
    return format(new Date(date), 'h:mm a');
  };

  const getTotalEvents = () => {
    return events.length;
  };

  const getUpcomingEvents = () => {
    const today = new Date();
    return events.filter(event => new Date(event.start) >= today).length;
  };

  const getTodayEvents = () => {
    const today = new Date();
    return events.filter(event => {
      const eventDate = new Date(event.start);
      return eventDate.toDateString() === today.toDateString();
    }).length;
  };

  const getHighPriorityEvents = () => {
    return events.filter(event => event.priority === 'high').length;
  };

  return (
    <div className='calendar-page'>
      <div className="calendar-header">
        <div className="header-left">
          <h1>Calendar Management</h1>
          <p>Schedule and manage your events and meetings</p>
        </div>
        <div className="header-right">
          <button className="add-event-btn">
            <FaPlus />
            Add Event
          </button>
        </div>
      </div>

      <div className="calendar-stats">
        <div className="stat-card">
          <div className="stat-icon">
            <FaCalendarAlt />
          </div>
          <div className="stat-content">
            <h3>{getTotalEvents()}</h3>
            <p>Total Events</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">
            <FaClock />
          </div>
          <div className="stat-content">
            <h3>{getUpcomingEvents()}</h3>
            <p>Upcoming</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">
            <FaCheckCircle />
          </div>
          <div className="stat-content">
            <h3>{getTodayEvents()}</h3>
            <p>Today</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">
            <FaExclamationTriangle />
          </div>
          <div className="stat-content">
            <h3>{getHighPriorityEvents()}</h3>
            <p>High Priority</p>
          </div>
        </div>
      </div>

      <div className="calendar-controls">
        <div className="search-section">
          <div className="search-box">
            <FaSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search events..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        
        <div className="filters-section">
          <select 
            value={typeFilter} 
            onChange={(e) => setTypeFilter(e.target.value)}
            className="filter-select"
          >
            <option value="all">All Types</option>
            <option value="meeting">Meeting</option>
            <option value="presentation">Presentation</option>
            <option value="review">Review</option>
            <option value="training">Training</option>
            <option value="demo">Demo</option>
            <option value="event">Event</option>
            <option value="deadline">Deadline</option>
            <option value="holiday">Holiday</option>
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
        </div>

        <div className="view-toggle">
          <button 
            className={viewMode === 'calendar' ? 'active' : ''}
            onClick={() => setViewMode('calendar')}
          >
            <FaCalendarAlt />
            Calendar
          </button>
          <button 
            className={viewMode === 'list' ? 'active' : ''}
            onClick={() => setViewMode('list')}
          >
            <FaList />
            List
          </button>
        </div>
      </div>

      {viewMode === 'calendar' ? (
        <div className="calendar-container">
          <div className="calendar-wrapper">
            <Calendar
              onChange={handleDateChange}
              value={selectedDate}
              className="custom-calendar"
              tileContent={({ date }) => {
                const dayEvents = getEventsForDate(date);
                return (
                  <div className="calendar-tile-content">
                    {dayEvents.slice(0, 3).map(event => (
                      <div
                        key={event.id}
                        className="calendar-event-dot"
                        style={{ backgroundColor: event.color }}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleEventClick(event);
                        }}
                        title={event.title}
                      />
                    ))}
                    {dayEvents.length > 3 && (
                      <div className="more-events">+{dayEvents.length - 3}</div>
                    )}
                  </div>
                );
              }}
            />
          </div>
          
          <div className="selected-date-events">
            <h3>Events for {formatDate(selectedDate)}</h3>
            <div className="events-list">
              {getEventsForDate(selectedDate).map(event => (
                <div key={event.id} className="event-item" onClick={() => handleEventClick(event)}>
                  <div className="event-time">{formatTime(event.start)}</div>
                  <div className="event-details">
                    <div className="event-title">{event.title}</div>
                    <div className="event-location">{event.location}</div>
                  </div>
                  <div 
                    className="event-priority-indicator"
                    style={{ backgroundColor: getPriorityColor(event.priority) }}
                  />
                </div>
              ))}
              {getEventsForDate(selectedDate).length === 0 && (
                <div className="no-events">
                  <p>No events scheduled for this date</p>
                  <button className="add-event-btn-small" onClick={handleAddEvent}>
                    <FaPlus />
                    Add Event
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="events-list">
          {filteredEvents.map(event => (
            <div key={event.id} className="event-card" onClick={() => handleEventClick(event)}>
              <div className="event-header">
                <div className="event-title-section">
                  <div className="event-icon">
                    {getTypeIcon(event.type)}
                  </div>
                  <div className="event-details">
                    <h3 className="event-title">{event.title}</h3>
                    <p className="event-description">{event.description}</p>
                  </div>
                </div>
                <div className="event-priority">
                  <span 
                    className="priority-badge"
                    style={{ backgroundColor: getPriorityColor(event.priority) }}
                  >
                    {event.priority}
                  </span>
                </div>
              </div>
              
              <div className="event-meta">
                <div className="meta-item">
                  <FaClock />
                  <span>{formatDate(event.start)} at {formatTime(event.start)}</span>
                </div>
                {event.location && event.location !== 'N/A' && (
                  <div className="meta-item">
                    <FaMapMarkerAlt />
                    <span>{event.location}</span>
                  </div>
                )}
                <div className="meta-item">
                  <FaUser />
                  <span>Organized by {event.organizer}</span>
                </div>
                <div className="meta-item">
                  <FaUsers />
                  <span>{event.attendees.length} attendees</span>
                </div>
              </div>

              <div className="event-footer">
                <div className="event-type">
                  <span className="type-badge">{event.type}</span>
                </div>
                <div className="event-actions">
                  <button className="edit-btn">
                    <FaEdit />
                  </button>
                  <button className="delete-btn">
                    <FaTrash />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {showEventModal && selectedEvent && (
        <div className="event-modal-overlay" onClick={() => setShowEventModal(false)}>
          <div className="event-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{(selectedEvent as any).title}</h2>
              <button className="close-btn" onClick={() => setShowEventModal(false)}>
                <FaTimes />
              </button>
            </div>
            
            <div className="modal-body">
              <div className="event-info">
                <div className="info-row">
                  <span className="label">Description:</span>
                  <span className="value">{(selectedEvent as any).description}</span>
                </div>
                <div className="info-row">
                  <span className="label">Date & Time:</span>
                  <span className="value">{formatDate((selectedEvent as any).start)} at {formatTime((selectedEvent as any).start)}</span>
                </div>
                <div className="info-row">
                  <span className="label">Duration:</span>
                  <span className="value">{Math.round((new Date((selectedEvent as any).end).getTime() - new Date((selectedEvent as any).start).getTime()) / (1000 * 60))} minutes</span>
                </div>
                <div className="info-row">
                  <span className="label">Location:</span>
                  <span className="value">{(selectedEvent as any).location}</span>
                </div>
                <div className="info-row">
                  <span className="label">Organizer:</span>
                  <span className="value">{(selectedEvent as any).organizer}</span>
                </div>
                <div className="info-row">
                  <span className="label">Type:</span>
                  <span className="value">{(selectedEvent as any).type}</span>
                </div>
                <div className="info-row">
                  <span className="label">Priority:</span>
                  <span 
                    className="priority-badge"
                    style={{ backgroundColor: getPriorityColor((selectedEvent as any).priority) }}
                  >
                    {(selectedEvent as any).priority}
                  </span>
                </div>
                <div className="info-row">
                  <span className="label">Attendees:</span>
                  <div className="attendees-list">
                    {(selectedEvent as any).attendees.map((attendee: string, index: number) => (
                      <span key={index} className="attendee">{attendee}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="modal-footer">
              <button className="edit-event-btn">
                <FaEdit />
                Edit Event
              </button>
              <button className="delete-event-btn">
                <FaTrash />
                Delete Event
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CalendarPage;
