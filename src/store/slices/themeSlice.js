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
      state.value = state.value === 'dark' ? 'light' : 'dark';
      // Solo guardamos en el storage; la sincronización del DOM la maneja React de forma reactiva
      localStorage.setItem('app-theme', state.value);
    },
  },
});

export const { toggleTheme } = themeSlice.actions;
export default themeSlice.reducer;