// src/components/hero/heroslider/HeroSlider.analytics.js

/**
 * Abstracción limpia para analíticas locales o externas.
 * Evita acoplar Google Analytics, Mixpanel o Cloudflare Web Analytics dentro del JSX.
 */
export const trackHeroEvent = {
  // Cuando un slide se vuelve visible ante los ojos del usuario
  slideView: (slideId, title, index) => {
    console.log(`📊 [Analytics] Banner Visto: [#${index}] ID: ${slideId} - "${title}"`);
    if (window.gtag) {
      window.gtag('event', 'hero_slide_view', { slide_id: slideId, slide_title: title, position: index });
    }
  },

  // Cuando Pablito logra que un cliente potencial presione el CTA (Call To Action)
  buttonClick: (slideId, buttonText, targetLink) => {
    console.log(`📊 [Analytics] Clic en CTA: Slide: ${slideId} | Botón: "${buttonText}" ──> ${targetLink}`);
    if (window.gtag) {
      window.gtag('event', 'hero_cta_click', { slide_id: slideId, button_text: buttonText, destination: targetLink });
    }
  }
};