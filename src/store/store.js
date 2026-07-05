// src/store/store.js
import { configureStore } from '@reduxjs/toolkit';
import themeReducer from './slices/themeSlice';
import cartReducer from './slices/cartSlice';

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    cart: cartReducer,
  },
});