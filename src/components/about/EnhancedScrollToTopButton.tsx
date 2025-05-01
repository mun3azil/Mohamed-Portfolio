"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaArrowUp, FaRocket } from 'react-icons/fa';
import { useTranslation } from 'next-intl';

interface EnhancedScrollToTopButtonProps {
  showAt?: number;
  style?: 'standard' | 'rocket' | 'bubble';
  color?: string;
  size?: 'small' | 'medium' | 'large';
}

const EnhancedScrollToTopButton: React.FC<EnhancedScrollToTopButtonProps> = ({
  showAt = 500,
  style = 'rocket',
  color,
  size = 'medium'
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const { t } = useTranslation('common');
  
  // Get button size based on prop
  const getButtonSize = () => {
    switch (size) {
      case 'small':
        return 'p-2 text-sm';
      case 'large':
        return 'p-4 text-xl';
      case 'medium':
      default:
        return 'p-3 text-base';
    }
  };
  
  // Get button color based on prop or default
  const getButtonColor = () => {
    if (color) return color;
    return 'bg-primary hover:bg-primary-dark text-white';
  };

  // Show button when page is scrolled down
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > showAt) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, [showAt]);

  // Scroll to top function with animation
  const scrollToTop = () => {
    setIsAnimating(true);
    
    // For rocket style, add a delay before scrolling
    if (style === 'rocket') {
      setTimeout(() => {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
        
        // Reset animation state after scrolling
        setTimeout(() => {
          setIsAnimating(false);
        }, 1000);
      }, 300);
    } else {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
      
      // Reset animation state after scrolling
      setTimeout(() => {
        setIsAnimating(false);
      }, 1000);
    }
  };

  // Get button icon based on style
  const ButtonIcon = style === 'rocket' ? FaRocket : FaArrowUp;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          className={`fixed bottom-8 right-8 ${getButtonSize()} ${getButtonColor()} rounded-full shadow-lg z-50 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2`}
          onClick={scrollToTop}
          aria-label={t('backToTop')}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ 
            opacity: 1, 
            scale: 1,
            y: isAnimating && style === 'rocket' ? -20 : 0
          }}
          exit={{ opacity: 0, scale: 0.5 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          {style === 'bubble' ? (
            <div className="relative">
              <ButtonIcon />
              
              {/* Bubble animation */}
              <AnimatePresence>
                {isAnimating && (
                  <motion.div
                    className="absolute inset-0 rounded-full bg-white/30"
                    initial={{ scale: 1 }}
                    animate={{ scale: 3, opacity: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8 }}
                  />
                )}
              </AnimatePresence>
            </div>
          ) : (
            <ButtonIcon className={isAnimating && style === 'rocket' ? 'animate-pulse' : ''} />
          )}
          
          {/* Tooltip */}
          <motion.span
            className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded whitespace-nowrap"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ delay: 0.2 }}
          >
            {t('backToTop')}
          </motion.span>
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default EnhancedScrollToTopButton;
