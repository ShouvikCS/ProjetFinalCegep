import React from 'react';
import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <div className="container">
      <h1 className="title">Welcome to Recycler's Market</h1>
      <Link to="/login" className="btn">Login</Link>
      <Link to="/signup" className="btn btn-secondary">Sign Up</Link>
    </div>
  );
}

export default HomePage;
