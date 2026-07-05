/* src/config/navigationConfig.js */

//  DICCIONARIO DE CONTROL MODULAR (Módulos que el inquilino puede prender/apagar)
export const navbarSwitches = {
  showBranding: true,    // Si se apaga, se oculta el logo/texto de marca por completo
  showSearch: true,      // Módulo de barra de búsqueda inteligente
  showMenu: true,        // Árbol de navegación principal
  showCartBtn: true,     // ¡Nuevo módulo de carrito integrado!
  showThemeToggle: true, // Interruptor Sol/Luna
  showUserBtn: true,     // Botón/Dropdown de cuenta de usuario
  showGlow: true,
  glowOpacity: 0.8
};

export const brandConfig = {
  // 🕹️ Único control de activación: 'text' | 'image'
  type: 'image', 

  // Se activa SOLO si type es 'text'
  text: {
    // ESCRITORIO
    desktopTitle: "Muebles Hogar",
    desktopSize: "var(--text-3xl)", // ~28px (Entran aprox 11-12 caracteres cómodos)

    // TABLET
    tabletTitle: "Muebles Hogar",
    tabletSize: "var(--text-xl)",   // ~24px (Escala intermedia)

    // MÓVIL
    mobileTitle: "Hogar",
    mobileSize: "var(--text-2xl)",  // ~17px (Tamaño seguro para móviles. Si elige --text-2xl, entrarán max ~8 letras)

    typography: {
      fontFamily: "var(--font-branding)",
      fontWeight: "var(--weight-normal)",
      lineHeight: "1"
    }
  },
  
  // Se activa SOLO si type es 'image'
  imageLight: {
    alt: "Mi Hogar Arquitectura de Interiores",
    // Pantallas grandes y Tablets (A partir de 769px en adelante)
    desktopSrc: "/assets/brand/logo_160_40.svg",
    // Pantallas medianas (Desde 401px hasta 768px) -> Tu logo de ~88px
    tabletSrc: "/assets/brand/logo_120_40.svg",
    // Pantallas micro (400px o menos) -> El Isotipo / Icono 1:1
    mobileSrc: "/assets/brand/logo_40_40.png"
  },
  imageDark: {
    alt: "Mi Hogar Arquitectura de Interiores",
    desktopSrc: "/assets/brand/logo_dark_160_40.svg", // Tus nuevos archivos
    tabletSrc: "/assets/brand/logo_dark_120_40.svg",
    mobileSrc: "/assets/brand/logo_dark_40_40.svg"
  } 
};

//  CONFIGURACIÓN TIPOGRÁFICA DEL MENÚ DE NAVEGACIÓN
export const menuTypographyConfig = {
  desktop: {
    fontSize: "var(--text-base)", // 17px gracias a tu html font-size
    fontFamily: "var(--font-primary)",
    fontWeight: "var(--weight-medium)"
  }
};

export const navigationMenu = [
  {
    pageId: "nosotros", // Nivel 1
    submenu: [
      { pageId: "nosotros" }, // Nivel 2
      { pageId: "contacto" }
    ]
  },
  {
    pageId: "catalogo", // Nivel 1
    submenu: []
  },
  {
    pageId: "servicios", // Nivel 1
    submenu: [
      { pageId: "fabricacion" }, // Nivel 2
      { 
        pageId: "acabados", // Nivel 2
        subSubmenu: [
          { pageId: "laqueado" },   // Nivel 3
          { pageId: "poliuretano" } // Nivel 3
        ]
      },
      { pageId: "restauracion" } // Nivel 2
    ]
  }
];

export const userMenuOptions = [
  { label: "Iniciar sesión", path: "/login" },
  { label: "Registrarse", path: "/registro" },
  { label: "Ayuda", path: "/ayuda" }
];