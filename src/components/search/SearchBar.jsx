// src/components/search/SearchBar.jsx
import { useState, useTransition } from 'react';
import { Search } from 'lucide-react';
import { useCatalogSync } from '../../hooks/useCatalogSync';
import styles from './SearchBar.module.css';

const SearchBar = () => {
  const { products, loading, error } = useCatalogSync();
  const [query, setQuery] = useState('');
  const [filtered, setFiltered] = useState([]);
  const [totalMatches, setTotalMatches] = useState(0);
  const [isPending, startTransition] = useTransition();

  const handleSearch = (e) => {
    const value = e.target.value;
    setQuery(value);

    startTransition(() => {
      if (value.trim() === '') {
        setFiltered([]);
        setTotalMatches(0);
        return;
      }

      const matches = products.filter(product =>
        product.name.toLowerCase().includes(value.toLowerCase()) ||
        product.category.toLowerCase().includes(value.toLowerCase())
      );

      setTotalMatches(matches.length);
      setFiltered(matches);
    });
  };

  const handleClear = () => {
    setQuery('');
    setFiltered([]);
    setTotalMatches(0);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.searchContainer}>
        <input 
          type="text" 
          placeholder="Buscar productos y más..." 
          className={styles.searchInput}
          value={query}
          onChange={handleSearch}
          disabled={loading || error}
        />
        <button className={styles.searchButton} type="button" aria-label="Buscar">
          <Search size={20} />
        </button>
      </div>

      <div className={styles.statusFeedbackContainer}>
        {isPending && <span className={styles.searchStatus}>Buscando coincidencias locales...</span>}
      </div>
      
      {query && !loading && (
        <div className={styles.dropdownResults}>
          {filtered.length > 0 ? (
            <>
              <ul className={styles.resultsList}>
                {filtered.map(product => (
                  <li key={product.id} className={styles.searchItem}>
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      loading="lazy" 
                      className={styles.searchItemImg}
                    />
                    <div className={styles.searchItemInfo}>
                      <span className={styles.searchItemName}>{product.name}</span>
                      <span className={styles.searchItemCategory}>{product.category}</span>
                    </div>
                  </li>
                ))}
              </ul>

              <div className={styles.searchFooter}>
                <span>Viendo {totalMatches} opciones disponibles</span>
                <button 
                  className={styles.footerLink} 
                  onClick={handleClear}
                  type="button"
                >
                  Limpiar
                </button>
              </div>
            </>
          ) : (
            !isPending && <div className={styles.noResults}>No se encontraron coincidencias.</div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;