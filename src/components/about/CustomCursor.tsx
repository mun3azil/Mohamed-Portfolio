"use client";

import { useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useTheme } from 'next-themes';

interface CustomCursorProps {
  cursorType?: 'pen' | 'lightbulb' | 'heart' | 'star';
  color?: string;
  size?: number;
  trailEffect?: boolean;
  sectionId?: string;
}

const CustomCursor: React.FC<CustomCursorProps> = ({
  cursorType = 'pen',
  color,
  size = 30,
  trailEffect = true,
  sectionId
}) => {
  const { theme } = useTheme();
  const [isVisible, setIsVisible] = useState(false);
  const [isInSection, setIsInSection] = useState(false);
  
  // Mouse position values
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  // Smooth spring animation for cursor
  const springConfig = { damping: 25, stiffness: 300 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);
  
  // Get cursor icon based on type
  const getCursorIcon = () => {
    switch (cursorType) {
      case 'pen':
        return '✍️';
      case 'lightbulb':
        return '💡';
      case 'heart':
        return '❤️';
      case 'star':
        return '⭐';
      default:
        return '✍️';
    }
  };
  
  // Get cursor color based on theme
  const getCursorColor = () => {
    if (color) return color;
    return theme === 'dark' ? '#8b5cf6' : '#6366f1';
  };
  
  // Update cursor position
  const updateCursorPosition = (e: MouseEvent) => {
    mouseX.set(e.clientX - size / 2);
    mouseY.set(e.clientY - size / 2);
    
    // Check if cursor is in the target section
    if (sectionId) {
      const section = document.getElementById(sectionId);
      if (section) {
        const rect = section.getBoundingClientRect();
        const isInside = 
          e.clientY >= rect.top && 
          e.clientY <= rect.bottom && 
          e.clientX >= rect.left && 
          e.clientX <= rect.right;
        
        setIsInSection(isInside);
      }
    }
  };
  
  // Handle mouse events
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      updateCursorPosition(e);
      setIsVisible(true);
    };
    
    const handleMouseLeave = () => {
      setIsVisible(false);
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    document.body.addEventListener('mouseleave', handleMouseLeave);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.body.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);
  
  // Don't render on mobile devices
  useEffect(() => {
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    if (isMobile) {
      setIsVisible(false);
    }
  }, []);
  
  // Don't render if not in section (when sectionId is provided)
  if (sectionId && !isInSection) {
    return null;
  }
  
  return (
    <>
      {/* Main cursor */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-50 flex items-center justify-center"
        style={{
          x: cursorX,
          y: cursorY,
          opacity: isVisible ? 1 : 0,
          width: size,
          height: size
        }}
      >
        <motion.div
          className="flex items-center justify-center rounded-full"
          style={{
            backgroundColor: getCursorColor(),
            width: '100%',
            height: '100%',
            opacity: 0.6
          }}
          initial={{ scale: 0.5 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.2 }}
        >
          <span className="text-lg">{getCursorIcon()}</span>
        </motion.div>
      </motion.div>
      
      {/* Trail effect (optional) */}
      {trailEffect && (
        <motion.div
          className="fixed top-0 left-0 pointer-events-none z-40 rounded-full"
          style={{
            x: cursorX,
            y: cursorY,
            opacity: isVisible ? 0.2 : 0,
            backgroundColor: getCursorColor(),
            width: size * 1.5,
            height: size * 1.5
          }}
          transition={{ delay: 0.1, damping: 20, stiffness: 150 }}
        />
      )}
    </>
  );
};

export default CustomCursor;
