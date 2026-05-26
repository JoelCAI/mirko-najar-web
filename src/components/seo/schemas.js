// src/components/seo/schemas.js
import { localBusiness } from "../config/localBusiness";

export const generateLocalBusinessSchema = () => {
  return {
    "@context": "https://schema.org",
    "@type": localBusiness.identity.type,

    name: localBusiness.identity.name,

    legalName:
      localBusiness.identity.legalName,

    description:
      localBusiness.identity.description,

    url:
      localBusiness.urls.website,

    telephone:
      localBusiness.contact.phone,

    email:
      localBusiness.contact.email,

    image:
      localBusiness.media.coverImage,

    logo:
      localBusiness.media.logo,

    address: {
      "@type": "PostalAddress",

      streetAddress:
        localBusiness.location.address,

      addressLocality:
        localBusiness.location.city,

      addressRegion:
        localBusiness.location.region,

      postalCode:
        localBusiness.location.postalCode,

      addressCountry:
        localBusiness.location.country
    },

    geo: {
      "@type": "GeoCoordinates",

      latitude:
        localBusiness.location.geo.latitude,

      longitude:
        localBusiness.location.geo.longitude
    },

    sameAs:
      localBusiness.knowledgeGraph.sameAs
  };
};