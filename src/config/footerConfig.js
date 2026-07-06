/* src/config/footerConfig.js */

export const footerBlocks = {
  branding: {
    title: "SÍGUENOS",
    socialLinksRow1: [
      { id: "facebook", url: "https://facebook.com", label: "Facebook" },
      { id: "instagram", url: "https://instagram.com", label: "Instagram" },
      { id: "x", url: "https://x.com", label: "X (Twitter)" },
      { id: "tiktok", url: "https://tiktok.com", label: "TikTok" },
    ],
    socialLinksRow2: [
      { id: "linkedin", url: "https://linkedin.com", label: "LinkedIn" },
      { id: "youtube", url: "https://youtube.com", label: "YouTube" },
      { id: "pinterest", url: "https://pinterest.com", label: "Pinterest" },
    ]
  },

  menu: {
    title: "NOSOTROS",
    navigation: [
      {
        title: "Nosotros",
        links: [
          { label: "Quiénes Somos", path: "/nosotros" },
          { label: "Contacto", path: "/contacto" },
          { label: "Ayuda y Soporte", path: "/ayuda" }
        ]
      },
      {
        title: "Servicios",
        links: [
          { label: "Fabricación a Medida", path: "/servicios/fabricacion" },
          { label: "Acabados Finos", path: "/servicios/acabados" },
          { label: "Restauración", path: "/servicios/restauracion" }
        ]
      },
      {
        title: "Legal",
        links: [
          { label: "Términos de Servicio", path: "/legal/terminos" },
          { label: "Política de Privacidad", path: "/legal/privacidad" },
          { label: "Cookies", path: "/legal/cookies" }
        ]
      }
    ]
  },

  contact: {
    title: "CONTACTO",
    items: [
      { iconName: "Phone", text: "+51 918 471 292", href: "tel:+51918471292" },
      { iconName: "Mail", text: "info@somosinnovar.com", href: "mailto:info@somosinnovar.com" },
      { iconName: "MapPin", text: "Av. Primavera 1230, Surco, Lima", href: "https://maps.google.com" },
      { iconName: "Clock", text: "Lun - Vie: 9:00 AM - 6:00 PM", href: null }
    ]
  },

  location: {
    title: "UBICACIÓN",
    googleMapsEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3289.374759058282!2d-58.90839662463211!3d-34.46801615034354!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bc9cb88cf12b59%3A0xb1a011f79c8d24f6!2sCatamarca%20421%2C%20B1629%20Pilar%2C%20Provincia%20de%20Buenos%20Aires%2C%20Argentina!5e0!3m2!1ses-419!2spe!4v1783320167612!5m2!1ses-419!2spe"
  }
};

export const footerConfig = {
  columnOrder: ['location', 'branding', 'menu', 'contact'], 
  copyright: `© ${new Date().getFullYear()} Muebles Hogar. Todos los derechos reservados.`,
  switches: {
    showBranding: true,
    showMenu: true,
    showContact: true,
    showLocation: true
  }
};