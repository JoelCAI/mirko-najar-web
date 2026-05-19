// src/layouts/MainLayout.jsx
import { Outlet } from 'react-router-dom';
import { NAVBAR_REGISTRY } from './ComponentRegistry';
import styles from './MainLayout.module.css';

// Esto simula la base de datos o el estado que controlará tu CMS más adelante
const mockCmsConfig = {
  activeNavbar: 'navbar_searchable', // Si cambias esto a otro string, montará otro Lego
};

const MainLayout = () => {
  // Buscamos el componente en el catálogo, si no existe ponemos el NavbarSearchable por defecto
  const SelectedNavbar = NAVBAR_REGISTRY[mockCmsConfig.activeNavbar] || NAVBAR_REGISTRY.navbar_searchable;

  return (
    <div className={styles.layoutContainer}>
      {/* Renderizado dinámico del Navbar elegido */}
      <SelectedNavbar />

      {/* Aquí caerá el contenido de las páginas de tu AppRouter (Home, etc.) */}
      <main className={styles.mainContent}>
        <Outlet />
      </main>

      {/* Aquí irá tu SelectedFooter en el futuro */}
    </div>
  );
};

export default MainLayout;