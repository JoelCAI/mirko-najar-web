// src/layouts/MainLayout.jsx
import { Outlet } from 'react-router-dom';
import { NAVBAR_REGISTRY, FOOTER_REGISTRY } from './ComponentRegistry';
import { themeConfig } from '../config/themeConfig'; // Apunta a su nuevo archivo independiente
import styles from './MainLayout.module.css';

// Esto simula tu base de datos centralizada o el estado del CMS en el futuro.
// Centraliza tanto las piezas físicas elegidas como su comportamiento estructural.
const mockCmsConfig = {
  activeNavbar: 'navbar_searchable', 
  activeFooter: 'footer_standard',
  // Heredamos la transparencia directamente del archivo de configuración estructural
  isNavbarTransparent: themeConfig.isTransparent 
};

const MainLayout = () => {
  // Buscamos componentes en el catálogo con sus respectivos fallbacks de seguridad de tipo espejo
  const SelectedNavbar = NAVBAR_REGISTRY[mockCmsConfig.activeNavbar] || NAVBAR_REGISTRY.navbar_searchable;
  const SelectedFooter = FOOTER_REGISTRY[mockCmsConfig.activeFooter] || FOOTER_REGISTRY.footer_standard;

  // 🛡️ MOTOR DE DESPLAZAMIENTO DINÁMICO (CHASIS LÍQUIDO)
  // Si isNavbarTransparent es true, el contenido (como tu HeroSlider con imágenes masivas)
  // sube hasta el píxel 0 de la pantalla para quedar por debajo del Navbar fixed de forma limpia.
  // Si es false, empujamos el contenedor principal 70px abajo para que nada quede tapado.
  const dynamicMainStyle = {
    paddingTop: mockCmsConfig.isNavbarTransparent ? '0px' : '70px'
  };

  return (
    <div className={styles.layoutContainer}>
      {/* Renderizado polimórfico del Navbar elegido por el cliente */}
      <SelectedNavbar />

      {/* Contenido dinámico e inyectable de las páginas (Home, Nosotros, Catálogo, etc.) */}
      <main className={styles.mainContent} style={dynamicMainStyle}>
        <Outlet />
      </main>

      {/* Renderizado polimórfico del Footer elegido por el cliente */}
      <SelectedFooter />
    </div>
  );
};

export default MainLayout;