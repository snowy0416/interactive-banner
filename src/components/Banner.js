import React from 'react';
import '../styles/Banner.css';

const Banner = ({ backgroundColor, text, imageUrl, textColor, paragraph, fontFamily, fontSize, fontWeight, textAlign }) => {
  const bannerStyle = {
    backgroundColor,
    backgroundImage: `url(${imageUrl})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    color: textColor,
  };

  const textStyle = {
    fontFamily,
    fontSize,
    fontWeight,
    textAlign,
  };

  return (
    <div className="banner" style={bannerStyle}>
      <div className="banner-overlay">
        <h1 className="banner-text" style={textStyle}>{text}</h1>
        <p className="banner-paragraph" style={textStyle}>{paragraph}</p>
      </div>
    </div>
  );
};

export default Banner;