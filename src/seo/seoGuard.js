import localBusiness from '../config/localBusiness.json';

export function sanitizeCanonicalUrl(pathname) {
  const base = localBusiness.urls.website.replace(/\/$/, '');
  const cleanPath = pathname.startsWith('/') ? pathname : `/${pathname}`;
  return `${base}${cleanPath}`;
}

export function generateLocalBusinessSchema() {
  const { identity, location, contact, social, business, openingHours, knowledgeGraph } = localBusiness;
  const sameAsLinks = social ? Object.values(social).filter(Boolean) : [];
  if (knowledgeGraph?.googleBusinessProfileUrl) {
    sameAsLinks.push(knowledgeGraph.googleBusinessProfileUrl);
  }
  
  return {
    "@context": "https://schema.org",
    "@type": identity.type,
    "@id": `${localBusiness.urls.website}/#organization`,
    "name": identity.name,
    "legalName": identity.legalName,
    "url": localBusiness.urls.website,
    "logo": `${localBusiness.urls.website}${localBusiness.media.logo}`,
    "image": `${localBusiness.urls.website}${localBusiness.media.coverImage}`,
    "description": identity.description,
    "telephone": contact.phone,
    "priceRange": business.priceRange,
    "paymentAccepted": business.paymentMethods,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": location.address,
      "addressLocality": location.district,
      "addressRegion": location.region,
      "addressCountry": "PE",
      "postalCode": location.postalCode
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": location.geo.latitude,
      "longitude": location.geo.longitude
    },
    "openingHoursSpecification": Object.entries(openingHours)
      .filter((entry) => entry[1] !== 'Closed')
      .map(([day, value]) => {
        const [opens, closes] = value.split('-');
        return {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": day.charAt(0).toUpperCase() + day.slice(1),
          "opens": opens,
          "closes": closes
        };
      }),
    "sameAs": sameAsLinks
  };
}

export function generateProductSchema(product, calculatedUrl) {
  if (!product) return null;

  const imageUrlWithVersion = product.image && product.imgVersion 
    ? `${product.image}?v=${product.imgVersion}`
    : product.image;

  const serviceAreas = [];
  if (product.seoScope?.regions) {
    product.seoScope.regions.forEach(region => serviceAreas.push({ "@type": "AdministrativeArea", "name": region }));
  }
  if (product.seoScope?.districts) {
    product.seoScope.districts.forEach(dist => serviceAreas.push({ "@type": "AdministrativeArea", "name": `${dist}, Lima, Peru` }));
  }

  return {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": `${calculatedUrl}/#product`,
    "name": product.name,
    "image": imageUrlWithVersion,
    "description": product.description,
    "category": product.category,
    "brand": {
      "@type": "Brand",
      "name": localBusiness.identity.name
    },
    "offers": {
      "@type": "Offer",
      "url": calculatedUrl,
      "price": Number(product.price).toFixed(2),
      "priceCurrency": product.currency || localBusiness.business.currency,
      "itemCondition": "https://schema.org/NewCondition",
      "availability": product.outOfStock ? "https://schema.org/OutOfStock" : "https://schema.org/InStock",
      "seller": {
        "@type": "LocalBusiness",
        "name": localBusiness.identity.name
      },
      "areaServed": serviceAreas.length > 0 ? serviceAreas : undefined
    },
    "keywords": product.seoScope?.keywords ? product.seoScope.keywords.join(', ') : undefined
  };
}