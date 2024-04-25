import React from 'react';
import ImageSlideshow from './ImageSlideshow';
import AddComment from './AddComment';

const OtherUserPost = ({ post }) => {
    return (
        <div style={{ marginBottom: '40px', border: '1px solid #ccc', padding: '20px', borderRadius: '5px' }}>
            <ImageSlideshow images={post.images.map(img => img.image)} />
            <h3>Posted by: User {post.user}</h3>
            <h2>{post.title}</h2>
            <p>{post.description}</p>
            <div>
                <h3>Comments:</h3>
                {post.comments.length > 0 ? (
                    post.comments.map((comment) => (
                        <div key={comment.id} style={{ marginTop: '10px', paddingLeft: '20px', borderLeft: '3px solid #aaa' }}>
                            <p><strong>User {comment.user} says:</strong> {comment.text}</p>
                        </div>
                    ))
                ) : (
                    <p>No comments yet.</p>
                )}
            </div>
            <AddComment postId={post.id} />
        </div>
    );
};

export default OtherUserPost;