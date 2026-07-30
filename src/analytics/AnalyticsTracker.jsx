// src/analytics/AnalyticsTracker.jsx

import { useEffect } from 'react';
import { initializeAnalytics } from './indexAnalytics';

export const AnalyticsTracker = ({ analyticsConfig }) => {
  useEffect(() => {
    const gaId = analyticsConfig?.googleAnalyticsId;

    // 🛡️ Validador Inteligente: Si no hay ID o es el marcador de ejemplo, abortamos la ejecución
    if (!gaId || gaId.trim() === "" || gaId.includes("XXXXX")) {
      console.log("🔒 [Analytics] Desactivado de forma segura: No se detectó un ID de Google Analytics válido.");
      return;
    }

    const triggerAnalytics = () => {
      initializeAnalytics(analyticsConfig);
    };

    // Retraso para dar prioridad absoluta al LCP del HeroSlider
    if ('requestIdleCallback' in window) {
      window.requestIdleCallback(() => triggerAnalytics(), { timeout: 2000 });
    } else {
      setTimeout(triggerAnalytics, 2000);
    }
  }, [analyticsConfig]);

  return null;
};

export default AnalyticsTracker;