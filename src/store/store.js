import { configureStore } from '@reduxjs/toolkit';
import configReducer from './slices/configSlice';
import themeReducer from './slices/themeSlice';
import cartReducer from './slices/cartSlice';
import uiReducer from './slices/uiSlice';
import { configCmsSchema } from '../config/schemas';

const parsePreloadedState = () => {
  // 1. Extraemos los datos a una constante local del módulo
  const rawData = window.__INITIAL_CONFIG__;
  
  if (!rawData) return undefined;

  // 2. 🔥 DESTRUCTOR: Borramos la variable global de inmediato.
  // Pasa a ser 'undefined' para cualquiera que intente leer window.__INITIAL_CONFIG__ desde la consola.
  try {
    delete window.__INITIAL_CONFIG__;
  } catch {
    window.__INITIAL_CONFIG__ = undefined; // Fallback por si el modo estricto bloquea el delete
  }

  try {
    // 3. Validamos los datos localmente con Zod
    const validatedConfig = configCmsSchema.parse(rawData);
    
    return {
      config: validatedConfig
    };
  } catch (error) {
    console.error("🚨 Zod detuvo datos corruptos en la carga inicial:", error.errors);
    return undefined; 
  }
};

export const store = configureStore({
  reducer: {
    config: configReducer,
    theme: themeReducer,
    cart: cartReducer,
    ui: uiReducer,
  },
  preloadedState: parsePreloadedState()
});