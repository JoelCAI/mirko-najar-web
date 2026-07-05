/* src/config/footerConfig.js */

export const footerData = {
  brand: {
    logoText: "MUEBLES HOGAR",
    description: "Pasión por el Diseño",
    copyright: `© ${new Date().getFullYear()} Muebles Hogar. Todos los derechos reservados.`
  },
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
  ],
  contactInfo: {
    title: "Contacto",
    items: [
      { iconName: "Phone", text: "+51 918 471 292", href: "tel:+51918471292" },
      { iconName: "Mail", text: "info@somosinnovar.com", href: "mailto:info@somosinnovar.com" },
      { iconName: "MapPin", text: "Av. Primavera 1230, Surco, Lima", href: "https://maps.google.com" },
      { iconName: "Clock", text: "Lun - Vie: 9:00 AM - 6:00 PM", href: null }
    ]
  },
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
  ],
  googleMapsEmbedUrl: "https://maps.google.com"
};

export const footerConfig = {
  // ⚡ ORQUESTADOR DE SLOTS: El orden físico de las 4 columnas exactas en Escritorio
  columnOrder: ['branding', 'empty', 'menu', 'contact'], 
  switches: {
    showBranding: true,
    showMenu: true,
    showContact: true,
    showLocation: false // Si se activa, reemplaza un slot o expande según configuración
  }
};