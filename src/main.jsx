// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { ThemeProvider } from './context/ThemeProvider'; // <-- Importamos tu nuevo contexto

// Estilos Globales
import 'modern-normalize/modern-normalize.css';
import './styles/fonts.css'; 
import './styles/variables.css';
import './styles/globals.css';

import App from './App';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        {/* Envolvemos la App aquí para que el enrutador y los layouts lean el mismo satélite */}
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </BrowserRouter>
    </HelmetProvider>
  </React.StrictMode>
);