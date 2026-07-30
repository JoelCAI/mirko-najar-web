// src/config/schemas.js
import { z } from 'zod';
import { heroSliderArraySchema } from '../components/hero/heroslider/HeroSlider.schema';

// 👮 SCHEMA 1: El contrato estructural macro (El interruptor maestro de Lego)
export const configCmsSchema = z.object({
  meta: z.object({
    templateType: z.string().default("GENERIC"),
    version: z.string().default("v1-core")
  }),
  navbar: z.object({
    active: z.boolean().default(true),
    activeType: z.string().default("navbar_searchable"),
    isTransparent: z.boolean().default(false)
  }),
  
  hero: z.object({
    active: z.boolean().default(true),
    activeType: z.string().default("hero_slider"),
    sliderData: heroSliderArraySchema.optional() 
  }),
  
  footer: z.object({
    active: z.boolean().default(true),
    activeType: z.string().default("footer_standard")
  })
});

// 👮 SCHEMA NUEVO: Sub-esquema para blindar el SEO Scope local de Pablito
export const seoScopeSchema = z.object({
  regions: z.array(z.string()).default([]),
  districts: z.array(z.string()).default([]),
  avenues: z.array(z.string()).default([]),
  keywords: z.array(z.string()).default([])
});

// 👮 SCHEMA 2: Catálogo de productos (Enriquecido para SEO Local y Versionado)
export const productSchema = z.object({
  id: z.string(),
  tenant_id: z.string(),
  name: z.string().min(1, "El nombre es requerido"),
  slug: z.string().min(1, "El slug es requerido"),
  category: z.string(),
  description: z.string().default("Muebles de diseño personalizado de alta durabilidad."),
  price: z.number().positive().default(0),
  currency: z.string().length(3).default("PEN"),
  image: z.string()
    .url()
    .catch("https://images.unsplash.com/photo-1533090161767-e6ffed986c88?w=150&q=80"),
  imgVersion: z.number().int().positive().default(1),
  seoScope: seoScopeSchema.default({
    regions: ["Lima Metropolitana"],
    districts: [],
    avenues: [],
    keywords: []
  })
});

export const catalogSchema = z.array(productSchema);

export const themeSchema = z.enum(["light", "dark"]).default("light");