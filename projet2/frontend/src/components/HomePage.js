import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import LoginPage from './LoginPage';
import SignupPage from './SignupPage';
import './HomePage.css'; 

function HomePage() {
  const [activeTab, setActiveTab] = useState('login');

  return (
    <div className="container d-flex flex-column align-items-center justify-content-center" style={{ height: "100vh" }}>
      <h1 className="mb-4">Bienvenue au Marché des recycleurs</h1>
      <div className="toggle-switch">
        <Button
          className={`toggle-btn ${activeTab === 'login' ? '' : 'inactive'}`}
          onClick={() => setActiveTab('login')}
        >
          Connexion
        </Button>
        <Button
          className={`toggle-btn ${activeTab === 'signup' ? '' : 'inactive'}`}
          onClick={() => setActiveTab('signup')}
        >
          Créer un compte
        </Button>
      </div>
      <div className="w-100">
        {activeTab === 'login' ? <LoginPage /> : <SignupPage />}
      </div>
    </div>
  );
}

export default HomePage;
