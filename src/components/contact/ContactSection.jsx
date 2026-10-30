import React, { useState } from 'react';
import { SHOWROOM_LOCATIONS } from '../../data/cars';
import { useCar } from '../../context/CarContext';
import { MapPin, Phone, Clock, Send, ShieldCheck } from 'lucide-react';

export const ContactSection = () => {
  const { addToast } = useCar();
  const [selectedLocation, setSelectedLocation] = useState(SHOWROOM_LOCATIONS[0]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: 'Bespoke Vehicle Commissioning / Allocation Inquiry',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formState.name || !formState.email || !formState.message) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      addToast(
        'success',
        'Inquiry Dispatched',
        `Thank you ${formState.name}. Our Head of Private Clients at ${selectedLocation.name} will contact you within 2 hours.`
      );
      setFormState({
        name: '',
        email: '',
        subject: 'Bespoke Vehicle Commissioning / Allocation Inquiry',
        message: ''
      });
    }, 700);
  };

  return (
    <section id="contact" className="py-24 bg-carbon-900/60 relative border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-16">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-semibold tracking-wider bg-amber-500/10 border border-amber-500/30 text-amber-400">
            <MapPin className="w-3.5 h-3.5" />
            GLOBAL PRIVATE SALONS
          </div>
          <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-white tracking-tight">
            Connect with our Private Vault
          </h2>
          <p className="text-neutral-400 text-sm sm:text-base font-sans">
            Visit us in person at our flagship salons in Monte Carlo, Dubai, London, Beverly Hills, and Zurich.
          </p>
        </div>

        {/* Showrooms Selector Tabs - 5 Symmetrical Buttons */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          {SHOWROOM_LOCATIONS.map((loc) => (
            <button
              key={loc.id}
              onClick={() => setSelectedLocation(loc)}
              className={`p-4 rounded-2xl border text-center transition-all ${
                selectedLocation.id === loc.id
                  ? 'bg-amber-500/15 border-amber-400 text-white shadow-glow-gold'
                  : 'bg-neutral-900/70 border-white/10 text-neutral-400 hover:text-white'
              }`}
            >
              <div className="text-sm font-display font-bold text-white truncate">{loc.city.split(',')[0]}</div>
              <div className="text-[11px] text-neutral-400 font-mono mt-0.5">{loc.city.split(',')[1]}</div>
            </button>
          ))}
        </div>

        {/* Selected Showroom & Contact Form Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Showroom Details Card */}
          <div className="lg:col-span-5 rounded-3xl bg-neutral-900/80 border border-white/15 overflow-hidden shadow-2xl flex flex-col justify-between">
            <div className="relative aspect-[16/10]">
              <img
                src={selectedLocation.image}
                alt={selectedLocation.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/40 to-transparent" />
              
              <div className="absolute bottom-5 left-5 right-5">
                <span className="text-[10px] font-mono font-bold uppercase px-2.5 py-1 rounded-full bg-black/75 text-amber-400 border border-amber-500/30">
                  FLAGSHIP VAULT
                </span>
                <h3 className="font-display font-extrabold text-2xl text-white mt-1.5">
                  {selectedLocation.name}
                </h3>
              </div>
            </div>

            <div className="p-6 space-y-4 text-xs font-mono">
              <div className="flex items-start gap-3.5 text-neutral-300">
                <MapPin className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                <div>
                  <div className="text-neutral-400 uppercase text-[10px] font-semibold">Showroom Address</div>
                  <div className="text-white mt-0.5 font-sans font-medium text-sm">{selectedLocation.address}</div>
                </div>
              </div>

              <div className="flex items-start gap-3.5 text-neutral-300">
                <Phone className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                <div>
                  <div className="text-neutral-400 uppercase text-[10px] font-semibold">VIP Direct Telephone</div>
                  <a href={`tel:${selectedLocation.phone}`} className="text-white hover:text-amber-400 mt-0.5 block text-sm font-semibold">
                    {selectedLocation.phone}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3.5 text-neutral-300">
                <Clock className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                <div>
                  <div className="text-neutral-400 uppercase text-[10px] font-semibold">Access Hours</div>
                  <div className="text-white mt-0.5">{selectedLocation.hours}</div>
                </div>
              </div>

              <div className="pt-3 border-t border-white/10 flex items-center gap-2 text-neutral-400 text-[11px] font-sans">
                <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>Armed security & private subterranean helipad access</span>
              </div>
            </div>
          </div>

          {/* Contact Inquiry Form */}
          <div className="lg:col-span-7 rounded-3xl bg-neutral-900/70 border border-white/10 p-6 sm:p-8 space-y-6 shadow-xl">
            <div className="space-y-1.5">
              <h3 className="font-display font-extrabold text-2xl sm:text-3xl text-white">
                Direct Confidential Inquiry
              </h3>
              <p className="text-xs text-neutral-400 font-sans">
                Submit an inquiry regarding specific allocations, commissioning, or off-market vehicles.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-mono uppercase text-neutral-400 block mb-1.5">
                    Your Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formState.name}
                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                    placeholder="Lord Vance"
                    className="w-full h-12 px-4 rounded-xl bg-neutral-950 border border-white/10 text-white text-sm focus:outline-none focus:border-amber-400 font-sans"
                  />
                </div>

                <div>
                  <label className="text-xs font-mono uppercase text-neutral-400 block mb-1.5">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={formState.email}
                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                    placeholder="client@sovereign.com"
                    className="w-full h-12 px-4 rounded-xl bg-neutral-950 border border-white/10 text-white text-sm focus:outline-none focus:border-amber-400 font-sans"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-mono uppercase text-neutral-400 block mb-1.5">
                  Subject / Topic
                </label>
                <select
                  value={formState.subject}
                  onChange={(e) => setFormState({ ...formState, subject: e.target.value })}
                  className="w-full h-12 px-4 rounded-xl bg-neutral-950 border border-white/10 text-white text-sm focus:outline-none focus:border-amber-400 font-sans cursor-pointer"
                >
                  <option value="Bespoke Vehicle Commissioning / Allocation Inquiry">Bespoke Vehicle Commissioning / Allocation Inquiry</option>
                  <option value="Schedule Private Viewing">Schedule Private Viewing at Salon</option>
                  <option value="Off-Market Unicorn Car Sourcing Request">Off-Market Unicorn Car Sourcing Request</option>
                  <option value="Financing, Lease & Cryptocurrency Escrow">Financing, Lease & Cryptocurrency Escrow</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-mono uppercase text-neutral-400 block mb-1.5">
                  Message / Requirements
                </label>
                <textarea
                  required
                  rows={4}
                  value={formState.message}
                  onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                  placeholder="Detail your requirements, preferred timing, or specific VIN inquiry..."
                  className="w-full p-4 rounded-xl bg-neutral-950 border border-white/10 text-white text-sm focus:outline-none focus:border-amber-400 font-sans resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-12 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-display font-bold text-xs uppercase tracking-wider shadow-glow-gold flex items-center justify-center gap-2 transition-all disabled:opacity-50"
              >
                <Send className="w-4 h-4 fill-black" />
                <span>{isSubmitting ? 'Transmitting to Salon...' : 'Dispatch Confidential Inquiry'}</span>
              </button>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
};
