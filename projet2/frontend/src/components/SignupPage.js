import React, { useState } from 'react';
import { Form, Button, Card, Alert } from 'react-bootstrap';
import axios from 'axios';

function SignupPage() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState('');

  const handleSignup = async (e) => {
    e.preventDefault();
    setMessage(''); // Clear previous messages
    setErrors({}); // Clear previous errors

    // Basic client-side validation for demonstration
    if (password !== confirmPassword) {
      setErrors({ confirmPassword: "Passwords do not match" });
      return;
    }

    try {
      const response = await axios.post('http://127.0.0.1:8000/signup/', {
        username, email, password
      });
      setMessage(response.data.message);
    } catch (error) {
      if (error.response) {
        // Assuming the server response includes field-specific errors
        if (error.response.status === 400) {
          setErrors(error.response.data.errors);
        }
        setMessage(error.response.data.error || 'Failed to sign up.');
      } else {
        setMessage('Failed to connect to the server.');
      }
    }
  };

  return (
    <Card className="auth-card">
      <Card.Body>
        <Card.Title>Inscription</Card.Title>
        <Form onSubmit={handleSignup}>
          <Form.Group controlId="signupUsername">
            <Form.Label>Utilisateur</Form.Label>
            <Form.Control type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Enter username" />
            {errors.username && <small className="text-danger">{errors.username}</small>}
          </Form.Group>
          <Form.Group controlId="signupEmail">
            <Form.Label>Courriel</Form.Label>
            <Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter email" />
            {errors.email && <small className="text-danger">{errors.email}</small>}
          </Form.Group>
          <Form.Group controlId="signupPassword">
            <Form.Label>Mot de Passe</Form.Label>
            <Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
            {errors.password && <small className="text-danger">{errors.password}</small>}
          </Form.Group>
          <Form.Group controlId="confirmPassword">
            <Form.Label>Confirmer Mot de Passe</Form.Label>
            <Form.Control type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Confirm Password" />
            {errors.confirmPassword && <small className="text-danger">{errors.confirmPassword}</small>}
          </Form.Group>
          <Button variant="success" type="submit">S'inscrire</Button>
          {message && <div className="mt-3">
            <Alert variant={errors ? "danger" : "success"}>{message}</Alert>
          </div>}
        </Form>
      </Card.Body>
    </Card>
  );
}

export default SignupPage;
