// src/components/ui/Button.jsx
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export const Button = ({ 
  children, 
  to, 
  variant = 'classic', 
  size = 'md',           
  mobileAnimationInterval, 
  className = '', 
  disabled = false,
  loading = false,
  type = 'button',
  customStyles = null, 
  style,
  buttonUtils = '',   // 🌟 Prop exclusivo para fondos / utilidades generales
  buttonBorder = '',  // 🌟 NUEVO: Prop exclusivo para inyectar bordes semánticos
  ...props 
}) => {
  
  const [isAwake, setIsAwake] = useState(false);

  useEffect(() => {
    if (!mobileAnimationInterval) return;
    const interval = setInterval(() => {
      setIsAwake(true);
      setTimeout(() => setIsAwake(false), 1200);
    }, mobileAnimationInterval);
    return () => clearInterval(interval);
  }, [mobileAnimationInterval]);

  // Manejo de tamaños
  const isSizeObject = typeof size === 'object' && size !== null;
  const sizeAttr = isSizeObject ? 'responsive' : size;
  const desktopSizeAttr = isSizeObject ? size.desktop : undefined;
  const mobileSizeAttr = isSizeObject ? size.mobile : undefined;

  // Sobreescritura de estilos por objeto (Multi-tenant)
  const hasCustomOverride = customStyles && (
    customStyles.bg || customStyles.text || customStyles.border ||
    customStyles.borderHover || customStyles.fontFamily || customStyles.fontWeight
  );

  const inlineVariables = hasCustomOverride ? {
    '--btn-custom-bg': customStyles.bg,
    '--btn-custom-bg-hover': customStyles.bgHover || customStyles.bg,
    '--btn-custom-text': customStyles.text || 'var(--color-white)',
    '--btn-custom-text-hover': customStyles.textHover || customStyles.text || 'var(--color-white)',
    '--btn-custom-border': customStyles.border || 'transparent',
    '--btn-custom-border-hover': customStyles.borderHover || 'transparent',
    '--custom-btn-width': customStyles.width || 'auto',
    '--text-custom-font': customStyles.fontFamily,
    '--text-custom-weight': customStyles.fontWeight
  } : undefined;

  // 🌟 CONSTRUCCIÓN DE CLASES TRANSPARENTE:
  // Acoplamos las clases estructurales junto con las bolsas utilitarias explícitas
  const buttonClasses = [
    'btn',
    `btn-${variant}`, 
    isAwake ? 'attentionPulse' : '',
    loading ? 'btnLoading' : '',
    className,
    buttonUtils,  // Inyección limpia de fondos
    buttonBorder  // Inyección limpia de bordes semánticos
  ].filter(Boolean).join(' ').trim();

  const finalStyles = { ...inlineVariables, ...style };

  // 🌟 FLAGS SEMÁNTICOS DIRECTOS: Sin adivinanzas en la string
  const dataAttributes = {
    'data-variant': variant,
    'data-size': sizeAttr,
    'data-desktop-size': desktopSizeAttr,
    'data-mobile-size': mobileSizeAttr,
    'data-override': hasCustomOverride ? 'true' : undefined,
    'data-has-custom-border': buttonBorder ? 'true' : 'false' // Si viene el prop, el CSS sabe qué hacer
  };

  const renderContent = () => (
    <>
      {loading && <span className="spinner" aria-hidden="true" />}
      <span className={loading ? 'text-hidden' : ''}>{children}</span>
    </>
  );

  // Saneamiento de props remanentes
  const cleanProps = { ...props };
  delete cleanProps.classes;

  if (to && !disabled && !loading) {
    return (
      <Link to={to} className={buttonClasses} style={finalStyles} {...dataAttributes} {...cleanProps}>
        {renderContent()}
      </Link>
    );
  }

  return (
    <button 
      type={type} 
      className={buttonClasses} 
      style={finalStyles} 
      disabled={disabled || loading}
      {...dataAttributes}
      {...cleanProps}
    >
      {renderContent()}
    </button>
  );
};

export default Button;