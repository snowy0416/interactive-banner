import React, { useState } from 'react';
import Banner from './components/Banner';
import Form from './components/Form';
import './App.css';

const App = () => {
  const [bannerProps, setBannerProps] = useState({
    backgroundColor: '#000000', // Dark background for space/nature theme
    text: 'Explore the Universe', // Initial banner text
    paragraph: 'Discover the wonders of the cosmos and beyond.', // Initial paragraph
    imageUrl: 'https://images.unsplash.com/photo-1465101162946-4377e57745c3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80', // Space image
    textColor: '#ffffff', // White text
  });

  return (
    <div className="App">
      <Banner {...bannerProps} />
      <Form onUpdateBanner={setBannerProps} />
    </div>
  );
};

export default App;