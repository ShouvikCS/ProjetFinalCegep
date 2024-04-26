import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CurrentUserPost from './CurrentUserPost';
import OtherUserPost from './OtherUserPost';
import 'bootstrap/dist/css/bootstrap.min.css';  // Ensure Bootstrap CSS is imported

function AllPosts() {
    const [posts, setPosts] = useState([]);
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        const fetchCurrentUser = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/current_user/', { withCredentials: true });
                setCurrentUser({
                    id: response.data.id,
                    username: response.data.username
                });
            } catch (error) {
                console.error('Error fetching current user:', error);
                setCurrentUser(null);
            }
        };

        const fetchPosts = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/posts/', { withCredentials: true });
                setPosts(response.data);
            } catch (error) {
                console.error("There was an error fetching the posts:", error);
            }
        };

        fetchCurrentUser();
        fetchPosts();
    }, []);

    return (
        <div className="container mt-3">
            {posts.map((post) => (
                currentUser && post.user === currentUser.id ?
                <CurrentUserPost key={post.id} post={post} currentUser={currentUser} /> :
                <OtherUserPost key={post.id} post={post} />
            ))}
        </div>
    );
}

export default AllPosts;
