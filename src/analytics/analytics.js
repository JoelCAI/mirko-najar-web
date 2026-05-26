import { initializeGA } from "./providers/ga";

import { initializeMetaPixel } from "./providers/metaPixel";

export const initializeAnalytics = () => {
  initializeGA();

  initializeMetaPixel();
};

