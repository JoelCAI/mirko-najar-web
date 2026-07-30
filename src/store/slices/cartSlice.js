// src/store/slices/cartSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [], // Estructura interna limpia: [{ id, name, price, quantity }]
  totalQuantity: 0,
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action) => {
      const newItem = action.payload; // Recibe el registro saneado por Zod
      const existingItem = state.items.find(item => item.id === newItem.id);
      state.totalQuantity++;
      
      if (!existingItem) {
        state.items.push({
          id: newItem.id,
          name: newItem.name, // Sincronizado con la propiedad 'name' del catálogo
          price: newItem.price || 0, // Fallback matemático de seguridad
          quantity: 1,
        });
      } else {
        existingItem.quantity++;
      }
    },
    removeItem: (state, action) => {
      const id = action.payload;
      const existingItem = state.items.find(item => item.id === id);
      if (existingItem) {
        state.totalQuantity--;
        if (existingItem.quantity === 1) {
          state.items = state.items.filter(item => item.id !== id);
        } else {
          existingItem.quantity--;
        }
      }
    },
    clearCart: (state) => {
      state.items = [];
      state.totalQuantity = 0;
    }
  },
});

export const { addItem, removeItem, clearCart } = cartSlice.actions;
export default cartSlice.reducer;