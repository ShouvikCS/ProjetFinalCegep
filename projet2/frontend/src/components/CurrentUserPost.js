import React, { useState } from 'react';
import ImageSlideshow from './ImageSlideshow';
import AddComment from './AddComment';
import { Card, Button, Collapse, Dropdown } from 'react-bootstrap';
import './FormStyles.css';

const CurrentUserPost = ({ post }) => {
    const [open, setOpen] = useState(false);

    return (
        <Card className="mb-4" border="success">
            <Card.Header as="h5" className="bg-success text-white d-flex justify-content-between align-items-center">
    <span>Posted by You: User {post.user}</span>
    <Dropdown>
        <Dropdown.Toggle variant="success" id="dropdown-basic" size="sm" className="custom-dropdown-toggle">
        </Dropdown.Toggle>

        <Dropdown.Menu>
            <Dropdown.Item href="#/edit">Edit</Dropdown.Item>
            <Dropdown.Item href="#/delete">Delete</Dropdown.Item>
        </Dropdown.Menu>
    </Dropdown>
</Card.Header>

            <Card.Body>
                <Card.Title>{post.title}</Card.Title>
                <ImageSlideshow images={post.images.map(img => img.image)} />
                <Card.Text>
                    {post.description}
                </Card.Text>
                <Button
                    onClick={() => setOpen(!open)}
                    aria-controls="example-collapse-text"
                    aria-expanded={open}
                    variant="success"
                >
                    {open ? 'Hide Comments' : 'Show Comments'}
                </Button>
                <Collapse in={open}>
                    <div id="example-collapse-text">
                        {post.comments.length > 0 ? (
                            post.comments.map((comment) => (
                                <Card key={comment.id} className="mt-3">
                                    <Card.Body>
                                        <Card.Text><strong>User {comment.user} says:</strong> {comment.text}</Card.Text>
                                    </Card.Body>
                                </Card>
                            ))
                        ) : (
                            <Card.Text className="mt-3">No comments yet.</Card.Text>
                        )}
                        <AddComment postId={post.id} />
                    </div>
                </Collapse>
            </Card.Body>
        </Card>
    );
};

export default CurrentUserPost;
