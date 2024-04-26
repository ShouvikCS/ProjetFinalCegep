import React from 'react';
import ImageSlideshow from './ImageSlideshow';
import AddComment from './AddComment';
import { Card, Button, Collapse } from 'react-bootstrap';

const OtherUserPost = ({ post }) => {
    const [open, setOpen] = React.useState(false);

    return (
        <Card className="mb-4" border="black">
            <Card.Header as="h5">
                Posted by: User {post.user - 1}
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
                    variant="outline-secondary"
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

export default OtherUserPost;
