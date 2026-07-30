// src/components/ui/CartBtn.jsx
import { ShoppingCart } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleCart } from '../../store/slices/uiSlice'; // Control de interfaz
import styles from './CartBtn.module.css';

const CartBtn = ({ isMobile = false }) => {
  const dispatch = useDispatch();

  // 🛒 Lectura reactiva y en tiempo real del contador del carrito global
  const totalItems = useSelector((state) => state.cart.totalQuantity);

  const handleCartClick = () => {
    // ⚡ Dispara la apertura/cierre del panel lateral sin depender de funciones padre
    dispatch(toggleCart());
  };

  return (
    <button 
      type="button" 
      className={`${styles.cartBtn} ${isMobile ? styles.mobile : `${styles.desktop} u-svg-glow-off-interactive`}`} 
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