// src/components/ui/Button.jsx
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './Button.module.css';

const Button = ({ 
  children, 
  to, 
  variant = 'primary', 
  size = 'md',          
  mobileAnimationInterval, // Recibe el intervalo en milisegundos (Ej: 5000)
  className = '', 
  disabled = false,
  loading = false,
  type = 'button',
  style,                
  ...props 
}) => {
  const [isAwake, setIsAwake] = useState(false);

  useEffect(() => {
    // Si no hay intervalo configurado, no hace nada
    if (!mobileAnimationInterval) return;

    const interval = setInterval(() => {
      setIsAwake(true);
      // Apaga la animación después de 1.2 segundos (lo que dura el destello visual)
      setTimeout(() => setIsAwake(false), 1200);
    }, mobileAnimationInterval);

    return () => clearInterval(interval);
  }, [mobileAnimationInterval]);

  const buttonClasses = [
    styles.btn,
    styles[variant],
    styles[size],       
    isAwake ? styles.attentionPulse : '', // Inyecta la clase de aviso temporal
    loading ? styles.loading : '',
    className
  ].join(' ').trim();

  if (to && !disabled) {
    return (
      <Link to={to} className={buttonClasses} style={style} {...props}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} {...props} className={buttonClasses} disabled={disabled || loading} style={style}>
      {loading ? <span className={styles.spinner}></span> : children}
    </button>
  );
};

export default Button;