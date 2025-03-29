import React from 'react';
import '../styles/Banner.css';
import { designTokens } from '../design-tokens';

const Banner = ({ 
  backgroundColor = designTokens.colors.primary, 
  gradient, 
  text, 
  imageUrl, 
  textColor = designTokens.colors.textLight, 
  paragraph, 
  fontFamily = designTokens.fonts.primary, 
  fontSize = designTokens.fonts.sizes.xlarge,
  fontWeight = 'bold', 
  textAlign = 'center' 
}) => {
  const bannerStyle = {
    '--banner-bg-color': backgroundColor,
    '--banner-text-color': textColor,
    '--banner-font-family': fontFamily,
    '--banner-font-size': fontSize,
    '--banner-font-weight': fontWeight,
    background: gradient
      ? `linear-gradient(${gradient.angle}deg, ${gradient.colors.join(', ')}), url(${imageUrl})`
      : `url(${imageUrl})`
  };

  return (
    <div className="banner" style={bannerStyle}>
      <div className="banner-overlay">
        <h1 className="banner-text">{text}</h1>
        {paragraph && <p className="banner-paragraph">{paragraph}</p>}
      </div>
    </div>
  );
};

export default Banner;