// src/config/pageDictionary.js

export const pageDictionary = {
 
  inicio: { label: "Inicio", path: "/", defaultIcon: "Home" },
  nosotros: { label: "Quiénes Somos", path: "/nosotros", defaultIcon: "User" },
  contacto: { label: "Contacto", path: "/contacto", defaultIcon: "Phone" },

  catalogo: { label: "Catálogo", path: "/catalogo", defaultIcon: "ShoppingBag" },
  
  servicios: { label: "Servicios", path: "/servicios", defaultIcon: "Briefcase" },
  fabricacion: { label: "Fabricación a Medida", path: "/servicios/fabricacion", defaultIcon: "Hammer" },
  acabados: { label: "Acabados Finos", path: "/servicios/acabados", defaultIcon: "Paintbrush" },
  restauracion: { label: "Restauración", path: "/servicios/restauracion", defaultIcon: "Wrench" },

  laqueado: { label: "Laqueado Premium", path: "/servicios/acabados/laqueado", defaultIcon: "Sparkles" },
  poliuretano: { label: "Pintura Poliuretano", path: "/servicios/acabados/poliuretano", defaultIcon: "Layers" }
  
};