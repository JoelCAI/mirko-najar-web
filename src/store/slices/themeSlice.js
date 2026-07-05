// src/store/slices/themeSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { themeConfig } from '../../config/themeConfig';

const initialState = {
  value: localStorage.getItem('app-theme') || themeConfig.initialTheme,
};

export const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      // En RTK podemos mutar el estado de forma "directa" porque usa Immer por debajo de forma segura
      state.value = state.value === 'dark' ? 'light' : 'dark';
      
      // Sincronizamos los efectos secundarios inmediatamente
      document.documentElement.setAttribute('data-theme', state.value);
      localStorage.setItem('app-theme', state.value);
    },
  },
});

export const { toggleTheme } = themeSlice.actions;
export default themeSlice.reducer;