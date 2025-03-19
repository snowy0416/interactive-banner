import React, { useState } from 'react';
import '../styles/Form.css';

const Form = ({ onUpdateBanner }) => {
    const [backgroundColor, setBackgroundColor] = useState('#ffffff');
    const [text, setText] = useState('Welcome to My Banner');
    const [imageUrl, setImageUrl] = useState('');
    const [textColor, setTextColor] = useState('#000000');
  
    const handleSubmit = (e) => {
      e.preventDefault();
      onUpdateBanner({ backgroundColor, text, imageUrl, textColor });
    };
  
    const handleImageUpload = (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          setImageUrl(event.target.result);
        };
        reader.readAsDataURL(file);
      }
    };
  
    const applyTheme = (theme) => {
      switch (theme) {
        case 'nature':
          setBackgroundColor('#4CAF50');
          setTextColor('#FFFFFF');
          setImageUrl('https://example.com/nature.jpg');
          break;
        case 'tech':
          setBackgroundColor('#2196F3');
          setTextColor('#000000');
          setImageUrl('https://example.com/tech.jpg');
          break;
        case 'minimalist':
          setBackgroundColor('#FFFFFF');
          setTextColor('#000000');
          setImageUrl('');
          break;
        default:
          break;
      }
    };
  
    return (
      <form onSubmit={handleSubmit}>
        <label>
          Background Color:
          <input
            type="color"
            value={backgroundColor}
            onChange={(e) => setBackgroundColor(e.target.value)}
          />
        </label>
        <label>
          Banner Text:
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </label>
        <label>
          Text Color:
          <input
            type="color"
            value={textColor}
            onChange={(e) => setTextColor(e.target.value)}
          />
        </label>
        <label>
          Background Image:
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
          />
        </label>
        <label>
          Preset Themes:
          <select onChange={(e) => applyTheme(e.target.value)}>
            <option value="">Select a theme</option>
            <option value="nature">Nature</option>
            <option value="tech">Tech</option>
            <option value="minimalist">Minimalist</option>
          </select>
        </label>
        <button type="submit">Update Banner</button>
      </form>
    );
  };
  

export default Form;