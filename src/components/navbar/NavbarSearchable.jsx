import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react'; 
import styles from './NavbarSearchable.module.css';
import SearchBar from '../search/SearchBar';

const NavbarSearchable = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`${styles.nav} ${isScrolled ? styles.navSolid : styles.navTransparent}`}>
      <div className={styles.container}>
        <Link to="/" className={styles.firmaAutor}>Mirko Najar</Link>
        
        <div className={styles.searchDesktop}>
          <SearchBar />
        </div>

        {/* El botón ahora tiene un z-index superior para que la X siempre sea visible */}
        <button 
          className={styles.menuToggle} 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? (
            <X size={32} strokeWidth={1.2} /> 
          ) : (
            <Menu size={32} strokeWidth={1.2} />
          )}
        </button>

        <ul className={`${styles.menu} ${isMenuOpen ? styles.menuOpen : ''}`}>
          <li className={styles.searchMobile}>
            <SearchBar />
          </li>
          <li><Link to="/catalogo" className={styles.navLink}>Catálogo</Link></li>
          <li><Link to="/proyectos" className={styles.navLink}>Proyectos</Link></li>
          <li><Link to="/contacto" className={styles.navLink}>Contacto</Link></li>
        </ul>
      </div>
    </nav>
  );
};

export default NavbarSearchable;