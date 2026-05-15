export const siteConfig = {
  tenantId: "TEMPLATE_GENERICO", // Este es el que cambiarás al clonar
  apiEndpoint: "https://tu-worker-central.workers.dev",
  version: "1.0.0",
  modules: {
    ecommerce: false, // Si es true, el QuickSearch mostrará botón de "Añadir al carrito"
    catalog: true,
    blog: false
  }
};