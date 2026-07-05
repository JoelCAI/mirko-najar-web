/* src/config/themeConfig.js */

export const themeConfig = {
  // Estado inicial por defecto si no hay nada en localStorage
  initialTheme: 'light',       // 'light' o 'dark'
  
  // Lógica del chasis líquido para el Navbar fijo
  isTransparent: true         // true: Contenido en píxel 0. false: Contenido empuja 70px abajo.
};