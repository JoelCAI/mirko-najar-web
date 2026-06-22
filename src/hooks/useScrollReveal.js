// src/hooks/useScrollReveal.js
import { useEffect, useRef } from 'react';

export function useScrollReveal() {
  const elementRef = useRef(null);

  useEffect(() => {
    // El Intersection Observer es un espía nativo del navegador, corre al 100% de velocidad
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Cuando el elemento aparece en la pantalla del celular, le activamos la animación
          entry.target.setAttribute('data-visible', 'true');
        } else {
          // Opcional: Si quieres que desaparezca al salir, remueves el atributo
          entry.target.removeAttribute('data-visible');
        }
      },
      { threshold: 0.1 } // Se activa cuando se ve el 10% del componente
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return elementRef;
}