import React from 'react';
import '../styles/Banner.css';

const Banner = ({ backgroundColor, text, imageUrl, textColor }) => {
  const bannerStyle = {
    backgroundColor,
    backgroundImage: `url(${imageUrl})`,
    color: textColor, // Apply text color
  };
  return (
    <div className="banner" style={bannerStyle}>
      <h1>{text}</h1>
    </div>
  );
};

export default Banner;