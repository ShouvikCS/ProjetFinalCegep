import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import LoginPage from './components/LoginPage';
import SignupPage from './components/SignupPage';
import Dashboard from './components/Dashboard';
import AllPosts from './components/AllPosts';
import AddPost from './components/AddPost';
import ModifyPost from './components/ModifyPost';
import TopBar from './components/TopBar';

function App() {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    
    const fetchCurrentUser = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/current_user/', { withCredentials: true });
        setCurrentUser(response.data); 
      } catch (error) {
        console.error('Error fetching current user:', error);
        setCurrentUser(null);
      }
    };

    fetchCurrentUser();
  }, []);

  return (
    <Router>
      <div>

        {currentUser && currentUser.logged_in && <TopBar />}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/profile" element={<Dashboard />} />
          <Route path="/posts" element={<AllPosts />} />
          <Route path="/addpost" element={<AddPost />} />
          <Route path="/modifypost/:postId" element={<ModifyPost />} />
          <Route path="/messages/:userId" element={<div>Messages</div>} />
          <Route path="*" element={<div>Not Found</div>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
