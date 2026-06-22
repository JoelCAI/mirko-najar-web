// src/components/hero/HeroSlider.jsx
import { useSlider } from '../../hooks/useSlider';
import { HeroSlide } from './HeroSlide';
import { SliderControls } from '../ui/SliderControls';
import styles from './HeroSlider.module.css';
import { themeConfig } from '../../config/navigationConfig';



export const HeroSlider = ({ slides = [], currentTheme }) => {
  
  const {
    currentIndex,
    isTransitioning,
    activeDot,
    extendedSlides,
    handleNext,
    handlePrev,
    handleDotClick,
    handleTransitionEnd,
    touchHandlers
  } = useSlider(slides);

  if (slides.length === 0) return null;

  const showNavbarOverlay = themeConfig.isTransparent;
  const navbarOverlayClass = currentTheme === 'light' 
    ? styles.navbarOverlayLight 
    : styles.navbarOverlayDark;

  return (
    <section className={styles.sliderContainer} aria-label="Destacados del sitio">
      {showNavbarOverlay && (
        <div className={`${styles.navbarProtectionOverlay} ${navbarOverlayClass}`} />
      )}

      {/* Riel con clase condicional si tiene controles encendidos */}
      <div 
        className={`${styles.sliderTrack} ${slides.length > 1 ? styles.sliderWithControls : ''}`} 
        style={{ 
          transform: `translateX(-${currentIndex * 100}%)`,
          transition: isTransitioning ? 'transform 0.6s cubic-bezier(0.25, 1, 0.5, 1)' : 'none'
        }}
        onTransitionEnd={handleTransitionEnd}
        {...touchHandlers}
      >
        {extendedSlides.map((slide, index) => (
          <HeroSlide key={`${slide.id}-ext-${index}`} slide={slide} index={index} />
        ))}
      </div>

      {/* Componente de controles desacoplado */}
      <SliderControls 
        show={slides.length > 1}
        slides={slides}
        activeDot={activeDot}
        onDotClick={handleDotClick}
        onPrev={handlePrev}
        onNext={handleNext}
      />
    </section>
  );
};

export default HeroSlider;