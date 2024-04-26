import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button, Container, FormGroup, Label, Input, Col, Alert } from 'react-bootstrap';

function AddPost() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [images, setImages] = useState([]);
    const [message, setMessage] = useState('');

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
            setMessage('Post added successfully!');
        } catch (error) {
            console.error('There was an error adding the post:', error.response ? error.response.data : error);
            setMessage('Failed to add post.');
        }
    };

    return (
        <Container className="mt-5">
            <h2 className="text-center mb-4" style={{ color: 'green' }}>Add Post</h2>
            <Form onSubmit={handleSubmit}>
                <FormGroup as={Col} controlId="formGridTitle">
                    <Form.Label>Title</Form.Label>
                    <Form.Control
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Enter post title"
                    />
                </FormGroup>
                <FormGroup as={Col} controlId="formGridDescription">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={3}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Enter post description"
                    />
                </FormGroup>
                <FormGroup as={Col} controlId="formGridImages">
                    <Form.Label>Add Images Here (up to 10)</Form.Label>
                    <Form.Control
                        type="file"
                        multiple
                        onChange={handleFileChange}
                    />
                </FormGroup>
                <Button variant="success" type="submit" className="mt-3">Add Post</Button>
            </Form>
            {message && <Alert variant="info" className="mt-3">{message}</Alert>}
        </Container>
    );
}

export default AddPost;
