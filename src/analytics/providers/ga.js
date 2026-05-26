import { localBusiness } from "../../config/localBusiness";

export const GA_ID =
  localBusiness.integrations.googleAnalyticsId;

export const initializeGA = () => {
  if (!GA_ID) return;

  window.dataLayer = window.dataLayer || [];

  function gtag() {
    window.dataLayer.push(arguments);
  }

  window.gtag = gtag;

  gtag("js", new Date());

  gtag("config", GA_ID);
};

export const trackGAEvent = (
  eventName,
  params = {}
) => {
  if (!window.gtag) return;

  window.gtag("event", eventName, params);
};