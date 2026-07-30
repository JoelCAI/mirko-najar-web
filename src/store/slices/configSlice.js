// src/store/slices/configSlice.js
import { createSlice } from '@reduxjs/toolkit';

// 💡 Este initialState actúa como datos de desarrollo local y rescate absoluto
const initialState = {
  meta: { templateType: "VIRTUAL_STORE", version: "v1-core" },
  navbar: { active: true, activeType: 'navbar_searchable', isTransparent: true },
  hero: { active: true, activeType: 'hero_slider' },
  footer: { active: true, activeType: 'footer_standard' },
  
  // Inyectamos la estructura estática de Muebles Hogar para desarrollo local
  identity: {
    name: "Muebles Hogar",
    legalName: "Muebles Hogar SAC",
    slogan: "Pasión por el Diseño",
    description: "Diseñamos y fabricamos muebles personalizados modernos para hogares, oficinas y departamentos en Lima."
  },
  location: {
    address: "Av. Primavera 1230",
    district: "Santiago de Surco",
    city: "Lima"
  },
  contact: {
    phone: "+51 918 471 292",
    whatsapp: "51918471292",
    email: "info@muebleshogar.com"
  },
  integrations: {
    googleAnalyticsId: "G-XXXXXXXXXX",
    googleSiteVerification: "google-site-verification-code-goes-here"
  },
  products: [] // Iniciamos vacío, se poblará dinámicamente en las páginas correspondientes
};

export const configSlice = createSlice({
  name: 'config',
  initialState,
  reducers: {
    updateConfig: (state, action) => {
      return { ...state, ...action.payload };
    }
  }
});

export const { updateConfig } = configSlice.actions;
export default configSlice.reducer;