// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

// 🌟 NUEVAS IMPORTACIONES DE REDUX TOOLKIT
import { Provider } from 'react-redux';
import { store } from './store/store';

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
        {/* 🌟 Reemplazamos ThemeProvider por el Provider industrial inyectándole la store central */}
        <Provider store={store}>
          <App />
        </Provider>
      </BrowserRouter>
    </HelmetProvider>
  </React.StrictMode>
);