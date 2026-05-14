import { useState, useEffect, useRef } from 'react';
import { Search, X, ArrowRight } from 'lucide-react';
import clsx from 'clsx';
import styles from './FloatingSearch.module.css';

const FloatingSearch = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Si bajamos más de 150px y la dirección es hacia abajo, mostrar.
      // Si subimos, esconder.
      if (currentScrollY > lastScrollY.current && currentScrollY > 150) {
        setIsVisible(true);
      } else if (currentScrollY < lastScrollY.current) {
        setIsVisible(false);
      }
      
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Gatillo de la lupa */}
      <button 
        className={clsx(styles.trigger, isVisible && styles.show)} 
        onClick={() => setIsDrawerOpen(true)}
      >
        <Search size={24} />
      </button>

      {/* Fondo oscuro al abrir filtros */}
      <div 
        className={clsx(styles.overlay, isDrawerOpen && styles.overlayVisible)} 
        onClick={() => setIsDrawerOpen(false)} 
      />
      
      {/* Drawer de Filtros */}
      <div className={clsx(styles.drawer, isDrawerOpen && styles.drawerOpen)}>
        <div className={styles.drawerHeader}>
          <h3>Filtros y Búsqueda</h3>
          <button onClick={() => setIsDrawerOpen(false)}><X size={28} /></button>
        </div>
        <div className={styles.drawerContent}>
          <div className={styles.searchBox}>
            <input type="text" placeholder="¿Qué buscas hoy?" />
            <ArrowRight className={styles.arrow} />
          </div>
          <div className={styles.filterGrid}>
            <button>Mesas</button>
            <button>Sillas</button>
            <button>Premium</button>
            <button>Ofertas</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default FloatingSearch;