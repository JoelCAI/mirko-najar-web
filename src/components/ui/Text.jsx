// src/components/ui/Text.jsx

const SIZE_MAP = {
  xs: 'textXs',
  sm: 'textSm',
  base: 'textBase',
  lg: 'textLg',
  xl: 'textXl',
  '2xl': 'text2xl',
  '3xl': 'text3xl',
  '4xl': 'text4xl',
  heroTitle: 'textHeroTitle',
  heroSubtitle: 'textHeroSubtitle'
};

export const Text = ({ 
  as: Component = 'p',          // Mantiene la semántica HTML (p, h1, h2, span, etc.)
  size = 'base',                // Tamaño utilitario por defecto
  children, 
  customTypographyStyles = null, // Tu estándar de datos unificado
  className = '',
  ...props 
}) => {
  // 1. Resolvemos la clase estructural de tamaño
  const sizeClass = SIZE_MAP[size] || 'textBase';
  
  // 2. Filtramos quirúrgicamente si vienen anulaciones del cliente en el JS de configuración
  const hasCustomOverride = customTypographyStyles && (
    customTypographyStyles.fontSize || 
    customTypographyStyles.fontFamily || 
    customTypographyStyles.color ||
    customTypographyStyles.fontWeight
  );
  
  const overrideClass = hasCustomOverride ? 'textCustomOverride' : '';

  // 3. Mapeamos hacia el diccionario de variables CSS nativas que entiende el typography.css
  const inlineStyles = hasCustomOverride ? {
    '--text-custom-size': customTypographyStyles.fontSize || 'unset',
    '--text-custom-font': customTypographyStyles.fontFamily || 'unset',
    '--text-custom-color': customTypographyStyles.color || 'unset',
    '--text-custom-weight': customTypographyStyles.fontWeight || 'unset',
  } : undefined;

  // 4. Inyección atómica directa al DOM
  return (
    <Component 
      className={`uiText ${sizeClass} ${overrideClass} ${className}`.trim()}
      style={inlineStyles}
      {...props}
    >
      {children}
    </Component>
  );
};

export default Text;