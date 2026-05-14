import { Outlet } from 'react-router-dom';
import styles from './MainLayout.module.css';
import NavbarSearchable from '../components/navbar/NavbarSearchable';
import FloatingSearch from '../components/search/FloatingSearch';
import Footer from '../components/footer/Footer'; // Importamos el nuevo Footer

const MainLayout = ({ showFooter = true }) => {
  return (
    <div className={styles.layoutWrapper}>
      <header className={styles.header}>
        <NavbarSearchable />
      </header>

      <FloatingSearch />

      <main className={styles.mainContent}>
        <Outlet /> 
      </main>

      {/* Envolvemos el Footer en un div con la clase del grid o 
          pasamos la clase directamente si el componente la acepta */}
      {showFooter && (
        <div className={styles.footerArea}>
          <Footer />
        </div>
      )}
    </div>
  );
};

export default MainLayout;