import React, { useState } from 'react';
import { useCar } from '../../context/CarContext';
import { SHOWROOM_LOCATIONS } from '../../data/cars';
import { 
  X, 
  CalendarCheck, 
  MapPin, 
  Clock, 
  User, 
  Mail, 
  Phone, 
  Car as CarIcon, 
  CheckCircle, 
  Sparkles, 
  ArrowRight, 
  ArrowLeft,
  Shield,
  GlassWater
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const TestDriveModal = () => {
  const {
    cars,
    isBookingModalOpen,
    setIsBookingModalOpen,
    bookingCar,
    submitBooking,
  } = useCar();

  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingRefId, setBookingRefId] = useState('');

  // Form State
  const [formData, setFormData] = useState({
    carId: bookingCar?.id || cars[0]?.id || '',
    carName: bookingCar?.name || cars[0]?.name || '',
    clientName: '',
    email: '',
    phone: '',
    preferredDate: new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0],
    preferredTime: '14:00 (Afternoon Private Session)',
    showroomLocation: bookingCar?.showroomLocation || SHOWROOM_LOCATIONS[0].name,
    chauffeurNeeded: true,
    notes: '',
  });

  if (!isBookingModalOpen) return null;

  const currentCar = cars.find((c) => c.id === formData.carId) || cars[0];

  const handleCarSelect = (carId) => {
    const selected = cars.find((c) => c.id === carId);
    if (selected) {
      setFormData((prev) => ({
        ...prev,
        carId: selected.id,
        carName: selected.name,
        showroomLocation: selected.showroomLocation,
      }));
    }
  };

  const handleNextStep = () => {
    if (step === 1) {
      setStep(2);
    } else if (step === 2) {
      setStep(3);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.clientName || !formData.email || !formData.phone) return;

    setIsSubmitting(true);
    const refCode = `AUR-${Math.floor(100000 + Math.random() * 900000)}`;
    setBookingRefId(refCode);

    await submitBooking(formData);
    setIsSubmitting(false);
    setStep(4);
  };

  const handleClose = () => {
    setIsBookingModalOpen(false);
    setStep(1);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-xl flex items-center justify-center p-3 sm:p-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3 }}
          className="relative w-full max-w-2xl rounded-3xl bg-neutral-950 border border-white/15 shadow-2xl text-neutral-100 overflow-hidden"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 bg-neutral-900/90 border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-400 flex items-center justify-center">
                <CalendarCheck className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-display font-extrabold text-lg text-white">VIP Private Experience Booking</h3>
                <div className="text-[11px] font-mono text-neutral-400">Step {step} of 4 • Confidential Concierge</div>
              </div>
            </div>

            <button
              onClick={handleClose}
              className="h-9 w-9 flex items-center justify-center rounded-xl text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Step Progress Tracker */}
          <div className="grid grid-cols-4 border-b border-white/10 text-xs font-mono text-center">
            {['1. Vehicle & Vault', '2. Date & Time', '3. VIP Profile', '4. Confirmation'].map((label, idx) => (
              <div
                key={label}
                className={`py-2.5 px-2 border-r border-white/5 last:border-r-0 transition-colors ${
                  step === idx + 1
                    ? 'bg-amber-500/15 text-amber-400 font-bold border-b-2 border-b-amber-400'
                    : step > idx + 1
                    ? 'text-neutral-300 font-medium'
                    : 'text-neutral-600'
                }`}
              >
                {label}
              </div>
            ))}
          </div>

          {/* Form Body */}
          <div className="p-6 sm:p-8">
            {/* STEP 1: VEHICLE & SHOWROOM LOCATION */}
            {step === 1 && (
              <div className="space-y-6">
                <div className="space-y-1">
                  <h4 className="font-display font-extrabold text-2xl text-white">Select Vehicle & Salon</h4>
                  <p className="text-xs text-neutral-400 font-sans">
                    Choose which halo automobile you wish to inspect and test drive in person.
                  </p>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-mono uppercase text-neutral-400 flex items-center gap-1.5 font-semibold">
                    <CarIcon className="w-3.5 h-3.5 text-amber-400" />
                    <span>Allocated Vehicle</span>
                  </label>
                  <select
                    value={formData.carId}
                    onChange={(e) => handleCarSelect(e.target.value)}
                    className="w-full h-12 px-4 rounded-xl bg-neutral-900 border border-white/10 text-white text-sm focus:outline-none focus:border-amber-400 font-sans cursor-pointer"
                  >
                    {cars.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.brand} {c.name} ({c.specs.powerHp} HP • {c.specs.engine})
                      </option>
                    ))}
                  </select>
                </div>

                {currentCar && (
                  <div className="p-4 rounded-2xl bg-neutral-900/70 border border-white/10 flex items-center gap-4">
                    <img
                      src={currentCar.heroImage}
                      alt={currentCar.name}
                      className="w-20 h-14 object-cover rounded-xl border border-white/10"
                    />
                    <div>
                      <div className="text-[10px] font-mono text-neutral-400 uppercase">{currentCar.brand}</div>
                      <div className="font-display font-bold text-base text-white">{currentCar.name}</div>
                      <div className="text-xs font-mono text-amber-400 font-bold mt-0.5">
                        {currentCar.specs.powerHp} HP • 0-100 in {currentCar.specs.acceleration0to100}s
                      </div>
                    </div>
                  </div>
                )}

                <div className="space-y-2.5">
                  <label className="text-xs font-mono uppercase text-neutral-400 flex items-center gap-1.5 font-semibold">
                    <MapPin className="w-3.5 h-3.5 text-amber-400" />
                    <span>Preferred Private Showroom</span>
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {SHOWROOM_LOCATIONS.map((loc) => (
                      <button
                        type="button"
                        key={loc.id}
                        onClick={() => setFormData({ ...formData, showroomLocation: loc.name })}
                        className={`p-3.5 rounded-2xl border text-left transition-all ${
                          formData.showroomLocation === loc.name
                            ? 'bg-amber-500/15 border-amber-400 text-white shadow-glow-gold'
                            : 'bg-neutral-900/60 border-white/10 text-neutral-400 hover:text-white'
                        }`}
                      >
                        <div className="text-xs font-display font-bold text-white">{loc.name}</div>
                        <div className="text-[11px] text-neutral-400 font-mono mt-0.5">{loc.city}</div>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="pt-3 flex justify-end">
                  <button
                    type="button"
                    onClick={handleNextStep}
                    className="h-12 px-6 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-display font-bold text-xs uppercase tracking-wider shadow-glow-gold flex items-center gap-2"
                  >
                    <span>Proceed to Schedule</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 2: DATE & TIME */}
            {step === 2 && (
              <div className="space-y-6">
                <div className="space-y-1">
                  <h4 className="font-display font-extrabold text-2xl text-white">Select Date & VIP Slot</h4>
                  <p className="text-xs text-neutral-400 font-sans">
                    Appointments are exclusive to one private client at a time for complete privacy.
                  </p>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-mono uppercase text-neutral-400 flex items-center gap-1.5 font-semibold">
                    <Clock className="w-3.5 h-3.5 text-amber-400" />
                    <span>Preferred Date</span>
                  </label>
                  <input
                    type="date"
                    value={formData.preferredDate}
                    min={new Date().toISOString().split('T')[0]}
                    onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                    className="w-full h-12 px-4 rounded-xl bg-neutral-900 border border-white/10 text-white text-sm focus:outline-none focus:border-amber-400 font-sans cursor-pointer"
                  />
                </div>

                <div className="space-y-2.5">
                  <label className="text-xs font-mono uppercase text-neutral-400 font-semibold">
                    Dedicated Private Slot
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {[
                      '10:30 (Morning Champagne Reception)',
                      '14:00 (Afternoon Private Session)',
                      '16:30 (Sunset Track / Scenic Run)',
                      '19:00 (Evening Vault Gala & Dinner)'
                    ].map((slot) => (
                      <button
                        type="button"
                        key={slot}
                        onClick={() => setFormData({ ...formData, preferredTime: slot })}
                        className={`p-3.5 rounded-2xl border text-left text-xs font-mono transition-all ${
                          formData.preferredTime === slot
                            ? 'bg-amber-500/15 border-amber-400 text-white shadow-glow-gold font-bold'
                            : 'bg-neutral-900/60 border-white/10 text-neutral-400 hover:text-white'
                        }`}
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-neutral-900/70 border border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400">
                      <Shield className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs font-display font-bold text-white">Complimentary Maybach Chauffeur Transfer</div>
                      <div className="text-[11px] text-neutral-400 font-sans">Private pickup from airport, hotel or yacht</div>
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={formData.chauffeurNeeded}
                    onChange={(e) => setFormData({ ...formData, chauffeurNeeded: e.target.checked })}
                    className="w-5 h-5 accent-amber-500 rounded cursor-pointer"
                  />
                </div>

                <div className="pt-3 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="h-11 px-4 rounded-xl border border-white/10 text-neutral-400 hover:text-white text-xs font-mono flex items-center gap-1.5"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Back</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleNextStep}
                    className="h-12 px-6 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-display font-bold text-xs uppercase tracking-wider shadow-glow-gold flex items-center gap-2"
                  >
                    <span>Client Credentials</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: CLIENT CREDENTIALS */}
            {step === 3 && (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-1">
                  <h4 className="font-display font-extrabold text-2xl text-white">Client Confidential Profile</h4>
                  <p className="text-xs text-neutral-400 font-sans">
                    All private disclosures are secured under strict non-disclosure compliance.
                  </p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="text-xs font-mono uppercase text-neutral-400 flex items-center gap-1.5 mb-1.5 font-semibold">
                      <User className="w-3.5 h-3.5 text-amber-400" />
                      <span>Full Legal Name / Honorific</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.clientName}
                      onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                      placeholder="e.g. Lord Julian Vance / Dr. Sophia Bennett"
                      className="w-full h-12 px-4 rounded-xl bg-neutral-900 border border-white/10 text-white text-sm focus:outline-none focus:border-amber-400 font-sans"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-mono uppercase text-neutral-400 flex items-center gap-1.5 mb-1.5 font-semibold">
                        <Mail className="w-3.5 h-3.5 text-amber-400" />
                        <span>Private Email</span>
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="client@familyoffice.com"
                        className="w-full h-12 px-4 rounded-xl bg-neutral-900 border border-white/10 text-white text-sm focus:outline-none focus:border-amber-400 font-sans"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-mono uppercase text-neutral-400 flex items-center gap-1.5 mb-1.5 font-semibold">
                        <Phone className="w-3.5 h-3.5 text-amber-400" />
                        <span>Direct Telephone / Signal</span>
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+377 6 00 00 00 00"
                        className="w-full h-12 px-4 rounded-xl bg-neutral-900 border border-white/10 text-white text-sm focus:outline-none focus:border-amber-400 font-sans"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-mono uppercase text-neutral-400 flex items-center gap-1.5 mb-1.5 font-semibold">
                      <GlassWater className="w-3.5 h-3.5 text-amber-400" />
                      <span>Special Requests or Refreshment Preferences</span>
                    </label>
                    <textarea
                      rows={2}
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      placeholder="e.g. Dom Pérignon Vintage, circuit test track request, security detail info..."
                      className="w-full p-3.5 rounded-xl bg-neutral-900 border border-white/10 text-white text-sm focus:outline-none focus:border-amber-400 font-sans resize-none"
                    />
                  </div>
                </div>

                <div className="pt-3 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="h-11 px-4 rounded-xl border border-white/10 text-neutral-400 hover:text-white text-xs font-mono flex items-center gap-1.5"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Back</span>
                  </button>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="h-12 px-6 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-display font-bold text-xs uppercase tracking-wider shadow-glow-gold flex items-center gap-2 disabled:opacity-50"
                  >
                    <Sparkles className="w-4 h-4 fill-black" />
                    <span>{isSubmitting ? 'Confirming with Vault...' : 'Confirm VIP Appointment'}</span>
                  </button>
                </div>
              </form>
            )}

            {/* STEP 4: CONFIRMATION VOUCHER */}
            {step === 4 && (
              <div className="py-6 text-center space-y-6">
                <div className="w-20 h-20 rounded-full bg-emerald-500/15 border-2 border-emerald-400 text-emerald-400 flex items-center justify-center mx-auto shadow-glow-gold animate-bounce">
                  <CheckCircle className="w-10 h-10" />
                </div>

                <div className="space-y-2">
                  <h4 className="font-display font-extrabold text-2xl sm:text-3xl text-white">
                    VIP Viewing Confirmed
                  </h4>
                  <p className="text-xs text-neutral-400 max-w-md mx-auto leading-relaxed font-sans">
                    Thank you, <strong className="text-white">{formData.clientName}</strong>. Your private viewing dossier has been generated and dispatched to our Head of Private Clients.
                  </p>
                </div>

                <div className="max-w-md mx-auto p-5 rounded-2xl bg-neutral-900 border border-amber-500/30 text-left space-y-3 font-mono text-xs">
                  <div className="flex justify-between items-center pb-2.5 border-b border-white/10">
                    <span className="text-neutral-400">REFERENCE CODE</span>
                    <span className="text-amber-400 font-bold tracking-wider">{bookingRefId}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-400">VEHICLE</span>
                    <span className="text-white font-bold">{formData.carName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-400">SALON</span>
                    <span className="text-white">{formData.showroomLocation}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-400">DATE & SLOT</span>
                    <span className="text-white">{formData.preferredDate} • {formData.preferredTime.split(' ')[0]}</span>
                  </div>
                  {formData.chauffeurNeeded && (
                    <div className="flex justify-between text-emerald-400">
                      <span>CHAUFFEUR</span>
                      <span>Included (Maybach Transfer)</span>
                    </div>
                  )}
                </div>

                <div className="pt-2">
                  <button
                    onClick={handleClose}
                    className="h-12 px-8 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-white font-display font-bold text-xs uppercase tracking-wider transition-colors"
                  >
                    Return to Gallery
                  </button>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
