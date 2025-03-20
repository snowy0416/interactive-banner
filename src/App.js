import React, { useState, useEffect, useRef } from 'react';
import Banner from './components/Banner';
import Form from './components/Form';
import Confetti from 'react-confetti';
import html2canvas from 'html2canvas';
import './App.css';

const App = () => {
  const savedSettings = JSON.parse(localStorage.getItem('bannerSettings')) || {
    backgroundColor: '#000000',
    text: 'Welcome to My Banner',
    paragraph: 'Discover the wonders of the cosmos and beyond.',
    imageUrl: 'https://images.unsplash.com/photo-1465101162946-4377e57745c3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    textColor: '#ffffff',
    fontFamily: 'Poppins',
    fontSize: '3rem',
    fontWeight: 'bold',
    textAlign: 'center',
  };

  const [bannerProps, setBannerProps] = useState(savedSettings);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const bannerRef = useRef(null);

  // Save settings to local storage whenever they change
  useEffect(() => {
    localStorage.setItem('bannerSettings', JSON.stringify(bannerProps));
  }, [bannerProps]);

  // Show confetti for 3 seconds when banner is updated
  useEffect(() => {
    if (showConfetti) {
      const timer = setTimeout(() => {
        setShowConfetti(false);
      }, 3000); // Confetti lasts for 3 seconds
      return () => clearTimeout(timer);
    }
  }, [showConfetti]);

  // Download the banner as an image
  const downloadBanner = () => {
    if (bannerRef.current) {
      // Ensure the image is fully loaded before rendering
      const image = new Image();
      image.src = bannerProps.imageUrl;
      image.crossOrigin = 'anonymous'; // Handle cross-origin images
      image.onload = () => {
        html2canvas(bannerRef.current, {
          useCORS: true, // Enable cross-origin resource sharing
          imageTimeout: 15000, // Wait up to 15 seconds for images to load
          logging: true, // Enable logging for debugging
        }).then((canvas) => {
          const link = document.createElement('a');
          link.download = 'banner.png';
          link.href = canvas.toDataURL();
          link.click();
        });
      };
      image.onerror = (error) => {
        console.error('Error loading image:', error);
        alert('Failed to load the background image. Please check the image URL.');
      };
    }
  };

  return (
    <div className="App">
      {showConfetti && <Confetti />}
      <div ref={bannerRef}>
        <Banner {...bannerProps} />
      </div>
      <Form
        onUpdateBanner={(newProps) => {
          setBannerProps(newProps);
          setShowConfetti(true); // Trigger confetti
        }}
      />
      <div className="actions">
        <button onClick={() => setShowPreview(true)}>Preview Banner</button>
      </div>

      {/* Preview Modal */}
      {showPreview && (
        <div className="preview-modal">
          <div className="preview-content">
            <h2>Banner Preview</h2>
            <Banner {...bannerProps} />
            <div className="preview-actions">
              <button onClick={downloadBanner}>Download Banner</button>
              <button onClick={() => setShowPreview(false)}>Reupdate Banner</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;