// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { ThemeProvider } from './context/ThemeProvider'; // <-- Importamos tu nuevo contexto

// Estilos Globales (La cascada se lee de ARRIBA hacia ABAJO)
import 'modern-normalize/modern-normalize.css'; // 1. Reseteo del navegador (Base cero)
import './styles/fonts.css';                     // 2. Declaración de @font-face (Fuentes)
import './styles/variables.css';                 // 3. Tus tokens y variables (:root)
import './styles/animations.css';                // 4. Tus @keyframes de animación
import './styles/globals.css';                   // 5. Reset de etiquetas (body, h1, a) y layout macro
import './styles/aspects.css';
import './styles/typography.css';
import './styles/buttons.css';
import './styles/utilities.css';                 // 6. ¡AQUÍ! Tus clases utilitarias de color (Tienen la última palabra)

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