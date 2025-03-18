import React, { useState } from 'react';
import '../styles/Form.css';

const Form = ({ onUpdateBanner }) => {
  const [backgroundColor, setBackgroundColor] = useState('#ffffff');
  const [text, setText] = useState('Welcome to My Banner');
  const [imageUrl, setImageUrl] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdateBanner({ backgroundColor, text, imageUrl });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Background Color:
        <input type="color" value={backgroundColor} onChange={(e) => setBackgroundColor(e.target.value)} />
      </label>
      <label>
        Banner Text:
        <input type="text" value={text} onChange={(e) => setText(e.target.value)} />
      </label>
      <label>
        Image URL:
        <input type="text" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} />
      </label>
      <button type="submit">Update Banner</button>
    </form>
  );
};

export default Form;