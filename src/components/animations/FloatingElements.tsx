"use client";

import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from 'next-themes';
import { usePathname } from 'next/navigation';

interface FloatingElement {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  shape: 'circle' | 'square' | 'triangle';
  color?: string;
}

interface FloatingElementsProps {
  count?: number;
  className?: string;
  minSize?: number;
  maxSize?: number;
  minDuration?: number;
  maxDuration?: number;
  shapes?: Array<'circle' | 'square' | 'triangle'>;
  colors?: string[];
  opacity?: number;
}

const FloatingElements: React.FC<FloatingElementsProps> = ({
  count = 15,
  className = '',
  minSize = 5,
  maxSize = 20,
  minDuration = 15,
  maxDuration = 40,
  shapes = ['circle', 'square', 'triangle'],
  colors,
  opacity = 0.15
}) => {
  const { theme } = useTheme();
  const containerRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  
  // Default colors based on theme
  const getDefaultColors = () => {
    if (theme === 'dark') {
      return colors || ['#4f46e5', '#8b5cf6', '#6366f1', '#a855f7'];
    }
    return colors || ['#6366f1', '#8b5cf6', '#d946ef', '#f472b6'];
  };

  const elementColors = getDefaultColors();
  
  // Generate random elements
  const generateElements = (count: number): FloatingElement[] => {
    return Array.from({ length: count }).map((_, index) => ({
      id: index,
      x: Math.random() * 100, // random position (0-100%)
      y: Math.random() * 100,
      size: minSize + Math.random() * (maxSize - minSize),
      duration: minDuration + Math.random() * (maxDuration - minDuration),
      delay: Math.random() * 5, // random delay for more natural movement
      shape: shapes[Math.floor(Math.random() * shapes.length)],
      color: elementColors[Math.floor(Math.random() * elementColors.length)]
    }));
  };
  
  // Generate elements based on count
  const elements = useRef<FloatingElement[]>(generateElements(count));
  
  // Reset elements when route changes
  useEffect(() => {
    elements.current = generateElements(count);
  }, [pathname, count]);
  
  // Render shape based on type
  const renderShape = (element: FloatingElement) => {
    switch (element.shape) {
      case 'square':
        return (
          <rect
            width={element.size}
            height={element.size}
            fill={element.color}
          />
        );
      case 'triangle':
        const size = element.size;
        return (
          <polygon
            points={`${size/2},0 ${size},${size} 0,${size}`}
            fill={element.color}
          />
        );
      case 'circle':
      default:
        return (
          <circle
            r={element.size / 2}
            cx={element.size / 2}
            cy={element.size / 2}
            fill={element.color}
          />
        );
    }
  };

  return (
    <div 
      ref={containerRef}
      className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}
      aria-hidden="true"
      style={{ opacity }}
    >
      {elements.current.map((element) => (
        <motion.div
          key={element.id}
          className="absolute"
          style={{
            left: `${element.x}%`,
            top: `${element.y}%`,
            width: element.size,
            height: element.size
          }}
          animate={{
            x: [
              Math.random() * 100 - 50,
              Math.random() * 100 - 50,
              Math.random() * 100 - 50,
              Math.random() * 100 - 50
            ],
            y: [
              Math.random() * 100 - 50,
              Math.random() * 100 - 50,
              Math.random() * 100 - 50,
              Math.random() * 100 - 50
            ],
            rotate: [0, 180, 360]
          }}
          transition={{
            duration: element.duration,
            delay: element.delay,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "linear"
          }}
        >
          <svg width={element.size} height={element.size} viewBox={`0 0 ${element.size} ${element.size}`}>
            {renderShape(element)}
          </svg>
        </motion.div>
      ))}
    </div>
  );
};

export default FloatingElements;
