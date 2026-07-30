// src/components/hero/heroslider/HeroSlider.seo.js

export const generateSliderMicrodata = (slides = [], siteUrl = "https://pablito.com") => {
  if (!slides || slides.length === 0) return null;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "numberOfItems": slides.length, // ¡Dinámico! Si hay 3 slides, vale 3. Si hay 5, vale 5.
    "itemListElement": slides.map((slide, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "url": `${siteUrl}${slide.buttonLink || ''}`,
      "name": slide.title,
      "description": slide.subtitle || ""
    }))
  };

  return JSON.stringify(jsonLd);
};