// src/analytics/providers/googleAnalyticsProvider.js

export const initializeGA = (gaId) => {
  if (!gaId) return;

  console.log(`🛡️ [Google Analytics] Activado en modo puramente estadístico. Cero cookies de perfil.`);

  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  window.gtag = function () {
    window.dataLayer.push(arguments);
  };

  // Restricción máxima para saltarnos la necesidad del banner legal
  window.gtag('consent', 'default', {
    'ad_storage': 'denied',
    'analytics_storage': 'granted', // Permite contar el clic de forma disociada
    'personalization_storage': 'denied',
    'ad_user_data': 'denied',
    'ad_personalization': 'denied'
  });

  window.gtag('js', new Date());
  window.gtag('config', gaId, {
    anonymize_ip: true,
    allow_google_signals: false, // Evita perfiles cruzados
    restricted_data_processing: true
  });
};