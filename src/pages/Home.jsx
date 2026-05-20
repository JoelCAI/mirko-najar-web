// src/pages/Home.jsx
import HeroSlider from '../components/hero/HeroSlider';
// Importamos la nueva lista unificada
import { heroSliders } from '../config/heroSliderConfig';
import { useTheme } from '../hooks/useTheme';
import styles from './Home.module.css';

const Home = () => {
  // Escuchamos directamente el tema activo global ('light' o 'dark')
  const { theme } = useTheme();

  // Filtrado reactivo en tiempo de ejecución:
  // Deja pasar el slide si coincide con el tema activo O si está marcado como 'both'
  const activeSlides = heroSliders.filter(
    (slide) => slide.themeVisibility === theme || slide.themeVisibility === 'both'
  );

  return (
    <div className={styles.homeWrapper}>
      {/* Le pasamos el set de sliders ya filtrado y el tema actual */}
      <HeroSlider slides={activeSlides} currentTheme={theme} />
      
      {/* Siguientes secciones */}
    </div>
  );
};

export default Home;