// src/pages/DynamicCatalogView.jsx (Concepto Maestro)
import { useSelector } from 'react-redux';
import VirtualStoreCatalog from '../components/templates/store/VirtualStoreCatalog';
import MedicalCatalog from '../components/templates/medical/MedicalCatalog';
import RestaurantMenu from '../components/templates/restaurant/RestaurantMenu';

const TEMPLATE_PAGE_REGISTRY = {
  VIRTUAL_STORE: VirtualStoreCatalog,
  MEDICAL_CONSULTING: MedicalCatalog,
  RESTAURANT: RestaurantMenu
};

const DynamicCatalogView = () => {
  // Extraemos si es tienda, consultorio o restaurante desde el esquema validado de Zod
  const templateType = useSelector((state) => state.config.meta.templateType); // Ej: "MEDICAL_CONSULTING"

  const SelectedView = TEMPLATE_PAGE_REGISTRY[templateType] || TEMPLATE_PAGE_REGISTRY.VIRTUAL_STORE;

  return <SelectedView />;
};

export default DynamicCatalogView;