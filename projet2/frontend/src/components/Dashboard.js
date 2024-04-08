import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Dashboard() {
    const [username, setUsername] = useState('');

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/current_user/', { withCredentials: true });
                setUsername(response.data.username);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUserData();
    }, []);

    return (
        <div>
            <h2>Welcome, {username}</h2>
        </div>
    );
}

export default Dashboard;
