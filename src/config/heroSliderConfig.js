// src/config/heroSliderConfig.js

// =========================================================================
// --- GUÍA MAESTRA DE CONFIGURACIÓN DE COMPONENTES DE INTERFAZ (UI) ---
// =========================================================================
// Esta guía unifica el comportamiento de <Button /> en cualquier componente (.js / .jsx)
//
// 1. POSICIONAMIENTO DEL CONTENIDO (textPosition / textPositionMobile):
//    - Desktop: "top-left", "top-center", "top-right", "center-left", "center-center", "center-right", "bottom-left", "bottom-center", "bottom-right"
//    - Mobile:  "top-center", "center-center", "bottom-center"
//
// 2. VARIANTES DE COMPORTAMIENTO VISUAL (buttonVariant):
//    A - 'primary'          : Destello de luz líquido transversal.
//    B - 'secondary'        : Cortina elegante de color que sube desde la base.
//    C - 'outline'          : Expansión de líneas perimetrales con micro-borde.
//    D - 'premiumGradient'  : Capas superpuestas de degradados con fundido suave (Opacity).
//    E - 'shadowElevation'  : Profundidad volumétrica 3D mediante capas de sombras.
//    F - 'doubleCurtainSplit': Dos cortinas horizontales simétricas desde el centro.
//    G - 'obliqueEclipse'   : Corte diagonal geométrico a -25 grados.
//
// 3. CONTROL MAESTRO DE TAMAÑOS (buttonSize):
//    Las alturas son fijas para garantizar simetría visual. El ancho se adapta automáticamente al texto.
//    - 'sm' : Altura Fija 34px | Ideal para Tarjetas, Productos, Filtros (5-12 caracteres. Ej: Comprar)
//    - 'md' : Altura Fija 42px | Ideal para Formularios, Modales, Bloques Estándar (8-18 caracteres. Ej: Iniciar Sesión)
//    - 'lg' : Altura Fija 50px | Ideal para Secciones Hero, Portadas y Sliders Principales (10-22 caracteres. Ej: Ver Proyectos)
//
// 4. ESQUEMAS DE DEGRADADOS ADMITIDOS (Acepta Hex, Variables CSS y RGBA para transparencias premium):
//    - Hexagonal Estándar : 'linear-gradient(135deg, #f05a28 0%, #e80a89 100%)' (Ángulos comunes: 90deg horizontal, 135deg diagonal)
//    - Variables de Paleta: 'linear-gradient(90deg, var(--color-primary) 0%, var(--color-accent) 100%)'
//    - RGBA Transparente  : 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(0,0,0,0.4) 100%)' (Acabados tipo cristal)
// =========================================================================

//btnBg: 'linear-gradient(135deg, var(--color-natura) 40%, var(--color-clay-hover-dark) 100%)',
//btnBgHover: 'linear-gradient(135deg, var(--color-clay-hover-dark) 0%, var(--color-natura) 100%)',

export const heroSliders = [
  {
    id: 'slide-arquitectura',
    themeVisibility: 'dark', // 'dark' | 'light' | 'both'
    imageDesktop: 'https://images.unsplash.com/photo-1600566753151-384129cf4e3e?auto=format&fit=crop&w=1920&q=80',
    imageMobile: 'https://images.unsplash.com/photo-1505693314120-0d443867891c?auto=format&fit=crop&w=600&q=80',
    title: 'LA MADERA NOS INSPIRA',
    subtitle: 'Creamos piezas artesanales de hermosa textura y pasión por los acabados.',
    
    // --- Posicionamiento y Layout ---
    textPosition: 'center-left',       
    textPositionMobile: 'center-center', 
    // mobileYOffset: '-90px',            
    
    // --- Variaciones de Contenedores y Textos ---
    titleVariant: 'light',             
    subtitleVariant: 'light',          
    showDegradeBox: true,              
    degradeBoxVariant: 'dark',         
    degradeBoxOpacity: 1,              
    
    // --- Configuración Atómica del Botón ---
    buttonText: 'Ver Proyectos',
    buttonLink: '/proyectos',
    buttonVariant: 'outline',          
    buttonSize: 'lg',                  // 'sm' (H:34px) | 'md' (H:42px) | 'lg' (H:50px)
    
    // --- Animación Inteligente en Móviles (UX Premium) ---
    mobileAnimationInterval: 5000,    // Se activa cada X milisegundos (5000 = 5s). Comentar para desactivar por completo.
    
    // --- Control Total de Colores y Estilos (Opcionales - Descomentar para activar) ---
    btnBg: 'var(--color-natura)',
    btnBgHover: 'var(--color-natura-hover-dark, #222222)',
    btnTextColor: 'var(--color-white, #ffffff)',
    btnTextColorHover: 'var(--color-white, #ffffff)',
    btnBorder: 'none',
    btnBorderHover: 'none',
    // btnWidth: '100%',                
    
    // --- Tiempos del Slide ---
    duration: 15000
  },
  {
    id: 'slide-simplicidad',
    themeVisibility: 'light',
    imageDesktop: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1920&q=80',
    imageMobile: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=600&q=80',
    title: 'LA MADERA NOS INSPIRA',
    subtitle: 'Creamos piezas artesanales de hermosa textura y pasión por los acabados.',
    
    // --- Posicionamiento y Layout ---
    textPosition: 'center-center',
    textPositionMobile: 'center-center',
    // mobileYOffset: '-90px',
    
    // --- Variaciones de Contenedores y Textos ---
    titleVariant: 'light',
    subtitleVariant: 'light',
    showDegradeBox: true,
    degradeBoxVariant: 'dark',
    degradeBoxOpacity: 0.6,
    
    // --- Configuración Atómica del Botón ---
    buttonText: 'Ver Proyectos',
    buttonLink: '/registro',
    buttonVariant: 'doubleCurtainSplit',
    buttonSize: 'md',                  // 'sm' (H:34px) | 'md' (H:42px) | 'lg' (H:50px)
    
    // --- Animación Inteligente en Móviles (UX Premium) ---
    // mobileAnimationInterval: 4000,   // Comentado por defecto si no se quiere aplicar a este objeto
    
    // --- Control Total de Colores y Estilos (Opcionales - Descomentar para activar) ---
    btnBg: 'var(--color-natura)',
    btnBgHover: 'var(--color-primary-dark, #110E0D)',
    btnTextColor: 'var(--color-white, #ffffff)',
    btnTextColorHover: 'var(--color-primary-light, #f5f5f5)',
    btnBorder: '2px solid var(--color-white, #ffffff)',
    btnBorderHover: '2px solid var(--color-primary-dark, #110E0D)',
    // btnWidth: '100%',
    
    // --- Tiempos del Slide ---
    duration: 15000
  },
  {
    id: 'slide-sistemas',
    themeVisibility: 'both',
    imageDesktop: 'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=1920&q=80',
    imageMobile: 'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=600&q=80',
    title: 'PIEZAS QUE PERDURAN',
    subtitle: 'Colecciones creadas para habitar tus espacios con belleza, calidez y armonía',
    
    // --- Posicionamiento y Layout ---
    textPosition: 'center-right',
    textPositionMobile: 'bottom-center',
    // mobileYOffset: '-40px',
    
    // --- Variaciones de Contenedores y Textos ---
    titleVariant: 'light',
    subtitleVariant: 'light',
    showDegradeBox: true,
    degradeBoxVariant: 'dark',
    degradeBoxOpacity: 0.8,
    
    // --- Configuración Atómica del Botón ---
    buttonText: 'Ver Catálogo',
    buttonLink: '/soluciones',
    buttonVariant: 'premiumGradient',
    buttonSize: 'md',                  // 'sm' (H:34px) | 'md' (H:42px) | 'lg' (H:50px)
    
    // --- Animación Inteligente en Móviles (UX Premium) ---
    mobileAnimationInterval: 6000,    // Se activa cada 6 segundos
    
    // --- Control Total de Colores y Estilos (Opcionales - Descomentar para activar) ---
    btnBg: 'linear-gradient(135deg, var(--color-natura) 40%, var(--color-clay-hover-dark) 100%)',
    btnBgHover: 'linear-gradient(135deg, var(--color-clay-hover-dark) 0%, var(--color-natura) 100%)',
    btnTextColor: 'var(--color-white, #ffffff)',
    btnTextColorHover: 'var(--color-white, #ffffff)',
    btnBorder: 'none',
    btnBorderHover: 'none',
    // btnWidth: '100%',
    
    // --- Tiempos del Slide ---
    duration: 15000
  }
];