// src/analytics/analyticsListener.js
import { trackEvent } from './useAnalytics';

let isListening = false;

export const initAnalyticsListener = () => {
  // Evitamos registrar múltiples escuchadores en re-renders
  if (isListening) return;

  document.addEventListener('click', (event) => {
    // Busca el elemento clickeado o su ancestro más cercano con el atributo data-analytics-click
    const target = event.target.closest('[data-analytics-click]');
    
    if (target) {
      const eventType = target.getAttribute('data-analytics-click'); // Ej: "navbar-menu-item"
      const eventLabel = target.getAttribute('data-analytics-label'); // Ej: "Contacto"
      const eventId = target.getAttribute('data-analytics-id') || '';  // Ej: "contacto"

      trackEvent('click_interaction', {
        event_category: eventType,
        event_label: eventLabel,
        element_id: eventId,
      });
    }
  });

  isListening = true;
  console.log("🖱️ [Analytics Listener] Escuchando clics pasivos del DOM de forma global.");
};