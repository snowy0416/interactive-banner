import React, { useState, useEffect, useRef } from 'react';
import Banner from './components/Banner';
import Form from './components/Form';
import Confetti from 'react-confetti';
import html2canvas from 'html2canvas';
import ColorThief from 'colorthief';
import Swal from 'sweetalert2';
import './App.css';

const App = () => {
  const savedSettings = JSON.parse(localStorage.getItem('bannerSettings')) || {
    backgroundColor: '#000000',
    gradient: null,
    useGradient: false,
    text: 'Welcome to My Banner',
    paragraph: 'heyyyyy.',
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
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
  const bannerRef = useRef(null);

  // Save settings to local storage
  useEffect(() => {
    localStorage.setItem('bannerSettings', JSON.stringify(bannerProps));
  }, [bannerProps]);

  // Save theme preference
  useEffect(() => {
    localStorage.setItem('theme', theme);
    applyThemeStyles(theme);
  }, [theme]);

  // Apply theme styles
  const applyThemeStyles = (theme) => {
    if (theme === 'dark') {
      document.body.style.backgroundColor = '#1a1a1a';
      document.body.style.color = '#ffffff';
    } else {
      document.body.style.backgroundColor = '#ffffff';
      document.body.style.color = '#000000';
    }
  };

  // Extract colors from the background image
  const extractColorsAndGenerateGradient = (imageUrl) => {
    const img = new Image();
    img.crossOrigin = 'Anonymous';
    img.src = imageUrl;

    img.onload = () => {
      const colorThief = new ColorThief();
      const colors = colorThief.getPalette(img, 2);
      const gradient = {
        angle: 90,
        colors: colors.map((color) => `rgba(${color.join(', ')}, 0.5)`),
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
        gradient: null,
      }));
    };
    reader.readAsDataURL(file);
  };

  // Toggle between gradient and solid color
  const toggleBackgroundType = (useGradient) => {
    setBannerProps((prevProps) => ({
      ...prevProps,
      useGradient,
      gradient: useGradient && prevProps.imageUrl ? prevProps.gradient : null,
    }));

    if (useGradient && bannerProps.imageUrl) {
      extractColorsAndGenerateGradient(bannerProps.imageUrl);
    }
  };

  // Download the banner
  const downloadBanner = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to download the banner?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#007bff',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, download it!',
      cancelButtonText: 'No, cancel!',
    }).then((result) => {
      if (result.isConfirmed) {
        if (bannerRef.current) {
          html2canvas(bannerRef.current, {
            useCORS: true,
            imageTimeout: 15000,
            logging: true,
          }).then((canvas) => {
            const link = document.createElement('a');
            link.download = 'banner.png';
            link.href = canvas.toDataURL();
            link.click();
          });
        }
      }
    });
  };

  // Toggle between dark and light themes
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <div className={`App ${theme}`}>
      {showConfetti && <Confetti />}
      <div className="header">
        <h1>Banner Creator</h1>
        <div className="theme-toggle">
          <input
            type="checkbox"
            id="theme-switch"
            checked={theme === 'dark'}
            onChange={toggleTheme}
          />
          <label htmlFor="theme-switch" className="theme-switch-label">
            <span className="sun">☀️</span>
            <span className="moon">🌙</span>
          </label>
        </div>
      </div>
      <div ref={bannerRef}>
        <Banner {...bannerProps} />
      </div>
      <Form
        onUpdateBanner={(newProps) => {
          setBannerProps((prevProps) => ({
            ...prevProps,
            ...newProps,
          }));
          setShowConfetti(true);
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
            <button className="close-button" onClick={() => setShowPreview(false)}>
              &times;
            </button>
            <h2>Banner Preview</h2>
            <Banner {...bannerProps} />
            <div className="preview-actions">
              <button onClick={downloadBanner}>Download Banner</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;