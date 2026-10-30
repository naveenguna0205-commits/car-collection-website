import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCar } from '../context/CarContext';
import { formatPrice } from '../utils/formatters';
import { 
  GitCompare, 
  Plus, 
  X, 
  Trophy, 
  Zap, 
  Timer, 
  Gauge, 
  CalendarCheck,
  ArrowRight,
  ArrowLeft
} from 'lucide-react';
import { motion } from 'framer-motion';

export const ComparePage = () => {
  const { 
    cars, 
    compareIds, 
    addToCompare, 
    removeFromCompare, 
    clearCompare, 
    currency 
  } = useCar();

  const [isCarPickerOpen, setIsCarPickerOpen] = useState(false);

  // Selected vehicles (up to 4)
  const comparedCars = cars.filter((c) => compareIds.includes(c.id));

  // Determine highest metrics for comparison highlighting
  const maxPower = Math.max(...comparedCars.map((c) => c.specs.powerHp || 0), 0);
  const min0to100 = Math.min(...comparedCars.map((c) => c.specs.acceleration0to100 || 99), 99);
  const maxSpeed = Math.max(...comparedCars.map((c) => c.specs.topSpeedKmh || 0), 0);
  const maxTorque = Math.max(...comparedCars.map((c) => c.specs.torqueNm || 0), 0);

  // Unselected cars available to add
  const availableToAdd = cars.filter((c) => !compareIds.includes(c.id));

  return (
    <div className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      
      {/* Header and actions */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-white/10 pb-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-semibold tracking-wider bg-amber-500/10 border border-amber-500/30 text-amber-400">
            <GitCompare className="w-3.5 h-3.5" />
            TELEMETRY STUDIO
          </div>
          <h1 className="font-display font-extrabold text-3xl sm:text-5xl text-white tracking-tight">
            Side-by-Side Comparison
          </h1>
          <p className="text-neutral-400 text-sm font-sans max-w-xl">
            Compare performance, horological engineering, and specifications of up to 4 vehicles from our collection.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {comparedCars.length > 0 && (
            <button
              onClick={clearCompare}
              className="h-10 px-4 rounded-xl bg-white/5 hover:bg-rose-500/20 text-neutral-300 hover:text-rose-400 border border-white/10 hover:border-rose-500/40 text-xs font-display font-bold uppercase tracking-wider transition-all"
            >
              Clear All
            </button>
          )}
          <Link
            to="/collection"
            className="h-10 px-4 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 border border-amber-500/30 text-xs font-display font-bold uppercase tracking-wider flex items-center gap-2 transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Add From Collection</span>
          </Link>
        </div>
      </div>

      {comparedCars.length === 0 ? (
        <div className="p-16 rounded-3xl bg-neutral-900/40 border border-white/10 text-center space-y-4 max-w-md mx-auto">
          <div className="w-16 h-16 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center text-neutral-400 mx-auto">
            <GitCompare className="w-8 h-8" />
          </div>
          <h3 className="font-display font-bold text-xl text-white">No Vehicles Selected</h3>
          <p className="text-neutral-400 text-xs font-sans">
            Select at least 2 vehicles from the collection to see side-by-side engineering comparisons.
          </p>
          <div className="pt-2">
            <Link
              to="/collection"
              className="h-11 px-6 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-display font-bold text-xs uppercase tracking-wider inline-flex items-center gap-2 transition-all shadow-gold"
            >
              Browse 12 Exotics
            </Link>
          </div>
        </div>
      ) : (
        <div className="space-y-12">
          
          {/* Selected vehicles comparison cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {comparedCars.map((car) => (
              <div
                key={car.id}
                className="relative rounded-3xl bg-neutral-900/80 border border-white/15 overflow-hidden shadow-xl p-5 space-y-4 flex flex-col justify-between"
              >
                <button
                  onClick={() => removeFromCompare(car.id)}
                  className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-black/75 hover:bg-rose-500 text-neutral-300 hover:text-white flex items-center justify-center transition-colors"
                  title="Remove from comparison"
                >
                  <X className="w-4 h-4" />
                </button>

                <div className="space-y-3">
                  <div className="aspect-[16/10] rounded-2xl overflow-hidden">
                    <img src={car.heroImage} alt={car.name} className="w-full h-full object-cover" />
                  </div>

                  <div>
                    <span className="text-[10px] font-mono uppercase text-amber-400">{car.brand} • {car.category}</span>
                    <h3 className="font-display font-bold text-xl text-white">{car.name}</h3>
                    <div className="text-base font-display font-bold text-white pt-1">
                      {formatPrice(car.priceUsd, currency)}
                    </div>
                  </div>
                </div>

                <div className="pt-2 flex items-center gap-2">
                  <Link
                    to={`/car/${car.id}`}
                    className="flex-1 h-10 rounded-xl bg-white/5 hover:bg-white/10 text-neutral-200 text-xs font-display font-bold uppercase tracking-wider flex items-center justify-center transition-colors border border-white/10"
                  >
                    View Specs
                  </Link>
                  <Link
                    to={`/test-drive?car=${car.id}`}
                    className="h-10 px-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black text-xs font-display font-bold uppercase tracking-wider flex items-center justify-center transition-colors"
                    title="Book Test Drive"
                  >
                    <CalendarCheck className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            ))}

            {/* Add Slot if less than 4 */}
            {comparedCars.length < 4 && (
              <div className="rounded-3xl border-2 border-dashed border-white/10 hover:border-amber-400/40 p-6 flex flex-col items-center justify-center text-center space-y-3 transition-colors bg-white/[0.02]">
                <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-neutral-400">
                  <Plus className="w-6 h-6" />
                </div>
                <div>
                  <div className="font-display font-bold text-sm text-white">Add Another Vehicle</div>
                  <div className="text-[11px] font-mono text-neutral-400 mt-0.5">Compare up to 4 models</div>
                </div>

                <select
                  onChange={(e) => {
                    if (e.target.value) {
                      addToCompare(e.target.value);
                      e.target.value = '';
                    }
                  }}
                  className="h-10 px-3 rounded-xl bg-neutral-900 border border-white/20 text-xs text-white font-sans focus:border-amber-400 focus:outline-none"
                  defaultValue=""
                >
                  <option value="" disabled>Select vehicle...</option>
                  {availableToAdd.map((c) => (
                    <option key={c.id} value={c.id} className="bg-neutral-900 text-white">
                      {c.name} ({c.specs.powerHp} HP)
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>

          {/* Comparative metrics breakdown */}
          <div className="rounded-3xl bg-neutral-900/60 border border-white/10 overflow-hidden font-mono text-xs">
            <div className="p-4 bg-white/5 font-display font-bold text-sm text-white border-b border-white/10">
              Technical Comparison Matrix
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left min-w-[550px]">
                <tbody>
                  <tr className="border-b border-white/5">
                    <td className="p-4 text-neutral-400 w-44 bg-white/[0.02]">Power Output</td>
                    {comparedCars.map((c) => {
                      const isLeader = c.specs.powerHp === maxPower;
                      return (
                        <td key={c.id} className="p-4">
                          <div className={`font-bold ${isLeader ? 'text-amber-400 flex items-center gap-1.5' : 'text-white'}`}>
                            {c.specs.powerHp} HP
                            {isLeader && <Trophy className="w-3.5 h-3.5 text-amber-400" />}
                          </div>
                          <div className="text-[10px] text-neutral-400">{c.specs.powerKw} kW</div>
                        </td>
                      );
                    })}
                  </tr>

                  <tr className="border-b border-white/5">
                    <td className="p-4 text-neutral-400 w-44 bg-white/[0.02]">0–100 km/h</td>
                    {comparedCars.map((c) => {
                      const isLeader = c.specs.acceleration0to100 === min0to100;
                      return (
                        <td key={c.id} className="p-4">
                          <div className={`font-bold ${isLeader ? 'text-emerald-400 flex items-center gap-1.5' : 'text-white'}`}>
                            {c.specs.acceleration0to100}s
                            {isLeader && <Trophy className="w-3.5 h-3.5 text-emerald-400" />}
                          </div>
                        </td>
                      );
                    })}
                  </tr>

                  <tr className="border-b border-white/5">
                    <td className="p-4 text-neutral-400 w-44 bg-white/[0.02]">Top Speed</td>
                    {comparedCars.map((c) => {
                      const isLeader = c.specs.topSpeedKmh === maxSpeed;
                      return (
                        <td key={c.id} className="p-4">
                          <div className={`font-bold ${isLeader ? 'text-amber-400 flex items-center gap-1.5' : 'text-white'}`}>
                            {c.specs.topSpeedKmh} km/h
                            {isLeader && <Trophy className="w-3.5 h-3.5 text-amber-400" />}
                          </div>
                          <div className="text-[10px] text-neutral-400">{Math.round(c.specs.topSpeedKmh * 0.621371)} mph</div>
                        </td>
                      );
                    })}
                  </tr>

                  <tr className="border-b border-white/5">
                    <td className="p-4 text-neutral-400 w-44 bg-white/[0.02]">Peak Torque</td>
                    {comparedCars.map((c) => (
                      <td key={c.id} className="p-4 font-bold text-white">
                        {c.specs.torqueNm} Nm
                      </td>
                    ))}
                  </tr>

                  <tr className="border-b border-white/5">
                    <td className="p-4 text-neutral-400 w-44 bg-white/[0.02]">Engine</td>
                    {comparedCars.map((c) => (
                      <td key={c.id} className="p-4 text-neutral-200">
                        {c.specs.engine}
                      </td>
                    ))}
                  </tr>

                  <tr className="border-b border-white/5">
                    <td className="p-4 text-neutral-400 w-44 bg-white/[0.02]">Drivetrain</td>
                    {comparedCars.map((c) => (
                      <td key={c.id} className="p-4 text-neutral-200">
                        {c.specs.drivetrain}
                      </td>
                    ))}
                  </tr>

                  <tr className="border-b border-white/5">
                    <td className="p-4 text-neutral-400 w-44 bg-white/[0.02]">Transmission</td>
                    {comparedCars.map((c) => (
                      <td key={c.id} className="p-4 text-neutral-200">
                        {c.specs.transmission}
                      </td>
                    ))}
                  </tr>

                  <tr>
                    <td className="p-4 text-neutral-400 w-44 bg-white/[0.02]">Curb Weight</td>
                    {comparedCars.map((c) => (
                      <td key={c.id} className="p-4 text-neutral-200">
                        {c.specs.curbWeightKg} kg
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

