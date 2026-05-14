import { Link } from 'react-router-dom'; // Importación necesaria
import styles from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContainer}>
        <div className={styles.mainInfo}>
          <h3>WOODCRAFT</h3>
          <ul className={styles.links}>
            <li><Link to="/catalogo">Catálogo</Link></li>
            <li><Link to="/proyectos">Proyectos</Link></li>
            <li><Link to="/contacto">Contacto</Link></li>
          </ul>
        </div>
      </div>
      <div className={styles.bottomBar}>
        <p className={styles.firmaAutor}>Mirko Najar</p>
        <p>© {new Date().getFullYear()} - Todos los derechos reservados.</p>
        
      </div>
    </footer>
  );
};

export default Footer;