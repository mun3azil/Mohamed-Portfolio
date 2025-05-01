"use client";

import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from 'next-themes';

interface AnimatedBlobProps {
  className?: string;
  color1?: string;
  color2?: string;
  duration?: number;
  size?: number;
  opacity?: number;
  blur?: number;
}

const AnimatedBlob: React.FC<AnimatedBlobProps> = ({
  className = "",
  color1,
  color2,
  duration = 20,
  size = 400,
  opacity = 0.15,
  blur = 60
}) => {
  const { theme } = useTheme();
  const blobRef = useRef<SVGSVGElement>(null);
  
  // Default colors based on theme
  const getDefaultColors = () => {
    if (theme === 'dark') {
      return {
        color1: color1 || '#4f46e5',
        color2: color2 || '#8b5cf6'
      };
    }
    return {
      color1: color1 || '#6366f1',
      color2: color2 || '#a855f7'
    };
  };

  const { color1: defaultColor1, color2: defaultColor2 } = getDefaultColors();

  // Random path variants for organic movement
  const pathVariants = {
    initial: { 
      d: "M67.1,-20.1C74.5,2.8,59.5,33.9,35.2,48.1C10.9,62.3,-22.6,59.5,-42.9,41.7C-63.2,23.8,-70.3,-9.2,-59.9,-31.4C-49.5,-53.6,-21.7,-65,-0.5,-64.8C20.7,-64.6,59.7,-43,67.1,-20.1Z" 
    },
    animate: {
      d: [
        "M67.1,-20.1C74.5,2.8,59.5,33.9,35.2,48.1C10.9,62.3,-22.6,59.5,-42.9,41.7C-63.2,23.8,-70.3,-9.2,-59.9,-31.4C-49.5,-53.6,-21.7,-65,-0.5,-64.8C20.7,-64.6,59.7,-43,67.1,-20.1Z",
        "M54.3,-16.2C64.2,7.9,61.7,38.5,43.7,53.1C25.7,67.7,-7.8,66.3,-33.1,51.5C-58.5,36.7,-75.7,8.4,-70.3,-16.4C-64.9,-41.2,-36.9,-62.5,-9.7,-60.1C17.5,-57.7,44.3,-40.4,54.3,-16.2Z",
        "M59.4,-17.1C68.8,9.4,62.2,41.1,41.4,56.3C20.6,71.5,-14.4,70.2,-38.1,54.1C-61.8,38,-74.2,7.2,-67.1,-18.4C-60,-44,-33.5,-64.4,-5.6,-62.9C22.3,-61.5,50,-43.5,59.4,-17.1Z",
        "M67.1,-20.1C74.5,2.8,59.5,33.9,35.2,48.1C10.9,62.3,-22.6,59.5,-42.9,41.7C-63.2,23.8,-70.3,-9.2,-59.9,-31.4C-49.5,-53.6,-21.7,-65,-0.5,-64.8C20.7,-64.6,59.7,-43,67.1,-20.1Z"
      ],
      transition: {
        duration,
        ease: "easeInOut",
        repeat: Infinity,
        repeatType: "reverse"
      }
    }
  };

  // Apply filter for better performance
  useEffect(() => {
    if (blobRef.current && blur > 0) {
      const filter = `blur(${blur}px)`;
      blobRef.current.style.filter = filter;
    }
  }, [blur, blobRef]);

  return (
    <motion.svg
      ref={blobRef}
      viewBox="0 0 200 200"
      xmlns="http://www.w3.org/2000/svg"
      className={`absolute pointer-events-none ${className}`}
      style={{ 
        width: size, 
        height: size, 
        opacity 
      }}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="blob-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={defaultColor1} />
          <stop offset="100%" stopColor={defaultColor2} />
        </linearGradient>
      </defs>
      <motion.path
        fill="url(#blob-gradient)"
        variants={pathVariants}
        initial="initial"
        animate="animate"
      />
    </motion.svg>
  );
};

export default AnimatedBlob;
