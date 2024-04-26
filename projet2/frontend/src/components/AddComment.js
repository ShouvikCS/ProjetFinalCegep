import React, { useState } from 'react';
import axios from 'axios';
import { Button, Form, FormControl } from 'react-bootstrap';

function AddComment({ postId }) {
    const [showInput, setShowInput] = useState(false);
    const [comment, setComment] = useState('');

    const handleCommentChange = (event) => {
        setComment(event.target.value);
    };

    const submitComment = async (event) => {
        event.preventDefault(); // Prevent default form submission behavior
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
                alert('Comment added successfully!');
                setComment('');
                setShowInput(false); 
            } catch (error) {
                console.error('Error submitting comment:', error.response ? error.response.data : error);
                alert('Failed to add comment.');
            }
        } else {
            alert('Comment cannot be empty.');
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
        </div>
    );
}

export default AddComment;
