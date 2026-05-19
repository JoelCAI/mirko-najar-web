// src/components/ui/ThemeToggle.jsx
import { useState } from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';
import styles from './ThemeToggle.module.css';

const ThemeToggle = ({ isMobile = false }) => {
  // Consumimos el estado y la función global del Satélite
  const { theme, toggleTheme } = useTheme();
  
  // Nos traemos intacto tu control de feedback visual con delay para móvil
  const [isTransitioningTheme, setIsTransitioningTheme] = useState(false);

  const handleToggle = () => {
    if (isTransitioningTheme) return;
    
    setIsTransitioningTheme(true);

    // Tu delay exacto de 400ms
    setTimeout(() => {
      toggleTheme();
      setIsTransitioningTheme(false);
    }, 400);
  };

  // Si es versión móvil y está transicionando, aplica tu clase táctil especial
  const mobileActiveStyle = (isMobile && isTransitioningTheme) 
    ? styles.themeToggleActiveMobile 
    : '';

  return (
    <button 
      type="button" 
      className={`${styles.themeToggleBtn} ${mobileActiveStyle}`} 
      onClick={handleToggle}
      aria-label={`Cambiar a modo ${theme === 'light' ? 'oscuro' : 'claro'}`}
    >
      {theme === 'light' ? (
        <Moon size={isMobile ? 22 : 20} strokeWidth={isMobile ? 1.5 : 1.8} />
      ) : (
        <Sun size={isMobile ? 22 : 20} strokeWidth={isMobile ? 1.5 : 1.8} />
      )}
    </button>
  );
};

export default ThemeToggle;