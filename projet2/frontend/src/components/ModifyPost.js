import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ModifyPost({ postId }) { 
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/posts/${postId}/`)
            .then(response => {
                setTitle(response.data.title);
                setDescription(response.data.description);
            })
            .catch(error => console.error('There was an error fetching the post:', error));
    }, [postId]);

    const handleSubmit = (event) => {
        event.preventDefault();
        const postData = {
            user_id: 2, // Temporarily hardcoded
            title,
            description,
        };

        axios.put(`http://127.0.0.1:8000/posts/${postId}/`, postData)
            .then(response => {
                console.log(response.data);
                alert('Post modified successfully!');
            })
            .catch(error => console.error('There was an error modifying the post:', error));
    };

    return (
        <div>
            <h2>Modify Post</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Title:</label>
                    <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
                </div>
                <div>
                    <label>Description:</label>
                    <textarea value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
                </div>
                <div>
                    <label>Add Images Here:</label>
                    <input type="file" disabled />
                </div>
                <button type="submit">Modify Post</button>
            </form>
        </div>
    );
}

export default ModifyPost;
