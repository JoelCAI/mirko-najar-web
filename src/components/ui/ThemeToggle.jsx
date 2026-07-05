// src/components/ui/ThemeToggle.jsx
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';
import styles from './ThemeToggle.module.css';

const ThemeToggle = ({ isMobile = false }) => {
  // Ahora consumimos los superpoderes atómicos de Redux a través de tu hook limpio
  const { theme, toggleTheme } = useTheme();

  return (
    <button 
      type="button" 
      className={styles.themeToggleBtn} 
      onClick={toggleTheme} // ⚡ Ejecución directa e instantánea (0ms)
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