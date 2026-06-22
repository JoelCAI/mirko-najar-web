// src/hooks/useSlider.js
import { useState, useEffect, useRef, useCallback } from 'react';

export const useSlider = (slides = []) => {
  const totalSlidesOriginal = slides.length;
  const [currentIndex, setCurrentIndex] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const [prevSlides, setPrevSlides] = useState(slides);
  
  const timeoutRef = useRef(null);
  const isMovingRef = useRef(false);
  const touchStartX = useRef(0);
  const touchCurrentX = useRef(0);
  const isDragging = useRef(false);

  // Reiniciar si cambian los datos externamente
  if (slides !== prevSlides) {
    setPrevSlides(slides);
    setCurrentIndex(1);
    setIsTransitioning(false);
  }

  useEffect(() => {
    isMovingRef.current = false;
  }, [slides]);

  const resetTimeout = () => {
    if (timeoutRef.current) clearInterval(timeoutRef.current);
  };

  const handleNext = useCallback(() => {
    if (totalSlidesOriginal <= 1 || isMovingRef.current) return;
    isMovingRef.current = true;
    setIsTransitioning(true);
    setCurrentIndex((prev) => prev + 1);
  }, [totalSlidesOriginal]);

  const handlePrev = () => {
    if (totalSlidesOriginal <= 1 || isMovingRef.current) return;
    isMovingRef.current = true;
    setIsTransitioning(true);
    setCurrentIndex((prev) => prev - 1);
  };

  const handleDotClick = (index) => {
    if (isMovingRef.current || currentIndex === index + 1) return;
    isMovingRef.current = true;
    setIsTransitioning(true);
    setCurrentIndex(index + 1);
  };

  const handleTransitionEnd = () => {
    isMovingRef.current = false; 
    if (currentIndex === 0) {
      setIsTransitioning(false);
      setCurrentIndex(totalSlidesOriginal);
    } else if (currentIndex === totalSlidesOriginal + 1) {
      setIsTransitioning(false);
      setCurrentIndex(1);
    }
  };

  useEffect(() => {
    if (!isTransitioning) {
      const id = setTimeout(() => setIsTransitioning(true), 30);
      return () => clearTimeout(id);
    }
  }, [isTransitioning]);

  // Autoplay dinámico por slide
  useEffect(() => {
    if (totalSlidesOriginal <= 1) return;
    resetTimeout();
    
    let realIndex = currentIndex - 1;
    if (currentIndex === 0) realIndex = totalSlidesOriginal - 1;
    if (currentIndex === totalSlidesOriginal + 1) realIndex = 0;

    const currentDuration = slides[realIndex]?.duration || 3000;

    timeoutRef.current = setInterval(() => {
      handleNext();
    }, currentDuration);

    return () => resetTimeout();
  }, [currentIndex, totalSlidesOriginal, slides, handleNext]);

  // Gestos táctiles
  const handleTouchStart = (e) => {
    if (totalSlidesOriginal <= 1 || isMovingRef.current) return;
    resetTimeout();
    touchStartX.current = e.touches[0].clientX;
    touchCurrentX.current = e.touches[0].clientX;
    isDragging.current = true;
  };

  const handleTouchMove = (e) => {
    if (!isDragging.current) return;
    touchCurrentX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!isDragging.current) return;
    isDragging.current = false;
    const diferenciaX = touchStartX.current - touchCurrentX.current;
    const umbral = 50;
    if (diferenciaX > umbral) handleNext();
    else if (diferenciaX < -umbral) handlePrev();
  };

  const extendedSlides = totalSlidesOriginal > 0 ? [
    slides[totalSlidesOriginal - 1],
    ...slides,
    slides[0]
  ] : [];

  let activeDot = currentIndex - 1;
  if (currentIndex === 0) activeDot = totalSlidesOriginal - 1;
  if (currentIndex === totalSlidesOriginal + 1) activeDot = 0;

  return {
    currentIndex,
    isTransitioning,
    activeDot,
    extendedSlides,
    handleNext,
    handlePrev,
    handleDotClick,
    handleTransitionEnd,
    touchHandlers: {
      onTouchStart: handleTouchStart,
      onTouchMove: handleTouchMove,
      onTouchEnd: handleTouchEnd
    }
  };
};