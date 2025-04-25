"use client";
import { AnimatePresence, motion } from 'framer-motion';
import React from 'react';

const ClientMain = ({ children }: { children: React.ReactNode }) => (
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

export default ClientMain;
