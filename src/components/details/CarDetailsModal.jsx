import React, { useState, useEffect } from 'react';
import { useCar } from '../../context/CarContext';
import { formatPrice, calculateMonthlyPayment } from '../../utils/formatters';
import { 
  X, 
  Heart, 
  GitCompare, 
  CalendarCheck, 
  Share2, 
  Zap, 
  Timer, 
  Gauge, 
  Layers, 
  ShieldCheck, 
  Calculator, 
  Check, 
  Sparkles,
  Download
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const CarDetailsModal = () => {
  const {
    selectedCar,
    setSelectedCar,
    currency,
    toggleWishlist,
    isInWishlist,
    toggleCompare,
    isInCompare,
    openBookingForCar,
    addToast
  } = useCar();

  if (!selectedCar) return null;

  const isFavorited = isInWishlist(selectedCar.id);
  const isCompared = isInCompare(selectedCar.id);

  // Gallery and Color State
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState(selectedCar.colorOptions[0] || null);

  // Financing Calculator State
  const [downPaymentPercent, setDownPaymentPercent] = useState(20);
  const [termMonths, setTermMonths] = useState(36);
  const [interestRate, setInterestRate] = useState(4.8);

  const calculatedFinancing = calculateMonthlyPayment(
    selectedCar.priceUsd,
    downPaymentPercent,
    termMonths,
    interestRate
  );

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        handleClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleClose = () => {
    setSelectedCar(null);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: selectedCar.name,
        text: `${selectedCar.name} - ${selectedCar.tagline}`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      addToast('success', 'Link Copied', 'Vehicle link copied to your clipboard.');
    }
  };

  const handleDownloadSpecSheet = () => {
    addToast('success', 'Bespoke Dossier Generated', `Dossier for ${selectedCar.name} downloaded successfully.`);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto bg-black/90 backdrop-blur-2xl flex items-center justify-center p-2 sm:p-4 md:p-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 20 }}
          transition={{ duration: 0.3 }}
          className="relative w-full max-w-6xl max-h-[92vh] overflow-y-auto rounded-3xl bg-neutral-950 border border-white/15 shadow-2xl text-neutral-100 scrollbar-thin"
        >
          {/* Header Sticky Bar - Symmetrical H-16 */}
          <div className="sticky top-0 z-30 flex items-center justify-between px-6 py-4 bg-neutral-950/95 backdrop-blur-xl border-b border-white/10">
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400">
                {selectedCar.category}
              </span>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono text-neutral-400 uppercase">{selectedCar.brand}</span>
                <span className="text-neutral-600">•</span>
                <span className="font-display font-extrabold text-xl text-white">{selectedCar.name}</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => toggleWishlist(selectedCar.id)}
                className={`h-10 w-10 flex items-center justify-center rounded-xl border transition-colors ${
                  isFavorited
                    ? 'bg-red-500/20 border-red-500 text-red-400'
                    : 'bg-neutral-900 border-white/10 text-neutral-300 hover:text-white'
                }`}
                title="Save to Vault"
                aria-label="Save to Vault"
              >
                <Heart className={`w-4 h-4 ${isFavorited ? 'fill-red-400' : ''}`} />
              </button>

              <button
                onClick={() => toggleCompare(selectedCar.id)}
                className={`h-10 w-10 flex items-center justify-center rounded-xl border transition-colors ${
                  isCompared
                    ? 'bg-cyan-500/20 border-cyan-500 text-cyan-400'
                    : 'bg-neutral-900 border-white/10 text-neutral-300 hover:text-white'
                }`}
                title="Add to Comparison"
                aria-label="Add to comparison"
              >
                <GitCompare className="w-4 h-4" />
              </button>

              <button
                onClick={handleShare}
                className="h-10 w-10 flex items-center justify-center rounded-xl bg-neutral-900 border border-white/10 text-neutral-300 hover:text-white transition-colors"
                title="Share Allocation"
                aria-label="Share allocation"
              >
                <Share2 className="w-4 h-4" />
              </button>

              <button
                onClick={handleClose}
                className="h-10 w-10 flex items-center justify-center rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-white/10 text-neutral-300 hover:text-white transition-colors ml-1"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Modal Body */}
          <div className="p-6 sm:p-8 space-y-10">
            {/* Gallery & Hero Visuals */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Main Image Stage */}
              <div className="lg:col-span-8 space-y-4">
                <div className="relative aspect-[16/10] rounded-3xl overflow-hidden bg-neutral-900 border border-white/10 group shadow-2xl">
                  <img
                    src={selectedColor ? selectedColor.image : selectedCar.galleryImages[activeImageIndex]}
                    alt={selectedCar.name}
                    className="w-full h-full object-cover transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-transparent to-transparent pointer-events-none" />

                  {/* Active Color Tag on image */}
                  {selectedColor && (
                    <div className="absolute bottom-4 left-4 z-10 flex items-center gap-2.5 px-3.5 py-1.5 rounded-xl bg-black/75 backdrop-blur-md border border-white/15 text-xs font-mono text-neutral-200">
                      <span
                        className="w-3.5 h-3.5 rounded-full border border-white/30 shadow-inner"
                        style={{ backgroundColor: selectedColor.hex }}
                      />
                      <span>Livery: <strong className="text-white">{selectedColor.name}</strong></span>
                    </div>
                  )}
                </div>

                {/* Thumbnails Carousel */}
                <div className="grid grid-cols-4 gap-3">
                  {selectedCar.galleryImages.map((imgUrl, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setSelectedColor(null);
                        setActiveImageIndex(idx);
                      }}
                      className={`relative aspect-[16/10] rounded-2xl overflow-hidden border transition-all ${
                        activeImageIndex === idx && !selectedColor
                          ? 'border-amber-400 ring-2 ring-amber-400/40 shadow-glow-gold'
                          : 'border-white/10 opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img src={imgUrl} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>

                {/* Exterior Color Customizer */}
                <div className="p-5 rounded-2xl bg-neutral-900/60 border border-white/10 space-y-3">
                  <div className="text-xs font-mono uppercase tracking-wider text-neutral-400 flex items-center justify-between">
                    <span>BESPOKE PAINTWORK CONFIGURATOR</span>
                    <span className="text-amber-400 font-bold">{selectedColor?.name || 'Factory Standard'}</span>
                  </div>
                  <div className="flex flex-wrap items-center gap-3">
                    {selectedCar.colorOptions.map((opt) => (
                      <button
                        key={opt.name}
                        onClick={() => setSelectedColor(opt)}
                        className={`h-10 group flex items-center gap-2.5 px-4 rounded-xl border text-xs font-mono transition-all ${
                          selectedColor?.name === opt.name
                            ? 'bg-neutral-800 border-amber-400 text-white shadow-glow-gold'
                            : 'bg-neutral-950 border-white/10 text-neutral-400 hover:text-white hover:border-white/25'
                        }`}
                      >
                        <span
                          className="w-4 h-4 rounded-full border border-white/30 shadow-inner flex-shrink-0"
                          style={{ backgroundColor: opt.hex }}
                        />
                        <span className="truncate max-w-[150px]">{opt.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Quick Info & Action Panel */}
              <div className="lg:col-span-4 space-y-6">
                <div className="p-6 rounded-3xl bg-neutral-900/85 border border-white/15 space-y-5 shadow-2xl">
                  <div>
                    <div className="text-[11px] font-mono uppercase tracking-wider text-neutral-400">
                      Vault Allocation Valuation
                    </div>
                    <div className="font-display font-black text-3xl sm:text-4xl text-white mt-1">
                      {formatPrice(selectedCar.priceUsd, currency)}
                    </div>
                    <div className="text-xs text-neutral-400 font-mono mt-1.5">
                      Estimated Monthly: <strong className="text-amber-400 font-bold">{formatPrice(calculatedFinancing.monthlyPayment, currency)}</strong>/mo
                    </div>
                  </div>

                  <div className="pt-2 border-t border-white/10 space-y-2.5">
                    <button
                      onClick={() => openBookingForCar(selectedCar)}
                      className="w-full h-12 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-display font-bold text-xs uppercase tracking-wider transition-all shadow-glow-gold hover:shadow-2xl flex items-center justify-center gap-2"
                    >
                      <CalendarCheck className="w-4 h-4" />
                      Book Private Viewing & Test Drive
                    </button>

                    <button
                      onClick={handleDownloadSpecSheet}
                      className="w-full h-11 rounded-xl bg-neutral-950 hover:bg-neutral-800 text-neutral-200 border border-white/15 font-display font-semibold text-xs tracking-wider uppercase transition-colors flex items-center justify-center gap-2"
                    >
                      <Download className="w-4 h-4 text-amber-400" />
                      Download Official Dossier (PDF)
                    </button>
                  </div>
                </div>

                {/* Provenance Card */}
                <div className="p-5 rounded-2xl bg-neutral-900/50 border border-white/10 space-y-2">
                  <div className="flex items-center gap-2 text-xs font-mono font-bold text-amber-400 uppercase tracking-wider">
                    <ShieldCheck className="w-4 h-4" />
                    <span>Provenance & Heritage</span>
                  </div>
                  <p className="text-xs text-neutral-300 leading-relaxed font-sans">
                    {selectedCar.provenance}
                  </p>
                  <div className="text-[11px] font-mono text-neutral-400 pt-1 border-t border-white/5">
                    Current Vault Location: <strong className="text-white">{selectedCar.showroomLocation}</strong>
                  </div>
                </div>

                {/* Quick Telemetry Glance */}
                <div className="grid grid-cols-2 gap-3 font-mono">
                  <div className="p-4 rounded-2xl bg-neutral-900/60 border border-white/10">
                    <div className="text-[10px] text-neutral-400">OUTPUT</div>
                    <div className="text-xl font-bold text-amber-400 mt-0.5">{selectedCar.specs.powerHp} HP</div>
                    <div className="text-[10px] text-neutral-400 mt-0.5">{selectedCar.specs.torqueNm} Nm Torque</div>
                  </div>
                  <div className="p-4 rounded-2xl bg-neutral-900/60 border border-white/10">
                    <div className="text-[10px] text-neutral-400">0 - 100 KM/H</div>
                    <div className="text-xl font-bold text-cyan-400 mt-0.5">{selectedCar.specs.acceleration0to100}s</div>
                    <div className="text-[10px] text-neutral-400 mt-0.5">Top: {selectedCar.specs.topSpeedKmh} km/h</div>
                  </div>
                </div>
              </div>

            </div>

            {/* Technical Specifications Matrix */}
            <div className="space-y-6">
              <div className="flex items-center gap-2.5">
                <Layers className="w-5 h-5 text-amber-400" />
                <h3 className="font-display font-bold text-2xl text-white">
                  Technical Specifications Matrix
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {/* Engine & Transmission */}
                <div className="p-5 rounded-2xl bg-neutral-900/60 border border-white/10 space-y-3 font-mono">
                  <div className="text-xs uppercase tracking-wider text-amber-400 font-bold">
                    Powertrain Architecture
                  </div>
                  <div className="space-y-2 text-xs">
                    <div className="flex items-center justify-between py-1.5 border-b border-white/5">
                      <span className="text-neutral-400">Engine Format</span>
                      <span className="text-white text-right max-w-[180px] truncate" title={selectedCar.specs.engine}>
                        {selectedCar.specs.engine}
                      </span>
                    </div>
                    <div className="flex items-center justify-between py-1.5 border-b border-white/5">
                      <span className="text-neutral-400">Transmission</span>
                      <span className="text-white">{selectedCar.specs.transmission}</span>
                    </div>
                    <div className="flex items-center justify-between py-1.5 border-b border-white/5">
                      <span className="text-neutral-400">Drivetrain</span>
                      <span className="text-white text-right max-w-[160px] truncate" title={selectedCar.specs.drivetrain}>
                        {selectedCar.specs.drivetrain}
                      </span>
                    </div>
                    <div className="flex items-center justify-between py-1.5 border-b border-white/5">
                      <span className="text-neutral-400">Fuel Requirement</span>
                      <span className="text-white">{selectedCar.specs.fuelType}</span>
                    </div>
                    {selectedCar.specs.fuelEconomy && (
                      <div className="flex items-center justify-between py-1.5">
                        <span className="text-neutral-400">Economy / Range</span>
                        <span className="text-white">{selectedCar.specs.fuelEconomy}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Performance Dynamics */}
                <div className="p-5 rounded-2xl bg-neutral-900/60 border border-white/10 space-y-3 font-mono">
                  <div className="text-xs uppercase tracking-wider text-cyan-400 font-bold">
                    Performance Dynamics
                  </div>
                  <div className="space-y-2 text-xs">
                    <div className="flex items-center justify-between py-1.5 border-b border-white/5">
                      <span className="text-neutral-400">Maximum Output</span>
                      <span className="text-amber-400 font-bold">{selectedCar.specs.powerHp} BHP ({selectedCar.specs.powerKw} kW)</span>
                    </div>
                    <div className="flex items-center justify-between py-1.5 border-b border-white/5">
                      <span className="text-neutral-400">Peak Torque</span>
                      <span className="text-white font-bold">{selectedCar.specs.torqueNm} Nm</span>
                    </div>
                    <div className="flex items-center justify-between py-1.5 border-b border-white/5">
                      <span className="text-neutral-400">0 - 100 km/h (0-62 mph)</span>
                      <span className="text-cyan-400 font-bold">{selectedCar.specs.acceleration0to100} seconds</span>
                    </div>
                    <div className="flex items-center justify-between py-1.5 border-b border-white/5">
                      <span className="text-neutral-400">Top Velocity</span>
                      <span className="text-red-400 font-bold">{selectedCar.specs.topSpeedKmh} km/h</span>
                    </div>
                    <div className="flex items-center justify-between py-1.5">
                      <span className="text-neutral-400">Curb Mass</span>
                      <span className="text-white">{selectedCar.specs.curbWeightKg} kg</span>
                    </div>
                  </div>
                </div>

                {/* Chassis Dimensions */}
                <div className="p-5 rounded-2xl bg-neutral-900/60 border border-white/10 space-y-3 font-mono">
                  <div className="text-xs uppercase tracking-wider text-purple-400 font-bold">
                    Chassis Dimensions
                  </div>
                  <div className="space-y-2 text-xs">
                    <div className="flex items-center justify-between py-1.5 border-b border-white/5">
                      <span className="text-neutral-400">Overall Length</span>
                      <span className="text-white">{selectedCar.dimensions.lengthMm} mm</span>
                    </div>
                    <div className="flex items-center justify-between py-1.5 border-b border-white/5">
                      <span className="text-neutral-400">Overall Width</span>
                      <span className="text-white">{selectedCar.dimensions.widthMm} mm</span>
                    </div>
                    <div className="flex items-center justify-between py-1.5 border-b border-white/5">
                      <span className="text-neutral-400">Overall Height</span>
                      <span className="text-white">{selectedCar.dimensions.heightMm} mm</span>
                    </div>
                    <div className="flex items-center justify-between py-1.5 border-b border-white/5">
                      <span className="text-neutral-400">Wheelbase</span>
                      <span className="text-white">{selectedCar.dimensions.wheelbaseMm} mm</span>
                    </div>
                    <div className="flex items-center justify-between py-1.5">
                      <span className="text-neutral-400">Power-to-Weight</span>
                      <span className="text-amber-400 font-bold">
                        {(selectedCar.specs.powerHp / (selectedCar.specs.curbWeightKg / 1000)).toFixed(0)} hp / ton
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bespoke Features List */}
              <div className="p-6 rounded-2xl bg-neutral-900/50 border border-white/10 space-y-4">
                <div className="text-sm font-display font-bold text-white flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <span>Key Bespoke Engineering Attributes</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 text-xs text-neutral-300">
                  {selectedCar.features.map((feature, i) => (
                    <div key={i} className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                      <span className="leading-relaxed font-sans">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Bespoke Financing & Lease Calculator */}
            <div className="p-6 sm:p-8 rounded-3xl bg-neutral-900/75 border border-white/10 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-2.5">
                  <Calculator className="w-5 h-5 text-amber-400" />
                  <h3 className="font-display font-bold text-2xl text-white">
                    Private Client Financing & Lease Estimator
                  </h3>
                </div>
                <span className="text-xs font-mono text-neutral-400 bg-black/40 px-3.5 py-1.5 rounded-xl border border-white/10">
                  Underwritten by Aura Sovereign Capital
                </span>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-7 space-y-5">
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs font-mono text-neutral-400">
                      <span>DOWN PAYMENT ({downPaymentPercent}%)</span>
                      <span className="text-amber-400 font-bold">
                        {formatPrice(calculatedFinancing.downPayment, currency)}
                      </span>
                    </div>
                    <input
                      type="range"
                      min="10"
                      max="50"
                      step="5"
                      value={downPaymentPercent}
                      onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
                      className="w-full accent-amber-500 cursor-pointer"
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="text-xs font-mono text-neutral-400">FINANCING TERM</div>
                    <div className="grid grid-cols-4 gap-2">
                      {[12, 24, 36, 48].map((m) => (
                        <button
                          key={m}
                          onClick={() => setTermMonths(m)}
                          className={`h-10 rounded-xl text-xs font-mono transition-all ${
                            termMonths === m
                              ? 'bg-amber-500 text-black font-bold shadow-glow-gold'
                              : 'bg-neutral-950 border border-white/10 text-neutral-300 hover:text-white'
                          }`}
                        >
                          {m} Months
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-xs font-mono text-neutral-400">
                      <span>ANNUAL PERCENTAGE RATE (APR)</span>
                      <span className="text-white font-bold">{interestRate.toFixed(1)}%</span>
                    </div>
                    <input
                      type="range"
                      min="2.5"
                      max="8.0"
                      step="0.1"
                      value={interestRate}
                      onChange={(e) => setInterestRate(Number(e.target.value))}
                      className="w-full accent-amber-500 cursor-pointer"
                    />
                  </div>
                </div>

                <div className="lg:col-span-5 p-6 rounded-3xl bg-neutral-950 border border-white/15 space-y-4 shadow-xl">
                  <div>
                    <div className="text-[11px] font-mono text-neutral-400 uppercase tracking-wider">
                      Estimated Monthly VIP Payment
                    </div>
                    <div className="font-display font-black text-3xl sm:text-4xl text-amber-400 mt-1">
                      {formatPrice(calculatedFinancing.monthlyPayment, currency)}
                      <span className="text-xs text-neutral-400 font-mono font-normal"> / month</span>
                    </div>
                  </div>

                  <div className="space-y-2 pt-3 border-t border-white/10 text-xs font-mono text-neutral-400">
                    <div className="flex justify-between">
                      <span>Total Loan Principal</span>
                      <span className="text-white font-semibold">{formatPrice(calculatedFinancing.totalLoan, currency)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Down Payment Due</span>
                      <span className="text-white font-semibold">{formatPrice(calculatedFinancing.downPayment, currency)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Amortization Term</span>
                      <span className="text-white font-semibold">{termMonths} Months</span>
                    </div>
                  </div>

                  <button
                    onClick={() => openBookingForCar(selectedCar)}
                    className="w-full h-11 rounded-xl bg-amber-500/15 hover:bg-amber-500 text-amber-400 hover:text-black font-display font-bold text-xs tracking-wider uppercase border border-amber-500/30 transition-all text-center flex items-center justify-center"
                  >
                    Submit Bespoke Financing Application
                  </button>
                </div>
              </div>
            </div>

          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
