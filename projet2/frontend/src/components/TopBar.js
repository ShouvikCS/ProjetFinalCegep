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
          <Nav.Link as={Link} to="/">Home</Nav.Link>
          <Nav.Link as={Link} to="/profile">Profile</Nav.Link>
          <Nav.Link as={Link} to="/posts">My Posts</Nav.Link>
          <Nav.Link as={Link} to="/addpost">Add Post</Nav.Link>
          <Nav.Link onClick={handleLogout} style={{ cursor: 'pointer' }}>Logout</Nav.Link> {/* Added logout link */}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default TopBar;
