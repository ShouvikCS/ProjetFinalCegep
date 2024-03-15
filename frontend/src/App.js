import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import LoginForm from './components/LoginForm';
import Inventory from './components/Inventory';

function App() {
  return (
    <Router>
      <div className="App">
          welcome to my app
        <Routes>
          <Route path="/login" element={<LoginForm />} />
          <Route path="/dashboard" element={<Inventory />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
