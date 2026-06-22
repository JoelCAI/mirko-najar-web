// src/components/ui/EffectVectors.jsx

export const EFFECT_VECTORS = {
  // 🌟 Ahora recibe la propiedad 'isHovered' desde el botón para disparar la animación
  pixelated: ({ isHovered }) => {
    // Definimos los retrasos secuenciales para cada barra (Frecuencia Tetris)
    const delays = [0, 0.05, 0.1, 0.15, 0.2, 0.25];

    return (
      <svg 
        className="effect-vector-pixel"
        viewBox="0 0 100 100" 
        preserveAspectRatio="none" 
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 0, // Se posiciona encima del fondo del chasis pero detrás del texto
          pointerEvents: 'none',
          overflow: 'hidden'
        }}
      >
        {[
          { y: 0, h: 17 },
          { y: 16, h: 17 },
          { y: 32, h: 17 },
          { y: 48, h: 17 },
          { y: 64, h: 17 },
          { y: 80, h: 21 }
        ].map((rect, index) => (
          <rect
            key={index}
            x="0"
            y={rect.y}
            width="100"
            height={rect.h}
            fill="currentColor" /* 🎨 Sigue leyendo tu hover-custom-* de forma nativa */
            style={{
              transform: isHovered ? 'scaleY(1)' : 'scaleY(0)',
              transformOrigin: 'top',
              // Controlamos la física de la cascada directamente con estilos inline dinámicos
              transition: `transform 0.25s cubic-bezier(0.25, 1, 0.5, 1) ${delays[index]}s`
            }}
          />
        ))}
      </svg>
    );
  }
};