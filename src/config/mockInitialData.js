// src/config/mockInitialData.js

export const mockInitialData = {
  storeMeta: {
    templateType: "VIRTUAL_STORE",
    version: "v1-core",
    siteUrl: "https://www.sitioenvercel.com"
  },
  analytics: {
    enabled: true, // Pablito lo tiene activo, pero nuestro tracker lo mantendrá anónimo
    googleAnalyticsId: "G-XXXXXXXXXX"
  },
  businessData: {
    name: "Woodcraft Pablito",
    type: "HomeGoodsStore",
    description: "Muebles de pino artesanales con acabados premium y diseño local.",
    phone: "+51999999999",
    email: "contacto@pablito.com",
    address: "Av. Principal 123",
    city: "Lima",
    country: "PE"
  },
  hero: {
    active: true,
    activeType: "hero_slider",
    slides: [
      {
        id: "slide-1-mesas",
        title: "LA MADERA NOS INSPIRA",
        subtitle: "Mesas de Comedor de Pino de hermoso acabado artesanal.",
        imageDesktop: "https://images.unsplash.com/photo-1577140917170-285929fb55b7?auto=format&fit=crop&w=1920&q=80", // Imagen optimizada para monitor
        imageMobile: "https://images.unsplash.com/photo-1577140917170-285929fb55b7?auto=format&fit=crop&w=600&h=800&q=80",  // Relación de aspecto Portrait para celulares
        textPosition: "center-center",
        textPositionMobile: "center-center",
        titleVariant: "light",
        subtitleVariant: "light",
        useSmartGlow: true,
        smartGlowVariant: "dark",
        smartGlowOpacity: 0.5,
        buttonText: "Ver Catálogo",
        buttonLink: "/categoria/mesas",
        buttonVariant: "classic",
        buttonSize: "md"
      },
      {
        id: "slide-2-sillas",
        title: "DISEÑO MINIMALISTA",
        subtitle: "Sillas nórdicas que respiran equilibrio y orden natural.",
        imageDesktop: "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=1920&q=80",
        imageMobile: "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=600&h=800&q=80",
        textPosition: "left-center",
        textPositionMobile: "bottom-center",
        titleVariant: "dark",
        subtitleVariant: "dark",
        useSmartGlow: false,
        buttonText: "Comprar Ahora",
        buttonLink: "/categoria/sillas",
        buttonVariant: "outline",
        buttonSize: "md"
      }
    ]
  }
};