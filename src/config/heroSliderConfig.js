// src/config/heroSliderConfig.js

//"top-left","top-center","top-right"
//"center-left","center-center","center-right"
//"bottom-left","bottom-center","bottom-right"

export const heroSliders = [
  {
    id: 'slide-arquitectura',
    themeVisibility: 'dark',
    imageDesktop: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1920&q=80',
    imageMobile: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80',
    title: 'ARQUITECTURA DE VANGUARDIA',
    subtitle: 'Estructuras pensadas para resistir y destacar en entornos corporativos.',
    textPosition: 'center-left',       // Desktop se queda libre en sus 9 posiciones
    textPositionMobile: 'center-center', // Móvil controlado (top-center, center-center, bottom-center)
    //mobileYOffset: '-90px',
    titleVariant: 'light',      
    subtitleVariant: 'light',   
    showDegradeBox: true,         
    degradeBoxVariant: 'dark',     
    degradeBoxOpacity: 1,    
    buttonText: 'Ver Proyectos',
    buttonLink: '/proyectos',
    buttonVariant: 'primary',
    duration: 15000
  },
  {
    id: 'slide-sistemas',
    themeVisibility: 'both',
    imageDesktop: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1920&q=80',
    imageMobile: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=600&q=80',
    title: 'SISTEMAS INMERSIVOS',
    subtitle: 'Diseño conceptual aplicado al control total de datos.',
    textPosition: 'bottom-right',
    textPositionMobile: 'bottom-center', // Ajustado abajo para no tapar el centro de la imagen en móvil
    //mobileYOffset: '-90px',
    titleVariant: 'light',       
    subtitleVariant: 'light',    
    showDegradeBox: true,          
    degradeBoxVariant: 'dark',    
    degradeBoxOpacity: 0.8,       
    buttonText: 'Explorar Soluciones',
    buttonLink: '/soluciones',
    buttonVariant: 'outline',
    duration: 15000
  },
  {
    id: 'slide-simplicidad',
    themeVisibility: 'light',
    imageDesktop: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1920&q=80',
    imageMobile: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=600&q=80',
    title: 'SIMPLICIDAD ABSOLUTA',
    subtitle: 'Espacios limpios donde la información fluye sin interrupciones.',
    textPosition: 'center-right',
    textPositionMobile: 'top-center', // Posicionado arriba en smartphones
    //mobileYOffset: '-90px',
    titleVariant: 'light',       
    subtitleVariant: 'light',    
    showDegradeBox: true,          
    degradeBoxVariant: 'dark',     
    degradeBoxOpacity: 0.6,        
    buttonText: 'Comenzar',
    buttonLink: '/registro',
    buttonVariant: 'secondary',
    duration: 15000
  }
];