// src/components/navbar/NavbarSearchable.jsx
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react'; 
import { useSelector } from 'react-redux'; // 👈 1. CONEXIÓN DIRECTA A REDUX
import { navbarSwitches } from '../../config/navigationConfig';
import { useTheme } from '../../hooks/useTheme';

import SearchBar from '../search/SearchBar'; 
import NavbarBrand from './NavbarBrand';
import NavbarMenu from './NavbarMenu';
import ThemeToggle from '../ui/ThemeToggle';
import CartBtn from '../ui/CartBtn';
import UserBtn from '../ui/UserBtn';

import './NavbarSearchable.css'; 
import '../../styles/typography.css'; 

const NavbarSearchable = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const { theme } = useTheme(); 
  
  // 🎯 2. LEEMOS EL VALOR REAL DESDE REDUX (Eliminamos el acoplamiento estático)
  const isNavbarTransparentFromConfig = useSelector((state) => state.config.navbar?.isTransparent);
  
  const [activeMobileSubmenu, setActiveMobileSubmenu] = useState(null);
  const [activeMobileSubSubmenu, setActiveMobileSubSubmenu] = useState(null);

  // Efecto de Scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lógica de Modificadores existentes
  const scrollModifier = isScrolled ? 'c-navbar--scrolled' : '';
  
  // ⚡ 3. CORRECCIÓN APLICADA: Ahora evalúa de forma reactiva el valor inyectado
  const isCurrentlyTransparent = !isScrolled && isNavbarTransparentFromConfig && !isMenuOpen;
  const transparentModifier = isCurrentlyTransparent ? 'c-navbar--transparent' : '';
  
  const openMenuModifier = isMenuOpen ? 'c-navbar--menu-open' : '';
  
  // SINCRO REDUX GLOW
  let glowModifier = '';
  if (isCurrentlyTransparent && navbarSwitches.showGlow) {
    glowModifier = theme === 'dark' ? 'textSmartGlowDark' : 'textSmartGlowLight';
  }

  const showDesktopActions = navbarSwitches.showCartBtn || navbarSwitches.showThemeToggle || navbarSwitches.showUserBtn;
  const dynamicOpacity = navbarSwitches.glowOpacity !== undefined ? navbarSwitches.glowOpacity : 0.6;

  return (
    <nav 
      className={`c-navbar ${scrollModifier} ${transparentModifier} ${glowModifier} ${openMenuModifier}`.trim()} 
      aria-label="Navegación Principal"
      style={{ '--client-glow-opacity': dynamicOpacity }}
    >
      <div className="c-navbar__container siteLayoutWrapper">
        
        {/* MÓDULO 1: BRANDING */}
        {navbarSwitches.showBranding && (
          <div className="c-navbar__brand-container">
            <NavbarBrand />
          </div>
        )}
        
        {/* MÓDULO 2: BUSCADOR DESKTOP */}
        {navbarSwitches.showSearch && (
          <div className="c-navbar__search-desktop">
            <SearchBar />
          </div>
        )}

        {/* CONTROLES DE ACCIÓN EN MÓVIL Y TABLETS */}
        <div className="c-navbar__mobile-actions">
          {navbarSwitches.showCartBtn && <CartBtn isMobile={true} />}
          {navbarSwitches.showThemeToggle && <ThemeToggle isMobile={true} />}
          {navbarSwitches.showUserBtn && <UserBtn isMobile={true} closeMainMenu={() => setIsMenuOpen(false)} />}

          <button 
            type="button" 
            className={`c-navbar__toggle-menu ${isMenuOpen ? 'c-navbar__toggle-menu--open' : ''}`} 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
          >
            {isMenuOpen ? <X size={28} strokeWidth={1.5} /> : <Menu size={28} strokeWidth={1.5} />}
          </button>
        </div>

        {/* MÓDULO 3: ÁRBOL DE NAVEGACIÓN PRINCIPAL */}
        {navbarSwitches.showMenu && (
          <NavbarMenu 
            isMenuOpen={isMenuOpen}
            setIsMenuOpen={setIsMenuOpen}
            activeMobileSubmenu={activeMobileSubmenu}
            setActiveMobileSubmenu={setActiveMobileSubmenu}
            activeMobileSubSubmenu={activeMobileSubSubmenu}
            setActiveMobileSubSubmenu={setActiveMobileSubSubmenu}
            showSearchSwitch={navbarSwitches.showSearch}
          />
        )}

        {/* MÓDULO 4: CONTROLES DE ACCIÓN EN ESCRITORIO */}
        {showDesktopActions && (
          <div className="c-navbar__desktop-actions-wrapper">
            {navbarSwitches.showCartBtn && <CartBtn />}
            {navbarSwitches.showThemeToggle && <ThemeToggle />}
            {navbarSwitches.showUserBtn && <UserBtn />}
          </div>
        )}

      </div>
    </nav>
  );
};

export default NavbarSearchable;