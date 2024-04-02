import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import LoginForm from './components/LoginForm';
import Inventory from './components/Inventory';
import AddProductForm from './components/AddProductForm';
import UpdateProductForm from './components/UpdateProductForm';
import EmployeeDashboard from './components/EmployeeDashboard';
import ManagerDashboard from './components/ManagerDashboard';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/employee/dashboard" element={<EmployeeDashboard />} />
          <Route path="/manager/dashboard" element={<ManagerDashboard />} />
          <Route path="/manager/inventory" element={<Inventory />} />
          <Route path="/manager/inventory/add" element={<AddProductForm />} />
          <Route path="/manager/inventory/update/:id" element={<UpdateProductForm />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
