// src/hooks/useSEO.js
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { defaultSEO } from '../seo/seoConfig';

export const useSEO = (customSEO = {}) => {
  // Leemos la configuración global del negocio (inyectada previamente por Zod en Redux)
  const cmsConfig = useSelector((state) => state.config?.business);

  useEffect(() => {
    // Prioridad de títulos: 1. El del producto/página actual > 2. El del CMS validado > 3. El Hardcodeado por defecto
    const finalTitle = customSEO.title || cmsConfig?.seoTitle || defaultSEO.title;
    const finalDescription = customSEO.description || cmsConfig?.seoDescription || defaultSEO.description;

    document.title = finalTitle;

    // Actualización dinámica de Meta Tags críticos para Google y Redes Sociales
    const updateMeta = (selector, attribute, value) => {
      const element = document.querySelector(selector);
      if (element) element.setAttribute(attribute, value);
    };

    updateMeta('meta[name="description"]', 'content', finalDescription);
    updateMeta('meta[property="og:title"]', 'content', finalTitle);
    updateMeta('meta[property="og:description"]', 'content', finalDescription);
    updateMeta('meta[property="og:image"]', 'content', customSEO.ogImage || defaultSEO.ogImage);
    
    // Inyección de enlace Canónico para evitar penalización por duplicidad
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', customSEO.canonicalUrl || window.location.href);

  }, [customSEO, cmsConfig]);
};