// src/components/ui/Button.jsx
import { Link } from 'react-router-dom';
import styles from './Button.module.css';

const Button = ({ 
  children, 
  to, 
  variant = 'primary', // primary, secondary, outline, text
  size = 'md',         // sm, md, lg
  className = '', 
  disabled = false,
  loading = false,
  type = 'button',
  ...props 
}) => {
  // Combinar clases dinámicamente según variantes y tamaños
  const buttonClasses = [
    styles.btn,
    styles[variant],
    styles[size],
    loading ? styles.loading : '',
    className
  ].join(' ').trim();

  // Si tiene la propiedad "to", se comporta de forma nativa como un Link de React Router
  if (to && !disabled) {
    return (
      <Link to={to} className={buttonClasses} {...props}>
        {children}
      </Link>
    );
  }

  // De lo contrario, actúa como un botón estándar de HTML
  return (
    <button 
      type={type} 
      className={buttonClasses} 
      disabled={disabled || loading} 
      {...props}
    >
      {loading ? <span className={styles.spinner}></span> : children}
    </button>
  );
};

export default Button;