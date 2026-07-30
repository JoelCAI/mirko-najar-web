// src/hooks/useCatalogSync.js
import { useState, useEffect } from 'react';
import localBusiness from '../config/localBusiness.json';
import { getProductsFromLocal, saveProductsToLocal } from '../services/indexedDb';

export const useCatalogSync = () => {
  const [products, setProducts] = useState([]); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 

  useEffect(() => {
    const syncCatalog = async () => {
      try {
        // En lugar de una variable estática externa, leemos el ID comercial de nuestro archivo localBusiness
        const tenantId = localBusiness.identity.id; // 'muebles-hogar' o el de Pablito
        const localVersion = localStorage.getItem('catalog_version');
        
        // Versión del catálogo para invalidar la caché en IndexedDB (ej: año + mes + número de cambio)
        const currentVersion = "2026.07.01"; 

        const fetchRemoteCatalog = async () => {
          const response = await fetch('/data/products.json');
          if (!response.ok) throw new Error('Error al sincronizar con el servidor.');
          const rawData = await response.json();
          // Filtramos que correspondan al negocio actual para evitar colisiones multi-inquilino (multi-tenant)
          return rawData.filter(item => item.tenant_id === tenantId || item.tenant_id === "ebanisterias_najar_001");
        };

        // --- FLUJO A: ACTUALIZACIÓN DE VERSIÓN ---
        if (localVersion !== currentVersion) {
          localStorage.setItem('catalog_version', currentVersion);
          const remoteData = await fetchRemoteCatalog();
          
          await saveProductsToLocal(remoteData); 
          setProducts(remoteData);
          setLoading(false);
          return;
        }

        // --- FLUJO B: CAMINO DIRECTO EN ALTA VELOCIDAD (DISCO LOCAL) ---
        const localData = await getProductsFromLocal(); 
        if (localData && localData.length > 0) { 
          setProducts(localData);
          setLoading(false);
          return; 
        }

        // --- FLUJO C: CACHÉ LOCAL COINCIDENTE PERO VACÍA ---
        const remoteData = await fetchRemoteCatalog();
        await saveProductsToLocal(remoteData); 
        setProducts(remoteData);
      } catch (err) {
        setError("Fallo en la sincronización del catálogo."); 
        console.error("Fallo crítico en sincronización:", err); 
      } finally {
        setLoading(false); 
      }
    };

    syncCatalog();
  }, []);

  return { products, loading, error };
};