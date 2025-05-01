"use client";

import { useRef, ReactNode, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';

interface ParallaxElementProps {
  children: ReactNode;
  speed?: number; // Positive values move slower, negative values move faster
  direction?: 'vertical' | 'horizontal';
  className?: string;
  reverse?: boolean;
}

const ParallaxElement: React.FC<ParallaxElementProps> = ({
  children,
  speed = 0.5,
  direction = 'vertical',
  className = '',
  reverse = false
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const [elementTop, setElementTop] = useState(0);
  const [clientHeight, setClientHeight] = useState(0);
  const { scrollY } = useScroll();

  // Calculate element position for parallax effect
  useEffect(() => {
    if (!ref.current) return;
    
    const setValues = () => {
      const { top } = ref.current!.getBoundingClientRect();
      setElementTop(top + window.scrollY);
      setClientHeight(window.innerHeight);
    };
    
    setValues();
    window.addEventListener('resize', setValues);
    
    return () => window.removeEventListener('resize', setValues);
  }, [ref]);

  // Calculate parallax range
  const range = [elementTop - clientHeight, elementTop + clientHeight];
  
  // Apply transform based on direction
  const transformValue = useTransform(
    scrollY,
    range,
    direction === 'vertical'
      ? [reverse ? `-${speed * 10}%` : `${speed * 10}%`, reverse ? `${speed * 10}%` : `-${speed * 10}%`]
      : [reverse ? `${speed * 10}%` : `-${speed * 10}%`, reverse ? `-${speed * 10}%` : `${speed * 10}%`]
  );

  // If user prefers reduced motion, disable parallax effect
  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      style={{ 
        [direction === 'vertical' ? 'y' : 'x']: transformValue 
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default ParallaxElement;
