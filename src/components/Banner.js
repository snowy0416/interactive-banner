import React from 'react';
import '../styles/Banner.css';

const Banner = ({ backgroundColor, text, imageUrl }) => {
  return (
    <div className="banner" style={{ backgroundColor, backgroundImage: `url(${imageUrl})` }}>
      <h1>{text}</h1>
    </div>
  );
};

export default Banner;