import React, { useState } from 'react';
import axios from 'axios';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://127.0.0.1:8000/login/', { username, password });
            console.log('Login successful:', response.data);
            // Redirect or update state as needed
        } catch (error) {
            console.error('Login failed:', error.response.data);
            // Handle error, show message, etc.
        }
    };

    return (
        <div>
            <form onSubmit={handleLogin}>
                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" />
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
                <button type="submit">Login</button>
            </form>
        </div>
    );
}

export default Login;
