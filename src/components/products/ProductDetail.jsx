import { useParams } from 'react-router-dom';
import { useCatalogSync } from '../hooks/useCatalogSync';
import SeoManager from '../../seo/SeoManager';
import localBusiness from '../../config/localBusiness.json';

export default function ProductDetail() {
  const { district, slug } = useParams();
  const { products, loading } = useCatalogSync();

  if (loading) return <div className="loading-state">Cargando mueble de autor...</div>;

  // Buscamos el producto que coincida con la URL geográfica
  const producto = products.find(p => p.district === district && p.slug === slug);
  if (!producto) return <div className="error-state">Mueble no encontrado</div>;

  const imageUrlWithVersion = `${producto.image}?v=${producto.imgVersion || '1.0.0'}`;
  
  // Construimos la URL canónica absoluta para el producto localizado
  const canonicalUrl = `${localBusiness.urls.website.replace(/\/$/, '')}/producto/${district}/${slug}`;

  return (
    <article className="product-container">
      {/* 🛡️ El SeoManager toma el control semántico completo del HEAD de forma reactiva */}
      <SeoManager 
        title={`${producto.name}`}
        description={producto.description}
        image={imageUrlWithVersion}
        schemaType="product"
        canonicalUrl={canonicalUrl}
        productData={{
          ...producto,
          image: imageUrlWithVersion
        }}
      />
      
      <div className="gallery">
        <img src={imageUrlWithVersion} alt={producto.name} />
      </div>
      <div className="info">
        <h1>{producto.name}</h1>
        <p className="location-tag">Disponible para despacho en {producto.district}</p>
        <p className="price">{producto.currency} {producto.price}</p>
        <p>{producto.description}</p>
      </div>
    </article>
  );
}