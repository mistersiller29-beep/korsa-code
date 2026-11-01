import React, { useState } from 'react';
import { Currency, Language } from '../types';
import { CURRENCY_SYMBOLS, CURRENCY_RATES } from '../data/cities';
import { Check, X, Shield, DollarSign, TrendingDown, Users, Sparkles } from 'lucide-react';

interface FareComparisonSectionProps {
  currency: Currency;
  lang: Language;
  onBookNow: () => void;
}

export const FareComparisonSection: React.FC<FareComparisonSectionProps> = ({
  currency,
  lang,
  onBookNow,
}) => {
  const [distanceKm, setDistanceKm] = useState<number>(10);
  const rate = CURRENCY_RATES[currency] || 1;
  const currSymbol = CURRENCY_SYMBOLS[currency] || 'د.م';

  // Base MAD prices
  const korsaPriceMad = Math.round(15 + distanceKm * 3.0);
  const standardMeterMad = Math.round(15 + distanceKm * 3.8);
  const surgeAppPriceMad = Math.round((18 + distanceKm * 4.5) * 1.45); // 1.45x surge

  const korsaPrice = Math.round(korsaPriceMad * rate);
  const standardMeter = Math.round(standardMeterMad * rate);
  const surgeApp = Math.round(surgeAppPriceMad * rate);

  const savingsPercent = Math.round(((surgeApp - korsaPrice) / surgeApp) * 100);

  return (
    <div className="bg-slate-900/90 backdrop-blur-xl border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-2xl flex flex-col gap-8 text-slate-100 max-w-5xl mx-auto">
      
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto">
        <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block mb-1">
          Direct Fair Pricing vs Congestion Algorithms
        </span>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          How Korsa Saves Money for Riders & Pays More to Chifors
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 mt-2 leading-relaxed">
          Traditional apps charge dynamic surge pricing when you need rides most and take up to 30% from the driver. Korsa eliminates the middleman algorithm with fair peer-to-peer bidding.
        </p>
      </div>

      {/* Interactive Trip Distance Simulator */}
      <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">
            Simulate Ride Distance: <strong className="text-amber-400 text-sm">{distanceKm} km</strong>
          </span>
          <span className="text-xs text-emerald-400 font-semibold bg-emerald-500/10 px-2 py-0.5 rounded">
            You Save ~{savingsPercent}% on this Korsa
          </span>
        </div>

        <input
          type="range"
          min={2}
          max={40}
          value={distanceKm}
          onChange={(e) => setDistanceKm(parseInt(e.target.value))}
          className="w-full accent-amber-400 cursor-pointer"
        />

        {/* 3-Way Comparison Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          
          {/* Korsa (Highlight) */}
          <div className="bg-gradient-to-b from-amber-500/15 to-amber-500/5 border-2 border-amber-400 rounded-xl p-4 flex flex-col justify-between shadow-lg relative">
            <span className="absolute -top-3 left-4 bg-amber-400 text-slate-950 text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full">
              Korsa Bidding
            </span>
            <div>
              <h3 className="text-sm font-bold text-white mt-1">Passenger-Set Price</h3>
              <p className="text-[11px] text-slate-400 mt-0.5">Direct agreement with licensed taxi driver</p>
              <div className="my-3">
                <span className="text-3xl font-black text-amber-400">{korsaPrice}</span>
                <span className="text-sm font-bold text-slate-300 ml-1">{currSymbol}</span>
              </div>
            </div>
            <ul className="text-xs text-slate-300 flex flex-col gap-1.5 pt-2 border-t border-amber-400/20">
              <li className="flex items-center gap-1.5 text-emerald-400">
                <Check className="w-3.5 h-3.5" /> Zero surge multipliers
              </li>
              <li className="flex items-center gap-1.5 text-emerald-400">
                <Check className="w-3.5 h-3.5" /> 94% driver fare retention
              </li>
              <li className="flex items-center gap-1.5 text-emerald-400">
                <Check className="w-3.5 h-3.5" /> Official licensed cabs
              </li>
            </ul>
          </div>

          {/* Standard Taxi Meter */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex flex-col justify-between">
            <div>
              <h3 className="text-sm font-bold text-slate-200">Standard Taxi Meter</h3>
              <p className="text-[11px] text-slate-400 mt-0.5">Municipal government meter ticking in traffic</p>
              <div className="my-3">
                <span className="text-2xl font-bold text-slate-300">{standardMeter}</span>
                <span className="text-sm font-bold text-slate-400 ml-1">{currSymbol}</span>
              </div>
            </div>
            <ul className="text-xs text-slate-400 flex flex-col gap-1.5 pt-2 border-t border-slate-800">
              <li className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-slate-500" /> Regulated official tariffs
              </li>
              <li className="flex items-center gap-1.5 text-amber-400/80">
                <span>~</span> Unpredictable traffic wait charges
              </li>
              <li className="flex items-center gap-1.5 text-rose-400/80">
                <X className="w-3.5 h-3.5" /> Hard to hail in rush hour
              </li>
            </ul>
          </div>

          {/* Corporate Rideshare Apps */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex flex-col justify-between opacity-85">
            <div>
              <h3 className="text-sm font-bold text-slate-200">Corporate Apps</h3>
              <p className="text-[11px] text-slate-400 mt-0.5">Uber / Bolt / Careem rush algorithms</p>
              <div className="my-3">
                <span className="text-2xl font-bold text-rose-400 line-through">{surgeApp}</span>
                <span className="text-sm font-bold text-slate-400 ml-1">{currSymbol}</span>
              </div>
            </div>
            <ul className="text-xs text-slate-400 flex flex-col gap-1.5 pt-2 border-t border-slate-800">
              <li className="flex items-center gap-1.5 text-rose-400">
                <X className="w-3.5 h-3.5" /> 1.5x–2.5x dynamic price hikes
              </li>
              <li className="flex items-center gap-1.5 text-rose-400">
                <X className="w-3.5 h-3.5" /> Driver takes only 65%–75%
              </li>
              <li className="flex items-center gap-1.5 text-rose-400">
                <X className="w-3.5 h-3.5" /> Cancellation fees & ghost rides
              </li>
            </ul>
          </div>

        </div>
      </div>

      {/* Quantitative Proof Bento Grid (Frontend Design Section 1.H) */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
          <span className="text-2xl sm:text-3xl font-black text-amber-400 block font-mono">
            +94%
          </span>
          <span className="text-xs text-slate-300 font-semibold block mt-1">Driver Revenue Kept</span>
          <span className="text-[11px] text-slate-500 mt-0.5 block">vs 70% corporate platforms</span>
        </div>

        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
          <span className="text-2xl sm:text-3xl font-black text-emerald-400 block font-mono">
            -25%
          </span>
          <span className="text-xs text-slate-300 font-semibold block mt-1">Average Passenger Fare</span>
          <span className="text-[11px] text-slate-500 mt-0.5 block">No surge manipulation</span>
        </div>

        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
          <span className="text-2xl sm:text-3xl font-black text-sky-400 block font-mono">
            &lt; 3.2 min
          </span>
          <span className="text-xs text-slate-300 font-semibold block mt-1">Average Driver Pickup ETA</span>
          <span className="text-[11px] text-slate-500 mt-0.5 block">Licensed city taxi grid</span>
        </div>
      </div>

      {/* Primary Action */}
      <div className="flex justify-center pt-2">
        <button
          onClick={onBookNow}
          className="px-8 py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-sm rounded-xl transition-colors shadow-lg"
        >
          Book Your First Korsa Now
        </button>
      </div>

    </div>
  );
};
