import React from 'react';
import { ShieldCheck, Award, Plane, Lock, History } from 'lucide-react';
import { motion } from 'framer-motion';
import { SHOWROOM_IMAGES, AVATAR_IMAGES } from '../../assets/images';

export const AboutSection = () => {
  const stats = [
    { value: '$180M+', label: 'Provenance Portfolio', sub: 'Certified hypercars & exotics' },
    { value: '100%', label: 'Forensic Authenticity', sub: 'Chassis & factory logbooks' },
    { value: '5 Salons', label: 'Global Private Vaults', sub: 'Monaco, Dubai, London, Zurich, LA' },
    { value: '48 Hours', label: 'Air Freight Dispatch', sub: 'Worldwide sealed logistics' },
  ];

  const pillars = [
    {
      icon: ShieldCheck,
      title: 'Forensic Provenance Verification',
      desc: 'Each vehicle in the vault undergoes 180-point optical, structural, and ECU telemetry checks cross-referenced with factory records in Maranello, Weissach, Molsheim, and Goodwood.'
    },
    {
      icon: Lock,
      title: 'Institutional Grade Escrow',
      desc: 'Transactions are secured through Swiss banking escrow, supporting multicurrency wires in USD, EUR, GBP, CHF, AED, and audited institutional digital asset settlement.'
    },
    {
      icon: Plane,
      title: 'White-Glove Sealed Air Transport',
      desc: 'Direct runway tarmac loading in climate-controlled containers, delivered with white-glove security personnel straight to your private motor vault or superyacht slipway.'
    },
    {
      icon: Award,
      title: 'Discreet Off-Market Sourcing',
      desc: 'Our confidential VIP desk secures unicorn allocations (F40 LM, McLaren F1, Koenigsegg One:1, Bugatti Bolide) through private collectors and racing dynasties worldwide.'
    }
  ];

  return (
    <section id="heritage" className="py-24 bg-carbon-950 relative border-t border-white/5 overflow-hidden">
      {/* Background radial gradient glow */}
      <div className="absolute top-1/3 right-10 w-96 h-96 bg-amber-500/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-cyan-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-20">
        
        {/* Top Story & Visuals */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6 space-y-6"
          >
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-semibold tracking-wider bg-amber-500/10 border border-amber-500/30 text-amber-400">
              <History className="w-3.5 h-3.5" />
              THE AURA HERITAGE
            </div>

            <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-white tracking-tight leading-[1.1]">
              Curating the Apex of Mechanical Excellence
            </h2>

            <p className="text-neutral-300 text-sm sm:text-base leading-relaxed font-sans">
              Founded in Monte Carlo by racing collectors and horology patrons, Aura Motors was conceived to replace traditional dealership transactions with an elevated private banking and art-curation experience.
            </p>

            <p className="text-neutral-400 text-sm leading-relaxed font-sans">
              We do not merely sell automobiles; we safeguard investments in rolling sculpture. From the 1,800-horsepower horological Tourbillon to rare lightweight Weissach packages, every vehicle entering our vaults is chosen for rarity, provenance, and investment appreciation.
            </p>

            <div className="pt-2 flex items-center gap-5">
              <div className="flex -space-x-3">
                {[
                  AVATAR_IMAGES.client1,
                  AVATAR_IMAGES.client2,
                  AVATAR_IMAGES.client3
                ].map((avatar, i) => (
                  <img
                    key={i}
                    src={avatar}
                    alt="Founding Partners"
                    className="w-12 h-12 rounded-full border-2 border-carbon-950 object-cover shadow-md"
                  />
                ))}
              </div>
              <div>
                <div className="text-xs font-display font-bold text-white tracking-wide">Private Concierge Advisory</div>
                <div className="text-[11px] text-amber-400 font-mono mt-0.5">Available 24/7 across Monte Carlo, DIFC, & Mayfair</div>
              </div>
            </div>
          </motion.div>

          {/* Vault Atmosphere Card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6 relative"
          >
            <div className="relative rounded-3xl overflow-hidden border border-white/15 shadow-2xl group">
              <img
                src={SHOWROOM_IMAGES.monaco}
                alt="Vault Atmosphere"
                className="w-full aspect-[4/3] object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-carbon-950 via-carbon-950/30 to-transparent" />
              
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-neutral-950/85 backdrop-blur-xl border border-white/15 text-xs font-mono">
                <div className="flex items-center justify-between text-neutral-400 mb-1">
                  <span className="font-semibold">LOCATION: MONTE CARLO VAULT 01</span>
                  <span className="text-emerald-400 flex items-center gap-1.5 font-bold">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    CLIMATE STABILIZED
                  </span>
                </div>
                <div className="text-sm font-display font-bold text-white">
                  18°C • 45% Humidity Controlled Nitrogen Storage
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Stats Grid - Symmetrical 4-Box Bar */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 py-6 border-y border-white/10">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="p-6 rounded-3xl bg-neutral-900/60 border border-white/10 text-center space-y-1 shadow-lg"
            >
              <div className="font-display font-black text-3xl sm:text-4xl text-amber-400 font-mono">
                {stat.value}
              </div>
              <div className="text-xs font-display font-bold text-white tracking-wide">{stat.label}</div>
              <div className="text-[11px] text-neutral-400 font-sans">{stat.sub}</div>
            </motion.div>
          ))}
        </div>

        {/* Four Operational Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((pillar, i) => {
            const Icon = pillar.icon;
            return (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="p-6 rounded-3xl bg-neutral-900/70 border border-white/10 hover:border-amber-400/40 space-y-3.5 transition-all duration-300 hover:shadow-card-hover"
              >
                <div className="w-11 h-11 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="font-display font-bold text-lg text-white">
                  {pillar.title}
                </h3>
                <p className="text-xs text-neutral-400 leading-relaxed font-sans">
                  {pillar.desc}
                </p>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
