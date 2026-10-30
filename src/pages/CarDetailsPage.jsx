import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useCar } from '../context/CarContext';
import { formatPrice, calculateFinancing } from '../utils/formatters';
import { 
  ArrowLeft, 
  Heart, 
  GitCompare, 
  CalendarCheck, 
  ShieldCheck, 
  Zap, 
  Gauge, 
  Timer, 
  Fuel, 
  Compass, 
  Maximize2,
  ChevronRight,
  Sparkles,
  Share2,
  Check
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const CarDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { 
    cars, 
    currency, 
    toggleWishlist, 
    isInWishlist, 
    toggleCompare, 
    isInCompare, 
    openBookingForCar,
    addToast 
  } = useCar();

  const car = cars.find((c) => c.id === id) || cars[0];

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState(car?.colorOptions?.[0] || null);
  const [copiedLink, setCopiedLink] = useState(false);

  // Financing calculator state
  const [downPaymentPercent, setDownPaymentPercent] = useState(25);
  const [loanTermMonths, setLoanTermMonths] = useState(48);

  useEffect(() => {
    if (car) {
      setActiveImageIndex(0);
      setSelectedColor(car.colorOptions?.[0] || null);
    }
  }, [id, car]);

  if (!car) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-8 text-center space-y-4">
        <h2 className="text-2xl font-display font-bold text-white">Vehicle Not Found</h2>
        <p className="text-neutral-400 text-sm">The allocation you are looking for is no longer available in the vault.</p>
        <Link
          to="/collection"
          className="h-11 px-6 rounded-xl bg-amber-500 text-black font-display font-bold text-xs uppercase tracking-wider flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Return to Collection
        </Link>
      </div>
    );
  }

  const isFavorited = isInWishlist(car.id);
  const isCompared = isInCompare(car.id);

  // Current display image
  const displayImage = selectedColor?.image || car.galleryImages[activeImageIndex] || car.heroImage;

  // Financing calculation
  const finance = calculateFinancing(car.priceUsd, downPaymentPercent, loanTermMonths, currency);

  // Similar vehicles from same category
  const similarCars = cars.filter((c) => c.category === car.category && c.id !== car.id).slice(0, 3);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    addToast('info', 'Link Copied', 'Vehicle allocation link copied to clipboard.');
    setTimeout(() => setCopiedLink(false), 3000);
  };

  return (
    <div className="min-h-screen py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
      
      {/* Breadcrumbs and navigation bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div className="flex items-center gap-2 text-xs font-mono text-neutral-400">
          <Link to="/" className="hover:text-amber-400 transition-colors">Home</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link to="/collection" className="hover:text-amber-400 transition-colors">Collection</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-amber-400 font-semibold">{car.name}</span>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/collection')}
            className="h-10 px-4 rounded-xl bg-white/5 hover:bg-white/10 text-neutral-300 hover:text-white border border-white/10 text-xs font-display font-bold uppercase tracking-wider flex items-center gap-2 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>All Exotics</span>
          </button>

          <button
            onClick={handleShare}
            className="h-10 px-4 rounded-xl bg-white/5 hover:bg-white/10 text-neutral-300 hover:text-white border border-white/10 text-xs font-display font-bold uppercase tracking-wider flex items-center gap-2 transition-colors"
            title="Share Allocation"
          >
            {copiedLink ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
            <span>{copiedLink ? 'Copied' : 'Share'}</span>
          </button>

          <button
            onClick={() => toggleWishlist(car.id)}
            className={`h-10 px-4 rounded-xl border text-xs font-display font-bold uppercase tracking-wider flex items-center gap-2 transition-all ${
              isFavorited
                ? 'bg-rose-500/20 border-rose-500/40 text-rose-400'
                : 'bg-white/5 border-white/10 text-neutral-300 hover:text-white'
            }`}
          >
            <Heart className={`w-4 h-4 ${isFavorited ? 'fill-rose-500 text-rose-500' : ''}`} />
            <span>{isFavorited ? 'In Vault' : 'Save'}</span>
          </button>
        </div>
      </div>

      {/* Main vehicle spotlight and gallery */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        
        {/* Left Column: Gallery & Exterior Angles (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="relative aspect-[16/10] rounded-3xl overflow-hidden border border-white/15 bg-neutral-950 shadow-2xl group">
            <motion.img
              key={displayImage}
              initial={{ opacity: 0.8, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              src={displayImage}
              alt={car.name}
              className="w-full h-full object-cover"
            />
            
            {/* Top Badges */}
            <div className="absolute top-4 left-4 flex items-center gap-2">
              <span className="text-xs font-mono font-semibold uppercase px-3 py-1 rounded-full bg-black/80 backdrop-blur-md text-amber-400 border border-amber-400/30">
                {car.category}
              </span>
              <span className="text-xs font-mono font-semibold uppercase px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                {car.badge}
              </span>
            </div>

            <div className="absolute bottom-4 right-4 px-3 py-1 rounded-full bg-black/75 backdrop-blur-md text-[11px] font-mono text-neutral-300 border border-white/10">
              Angle {activeImageIndex + 1} of {car.galleryImages.length}
            </div>
          </div>

          {/* Clickable Multi-Angle Thumbnails */}
          <div className="grid grid-cols-4 gap-3">
            {car.galleryImages.map((img, i) => (
              <button
                key={i}
                onClick={() => {
                  setActiveImageIndex(i);
                  setSelectedColor(null);
                }}
                className={`relative aspect-[16/10] rounded-2xl overflow-hidden border transition-all ${
                  activeImageIndex === i && !selectedColor
                    ? 'border-amber-400 ring-2 ring-amber-400/40'
                    : 'border-white/10 hover:border-white/30 opacity-70 hover:opacity-100'
                }`}
              >
                <img src={img} alt={`Angle ${i + 1}`} className="w-full h-full object-cover" />
                <div className="absolute bottom-1 right-1 text-[9px] font-mono px-1.5 rounded bg-black/80 text-neutral-300">
                  {i === 0 ? 'Front' : i === 1 ? 'Rear' : i === 2 ? 'Cockpit' : 'Wheel'}
                </div>
              </button>
            ))}
          </div>

          {/* Exterior Color Bespoke Swatches */}
          {car.colorOptions && car.colorOptions.length > 0 && (
            <div className="p-5 rounded-2xl bg-neutral-900/60 border border-white/10 space-y-3">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-neutral-400 uppercase tracking-wider">BESPOKE LIVERY FINISH:</span>
                <span className="text-amber-400 font-semibold">{selectedColor?.name || car.colorOptions[0].name}</span>
              </div>
              <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
                {car.colorOptions.map((opt, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setSelectedColor(opt);
                    }}
                    className={`flex items-center gap-2.5 px-3 py-2 rounded-xl border transition-all ${
                      selectedColor?.name === opt.name
                        ? 'border-amber-400 bg-amber-500/10 text-white shadow-glow-gold'
                        : 'border-white/10 hover:border-white/30 bg-neutral-950/50 text-neutral-300'
                    }`}
                  >
                    <span
                      className="w-4 h-4 rounded-full border border-white/20 shadow-sm"
                      style={{ backgroundColor: opt.hex }}
                    />
                    <span className="text-xs font-sans font-medium">{opt.name.split(' ')[0]}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Pricing, Overview & Action Buttons (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="space-y-3">
            <div className="text-xs font-mono uppercase tracking-widest text-amber-400">
              {car.brand} • {car.modelYear} • ALLOCATION AUTHENTICATED
            </div>
            <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-white tracking-tight">
              {car.name}
            </h1>
            <p className="text-neutral-300 text-sm font-sans leading-relaxed">
              {car.tagline}
            </p>
          </div>

          {/* Valuation Card */}
          <div className="p-6 rounded-3xl bg-neutral-900/80 border border-white/15 space-y-4 shadow-xl">
            <div className="flex items-end justify-between">
              <div>
                <span className="text-[11px] font-mono text-neutral-400 uppercase tracking-wider block">
                  Private Acquisition Price
                </span>
                <span className="font-display font-extrabold text-3xl sm:text-4xl text-white">
                  {formatPrice(car.priceUsd, currency)}
                </span>
              </div>
              <div className="text-right">
                <span className="text-[10px] font-mono text-emerald-400 uppercase bg-emerald-500/10 border border-emerald-500/30 px-2.5 py-1 rounded-full">
                  Immediate Allocation
                </span>
              </div>
            </div>

            <p className="text-xs text-neutral-400 font-sans leading-relaxed border-t border-white/10 pt-3">
              {car.provenance}
            </p>

            {/* CTAs */}
            <div className="pt-2 flex flex-col sm:flex-row gap-3">
              <Link
                to={`/test-drive?car=${car.id}`}
                className="h-12 flex-1 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-carbon-950 font-display font-bold text-xs uppercase tracking-wider transition-all shadow-gold flex items-center justify-center gap-2"
              >
                <CalendarCheck className="w-4 h-4" />
                <span>Book Test Drive</span>
              </Link>

              <button
                onClick={() => toggleCompare(car.id)}
                className={`h-12 px-5 rounded-xl border text-xs font-display font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all ${
                  isCompared
                    ? 'bg-amber-500/20 border-amber-400 text-amber-300'
                    : 'bg-white/5 border-white/15 text-neutral-200 hover:text-white hover:bg-white/10'
                }`}
              >
                <GitCompare className="w-4 h-4" />
                <span>{isCompared ? 'In Compare' : 'Compare'}</span>
              </button>
            </div>
          </div>

          {/* Primary Performance Metrics Quad */}
          <div className="grid grid-cols-2 gap-3 font-mono">
            <div className="p-4 rounded-2xl bg-neutral-900/60 border border-white/10 space-y-1">
              <span className="text-[10px] text-neutral-400 flex items-center gap-1.5 uppercase">
                <Zap className="w-3.5 h-3.5 text-amber-400" /> Output
              </span>
              <div className="text-xl font-bold text-white">{car.specs.powerHp} HP</div>
              <div className="text-[10px] text-neutral-400">{car.specs.powerKw} kW • {car.specs.torqueNm} Nm</div>
            </div>

            <div className="p-4 rounded-2xl bg-neutral-900/60 border border-white/10 space-y-1">
              <span className="text-[10px] text-neutral-400 flex items-center gap-1.5 uppercase">
                <Timer className="w-3.5 h-3.5 text-amber-400" /> 0-100 km/h
              </span>
              <div className="text-xl font-bold text-white">{car.specs.acceleration0to100}s</div>
              <div className="text-[10px] text-neutral-400">Launch Control Active</div>
            </div>

            <div className="p-4 rounded-2xl bg-neutral-900/60 border border-white/10 space-y-1">
              <span className="text-[10px] text-neutral-400 flex items-center gap-1.5 uppercase">
                <Gauge className="w-3.5 h-3.5 text-amber-400" /> Top Speed
              </span>
              <div className="text-xl font-bold text-white">{car.specs.topSpeedKmh} km/h</div>
              <div className="text-[10px] text-neutral-400">{Math.round(car.specs.topSpeedKmh * 0.621371)} mph</div>
            </div>

            <div className="p-4 rounded-2xl bg-neutral-900/60 border border-white/10 space-y-1">
              <span className="text-[10px] text-neutral-400 flex items-center gap-1.5 uppercase">
                <Fuel className="w-3.5 h-3.5 text-amber-400" /> Fuel Type
              </span>
              <div className="text-xl font-bold text-white">{car.specs.fuelType}</div>
              <div className="text-[10px] text-neutral-400">{car.specs.transmission}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Specifications matrix and financing calculator */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Full Spec Sheet Table (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="space-y-1">
            <span className="text-xs font-mono text-amber-400 uppercase tracking-wider">TELEMETRY DATA</span>
            <h3 className="text-2xl font-display font-bold text-white">Full Technical Specifications</h3>
          </div>

          <div className="rounded-3xl bg-neutral-900/60 border border-white/10 overflow-hidden divide-y divide-white/5 font-mono text-xs">
            <div className="flex items-center justify-between p-4 bg-white/5">
              <span className="text-neutral-400">Engine / Powertrain</span>
              <span className="font-semibold text-white text-right max-w-xs">{car.specs.engine}</span>
            </div>
            <div className="flex items-center justify-between p-4">
              <span className="text-neutral-400">Peak Horsepower</span>
              <span className="font-semibold text-amber-400">{car.specs.powerHp} HP ({car.specs.powerKw} kW)</span>
            </div>
            <div className="flex items-center justify-between p-4 bg-white/5">
              <span className="text-neutral-400">Peak Torque</span>
              <span className="font-semibold text-white">{car.specs.torqueNm} Nm</span>
            </div>
            <div className="flex items-center justify-between p-4">
              <span className="text-neutral-400">Acceleration (0-100 km/h)</span>
              <span className="font-semibold text-emerald-400">{car.specs.acceleration0to100} seconds</span>
            </div>
            <div className="flex items-center justify-between p-4 bg-white/5">
              <span className="text-neutral-400">Maximum Velocity</span>
              <span className="font-semibold text-white">{car.specs.topSpeedKmh} km/h</span>
            </div>
            <div className="flex items-center justify-between p-4">
              <span className="text-neutral-400">Transmission</span>
              <span className="font-semibold text-white">{car.specs.transmission}</span>
            </div>
            <div className="flex items-center justify-between p-4 bg-white/5">
              <span className="text-neutral-400">Drivetrain Architecture</span>
              <span className="font-semibold text-white text-right">{car.specs.drivetrain}</span>
            </div>
            <div className="flex items-center justify-between p-4">
              <span className="text-neutral-400">Curb Weight</span>
              <span className="font-semibold text-white">{car.specs.curbWeightKg} kg</span>
            </div>
            <div className="flex items-center justify-between p-4 bg-white/5">
              <span className="text-neutral-400">Displacement</span>
              <span className="font-semibold text-white">{car.specs.displacementCc}</span>
            </div>
            <div className="flex items-center justify-between p-4">
              <span className="text-neutral-400">Dimensions (L × W × H)</span>
              <span className="font-semibold text-white">
                {car.dimensions.lengthMm} × {car.dimensions.widthMm} × {car.dimensions.heightMm} mm
              </span>
            </div>
            <div className="flex items-center justify-between p-4 bg-white/5">
              <span className="text-neutral-400">Wheelbase</span>
              <span className="font-semibold text-white">{car.dimensions.wheelbaseMm} mm</span>
            </div>
            <div className="flex items-center justify-between p-4">
              <span className="text-neutral-400">Fuel Consumption</span>
              <span className="font-semibold text-white">{car.specs.fuelEconomy}</span>
            </div>
          </div>
        </div>

        {/* Bespoke Features & Financing (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="space-y-1">
            <span className="text-xs font-mono text-amber-400 uppercase tracking-wider">CRAFTSMANSHIP</span>
            <h3 className="text-2xl font-display font-bold text-white">Bespoke Features</h3>
          </div>

          <div className="p-6 rounded-3xl bg-neutral-900/60 border border-white/10 space-y-4">
            {car.features.map((feature, i) => (
              <div key={i} className="flex items-start gap-3 text-xs sm:text-sm font-sans text-neutral-300">
                <div className="w-5 h-5 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 flex-shrink-0 mt-0.5">
                  <Sparkles className="w-3 h-3" />
                </div>
                <span>{feature}</span>
              </div>
            ))}
          </div>

          {/* Private Lease & Finance Estimator */}
          <div className="p-6 rounded-3xl bg-neutral-900/80 border border-white/15 space-y-5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-amber-400 uppercase tracking-wider">FINANCE ESTIMATOR</span>
              <span className="text-[10px] font-mono text-neutral-400">5.9% Fixed APR</span>
            </div>

            <div>
              <div className="flex justify-between text-xs font-mono text-neutral-400 mb-2">
                <span>Down Payment ({downPaymentPercent}%)</span>
                <span className="text-white">{finance.downPaymentFormatted}</span>
              </div>
              <input
                type="range"
                min="10"
                max="50"
                step="5"
                value={downPaymentPercent}
                onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
                className="w-full accent-amber-400 cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs font-mono text-neutral-400 mb-2">
                <span>Loan Term</span>
                <span className="text-white">{loanTermMonths} Months</span>
              </div>
              <div className="grid grid-cols-4 gap-2">
                {[24, 36, 48, 60].map((months) => (
                  <button
                    key={months}
                    onClick={() => setLoanTermMonths(months)}
                    className={`h-9 rounded-xl text-xs font-mono font-bold transition-all ${
                      loanTermMonths === months
                        ? 'bg-amber-500 text-black'
                        : 'bg-white/5 hover:bg-white/10 text-neutral-300'
                    }`}
                  >
                    {months}m
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-white/10 flex items-end justify-between">
              <div>
                <span className="text-[10px] font-mono text-neutral-400 uppercase">Estimated Payment</span>
                <div className="font-display font-extrabold text-2xl text-amber-400">
                  {finance.monthlyPaymentFormatted} <span className="text-xs text-neutral-400 font-sans font-normal">/ mo</span>
                </div>
              </div>
              <Link
                to={`/contact?inquiry=Finance-${car.name}`}
                className="h-10 px-4 rounded-xl bg-white/10 hover:bg-white/20 text-white font-display font-bold text-xs uppercase tracking-wider flex items-center justify-center transition-colors"
              >
                Inquire
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Related allocations */}
      {similarCars.length > 0 && (
        <div className="space-y-6 pt-10 border-t border-white/10">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs font-mono text-amber-400 uppercase tracking-wider">RELATED VAULT ALLOCATIONS</span>
              <h3 className="text-2xl font-display font-bold text-white">More in {car.category}</h3>
            </div>
            <Link
              to={`/collection?category=${car.category}`}
              className="text-xs font-display font-bold text-amber-400 hover:text-amber-300 flex items-center gap-1 uppercase"
            >
              <span>View All</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {similarCars.map((item) => (
              <div
                key={item.id}
                onClick={() => navigate(`/car/${item.id}`)}
                className="group relative rounded-2xl overflow-hidden border border-white/10 hover:border-amber-400/50 bg-neutral-900 cursor-pointer transition-all duration-300 hover:shadow-xl"
              >
                <div className="aspect-[16/10] overflow-hidden">
                  <img src={item.heroImage} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-4 space-y-1">
                  <div className="text-[10px] font-mono text-neutral-400 uppercase">{item.brand}</div>
                  <div className="font-display font-bold text-base text-white group-hover:text-amber-400 transition-colors">
                    {item.name}
                  </div>
                  <div className="font-display font-bold text-sm text-neutral-300 pt-1">
                    {formatPrice(item.priceUsd, currency)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

