import styles from './Home.module.css';

const Home = () => {
  const placeholderImg = "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1920";

  return (
    <div className={styles.homePage}>
      {/* SECCIÓN 1: Texto centrado (aquí sí usamos container) */}
      <section className={styles.textSection}>
        <h1>Ebanistería & Diseño en Madera</h1>
        <p>Trabajamos con pasión para crear piezas y espacios personalizados con carácter, calidad y valor real.</p>
      </section>

      {/* SECCIÓN 2: Imagen que ocupa el 100% del ancho del mundo */}
      <section className={styles.imageSection}>
        <img src={placeholderImg} alt="Madera infinita" className={styles.fullWidthImg} />
      </section>

      
    </div>
  );
};

export default Home;