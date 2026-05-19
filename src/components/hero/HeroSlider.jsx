// src/components/hero/HeroSlider.jsx
import { useState, useEffect, useRef } from 'react';
import Button from '../ui/Button';
import styles from './HeroSlider.module.css';
import { themeConfig } from '../../config/navigationConfig';

const HeroSlider = ({ slides = [], currentTheme }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const totalSlides = slides.length;
  const timeoutRef = useRef(null);

  // --- SOLUCIÓN AL ERROR: Sincronización de estado durante el renderizado ---
  const [prevSlides, setPrevSlides] = useState(slides);

  if (slides !== prevSlides) {
    setPrevSlides(slides);
    setCurrentIndex(0); // React entiende esto perfectamente si ocurre en el cuerpo del render
  }
  // --------------------------------------------------------------------------

  const resetTimeout = () => {
    if (timeoutRef.current) {
      clearInterval(timeoutRef.current);
    }
  };

  // Este efecto ahora solo se encarga puramente del temporizador automático (Asíncrono)
  useEffect(() => {
    if (totalSlides <= 1) return;

    resetTimeout();
    const currentDuration = slides[currentIndex]?.duration || 3000;

    timeoutRef.current = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % totalSlides);
    }, currentDuration);

    return () => resetTimeout();
  }, [currentIndex, totalSlides, slides]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? totalSlides - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % totalSlides);
  };

  const handleDotClick = (index) => {
    setCurrentIndex(index);
  };

  if (totalSlides === 0) return null;

  const showNavbarOverlay = themeConfig.isTransparent;

  const navbarOverlayClass = currentTheme === 'light' 
    ? styles.navbarOverlayLight 
    : styles.navbarOverlayDark;

  return (
    <section className={styles.sliderContainer} aria-label="Destacados del sitio">
      
      {/* Degradado Inteligente de protección superior */}
      {showNavbarOverlay && (
        <div className={`${styles.navbarProtectionOverlay} ${navbarOverlayClass}`} />
      )}

      {/* Riel móvil */}
      <div 
        className={styles.sliderTrack} 
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {slides.map((slide) => {
          const positionClass = styles[`pos-${slide.textPosition}`] || styles['pos-center-center'];
          const isTextCardLight = slide.navbarOverlay === 'light' ? styles.textCardLight : '';

          return (
            <div key={slide.id} className={styles.slide}>
              
              <picture>
                <source media="(max-width: 600px)" srcSet={slide.imageMobile} />
                <img 
                  src={slide.imageDesktop} 
                  alt={slide.title} 
                  className={styles.slideImage} 
                  loading="eager"
                />
              </picture>

              <div className={styles.overlay}></div>

              <div className={`${styles.contentArea} ${positionClass} siteLayoutWrapper`}>
                <div className={`${styles.textCard} ${isTextCardLight}`}>
                  <h2 className={styles.title}>{slide.title}</h2>
                  <p className={styles.subtitle}>{slide.subtitle}</p>
                  {slide.buttonText && (
                    <Button 
                      to={slide.buttonLink} 
                      variant={slide.buttonVariant || 'primary'} 
                      size="lg"
                    >
                      {slide.buttonText}
                    </Button>
                  )}
                </div>
              </div>

            </div>
          );
        })}
      </div>

      {/* Controles manuales estables */}
      {totalSlides > 1 && (
        <>
          <button 
            className={`${styles.arrowBtn} ${styles.leftArrow}`} 
            onClick={handlePrev}
            aria-label="Anterior slide"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
          </button>

          <button 
            className={`${styles.arrowBtn} ${styles.rightArrow}`} 
            onClick={handleNext}
            aria-label="Siguiente slide"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
          </button>

          <div className={styles.dotsContainer}>
            {slides.map((_, index) => (
              <button
                key={index}
                className={`${styles.dot} ${currentIndex === index ? styles.dotActive : ''}`}
                onClick={() => handleDotClick(index)}
                aria-label={`Ir al slide ${index + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </section>
  );
};

export default HeroSlider;