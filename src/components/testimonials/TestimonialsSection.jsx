import React from 'react';
import { TESTIMONIALS_DATA } from '../../data/cars';
import { Star, Quote, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

export const TestimonialsSection = () => {
  return (
    <section className="py-24 bg-carbon-900/40 relative border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-14">
        
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-semibold tracking-wider bg-amber-500/10 border border-amber-500/30 text-amber-400">
            <Quote className="w-3.5 h-3.5" />
            PATRON TESTIMONIALS
          </div>
          <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-white tracking-tight">
            Trusted by the World’s Foremost Collectors
          </h2>
          <p className="text-neutral-400 text-sm sm:text-base font-sans">
            Read direct reflections from ultra-high-net-worth patrons who have acquired their allocations through Aura Vault.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS_DATA.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="p-8 rounded-3xl bg-neutral-900/70 border border-white/10 hover:border-amber-400/40 backdrop-blur-md flex flex-col justify-between space-y-6 transition-all duration-300 hover:shadow-card-hover"
            >
              <div className="space-y-4">
                {/* 5-Star Rating */}
                <div className="flex items-center gap-1">
                  {[...Array(item.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>

                <p className="text-sm text-neutral-200/90 italic leading-relaxed font-sans">
                  "{item.quote}"
                </p>
              </div>

              <div className="pt-4 border-t border-white/10 space-y-3">
                <div className="flex items-center gap-3.5">
                  <img
                    src={item.avatar}
                    alt={item.clientName}
                    className="w-12 h-12 rounded-full object-cover border-2 border-amber-400/30"
                  />
                  <div>
                    <div className="text-sm font-display font-bold text-white flex items-center gap-1.5">
                      <span>{item.clientName}</span>
                      <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" title="Verified Owner" />
                    </div>
                    <div className="text-[11px] text-neutral-400 font-mono">{item.location}</div>
                  </div>
                </div>

                <div className="text-[11px] font-mono text-amber-400 bg-amber-500/10 border border-amber-500/20 px-3 py-1.5 rounded-xl">
                  Acquired: <strong className="text-neutral-200">{item.carPurchased}</strong>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
