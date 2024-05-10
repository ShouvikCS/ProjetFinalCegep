import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css'; 

const TopBar = () => {

  const handleLogout = async () => {
    try {
      const response = await axios.post('http://127.0.0.1:8000/logout/', {}, { withCredentials: true });
      alert('Logged out successfully!');
      window.location.href = '/';
    } catch (error) {
      console.error('Logout failed:', error.response ? error.response.data : error);
    }
  };

  return (
    <Navbar bg="success" variant="dark" expand="lg" sticky="top">
      <Navbar.Brand as={Link} to="/" className="logo">Recycler's Market</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
          <Nav.Link as={Link} to="/">ACCEUIL</Nav.Link>
          <Nav.Link as={Link} to="/profile">PROFIL</Nav.Link>
          <Nav.Link as={Link} to="/posts">MES ANNONCES</Nav.Link>
          <Nav.Link as={Link} to="/addpost">CRÉER ANNONCE</Nav.Link>
          <Nav.Link onClick={handleLogout} style={{ cursor: 'pointer' }}>DÉCONNEXION</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default TopBar;
