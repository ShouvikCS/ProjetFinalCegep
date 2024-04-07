import React, { useState } from 'react';

function SignupPage() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({ username: '', email: '', password: '', confirmPassword: '' });

  const handleSignup = (e) => {
    e.preventDefault();

    let newErrors = {};

    // Validate username
    if (!username) {
      newErrors.username = 'Username is required';
    }

    // Validate email
    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Invalid email address';
    }

    // Validate password
    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters long';
    }

    // Validate confirm password
    if (!confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);

    // Perform signup logic here if no errors
    if (Object.keys(newErrors).length === 0) {
      // Signup logic
    }
  };

  return (
    <div className="container">
      <h1 className="title">Sign Up</h1>
      <form onSubmit={handleSignup}>
        <div>
          <label>Username:</label>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
          {errors.username && <span className="error">{errors.username}</span>}
        </div>
        <div>
          <label>Email:</label>
          <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
          {errors.email && <span className="error">{errors.email}</span>}
        </div>
        <div>
          <label>Password:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          {errors.password && <span className="error">{errors.password}</span>}
        </div>
        <div>
          <label>Confirm Password:</label>
          <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
          {errors.confirmPassword && <span className="error">{errors.confirmPassword}</span>}
        </div>
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}

export default SignupPage;
