// src/components/navbar/NavbarSearchable.jsx
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, User as UserIcon, ChevronDown, ChevronLeft } from 'lucide-react'; 
import styles from './NavbarSearchable.module.css';
import SearchBar from '../search/SearchBar';
import { navigationMenu, userMenuOptions } from '../../config/navigationConfig';

const NavbarSearchable = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  // Control de estados de clicks exclusivos para Mobile/Tablet
  const [activeMobileSubmenu, setActiveMobileSubmenu] = useState(null);
  const [activeMobileSubSubmenu, setActiveMobileSubSubmenu] = useState(null);
  const [userDropdownOpenMobile, setUserDropdownOpenMobile] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Maneja el toggle de los menús condicionales en entornos táctiles
  const handleNavClick = (index, hasSubmenu) => {
    if (!hasSubmenu) {
      setIsMenuOpen(false); // Link directo: cierra la cortina mobile
      return;
    }
    setActiveMobileSubmenu(activeMobileSubmenu === index ? null : index);
  };

  return (
    <nav className={`${styles.nav} ${isScrolled ? styles.navSolid : styles.navTransparent}`}>
      <div className={styles.container}>
        
        {/* LOGO / BRANDING */}
        <Link to="/" className={styles.firmaAutor}>Mirko Najar</Link>
        
        {/* BUSCADOR DESKTOP */}
        <div className={styles.searchDesktop}>
          <SearchBar />
        </div>

        {/* CONTENEDOR ACCIONES MÓVILES: Icono Usuario (Izquierda) + Hamburguesa (Derecha) */}
        <div className={styles.mobileActions}>
          <button 
            type="button"
            /* Inyecta la clase activeUserBtn si el menú está abierto */
            className={`${styles.mobileUserBtn} ${userDropdownOpenMobile ? styles.activeUserBtn : ''}`}
            onClick={() => setUserDropdownOpenMobile(!userDropdownOpenMobile)}
            aria-label="Menú de usuario"
          >
            <UserIcon size={26} strokeWidth={1.5} />
            {userDropdownOpenMobile && (
              <ul className={styles.mobileUserDropdown}>
                {userMenuOptions.map((opt, i) => (
                  <li key={i}>
                    <Link to={opt.path} onClick={() => {
                      setIsMenuOpen(false);
                      setUserDropdownOpenMobile(false); // Cierra al hacer click en una opción
                    }}>
                      {opt.label}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </button>

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
        </div>

        {/* MENÚ DE NAVEGACIÓN Y CORTINA RESPONSIVE */}
        <ul className={`${styles.menu} ${isMenuOpen ? styles.menuOpen : ''}`}>
          
          {/* BUSCADOR MÓVIL */}
          <li className={styles.searchMobile}>
            <SearchBar />
          </li>

          {/* GENERACIÓN DINÁMICA DEL MENÚ INSTITUCIONAL */}
          {navigationMenu.map((item, index) => {
            // Regla de oro: Es un dropdown real solo si tiene más de 0 elementos
            const hasSubmenu = item.submenu && item.submenu.length > 0;

            return (
              <li 
                key={index} 
                className={`${styles.navItem} ${hasSubmenu ? styles.hasDropdown : ''}`}
              >
                {hasSubmenu ? (
                  // Contenedor interactivo (Hover en PC / Click en Mobile)
                  <div 
                    className={styles.navLinkContainer}
                    onClick={() => handleNavClick(index, hasSubmenu)}
                  >
                    <span className={styles.navLink}>{item.title}</span>
                    <ChevronDown size={16} className={styles.arrow} />
                  </div>
                ) : (
                  <Link 
                    to={item.path} 
                    className={styles.navLink} 
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.title}
                  </Link>
                )}

                {/* PRIMER NIVEL DROPDOWN (Nosotros / Servicios) */}
                {hasSubmenu && (
                  <ul className={`${styles.dropdown} ${activeMobileSubmenu === index ? styles.dropdownActiveMobile : ''}`}>
                    {item.submenu.map((subItem, subIndex) => {
                      const Icon = subItem.icon;
                      const hasSubSub = subItem.subSubmenu && subItem.subSubmenu.length > 0;

                      return (
                        <li 
                          key={subIndex} 
                          className={`${styles.dropdownItem} ${hasSubSub ? styles.hasSubSub : ''}`}
                          onClick={(e) => {
                            if (hasSubSub) {
                              e.stopPropagation(); // Evita que se cierre el dropdown padre al clickear el hijo
                              setActiveMobileSubSubmenu(activeMobileSubSubmenu === subIndex ? null : subIndex);
                            }
                          }}
                        >
                          <div className={styles.subLinkWrapper}>
                            <Link 
                              to={hasSubSub ? '#' : subItem.path} 
                              onClick={() => !hasSubSub && setIsMenuOpen(false)}
                            >
                              {Icon && <Icon size={18} className={styles.subIcon} />}
                              {subItem.label}
                            </Link>
                            {hasSubSub && <ChevronLeft size={16} className={styles.leftArrowSub} />}
                          </div>

                          {/* SEGUNDO NIVEL DROPDOWN (Acabados Finos -> Abre a la izquierda en PC) */}
                          {hasSubSub && (
                            <ul className={`${styles.subSubmenu} ${activeMobileSubSubmenu === subIndex ? styles.subSubmenuActiveMobile : ''}`}>
                              {subItem.subSubmenu.map((subSub, ssIndex) => (
                                <li key={ssIndex} className={styles.subSubItem}>
                                  <Link to={subSub.path} onClick={() => setIsMenuOpen(false)}>
                                    {subSub.label}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          )}
                        </li>
                      );
                    })}
                  </ul>
                )}
              </li>
            );
          })}

          {/* ICONO USUARIO EXCLUSIVO DESKTOP (Aparece estático al final de la lista) */}
          <li className={`${styles.navItem} ${styles.desktopUserMenu}`}>
            <div className={styles.userIconWrapper}>
              <UserIcon size={20} />
            </div>
            <ul className={styles.userDropdownDesktop}>
              {userMenuOptions.map((opt, i) => (
                <li key={i}>
                  <Link to={opt.path}>{opt.label}</Link>
                </li>
              ))}
            </ul>
          </li>

        </ul>
      </div>
    </nav>
  );
};

export default NavbarSearchable;