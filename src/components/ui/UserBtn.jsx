// src/components/ui/UserBtn.jsx
import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { User as UserIcon } from 'lucide-react';
import { userMenuOptions } from '../../config/navigationConfig';
import styles from './UserBtn.module.css';

const UserBtn = ({ isMobile = false, closeMainMenu }) => {
  const [isOpenMobile, setIsOpenMobile] = useState(false);
  const containerRef = useRef(null);

  // Cerrar el menú si se hace clic fuera del componente
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpenMobile(false);
      }
    };

    if (isOpenMobile) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('touchstart', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [isOpenMobile]);

  const handleLinkClick = () => {
    setIsOpenMobile(false);
    if (closeMainMenu) closeMainMenu();
  };

  if (isMobile) {
    return (
      <div className={styles.mobileWrapper} ref={containerRef}>
        <button 
          type="button"
          className={`${styles.userBtn} ${styles.mobile} ${isOpenMobile ? styles.activeMobile : ''}`}
          onClick={() => setIsOpenMobile(!isOpenMobile)}
          aria-label="Menú de usuario móvil"
        >
          <UserIcon size={24} strokeWidth={1.5} />
        </button>
        
        {isOpenMobile && (
          <ul className={styles.userDropdownMobile} role="menu">
            {userMenuOptions.map((opt, i) => (
              <li key={i} role="none">
                <Link to={opt.path} role="menuitem" onClick={handleLinkClick}>
                  {opt.label}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  }

  return (
    <div className={styles.desktopWrapper}>
      <button 
        type="button" 
        className={`${styles.userBtn} ${styles.desktop}`}
        aria-label="Menú de usuario"
      >
        <UserIcon size={20} />
      </button>

      {/* El dropdown de escritorio se apoya en el hover del contenedor modular */}
      <ul className={styles.dropdownDesktop} role="menu">
        {userMenuOptions.map((opt, i) => (
          <li key={i} role="none">
            <Link to={opt.path} role="menuitem">{opt.label}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserBtn;