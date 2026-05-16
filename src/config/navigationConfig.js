// src/config/navigationConfig.js
import { User, Phone, Wrench, Hammer, Paintbrush } from 'lucide-react';

export const navigationMenu = [
  {
    title: "Nosotros",
    path: "/nosotros",
    // Tiene 2 items: Se abrirá como dropdown condicional
    submenu: [
      { label: "Quiénes Somos", path: "/nosotros", icon: User },
      { label: "Contacto", path: "/contacto", icon: Phone }
    ]
  },
  {
    title: "Catálogo",
    path: "/catalogo",
    // Tiene 0 items: Redirección directa al hacer click sin abrir dropdown
    submenu: []
  },
  {
    title: "Servicios",
    path: "/servicios",
    // Tiene 3 items, y el segundo tiene un sub-submenu interno
    submenu: [
      { 
        label: "Fabricación a Medida", 
        path: "/servicios/fabricacion", 
        icon: Hammer 
      },
      { 
        label: "Acabados Finos", 
        path: "/servicios/acabados", 
        icon: Paintbrush,
        // Tercer nivel que en Desktop abrirá estrictamente a la izquierda
        subSubmenu: [
          { label: "Laqueado Premium", path: "/servicios/acabados/laqueado" },
          { label: "Pintura Poliuretano", path: "/servicios/acabados/poliuretano" }
        ]
      },
      { 
        label: "Restauración", 
        path: "/servicios/restauracion", 
        icon: Wrench 
      }
    ]
  }
];

export const userMenuOptions = [
  { label: "Iniciar sesión", path: "/login" },
  { label: "Registrarse", path: "/registro" },
  { label: "Ayuda", path: "/ayuda" }
];