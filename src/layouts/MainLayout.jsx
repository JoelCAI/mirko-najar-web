// src/layouts/MainLayout.jsx
import { Outlet } from 'react-router-dom';
import { NAVBAR_REGISTRY, FOOTER_REGISTRY } from './ComponentRegistry';
import { themeConfig } from '../config/navigationConfig'; // <-- ¡IMPORTA TU CONFIGURACIÓN AQUÍ!
import styles from './MainLayout.module.css';

// Esto simula la base de datos o el estado que controlará tu CMS más adelante
const mockCmsConfig = {
  activeNavbar: 'navbar_searchable', 
  activeFooter: 'footer_standard', // Control dinámico de la pieza del Footer
};

const MainLayout = () => {
  // Buscamos componentes en el catálogo con sus respectivos fallbacks de seguridad
  const SelectedNavbar = NAVBAR_REGISTRY[mockCmsConfig.activeNavbar] || NAVBAR_REGISTRY.navbar_searchable;
  const SelectedFooter = FOOTER_REGISTRY[mockCmsConfig.activeFooter] || FOOTER_REGISTRY.footer_standard;

  // MOTOR DE DESPLAZAMIENTO DINÁMICO REACONDICIONADO:
  // Si isTransparent es false, empujamos el contenido 70px abajo para que el Navbar fixed no lo tape.
  // Si es true, el contenido sube a píxel 0 de forma limpia.
  const dynamicMainStyle = {
    paddingTop: themeConfig.isTransparent ? '0px' : '70px'
  };

  return (
    <div className={styles.layoutContainer}>
      {/* Renderizado dinámico del Navbar elegido */}
      <SelectedNavbar />

      {/* Contenido dinámico de las páginas */}
      <main className={styles.mainContent} style={dynamicMainStyle}>
        <Outlet />
      </main>

      {/* Renderizado dinámico del Footer elegido */}
      <SelectedFooter />
    </div>
  );
};

export default MainLayout;