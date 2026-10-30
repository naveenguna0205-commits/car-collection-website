import React from 'react';
import { Link } from 'react-router-dom';
import { HeroSection } from '../components/hero/HeroSection';
import { CarCard } from '../components/collection/CarCard';
import { useCar } from '../context/CarContext';
import { CAR_IMAGES } from '../assets/images';
import { 
  ArrowRight, 
  Sparkles, 
  Compass, 
  ChevronRight
} from 'lucide-react';
import { motion } from 'framer-motion';

export const HomePage = () => {
  const { cars } = useCar();

  const featuredCars = cars.filter((c) => c.isFeatured).slice(0, 3);

  const keyMetrics = [
    { value: '12', label: 'Curated Masterpieces', sub: 'Hypercars & Supercars' },
    { value: '$42M+', label: 'Total Vault Valuation', sub: 'Authenticated Provenance' },
    { value: '1,800', label: 'Peak Horsepower', sub: 'Bugatti Tourbillon V16' },
    { value: '5', label: 'Global Showrooms', sub: 'Monaco • Dubai • London' }
  ];

  const categoryHighlights = [
    {
      title: 'Hypercar Vault',
      tagline: '1,000+ BHP • Multimillion Masterpieces',
      image: CAR_IMAGES.bugattiTourbillon,
      count: '4 Allocations',
      link: '/collection?category=Hypercar'
    },
    {
      title: 'Supercar Dynasty',
      tagline: 'Flacht & Maranello Track Purity',
      image: CAR_IMAGES.porscheGt3rs,
      count: '3 Allocations',
      link: '/collection?category=Supercar'
    },
    {
      title: 'Grand Tourers',
      tagline: 'Effortless Pace & V12 Rumble',
      image: CAR_IMAGES.astonMartinDbs,
      count: '2 Allocations',
      link: '/collection?category=Grand%20Tourer'
    },
    {
      title: 'Luxury Performance SUVs',
      tagline: 'All-Terrain Dominance with Track Records',
      image: CAR_IMAGES.lamborghiniUrus,
      count: '3 Allocations',
      link: '/collection?category=Luxury%20SUV'
    }
  ];

  return (
    <div className="space-y-24 pb-20">
      <HeroSection />

      {/* Key Metrics */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-5 sm:p-8 rounded-3xl bg-neutral-900/60 border border-white/10 backdrop-blur-xl">
          {keyMetrics.map((metric, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center space-y-1 p-3"
            >
              <div className="font-display font-extrabold text-3xl sm:text-4xl text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500">
                {metric.value}
              </div>
              <div className="text-sm font-display font-bold text-white tracking-wide">
                {metric.label}
              </div>
              <div className="text-xs text-neutral-400 font-mono">
                {metric.sub}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Featured Inventory */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-semibold tracking-wider bg-amber-500/10 border border-amber-500/30 text-amber-400">
              <Sparkles className="w-3.5 h-3.5" />
              SPOTLIGHT ALLOCATIONS
            </div>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-white tracking-tight">
              Curated Featured Exotics
            </h2>
            <p className="text-neutral-400 text-sm max-w-xl font-sans">
              Handpicked from our 12-vehicle inventory for their historical significance, extreme performance, and bespoke craftsmanship.
            </p>
          </div>

          <Link
            to="/collection"
            className="inline-flex items-center gap-2 h-11 px-6 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 border border-amber-500/30 font-display font-bold text-xs uppercase tracking-wider transition-all self-start sm:self-end group"
          >
            <span>View All 12 Vehicles</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {featuredCars.map((car) => (
            <CarCard key={car.id} car={car} viewMode="grid" />
          ))}
        </div>
      </section>

      {/* Categories Showcase */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-semibold tracking-wider bg-amber-500/10 border border-amber-500/30 text-amber-400">
            <Compass className="w-3.5 h-3.5" />
            CLASSIFICATIONS
          </div>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-white tracking-tight">
            Explore by Automotive Discipline
          </h2>
          <p className="text-neutral-400 text-sm font-sans">
            From 400+ km/h hypercars to cross-continental V12 grand tourers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categoryHighlights.map((cat, i) => (
            <Link
              key={i}
              to={cat.link}
              className="group relative rounded-3xl overflow-hidden border border-white/10 hover:border-amber-400/50 transition-all duration-500 flex flex-col justify-end aspect-[4/5] p-6 bg-neutral-900 shadow-xl"
            >
              <img
                src={cat.image}
                alt={cat.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-carbon-950 via-carbon-950/60 to-transparent" />
              
              <div className="relative z-10 space-y-2">
                <span className="text-[10px] font-mono font-semibold uppercase px-2.5 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 inline-block">
                  {cat.count}
                </span>
                <h3 className="font-display font-bold text-xl text-white group-hover:text-amber-400 transition-colors">
                  {cat.title}
                </h3>
                <p className="text-xs text-neutral-300 font-sans line-clamp-2">
                  {cat.tagline}
                </p>
                <div className="pt-2 flex items-center gap-1.5 text-xs font-display font-bold text-amber-400 group-hover:translate-x-1 transition-transform">
                  <span>Explore Class</span>
                  <ChevronRight className="w-4 h-4" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Private Concierge Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden border border-amber-500/20 bg-gradient-to-r from-neutral-900 via-neutral-900/90 to-amber-950/30 p-8 sm:p-12">
          <div className="max-w-2xl space-y-4 relative z-10">
            <span className="text-xs font-mono font-semibold tracking-wider uppercase text-amber-400 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 inline-block">
              PRIVATE CONCIERGE
            </span>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-white">
              Experience the Cockpit Firsthand
            </h2>
            <p className="text-neutral-400 text-sm sm:text-base font-sans leading-relaxed">
              Book a bespoke private test drive at any of our 5 climate-stabilized showrooms in Monaco, Dubai, London, Beverly Hills, or Zurich. Includes complimentary Maybach chauffeur transfer.
            </p>
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <Link
                to="/test-drive"
                className="h-12 px-7 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-carbon-950 font-display font-bold text-xs uppercase tracking-wider transition-all shadow-gold flex items-center gap-2"
              >
                <span>Reserve VIP Test Drive</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/contact"
                className="h-12 px-7 rounded-xl bg-white/5 hover:bg-white/10 text-white border border-white/15 font-display font-bold text-xs uppercase tracking-wider transition-colors flex items-center gap-2"
              >
                <span>View Showroom Locations</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
