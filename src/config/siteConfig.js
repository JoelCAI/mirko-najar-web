// src/config/siteConfig.js
export const siteConfig = {
  // ID único del cliente en base de datos D1
  tenantId: "ebanisterias_najar_001", 
  //Incrementa este número cuando cambies datos en la base de datos
  catalogVersion: 1, 
  // Nombre comercial del tenant actual
  clientName: "Mirko Najar - Ebanistería", 
  // Endpoint API central de Cloudflare
  workerUrl: "https://core-worker-central.tu-usuario.workers.dev", 
  version: "1.0.0", // Versión actual del chasis del Core
  settings: {
    useLocalCache: true, // Activa persistencia en IndexedDB y Cache API
    catalogMode: true, // Renderiza la interfaz de catálogo y buscador
    ecommerceMode: false // Apaga la pasarela de pagos en fase 1
  }
};