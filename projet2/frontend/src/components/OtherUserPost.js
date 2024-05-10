import React from 'react';
import { useNavigate } from 'react-router-dom';
import ImageSlideshow from './ImageSlideshow';
import AddComment from './AddComment';
import { Card, Button, Collapse } from 'react-bootstrap';

const OtherUserPost = ({ post }) => {
    const [open, setOpen] = React.useState(false);
    const navigate = useNavigate(); // Hook for redirecting

    const handleContactClick = () => {
        navigate(`/messages/${post.user}`); // Redirect to the messages page for this user
    };

    return (
        <Card className="mb-4" border="black">
            <Card.Header as="h5" className="d-flex justify-content-between align-items-center">
                <span>Par: User {post.user - 1}</span>
                <Button variant="outline-primary" size="sm" onClick={handleContactClick}>
                    Contacter
                </Button>
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
                    {open ? 'Cacher' : 'Montrer Commentaires'}
                </Button>
                <Collapse in={open}>
                    <div id="example-collapse-text">
                        {post.comments.length > 0 ? (
                            post.comments.map((comment) => (
                                <Card key={comment.id} className="mt-3">
                                    <Card.Body>
                                        <Card.Text><strong>User {comment.user} dit:</strong> {comment.text}</Card.Text>
                                    </Card.Body>
                                </Card>
                            ))
                        ) : (
                            <Card.Text className="mt-3">Aucun commentaire.</Card.Text>
                        )}
                        <AddComment postId={post.id} />
                    </div>
                </Collapse>
            </Card.Body>
        </Card>
    );
};

export default OtherUserPost;
