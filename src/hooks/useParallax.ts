import { useEffect, useState, useCallback } from 'react';

interface ParallaxValues {
  mouseX: number;
  mouseY: number;
  scrollY: number;
}

export const useParallax = () => {
  const [values, setValues] = useState<ParallaxValues>({
    mouseX: 0,
    mouseY: 0,
    scrollY: 0,
  });

  const handleMouseMove = useCallback((e: MouseEvent) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 2;
    const y = (e.clientY / window.innerHeight - 0.5) * 2;
    setValues(prev => ({
      ...prev,
      mouseX: x,
      mouseY: y,
    }));
  }, []);

  const handleScroll = useCallback(() => {
    setValues(prev => ({
      ...prev,
      scrollY: window.scrollY,
    }));
  }, []);

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleMouseMove, handleScroll]);

  return values;
};

export const getParallaxStyle = (
  mouseX: number,
  mouseY: number,
  depth: number = 1
) => {
  const moveX = mouseX * 20 * depth;
  const moveY = mouseY * 15 * depth;
  const rotateX = mouseY * 3 * depth;
  const rotateY = mouseX * -3 * depth;

  return {
    transform: `translate3d(${moveX}px, ${moveY}px, 0) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
    transition: 'transform 0.3s ease-out',
  };
};
