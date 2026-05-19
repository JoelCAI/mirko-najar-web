// src/pages/Home.jsx
import HeroSlider from '../components/hero/HeroSlider';
import { darkThemeSliders, lightThemeSliders } from '../config/heroSliderConfig';
import { useTheme } from '../hooks/useTheme';// Importamos el hook global
import styles from './Home.module.css';

const Home = () => {
  // Escuchamos directamente el tema activo global
  const { theme } = useTheme();

  // Selección directa y limpia sin efectos secundarios
  const activeSlides = theme === 'light' ? lightThemeSliders : darkThemeSliders;

  return (
    <div className={styles.homeWrapper}>
      {/* Le pasamos el set de sliders exacto y el identificador de tema actual */}
      <HeroSlider slides={activeSlides} currentTheme={theme} />
      
      {/* Siguientes secciones */}
    </div>
  );
};

export default Home;