import React, { useState, useEffect, useRef } from 'react';
import Banner from './components/Banner';
import Form from './components/Form';
import Confetti from 'react-confetti';
import html2canvas from 'html2canvas';
import ColorThief from 'colorthief';
import Swal from 'sweetalert2';
import { designTokens } from './design-tokens';
import './App.css';

const ThemeProvider = ({ children, theme }) => {
  return (
    <div 
      style={{
        '--primary': designTokens.colors.primary,
        '--primary-dark': designTokens.colors.primaryDark,
        '--text-light': designTokens.colors.textLight,
        '--text-dark': designTokens.colors.textDark,
        '--bg-light': designTokens.colors.bgLight,
        '--bg-dark': designTokens.colors.bgDark,
        '--error': designTokens.colors.error,
        '--success': designTokens.colors.success,
        '--font-primary': designTokens.fonts.primary,
        '--font-size-large': designTokens.fonts.sizes.xlarge
      }}
    >
      {children}
    </div>
  );
};

const App = () => {
  const [bannerProps, setBannerProps] = useState({
    backgroundColor: '#000000',
    gradient: null,
    useGradient: false,
    text: 'Welcome to My Banner',
    paragraph: 'Discover the wonders of the cosmos and beyond.',
    imageUrl: 'https://images.unsplash.com/photo-1465101162946-4377e57745c3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    textColor: '#ffffff',
    fontFamily: 'Poppins',
    fontSize: '3rem',
    fontWeight: 'bold',
    textAlign: 'center',
  });

  const [showConfetti, setShowConfetti] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [theme, setTheme] = useState('light');
  const bannerRef = useRef(null);
  const confettiRef = useRef(null);

  useEffect(() => {
    if (theme === 'dark') {
      document.body.style.backgroundColor = 'var(--bg-dark)';
      document.body.style.color = 'var(--text-light)';
    } else {
      document.body.style.backgroundColor = 'var(--bg-light)';
      document.body.style.color = 'var(--text-dark)';
    }
  }, [theme]);

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
      Swal.fire('Error', 'Failed to load the background image. Please check the image URL.', 'error');
    };
  };

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

  const downloadBanner = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to download the banner?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: 'var(--primary)',
      cancelButtonColor: 'var(--error)',
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
            
            setShowConfetti(true);
            setTimeout(() => setShowConfetti(false), 5000);
          }).catch(error => {
            console.error('Error generating banner:', error);
            Swal.fire('Error', 'Failed to generate the banner. Please try again.', 'error');
          });
        }
      }
    });
  };

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeProvider theme={theme}>
      <div className={`App ${theme}`}>
        {showConfetti && (
          <div className="confetti-container">
            <Confetti 
              width={window.innerWidth}
              height={window.innerHeight}
              recycle={false}
              numberOfPieces={500}
              onConfettiComplete={() => setShowConfetti(false)}
            />
          </div>
        )}
        
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
          }}
          onImageUpload={handleImageUpload}
          toggleBackgroundType={toggleBackgroundType}
          useGradient={bannerProps.useGradient}
        />
        
        <div className="actions">
          <button onClick={() => setShowPreview(true)}>Preview Banner</button>
        </div>

        {showPreview && (
          <div className="preview-modal">
            <div className="preview-content">
              <button 
                className="close-button" 
                onClick={() => setShowPreview(false)}
                aria-label="Close preview"
              >
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
    </ThemeProvider>
  );
};

export default App;