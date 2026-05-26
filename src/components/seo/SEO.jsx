// src/components/seo/SEO.jsx
import { Helmet } from "react-helmet-async";

import { generateMeta } from "./metaGenerator";

const SEO = ({
  title,
  description,
  image,
  url,
  schema
}) => {
  const meta = generateMeta({
    title,
    description,
    image,
    url
  });

  return (
    <Helmet>
      {/* BASIC */}
      <title>{meta.title}</title>

      <meta
        name="description"
        content={meta.description}
      />

      <link
        rel="canonical"
        href={meta.url}
      />

      {/* OPEN GRAPH */}
      <meta
        property="og:type"
        content="website"
      />

      <meta
        property="og:title"
        content={meta.title}
      />

      <meta
        property="og:description"
        content={meta.description}
      />

      <meta
        property="og:image"
        content={meta.image}
      />

      <meta
        property="og:url"
        content={meta.url}
      />

      {/* TWITTER */}
      <meta
        name="twitter:card"
        content="summary_large_image"
      />

      <meta
        name="twitter:title"
        content={meta.title}
      />

      <meta
        name="twitter:description"
        content={meta.description}
      />

      {/* SCHEMA */}
      {schema && (
        <script type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      )}
    </Helmet>
  );
};

export default SEO;