import React from 'react';
import { Link } from 'react-router-dom';
import { useCar } from '../context/CarContext';
import { CarCard } from '../components/collection/CarCard';
import { Heart, Trash2, ArrowRight } from 'lucide-react';

export const WishlistPage = () => {
  const { cars, wishlistIds, clearWishlist } = useCar();

  const savedCars = cars.filter((c) => wishlistIds.includes(c.id));

  return (
    <div className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-white/10 pb-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-semibold tracking-wider bg-rose-500/10 border border-rose-500/30 text-rose-400">
            <Heart className="w-3.5 h-3.5 fill-rose-500" />
            SAVED VAULT ALLOCATIONS
          </div>
          <h1 className="font-display font-extrabold text-3xl sm:text-5xl text-white tracking-tight">
            Your Private Wishlist
          </h1>
          <p className="text-neutral-400 text-sm font-sans">
            Vehicles earmarked for private acquisition, test drive reservation, and telemetry analysis.
          </p>
        </div>

        {savedCars.length > 0 && (
          <button
            onClick={clearWishlist}
            className="h-10 px-4 rounded-xl bg-white/5 hover:bg-rose-500/20 text-neutral-300 hover:text-rose-400 border border-white/10 hover:border-rose-500/40 text-xs font-display font-bold uppercase tracking-wider flex items-center gap-2 transition-all self-start sm:self-end"
          >
            <Trash2 className="w-4 h-4" />
            <span>Clear Wishlist</span>
          </button>
        )}
      </div>

      {savedCars.length === 0 ? (
        <div className="p-16 rounded-3xl bg-neutral-900/40 border border-white/10 text-center space-y-4 max-w-md mx-auto">
          <div className="w-16 h-16 rounded-3xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400 mx-auto">
            <Heart className="w-8 h-8" />
          </div>
          <h3 className="font-display font-bold text-xl text-white">Your Vault is Empty</h3>
          <p className="text-neutral-400 text-xs font-sans">
            You have not saved any vehicle allocations to your wishlist yet.
          </p>
          <div className="pt-2">
            <Link
              to="/collection"
              className="h-11 px-6 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-display font-bold text-xs uppercase tracking-wider inline-flex items-center gap-2 transition-all shadow-gold"
            >
              Explore 12 Exotics
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {savedCars.map((car) => (
            <CarCard key={car.id} car={car} viewMode="grid" />
          ))}
        </div>
      )}
    </div>
  );
};

