import "./navbar.scss"
function Navbar() {
  return (
    //main class of navbar
    <div className="navbar">
      {/* logo for the navbar  */}
      <div className="logo">
        <img src="logo.svg" alt="" />
        {/* name */}
        <span>React Admin</span>
      </div>
      {/* icons  */}
      <div className="icons">
        <img src="/search.svg" alt="" className="icon" />
        <img src="app.svg" alt="" className="icon" />
        <img src="/expand.svg" alt="" className="icon" />
        <div className="notification">
          <img src="/notifications.svg" alt="" />
          <span>1</span>
        </div>
        {/* users  */}
        <div className="user">
        <img src="/profile.jpg" alt=""/>
        <span>Jane</span>
        </div>
        <img src="/setting.svg" alt="" className="icon"/>
      </div>
    </div>
  )
}

export default Navbar