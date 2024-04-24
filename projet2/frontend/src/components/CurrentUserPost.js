import React from 'react';
import ImageSlideshow from './ImageSlideshow';

const CurrentUserPost = ({ post }) => {
    return (
        <div style={{ marginBottom: '40px', border: '2px solid blue', padding: '20px', borderRadius: '5px' }}>
            <ImageSlideshow images={post.images.map(img => img.image)} />
            <h3>Posted by You: User {post.user}</h3>
            <h2>{post.title}</h2>
            <p>{post.description}</p>
        </div>
    );
};

export default CurrentUserPost;