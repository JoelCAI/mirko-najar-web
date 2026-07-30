// src/analytics/indexAnalytics.js

import { initializeGA } from "./providers/googleAnalyticsProvider";
import { initAnalyticsListener } from "./analyticsListener";

export const initializeAnalytics = (analyticsConfig) => {
  // 1. Disparamos Google Analytics con el ID de Pablito
  initializeGA(analyticsConfig.googleAnalyticsId);
  
  // 2. Encendemos el radar pasivo de clics en el DOM de forma global
  initAnalyticsListener();
};