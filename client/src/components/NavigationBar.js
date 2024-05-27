import React from 'react';
import { Link } from 'react-router-dom';
import './NavigationBar.css'; 

function NavigationBar() {
  return (
    <nav className="navigation-bar">
      <div className="logo">BookShelf</div>
      <ul>
        <li><Link to="/">Home</Link></li>
      </ul>
      <Link to="/user-profile" className="profile-link">Profile</Link>
    </nav>
  );
}

export default NavigationBar;
