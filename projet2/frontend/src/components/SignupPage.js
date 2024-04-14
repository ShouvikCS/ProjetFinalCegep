import React, { useState } from 'react';
import { Form, Button, Card } from 'react-bootstrap';
import './FormStyles.css'; // Reuse styles

function SignupPage() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});

  const handleSignup = (e) => {
    e.preventDefault();
    // Validation logic here
    // Perform signup logic here if no errors
  };

  return (
    <Card className="auth-card">
      <Card.Body>
        <Card.Title>Sign Up</Card.Title>
        <Form onSubmit={handleSignup}>
          <Form.Group controlId="signupUsername">
            <Form.Label>Username</Form.Label>
            <Form.Control type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Enter username" />
            {errors.username && <small className="text-danger">{errors.username}</small>}
            <br />
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter email" />
            {errors.email && <small className="text-danger">{errors.email}</small>}
            <br />
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
            {errors.password && <small className="text-danger">{errors.password}</small>}

          </Form.Group>
          <Button variant="success" type="submit">Sign Up</Button>
        </Form>
      </Card.Body>
    </Card>
  );
}

export default SignupPage;
