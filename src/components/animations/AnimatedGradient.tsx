"use client";

import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from 'next-themes';

interface AnimatedGradientProps {
  className?: string;
  colors?: string[];
  duration?: number;
  direction?: 'diagonal' | 'horizontal' | 'vertical' | 'radial';
  opacity?: number;
  children?: React.ReactNode;
}

const AnimatedGradient: React.FC<AnimatedGradientProps> = ({
  className = '',
  colors,
  duration = 15,
  direction = 'diagonal',
  opacity = 0.2,
  children
}) => {
  const { theme } = useTheme();
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Default colors based on theme
  const getDefaultColors = () => {
    if (theme === 'dark') {
      return colors || ['#4338ca', '#6d28d9', '#7c3aed', '#8b5cf6'];
    }
    return colors || ['#6366f1', '#8b5cf6', '#d946ef', '#f472b6'];
  };

  const gradientColors = getDefaultColors();
  
  // Get gradient type based on direction
  const getGradientType = () => {
    switch (direction) {
      case 'horizontal':
        return 'linear-gradient(90deg, VAR_COLORS)';
      case 'vertical':
        return 'linear-gradient(180deg, VAR_COLORS)';
      case 'radial':
        return 'radial-gradient(circle, VAR_COLORS)';
      case 'diagonal':
      default:
        return 'linear-gradient(45deg, VAR_COLORS)';
    }
  };

  // Create gradient string with color stops
  const createGradientString = (colors: string[], offset: number = 0) => {
    const colorStops = colors.map((color, index) => {
      const position = (index * (100 / (colors.length - 1)) + offset) % 100;
      return `${color} ${position}%`;
    }).join(', ');
    
    return getGradientType().replace('VAR_COLORS', colorStops);
  };

  // Animation variants
  const gradientVariants = {
    initial: { 
      backgroundImage: createGradientString(gradientColors, 0),
      backgroundSize: direction === 'radial' ? '200% 200%' : '200% 200%',
      backgroundPosition: '0% 0%'
    },
    animate: {
      backgroundImage: [
        createGradientString(gradientColors, 0),
        createGradientString(gradientColors, 25),
        createGradientString(gradientColors, 50),
        createGradientString(gradientColors, 75),
        createGradientString(gradientColors, 100)
      ],
      backgroundPosition: [
        '0% 0%',
        '50% 50%',
        '100% 100%',
        '50% 50%',
        '0% 0%'
      ],
      transition: {
        duration,
        ease: "linear",
        repeat: Infinity,
        repeatType: "loop"
      }
    }
  };

  return (
    <motion.div
      ref={containerRef}
      className={`relative overflow-hidden ${className}`}
      variants={gradientVariants}
      initial="initial"
      animate="animate"
      style={{ opacity }}
      aria-hidden="true"
    >
      {children}
    </motion.div>
  );
};

export default AnimatedGradient;
