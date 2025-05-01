"use client";

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { motion, useAnimation, useMotionValue, useTransform } from 'framer-motion';

interface InteractiveAvatarProps {
  src: string;
  alt: string;
  size?: number;
  className?: string;
  hoverEffect?: 'tilt' | 'glow' | 'scale' | 'border' | 'all';
  borderColor?: string;
  glowColor?: string;
  onClick?: () => void;
}

const InteractiveAvatar: React.FC<InteractiveAvatarProps> = ({
  src,
  alt,
  size = 300,
  className = '',
  hoverEffect = 'all',
  borderColor = '#6366f1',
  glowColor = 'rgba(99, 102, 241, 0.5)',
  onClick
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const controls = useAnimation();
  
  // For tilt effect
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  // Transform mouse position to rotation values
  const rotateX = useTransform(y, [-100, 100], [10, -10]);
  const rotateY = useTransform(x, [-100, 100], [-10, 10]);
  
  // Handle mouse move for tilt effect
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current || !shouldApplyEffect('tilt')) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    x.set(e.clientX - centerX);
    y.set(e.clientY - centerY);
  };
  
  // Reset position when mouse leaves
  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
    controls.start({ scale: 1, boxShadow: '0 0 0 rgba(0, 0, 0, 0)' });
  };
  
  // Apply hover effects
  const handleMouseEnter = () => {
    setIsHovered(true);
    
    if (shouldApplyEffect('scale')) {
      controls.start({ scale: 1.05 });
    }
    
    if (shouldApplyEffect('glow')) {
      controls.start({ 
        boxShadow: `0 0 20px ${glowColor}` 
      });
    }
  };
  
  // Check if effect should be applied
  const shouldApplyEffect = (effect: string) => {
    return hoverEffect === 'all' || hoverEffect === effect;
  };
  
  // Border style based on hover state
  const getBorderStyle = () => {
    if (shouldApplyEffect('border') && isHovered) {
      return `4px solid ${borderColor}`;
    }
    return '4px solid transparent';
  };

  return (
    <motion.div
      ref={containerRef}
      className={`relative rounded-full overflow-hidden cursor-pointer ${className}`}
      style={{ 
        width: size, 
        height: size,
        rotateX: shouldApplyEffect('tilt') ? rotateX : 0,
        rotateY: shouldApplyEffect('tilt') ? rotateY : 0,
        border: getBorderStyle(),
        transformStyle: 'preserve-3d',
        perspective: 1000
      }}
      animate={controls}
      initial={{ scale: 1, boxShadow: '0 0 0 rgba(0, 0, 0, 0)' }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      whileTap={{ scale: 0.95 }}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes={`${size}px`}
        className="object-cover"
        priority
      />
      
      {/* Overlay for hover effects */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-tr from-transparent via-transparent to-white"
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 0.15 : 0 }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  );
};

export default InteractiveAvatar;
