import React, { useState } from 'react';
import { useCar } from '../../context/CarContext';
import { formatPrice } from '../../utils/formatters';
import { 
  X, 
  Plus, 
  Trash2, 
  GitCompare, 
  Trophy
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const CarCompareModal = () => {
  const {
    cars,
    compareIds,
    removeFromCompare,
    addToCompare,
    clearCompare,
    isCompareModalOpen,
    setIsCompareModalOpen,
    setSelectedCar,
    openBookingForCar,
    currency,
  } = useCar();

  const [isAddPickerOpen, setIsAddPickerOpen] = useState(false);

  if (!isCompareModalOpen) return null;

  const comparedCars = cars.filter((c) => compareIds.includes(c.id));
  const unselectedCars = cars.filter((c) => !compareIds.includes(c.id));

  const highestHp = Math.max(...comparedCars.map((c) => c.specs.powerHp), 0);
  const fastest0to100 = Math.min(...comparedCars.map((c) => c.specs.acceleration0to100), 999);
  const highestTopSpeed = Math.max(...comparedCars.map((c) => c.specs.topSpeedKmh), 0);
  const lowestWeight = Math.min(...comparedCars.map((c) => c.specs.curbWeightKg), 99999);

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto bg-black/90 backdrop-blur-2xl flex items-center justify-center p-2 sm:p-4 md:p-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3 }}
          className="relative w-full max-w-6xl max-h-[92vh] overflow-y-auto rounded-3xl bg-neutral-950 border border-white/15 shadow-2xl text-neutral-100 scrollbar-thin"
        >
          {/* Header */}
          <div className="sticky top-0 z-30 flex items-center justify-between px-6 py-4 bg-neutral-950/95 backdrop-blur-xl border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-cyan-500/20 border border-cyan-500/40 text-cyan-400 flex items-center justify-center">
                <GitCompare className="w-5 h-5" />
              </div>
              <div>
                <h2 className="font-display font-extrabold text-xl text-white">
                  Automotive Comparison Arena
                </h2>
                <div className="text-xs font-mono text-neutral-400">
                  Benchmarking {comparedCars.length} hyper-performance machines
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              {comparedCars.length > 0 && (
                <button
                  onClick={clearCompare}
                  className="h-10 px-3.5 rounded-xl text-xs font-mono text-neutral-400 hover:text-red-400 border border-white/10 hover:border-red-500/30 transition-colors flex items-center gap-1.5"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Clear All</span>
                </button>
              )}

              <button
                onClick={() => setIsCompareModalOpen(false)}
                className="h-10 w-10 flex items-center justify-center rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-white/10 text-neutral-300 hover:text-white transition-colors"
                aria-label="Close comparison modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Modal Content */}
          <div className="p-6 sm:p-8 space-y-8">
            {comparedCars.length === 0 ? (
              <div className="py-20 text-center space-y-4">
                <div className="w-16 h-16 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center mx-auto">
                  <GitCompare className="w-8 h-8" />
                </div>
                <h3 className="font-display font-bold text-2xl text-white">
                  No Vehicles in Comparison Dock
                </h3>
                <p className="text-neutral-400 text-sm max-w-md mx-auto font-sans">
                  Select vehicles from the collection gallery using the comparison icon to benchmark their performance metrics side-by-side.
                </p>
                <button
                  onClick={() => setIsAddPickerOpen(true)}
                  className="h-12 px-6 rounded-xl bg-cyan-500 text-black font-display font-bold text-xs uppercase tracking-wider shadow-glow-cyan"
                >
                  Choose From Collection
                </button>
              </div>
            ) : (
              <>
                {/* Visual Performance Bars Chart */}
                <div className="p-6 rounded-3xl bg-neutral-900/60 border border-white/10 space-y-4">
                  <div className="flex items-center justify-between text-xs font-mono text-neutral-400">
                    <span className="flex items-center gap-1.5 text-amber-400 font-bold uppercase tracking-wider">
                      <Trophy className="w-4 h-4" />
                      Dynamic Performance Benchmarks
                    </span>
                    <span>Gold indicator signifies class-leading metric</span>
                  </div>

                  {/* HP Comparison Bars */}
                  <div className="space-y-3 pt-1">
                    <div className="text-xs font-mono text-neutral-300 font-semibold">Horsepower (BHP)</div>
                    <div className="space-y-2.5">
                      {comparedCars.map((car) => {
                        const isWinner = car.specs.powerHp === highestHp;
                        const pct = (car.specs.powerHp / 2000) * 100;
                        return (
                          <div key={car.id} className="space-y-1.5">
                            <div className="flex justify-between text-xs font-mono">
                              <span className="text-white truncate max-w-[220px] font-medium">{car.name}</span>
                              <span className={isWinner ? 'text-amber-400 font-bold' : 'text-neutral-400'}>
                                {car.specs.powerHp} HP {isWinner && '★ BEST'}
                              </span>
                            </div>
                            <div className="w-full bg-neutral-950 rounded-full h-2.5 overflow-hidden border border-white/5">
                              <div
                                className={`h-full transition-all duration-500 rounded-full ${
                                  isWinner
                                    ? 'bg-gradient-to-r from-amber-500 to-amber-300 shadow-glow-gold'
                                    : 'bg-neutral-600'
                                }`}
                                style={{ width: `${pct}%` }}
                              />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Side-by-Side Comparison Grid */}
                <div className="overflow-x-auto rounded-2xl border border-white/10">
                  <table className="w-full text-left border-collapse min-w-[700px]">
                    <thead>
                      <tr>
                        <th className="p-5 bg-neutral-900/90 border-b border-white/10 text-xs font-mono text-neutral-400 uppercase w-48 font-bold">
                          Specification
                        </th>
                        {comparedCars.map((car) => (
                          <th
                            key={car.id}
                            className="p-5 bg-neutral-900/70 border-b border-white/10 min-w-[240px] align-top"
                          >
                            <div className="space-y-3">
                              <div className="relative aspect-[16/10] rounded-2xl overflow-hidden border border-white/15 shadow-md">
                                <img
                                  src={car.heroImage}
                                  alt={car.name}
                                  className="w-full h-full object-cover"
                                />
                                <button
                                  onClick={() => removeFromCompare(car.id)}
                                  className="absolute top-2.5 right-2.5 h-7 w-7 rounded-full bg-black/75 hover:bg-red-600 text-white transition-colors flex items-center justify-center"
                                  title="Remove"
                                >
                                  <X className="w-3.5 h-3.5" />
                                </button>
                              </div>

                              <div>
                                <div className="text-[10px] font-mono text-neutral-400 uppercase">{car.brand}</div>
                                <div className="font-display font-bold text-lg text-white truncate">{car.name}</div>
                                <div className="font-display font-black text-xl text-amber-400 mt-1">
                                  {formatPrice(car.priceUsd, currency)}
                                </div>
                              </div>

                              <div className="flex items-center gap-2 pt-1">
                                <button
                                  onClick={() => {
                                    setIsCompareModalOpen(false);
                                    setSelectedCar(car);
                                  }}
                                  className="flex-1 h-9 rounded-xl bg-white/5 hover:bg-white/10 text-neutral-200 text-xs font-mono font-medium text-center border border-white/10 transition-colors flex items-center justify-center"
                                >
                                  Inspect
                                </button>
                                <button
                                  onClick={() => {
                                    setIsCompareModalOpen(false);
                                    openBookingForCar(car);
                                  }}
                                  className="flex-1 h-9 rounded-xl bg-amber-500 hover:bg-amber-400 text-black text-xs font-display font-bold text-center transition-colors shadow-glow-gold flex items-center justify-center"
                                >
                                  Book
                                </button>
                              </div>
                            </div>
                          </th>
                        ))}

                        {comparedCars.length < 4 && (
                          <th className="p-5 bg-neutral-900/40 border-b border-white/10 min-w-[200px] align-middle text-center">
                            <button
                              onClick={() => setIsAddPickerOpen(true)}
                              className="w-full h-48 rounded-2xl border-2 border-dashed border-white/20 hover:border-cyan-400 hover:bg-cyan-500/5 flex flex-col items-center justify-center gap-2 text-neutral-400 hover:text-cyan-400 transition-all"
                            >
                              <Plus className="w-6 h-6" />
                              <span className="text-xs font-mono font-semibold uppercase">Add Vehicle</span>
                            </button>
                          </th>
                        )}
                      </tr>
                    </thead>

                    <tbody className="divide-y divide-white/5 text-xs font-mono">
                      <tr>
                        <td className="p-4 text-neutral-400 font-semibold bg-neutral-900/50">Engine / Architecture</td>
                        {comparedCars.map((car) => (
                          <td key={car.id} className="p-4 text-white">
                            {car.specs.engine}
                          </td>
                        ))}
                      </tr>

                      <tr>
                        <td className="p-4 text-neutral-400 font-semibold bg-neutral-900/50">Horsepower (BHP)</td>
                        {comparedCars.map((car) => {
                          const isWin = car.specs.powerHp === highestHp;
                          return (
                            <td key={car.id} className={`p-4 ${isWin ? 'text-amber-400 font-bold bg-amber-500/5' : 'text-white'}`}>
                              {car.specs.powerHp} HP {isWin && '🏆 WINNER'}
                            </td>
                          );
                        })}
                      </tr>

                      <tr>
                        <td className="p-4 text-neutral-400 font-semibold bg-neutral-900/50">0-100 km/h Acceleration</td>
                        {comparedCars.map((car) => {
                          const isWin = car.specs.acceleration0to100 === fastest0to100;
                          return (
                            <td key={car.id} className={`p-4 ${isWin ? 'text-cyan-400 font-bold bg-cyan-500/5' : 'text-white'}`}>
                              {car.specs.acceleration0to100}s {isWin && '⚡ FASTEST'}
                            </td>
                          );
                        })}
                      </tr>

                      <tr>
                        <td className="p-4 text-neutral-400 font-semibold bg-neutral-900/50">Top Speed</td>
                        {comparedCars.map((car) => {
                          const isWin = car.specs.topSpeedKmh === highestTopSpeed;
                          return (
                            <td key={car.id} className={`p-4 ${isWin ? 'text-red-400 font-bold bg-red-500/5' : 'text-white'}`}>
                              {car.specs.topSpeedKmh} km/h {isWin && '🔥 HIGHEST'}
                            </td>
                          );
                        })}
                      </tr>

                      <tr>
                        <td className="p-4 text-neutral-400 font-semibold bg-neutral-900/50">Peak Torque</td>
                        {comparedCars.map((car) => (
                          <td key={car.id} className="p-4 text-white">
                            {car.specs.torqueNm} Nm
                          </td>
                        ))}
                      </tr>

                      <tr>
                        <td className="p-4 text-neutral-400 font-semibold bg-neutral-900/50">Transmission</td>
                        {comparedCars.map((car) => (
                          <td key={car.id} className="p-4 text-white">
                            {car.specs.transmission}
                          </td>
                        ))}
                      </tr>

                      <tr>
                        <td className="p-4 text-neutral-400 font-semibold bg-neutral-900/50">Drivetrain</td>
                        {comparedCars.map((car) => (
                          <td key={car.id} className="p-4 text-white">
                            {car.specs.drivetrain}
                          </td>
                        ))}
                      </tr>

                      <tr>
                        <td className="p-4 text-neutral-400 font-semibold bg-neutral-900/50">Curb Mass</td>
                        {comparedCars.map((car) => {
                          const isWin = car.specs.curbWeightKg === lowestWeight;
                          return (
                            <td key={car.id} className={`p-4 ${isWin ? 'text-emerald-400 font-bold bg-emerald-500/5' : 'text-white'}`}>
                              {car.specs.curbWeightKg} kg {isWin && '🌱 LIGHTEST'}
                            </td>
                          );
                        })}
                      </tr>

                      <tr>
                        <td className="p-4 text-neutral-400 font-semibold bg-neutral-900/50">Power-to-Weight</td>
                        {comparedCars.map((car) => {
                          const ratio = (car.specs.powerHp / (car.specs.curbWeightKg / 1000)).toFixed(0);
                          return (
                            <td key={car.id} className="p-4 text-amber-300 font-bold">
                              {ratio} BHP / ton
                            </td>
                          );
                        })}
                      </tr>
                    </tbody>
                  </table>
                </div>
              </>
            )}
          </div>
        </motion.div>

        {/* Modal To Add A Car */}
        <AnimatePresence>
          {isAddPickerOpen && (
            <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="w-full max-w-xl max-h-[80vh] overflow-y-auto rounded-3xl bg-neutral-950 border border-white/20 p-6 space-y-4 shadow-2xl"
              >
                <div className="flex items-center justify-between pb-3 border-b border-white/10">
                  <h3 className="font-display font-bold text-xl text-white">
                    Add Vehicle to Comparison
                  </h3>
                  <button
                    onClick={() => setIsAddPickerOpen(false)}
                    className="p-2 rounded-xl text-neutral-400 hover:text-white"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="space-y-2">
                  {unselectedCars.map((car) => (
                    <div
                      key={car.id}
                      onClick={() => {
                        addToCompare(car.id);
                        setIsAddPickerOpen(false);
                      }}
                      className="p-3.5 rounded-2xl bg-neutral-900 hover:bg-neutral-800 border border-white/10 hover:border-cyan-400 cursor-pointer flex items-center justify-between transition-colors"
                    >
                      <div className="flex items-center gap-3.5">
                        <img
                          src={car.heroImage}
                          alt={car.name}
                          className="w-16 h-11 object-cover rounded-xl"
                        />
                        <div>
                          <div className="text-[10px] font-mono text-neutral-400 uppercase">{car.brand}</div>
                          <div className="text-sm font-display font-bold text-white">{car.name}</div>
                        </div>
                      </div>

                      <div className="text-right">
                        <div className="text-xs font-bold text-amber-400 font-mono">{car.specs.powerHp} HP</div>
                        <div className="text-[10px] font-mono text-neutral-400">{car.specs.acceleration0to100}s (0-100)</div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </AnimatePresence>
  );
};
