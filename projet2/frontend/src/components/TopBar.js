import React from 'react';
import { Link } from 'react-router-dom';

const TopBar = ({ isLoggedIn, onLogout }) => {
  return (
    <div className="top-bar">
      <div className="logo">Recycler's Market</div>
      {isLoggedIn && (
        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/profile">Profile</Link>
          <Link to="/posts">My Posts</Link>
          <button onClick={onLogout}>Logout</button>
        </div>
      )}
    </div>
  );
};

export default TopBar;
