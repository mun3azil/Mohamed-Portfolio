"use client";

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';

interface TypewriterTextProps {
  words: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  delayBetweenWords?: number;
  className?: string;
  cursorClassName?: string;
  infinite?: boolean;
  onComplete?: () => void;
}

const TypewriterText: React.FC<TypewriterTextProps> = ({
  words,
  typingSpeed = 100,
  deletingSpeed = 50,
  delayBetweenWords = 1500,
  className = '',
  cursorClassName = 'text-primary',
  infinite = true,
  onComplete
}) => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const pathname = usePathname();
  
  // Reset animation when route changes
  useEffect(() => {
    setCurrentWordIndex(0);
    setCurrentText('');
    setIsDeleting(false);
    setIsPaused(false);
  }, [pathname]);

  // Cleanup timer on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  // Main typing effect
  useEffect(() => {
    if (words.length === 0) return;
    
    const currentWord = words[currentWordIndex];
    
    // Handle typing, deleting, and word cycling
    const handleTyping = () => {
      if (isPaused) return;
      
      // Deleting text
      if (isDeleting) {
        setCurrentText(prev => prev.substring(0, prev.length - 1));
        
        // When done deleting, move to next word
        if (currentText === '') {
          setIsDeleting(false);
          setCurrentWordIndex(prev => (prev + 1) % words.length);
          
          // If we've completed the cycle and not infinite, stop
          if (currentWordIndex === words.length - 1 && !infinite) {
            if (onComplete) onComplete();
            return;
          }
        }
      } 
      // Typing text
      else {
        setCurrentText(prev => currentWord.substring(0, prev.length + 1));
        
        // When done typing, pause then start deleting
        if (currentText === currentWord) {
          setIsPaused(true);
          timerRef.current = setTimeout(() => {
            setIsPaused(false);
            setIsDeleting(true);
          }, delayBetweenWords);
          return;
        }
      }
      
      // Set the next timeout based on typing or deleting speed
      const speed = isDeleting ? deletingSpeed : typingSpeed;
      timerRef.current = setTimeout(handleTyping, speed);
    };
    
    timerRef.current = setTimeout(handleTyping, 100);
    
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [
    currentText, 
    currentWordIndex, 
    isDeleting, 
    isPaused, 
    words, 
    typingSpeed, 
    deletingSpeed, 
    delayBetweenWords,
    infinite,
    onComplete
  ]);

  return (
    <span className={`inline-flex items-center ${className}`}>
      <span>{currentText}</span>
      <AnimatePresence>
        {!isPaused && (
          <motion.span
            className={`inline-block w-0.5 h-5 ml-0.5 ${cursorClassName}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
            aria-hidden="true"
          />
        )}
      </AnimatePresence>
    </span>
  );
};

export default TypewriterText;
