import React from 'react';
import { Link } from 'react-router-dom';
import { BRANDS_DATA } from '../data/cars';
import { useCar } from '../context/CarContext';
import { CAR_IMAGES } from '../assets/images';
import { Crown, ArrowRight } from 'lucide-react';

export const BrandsPage = () => {
  const { cars } = useCar();

  const categories = [
    {
      title: 'Hypercar Vault',
      tagline: '1,000+ BHP • Multimillion Masterpieces',
      image: CAR_IMAGES.bugattiTourbillon,
      category: 'Hypercar',
      carsCount: '4 Allocations',
      desc: 'The pinnacle of aerodynamic force and internal combustion / hybrid mastery, shattering limits beyond 400 km/h.'
    },
    {
      title: 'Supercar Dynasty',
      tagline: 'Flacht & Maranello Track Purity',
      image: CAR_IMAGES.porscheGt3rs,
      category: 'Supercar',
      carsCount: '3 Allocations',
      desc: 'Naturally aspirated screams, active DRS aero, and carbon tubs engineered for telepathic driver connection.'
    },
    {
      title: 'Grand Tourers',
      tagline: 'Effortless Pace & V12 Rumble',
      image: CAR_IMAGES.astonMartinDbs,
      category: 'Grand Tourer',
      carsCount: '2 Allocations',
      desc: 'Cross continents in unmatched acoustic glory, cocooned in semi-aniline leather with immense twin-turbo torque.'
    },
    {
      title: 'Luxury Performance SUVs',
      tagline: 'All-Terrain Dominance with Track Records',
      image: CAR_IMAGES.lamborghiniUrus,
      category: 'Luxury SUV',
      carsCount: '3 Allocations',
      desc: 'Pikes Peak record-setters and Goodwood bespoke magic carpet ride vehicles conquering desert, snow, and city.'
    }
  ];

  return (
    <div className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-semibold tracking-wider bg-amber-500/10 border border-amber-500/30 text-amber-400">
          <Crown className="w-3.5 h-3.5" />
          DYNASTIES & MARQUES
        </div>
        <h1 className="font-display font-extrabold text-3xl sm:text-5xl text-white tracking-tight">
          Legendary Automotive Manufacturers
        </h1>
        <p className="text-neutral-400 text-sm sm:text-base font-sans">
          From the horological precision of Molsheim to the screaming naturally aspirated V8s of Maranello, explore the storied marques shaping our private collection.
        </p>
      </div>

      {/* Categories */}
      <div className="space-y-8">
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div>
            <span className="text-xs font-mono text-amber-400 uppercase tracking-wider">CLASSIFICATIONS</span>
            <h2 className="text-2xl font-display font-bold text-white">Curated Categories</h2>
          </div>
          <Link
            to="/collection"
            className="text-xs font-display font-bold text-amber-400 hover:text-amber-300 flex items-center gap-1 uppercase"
          >
            <span>All Categories</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat, i) => (
            <Link
              key={i}
              to={`/collection?category=${encodeURIComponent(cat.category)}`}
              className="group relative rounded-3xl overflow-hidden border border-white/10 hover:border-amber-400/50 transition-all duration-500 bg-neutral-900 shadow-xl flex flex-col justify-between p-6 aspect-[4/5]"
            >
              <img
                src={cat.image}
                alt={cat.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-carbon-950 via-carbon-950/70 to-transparent" />

              <div className="relative z-10 flex justify-between items-start">
                <span className="text-[10px] font-mono font-semibold uppercase px-2.5 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  {cat.carsCount}
                </span>
              </div>

              <div className="relative z-10 space-y-2">
                <h3 className="font-display font-bold text-xl text-white group-hover:text-amber-400 transition-colors">
                  {cat.title}
                </h3>
                <p className="text-xs text-neutral-300 font-sans line-clamp-2">
                  {cat.desc}
                </p>
                <div className="pt-2 flex items-center gap-1.5 text-xs font-display font-bold text-amber-400">
                  <span>Browse {cat.category}s</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Marques List */}
      <div className="space-y-8">
        <div className="border-b border-white/10 pb-4">
          <span className="text-xs font-mono text-amber-400 uppercase tracking-wider">OFFICIAL MARQUES</span>
          <h2 className="text-2xl font-display font-bold text-white">10 Verified Manufacturers</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {BRANDS_DATA.map((brand, i) => {
            const brandCars = cars.filter((c) => c.brand === brand.name);
            return (
              <div
                key={i}
                className="p-6 rounded-3xl bg-neutral-900/60 border border-white/10 hover:border-amber-400/40 transition-all duration-300 space-y-4 shadow-lg group flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center font-display font-black text-xl text-white group-hover:text-amber-400 transition-colors">
                      {brand.logo}
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{brand.flag}</span>
                      <span className="text-xs font-mono text-neutral-400">{brand.country}</span>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-display font-bold text-xl text-white group-hover:text-amber-400 transition-colors">
                      {brand.name}
                    </h3>
                    <div className="text-[11px] font-mono text-neutral-400 mt-0.5">
                      Est. {brand.foundingYear} • {brandCars.length} Vehicle{brandCars.length !== 1 ? 's' : ''} in Vault
                    </div>
                  </div>

                  <p className="text-xs text-neutral-300 font-sans leading-relaxed">
                    {brand.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                  <Link
                    to={`/collection?brand=${encodeURIComponent(brand.name)}`}
                    className="text-xs font-display font-bold text-amber-400 hover:text-amber-300 flex items-center gap-1.5 uppercase transition-colors"
                  >
                    <span>View Models</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </Link>

                  {brand.heroCarId && (
                    <Link
                      to={`/car/${brand.heroCarId}`}
                      className="text-[11px] font-mono text-neutral-400 hover:text-white transition-colors"
                    >
                      Hero Spec
                    </Link>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
