import React, { useState } from 'react';
import { Form, Button, Card } from 'react-bootstrap';
import './FormStyles.css'; 
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

axios.defaults.withCredentials = true;

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); 

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:8000/login/', { username, password });
      console.log('Login successful:', response.data);
      window.location.href = '/posts';
    } catch (error) {
      console.error('Login failed:', error.response?.data);
    }
  };

  return (
    <Card className="auth-card">
      <Card.Body>
        <Card.Title>Connexion</Card.Title>
        <Form onSubmit={handleLogin}>
          <Form.Group controlId="loginUsername">
            <Form.Label>Utilisateur</Form.Label>
            <Form.Control type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Enter username" />
          </Form.Group>
          <Form.Group controlId="loginPassword">
            <Form.Label>Mot de Passe</Form.Label>
            <Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
          </Form.Group>
          <Button variant="success" type="submit">Se Connecter</Button>
        </Form>
      </Card.Body>
    </Card>
  );
}

export default Login;
