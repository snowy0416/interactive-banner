import React, { useState } from 'react';
import '../styles/Form.css';

const Form = ({ onUpdateBanner, onImageUpload, toggleBackgroundType, useGradient }) => {
  const [formState, setFormState] = useState({
    text: 'Welcome to My Banner',
    paragraph: 'Discover the wonders of the cosmos and beyond.',
    textColor: '#ffffff',
    fontFamily: 'Poppins',
    fontSize: '3rem',
    fontWeight: 'bold',
    textAlign: 'center'
  });

  const fonts = [
    'Poppins',
    'Roboto',
    'Open Sans',
    'Lato',
    'Montserrat',
    'Raleway',
    'Merriweather',
    'Playfair Display',
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState(prev => ({
      ...prev,
      [name]: value
    }));
    onUpdateBanner({ [name]: value });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) onImageUpload(file);
  };

  return (
    <form className="banner-form">
      <fieldset>
        <legend>Banner Content</legend>
        <label>
          Banner Text:
          <input
            type="text"
            name="text"
            value={formState.text}
            onChange={handleChange}
          />
        </label>
        <label>
          Paragraph:
          <textarea
            name="paragraph"
            value={formState.paragraph}
            onChange={handleChange}
          />
        </label>
      </fieldset>

      <fieldset>
        <legend>Text Styling</legend>
        <label>
          Font Family:
          <select
            name="fontFamily"
            value={formState.fontFamily}
            onChange={handleChange}
          >
            {fonts.map((font) => (
              <option key={font} value={font}>{font}</option>
            ))}
          </select>
        </label>
        <label>
          Font Size:
          <input
            type="text"
            name="fontSize"
            value={formState.fontSize}
            onChange={handleChange}
          />
        </label>
        <label>
          Font Weight:
          <select
            name="fontWeight"
            value={formState.fontWeight}
            onChange={handleChange}
          >
            <option value="normal">Normal</option>
            <option value="bold">Bold</option>
            <option value="bolder">Bolder</option>
            <option value="lighter">Lighter</option>
          </select>
        </label>
        <label>
          Text Alignment:
          <select
            name="textAlign"
            value={formState.textAlign}
            onChange={handleChange}
          >
            <option value="left">Left</option>
            <option value="center">Center</option>
            <option value="right">Right</option>
            <option value="justify">Justify</option>
          </select>
        </label>
      </fieldset>

      <fieldset>
        <legend>Banner Styling</legend>
        <label>
          Background Image:
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
          />
        </label>
        <label>
          Background Type:
          <select
            value={useGradient ? 'gradient' : 'solid'}
            onChange={(e) => toggleBackgroundType(e.target.value === 'gradient')}
          >
            <option value="solid">Solid background</option>
            <option value="gradient">Gradient</option>
          </select>
        </label>
        <label>
          Text Color:
          <input
            type="color"
            name="textColor"
            value={formState.textColor}
            onChange={handleChange}
          />
        </label>
      </fieldset>
    </form>
  );
};

export default Form;