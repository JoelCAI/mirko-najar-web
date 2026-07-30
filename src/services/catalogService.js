// src/services/catalogService.js
import { siteConfig } from '../config/siteConfig';

// La URL base de tu Cloudflare Worker de producción o desarrollo
const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://api.tucascaron.workers.dev';

/**
 * Hace la petición HTTP directa al Worker en el Edge para traer el catálogo real
 */
export const fetchCatalogFromWorker = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/catalog?tenantId=${siteConfig.tenantId}`);
    
    if (!response.ok) {
      throw new Error(`Error en el servidor Edge: ${response.status}`);
    }
    
    const data = await response.json();
    return data.products || []; // Devuelve el catálogo crudo para que useCatalogSync lo pase por Zod
  } catch (error) {
    console.error("🚨 Fallo de conexión entre el Cascarón y el Cloudflare Worker:", error);
    throw error; // Lanza el error para que el hook active la red de seguridad offline
  }
};