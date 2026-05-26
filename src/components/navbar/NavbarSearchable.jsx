// src/components/navbar/NavbarSearchable.jsx
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, User as UserIcon, ChevronDown, ChevronLeft } from 'lucide-react'; 
import styles from './NavbarSearchable.module.css';
import SearchBar from '../search/SearchBar';
import ThemeToggle from '../ui/ThemeToggle'; // <-- Ruta corregida a ui/
import { useTheme } from '../../hooks/useTheme'; // <-- ¡CONEXIÓN AL SATÉLITE GLOBAL!
import { 
  brandConfig, 
  themeConfig, 
  navigationMenu, 
  userMenuOptions, 
  navbarColorLight, 
  navbarColorDark,
  typographyLimits 
} from '../../config/navigationConfig';

const NavbarSearchable = () => { // <-- Eliminamos las props viejas inactivas
  const { theme } = useTheme(); // <-- Escuchamos directamente el estado real del hook
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
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

  const handleNavClick = (index, hasSubmenu) => {
    if (!hasSubmenu) {
      setIsMenuOpen(false);
      return;
    }
    if (activeMobileSubmenu !== index) {
      setActiveMobileSubSubmenu(null);
    }
    setActiveMobileSubmenu(activeMobileSubmenu === index ? null : index);
  };

  // Usamos el 'theme' global directo del hook para cambiar la paleta
  const activePalette = theme === 'light' ? navbarColorLight : navbarColorDark;

  const themeStyles = {
    '--dynamic-bg-solid': activePalette.bgSolid,
    '--dynamic-brand-text': activePalette.brandText,
    '--dynamic-text-menu-color': activePalette.textMenuColor,
    '--dynamic-text-menu-color-hover': activePalette.textMenuColorHover,
    '--dynamic-text-menu-mobile': activePalette.textMenuMobile,
    '--dynamic-text-menu-mobile-active': activePalette.textMenuMobileActive,
    
    '--dynamic-bg-icon-user': activePalette.backgroundIconUser,
    '--dynamic-bg-icon-user-hover': activePalette.backgroundIconUserHover,
    '--dynamic-bg-icon-user-active': activePalette.backgroundIconUserActive,
    '--dynamic-color-icon-user': activePalette.colorIconUser,
    '--dynamic-color-icon-user-hover': activePalette.colorIconUserHover,
    
    '--dynamic-bg-icon-toggle': activePalette.backgroundIconToggle,
    '--dynamic-bg-icon-toggle-hover': activePalette.backgroundIconToggleHover,
    '--dynamic-bg-icon-toggle-active': activePalette.backgroundIconToggleActive,
    '--dynamic-color-icon-toggle': activePalette.colorIconToggle,
    '--dynamic-color-icon-toggle-hover': activePalette.colorIconToggleHover,

    '--dynamic-mobile-toggle-color': activePalette.mobileMenuToggleColor,
    '--dynamic-mobile-toggle-color-active': activePalette.mobileMenuToggleColorActive,
    
    '--dynamic-search-container-bg': activePalette.searchContainerBg,
    '--dynamic-search-button-bg': activePalette.searchButtonBg,
    '--dynamic-search-button-bg-hover': activePalette.searchButtonBgHover,
    '--dynamic-search-button-color': activePalette.searchButtonColor,
    
    '--dynamic-border-color': activePalette.borderColor,
    '--dynamic-hover-row': activePalette.hoverRow,

    '--typo-desktop-logo-curr': typographyLimits.desktop.logo.current,
    '--typo-desktop-logo-min': typographyLimits.desktop.logo.min,
    '--typo-desktop-logo-max': typographyLimits.desktop.logo.max,
    
    '--typo-desktop-menu-curr': typographyLimits.desktop.menuItems.current,
    '--typo-desktop-menu-min': typographyLimits.desktop.menuItems.min,
    '--typo-desktop-menu-max': typographyLimits.desktop.menuItems.max,

    '--typo-mobile-logo': typographyLimits.mobile.logo,
    '--typo-mobile-menu': typographyLimits.mobile.menuItems,

    '--dynamic-search-border-focus': activePalette.searchBorderFocus,
  };

  const backgroundStyleClass = isScrolled 
    ? styles.navSolid 
    : (themeConfig.isTransparent ? styles.navTransparent : styles.navSolid);
  
  
  return (
    <nav 
    style={themeStyles} 
    className={`${styles.nav} ${backgroundStyleClass}`} 
    aria-label="Navegación Principal"
    >
      <div className={styles.container}>
        
        {/* LOGO / BRANDING */}
        <Link to="/" className={styles.brandWrapper}>
          {brandConfig.type === 'image' ? (
            <img 
              src={brandConfig.image.src} 
              alt={brandConfig.image.alt} 
              style={{ 
                height: brandConfig.image.height, 
                width: brandConfig.image.width,
                display: 'block'
              }} 
            />
          ) : (
            <span className={styles.firmaAutor}>{brandConfig.text.title}</span>
          )}
        </Link>
        
        {/* BUSCADOR DESKTOP */}
        <div className={styles.searchDesktop}>
          <SearchBar />
        </div>

        {/* CONTROLES MÓVILES */}
        <div className={styles.mobileActions}>
          {/* Se pasa isMobile={true} para heredar tu delay visual táctil de 400ms */}
          <div className={styles.themeToggleWrapperMobile}>
            <ThemeToggle isMobile={true} />
          </div>

          <button 
            type="button"
            className={`${styles.mobileUserBtn} ${userDropdownOpenMobile ? styles.activeUserBtn : ''}`}
            onClick={() => setUserDropdownOpenMobile(!userDropdownOpenMobile)}
            aria-label="Menú de usuario"
          >
            <UserIcon size={24} strokeWidth={1.5} />
            {userDropdownOpenMobile && (
              <ul className={styles.mobileUserDropdown} role="menu">
                {userMenuOptions.map((opt, i) => (
                  <li key={i} role="none">
                    <Link to={opt.path} role="menuitem" onClick={() => {
                      setIsMenuOpen(false);
                      setUserDropdownOpenMobile(false);
                    }}>
                      {opt.label}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </button>

          <button 
            type="button"
            className={`${styles.menuToggle} ${isMenuOpen ? styles.menuToggleOpen : ''}`} 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
          >
            {isMenuOpen ? <X size={28} strokeWidth={1.5} /> : <Menu size={28} strokeWidth={1.5} />}
          </button>
        </div>

        {/* MENÚ PRINCIPAL */}
        <ul className={`${styles.menu} ${isMenuOpen ? styles.menuOpen : ''}`} role="menubar">
          <li className={styles.searchMobile} role="none">
            <SearchBar />
          </li>

          {navigationMenu.map((item, index) => {
            const hasSubmenu = item.submenu && item.submenu.length > 0;
            const isCurrentActive = activeMobileSubmenu === index;

            return (
              <li key={index} className={`${styles.navItem} ${hasSubmenu ? styles.hasDropdown : ''}`} role="none">
                {hasSubmenu ? (
                  <div className={styles.navLinkContainer} onClick={() => handleNavClick(index, hasSubmenu)}>
                    <span className={`${styles.navLink} ${isCurrentActive ? styles.linkFocused : ''}`}>
                      {item.title}
                    </span>
                    <ChevronDown size={16} className={`${styles.arrow} ${isCurrentActive ? styles.arrowFocused : ''}`} />
                  </div>
                ) : (
                  <Link to={item.path} className={styles.navLink} role="menuitem" onClick={() => setIsMenuOpen(false)}>
                    {item.title}
                  </Link>
                )}

                {hasSubmenu && (
                  <ul className={`${styles.dropdown} ${isCurrentActive ? styles.dropdownActiveMobile : ''}`} role="menu">
                    {item.submenu.map((subItem, subIndex) => {
                      const Icon = subItem.icon;
                      const hasSubSub = subItem.subSubmenu && subItem.subSubmenu.length > 0;
                      const isSubActive = activeMobileSubSubmenu === subIndex;

                      return (
                        <li 
                          key={subIndex} 
                          className={`${styles.dropdownItem} ${hasSubSub ? styles.hasSubSub : ''}`}
                          role="none"
                          onClick={(e) => {
                            if (hasSubSub) {
                              e.stopPropagation();
                              setActiveMobileSubSubmenu(isSubActive ? null : subIndex);
                            }
                          }}
                        >
                          <div className={styles.subLinkWrapper}>
                            <Link 
                              to={hasSubSub ? '#' : subItem.path} 
                              role="menuitem"
                              onClick={() => !hasSubSub && setIsMenuOpen(false)}
                              className={isSubActive ? styles.linkFocused : ''}
                            >
                              {Icon && (
                                <span className={styles.mobileOnlyIconWrapper}>
                                  <Icon size={18} className={`${styles.subIcon} ${isSubActive ? styles.iconFocused : ''}`} />
                                </span>
                              )}
                              <span>{subItem.label}</span>
                            </Link>
                            {hasSubSub && <ChevronLeft size={16} className={`${styles.leftArrowSub} ${isSubActive ? styles.arrowFocused : ''}`} />}
                          </div>

                          {hasSubSub && (
                            <ul className={`${styles.subSubmenu} ${isSubActive ? styles.subSubmenuActiveMobile : ''}`} role="menu">
                              {subItem.subSubmenu.map((subSub, ssIndex) => (
                                <li key={ssIndex} className={styles.subSubItem} role="none">
                                  <Link to={subSub.path} role="menuitem" onClick={() => setIsMenuOpen(false)}>
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

          {/* CONTROLES ESCRITORIO */}
          <li className={`${styles.navItem} ${styles.desktopThemeMenu}`} role="none">
            {/* Por defecto isMobile es false, toma el diseño limpio de escritorio */}
            <ThemeToggle />
          </li>

          <li className={`${styles.navItem} ${styles.desktopUserMenu}`} role="none">
            <div className={styles.userIconWrapper}>
              <UserIcon size={20} />
            </div>
            <ul className={styles.userDropdownDesktop} role="menu">
              {userMenuOptions.map((opt, i) => (
                <li key={i} role="none">
                  <Link to={opt.path} role="menuitem">{opt.label}</Link>
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