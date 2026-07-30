// src/services/authService.js
import { store } from '../store/store';
import { loginSuccess, logoutSuccess, setAuthLoading } from '../store/slices/authSlice';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://api.tucascaron.workers.dev';

/**
 * 1. Inicia el viaje de autenticación (Google / Zoho)
 * Redirige a Pablito al búnker del backend que maneja el 2FA seguro
 */
export const initiateSocialLogin = (provider = 'google') => {
  // Redirección directa al servidor. El backend se encarga de hablar con Google/Zoho
  // y exigir el Doble Factor de Autenticación en sus propias plataformas seguras.
  window.location.href = `${API_BASE_URL}/auth/login/${provider}`;
};

/**
 * 2. Verifica el estado de la sesión al arrancar la aplicación
 * El cascarón le pregunta al Worker: "¿Pablito ya pasó el login y el 2FA?"
 */
export const checkAuthStatus = async () => {
  store.dispatch(setAuthLoading(true));
  try {
    // Usamos credentials: 'include' para que el navegador envíe las cookies seguras HttpOnly al Worker
    const response = await fetch(`${API_BASE_URL}/auth/session`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    });

    if (response.ok) {
      const data = await response.json(); // El worker responde: { user: {...}, permissions: [...] }
      // ⚡ Hidratamos instantáneamente el estado global de Redux
      store.dispatch(loginSuccess({ user: data.user, permissions: data.permissions }));
    } else {
      store.dispatch(logoutSuccess());
    }
  } catch (error) {
    console.error("🚨 Error de comunicación en el control de acceso Auth:", error);
    store.dispatch(logoutSuccess()); // Ante la duda o caída de red, bloqueamos por seguridad
  } finally {
    store.dispatch(setAuthLoading(false));
  }
};

/**
 * 3. Cierra la sesión de forma segura tanto en el cliente como en el Worker
 */
export const logoutUser = async () => {
  try {
    await fetch(`${API_BASE_URL}/auth/logout`, { method: 'POST' });
  } catch (error) {
    console.error("🚨 No se pudo notificar el cierre de sesión al servidor:", error);
  } finally {
    // El cliente se limpia sí o sí, borrando los datos de la memoria RAM
    store.dispatch(logoutSuccess());
    window.location.href = '/login';
  }
};