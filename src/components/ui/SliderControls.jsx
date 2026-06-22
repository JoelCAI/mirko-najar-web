// src/components/ui/SliderControls.jsx
import styles from './SliderControls.module.css';

export const SliderControls = ({ 
  show, 
  slides = [], 
  activeDot, 
  onDotClick, 
  onPrev, 
  onNext 
}) => {
  if (!show || slides.length <= 1) return null;

  return (
    <>
      <button className={`${styles.arrowBtn} ${styles.leftArrow}`} onClick={onPrev} aria-label="Anterior slide">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
      </button>

      <button className={`${styles.arrowBtn} ${styles.rightArrow}`} onClick={onNext} aria-label="Siguiente slide">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
      </button>

      <div className={styles.dotsContainer}>
        {slides.map((_, index) => (
          <button
            key={`dot-${index}`}
            className={`${styles.dot} ${activeDot === index ? styles.dotActive : ''}`}
            onClick={() => onDotClick(index)}
            aria-label={`Ir al slide ${index + 1}`}
          />
        ))}
      </div>
    </>
  );
};