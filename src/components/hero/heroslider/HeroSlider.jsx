// src/components/hero/heroslider/HeroSlider.jsx
import { useEffect } from 'react'; // ⚡ Agregamos useEffect para detectar visualización
import { useSlider } from '../../../hooks/useSlider';
import { SliderControls } from '../../ui/SliderControls';
import { Button } from '../../ui/Button';
import { themeConfig } from '../../../config/themeConfig';
import { trackHeroEvent } from './HeroSlider.analytics'; // 📊 IMPORTAMOS LA TELEMETRÍA LOCAL
import styles from './HeroSlider.module.css';

/* =========================================================================
    💡 SUB-COMPONENTE INTERNO: HeroSlide
   ========================================================================= */
const HeroSlide = ({ slide, index, isActive }) => {
  const positionClass = styles[`pos-${slide.textPosition}`] || styles['pos-center-center'];
  const positionMobileClass = styles[`mob-${slide.textPositionMobile}`] || styles['mob-center-center'];

  const titleClass = slide.titleVariant === 'dark' ? styles.titleDark : styles.titleLight;
  const subtitleClass = slide.subtitleVariant === 'dark' ? styles.subtitleDark : styles.subtitleLight;

  let textProtectionClass = '';
  if (slide.useSmartGlow) {
    textProtectionClass = slide.smartGlowVariant === 'light' ? 'textSmartGlowLight' : 'textSmartGlowDark';
  }

  const opacityValue = slide.smartGlowOpacity !== undefined ? slide.smartGlowOpacity : 0.6;
  const desktopNavbarPadding = themeConfig.isTransparent ? '70px' : '30px';

  // 📊 EFECTO: Si este slide se vuelve el activo en pantalla, gatilla el evento View
  useEffect(() => {
    if (isActive) {
      trackHeroEvent.slideView(slide.id, slide.title, index);
    }
  }, [isActive, slide.id, slide.title, index]);

  return (
    <div className={styles.slide}>
      <div className="aspect-box aspect-hero-desktop aspect-mobile-portrait">
        <picture>
          <source media="(max-width: 600px)" srcSet={slide.imageMobile} />
          <img src={slide.imageDesktop} alt={slide.title} loading={index === 0 ? "eager" : "lazy"} draggable="false" />
        </picture>
      </div>

      <div className={`${styles.contentArea} ${positionClass} ${positionMobileClass} siteLayoutWrapper`}>
        <div className={styles.textCard} style={{ '--mobile-y-offset': slide.mobileYOffset, '--navbar-offset-top': desktopNavbarPadding }}>
          <div className={styles.textGroup} style={slide.useSmartGlow ? { '--scrim-custom-opacity': opacityValue } : null}>
            <h2 className={`${styles.title} ${titleClass} ${textProtectionClass}`}>{slide.title}</h2>
            <p className={`${styles.subtitle} ${subtitleClass} ${textProtectionClass}`}>{slide.subtitle}</p>
          </div>

          {slide.buttonText && (
            <div className={styles.buttonWrapper}>
              <Button 
                to={slide.buttonLink} 
                variant={slide.buttonVariant || 'classic'} 
                size={slide.buttonSize || 'md'} 
                buttonUtils={slide.buttonUtils || ''}    
                buttonBorder={slide.buttonBorder || ''}
                // 📊 CLIC: Capturamos cuando el usuario presiona el botón antes de irse a la otra página
                onClick={() => trackHeroEvent.buttonClick(slide.id, slide.buttonText, slide.buttonLink)}
              >
                {slide.buttonText}
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

/* =========================================================================
    🌟 COMPONENTE PRINCIPAL EXPORTADO: HeroSlider
   ========================================================================= */
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
  const navbarOverlayClass = currentTheme === 'light' ? styles.navbarOverlayLight : styles.navbarOverlayDark;

  return (
    <section className={styles.sliderContainer} aria-label="Destacados del sitio">
      {showNavbarOverlay && <div className={`${styles.navbarProtectionOverlay} ${navbarOverlayClass}`} />}

      <div 
        className={`${styles.sliderTrack} ${slides.length > 1 ? styles.sliderWithControls : ''}`} 
        style={{ 
          transform: `translateX(-${currentIndex * 100}%)`,
          transition: isTransitioning ? 'transform 0.6s cubic-bezier(0.25, 1, 0.5, 1)' : 'none'
        }}
        onTransitionEnd={handleTransitionEnd}
        {...touchHandlers}
      >
        {extendedSlides.map((slide, index) => {
          // Calculamos matemáticamente si este slide es el que el usuario está viendo actualmente
          const isActive = index === currentIndex;
          return (
            <HeroSlide 
              key={`${slide.id}-ext-${index}`} 
              slide={slide} 
              index={index} 
              isActive={isActive} // ⚡ Pasamos el estado de activación
            />
          );
        })}
      </div>

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