// src/utils/formatters.js

/**
 * Convierte un número bruto en formato de moneda localizada (ej. 450 -> $450.00)
 */
export const formatCurrency = (amount, currency = 'USD', locale = 'en-US') => {
  const safeAmount = typeof amount === 'number' && !isNaN(amount) ? amount : 0;
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
  }).format(safeAmount);
};

/**
 * Limpia textos complejos para asegurar URLs amigables en el cliente (Slug)
 */
export const slugify = (text) => {
  if (!text) return '';
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')        // Reemplaza espacios por guiones
};