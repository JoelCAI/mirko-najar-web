import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

// Estilos Globales
import 'modern-normalize/modern-normalize.css';
import './styles/fonts.css'; // <--- Carga las fuentes primero
import './styles/variables.css';
import './styles/globals.css';

import App from './App';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </HelmetProvider>
  </React.StrictMode>
);