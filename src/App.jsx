// src/App.jsx
import { useEffect } from 'react';
import { useTheme } from './hooks/useTheme';
import AppRouter from './router/AppRouter';

// 🚀 Importamos el JSON estático de configuración de negocio
import localBusiness from './config/localBusiness.json';
// 📊 Importamos nuestro rastreador inteligente
import AnalyticsTracker from './analytics/AnalyticsTracker';

function App() {
  const { theme } = useTheme();

  // 🛡️ GUARDIÁN DEL CLIMA LUMÍNICO: Sincroniza el DOM real con el estado de Redux instantáneamente
  useEffect(() => {
    // Sincroniza tanto por atributo como por clase para dar soporte a Tailwind o CSS puro variables
    document.documentElement.setAttribute('data-theme', theme);
    
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]); // Se ejecuta al cargar la página Y cada vez que el usuario presione el Sol/Luna

  return (
    <>
      {/* 
        📊 Pasamos la sección de integraciones al tracker.
        Si localBusiness.json viene del servidor, el tracker leerá el ID al vuelo.
      */}
      <AnalyticsTracker analyticsConfig={localBusiness.integrations} />
      
      <AppRouter />
    </>
  );
}

export default App;