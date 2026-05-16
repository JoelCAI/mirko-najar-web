// src/hooks/useCatalogSync.js
import { useState, useEffect } from 'react';
import { siteConfig } from '../config/siteConfig';
import { getProductsFromLocal, saveProductsToLocal } from '../services/indexedDb';

// Dataset de prueba estructurado exactamente con el formato nativo de Cloudflare D1
const MOCK_D1_RESPONSE = [
  // MOBILIARIO (Variantes de Mesas)
  { id: "p1", tenant_id: "ebanisterias_najar_001", name: "Mesa de Roble Moderna para Comedor", slug: "mesa-roble-moderna", category: "Mobiliario", image: "https://images.unsplash.com/photo-1577140917170-285929fb55b7?w=150&q=80" },
  { id: "p2", tenant_id: "ebanisterias_najar_001", name: "Mesa de Centro Rústica Artesanal", slug: "mesa-centro-rustica", category: "Mobiliario", image: "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?w=150&q=80" },
  { id: "p3", tenant_id: "ebanisterias_najar_001", name: "Mesa de Comedor Extensible Lacada", slug: "mesa-comedor-extensible", category: "Mobiliario", image: "https://images.unsplash.com/photo-1449247709967-d4461a6a6103?w=150&q=80" },
  { id: "p4", tenant_id: "ebanisterias_najar_001", name: "Mesa Lateral Minimalista Industrial", slug: "mesa-lateral-industrial", category: "Mobiliario", image: "https://images.unsplash.com/photo-1565793298595-6a879b1d9492?w=150&q=80" },
  { id: "p5", tenant_id: "ebanisterias_najar_001", name: "Mesa de Escritorio para Oficina", slug: "mesa-escritorio-oficina", category: "Mobiliario", image: "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=150&q=80" },

  // MOBILIARIO (Variantes de Sillas y Sillones)
  { id: "p6", tenant_id: "ebanisterias_najar_001", name: "Silla Ergonómica Premium de Oficina", slug: "silla-ergonomica-premium", category: "Sillas de Autor", image: "https://images.unsplash.com/photo-1505797149-43b0069ec26b?w=150&q=80" },
  { id: "p7", tenant_id: "ebanisterias_najar_001", name: "Silla de Comedor Estilo Escandinavo", slug: "silla-comedor-nogal", category: "Sillas de Autor", image: "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=150&q=80" },
  { id: "p8", tenant_id: "ebanisterias_najar_001", name: "Sillón Orejero Tapizado en Lino", slug: "sillon-orejero-lino", category: "Sillas de Autor", image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=150&q=80" },
  { id: "p9", tenant_id: "ebanisterias_najar_001", name: "Silla Mecedora de Madera Antigua", slug: "silla-mecedora-madera", category: "Sillas de Autor", image: "https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=150&q=80" },
  { id: "p10", tenant_id: "ebanisterias_najar_001", name: "Taburete Alto para Barra de Cocina", slug: "taburete-alto-cocina", category: "Sillas de Autor", image: "https://images.unsplash.com/photo-1503602642458-232111445657?w=150&q=80" },

  // ALMACENAMIENTO Y OTROS
  { id: "p11", tenant_id: "ebanisterias_najar_001", name: "Armario Empotrado de Cedro Real", slug: "armario-empotrado-cedro", category: "Dormitorio", image: "https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=150&q=80" },
  { id: "p12", tenant_id: "ebanisterias_najar_001", name: "Librero Modular de Pino Seleccionado", slug: "librero-modular-pino", category: "Almacenamiento", image: "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?w=150&q=80" },
  { id: "p13", tenant_id: "ebanisterias_najar_001", name: "Cómoda de 6 Cajones Vintage", slug: "comoda-6-cajones", category: "Dormitorio", image: "https://images.unsplash.com/photo-1532372320978-9b4d7a92b24d?w=150&q=80" },
  { id: "p14", tenant_id: "ebanisterias_najar_001", name: "Estante Flotante de Madera Maciza", slug: "estante-flotante-madera", category: "Almacenamiento", image: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=150&q=80" },

  // SERVICIOS PROFESIONALES
  { id: "p15", tenant_id: "ebanisterias_najar_001", name: "Servicio de Restauración de Muebles Finos", slug: "servicio-restauracion", category: "Servicios", image: "https://images.unsplash.com/photo-1581092921461-eab62e97a780?w=150&q=80" },
  { id: "p16", tenant_id: "ebanisterias_najar_001", name: "Diseño y Fabricación de Cocinas a Medida", slug: "servicio-cocinas-medida", category: "Servicios", image: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=150&q=80" },
  { id: "p17", tenant_id: "ebanisterias_najar_001", name: "Barnizado y Laqueado de Puertas de Interior", slug: "servicio-barnizado", category: "Servicios", image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=150&q=80" },

  // PROMOCIONES Y CAMPAÑAS (Llevan a Landing Pages)
  { id: "p18", tenant_id: "ebanisterias_najar_001", name: "Campaña Renovación: 20% OFF en Dormitorios", slug: "promo-renovacion-dormitorio", category: "Promociones", image: "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=150&q=80" },
  { id: "p19", tenant_id: "ebanisterias_najar_001", name: "Liquidación de Saldos de Exhibición", slug: "promo-liquidacion-saldos", category: "Promociones", image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=150&q=80" },
  { id: "p20", tenant_id: "ebanisterias_najar_001", name: "Envío Gratis en Proyectos de Todo el Mes", slug: "promo-envio-gratis", category: "Promociones", image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=150&q=80" }
];

// Hook personalizado para controlar el estado y ciclo de vida del catálogo
export const useCatalogSync = () => {
  // Estado reactivo que almacena la lista de productos activa
  const [products, setProducts] = useState([]); 
  // Flag para controlar estados visuales de carga en la UI
  const [loading, setLoading] = useState(true); 
  // Captura mensajes de fallo operativos para el usuario
  const [error, setError] = useState(null); 

  useEffect(() => {
    // Proceso asíncrono en segundo plano para determinar el origen de los datos
    const syncCatalog = async () => {
      try {
        // --- CONTROL DE VERSIONES AUTOMATIZADO ---
        // Lee la versión del catálogo que el navegador tiene guardada actualmente
        const localVersion = localStorage.getItem('catalog_version');
        // Convierte a cadena de texto la versión actual definida en la configuración global
        const currentVersion = siteConfig.catalogVersion.toString();

        // Valida si la versión en disco es vieja o es la primera vez que ingresa el usuario
        if (localVersion !== currentVersion) {
          // Actualiza de inmediato la marca de versión local para sincronizar el navegador
          localStorage.setItem('catalog_version', currentVersion);
          
          // Simula latencia de red de una llamada Fetch real
          await new Promise(resolve => setTimeout(resolve, 400)); 
          
          // Filtra los datos emulando la cláusula WHERE tenant_id de una consulta SQL en D1
          const filteredData = MOCK_D1_RESPONSE.filter(item => item.tenant_id === siteConfig.tenantId);
          // Almacena y sobreescribe asíncronamente los datos frescos en IndexedDB invalidando la caché vieja
          await saveProductsToLocal(filteredData); 
          // Despliega la información descargada en la interfaz del catálogo
          setProducts(filteredData);
          // Apaga el estado de carga al completar la actualización forzada
          setLoading(false);
          // Interrumpe la ejecución evitando lecturas innecesarias en cascada
          return;
        }

        // --- FLUJO NORMAL DE ALTA VELOCIDAD ---
        // Consulta inicial al almacenamiento del disco local IndexedDB
        const localData = await getProductsFromLocal(); 
        
        // Valida si existen registros guardados de visitas previas
        if (localData && localData.length > 0) { 
          // Carga los productos locales inmediatamente en memoria reactiva  
          setProducts(localData);
          // Apaga el estado de carga en tiempo récord (0ms) 
          setLoading(false);
          // Interrumpe el hilo de ejecución previniendo llamadas innecesarias a la red 
          return; 
        }

        // Simula latencia de red de una llamada Fetch real (Contingencia si IndexedDB está limpio)
        await new Promise(resolve => setTimeout(resolve, 400)); 
        
        // Filtra los datos emulando la cláusula WHERE tenant_id de una consulta SQL en D1
        const filteredData = MOCK_D1_RESPONSE.filter(item => item.tenant_id === siteConfig.tenantId);
        // Almacena asíncronamente los datos en IndexedDB para la siguiente visita
        await saveProductsToLocal(filteredData); 
        // Despliega la información descargada en la interfaz del catálogo
        setProducts(filteredData);
      } catch (err) {
        // Registra el error en el estado para control de contingencia
        setError("Fallo en la sincronización del catálogo."); 
        // Muestra traza técnica del error en la consola de depuración
        console.error(err); 
      } finally {
        // Declara la finalización total de cualquier proceso de carga activo
        setLoading(false); 
      }
    };

    syncCatalog(); // Lanza la ejecución del motor de sincronización al montar el componente
  }, []); // Array de dependencias vacío para asegurar ejecución única al inicio

  return { products, loading, error }; // Expone los datos y estados de control listos para el consumo de la interfaz
};