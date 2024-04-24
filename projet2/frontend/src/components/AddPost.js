import React, { useState } from 'react';
import axios from 'axios';

function AddPost() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [images, setImages] = useState([]);

    const handleFileChange = (event) => {
        if (event.target.files.length > 10) {
            alert("You can only upload a maximum of 10 images");
            return;
        }
        setImages(event.target.files);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        formData.append('user', 2); // This should be dynamically fetched if possible

        for (let i = 0; i < images.length; i++) {
            formData.append('images', images[i]);
        }

        try {
            const response = await axios.post('http://127.0.0.1:8000/posts/create/', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                withCredentials: true
            });
            console.log(response.data);
            alert('Post added successfully!');
        } catch (error) {
            console.error('There was an error adding the post:', error.response ? error.response.data : error);
        }
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
                    <label>Add Images Here (up to 10):</label>
                    <input type="file" multiple onChange={handleFileChange} />
                </div>
                <button type="submit">Add Post</button>
            </form>
        </div>
    );
}

export default AddPost;
