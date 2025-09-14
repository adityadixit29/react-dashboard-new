import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./navbar.scss";

function Navbar() {
  const navigate = useNavigate();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // You can implement search functionality here
      console.log("Searching for:", searchQuery);
    }
  };

  const handleNotificationClick = () => {
    // You can implement notification functionality here
    console.log("Notifications clicked");
  };

  const handleProfileClick = () => {
    handleNavigation("/profile");
  };

  const handleSettingsClick = () => {
    handleNavigation("/settings");
  };

  const handleAppsClick = () => {
    // You can implement apps menu functionality here
    console.log("Apps clicked");
  };

  const handleExpandClick = () => {
    // You can implement fullscreen functionality here
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      document.documentElement.requestFullscreen();
    }
  };

  return (
    //main class of navbar
    <div className="navbar">
      {/* logo for the navbar  */}
      <div className="logo" onClick={() => handleNavigation("/")} style={{ cursor: "pointer" }}>
        <img src="logo.svg" alt="" />
        {/* name */}
        <span>Admin</span>
      </div>
      
      {/* icons  */}
      <div className="icons">
        {/* Search */}
        <div className="search-container">
          <img 
            src="/search.svg" 
            alt="" 
            className="icon" 
            onClick={() => setIsSearchOpen(!isSearchOpen)}
            style={{ cursor: "pointer" }}
          />
          {isSearchOpen && (
            <form onSubmit={handleSearch} className="search-form">
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
                autoFocus
              />
            </form>
          )}
        </div>
        
        {/* Apps */}
        <img 
          src="app.svg" 
          alt="" 
          className="icon" 
          onClick={handleAppsClick}
          style={{ cursor: "pointer" }}
          title="Apps"
        />
        
        {/* Expand/Fullscreen */}
        <img 
          src="/expand.svg" 
          alt="" 
          className="icon" 
          onClick={handleExpandClick}
          style={{ cursor: "pointer" }}
          title="Toggle Fullscreen"
        />
        
        {/* Notifications */}
        <div className="notification" onClick={handleNotificationClick} style={{ cursor: "pointer" }}>
          <img src="/notifications.svg" alt="" />
          <span>1</span>
        </div>
        
        {/* User Profile */}
        <div className="user" onClick={handleProfileClick} style={{ cursor: "pointer" }}>
          <img src="/profile.jpg" alt=""/>
          <span>Aditya</span>
        </div>
        
        {/* Settings */}
        <img 
          src="/setting.svg" 
          alt="" 
          className="icon" 
          onClick={handleSettingsClick}
          style={{ cursor: "pointer" }}
          title="Settings"
        />
      </div>
    </div>
  )
}

export default Navbar