import React, { useState } from 'react';
import ImageSlideshow from './ImageSlideshow';
import AddComment from './AddComment';
import { Card, Button, Collapse } from 'react-bootstrap';

const CurrentUserPost = ({ post }) => {
    const [open, setOpen] = useState(false);

    return (
        <Card className="mb-4" border="success">
            <Card.Header as="h5" className="bg-success text-white">
                Posted by You: User {post.user - 1}
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
