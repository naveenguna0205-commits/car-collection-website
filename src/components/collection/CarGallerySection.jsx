import React, { useState, useMemo, useEffect } from 'react';
import { useCar } from '../../context/CarContext';
import { CarCard } from './CarCard';
import { formatPrice } from '../../utils/formatters';
import {
  Search,
  SlidersHorizontal,
  RotateCcw,
  LayoutGrid,
  Columns,
  List,
  Sparkles,
  Flame
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const CATEGORIES = [
  'All',
  'Hypercar',
  'Supercar',
  'Grand Tourer',
  'Luxury SUV',
  'Ultra-Luxury',
];

export const CarGallerySection = ({ initialCategory = 'All' }) => {
  const { cars, currency } = useCar();

  // Filter States
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);

  useEffect(() => {
    if (initialCategory) {
      setSelectedCategory(initialCategory);
    }
  }, [initialCategory]);
  const [selectedBrand, setSelectedBrand] = useState('All');
  const [selectedFuel, setSelectedFuel] = useState('All');
  const [maxPrice, setMaxPrice] = useState(5000000);
  const [minHp, setMinHp] = useState(0);
  const [sortBy, setSortBy] = useState('featured');
  const [viewMode, setViewMode] = useState('grid');
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);

  // Extract unique brands
  const availableBrands = useMemo(() => {
    const brands = Array.from(new Set(cars.map((c) => c.brand))).sort();
    return ['All', ...brands];
  }, [cars]);

  // Filter and sort cars
  const filteredCars = useMemo(() => {
    return cars.filter((car) => {
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = car.name.toLowerCase().includes(query);
        const matchesBrand = car.brand.toLowerCase().includes(query);
        const matchesEngine = car.specs.engine.toLowerCase().includes(query);
        const matchesTagline = car.tagline.toLowerCase().includes(query);
        if (!matchesName && !matchesBrand && !matchesEngine && !matchesTagline) {
          return false;
        }
      }

      if (selectedCategory !== 'All' && car.category !== selectedCategory) {
        return false;
      }

      if (selectedBrand !== 'All' && car.brand !== selectedBrand) {
        return false;
      }

      if (selectedFuel !== 'All' && car.specs.fuelType !== selectedFuel) {
        return false;
      }

      if (car.priceUsd > maxPrice) {
        return false;
      }

      if (car.specs.powerHp < minHp) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.priceUsd - b.priceUsd;
      if (sortBy === 'price-desc') return b.priceUsd - a.priceUsd;
      if (sortBy === 'hp-desc') return b.specs.powerHp - a.specs.powerHp;
      if (sortBy === 'accel-asc') return a.specs.acceleration0to100 - b.specs.acceleration0to100;
      if (sortBy === 'year-desc') return b.modelYear - a.modelYear;
      return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
    });
  }, [cars, searchQuery, selectedCategory, selectedBrand, selectedFuel, maxPrice, minHp, sortBy]);

  const hasActiveFilters =
    searchQuery !== '' ||
    selectedCategory !== 'All' ||
    selectedBrand !== 'All' ||
    selectedFuel !== 'All' ||
    maxPrice < 5000000 ||
    minHp > 0;

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    setSelectedBrand('All');
    setSelectedFuel('All');
    setMaxPrice(5000000);
    setMinHp(0);
    setSortBy('featured');
  };

  return (
    <section id="collection" className="py-24 bg-carbon-950 relative border-t border-white/5">
      {/* Background ambience */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-amber-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-80 h-80 bg-cyan-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Header with Clean Alignment */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div className="space-y-2.5">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-semibold tracking-wider bg-amber-500/10 border border-amber-500/30 text-amber-400">
              <Flame className="w-3.5 h-3.5" />
              GLOBAL INVENTORY
            </div>
            <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-white tracking-tight">
              The Sovereign Collection
            </h2>
            <p className="text-neutral-400 text-sm sm:text-base max-w-xl font-sans">
              Curated masterworks of speed, luxury, and horological precision. All allocations factory-verified and road-ready.
            </p>
          </div>

          {/* Quick Counter & Layout Switcher */}
          <div className="flex items-center gap-3 self-start md:self-end">
            <span className="h-10 px-3.5 rounded-xl bg-neutral-900/90 border border-white/10 text-xs font-mono text-neutral-300 flex items-center">
              Showing <strong className="text-amber-400 mx-1">{filteredCars.length}</strong> of {cars.length} exotics
            </span>

            <div className="h-10 hidden sm:flex items-center rounded-xl bg-neutral-900/90 border border-white/10 p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`h-8 w-8 flex items-center justify-center rounded-lg transition-colors ${viewMode === 'grid' ? 'bg-amber-500 text-black shadow-glow-gold' : 'text-neutral-400 hover:text-white'
                  }`}
                title="Grid View"
                aria-label="Grid View"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('cinema')}
                className={`h-8 w-8 flex items-center justify-center rounded-lg transition-colors ${viewMode === 'cinema' ? 'bg-amber-500 text-black shadow-glow-gold' : 'text-neutral-400 hover:text-white'
                  }`}
                title="Cinema Wide View"
                aria-label="Cinema Wide View"
              >
                <Columns className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`h-8 w-8 flex items-center justify-center rounded-lg transition-colors ${viewMode === 'list' ? 'bg-amber-500 text-black shadow-glow-gold' : 'text-neutral-400 hover:text-white'
                  }`}
                title="Detailed List View"
                aria-label="Detailed List View"
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Filter Bar Controls - Consistent H-12 Elements & Alignment */}
        <div className="p-4 sm:p-5 rounded-3xl bg-neutral-900/80 border border-white/10 backdrop-blur-xl mb-10 space-y-4 shadow-xl">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">

            {/* Search Input */}
            <div className="md:col-span-5 relative">
              <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by model, brand, V12, 1,000+ HP..."
                className="w-full h-12 pl-11 pr-14 rounded-xl bg-neutral-950 border border-white/10 text-white text-sm placeholder:text-neutral-500 focus:outline-none focus:border-amber-400 font-sans"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-mono text-neutral-400 hover:text-white px-1.5 py-0.5 rounded bg-white/5"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Brand Dropdown */}
            <div className="md:col-span-3">
              <select
                value={selectedBrand}
                onChange={(e) => setSelectedBrand(e.target.value)}
                className="w-full h-12 px-3.5 rounded-xl bg-neutral-950 border border-white/10 text-white text-sm focus:outline-none focus:border-amber-400 font-sans cursor-pointer"
                aria-label="Filter by brand"
              >
                <option value="All">All Manufacturers</option>
                {availableBrands.filter(b => b !== 'All').map((b) => (
                  <option key={b} value={b}>{b}</option>
                ))}
              </select>
            </div>

            {/* Sort Options */}
            <div className="md:col-span-3">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full h-12 px-3.5 rounded-xl bg-neutral-950 border border-white/10 text-white text-sm focus:outline-none focus:border-amber-400 font-sans cursor-pointer"
                aria-label="Sort vehicles"
              >
                <option value="featured">Vault Curated (Featured First)</option>
                <option value="price-desc">Price: Highest to Lowest</option>
                <option value="price-asc">Price: Lowest to Highest</option>
                <option value="hp-desc">Horsepower: Maximum to Minimum</option>
                <option value="accel-asc">0-100 km/h: Fastest to Slowest</option>
                <option value="year-desc">Year: Newest Allocations</option>
              </select>
            </div>

            {/* Advanced Filters Toggle Button */}
            <div className="md:col-span-1">
              <button
                onClick={() => setIsFilterDrawerOpen(!isFilterDrawerOpen)}
                className={`w-full h-12 rounded-xl border flex items-center justify-center transition-colors ${isFilterDrawerOpen || hasActiveFilters
                    ? 'bg-amber-500/20 border-amber-500 text-amber-400 shadow-glow-gold'
                    : 'bg-neutral-950 border-white/10 text-neutral-400 hover:text-white hover:border-white/25'
                  }`}
                title="Toggle Advanced Filters"
                aria-label="Toggle Advanced Filters"
              >
                <SlidersHorizontal className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Category Navigation Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none pt-1">
            {CATEGORIES.map((cat) => {
              const count = cat === 'All'
                ? cars.length
                : cars.filter((c) => c.category === cat).length;
              const isActive = selectedCategory === cat;

              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`relative h-9 flex-shrink-0 px-4 rounded-xl text-xs font-display font-medium tracking-wide transition-colors flex items-center gap-2 ${isActive
                      ? 'text-black font-bold'
                      : 'bg-neutral-950/80 hover:bg-neutral-800 text-neutral-300 border border-white/10'
                    }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeCategoryPill"
                      className="absolute inset-0 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 shadow-glow-gold"
                      transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                    />
                  )}
                  <span className="relative z-10">{cat}</span>
                  <span className={`relative z-10 text-[10px] font-mono px-1.5 py-0.5 rounded-full ${isActive ? 'bg-black/20 text-black font-bold' : 'bg-white/10 text-neutral-400'
                    }`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Expandable Advanced Filters Drawer */}
          <AnimatePresence>
            {isFilterDrawerOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="pt-4 border-t border-white/10 grid grid-cols-1 sm:grid-cols-3 gap-6 overflow-hidden"
              >
                {/* Max Price Slider */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs font-mono text-neutral-400">
                    <span>MAX VALUATION</span>
                    <span className="text-amber-400 font-bold">{formatPrice(maxPrice, currency)}</span>
                  </div>
                  <input
                    type="range"
                    min="200000"
                    max="5000000"
                    step="50000"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(Number(e.target.value))}
                    className="w-full accent-amber-500 cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] font-mono text-neutral-500">
                    <span>{formatPrice(200000, currency)}</span>
                    <span>{formatPrice(5000000, currency)}+</span>
                  </div>
                </div>

                {/* Min Horsepower Slider */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs font-mono text-neutral-400">
                    <span>MINIMUM POWER</span>
                    <span className="text-amber-400 font-bold">{minHp} HP+</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="1800"
                    step="50"
                    value={minHp}
                    onChange={(e) => setMinHp(Number(e.target.value))}
                    className="w-full accent-amber-500 cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] font-mono text-neutral-500">
                    <span>Any HP</span>
                    <span>1,800 HP</span>
                  </div>
                </div>

                {/* Powertrain / Fuel Filter */}
                <div className="space-y-2">
                  <div className="text-xs font-mono text-neutral-400">POWERTRAIN TYPE</div>
                  <div className="grid grid-cols-4 gap-1.5">
                    {['All', 'Petrol', 'Hybrid', 'Electric'].map((fuel) => (
                      <button
                        key={fuel}
                        onClick={() => setSelectedFuel(fuel)}
                        className={`h-9 px-2 rounded-lg text-xs font-mono transition-all text-center ${selectedFuel === fuel
                            ? 'bg-amber-500 text-black font-bold'
                            : 'bg-neutral-950 border border-white/10 text-neutral-400 hover:text-white'
                          }`}
                      >
                        {fuel}
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Active Filter Chips & Reset */}
          {hasActiveFilters && (
            <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-white/5 text-xs">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-neutral-400 font-mono">Active Filters:</span>
                {searchQuery && (
                  <span className="px-2.5 py-1 rounded-md bg-amber-500/10 border border-amber-500/30 text-amber-400 font-mono">
                    "{searchQuery}"
                  </span>
                )}
                {selectedCategory !== 'All' && (
                  <span className="px-2.5 py-1 rounded-md bg-neutral-800 border border-white/10 text-neutral-200">
                    Category: {selectedCategory}
                  </span>
                )}
                {selectedBrand !== 'All' && (
                  <span className="px-2.5 py-1 rounded-md bg-neutral-800 border border-white/10 text-neutral-200">
                    Brand: {selectedBrand}
                  </span>
                )}
                {selectedFuel !== 'All' && (
                  <span className="px-2.5 py-1 rounded-md bg-neutral-800 border border-white/10 text-neutral-200">
                    Fuel: {selectedFuel}
                  </span>
                )}
                {maxPrice < 5000000 && (
                  <span className="px-2.5 py-1 rounded-md bg-neutral-800 border border-white/10 text-neutral-200">
                    &lt; {formatPrice(maxPrice, currency)}
                  </span>
                )}
                {minHp > 0 && (
                  <span className="px-2.5 py-1 rounded-md bg-neutral-800 border border-white/10 text-neutral-200">
                    &gt; {minHp} HP
                  </span>
                )}
              </div>

              <button
                onClick={resetFilters}
                className="inline-flex items-center gap-1.5 text-xs text-amber-400 hover:text-amber-300 font-mono font-medium underline-offset-4 hover:underline"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset All</span>
              </button>
            </div>
          )}
        </div>

        {/* Gallery Results Display with Fluid Layout Morphing */}
        {filteredCars.length > 0 ? (
          <motion.div
            layout
            className={`grid gap-6 ${viewMode === 'grid'
                ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
                : viewMode === 'cinema'
                  ? 'grid-cols-1 md:grid-cols-2'
                  : 'grid-cols-1'
              }`}
          >
            <AnimatePresence mode="popLayout">
              {filteredCars.map((car) => (
                <motion.div
                  layout
                  key={car.id}
                  initial={{ opacity: 0, scale: 0.94 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.94 }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                >
                  <CarCard car={car} viewMode={viewMode} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        ) : (
          <div className="py-20 text-center rounded-3xl bg-neutral-900/40 border border-white/10 p-8 space-y-4 max-w-lg mx-auto">
            <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center mx-auto text-amber-400">
              <Sparkles className="w-8 h-8" />
            </div>
            <h3 className="font-display font-bold text-2xl text-white">
              No Vehicles Match Your Criteria
            </h3>
            <p className="text-neutral-400 text-sm leading-relaxed">
              We couldn't locate any vehicles matching your active filter configuration. Aura Motors VIP Concierge can source off-market unicorn allocations upon request.
            </p>
            <div className="pt-2">
              <button
                onClick={resetFilters}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-black font-display font-bold text-xs uppercase tracking-wider shadow-glow-gold hover:shadow-xl transition-all"
              >
                Reset Search Filters
              </button>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
