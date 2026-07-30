// src/analytics/useAnalytics.js

/**
 * Despacha de forma segura un evento personalizado a Google Analytics (gtag)
 * si es que ha sido inicializado por el CMS.
 */
export const trackEvent = (eventName, params = {}) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, {
      ...params,
      // Google Analytics prefiere recibir parámetros planos
      event_callback: params.callback || null
    });
  }
};