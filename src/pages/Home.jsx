// src/pages/Home.jsx
import { HERO_REGISTRY } from '../layouts/ComponentRegistry';
import { mockCmsConfig } from '../config/cmsLayoutConfig';
import { heroSliders } from '../config/heroSliderConfig'; // Tus datos del slider
import { useTheme } from '../hooks/useTheme';
import styles from './Home.module.css';

const Home = () => {
  const { theme } = useTheme();

  // 1. Buscamos dinámicamente qué Hero quiere el cliente, con un fallback seguro
  const SelectedHero = HERO_REGISTRY[mockCmsConfig.activeHeroType] || HERO_REGISTRY.hero_slider;

  // 2. Filtrado reactivo en tiempo de ejecución (aplica si es tipo slider)
  const activeSlides = heroSliders.filter(
    (slide) => slide.themeVisibility === theme || slide.themeVisibility === 'both'
  );

  // 3. Estructuramos los datos que le enviaremos al Hero según el tipo elegido
  // Si es un slider necesita el array completo; si es un hero estático podría necesitar solo el primer elemento o un objeto limpio.
  const heroProps = mockCmsConfig.activeHeroType === 'hero_slider' 
    ? { slides: activeSlides, currentTheme: theme }
    : { data: heroSliders[0], currentTheme: theme }; // Ajuste adaptativo para heros estáticos

  return (
    <div className={styles.homeWrapper}>
      {/* 🌟 RENDERIZADO POLIMÓRFICO: Cambia de comportamiento mágicamente en base al CMS */}
      <SelectedHero {...heroProps} />
      
      {/* Siguientes secciones (Features, Galería, etc.) */}
    </div>
  );
};

export default Home;