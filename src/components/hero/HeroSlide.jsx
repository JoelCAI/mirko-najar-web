// src/components/hero/HeroSlide.jsx
import { Button } from '../ui/Button';
import styles from './HeroSlider.module.css';
import { themeConfig } from '../../config/themeConfig'; // <-- Importamos tu config global del navbar

export const HeroSlide = ({ slide, index }) => {
  const positionClass = styles[`pos-${slide.textPosition}`] || styles['pos-center-center'];
  const positionMobileClass = styles[`mob-${slide.textPositionMobile}`] || styles['mob-center-center'];

  const titleClass = slide.titleVariant === 'dark' ? styles.titleDark : styles.titleLight;
  const subtitleClass = slide.subtitleVariant === 'dark' ? styles.subtitleDark : styles.subtitleLight;

  // 🌟 CONTROL SEMÁNTICO UNIFICADO: Procesamos la clase global de iluminación
  let textProtectionClass = '';
  if (slide.useSmartGlow) {
    textProtectionClass = slide.smartGlowVariant === 'light'
      ? 'textSmartGlowLight'
      : 'textSmartGlowDark';
  }

  const opacityValue = slide.smartGlowOpacity !== undefined ? slide.smartGlowOpacity : 0.6;

  // 🛡️ CONTROL DINÁMICO DE DESFASE SUPERIOR (CONVIVENCIA CON NAVBAR TRANSPARENTE)
  // Si el Navbar es transparente, empujamos 70px abajo en desktop para proteger de colisiones.
  const desktopNavbarPadding = themeConfig.isTransparent ? '70px' : '30px';

  return (
    <div className={styles.slide}>
      {/* Contenedor estructural de imágenes */}
      <div className="aspect-box aspect-hero-desktop aspect-mobile-portrait">
        <picture>
          <source media="(max-width: 600px)" srcSet={slide.imageMobile} />
          <img 
            src={slide.imageDesktop} 
            alt={slide.title} 
            loading={index === 0 ? "eager" : "lazy"} // Corregido índice base cero para carga prioritaria
            draggable="false"
          />
        </picture>
      </div>

      {/* Capa de contenido con la Matriz de Layout */}
      <div className={`${styles.contentArea} ${positionClass} ${positionMobileClass} siteLayoutWrapper`}>
        <div 
          className={styles.textCard} 
          style={{ 
            '--mobile-y-offset': slide.mobileYOffset,
            '--navbar-offset-top': desktopNavbarPadding // 👈 Inyectamos la variable viva al hardware de CSS
          }}
        >
          
          {/* El grupo de texto absorbe la opacidad por variables */}
          <div 
            className={styles.textGroup}
            style={slide.useSmartGlow ? { '--scrim-custom-opacity': opacityValue } : null}
          >
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