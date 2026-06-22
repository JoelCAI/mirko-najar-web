// src/config/heroSliderConfig.js

// 1. POSICIONAMIENTO DEL CONTENIDO (textPosition / textPositionMobile):
//    - Desktop: 'top-left'   ,  'top-center'  ,    'top-right',
//               'center-left', 'center-center', 'center-right', 
//               'bottom-left', 'bottom-center', 'bottom-right',

//    - Mobile:  'top-center', 'center-center', 'bottom-center'

//  Button sizes: 'xs' | 'sm' | 'md' | 'lg' | 'xl'

//  classic, secondary, outline, doubleCurtainSplit, 
//  obliqueEclipse, 

export const heroSliders = [
  {
    id: 'slide-arquitectura',
    themeVisibility: 'dark', 
    imageDesktop: 'https://images.unsplash.com/photo-1600566753151-384129cf4e3e?auto=format&fit=crop&w=1920&q=80',
    imageMobile: 'https://images.unsplash.com/photo-1505693314120-0d443867891c?auto=format&fit=crop&w=600&q=80',
    
    title: 'LA MADERA NOS INSPIRA',
    subtitle: 'Creamos piezas artesanales de hermosa textura y pasión por los acabados.',
    
    textPosition: 'top-right',       
    textPositionMobile: 'center-center',
    mobileYOffset: '-70px', 
    
    titleVariant: 'light',             
    subtitleVariant: 'light',          
    
    // --- Único Control de Contraste Tipográfico Global ---
    useSmartGlow: true,             // true activa el efecto, false lo apaga por completo
    smartGlowVariant: "dark",       // "dark" (sombras oscuras para texto claro) | "light"
    smartGlowOpacity: 0.75,         // Escala de 0 a 1 para el text-shadow dinámico

    buttonText: 'Ver Proyectos',
    buttonLink: '/proyectos',
    buttonVariant: 'splitBlades',          
    buttonSize: { mobile: 'md', desktop: 'md' }, 
    buttonUtils: "bg-custom-secondary hover-bg-custom-primary-dark",
    buttonBorder: "",
    
    duration: 15000
  },
  {
    id: 'slide-simplicidad',
    themeVisibility: 'light',
    imageDesktop: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1920&q=80',
    imageMobile: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=600&q=80',
    title: 'DISEÑO MINIMALISTA',
    subtitle: 'Espacios que respiran equilibrio, orden y elegancia natural en cada rincón.',
    
    textPosition: 'center-center',
    textPositionMobile: 'center-center',
    
    titleVariant: 'light',
    subtitleVariant: 'light',
    
    useSmartGlow: true,
    smartGlowVariant: "dark",
    smartGlowOpacity: 0.8,
    
    buttonText: 'Explorar Tienda',
    buttonLink: '/registro',
    buttonVariant: 'primary',
    buttonSize: { mobile: 'md', desktop: 'md' }, 
    buttonUtils: "bg-default-dark hover-default-dark",
    
    duration: 15000
  },
  {
    id: 'slide-sistemas',
    themeVisibility: 'both',
    imageDesktop: 'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=1920&q=80',
    imageMobile: 'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=600&q=80',
    title: 'PIEZAS QUE PERDURAN',
    subtitle: 'Colecciones creadas para habitar tus espacios con belleza, calidez y armonía.',
    
    textPosition: 'center-right',
    textPositionMobile: 'top-center',
    
    titleVariant: 'light',
    subtitleVariant: 'light',
    
    useSmartGlow: true,
    smartGlowVariant: "dark",
    smartGlowOpacity: 0.75,
    
    buttonText: 'Ver Catálogo',
    buttonLink: '/soluciones',
    buttonVariant: 'secondary',
    buttonSize: { mobile: 'md', desktop: 'md' }, 
    buttonUtils: "bg-default-dark hover-default-dark",
    
    duration: 15000
  }
];