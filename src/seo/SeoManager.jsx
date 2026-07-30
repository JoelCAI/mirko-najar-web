import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import localBusiness from '../config/localBusiness.json';
import { generateLocalBusinessSchema, generateProductSchema, sanitizeCanonicalUrl } from './seoGuard';

export default function SeoManager({ 
  title, 
  description, 
  image, 
  schemaType = 'localBusiness', 
  productData = null,
  canonicalUrl = null
}) {
  const { pathname } = useLocation();
  const { seo, urls, media, integrations } = localBusiness;

  // 1. Resolver el canonical definitivo
  const finalCanonical = canonicalUrl || sanitizeCanonicalUrl(pathname);

  // 2. Resolver textos contextuales (Geolocalización comercial)
  let finalTitleTemplate = title;
  let computedKeywords = [...seo.defaultKeywords];

  if (schemaType === 'product' && productData) {
    const scope = productData.seoScope;
    const primaryDistrict = productData.district || scope?.districts?.[0] || '';
    const primaryAvenue = scope?.avenues?.[0] || '';
    
    const geoContext = primaryDistrict 
      ? ` en ${primaryDistrict.charAt(0).toUpperCase() + primaryDistrict.slice(1)}${primaryAvenue ? ` (Cerca de ${primaryAvenue})` : ''}` 
      : '';
      
    finalTitleTemplate = `${productData.name}${geoContext}`;

    if (scope?.keywords) {
      computedKeywords = [...new Set([...scope.keywords, ...computedKeywords])];
    }
  }

  const finalTitle = finalTitleTemplate 
    ? seo.titleTemplate.replace('%s', finalTitleTemplate) 
    : seo.defaultTitle;
    
  const finalDescription = description || seo.defaultDescription;
  const finalImage = image || `${urls.website}${media.ogImage || media.coverImage}`;

  // 3. Resolver el Schema estructurado JSON-LD
  const schemaData = schemaType === 'product' && productData
    ? generateProductSchema(productData, finalCanonical)
    : generateLocalBusinessSchema();

  return (
    <Helmet>
      {/* 📋 SEO Estándar */}
      <title>{finalTitle}</title>
      <meta name="description" content={finalDescription} />
      <meta name="keywords" content={computedKeywords.join(', ')} />
      <link rel="canonical" href={finalCanonical} />
      {integrations?.googleSiteVerification && (
        <meta name="google-site-verification" content={integrations.googleSiteVerification} />
      )}

      {/* 🌐 Open Graph (Redes Sociales y Bots de mensajería) */}
      <meta property="og:title" content={finalTitle} />
      <meta property="og:description" content={finalDescription} />
      <meta property="og:image" content={finalImage} />
      <meta property="og:url" content={finalCanonical} />
      <meta property="og:type" content={schemaType === 'product' ? 'product' : 'website'} />

      {/* 🛒 Datos extendidos de E-commerce para Open Graph */}
      {schemaType === 'product' && productData && (
        <meta property="product:price:amount" content={Number(productData.price).toFixed(2)} />
      )}
      {schemaType === 'product' && productData && (
        <meta property="product:price:currency" content={productData.currency || localBusiness.business.currency} />
      )}
      {schemaType === 'product' && productData && (
        <meta property="product:availability" content={productData.outOfStock ? 'outofstock' : 'instock'} />
      )}

      {/* 🐦 Twitter Cards */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={finalTitle} />
      <meta name="twitter:description" content={finalDescription} />
      <meta name="twitter:image" content={finalImage} />
      {seo.twitterHandle && <meta name="twitter:site" content={seo.twitterHandle} />}

      {/* 🤖 Sincronización de Datos Estructurados JSON-LD */}
      <script type="application/ld+json">
        {JSON.stringify(schemaData)}
      </script>
    </Helmet>
  );
}