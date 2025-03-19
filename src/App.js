import React, { useState } from 'react';
import Banner from './components/Banner';
import Form from './components/Form';
import './App.css';

const App = () => {
  const [bannerProps, setBannerProps] = useState({
    backgroundColor: '#ffffff',
    text: 'Welcome to My Banner',
    imageUrl: '',
    textColor: '#000000',
  });

  return (
    <div className="App">
      <Banner {...bannerProps} />
      <Form onUpdateBanner={setBannerProps} />
    </div>
  );
};

export default App;