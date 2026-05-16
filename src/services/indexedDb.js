// src/services/indexedDb.js
import { siteConfig } from '../config/siteConfig';

// Define nombre único de base de datos por cliente
const DB_NAME = `CoreDB_${siteConfig.tenantId}`;
const DB_VERSION = 1; // Versión de estructura de la base de datos
const STORE_NAME = 'products'; // Nombre de tabla interna en el navegador

// Inicializa y abre la base de datos del navegador
export const initDB = () => {
  return new Promise((resolve, reject) => {
    // Abre conexion asíncrona con la base de datos local
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    // Configura la estructura interna si es primera visita
    request.onupgradeneeded = (event) => {
      const db = event.target.result; // Obtiene instancia de base de datos creada
      if (!db.objectStoreNames.contains(STORE_NAME)) { // Valida si no existe la tabla interna
        db.createObjectStore(STORE_NAME, { keyPath: 'id' }); // Crea la tabla usando id como llave
      }
    };

    request.onsuccess = (event) => resolve(event.target.result); // Devuelve conexion exitosa al resolver promesa
    request.onerror = (event) => reject(event.target.error); // Captura fallos de lectura de disco duro
  });
};

// Guarda productos nuevos descargados de la nube
export const saveProductsToLocal = async (products) => {
  const db = await initDB(); // Espera la apertura de la base de datos
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(STORE_NAME, 'readwrite'); // Abre canal seguro de lectura y escritura
    const store = transaction.objectStore(STORE_NAME); // Selecciona tabla destino de productos

    store.clear(); // Borra datos previos para evitar duplicados obsoletos

    products.forEach(product => {
      store.put(product); // Inyecta cada fila de producto en IndexedDB
    });

    transaction.oncomplete = () => resolve(true); // Confirma operacion exitosa al terminar lote
    transaction.onerror = (event) => reject(event.target.error); // Cancela cambios ante errores de escritura
  });
};

// Recupera productos guardados en el dispositivo del cliente
export const getProductsFromLocal = async () => {
  const db = await initDB(); // Abre conexion con almacenamiento local
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(STORE_NAME, 'readonly'); // Abre canal de solo lectura ultra veloz
    const store = transaction.objectStore(STORE_NAME); // Apunta a tabla de productos de cliente
    const request = store.getAll(); // Solicita la extraccion de todos los registros

    request.onsuccess = () => resolve(request.result); // Entrega lista completa de productos al buscador
    request.onerror = (event) => reject(event.target.error); // Gestiona fallos de lectura de persistencia
  });
};