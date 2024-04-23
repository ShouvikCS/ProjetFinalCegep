import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ImageSlideshow from './ImageSlideshow'; // Import the slideshow component

function AllPosts() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/posts/', { withCredentials: true })
            .then(response => {
                setPosts(response.data);
            })
            .catch(error => console.error("There was an error fetching the posts:", error));
    }, []);

    return (
        <div style={{ padding: '20px' }}>
            {posts.map((post) => (
                <div key={post.id} style={{ marginBottom: '40px', border: '1px solid #ccc', padding: '20px', borderRadius: '5px' }}>
                    <ImageSlideshow images={post.images.map(img => img.image)} />
                    <h3>Posted by: User {post.user}</h3>
                    <h2>{post.title}</h2>
                    <p>{post.description}</p>
                    <div>
                        <h3>Comments:</h3>
                        {post.comments.length > 0 ? (
                            post.comments.map((comment) => (
                                <div key={comment.id} style={{ marginTop: '10px', paddingLeft: '20px', borderLeft: '3px solid #aaa' }}>
                                    <p><strong>User {comment.user} says:</strong></p>
                                    <p>{comment.text}</p>
                                </div>
                            ))
                        ) : (
                            <p>No comments yet.</p>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
}

export default AllPosts;
