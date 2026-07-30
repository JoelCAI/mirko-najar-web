// src/layouts/MainLayout.jsx
import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux'; // 👈 El anzuelo para escuchar a Redux
import { NAVBAR_REGISTRY, FOOTER_REGISTRY } from './ComponentRegistry';
import styles from './MainLayout.module.css';

const MainLayout = () => {
  // 🎯 Escuchamos de forma reactiva las tajadas de configuración del Abuelo JSON
  const navbarState = useSelector((state) => state.config.navbar);
  const footerState = useSelector((state) => state.config.footer);

  // Buscamos los componentes en el catálogo usando los strings que vienen de los datos
  const SelectedNavbar = NAVBAR_REGISTRY[navbarState?.activeType] || NAVBAR_REGISTRY.navbar_searchable;
  const SelectedFooter = FOOTER_REGISTRY[footerState?.activeType] || FOOTER_REGISTRY.footer_standard;

  // 🛡️ MOTOR DE DESPLAZAMIENTO DINÁMICO (CHASIS LÍQUIDO)
  // Si Pablito configuró el navbar como transparente, el contenido sube al píxel 0
  const dynamicMainStyle = {
    paddingTop: navbarState?.isTransparent ? '0px' : '70px'
  };

  return (
    <div className={styles.layoutContainer}>
      {/* 💡 INTERRUPTOR NAVBAR: Si 'active' es false, la pieza Lego no se renderiza */}
      {navbarState?.active && <SelectedNavbar />}

      <main className={styles.mainContent} style={dynamicMainStyle}>
        <Outlet />
      </main>

      {/* 💡 INTERRUPTOR FOOTER */}
      {footerState?.active && <SelectedFooter />}
    </div>
  );
};

export default MainLayout;