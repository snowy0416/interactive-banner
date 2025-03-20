import React from 'react';
import '../styles/Banner.css';

const Banner = ({ backgroundColor, text, imageUrl, textColor, paragraph }) => {
  const bannerStyle = {
    backgroundColor,
    backgroundImage: `url(${imageUrl})`,
    backgroundSize: 'cover', // Ensure the image covers the entire banner
    backgroundPosition: 'center', // Center the image
    color: textColor,
  };

  return (
    <div className="banner" style={bannerStyle}>
      <div className="banner-overlay">
        <h1 className="banner-text">{text}</h1>
        <p className="banner-paragraph">{paragraph}</p>
      </div>
    </div>
  );
};

export default Banner;  