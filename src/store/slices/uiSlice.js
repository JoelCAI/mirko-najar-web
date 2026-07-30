// src/store/slices/uiSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isCartOpen: false,
  currentCategoryFilter: 'Todos'
};

export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleCart: (state) => {
      state.isCartOpen = !state.isCartOpen;
    },
    setCartOpen: (state, action) => {
      state.isCartOpen = action.payload; // Útil si necesitas forzar el cierre (false) o apertura (true)
    },
    setCategoryFilter: (state, action) => {
      state.currentCategoryFilter = action.payload;
    }
  }
});

export const { toggleCart, setCartOpen, setCategoryFilter } = uiSlice.actions;
export default uiSlice.reducer;