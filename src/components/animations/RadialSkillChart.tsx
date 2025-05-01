"use client";

import { useRef, useEffect } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { useTheme } from 'next-themes';

interface RadialSkillChartProps {
  percentage: number;
  size?: number;
  strokeWidth?: number;
  duration?: number;
  label?: string;
  className?: string;
  color?: string;
  icon?: React.ReactNode;
}

const RadialSkillChart: React.FC<RadialSkillChartProps> = ({
  percentage,
  size = 120,
  strokeWidth = 8,
  duration = 1.5,
  label,
  className = '',
  color,
  icon
}) => {
  const { theme } = useTheme();
  const chartRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(chartRef, { once: true, amount: 0.3 });
  const prefersReducedMotion = useReducedMotion();
  
  // Calculate dimensions
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const fillPercentage = (100 - percentage) * circumference / 100;
  
  // Default color based on theme
  const getDefaultColor = () => {
    if (theme === 'dark') {
      return color || '#8b5cf6';
    }
    return color || '#6366f1';
  };

  const chartColor = getDefaultColor();
  
  // Animation variants
  const circleVariants = {
    hidden: { 
      strokeDashoffset: circumference,
      transition: { duration: 0 }
    },
    visible: { 
      strokeDashoffset: fillPercentage,
      transition: { 
        duration: prefersReducedMotion ? 0 : duration,
        ease: "easeOut" 
      }
    }
  };

  return (
    <div 
      ref={chartRef}
      className={`flex flex-col items-center justify-center ${className}`}
    >
      <div className="relative">
        <svg
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
          className="transform -rotate-90"
        >
          {/* Background circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={theme === 'dark' ? '#374151' : '#e5e7eb'}
            strokeWidth={strokeWidth}
          />
          
          {/* Foreground circle (animated) */}
          <motion.circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={chartColor}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circumference}
            variants={circleVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          />
        </svg>
        
        {/* Percentage text in the middle */}
        <div className="absolute inset-0 flex items-center justify-center">
          {icon ? (
            <div className="text-2xl text-gray-800 dark:text-gray-200">
              {icon}
            </div>
          ) : (
            <motion.div
              className="text-xl font-bold text-gray-800 dark:text-gray-200"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.5, delay: duration * 0.5 }}
            >
              {percentage}%
            </motion.div>
          )}
        </div>
      </div>
      
      {/* Label */}
      {label && (
        <motion.p
          className="mt-3 text-center text-sm font-medium text-gray-700 dark:text-gray-300"
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          transition={{ duration: 0.5, delay: duration * 0.7 }}
        >
          {label}
        </motion.p>
      )}
    </div>
  );
};

export default RadialSkillChart;
