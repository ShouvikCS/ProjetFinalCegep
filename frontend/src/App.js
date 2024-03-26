import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import LoginForm from './components/LoginForm';
import Inventory from './components/Inventory';
import AddProductForm from './components/AddProductForm';
import UpdateProductForm from './components/UpdateProductForm';

function App() {
  return (
    <Router>
      <div className="App">
          welcome to my app
        <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/dashboard" element={<Inventory />} />
          <Route path="/add" element={<AddProductForm />} />
          <Route path="update/:id" element={<UpdateProductForm />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
