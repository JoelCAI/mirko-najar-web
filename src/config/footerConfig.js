// src/config/footerConfig.js
import { TYPOGRAPHY_SCALE } from './navigationConfig'; 

export const footerConfig = {
  brand: {
    logoText: "MUEBLES HOGAR",
    description: "Pasión por el Diseño",
    copyright: `© ${new Date().getFullYear()} Muebles Hogar. Todos los derechos reservados.`
  },
  
  // CONTROL TIPOGRÁFICO DE COMPONENTE
  typography: {
    desktop: {
      logo: TYPOGRAPHY_SCALE.md,          /* 18px */
      titles: TYPOGRAPHY_SCALE.md,        /* Cambiado a .md (18px) para igualar a MADERA HOGAR */
      description: TYPOGRAPHY_SCALE.sm,   /* 16px */
      links: TYPOGRAPHY_SCALE.sm,         /* 16px */
      items: TYPOGRAPHY_SCALE.sm,         /* 16px */
      copyright: TYPOGRAPHY_SCALE.xs      /* 14px */   
    },
    mobile: {
      logo: TYPOGRAPHY_SCALE.md,          /* 18px */
      titles: TYPOGRAPHY_SCALE.xs,        /* 14px */
      description: TYPOGRAPHY_SCALE.xs,   /* 14px */
      links: TYPOGRAPHY_SCALE.xs,         /* 14px */
      items: TYPOGRAPHY_SCALE.xs,         /* 14px */
      copyright: TYPOGRAPHY_SCALE.xs      /* 14px */
    }
  },

  // Agrupación unificada de menús para el Bloque 2
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

  // CONFIGURACIÓN DE REDES SOCIALES DIVIDIDA EN DOS FILAS CENTRADAS INDEPENDIENTES
  // Cada fila soporta hasta 4 iconos manteniendo simetría absoluta.
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
    // Puedes dejar 1, 2, 3 o 4 aquí y siempre se verán centrados respecto al total.
  ],

  googleMapsEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3901.1718228168233!2d-76.99369992397127!3d-12.100344488141443!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9105c7ef951e7fb7%3A0x64790a88090886ff!2sAv.%20Primavera%201230%2C%20Santiago%20de%20Surco%2015038!5e0!3m2!1ses-419!2spe!4v1716500000000!5m2!1ses-419!2spe"
};