import React from 'react';
import { BRANDS_DATA } from '../../data/cars';
import { useCar } from '../../context/CarContext';
import { CAR_IMAGES } from '../../assets/images';
import { Crown, ArrowRight, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';

export const BrandsSection = () => {
  const { setSelectedCar, cars, jumpToSection } = useCar();

  const handleInspectBrandHero = (brand) => {
    const heroCar = cars.find((c) => c.id === brand.heroCarId) || cars.find((c) => c.brand === brand.name);
    if (heroCar) {
      setSelectedCar(heroCar);
    }
  };

  const categories = [
    {
      title: 'Hypercar Vault',
      tagline: '1,000+ BHP • Multimillion Masterpieces',
      image: CAR_IMAGES.bugattiTourbillon,
      carsCount: '4 Allocations',
      desc: 'The pinnacle of aerodynamic force and internal combustion / hybrid mastery, shattering limits beyond 400 km/h.'
    },
    {
      title: 'Supercar Dynasty',
      tagline: 'Flacht & Maranello Track Purity',
      image: CAR_IMAGES.porscheGt3rs,
      carsCount: '3 Allocations',
      desc: 'Naturally aspirated screams, active DRS aero, and carbon tubs engineered for telepathic driver connection.'
    },
    {
      title: 'Grand Tourers',
      tagline: 'Effortless Pace & V12 Rumble',
      image: CAR_IMAGES.astonMartinDbs,
      carsCount: '2 Allocations',
      desc: 'Cross continents in unmatched acoustic glory, cocooned in semi-aniline leather with immense twin-turbo torque.'
    },
    {
      title: 'Luxury Performance SUVs',
      tagline: 'All-Terrain Dominance with Track Records',
      image: CAR_IMAGES.lamborghiniUrus,
      carsCount: '3 Allocations',
      desc: 'Pikes Peak record-setters and Goodwood bespoke magic carpet ride vehicles conquering desert, snow, and city.'
    }
  ];

  return (
    <section id="brands" className="py-24 bg-carbon-900/60 border-t border-white/5 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-24">
        
        {/* Section 1: Categories Showcase */}
        <div id="categories" className="space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-semibold tracking-wider bg-amber-500/10 border border-amber-500/30 text-amber-400">
              <Crown className="w-3.5 h-3.5" />
              CURATED CATEGORIES
            </div>
            <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-white tracking-tight">
              Echelons of Automotive Distinction
            </h2>
            <p className="text-neutral-400 text-sm sm:text-base font-sans">
              Discover vehicles segmented by engineering philosophy and performance intent.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((cat, idx) => (
              <motion.div
                key={cat.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                onClick={() => jumpToSection('collection')}
                className="group relative rounded-3xl overflow-hidden bg-neutral-900 border border-white/10 hover:border-amber-400/50 p-6 flex flex-col justify-between min-h-[350px] cursor-pointer transition-all duration-300 hover:shadow-card-hover"
              >
                {/* Background Image */}
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110 opacity-35 group-hover:opacity-45"
                  style={{ backgroundImage: `url(${cat.image})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-carbon-950 via-carbon-950/75 to-transparent" />

                {/* Content Top */}
                <div className="relative z-10 flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold uppercase px-3 py-1 rounded-full bg-black/75 backdrop-blur-md border border-white/15 text-amber-400">
                    {cat.carsCount}
                  </span>
                  <div className="h-8 w-8 rounded-full bg-black/40 flex items-center justify-center text-neutral-400 group-hover:text-amber-400 group-hover:bg-amber-500/20 transition-all">
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </div>

                {/* Content Bottom */}
                <div className="relative z-10 space-y-2">
                  <div className="text-[11px] font-mono text-amber-300/90 font-medium">{cat.tagline}</div>
                  <h3 className="font-display font-extrabold text-2xl text-white group-hover:text-amber-400 transition-colors">
                    {cat.title}
                  </h3>
                  <p className="text-xs text-neutral-300 line-clamp-3 leading-relaxed font-sans">
                    {cat.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Section 2: Heritage Brands Directory */}
        <div className="space-y-10 pt-12 border-t border-white/5">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-2.5">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-semibold tracking-wider bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
                <ShieldCheck className="w-3.5 h-3.5" />
                ICONIC MARQUES
              </div>
              <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-white tracking-tight">
                World-Renowned Manufacturers
              </h2>
              <p className="text-neutral-400 text-sm sm:text-base max-w-xl font-sans">
                Official heritage partners and factory certified allocations from Europe's most illustrious ateliers.
              </p>
            </div>

            <button
              onClick={() => jumpToSection('collection')}
              className="text-xs font-mono text-amber-400 hover:text-amber-300 font-bold flex items-center gap-1.5 self-start md:self-end"
            >
              <span>Explore All Allocations</span>
              <span>→</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-5">
            {BRANDS_DATA.map((brand, idx) => (
              <motion.div
                key={brand.name}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: idx * 0.04 }}
                onClick={() => handleInspectBrandHero(brand)}
                className="group p-5 rounded-3xl bg-neutral-900/70 border border-white/10 hover:border-amber-400/40 cursor-pointer transition-all duration-300 hover:bg-neutral-900 hover:shadow-card-hover flex flex-col justify-between space-y-4"
              >
                <div>
                  <div className="flex items-center justify-between text-xs font-mono text-neutral-400 mb-2.5">
                    <span className="flex items-center gap-1.5 font-medium">
                      <span>{brand.flag}</span>
                      <span>{brand.country}</span>
                    </span>
                    <span>Est. {brand.foundingYear}</span>
                  </div>

                  <h3 className="font-display font-bold text-xl text-white group-hover:text-amber-400 transition-colors">
                    {brand.name}
                  </h3>

                  <p className="text-xs text-neutral-400 line-clamp-3 mt-2 leading-relaxed font-sans">
                    {brand.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-white/5 flex items-center justify-between text-xs font-mono">
                  <span className="text-neutral-500">{brand.totalModels} Allocation</span>
                  <span className="text-amber-400 font-semibold group-hover:underline flex items-center gap-1">
                    View Halo →
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
