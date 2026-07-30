// src/components/hero/heroslider/HeroSlider.schema.js
import { z } from 'zod';

// Contrato estricto para un solo Slide individual
export const singleSlideSchema = z.object({
  id: z.string(),
  themeVisibility: z.enum(['light', 'dark', 'both']).default('both'),
  imageDesktop: z.string().url(),
  imageMobile: z.string().url(),
  title: z.string().min(1).max(100),
  subtitle: z.string().max(250).optional(),
  
  // Posicionamiento basado en tu matriz de diseño
  textPosition: z.enum([
    'top-left', 'top-center', 'top-right',
    'center-left', 'center-center', 'center-right',
    'bottom-left', 'bottom-center', 'bottom-right'
  ]).default('center-center'),
  
  textPositionMobile: z.enum(['top-center', 'center-center', 'bottom-center']).default('center-center'),
  mobileYOffset: z.string().default('0px'),
  
  titleVariant: z.enum(['light', 'dark']).default('light'),
  subtitleVariant: z.enum(['light', 'dark']).default('light'),
  
  // Control de contraste tipográfico inteligente
  useSmartGlow: z.boolean().default(false),
  smartGlowVariant: z.enum(['light', 'dark']).default('dark'),
  smartGlowOpacity: z.number().min(0).max(1).default(0.6),
  
  // Botones adaptativos
  buttonText: z.string().optional(),
  buttonLink: z.string().default('/'),
  buttonVariant: z.string().default('classic'),
  buttonSize: z.object({
    mobile: z.string().default('md'),
    desktop: z.string().default('md')
  }).optional(),
  buttonUtils: z.string().default(''),
  buttonBorder: z.string().default(''),
  
  duration: z.number().positive().default(5000)
});

// El esquema que valida el array completo de datos que consumirá el Slider
export const heroSliderArraySchema = z.array(singleSlideSchema);