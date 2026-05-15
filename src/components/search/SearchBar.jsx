import { Search } from 'lucide-react';
import styles from './SearchBar.module.css';

const SearchBar = () => {
  return (
    <div className={styles.searchContainer}>
      <input 
        type="text" 
        placeholder="Buscar muebles, lámparas, mesas..." 
        className={styles.searchInput}
      />
      <button className={styles.searchButton}>
        <Search size={18} />
      </button>
    </div>
  );
};

export default SearchBar;