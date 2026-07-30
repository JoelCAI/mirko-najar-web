// src/pages/Home.jsx
import { useSelector } from 'react-redux'; // 👈 Escuchamos a Redux
import { HERO_REGISTRY } from '../layouts/ComponentRegistry';
import { heroSliders } from '../config/heroSliderConfig'; 
import { useTheme } from '../hooks/useTheme';
import styles from './Home.module.css';

const Home = () => {
  const { theme } = useTheme();

  // 🎯 Extraemos el estado del hero desde nuestro configSlice
  const heroState = useSelector((state) => state.config.hero);

  // 1. Buscamos dinámicamente qué Hero quiere el cliente en base a los datos reales
  const SelectedHero = HERO_REGISTRY[heroState?.activeType] || HERO_REGISTRY.hero_slider;

  // 2. Filtrado reactivo en tiempo de ejecución
  const activeSlides = heroSliders.filter(
    (slide) => slide.themeVisibility === theme || slide.themeVisibility === 'both'
  );

  // 3. Estructuramos las props adaptativas según la pieza Lego elegida
  const heroProps = heroState?.activeType === 'hero_slider' 
    ? { slides: activeSlides, currentTheme: theme }
    : { data: heroSliders[0], currentTheme: theme }; 

  return (
    <div className={styles.homeWrapper}>
      {/* 🌟 RENDERIZADO POLIMÓRFICO CON INTERRUPTOR */}
      {heroState?.active && <SelectedHero {...heroProps} />}
      
      {/* Siguientes secciones (Features, Galería, etc.) */}
    </div>
  );
};

export default Home;