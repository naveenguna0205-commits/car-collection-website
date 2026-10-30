import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCar } from '../../context/CarContext';
import { formatPrice } from '../../utils/formatters';
import { 
  Heart, 
  GitCompare, 
  Zap, 
  Timer, 
  Gauge, 
  Eye, 
  Sparkles,
  CalendarCheck
} from 'lucide-react';
import { motion } from 'framer-motion';

export const CarCard = ({ car, viewMode = 'grid' }) => {
  const navigate = useNavigate();
  const {
    setSelectedCar,
    currency,
    toggleWishlist,
    isInWishlist,
    toggleCompare,
    isInCompare,
    openBookingForCar,
  } = useCar();

  const handleOpenDetails = () => {
    navigate(`/car/${car.id}`);
  };

  const isFavorited = isInWishlist(car.id);
  const isCompared = isInCompare(car.id);

  if (viewMode === 'list') {
    return (
      <motion.div
        layout
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
        className="group relative rounded-3xl bg-neutral-900/75 border border-white/10 hover:border-amber-400/40 p-4 sm:p-5 transition-all duration-300 hover:shadow-card-hover backdrop-blur-md flex flex-col md:flex-row items-center gap-6"
      >
        {/* Thumbnail Image */}
        <div
          onClick={handleOpenDetails}
          className="relative w-full md:w-64 aspect-[16/10] rounded-2xl overflow-hidden cursor-pointer flex-shrink-0"
        >
          <img
            src={car.heroImage}
            alt={car.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute top-3 left-3">
            <span className="text-[10px] font-mono font-semibold uppercase px-2.5 py-1 rounded-full bg-black/75 backdrop-blur-md text-amber-400 border border-amber-400/30">
              {car.category}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 w-full space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 sm:gap-4">
            <div>
              <div className="text-xs font-mono font-medium text-neutral-400 uppercase tracking-wider">
                {car.brand} • {car.modelYear}
              </div>
              <h3
                onClick={handleOpenDetails}
                className="font-display font-bold text-xl sm:text-2xl text-white hover:text-amber-400 transition-colors cursor-pointer mt-0.5"
              >
                {car.name}
              </h3>
            </div>
            <div className="sm:text-right">
              <div className="text-[10px] uppercase font-mono text-neutral-400">Valuation</div>
              <div className="font-display font-extrabold text-xl sm:text-2xl text-white">
                {formatPrice(car.priceUsd, currency)}
              </div>
            </div>
          </div>

          <p className="text-xs text-neutral-300 line-clamp-2 leading-relaxed">
            {car.description}
          </p>

          {/* Specs Bar */}
          <div className="grid grid-cols-3 gap-2 py-1 max-w-md font-mono">
            <div className="px-3 py-1.5 rounded-xl bg-white/5 border border-white/5 text-center">
              <div className="text-[10px] text-neutral-400">POWER</div>
              <div className="text-xs font-bold text-neutral-100">{car.specs.powerHp} HP</div>
            </div>
            <div className="px-3 py-1.5 rounded-xl bg-white/5 border border-white/5 text-center">
              <div className="text-[10px] text-neutral-400">0-100</div>
              <div className="text-xs font-bold text-neutral-100">{car.specs.acceleration0to100}s</div>
            </div>
            <div className="px-3 py-1.5 rounded-xl bg-white/5 border border-white/5 text-center">
              <div className="text-[10px] text-neutral-400">TOP SPEED</div>
              <div className="text-xs font-bold text-neutral-100">{car.specs.topSpeedKmh} km/h</div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex md:flex-col items-center justify-end gap-2.5 w-full md:w-auto">
          <div className="flex items-center gap-2">
            <button
              onClick={() => toggleWishlist(car.id)}
              className={`h-10 w-10 flex items-center justify-center rounded-xl border transition-colors ${
                isFavorited
                  ? 'bg-red-500/15 border-red-500 text-red-400'
                  : 'bg-neutral-800/80 border-white/10 text-neutral-400 hover:text-white'
              }`}
              title="Add to Vault"
            >
              <Heart className={`w-4 h-4 ${isFavorited ? 'fill-red-400' : ''}`} />
            </button>

            <button
              onClick={() => toggleCompare(car.id)}
              className={`h-10 w-10 flex items-center justify-center rounded-xl border transition-colors ${
                isCompared
                  ? 'bg-cyan-500/15 border-cyan-500 text-cyan-400'
                  : 'bg-neutral-800/80 border-white/10 text-neutral-400 hover:text-white'
              }`}
              title="Compare"
            >
              <GitCompare className="w-4 h-4" />
            </button>
          </div>

          <button
            onClick={handleOpenDetails}
            className="h-10 flex-1 md:w-32 px-4 rounded-xl bg-amber-500/15 hover:bg-amber-500 text-amber-400 hover:text-black font-display font-bold text-xs tracking-wider uppercase border border-amber-500/30 transition-all text-center flex items-center justify-center"
          >
            Details
          </button>
        </div>
      </motion.div>
    );
  }

  // Grid / Cinema Card
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className={`group relative rounded-3xl bg-neutral-900/80 border border-white/10 hover:border-amber-400/40 overflow-hidden transition-all duration-300 hover:shadow-card-hover backdrop-blur-md flex flex-col justify-between ${
        viewMode === 'cinema' ? 'col-span-1 md:col-span-2' : ''
      }`}
    >
      {/* Top Media Container */}
      <div className="relative aspect-[16/10] overflow-hidden cursor-pointer" onClick={handleOpenDetails}>
        <img
          src={car.heroImage}
          alt={car.name}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/20 to-transparent" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-start justify-between gap-2 z-10 pointer-events-none">
          <div className="flex flex-wrap items-center gap-1.5 max-w-[75%] pointer-events-auto">
            {car.badge && (
              <span className="text-[9px] sm:text-[10px] font-mono uppercase px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full bg-carbon-950/90 backdrop-blur-md text-amber-400 border border-amber-500/30 font-bold shadow-sm flex items-center gap-1">
                <Sparkles className="w-2.5 h-2.5 flex-shrink-0" />
                <span className="truncate max-w-[90px] sm:max-w-none">{car.badge}</span>
              </span>
            )}
            <span className="text-[9px] sm:text-[10px] font-mono uppercase px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full bg-carbon-950/80 backdrop-blur-md text-neutral-300 border border-white/10">
              {car.category}
            </span>
          </div>

          {/* Quick Action Badges */}
          <div className="flex items-center gap-1.5 flex-shrink-0 pointer-events-auto" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => toggleWishlist(car.id)}
              className={`h-8 w-8 flex items-center justify-center rounded-full backdrop-blur-md border transition-all ${
                isFavorited
                  ? 'bg-red-500/25 border-red-500 text-red-400 shadow-glow-red scale-105'
                  : 'bg-black/60 border-white/20 text-neutral-300 hover:text-white hover:bg-black/80'
              }`}
              title="Save to Favorites"
              aria-label="Save to favorites"
            >
              <Heart className={`w-3.5 h-3.5 ${isFavorited ? 'fill-red-400' : ''}`} />
            </button>

            <button
              onClick={() => toggleCompare(car.id)}
              className={`h-8 w-8 flex items-center justify-center rounded-full backdrop-blur-md border transition-all ${
                isCompared
                  ? 'bg-cyan-500/25 border-cyan-500 text-cyan-400 shadow-glow-cyan scale-105'
                  : 'bg-black/60 border-white/20 text-neutral-300 hover:text-white hover:bg-black/80'
              }`}
              title="Add to Comparison"
              aria-label="Add to comparison"
            >
              <GitCompare className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Hover Inspect Pill */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/45 backdrop-blur-xs pointer-events-none">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-500 text-black font-display font-bold text-xs uppercase tracking-wider shadow-glow-gold transform translate-y-2 group-hover:translate-y-0 transition-transform">
            <Eye className="w-3.5 h-3.5" />
            Inspect Specifications
          </span>
        </div>
      </div>

      {/* Card Body with Clean Alignment */}
      <div className="p-4 sm:p-6 flex-1 flex flex-col justify-between space-y-3.5 sm:space-y-4">
        <div>
          <div className="flex items-center justify-between text-[11px] sm:text-xs font-mono text-neutral-400 mb-1">
            <span className="uppercase font-medium tracking-wider">{car.brand}</span>
            <span>{car.modelYear}</span>
          </div>

          <h3
            onClick={handleOpenDetails}
            className="font-display font-bold text-lg sm:text-xl text-white group-hover:text-amber-400 transition-colors cursor-pointer line-clamp-1"
          >
            {car.name}
          </h3>

          <p className="text-xs text-neutral-400 line-clamp-2 mt-1 leading-relaxed font-sans">
            {car.tagline}
          </p>
        </div>

        {/* Telemetry Chips - 3 Equal Balanced Columns */}
        <div className="grid grid-cols-3 gap-1 sm:gap-2 py-2.5 sm:py-3 border-y border-white/10 font-mono">
          <div className="text-center px-1">
            <div className="flex items-center justify-center gap-1 text-[9px] sm:text-[10px] text-neutral-400 mb-0.5">
              <Zap className="w-3 h-3 text-amber-400 flex-shrink-0" />
              <span>POWER</span>
            </div>
            <div className="text-xs sm:text-sm font-bold text-white truncate">{car.specs.powerHp} HP</div>
          </div>

          <div className="text-center border-x border-white/10 px-1">
            <div className="flex items-center justify-center gap-1 text-[9px] sm:text-[10px] text-neutral-400 mb-0.5">
              <Timer className="w-3 h-3 text-cyan-400 flex-shrink-0" />
              <span>0-100</span>
            </div>
            <div className="text-xs sm:text-sm font-bold text-white truncate">{car.specs.acceleration0to100}s</div>
          </div>

          <div className="text-center px-1">
            <div className="flex items-center justify-center gap-1 text-[9px] sm:text-[10px] text-neutral-400 mb-0.5">
              <Gauge className="w-3 h-3 text-red-400 flex-shrink-0" />
              <span>SPEED</span>
            </div>
            <div className="text-xs sm:text-sm font-bold text-white truncate">{car.specs.topSpeedKmh} km/h</div>
          </div>
        </div>

        {/* Card Footer: Price & Clean Action Buttons */}
        <div className="flex items-center justify-between pt-1 gap-2">
          <div className="min-w-0">
            <div className="text-[9px] sm:text-[10px] uppercase font-mono text-neutral-400">Valuation</div>
            <div className="font-display font-extrabold text-lg sm:text-xl text-white truncate">
              {formatPrice(car.priceUsd, currency)}
            </div>
          </div>

          <div className="flex items-center gap-2 flex-shrink-0">
            <button
              onClick={() => openBookingForCar(car)}
              className="h-9 w-9 flex items-center justify-center rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-300 hover:text-white border border-white/10 transition-colors"
              title="Book Test Drive"
              aria-label="Book test drive"
            >
              <CalendarCheck className="w-4 h-4 text-amber-400" />
            </button>

            <button
              onClick={handleOpenDetails}
              className="h-9 px-4 rounded-xl bg-amber-500/15 hover:bg-amber-500 text-amber-400 hover:text-black font-display font-bold text-xs tracking-wider uppercase border border-amber-500/30 transition-all flex items-center justify-center"
            >
              View
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
