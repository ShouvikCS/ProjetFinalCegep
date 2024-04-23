import React from 'react';
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';

const ImageSlideshow = ({ images }) => {
    return (
        <div className="slide-container">
            <Slide easing="ease">
                {images.map((image, index) => (
                    <div className="each-slide" key={index}>
                        <div style={{'backgroundImage': `url(${image})`, height: '400px', backgroundSize: 'cover', backgroundPosition: 'center'}}>
                        </div>
                    </div>
                ))}
            </Slide>
        </div>
    );
};

export default ImageSlideshow;
