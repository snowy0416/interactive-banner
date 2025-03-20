import React, { useState, useEffect, useRef } from 'react';
import Banner from './components/Banner';
import Form from './components/Form';
import Confetti from 'react-confetti';
import html2canvas from 'html2canvas';
import ColorThief from 'colorthief';
import './App.css';

const App = () => {
  const savedSettings = JSON.parse(localStorage.getItem('bannerSettings')) || {
    backgroundColor: '#000000', // Fallback for solid color
    gradient: null, // Gradient settings
    useGradient: false, // Toggle between gradient and solid color
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

  // Extract colors from the background image and generate a gradient
  const extractColorsAndGenerateGradient = (imageUrl) => {
    const img = new Image();
    img.crossOrigin = 'Anonymous'; // Allow cross-origin images
    img.src = imageUrl;

    img.onload = () => {
      const colorThief = new ColorThief();
      const colors = colorThief.getPalette(img, 2); // Extract 2 dominant colors
      const gradient = {
        angle: 90, // Default angle
        colors: colors.map((color) => `rgba(${color.join(', ')}, 0.5)`), // Convert to RGBA with 50% opacity
      };
      setBannerProps((prevProps) => ({
        ...prevProps,
        gradient,
      }));
    };

    img.onerror = (error) => {
      console.error('Error loading image:', error);
      alert('Failed to load the background image. Please check the image URL.');
    };
  };

  // Handle image upload
  const handleImageUpload = (file) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const imageUrl = event.target.result;
      setBannerProps((prevProps) => ({
        ...prevProps,
        imageUrl,
        gradient: null, // Clear gradient when a new image is uploaded
      }));
    };
    reader.readAsDataURL(file);
  };

  // Toggle between gradient and solid color
  const toggleBackgroundType = (useGradient) => {
    setBannerProps((prevProps) => ({
      ...prevProps,
      useGradient,
      gradient: useGradient && prevProps.imageUrl ? prevProps.gradient : null, // Only keep gradient if useGradient is true and an image is uploaded
    }));

    // Extract gradient if useGradient is true and an image is uploaded
    if (useGradient && bannerProps.imageUrl) {
      extractColorsAndGenerateGradient(bannerProps.imageUrl);
    }
  };

  // Download the banner as an image
  const downloadBanner = () => {
    if (bannerRef.current) {
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
        onImageUpload={handleImageUpload}
        toggleBackgroundType={toggleBackgroundType}
        useGradient={bannerProps.useGradient}
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