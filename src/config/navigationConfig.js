/* src/config/navigationConfig.js */
import { User, Phone, Wrench, Hammer, Paintbrush } from 'lucide-react';

export const TYPOGRAPHY_SCALE = {
  xs: "14px",
  sm: "16px",
  md: "18px",
  lg: "20px",
  xl: "24px"
};

export const brandConfig = {
  type: 'text', // Opciones válidas: 'text' o 'image'
  text: {
    title: "Muebles Hogar"
  },
  image: {
    src: "/assets/logo.svg", // Puedes cambiarlo a .png, .jpg o lo que requiera el cliente
    alt: "Mi Hogar Arquitectura de Interiores",
    height: "42px",          // Control de escala vertical adaptable
    width: "auto"            // Mantiene la proporción horizontal intacta
  }
};

export const themeConfig = {
  theme: 'light',       // 'light' o 'dark' (Color de textos/elementos cuando está arriba)
  isTransparent: true   // true: Contenido inicia en pixel 0 (capa inferior). false: Contenido se desplaza 70px.
};

// --- MOTOR DE DISEÑO DINÁMICO: PALETA MÓDULO LIGHT ---
export const navbarColorLight = {
  bgSolid: "var(--color-surface)",
  brandText: "var(--color-primary-dark)",
  textMenuColor: "var(--color-primary-dark)",
  textMenuColorHover: "var(--color-accent)",
  textMenuMobile: "var(--color-primary-dark)",
  textMenuMobileActive: "var(--color-accent)",
  
  // Segundo punto: Control absoluto sobre el botón de Usuario (Fondo vs Icono)
  backgroundIconUser: "transparent",
  backgroundIconUserHover: "var(--color-accent)",
  backgroundIconUserActive: "var(--color-accent)",
  colorIconUser: "var(--color-primary-dark)",       // Estado normal
  colorIconUserHover: "var(--color-border)",         // Estado hover/active
  
  // Segundo punto: Control absoluto sobre el botón de Toggle Sun/Moon
  backgroundIconToggle: "transparent",
  backgroundIconToggleHover: "var(--color-accent)",
  backgroundIconToggleActive: "var(--color-accent)",
  colorIconToggle: "var(--color-primary-dark)",     // Estado normal
  colorIconToggleHover: "var(--color-border)",       // Estado hover/active

  // Tercer punto: Color explícito para el botón de cerrar (X) y hamburguesa en mobile
  mobileMenuToggleColor: "var(--color-primary-dark)",
  mobileMenuToggleColorActive: "var(--color-accent)",
  
  borderColor: "var(--color-border)",
  hoverRow: "var(--color-border)",

  searchBorderFocus: "var(--color-accent)"
};

// --- MOTOR DE DISEÑO DINÁMICO: PALETA MÓDULO DARK ---
export const navbarColorDark = {
  bgSolid: "var(--color-primary-dark)",              // Fondo principal oscuro
  brandText: "var(--color-white)",                   // Texto logo en dark
  textMenuColor: "var(--color-white)",               // Textos de enlaces
  textMenuColorHover: "var(--color-secondary)",       // Hover usando tu color secundario
  textMenuMobile: "var(--color-white)",
  textMenuMobileActive: "var(--color-secondary)",
  
  backgroundIconUser: "transparent",
  backgroundIconUserHover: "var(--color-secondary)",
  backgroundIconUserActive: "var(--color-secondary)",
  colorIconUser: "var(--color-white)",
  colorIconUserHover: "var(--color-primary-dark)",   // Contraste oscuro sobre el fondo secondary
  
  backgroundIconToggle: "transparent",
  backgroundIconToggleHover: "var(--color-secondary)",
  backgroundIconToggleActive: "var(--color-secondary)",
  colorIconToggle: "var(--color-white)",
  colorIconToggleHover: "var(--color-primary-dark)",

  mobileMenuToggleColor: "var(--color-white)",
  mobileMenuToggleColorActive: "var(--color-secondary)",
   
  borderColor: "var(--color-border-dark, var(--color-primary))",
  hoverRow: "var(--color-surface-dark, var(--color-accent))",

  searchBorderFocus: "var(--color-border)"
};

/* --- REGISTRO DE LÍMITES TIPOGRÁFICOS (SEGURIDAD DE LAYOUT) --- */
export const typographyLimits = {
  desktop: {
    logo: {
      current: "38px",
      min: "28px", // < 28px: Pierde jerarquía de marca.
      max: "42px"  // > 42px: Choca con el alto del Navbar (70px).
    },
    menuItems: {
      current: "18px", // 16px (var--text-base)
      min: "14px",     // < 14px: Problemas de legibilidad (WCAG).
      max: "18px"      // > 18px: Riesgo de desbordamiento en Laptops.
    }
  },
  mobile: {
    // Nota: Mantener intacto para preservar armonía en pantallas pequeñas.
    logo: "28px",
    menuItems: "1.25rem" // 20px (Para facilitar el toque táctil)
  }
};

export const navigationMenu = [
  {
    title: "Nosotros",
    path: "/nosotros",
    submenu: [
      { label: "Quiénes Somos", path: "/nosotros", icon: User },
      { label: "Contacto", path: "/contacto", icon: Phone }
    ]
  },
  {
    title: "Catálogo",
    path: "/catalogo",
    submenu: []
  },
  {
    title: "Servicios",
    path: "/servicios",
    submenu: [
      { 
        label: "Fabricación a Medida", 
        path: "/servicios/fabricacion", 
        icon: Hammer 
      },
      { 
        label: "Acabados Finos", 
        path: "/servicios/acabados", 
        icon: Paintbrush,
        subSubmenu: [
          { label: "Laqueado Premium", path: "/servicios/acabados/laqueado" },
          { label: "Pintura Poliuretano", path: "/servicios/acabados/poliuretano" }
        ]
      },
      { 
        label: "Restauración", 
        path: "/servicios/restauracion", 
        icon: Wrench 
      }
    ]
  }
];

export const userMenuOptions = [
  { label: "Iniciar sesión", path: "/login" },
  { label: "Registrarse", path: "/registro" },
  { label: "Ayuda", path: "/ayuda" }
];