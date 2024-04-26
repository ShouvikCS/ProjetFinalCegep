import React, { useState } from 'react';
import axios from 'axios';
import { Button, Form, FormControl, Alert } from 'react-bootstrap';

function AddComment({ postId }) {
    const [showInput, setShowInput] = useState(false);
    const [comment, setComment] = useState('');
    const [message, setMessage] = useState('');

    const handleCommentChange = (event) => {
        setComment(event.target.value);
    };

    const submitComment = async (event) => {
        event.preventDefault(); // Prevent default form submission behavior
        setMessage(''); // Clear previous message
        if (comment.trim()) {
            try {
                const response = await axios.post(`http://127.0.0.1:8000/posts/${postId}/addcomment/`, {
                    text: comment,
                }, {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    withCredentials: true
                });
                setMessage('Comment added successfully!');
                setComment('');
                setShowInput(false); // Optionally hide the input after submission
            } catch (error) {
                console.error('Error submitting comment:', error.response ? error.response.data : error);
                setMessage('Failed to add comment.'); // Display error message
            }
        } else {
            setMessage('Comment cannot be empty.'); // Display message when comment is empty
        }
    };

    return (
        <div>
            {showInput ? (
                <Form onSubmit={submitComment}>
                    <FormControl
                        as="textarea"
                        value={comment}
                        onChange={handleCommentChange}
                        placeholder="Write a comment..."
                    />
                    <Button type="submit" variant="success">Submit Comment</Button>
                    <Button onClick={() => setShowInput(false)} variant="secondary" style={{ marginLeft: '10px' }}>Cancel</Button>
                </Form>
            ) : (
                <Button onClick={() => setShowInput(true)} variant="success">Add a Comment</Button>
            )}
            {message && <Alert variant="info" className="mt-3">{message}</Alert>}
        </div>
    );
}

export default AddComment;
