import React, { useState } from 'react';
import axios from 'axios';

function AddPost() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        const postData = {
            user_id: 2, // Temporarily hardcoded
            title,
            description,

        };

        axios.post('http://127.0.0.1:8000/posts/create/', postData, {
            withCredentials: true
        })
            .then(response => {
                console.log(response.data);
                alert('Post added successfully!');

            })
            .catch(error => console.error('There was an error adding the post:', error));
    };

    return (
        <div>
            <h2>Add Post</h2>
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
                <button type="submit">Add Post</button>
            </form>
        </div>
    );
}

export default AddPost;
