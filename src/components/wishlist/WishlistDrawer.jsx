import React from 'react';
import { useCar } from '../../context/CarContext';
import { formatPrice } from '../../utils/formatters';
import { 
  X, 
  Trash2, 
  Heart, 
  CalendarCheck, 
  GitCompare
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const WishlistDrawer = () => {
  const {
    cars,
    wishlistIds,
    toggleWishlist,
    clearWishlist,
    isWishlistOpen,
    setIsWishlistOpen,
    setSelectedCar,
    openBookingForCar,
    addToCompare,
    currency,
  } = useCar();

  if (!isWishlistOpen) return null;

  const savedCars = cars.filter((c) => wishlistIds.includes(c.id));

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-hidden bg-black/75 backdrop-blur-sm flex justify-end">
        <div className="absolute inset-0" onClick={() => setIsWishlistOpen(false)} />

        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 220 }}
          className="relative w-full max-w-md bg-neutral-950 border-l border-white/10 shadow-2xl h-full flex flex-col justify-between z-10"
        >
          {/* Header */}
          <div className="p-6 border-b border-white/10 flex items-center justify-between bg-neutral-950/90 backdrop-blur-md">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-red-500/15 border border-red-500/30 text-red-400 flex items-center justify-center">
                <Heart className="w-5 h-5 fill-red-400" />
              </div>
              <div>
                <h3 className="font-display font-bold text-xl text-white">Private Vault</h3>
                <div className="text-xs font-mono text-neutral-400">
                  {savedCars.length} saved vehicle{savedCars.length !== 1 ? 's' : ''}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {savedCars.length > 0 && (
                <button
                  onClick={clearWishlist}
                  className="p-2 rounded-xl text-neutral-400 hover:text-red-400 hover:bg-neutral-900 transition-colors"
                  title="Clear all saved"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
              <button
                onClick={() => setIsWishlistOpen(false)}
                className="p-2 rounded-xl text-neutral-400 hover:text-white hover:bg-neutral-900 transition-colors"
                aria-label="Close wishlist"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* List of Saved Cars */}
          <div className="p-6 overflow-y-auto flex-1 space-y-4">
            {savedCars.length === 0 ? (
              <div className="py-24 text-center space-y-4">
                <div className="w-16 h-16 rounded-2xl bg-neutral-900 border border-white/10 flex items-center justify-center mx-auto text-neutral-500">
                  <Heart className="w-8 h-8" />
                </div>
                <h4 className="font-display font-bold text-xl text-white">Your Vault is Empty</h4>
                <p className="text-xs text-neutral-400 max-w-xs mx-auto leading-relaxed font-sans">
                  Click the heart icon on any vehicle across the gallery to preserve it in your personal collection.
                </p>
              </div>
            ) : (
              savedCars.map((car) => (
                <div
                  key={car.id}
                  className="group relative rounded-2xl bg-neutral-900/70 border border-white/10 hover:border-amber-400/40 p-4 space-y-3 transition-all"
                >
                  <div className="flex items-center gap-3.5">
                    <img
                      src={car.heroImage}
                      alt={car.name}
                      className="w-20 h-14 object-cover rounded-xl border border-white/10"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="text-[10px] font-mono text-neutral-400 uppercase">{car.brand}</div>
                      <div className="font-display font-bold text-base text-white truncate">{car.name}</div>
                      <div className="font-display font-bold text-sm text-amber-400 mt-0.5">
                        {formatPrice(car.priceUsd, currency)}
                      </div>
                    </div>

                    <button
                      onClick={() => toggleWishlist(car.id)}
                      className="p-2 rounded-xl text-neutral-400 hover:text-red-400 hover:bg-neutral-800 transition-colors"
                      title="Remove from saved"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="flex items-center justify-between pt-2.5 border-t border-white/5 text-xs font-mono">
                    <div className="text-neutral-400">
                      {car.specs.powerHp} HP • {car.specs.acceleration0to100}s
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => addToCompare(car.id)}
                        className="p-1 rounded text-neutral-400 hover:text-cyan-400"
                        title="Add to Comparison"
                      >
                        <GitCompare className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => {
                          setIsWishlistOpen(false);
                          setSelectedCar(car);
                        }}
                        className="text-amber-400 hover:text-amber-300 font-semibold"
                      >
                        View Spec →
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Actions */}
          {savedCars.length > 0 && (
            <div className="p-6 border-t border-white/10 bg-neutral-950/90 backdrop-blur-md space-y-3">
              <button
                onClick={() => {
                  setIsWishlistOpen(false);
                  openBookingForCar(savedCars[0]);
                }}
                className="w-full h-12 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-display font-bold text-xs uppercase tracking-wider shadow-glow-gold flex items-center justify-center gap-2 transition-all"
              >
                <CalendarCheck className="w-4 h-4" />
                Schedule VIP Viewing for Saved
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
