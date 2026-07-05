// src/components/ui/CartBtn.jsx
import { ShoppingCart } from 'lucide-react';
import styles from './CartBtn.module.css';

const CartBtn = ({ isMobile = false, toggleCartMenu }) => {
  // Simulación de estado para el contador de productos (Badge)
  const totalItems = 5; 

  const handleCartClick = () => {
    // 🛒 Comportamiento unificado (Estándar): 
    // Ejecuta la función para abrir el modal/drawer con scroll de items, 
    // sin importar si está en Escritorio, Tablet o Móvil.
    if (toggleCartMenu) {
      toggleCartMenu();
    } else {
      console.log("Falta pasar la propiedad 'toggleCartMenu' para abrir el panel del carrito");
    }
  };

  return (
    <button 
      type="button" 
      className={`${styles.cartBtn} ${isMobile ? styles.mobile : styles.desktop}`} 
      onClick={handleCartClick}
      aria-label="Ver carrito de compras"
    >
      <div className={styles.iconWrapper}>
        <ShoppingCart size={isMobile ? 22 : 20} strokeWidth={isMobile ? 1.5 : 1.8} />
        {totalItems > 0 && (
          <span className={styles.badge}>
            {totalItems}
          </span>
        )}
      </div>
    </button>
  );
};

export default CartBtn;