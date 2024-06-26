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
        event.preventDefault(); 
        setMessage('');
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
                setMessage('Ajouté!');
                setComment('');
                setShowInput(false); 
            } catch (error) {
                console.error('Error submitting comment:', error.response ? error.response.data : error);
                setMessage('Erreur lors de l\'ajout du commentaire.');
            }
        } else {
            setMessage('Ne peut pas être vide.'); 
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
                        placeholder="Écrire un commentaire..."
                    />
                    <Button type="submit" variant="success">Soumettre</Button>
                    <Button onClick={() => setShowInput(false)} variant="secondary" style={{ marginLeft: '10px' }}>Annuler</Button>
                </Form>
            ) : (
                <Button onClick={() => setShowInput(true)} variant="success">Ajouter un commentaire</Button>
            )}
            {message && <Alert variant="info" className="mt-3">{message}</Alert>}
        </div>
    );
}

export default AddComment;
