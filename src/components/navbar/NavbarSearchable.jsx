// src/components/navbar/NavbarSearchable.jsx
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react'; 

import { themeConfig } from '../../config/themeConfig';
import { navbarSwitches } from '../../config/navigationConfig';

import SearchBar from '../search/SearchBar'; 

import NavbarBrand from './NavbarBrand';
import NavbarMenu from './NavbarMenu';
import ThemeToggle from '../ui/ThemeToggle';
import CartBtn from '../ui/CartBtn';
import UserBtn from '../ui/UserBtn';

import './NavbarSearchable.css'; 
// 👇 IMPORTANTE: Asegúrate de importar tus estilos globales de tipografía para leer los Glows
import '../../styles/typography.css'; 

const NavbarSearchable = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  // ⚡ NUEVO ESTADO: Detecta de forma reactiva el clima lumínico del sitio
  const [currentTheme, setCurrentTheme] = useState('light');
  
  const [activeMobileSubmenu, setActiveMobileSubmenu] = useState(null);
  const [activeMobileSubSubmenu, setActiveMobileSubSubmenu] = useState(null);

  // 1. Efecto existente de Scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 2. ⚡ NUEVO EFECTO: Sincroniza el Sol y la Luna (MutationObserver de alto rendimiento)
  useEffect(() => {
    const checkTheme = () => {
      const isDarkClass = document.documentElement.classList.contains('dark') || document.body.classList.contains('dark');
      const isDarkAttr = document.documentElement.getAttribute('data-theme') === 'dark';
      setCurrentTheme((isDarkClass || isDarkAttr) ? 'dark' : 'light');
    };
    
    checkTheme(); // Evaluación inicial
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class', 'data-theme'] });
    observer.observe(document.body, { attributes: true, attributeFilter: ['class', 'data-theme'] });
    return () => observer.disconnect();
  }, []);

  // Lógica de Modificadores existentes
  const scrollModifier = isScrolled ? 'c-navbar--scrolled' : '';
  const isCurrentlyTransparent = !isScrolled && themeConfig.isTransparent;
  const transparentModifier = isCurrentlyTransparent ? 'c-navbar--transparent' : '';
  
  // ⚡ CONFIGURACIÓN DINÁMICA: Inyecta el escudo SmartGlow solo si está en transparente Y si el switch está encendido
  let glowModifier = '';
  if (isCurrentlyTransparent && navbarSwitches.showGlow) {
    glowModifier = currentTheme === 'dark' ? 'textSmartGlowDark' : 'textSmartGlowLight';
  }

  const showDesktopActions = navbarSwitches.showCartBtn || navbarSwitches.showThemeToggle || navbarSwitches.showUserBtn;

  // 📐 Aseguramos una caída de seguridad por si el cliente borra el número
  const dynamicOpacity = navbarSwitches.glowOpacity !== undefined ? navbarSwitches.glowOpacity : 0.6;

  return (
    // 🔗 Inyectamos --client-glow-opacity en los estilos en línea de forma atómica
    <nav 
      className={`c-navbar ${scrollModifier} ${transparentModifier} ${glowModifier}`.trim()} 
      aria-label="Navegación Principal"
      style={{ '--client-glow-opacity': dynamicOpacity }}
    >
      <div className="c-navbar__container siteLayoutWrapper">
        
        {/* ==========================================
            MÓDULO 1: BRANDING
           ========================================== */}
        {navbarSwitches.showBranding && (
          <div className="c-navbar__brand-container">
            <NavbarBrand />
          </div>
        )}
        
        {/* ==========================================
            MÓDULO 2: BUSCADOR DESKTOP
           ========================================== */}
        {navbarSwitches.showSearch && (
          <div className="c-navbar__search-desktop">
            <SearchBar />
          </div>
        )}

        {/* ==========================================
            CONTROLES DE ACCIÓN EN MÓVIL Y TABLETS
           ========================================== */}
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

        {/* ==========================================
            MÓDULO 3: ÁRBOL DE NAVEGACIÓN PRINCIPAL
           ========================================== */}
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

        {/* ==========================================
            MÓDULO 4: CONTROLES DE ACCIÓN EN ESCRITORIO
           ========================================== */}
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