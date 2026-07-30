// src/router/Router.schema.js
import { z } from 'zod';

// Esquema para las rutas del core del sistema
export const AppRoutesSchema = z.object({
  home: z.string().default('/'),
  catalog: z.string().default('/productos'),
  categoryPrefix: z.string().default('/categoria'),
  productPrefix: z.string().default('/producto'),
  cart: z.string().default('/carrito'),
});

// Esquema recursivo para el menú de navegación (soporta infinitos subniveles)
export const NavigationNodeSchema = z.lazy(() =>
  z.object({
    pageId: z.string(),
    slug: z.string(),
    label: z.string(),
    icon: z.string().optional().nullable(),
    isActive: z.boolean().default(true),
    submenu: z.array(NavigationNodeSchema).optional().default([]),
    subSubmenu: z.array(NavigationNodeSchema).optional().default([]), // Soporte para Nivel 3 y 4
  })
);

// Esquema maestro del enrutador
export const RouterSchema = z.object({
  routes: AppRoutesSchema,
  navigationMenu: z.array(NavigationNodeSchema).default([]),
});