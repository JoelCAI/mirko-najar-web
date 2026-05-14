// src/components/seo/SEO.jsx
import { Helmet } from 'react-helmet-async';
import { defaultSEO } from '../../seo/seoConfig';

const SEO = ({ title, description, image, url }) => {
  const seoTitle = title ? `${title} | Woodcraft` : defaultSEO.title;
  const seoDesc = description || defaultSEO.description;
  const seoImage = image || defaultSEO.ogImage;
  const seoUrl = url || defaultSEO.siteUrl; // <-- Usamos la URL

  return (
    <Helmet>
      <title>{seoTitle}</title>
      <meta name="description" content={seoDesc} />
      <link rel="canonical" href={seoUrl} /> {/* <-- Aquí se usa la variable */}
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={seoUrl} />
      <meta property="og:title" content={seoTitle} />
      <meta property="og:description" content={seoDesc} />
      <meta property="og:image" content={seoImage} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={seoTitle} />
      <meta name="twitter:description" content={seoDesc} />
    </Helmet>
  );
};

export default SEO;