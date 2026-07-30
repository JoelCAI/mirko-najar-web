// src/layouts/ComponentRegistry.js
import NavbarSearchable from '../components/navbar/NavbarSearchable';
import FooterStandard from '../components/footer/FooterStandard';

// 🌟 Importamos las diferentes variantes de Hero
import HeroSlider from '../components/hero/heroslider/HeroSlider';
// Estos los crearás más adelante, pero ya dejamos el espacio en la matriz
import HeroWaves from '../components/hero/HeroWaves'; 
import HeroGradient from '../components/hero/HeroGradient';

// Diccionario de Navbars disponibles
export const NAVBAR_REGISTRY = {
  navbar_searchable: NavbarSearchable,
};

// Diccionario de Footers disponibles 
export const FOOTER_REGISTRY = {
  footer_standard: FooterStandard,
};

// 🌟 Diccionario Dinámico de Heros (Piezas Lego)
export const HERO_REGISTRY = {
  hero_slider: HeroSlider,     // Tu carrusel actual de imágenes masivas
  hero_waves: HeroWaves,       // Tu futuro Hero con formas orgánicas y ondas SVG
  hero_gradient: HeroGradient, // Tu futuro Hero minimalista con degradados puros
};