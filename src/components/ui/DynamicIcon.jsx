// src/components/ui/DynamicIcon.jsx
import * as Icons from 'lucide-react';

/**
 * Componente Motor para renderizar iconos de Lucide React de forma dinámica
 * @param {string} name - Nombre exacto del icono en Lucide (ej. "Hammer", "User")
 * @param {number} size - Tamaño del icono en píxeles (por defecto 18)
 * @param {string} className - Clases CSS adicionales para estilos e interacciones (:hover)
 */
const DynamicIcon = ({ name, size = 18, className = "" }) => {
  // Si no se proporciona un nombre de icono, salimos de forma limpia
  if (!name) return null;

  // Buscamos el componente del icono dentro del ecosistema de Lucide
  const LucideIcon = Icons[name];

  // Si el nombre no coincide con ningún icono real de la librería,
  // lanzamos un aviso en la consola de desarrollo para control tuyo y salimos en paz
  if (!LucideIcon) {
    console.warn(`[DynamicIcon]: El icono "${name}" no existe en la librería de Lucide React.`);
    return null;
  }

  // Renderizamos el componente de forma nativa como un SVG inyectado
  return <LucideIcon size={size} className={className} />;
};

export default DynamicIcon;