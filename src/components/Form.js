import React, { useState } from 'react';
import '../styles/Form.css';

const Form = ({ onUpdateBanner }) => {
  const [backgroundColor, setBackgroundColor] = useState('#000000');
  const [text, setText] = useState('Explore the Universe');
  const [paragraph, setParagraph] = useState('Discover the wonders of the cosmos and beyond.');
  const [imageUrl, setImageUrl] = useState('https://images.unsplash.com/photo-1465101162946-4377e57745c3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80');
  const [textColor, setTextColor] = useState('#ffffff');

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImageUrl(event.target.result);
        onUpdateBanner({ backgroundColor, text, paragraph, imageUrl: event.target.result, textColor });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <form>
      <label>
        Background Color:
        <input
          type="color"
          value={backgroundColor}
          onChange={(e) => {
            setBackgroundColor(e.target.value);
            onUpdateBanner({ backgroundColor: e.target.value, text, paragraph, imageUrl, textColor });
          }}
        />
      </label>
      <label>
        Banner Text:
        <input
          type="text"
          value={text}
          onChange={(e) => {
            setText(e.target.value);
            onUpdateBanner({ backgroundColor, text: e.target.value, paragraph, imageUrl, textColor });
          }}
        />
      </label>
      <label>
        Paragraph:
        <textarea
          value={paragraph}
          onChange={(e) => {
            setParagraph(e.target.value);
            onUpdateBanner({ backgroundColor, text, paragraph: e.target.value, imageUrl, textColor });
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
            onUpdateBanner({ backgroundColor, text, paragraph, imageUrl, textColor: e.target.value });
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
    </form>
  );
};

export default Form;