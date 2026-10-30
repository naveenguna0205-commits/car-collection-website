import React, { useState } from 'react';
import { useSearchParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useCar } from '../context/CarContext';
import { 
  CalendarCheck, 
  Car, 
  MapPin, 
  Calendar, 
  Clock, 
  ShieldCheck, 
  Sparkles, 
  User, 
  Mail, 
  Phone, 
  CheckCircle2, 
  ArrowRight, 
  ArrowLeft 
} from 'lucide-react';

export const TestDrivePage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { cars, submitBooking } = useCar();

  const carParam = searchParams.get('car');
  const initialCar = cars.find((c) => c.id === carParam) || cars[0];

  const [selectedCar, setSelectedCar] = useState(initialCar);
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [bookingRef, setBookingRef] = useState('');

  const [form, setForm] = useState({
    carId: initialCar.id,
    carName: initialCar.name,
    showroom: 'Monaco Private Vault',
    preferredDate: '2026-11-15',
    preferredTime: '14:00 CET',
    chauffeurNeeded: true,
    clientName: '',
    clientEmail: '',
    clientPhone: '',
    notes: 'Please arrange airport transfer from Nice Côte d’Azur (NCE).'
  });

  const [errors, setErrors] = useState({});

  const showrooms = [
    { name: 'Monaco Private Vault', city: 'Monte Carlo, Monaco' },
    { name: 'Dubai Marina Showroom', city: 'DIFC, Dubai, UAE' },
    { name: 'London Mayfair Sanctuary', city: 'Mayfair, London, UK' },
    { name: 'Beverly Hills Atelier', city: 'Rodeo Drive, CA, USA' },
    { name: 'Zurich Alpine Vault', city: 'Bahnhofstrasse, Zurich, Switzerland' }
  ];

  const times = [
    '10:00 Morning Session',
    '12:00 Private Lunch Slot',
    '14:00 High Noon Track Slot',
    '16:30 Sunset Coastal Drive'
  ];

  const handleCarSelect = (car) => {
    setSelectedCar(car);
    setForm((prev) => ({ ...prev, carId: car.id, carName: car.name }));
  };

  const validate = () => {
    const errs = {};
    if (!form.clientName.trim()) errs.clientName = 'Name is required';
    if (!form.clientEmail.trim() || !form.clientEmail.includes('@')) {
      errs.clientEmail = 'Valid corporate or personal email required';
    }
    if (!form.clientPhone.trim()) errs.clientPhone = 'Telephone number required';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    await submitBooking(form);
    setIsSubmitting(false);
    setBookingRef(`AUR-${Math.floor(100000 + Math.random() * 900000)}`);
    setIsConfirmed(true);
  };

  if (isConfirmed) {
    return (
      <div className="py-20 max-w-2xl mx-auto px-4 text-center space-y-6">
        <div className="w-20 h-20 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mx-auto">
          <CheckCircle2 className="w-10 h-10" />
        </div>
        <div className="space-y-2">
          <span className="text-xs font-mono text-amber-400 uppercase tracking-widest">VIP CONFIRMATION</span>
          <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-white">
            Reservation Docket Confirmed
          </h1>
          <p className="text-sm font-mono text-emerald-400 font-bold">
            Reference Docket: #{bookingRef}
          </p>
        </div>

        <div className="p-6 rounded-3xl bg-neutral-900/80 border border-white/10 text-left space-y-3 font-mono text-xs">
          <div className="flex justify-between border-b border-white/5 pb-2">
            <span className="text-neutral-400">ALLOCATION:</span>
            <span className="font-bold text-white">{form.carName}</span>
          </div>
          <div className="flex justify-between border-b border-white/5 pb-2">
            <span className="text-neutral-400">VAULT SHOWROOM:</span>
            <span className="font-bold text-white">{form.showroom}</span>
          </div>
          <div className="flex justify-between border-b border-white/5 pb-2">
            <span className="text-neutral-400">DATE & SLOT:</span>
            <span className="font-bold text-white">{form.preferredDate} • {form.preferredTime.split(' ')[0]}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-neutral-400">MAYBACH CHAUFFEUR:</span>
            <span className="font-bold text-emerald-400">{form.chauffeurNeeded ? 'Included' : 'Not Requested'}</span>
          </div>
        </div>

        <div className="pt-4 flex items-center justify-center gap-4">
          <Link
            to="/collection"
            className="h-11 px-6 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-display font-bold text-xs uppercase tracking-wider flex items-center gap-2"
          >
            <span>Return to Collection</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="py-12 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
      
      {/* Header section */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-semibold tracking-wider bg-amber-500/10 border border-amber-500/30 text-amber-400">
          <CalendarCheck className="w-3.5 h-3.5" />
          VIP PROTOCOL
        </div>
        <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-white tracking-tight">
          Reserve Private Test Drive
        </h1>
        <p className="text-neutral-400 text-sm font-sans">
          Experience track dynamics and cabin refinement with our senior test driver.
        </p>
      </div>

      {/* Progress steps */}
      <div className="grid grid-cols-3 gap-3 font-mono text-xs text-center">
        <div className={`p-3 rounded-2xl border ${step >= 1 ? 'border-amber-400 bg-amber-500/10 text-amber-300' : 'border-white/10 text-neutral-500'}`}>
          1. Vehicle Choice
        </div>
        <div className={`p-3 rounded-2xl border ${step >= 2 ? 'border-amber-400 bg-amber-500/10 text-amber-300' : 'border-white/10 text-neutral-500'}`}>
          2. Showroom & Date
        </div>
        <div className={`p-3 rounded-2xl border ${step >= 3 ? 'border-amber-400 bg-amber-500/10 text-amber-300' : 'border-white/10 text-neutral-500'}`}>
          3. Client Details
        </div>
      </div>

      {/* Booking step views */}
      <div className="p-5 sm:p-8 rounded-3xl bg-neutral-900/80 border border-white/15 shadow-2xl overflow-hidden">
        <AnimatePresence mode="wait">
          {/* Step 1: Vehicle Choice */}
          {step === 1 && (
            <motion.div
              key="step-1"
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 16 }}
              transition={{ duration: 0.28, ease: 'easeOut' }}
              className="space-y-6"
            >
              <h3 className="font-display font-bold text-xl text-white">Select Vehicle Allocation</h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {cars.map((c) => (
                  <div
                    key={c.id}
                    onClick={() => handleCarSelect(c)}
                    className={`p-3 rounded-2xl border cursor-pointer transition-all ${
                      selectedCar.id === c.id
                        ? 'border-amber-400 bg-amber-500/10 ring-2 ring-amber-400/30'
                        : 'border-white/10 hover:border-white/20 bg-neutral-950/50'
                    }`}
                  >
                    <div className="aspect-[16/10] rounded-xl overflow-hidden mb-2">
                      <img src={c.heroImage} alt={c.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="text-[10px] font-mono text-neutral-400 uppercase">{c.brand}</div>
                    <div className="font-display font-bold text-sm text-white truncate">{c.name}</div>
                    <div className="text-xs font-mono text-amber-400">{c.specs.powerHp} HP</div>
                  </div>
                ))}
              </div>

              <div className="pt-4 flex justify-end">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="h-11 px-7 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-display font-bold text-xs uppercase tracking-wider flex items-center gap-2"
                >
                  <span>Continue to Showroom & Date</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}

          {/* Step 2: Showroom & Date */}
          {step === 2 && (
            <motion.div
              key="step-2"
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -16 }}
              transition={{ duration: 0.28, ease: 'easeOut' }}
              className="space-y-6"
            >
              <h3 className="font-display font-bold text-xl text-white">Select Showroom & Preferred Time</h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-mono font-semibold uppercase text-neutral-300 mb-2">
                    Select Vault Facility
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {showrooms.map((s, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => setForm({ ...form, showroom: s.name })}
                        className={`p-4 rounded-2xl border text-left transition-all ${
                          form.showroom === s.name
                            ? 'border-amber-400 bg-amber-500/10 text-white'
                            : 'border-white/10 hover:border-white/20 bg-neutral-950/40 text-neutral-300'
                        }`}
                      >
                        <div className="font-display font-bold text-sm text-white">{s.name}</div>
                        <div className="text-xs font-mono text-neutral-400 mt-0.5">{s.city}</div>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono font-semibold uppercase text-neutral-300 mb-1.5">
                      Preferred Date
                    </label>
                    <input
                      type="date"
                      value={form.preferredDate}
                      onChange={(e) => setForm({ ...form, preferredDate: e.target.value })}
                      className="w-full h-11 px-4 rounded-xl bg-carbon-950/60 border border-white/15 focus:border-amber-400 focus:outline-none text-white text-xs font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono font-semibold uppercase text-neutral-300 mb-1.5">
                      Time Slot
                    </label>
                    <select
                      value={form.preferredTime}
                      onChange={(e) => setForm({ ...form, preferredTime: e.target.value })}
                      className="w-full h-11 px-4 rounded-xl bg-carbon-950/60 border border-white/15 focus:border-amber-400 focus:outline-none text-white text-xs font-mono"
                    >
                      {times.map((t, i) => (
                        <option key={i} value={t} className="bg-neutral-900 text-white">{t}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Chauffeur toggle */}
                <div className="p-4 rounded-2xl bg-amber-500/5 border border-amber-500/20 flex items-center justify-between">
                  <div>
                    <div className="text-sm font-display font-bold text-white">Maybach Chauffeur Transfer</div>
                    <div className="text-xs text-neutral-400 font-sans">Complimentary private limousine transfer from your hotel or airport</div>
                  </div>
                  <input
                    type="checkbox"
                    checked={form.chauffeurNeeded}
                    onChange={(e) => setForm({ ...form, chauffeurNeeded: e.target.checked })}
                    className="w-5 h-5 accent-amber-400 cursor-pointer"
                  />
                </div>
              </div>

              <div className="pt-4 flex justify-between">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="h-11 px-6 rounded-xl bg-white/5 hover:bg-white/10 text-neutral-300 font-display font-bold text-xs uppercase tracking-wider flex items-center gap-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back</span>
                </button>
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className="h-11 px-7 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-display font-bold text-xs uppercase tracking-wider flex items-center gap-2"
                >
                  <span>Continue to Client Info</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}

          {/* Step 3: Client Details */}
          {step === 3 && (
            <motion.form
              key="step-3"
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -16 }}
              transition={{ duration: 0.28, ease: 'easeOut' }}
              onSubmit={handleSubmit}
              className="space-y-6"
            >
              <h3 className="font-display font-bold text-xl text-white">Client Accreditation & Identification</h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-mono font-semibold uppercase text-neutral-300 mb-1.5">
                    Full Legal Name <span className="text-amber-400">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Lord / Lady / Dr. / Mr. Alexander Vance"
                    value={form.clientName}
                    onChange={(e) => setForm({ ...form, clientName: e.target.value })}
                    className="w-full h-11 px-4 rounded-xl bg-carbon-950/60 border border-white/15 focus:border-amber-400 focus:outline-none text-white text-sm font-sans"
                  />
                  {errors.clientName && <p className="text-xs text-rose-400 font-mono mt-1">{errors.clientName}</p>}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono font-semibold uppercase text-neutral-300 mb-1.5">
                      Email Address <span className="text-amber-400">*</span>
                    </label>
                    <input
                      type="email"
                      placeholder="vance@familyoffice.mc"
                      value={form.clientEmail}
                      onChange={(e) => setForm({ ...form, clientEmail: e.target.value })}
                      className="w-full h-11 px-4 rounded-xl bg-carbon-950/60 border border-white/15 focus:border-amber-400 focus:outline-none text-white text-sm font-sans"
                    />
                    {errors.clientEmail && <p className="text-xs text-rose-400 font-mono mt-1">{errors.clientEmail}</p>}
                  </div>

                  <div>
                    <label className="block text-xs font-mono font-semibold uppercase text-neutral-300 mb-1.5">
                      Mobile / Signal Telephone <span className="text-amber-400">*</span>
                    </label>
                    <input
                      type="tel"
                      placeholder="+377 98 06 20 00"
                      value={form.clientPhone}
                      onChange={(e) => setForm({ ...form, clientPhone: e.target.value })}
                      className="w-full h-11 px-4 rounded-xl bg-carbon-950/60 border border-white/15 focus:border-amber-400 focus:outline-none text-white text-sm font-sans"
                    />
                    {errors.clientPhone && <p className="text-xs text-rose-400 font-mono mt-1">{errors.clientPhone}</p>}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono font-semibold uppercase text-neutral-300 mb-1.5">
                    Special Concierge Instructions
                  </label>
                  <textarea
                    rows={3}
                    value={form.notes}
                    onChange={(e) => setForm({ ...form, notes: e.target.value })}
                    className="w-full p-4 rounded-xl bg-carbon-950/60 border border-white/15 focus:border-amber-400 focus:outline-none text-white text-sm font-sans resize-none"
                  />
                </div>
              </div>

              <div className="pt-4 flex justify-between">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="h-11 px-6 rounded-xl bg-white/5 hover:bg-white/10 text-neutral-300 font-display font-bold text-xs uppercase tracking-wider flex items-center gap-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back</span>
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="h-11 px-8 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-carbon-950 font-display font-bold text-xs uppercase tracking-wider transition-all shadow-gold flex items-center gap-2"
                >
                  {isSubmitting ? (
                    <span>Authenticating...</span>
                  ) : (
                    <>
                      <CalendarCheck className="w-4 h-4" />
                      <span>Confirm VIP Reservation</span>
                    </>
                  )}
                </button>
              </div>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

