// src/store/slices/themeSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { themeConfig } from '../../config/themeConfig';
import { themeSchema } from '../../config/schemas'; // 👈 Nuestro filtro

// Traemos el string crudo del almacenamiento del navegador
const rawStorageTheme = localStorage.getItem('app-theme');

const initialState = {
  // Zod analiza el storage, si alguien metió basura, inyecta limpiamente el fallback seguro
  value: themeSchema.catch(themeConfig.initialTheme || 'light').parse(rawStorageTheme),
};

export const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.value = state.value === 'dark' ? 'light' : 'dark';
      localStorage.setItem('app-theme', state.value);
    },
  },
});

export const { toggleTheme } = themeSlice.actions;
export default themeSlice.reducer;