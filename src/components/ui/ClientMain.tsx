"use client";
import { AnimatePresence, motion } from 'framer-motion';
import React, { useEffect } from 'react';
import AOS from 'aos';

const ClientMain = ({ children }: { children: React.ReactNode }) => {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      offset: 60,
      easing: 'ease-in-out',
    });
  }, []);

  return (
    <AnimatePresence mode="wait">
      <motion.main
        className="flex-grow"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
      >
        {children}
      </motion.main>
    </AnimatePresence>
  );
};

export default ClientMain;
