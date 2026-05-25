// src/layouts/MainLayout.jsx
import { Outlet } from 'react-router-dom';
import { NAVBAR_REGISTRY, FOOTER_REGISTRY } from './ComponentRegistry';
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

  return (
    <div className={styles.layoutContainer}>
      {/* Renderizado dinámico del Navbar elegido */}
      <SelectedNavbar />

      {/* Contenido dinámico de las páginas */}
      <main className={styles.mainContent}>
        <Outlet />
      </main>

      {/* Renderizado dinámico del Footer elegido */}
      <SelectedFooter />
    </div>
  );
};

export default MainLayout;