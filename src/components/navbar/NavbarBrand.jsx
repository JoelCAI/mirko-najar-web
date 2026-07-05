// src/components/navbar/NavbarBrand.jsx
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { brandConfig } from '../../config/navigationConfig';
import Text from '../ui/Text';
import styles from './NavbarBrand.module.css';

const NavbarBrand = () => {
  const { type, text, imageLight, imageDark } = brandConfig;
  
  // Estre estado detectará dinámicamente si estamos en "dark" o "light"
  const [currentTheme, setCurrentTheme] = useState('light');

  useEffect(() => {
    // 1. Función para chequear el tema activo en el elemento raíz (html o body)
    const checkTheme = () => {
      // Revisa si tu sistema usa la clase .dark o el atributo data-theme
      const isDarkClass = document.documentElement.classList.contains('dark') || document.body.classList.contains('dark');
      const isDarkAttr = document.documentElement.getAttribute('data-theme') === 'dark';
      
      setCurrentTheme((isDarkClass || isDarkAttr) ? 'dark' : 'light');
    };

    // 2. Ejecución inicial al montar el componente
    checkTheme();

    // 3. Observer para reaccionar al instante cuando el botón cambia el DOM
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class', 'data-theme'] });
    observer.observe(document.body, { attributes: true, attributeFilter: ['class', 'data-theme'] });

    return () => observer.disconnect();
  }, []);

  // ⚡ SELECCIÓN DINÁMICA DE SET DE IMÁGENES SEGÚN EL MODO ACTIVE
  const activeImageSet = currentTheme === 'dark' ? imageDark : imageLight;

  // 🛡️ LÓGICA DE FALLBACKS (Si falta el modo dark, cae limpiamente en el light)
  const baseImageConfig = activeImageSet || imageLight;
  const desktopImage = baseImageConfig?.desktopSrc || '';
  const tabletImage = baseImageConfig?.tabletSrc || desktopImage;
  const mobileImage = baseImageConfig?.mobileSrc || tabletImage || desktopImage;

  // 🔤 LÓGICA DE FALLBACKS DE TEXTO (Inmune al cambio ya que usa variables CSS)
  const desktopText = text?.desktopTitle || '';
  const tabletText = text?.tabletTitle || desktopText;
  const mobileText = text?.mobileTitle || tabletText || desktopText;

  return (
    <Link to="/" className={styles.brand} aria-label="Ir al inicio">
      
      {/* CASO IMAGEN */}
      {type === 'image' && desktopImage && (
        <picture className={styles.pictureWrapper}>
          {/* Escritorio */}
          <source media="(min-width: 769px)" srcSet={desktopImage} />
          
          {/* Tablet */}
          <source media="(max-width: 768px) and (min-width: 401px)" srcSet={tabletImage} />
          
          {/* Móvil base */}
          <img 
            src={mobileImage} 
            alt={baseImageConfig.alt || "Logotipo"} 
            className={styles.responsiveImg} 
          />
        </picture>
      )}

      {/* CASO TEXTO */}
      {type === 'text' && desktopText && (
        <div 
          className={styles.textContainer}
          style={{
            '--client-desktop-size': text?.desktopSize || 'var(--text-2xl)',
            '--client-tablet-size': text?.tabletSize || 'var(--text-xl)',
            '--client-mobile-size': text?.mobileSize || 'var(--text-base)'
          }}
        >
          <Text as="span" className={styles.autoScalingText} customTypographyStyles={text.typography}>
            <span className={styles.textDesktop}>{desktopText}</span>
            <span className={styles.textTablet}>{tabletText}</span>
            <span className={styles.textMobile}>{mobileText}</span>
          </Text>
        </div>
      )}

    </Link>
  );
};

export default NavbarBrand;