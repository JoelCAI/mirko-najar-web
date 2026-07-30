// src/hooks/useStoreRoutes.js
import { useMemo } from 'react';
import routerData from '../router/Router.json';
import { RouterSchema } from '../router/Router.schema';

export const useStoreRoutes = () => {
  // 1. Validamos los datos de entrada con Zod para garantizar estabilidad
  const parsedData = useMemo(() => {
    const validation = RouterSchema.safeParse(routerData);
    if (!validation.success) {
      console.error("[RouterSchema Error]: Los datos del enrutador están corruptos.", validation.error);
      // Retornamos una estructura mínima por defecto para que la app no colapse
      return { routes: { home: "/" }, navigationMenu: [] };
    }
    return validation.data;
  }, []);

  const { routes, navigationMenu } = parsedData;

  // 2. Extraemos de forma recursiva todas las rutas activas que necesitan ser registradas
  const activeRoutes = useMemo(() => {
    const flatRoutes = [];

    const traverse = (node) => {
      if (!node.isActive) return;

      // Guardamos la ruta plana para que AppRouter cree el <Route />
      flatRoutes.push({
        pageId: node.pageId,
        slug: node.slug,
        label: node.label
      });

      // Recorremos submenús del nivel 2
      if (node.submenu && node.submenu.length > 0) {
        node.submenu.forEach(traverse);
      }
      // Recorremos sub-submenús de niveles 3 y 4
      if (node.subSubmenu && node.subSubmenu.length > 0) {
        node.subSubmenu.forEach(traverse);
      }
    };

    navigationMenu.forEach(traverse);
    return flatRoutes;
  }, [navigationMenu]);

  /**
   * Resuelve identificadores lógicos de destino a URLs físicas del navegador.
   * @param {string} token - El token guardado (ej. "category:salas", "page:nosotros", "product:mesa")
   * @returns {string} El enlace físico resultante (ej. "/categoria/salas", "/nosotros")
   */
  const resolveLink = (token) => {
    if (!token) return routes.home;

    // Si ya viene formateado como enlace absoluto del navegador, lo dejamos pasar
    if (token.startsWith('/') || token.startsWith('http')) {
      return token;
    }

    const [type, value] = token.split(':');

    switch (type) {
      case 'page': {
        // Buscamos el slug correspondiente al pageId en nuestra lista de navegación activa
        const found = activeRoutes.find(route => route.pageId === value);
        return found ? found.slug : routes.home;
      }
      case 'category':
        return `${routes.categoryPrefix}/${value}`;
      case 'product':
        return `${routes.productPrefix}/${value}`;
      case 'catalog':
        return routes.catalog;
      case 'cart':
        return routes.cart;
      default:
        return routes.home;
    }
  };

  return {
    routes,
    navigationMenu,
    activeRoutes, // Se lo damos a AppRouter.jsx
    resolveLink   // Se lo damos a HeroSlider y cualquier botón de la app
  };
};