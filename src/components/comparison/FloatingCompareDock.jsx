import React from 'react';
import { Link } from 'react-router-dom';
import { useCar } from '../../context/CarContext';
import { GitCompare, X, ArrowRight, Trash2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const FloatingCompareDock = () => {
  const {
    cars,
    compareIds,
    removeFromCompare,
    clearCompare,
  } = useCar();

  if (compareIds.length === 0) return null;

  const comparedCars = cars.filter((c) => compareIds.includes(c.id));

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 80, opacity: 0 }}
        className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 max-w-2xl w-[92%] sm:w-auto"
      >
        <div className="p-3 sm:px-5 sm:py-3.5 rounded-2xl bg-neutral-950/90 backdrop-blur-2xl border border-white/20 shadow-2xl flex items-center justify-between gap-4 sm:gap-6 shadow-glow-cyan">
          {/* Left: Indicator */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-cyan-500/20 border border-cyan-500/40 text-cyan-400 flex items-center justify-center">
              <GitCompare className="w-4 h-4" />
            </div>
            <div className="hidden sm:block">
              <div className="text-xs font-bold text-white tracking-wide">
                Comparison Dock ({comparedCars.length}/4)
              </div>
              <div className="text-[10px] text-neutral-400 font-mono">
                Side-by-side spec evaluation
              </div>
            </div>
          </div>

          {/* Middle: Thumbnails */}
          <div className="flex items-center gap-2 overflow-x-auto">
            {comparedCars.map((car) => (
              <div
                key={car.id}
                className="relative group w-12 h-10 rounded-lg overflow-hidden border border-white/20 flex-shrink-0"
              >
                <img
                  src={car.heroImage}
                  alt={car.name}
                  className="w-full h-full object-cover"
                />
                <button
                  onClick={() => removeFromCompare(car.id)}
                  className="absolute inset-0 bg-red-950/80 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  title="Remove vehicle"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>

          {/* Right: CTA & Clear */}
          <div className="flex items-center gap-2">
            <button
              onClick={clearCompare}
              className="p-2 rounded-xl text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
              title="Clear all"
            >
              <Trash2 className="w-4 h-4" />
            </button>

            <Link
              to="/compare"
              className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-bold text-xs uppercase tracking-wider transition-all shadow-glow-cyan flex items-center gap-1.5"
            >
              <span>Compare</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

