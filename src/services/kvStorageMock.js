// src/services/kvStorageMock.js
import { mockInitialData } from '../config/mockInitialData';

const KV_NAMESPACE = 'CORE_V1_CONFIG';

export const kvStorageMock = {
  /**
   * Obtiene la configuración completa desde el "KV" (localStorage)
   */
  async get() {
    // Simulamos latencia de red de Cloudflare (50ms)
    await new Promise(resolve => setTimeout(resolve, 50));
    
    const data = localStorage.getItem(KV_NAMESPACE);
    if (!data) {
      // Si el KV está vacío por ser la primera vez, sembramos los datos iniciales de Pablito
      localStorage.setItem(KV_NAMESPACE, JSON.stringify(mockInitialData));
      return mockInitialData;
    }
    return JSON.parse(data);
  },

  /**
   * Guarda los cambios que haga el administrador en el panel
   */
  async put(newData) {
    await new Promise(resolve => setTimeout(resolve, 80));
    localStorage.setItem(KV_NAMESPACE, JSON.stringify(newData));
    console.log('💾 [Cloudflare KV Simulado] Configuración actualizada con éxito.');
    return true;
  }
};