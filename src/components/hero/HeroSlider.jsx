// src/components/hero/HeroSlider.jsx
import { useState, useEffect, useRef, useCallback } from 'react';
import Button from '../ui/Button';
import styles from './HeroSlider.module.css';
import { themeConfig } from '../../config/navigationConfig';

const HeroSlider = ({ slides = [], currentTheme }) => {
  const totalSlidesOriginal = slides.length;
  
  const [currentIndex, setCurrentIndex] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const [prevSlides, setPrevSlides] = useState(slides);
  
  const timeoutRef = useRef(null);
  const isMovingRef = useRef(false);
  
  const touchStartX = useRef(0);
  const touchCurrentX = useRef(0);
  const isDragging = useRef(false);

  if (slides !== prevSlides) {
    setPrevSlides(slides);
    setCurrentIndex(1);
    setIsTransitioning(false);
  }

  useEffect(() => {
    isMovingRef.current = false;
  }, [slides]);

  const resetTimeout = () => {
    if (timeoutRef.current) clearInterval(timeoutRef.current);
  };

  const handleNext = useCallback(() => {
    if (totalSlidesOriginal <= 1 || isMovingRef.current) return;
    isMovingRef.current = true;
    setIsTransitioning(true);
    setCurrentIndex((prev) => prev + 1);
  }, [totalSlidesOriginal]);

  const handlePrev = () => {
    if (totalSlidesOriginal <= 1 || isMovingRef.current) return;
    isMovingRef.current = true;
    setIsTransitioning(true);
    setCurrentIndex((prev) => prev - 1);
  };

  const handleDotClick = (index) => {
    if (isMovingRef.current || currentIndex === index + 1) return;
    isMovingRef.current = true;
    setIsTransitioning(true);
    setCurrentIndex(index + 1);
  };

  const handleTransitionEnd = () => {
    isMovingRef.current = false; 

    if (currentIndex === 0) {
      setIsTransitioning(false);
      setCurrentIndex(totalSlidesOriginal);
    } else if (currentIndex === totalSlidesOriginal + 1) {
      setIsTransitioning(false);
      setCurrentIndex(1);
    }
  };

  useEffect(() => {
    if (!isTransitioning) {
      const id = setTimeout(() => {
        setIsTransitioning(true);
      }, 30);
      return () => clearTimeout(id);
    }
  }, [isTransitioning]);

  useEffect(() => {
    if (totalSlidesOriginal <= 1) return;

    resetTimeout();
    
    let realIndex = currentIndex - 1;
    if (currentIndex === 0) realIndex = totalSlidesOriginal - 1;
    if (currentIndex === totalSlidesOriginal + 1) realIndex = 0;

    const currentDuration = slides[realIndex]?.duration || 3000;

    timeoutRef.current = setInterval(() => {
      handleNext();
    }, currentDuration);

    return () => resetTimeout();
  }, [currentIndex, totalSlidesOriginal, slides, handleNext]);

  const handleTouchStart = (e) => {
    if (totalSlidesOriginal <= 1 || isMovingRef.current) return;
    resetTimeout();
    touchStartX.current = e.touches[0].clientX;
    touchCurrentX.current = e.touches[0].clientX;
    isDragging.current = true;
  };

  const handleTouchMove = (e) => {
    if (!isDragging.current) return;
    touchCurrentX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!isDragging.current) return;
    isDragging.current = false;

    const diferenciaX = touchStartX.current - touchCurrentX.current;
    const umbralDesplazamiento = 50;

    if (diferenciaX > umbralDesplazamiento) {
      handleNext();
    } else if (diferenciaX < -umbralDesplazamiento) {
      handlePrev();
    }
  };

  if (totalSlidesOriginal === 0) return null;

  const extendedSlides = [
    slides[totalSlidesOriginal - 1],
    ...slides,
    slides[0]
  ];

  let activeDot = currentIndex - 1;
  if (currentIndex === 0) activeDot = totalSlidesOriginal - 1;
  if (currentIndex === totalSlidesOriginal + 1) activeDot = 0;

  const showNavbarOverlay = themeConfig.isTransparent;
  const navbarOverlayClass = currentTheme === 'light' 
    ? styles.navbarOverlayLight 
    : styles.navbarOverlayDark;

  return (
    <section className={styles.sliderContainer} aria-label="Destacados del sitio">
      
      {showNavbarOverlay && (
        <div className={`${styles.navbarProtectionOverlay} ${navbarOverlayClass}`} />
      )}

      <div 
        className={styles.sliderTrack} 
        style={{ 
          transform: `translateX(-${currentIndex * 100}%)`,
          transition: isTransitioning ? 'transform 0.6s cubic-bezier(0.25, 1, 0.5, 1)' : 'none'
        }}
        onTransitionEnd={handleTransitionEnd}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {extendedSlides.map((slide, index) => {
          // Clase de posicionamiento de escritorio
          const positionClass = styles[`pos-${slide.textPosition}`] || styles['pos-center-center'];
          
          // NUEVA: Clase de posicionamiento exclusivo para móvil (por defecto será center-center si viene vacío)
          const positionMobileClass = styles[`mob-${slide.textPositionMobile}`] || styles['mob-center-center'];

          const titleClass = slide.titleVariant === 'dark' ? styles.titleDark : styles.titleLight;
          const subtitleClass = slide.subtitleVariant === 'dark' ? styles.subtitleDark : styles.subtitleLight;

          let textProtectionClass = '';
          if (slide.showDegradeBox) {
            textProtectionClass = slide.degradeBoxVariant === 'light'
              ? styles.textSmartGlowLight
              : styles.textSmartGlowDark;
          }

          const opacityValue = slide.degradeBoxOpacity !== undefined ? slide.degradeBoxOpacity : 0.5;

          return (
            <div key={`${slide.id}-ext-${index}`} className={styles.slide}>
              <picture>
                <source media="(max-width: 600px)" srcSet={slide.imageMobile} />
                <img 
                  src={slide.imageDesktop} 
                  alt={slide.title} 
                  className={styles.slideImage} 
                  loading={index === 1 ? "eager" : "lazy"}
                  draggable="false"
                />
              </picture>

              <div className={`${styles.contentArea} ${positionClass} ${positionMobileClass} siteLayoutWrapper`}>
                {/* 
                  Inyectamos la variable CSS directamente. Si slide.mobileYOffset existe, 
                  viajará al CSS; si está comentada o no existe, será undefined y el navegador la ignorará de forma segura.
                */}
                <div 
                  className={styles.textCard}
                  style={{
                    '--mobile-y-offset': slide.mobileYOffset
                  }}
                >
                  
                  <div 
                    className={styles.textGroup}
                    style={slide.showDegradeBox ? { '--scrim-custom-opacity': opacityValue } : null}
                  >
                    <h2 className={`${styles.title} ${titleClass} ${textProtectionClass}`}>
                      {slide.title}
                    </h2>
                    
                    <p className={`${styles.subtitle} ${subtitleClass} ${textProtectionClass}`}>
                      {slide.subtitle}
                    </p>
                  </div>

                  {slide.buttonText && (
                    <div className={styles.buttonWrapper}>
                      <Button 
                        to={slide.buttonLink} 
                        variant={slide.buttonVariant || 'primary'} 
                        size="lg"
                      >
                        {slide.buttonText}
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {totalSlidesOriginal > 1 && (
        <>
          <button className={`${styles.arrowBtn} ${styles.leftArrow}`} onClick={handlePrev} aria-label="Anterior slide">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
          </button>

          <button className={`${styles.arrowBtn} ${styles.rightArrow}`} onClick={handleNext} aria-label="Siguiente slide">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
          </button>

          <div className={styles.dotsContainer}>
            {slides.map((_, index) => (
              <button
                key={`dot-${index}`}
                className={`${styles.dot} ${activeDot === index ? styles.dotActive : ''}`}
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