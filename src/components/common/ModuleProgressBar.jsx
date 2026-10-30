import React from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

export const ModuleProgressBar = () => {
  const location = useLocation();

  return (
    <div className="fixed top-0 left-0 right-0 z-50 pointer-events-none overflow-hidden h-[2.5px]">
      <AnimatePresence mode="wait">
        <motion.div
          key={location.pathname}
          initial={{ x: '-100%', opacity: 1 }}
          animate={{ x: '0%', opacity: [1, 1, 0] }}
          exit={{ opacity: 0 }}
          transition={{
            duration: 0.55,
            ease: [0.22, 1, 0.36, 1],
            times: [0, 0.75, 1],
          }}
          className="w-full h-full bg-gradient-to-r from-amber-500 via-amber-300 to-cyan-400 shadow-[0_0_12px_rgba(245,158,11,0.8)]"
        />
      </AnimatePresence>
    </div>
  );
};

