import React, { useState } from 'react';
import '../styles/Form.css';

const Form = ({ onUpdateBanner }) => {
  const [backgroundColor, setBackgroundColor] = useState('#000000');
  const [text, setText] = useState('Welcome to My Banner');
  const [paragraph, setParagraph] = useState('Discover the wonders of the cosmos and beyond.');
  const [imageUrl, setImageUrl] = useState('https://images.unsplash.com/photo-1465101162946-4377e57745c3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80');
  const [textColor, setTextColor] = useState('#ffffff');
  const [fontFamily, setFontFamily] = useState('Poppins');
  const [fontSize, setFontSize] = useState('3rem');
  const [fontWeight, setFontWeight] = useState('bold');
  const [textAlign, setTextAlign] = useState('center');

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

  // Define preset themes (including dark/light themes)
  const themes = {
    nature: {
      backgroundColor: '#4CAF50', // Green
      textColor: '#FFFFFF', // White
      fontFamily: 'Poppins',
    },
    tech: {
      backgroundColor: '#2196F3', // Blue
      textColor: '#000000', // Black
      fontFamily: 'Roboto',
    },
    minimalist: {
      backgroundColor: '#FFFFFF', // White
      textColor: '#000000', // Black
      fontFamily: 'Open Sans',
    },
    dark: {
      backgroundColor: '#333333', // Dark gray
      textColor: '#FFFFFF', // White
      fontFamily: 'Montserrat',
    },
    light: {
      backgroundColor: '#FFFFFF', // White
      textColor: '#000000', // Black
      fontFamily: 'Lato',
    },
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImageUrl(event.target.result);
        onUpdateBanner({ backgroundColor, text, paragraph, imageUrl: event.target.result, textColor, fontFamily, fontSize, fontWeight, textAlign });
      };
      reader.readAsDataURL(file);
    }
  };

  // Function to apply a selected theme
  const applyTheme = (theme) => {
    const selectedTheme = themes[theme];
    setBackgroundColor(selectedTheme.backgroundColor);
    setTextColor(selectedTheme.textColor);
    setFontFamily(selectedTheme.fontFamily);
    onUpdateBanner({
      backgroundColor: selectedTheme.backgroundColor,
      text,
      paragraph,
      imageUrl,
      textColor: selectedTheme.textColor,
      fontFamily: selectedTheme.fontFamily,
      fontSize,
      fontWeight,
      textAlign,
    });

    // Update the page background and text color for dark/light themes
    if (theme === 'dark') {
      document.body.style.backgroundColor = '#333333';
      document.body.style.color = '#ffffff';
    } else if (theme === 'light') {
      document.body.style.backgroundColor = '#ffffff';
      document.body.style.color = '#000000';
    }
  };

  return (
    <form>
      <fieldset>
        <legend>Banner Content</legend>
        <label>
          Banner Text:
          <input
            type="text"
            value={text}
            onChange={(e) => {
              setText(e.target.value);
              onUpdateBanner({ backgroundColor, text: e.target.value, paragraph, imageUrl, textColor, fontFamily, fontSize, fontWeight, textAlign });
            }}
          />
        </label>
        <label>
          Paragraph:
          <textarea
            value={paragraph}
            onChange={(e) => {
              setParagraph(e.target.value);
              onUpdateBanner({ backgroundColor, text, paragraph: e.target.value, imageUrl, textColor, fontFamily, fontSize, fontWeight, textAlign });
            }}
          />
        </label>
      </fieldset>

      <fieldset>
        <legend>Text Styling</legend>
        <label>
          Font Family:
          <select
            value={fontFamily}
            onChange={(e) => {
              setFontFamily(e.target.value);
              onUpdateBanner({ backgroundColor, text, paragraph, imageUrl, textColor, fontFamily: e.target.value, fontSize, fontWeight, textAlign });
            }}
          >
            {fonts.map((font) => (
              <option key={font} value={font}>
                {font}
              </option>
            ))}
          </select>
        </label>
        <label>
          Font Size:
          <input
            type="text"
            value={fontSize}
            onChange={(e) => {
              setFontSize(e.target.value);
              onUpdateBanner({ backgroundColor, text, paragraph, imageUrl, textColor, fontFamily, fontSize: e.target.value, fontWeight, textAlign });
            }}
          />
        </label>
        <label>
          Font Weight:
          <select
            value={fontWeight}
            onChange={(e) => {
              setFontWeight(e.target.value);
              onUpdateBanner({ backgroundColor, text, paragraph, imageUrl, textColor, fontFamily, fontSize, fontWeight: e.target.value, textAlign });
            }}
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
            value={textAlign}
            onChange={(e) => {
              setTextAlign(e.target.value);
              onUpdateBanner({ backgroundColor, text, paragraph, imageUrl, textColor, fontFamily, fontSize, fontWeight, textAlign: e.target.value });
            }}
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
          Background Color:
          <input
            type="color"
            value={backgroundColor}
            onChange={(e) => {
              setBackgroundColor(e.target.value);
              onUpdateBanner({ backgroundColor: e.target.value, text, paragraph, imageUrl, textColor, fontFamily, fontSize, fontWeight, textAlign });
            }}
          />
        </label>
        <label>
          Text Color:
          <input
            type="color"
            value={textColor}
            onChange={(e) => {
              setTextColor(e.target.value);
              onUpdateBanner({ backgroundColor, text, paragraph, imageUrl, textColor: e.target.value, fontFamily, fontSize, fontWeight, textAlign });
            }}
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
      </fieldset>

      {/* Theme Settings */}
      <fieldset>
        <legend>Theme Settings</legend>
        <label>
          Select a Theme:
          <select onChange={(e) => applyTheme(e.target.value)}>
            <option value="">Select a theme</option>
            <option value="nature">Nature</option>
            <option value="tech">Tech</option>
            <option value="minimalist">Minimalist</option>
            <option value="dark">Dark Theme</option>
            <option value="light">Light Theme</option>
          </select>
        </label>
      </fieldset>
    </form>
  );
};

export default Form;