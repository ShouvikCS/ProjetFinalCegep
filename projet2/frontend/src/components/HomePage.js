import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import LoginPage from './LoginPage';
import SignupPage from './SignupPage';
import './HomePage.css'; // Importing custom CSS for styling

function HomePage() {
  const [activeTab, setActiveTab] = useState('login');

  return (
    <div className="container d-flex flex-column align-items-center justify-content-center" style={{ height: "100vh" }}>
      <h1 className="mb-4">Welcome to Recycler's Market</h1>
      <div className="toggle-switch">
        <Button
          className={`toggle-btn ${activeTab === 'login' ? '' : 'inactive'}`}
          onClick={() => setActiveTab('login')}
        >
          Login
        </Button>
        <Button
          className={`toggle-btn ${activeTab === 'signup' ? '' : 'inactive'}`}
          onClick={() => setActiveTab('signup')}
        >
          Sign Up
        </Button>
      </div>
      <div className="w-100">
        {activeTab === 'login' ? <LoginPage /> : <SignupPage />}
      </div>
    </div>
  );
}

export default HomePage;
