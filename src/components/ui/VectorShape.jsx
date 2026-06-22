// src/components/ui/VectorShape.jsx

const SHAPES = {
  'wave-smooth': (color) => (
    <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M0,32L120,42.7C240,53,480,75,720,74.7C960,75,1200,53,1320,42.7L1440,32L1440,120L1320,120C1200,120,960,120,720,120C480,120,240,120,120,120L0,120Z" fill={color}/>
    </svg>
  ),
  'wave-diagonal': (color) => (
    <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M0,0L1440,96L1440,120L0,120Z" fill={color}/>
    </svg>
  )
};

export function VectorShape({ type, colorTheme = 'var(--color-secondary)', animation }) {
  const renderSvg = SHAPES[type] || SHAPES['wave-smooth'];

  return (
    <div data-animation={animation} style={{ width: '100%', overflow: 'hidden', lineHeight: 0 }}>
      {renderSvg(colorTheme)}
    </div>
  );
}