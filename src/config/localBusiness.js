// src/config/localBusiness.js
export const localBusiness = {
  // =========================
  // IDENTIDAD DEL NEGOCIO
  // =========================
  identity: {
    id: "muebles-hogar",
    name: "Muebles Hogar",
    legalName: "Muebles Hogar SAC",
    slogan: "Pasión por el Diseño",
    foundedYear: 2012,

    type: "FurnitureStore", // Schema.org type
    entityType: "LocalBusiness",

    taxId: "20512345678",

    description:
      "Diseñamos y fabricamos muebles personalizados modernos para hogares, oficinas y departamentos en Lima.",

    shortDescription:
      "Muebles modernos personalizados en Lima."
  },

  // =========================
  // UBICACIÓN
  // =========================
  location: {
    address: "Av. Primavera 1230",
    district: "Santiago de Surco",
    city: "Lima",
    region: "Lima",
    country: "Perú",
    postalCode: "15038",

    coordinates: {
      lat: -12.100344,
      lng: -76.993699
    },

    geo: {
      latitude: -12.100344,
      longitude: -76.993699
    },

    maps: {
      googleMapsUrl:
        "https://maps.google.com/?q=-12.100344,-76.993699"
    },

    areaServed: [
      "Lima",
      "Santiago de Surco",
      "Miraflores",
      "San Isidro",
      "La Molina",
      "Barranco"
    ]
  },

  // =========================
  // CONTACTO
  // =========================
  contact: {
    phone: "+51 918 471 292",
    whatsapp: "51918471292",
    whatsappMessage:
      "Hola, quiero información sobre muebles personalizados.",

    email: "info@muebleshogar.com",

    contactPerson: {
      name: "Equipo Comercial",
      role: "Atención al Cliente"
    }
  },

  // =========================
  // REDES SOCIALES
  // =========================
  social: {
    facebook: "https://facebook.com/muebleshogar",
    instagram: "https://instagram.com/muebleshogar",
    linkedin: "https://linkedin.com/company/muebleshogar",
    tiktok: "https://tiktok.com/@muebleshogar",
    youtube: "https://youtube.com/@muebleshogar"
  },

  // =========================
  // URLs OFICIALES
  // =========================
  urls: {
    website: "https://muebleshogar.com",

    home: "https://muebleshogar.com",
    catalog: "https://muebleshogar.com/catalogo",
    blog: "https://muebleshogar.com/blog",
    about: "https://muebleshogar.com/nosotros",
    contact: "https://muebleshogar.com/contacto",

    privacyPolicy:
      "https://muebleshogar.com/politica-de-privacidad",

    terms:
      "https://muebleshogar.com/terminos-y-condiciones"
  },

  // =========================
  // NEGOCIO
  // =========================
  business: {
    priceRange: "$$",
    currency: "PEN",

    serviceType: "Muebles personalizados",

    businessModel: [
      "Diseño personalizado",
      "Fabricación",
      "Instalación"
    ],

    paymentMethods: [
      "Efectivo",
      "Transferencia bancaria",
      "Tarjeta de crédito",
      "Yape",
      "Plin"
    ],

    languages: ["es", "en"],

    audience: [
      "Hogares",
      "Oficinas",
      "Empresas",
      "Departamentos"
    ]
  },

  // =========================
  // HORARIOS
  // =========================
  openingHours: {
    monday: "09:00-18:00",
    tuesday: "09:00-18:00",
    wednesday: "09:00-18:00",
    thursday: "09:00-18:00",
    friday: "09:00-18:00",
    saturday: "09:00-14:00",
    sunday: "Closed"
  },

  // =========================
  // MEDIA / IMÁGENES
  // =========================
  media: {
    logo: "/images/logo.png",

    favicon: "/favicon.ico",

    coverImage: "/images/cover.jpg",

    ogImage: "/images/og-image.jpg",

    showroomImages: [
      "/images/showroom/showroom-1.jpg",
      "/images/showroom/showroom-2.jpg",
      "/images/showroom/showroom-3.jpg"
    ]
  },

  // =========================
  // SEO GLOBAL
  // =========================
  seo: {
    defaultTitle:
      "Muebles Hogar | Muebles Personalizados en Lima",

    titleTemplate:
      "%s | Muebles Hogar",

    defaultDescription:
      "Diseñamos muebles modernos personalizados para hogares y oficinas en Lima.",

    defaultKeywords: [
      "muebles en lima",
      "muebles personalizados",
      "muebles modernos",
      "muebles para hogar",
      "muebles para oficina"
    ],

    defaultOgImage:
      "/images/og-image.jpg",

    twitterHandle:
      "@muebleshogar",

    robots: {
      index: true,
      follow: true
    }
  },

  // =========================
  // SEMÁNTICA / ENTIDADES
  // =========================
  semantic: {
    primaryCategory: "Furniture Store",

    categories: [
      "Muebles Modernos",
      "Closets",
      "Cocinas",
      "Dormitorios",
      "Escritorios",
      "Salas"
    ],

    services: [
      "Diseño de muebles",
      "Fabricación de muebles",
      "Instalación de muebles",
      "Asesoría de interiores"
    ],

    keywords: [
      "muebles personalizados lima",
      "muebles modernos lima",
      "muebles a medida",
      "closets personalizados",
      "muebles para departamentos"
    ]
  },

  // =========================
  // KNOWLEDGE GRAPH
  // =========================
  knowledgeGraph: {
    sameAs: [
      "https://facebook.com/muebleshogar",
      "https://instagram.com/muebleshogar",
      "https://linkedin.com/company/muebleshogar",
      "https://youtube.com/@muebleshogar"
    ]
  },

  // =========================
  // INDEXACIÓN
  // =========================
  indexing: {
    allowIndexing: true,

    allowBlogIndexing: true,

    allowCategoryIndexing: true,

    allowProductIndexing: true
  },

  // =========================
  // NAVEGACIÓN
  // =========================
  navigation: {
    mainCategories: [
      "salas",
      "comedores",
      "dormitorios",
      "cocinas",
      "oficinas"
    ],

    featuredPages: [
      "/catalogo/muebles-modernos",
      "/catalogo/closets",
      "/catalogo/cocinas"
    ]
  },

  // =========================
  // ANALYTICS / TRACKING
  // =========================
  integrations: {
    googleAnalyticsId: "G-XXXXXXXXXX",

    googleTagManagerId: "GTM-XXXXXXX",

    metaPixelId: "123456789"
  }
};