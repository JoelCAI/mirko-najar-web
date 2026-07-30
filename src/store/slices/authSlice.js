// src/store/slices/authSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAuthenticated: false,
  user: null,         // Datos públicos básicos: { name: "Pablito", email: "pablito@zoho.com", role: "admin" }
  permissions: [],    // Permisos otorgados por el backend tras validar el 2FA
  loading: true
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.permissions = action.payload.permissions;
      state.loading = false;
    },
    logoutSuccess: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.permissions = [];
      state.loading = false;
    },
    setAuthLoading: (state, action) => {
      state.loading = action.payload;
    }
  }
});

export const { loginSuccess, logoutSuccess, setAuthLoading } = authSlice.actions;
export default authSlice.reducer;