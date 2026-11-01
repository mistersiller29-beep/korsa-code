import React, { useState, useEffect } from 'react';
import { CityPreset, LocationPoint, TaxiCategory, DriverBid, Currency, Language } from '../types';
import { translations } from '../data/translations';
import { CURRENCY_SYMBOLS, CURRENCY_RATES } from '../data/cities';
import { generateBidsForRequest } from '../data/drivers';
import { soundManager } from '../utils/audio';
import {
  MapPin,
  ArrowUpDown,
  Car,
  Users,
  Briefcase,
  Wind,
  CheckCircle2,
  Clock,
  Sparkles,
  TrendingDown,
  ChevronRight,
  Info
} from 'lucide-react';

interface PassengerFlowProps {
  city: CityPreset;
  allCities: CityPreset[];
  onSelectCity: (city: CityPreset) => void;
  pickup: LocationPoint | null;
  destination: LocationPoint | null;
  onSetPickup: (loc: LocationPoint) => void;
  onSetDestination: (loc: LocationPoint) => void;
  currency: Currency;
  lang: Language;
  onRideAccepted: (bid: DriverBid, pickup: LocationPoint, dest: LocationPoint, fare: number) => void;
}

export const PassengerFlow: React.FC<PassengerFlowProps> = ({
  city,
  allCities,
  onSelectCity,
  pickup,
  destination,
  onSetPickup,
  onSetDestination,
  currency,
  lang,
  onRideAccepted,
}) => {
  const t = translations[lang];

  // Selected vehicle category
  const [category, setCategory] = useState<TaxiCategory>('petit');

  // Fare proposal state
  const [customFare, setCustomFare] = useState<number>(30);
  const [passengersCount, setPassengersCount] = useState<number>(1);
  const [luggageCount, setLuggageCount] = useState<number>(0);
  const [hasAC, setHasAC] = useState<boolean>(true);
  const [customNote, setCustomNote] = useState<string>('');

  // Searching & Bidding state
  const [isBroadcasting, setIsBroadcasting] = useState<boolean>(false);
  const [incomingBids, setIncomingBids] = useState<DriverBid[]>([]);
  const [counterInputOpen, setCounterInputOpen] = useState<string | null>(null);
  const [counterValue, setCounterValue] = useState<number>(0);

  // Conversion rate
  const rate = CURRENCY_RATES[currency] || 1;
  const currSymbol = CURRENCY_SYMBOLS[currency] || 'د.م';

  // Calculate estimated distance between pickup & dropoff
  const estimatedKm = (pickup && destination)
    ? Math.max(2.5, Math.round(Math.hypot(pickup.lat - destination.lat, pickup.lng - destination.lng) * 110 * 10) / 10)
    : 6.4;

  const estimatedMinutes = Math.round(estimatedKm * 2.2 + 3);

  // Benchmarks in MAD
  const benchmarkBaseMad = city.baseFare + estimatedKm * city.ratePerKm;
  const standardMeterMad = Math.round(benchmarkBaseMad * 1.05);
  const corporateSurgeMad = Math.round(benchmarkBaseMad * 1.55);

  // Multiplier for category
  const categoryMultiplier = category === 'grand_blassa' ? 0.35
    : category === 'grand_kamla' ? 1.6
    : category === 'eco' ? 1.15
    : category === 'executive' ? 2.1
    : 1.0;

  const recommendedFareConverted = Math.max(5, Math.round(benchmarkBaseMad * categoryMultiplier * rate));
  const standardMeterConverted = Math.max(5, Math.round(standardMeterMad * categoryMultiplier * rate));
  const surgeConverted = Math.max(7, Math.round(corporateSurgeMad * categoryMultiplier * rate));

  // Initialize or update proposed fare when route or category changes
  useEffect(() => {
    setCustomFare(recommendedFareConverted);
  }, [recommendedFareConverted]);

  // Handle swapping locations
  const handleSwap = () => {
    if (pickup && destination) {
      const temp = pickup;
      onSetPickup(destination);
      onSetDestination(temp);
    }
  };

  // Launch Korsa broadcasting
  const handleLaunchKorsa = () => {
    if (!pickup || !destination) return;
    setIsBroadcasting(true);
    setIncomingBids([]);
    soundManager.playTaxiHorn();

    // Generate incoming driver bids sequentially over a few seconds
    const generated = generateBidsForRequest(recommendedFareConverted, customFare);

    generated.forEach((bidItem, idx) => {
      setTimeout(() => {
        soundManager.playBidReceived();
        setIncomingBids(prev => [
          ...prev,
          {
            id: `bid_${Date.now()}_${idx}`,
            driverId: bidItem.driver.id,
            driver: bidItem.driver,
            bidAmount: bidItem.bidAmount,
            originalPassengerPrice: customFare,
            isCounterOffer: bidItem.isCounterOffer,
            timestamp: Date.now(),
            etaMinutes: bidItem.etaMinutes,
          }
        ]);
      }, (idx + 1) * 1600);
    });
  };

  const handleCancelBroadcast = () => {
    setIsBroadcasting(false);
    setIncomingBids([]);
  };

  const handleAcceptBid = (bid: DriverBid) => {
    soundManager.playRideAccepted();
    if (pickup && destination) {
      onRideAccepted(bid, pickup, destination, bid.bidAmount);
    }
  };

  const handleSendCounter = (bid: DriverBid) => {
    // Driver accepts the counter after a brief delay
    setTimeout(() => {
      const updatedBid = { ...bid, bidAmount: counterValue, isCounterOffer: false };
      soundManager.playRideAccepted();
      if (pickup && destination) {
        onRideAccepted(updatedBid, pickup, destination, counterValue);
      }
    }, 900);
  };

  return (
    <div className="bg-slate-900/90 backdrop-blur-xl border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-2xl flex flex-col gap-6 text-slate-100">
      
      {/* City Switcher & Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800/80 pb-4">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
            <span>{t.whereTo}</span>
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            {lang === 'ar' ? 'حدد مسارك واقترح الثمن ديالك بحرية' : 'Direct passenger-to-taxi bidding · Zero algorithmic surge'}
          </p>
        </div>

        {/* City selection dropdown */}
        <div className="flex items-center gap-2">
          <label htmlFor="city-select" className="text-xs text-slate-400 whitespace-nowrap">{t.selectCity}:</label>
          <select
            id="city-select"
            value={city.id}
            onChange={(e) => {
              const found = allCities.find(c => c.id === e.target.value);
              if (found) {
                onSelectCity(found);
                if (found.popularLocations.length >= 2) {
                  onSetPickup(found.popularLocations[0]);
                  onSetDestination(found.popularLocations[1]);
                }
              }
            }}
            className="bg-slate-950 border border-slate-700/80 text-white text-xs font-semibold rounded-lg px-3 py-1.5 focus:border-amber-500 focus:outline-none"
          >
            {allCities.map(c => (
              <option key={c.id} value={c.id}>
                {c.flag} {c.name.split('(')[0]} ({c.country})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Pick-up and Destination Selector */}
      <div className="flex flex-col gap-3 relative">
        {/* Pickup Row */}
        <div className="flex items-center gap-3 bg-slate-950/70 border border-slate-800 rounded-xl px-3.5 py-2.5 focus-within:border-amber-500 transition-colors">
          <div className="w-6 h-6 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center shrink-0">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-500" />
          </div>
          <div className="flex-1 min-w-0">
            <label className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">
              {t.pickupLocation}
            </label>
            <select
              value={pickup?.id || ''}
              onChange={(e) => {
                const loc = city.popularLocations.find(l => l.id === e.target.value);
                if (loc) onSetPickup(loc);
              }}
              className="w-full bg-transparent text-sm font-semibold text-white focus:outline-none cursor-pointer truncate"
            >
              {city.popularLocations.map(loc => (
                <option key={loc.id} value={loc.id} className="bg-slate-900 text-slate-200">
                  {loc.name} {loc.nameAr ? `(${loc.nameAr})` : ''}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Swap Button in between */}
        <button
          onClick={handleSwap}
          aria-label="Swap pickup and destination"
          className="absolute right-4 top-[42px] z-10 w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 flex items-center justify-center shadow-md transition-transform hover:scale-110 focus:outline-none"
        >
          <ArrowUpDown className="w-4 h-4 text-amber-400" />
        </button>

        {/* Dropoff Row */}
        <div className="flex items-center gap-3 bg-slate-950/70 border border-slate-800 rounded-xl px-3.5 py-2.5 focus-within:border-amber-500 transition-colors">
          <div className="w-6 h-6 rounded-full bg-rose-500/20 text-rose-400 flex items-center justify-center shrink-0">
            <MapPin className="w-4 h-4 text-rose-500" />
          </div>
          <div className="flex-1 min-w-0">
            <label className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">
              {t.dropoffLocation}
            </label>
            <select
              value={destination?.id || ''}
              onChange={(e) => {
                const loc = city.popularLocations.find(l => l.id === e.target.value);
                if (loc) onSetDestination(loc);
              }}
              className="w-full bg-transparent text-sm font-semibold text-white focus:outline-none cursor-pointer truncate"
            >
              {city.popularLocations.map(loc => (
                <option key={loc.id} value={loc.id} className="bg-slate-900 text-slate-200">
                  {loc.name} {loc.nameAr ? `(${loc.nameAr})` : ''}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Trip estimate stats */}
        <div className="flex items-center justify-between text-xs text-slate-400 px-1 pt-1">
          <div className="flex items-center gap-2">
            <span>{estimatedKm} km</span>
            <span aria-hidden="true">·</span>
            <span>~{estimatedMinutes} min travel</span>
          </div>
          <div className="text-amber-400/90 font-medium text-[11px]">
            {city.name.split('(')[0]} Taxi Territory
          </div>
        </div>
      </div>

      {/* Vehicle Category Selector */}
      <div className="flex flex-col gap-2.5">
        <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">
          {t.selectVehicle}
        </label>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
          
          {/* Petit Taxi */}
          <button
            type="button"
            onClick={() => setCategory('petit')}
            className={`p-3 rounded-xl border text-left transition-all ${
              category === 'petit'
                ? 'bg-amber-500/15 border-amber-400 text-white shadow-sm ring-1 ring-amber-400/40'
                : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:border-slate-700'
            }`}
          >
            <div className="flex items-center justify-between mb-1">
              <span className="font-bold text-sm">{t.petitTaxi}</span>
              <span className="w-3 h-3 rounded-full border border-white/20" style={{ backgroundColor: city.petitTaxiColor }} />
            </div>
            <p className="text-[11px] text-slate-400 line-clamp-2 leading-tight">
              {t.petitTaxiDesc}
            </p>
          </button>

          {/* Grand Taxi (Blassa) - Moroccan hallmark! */}
          {city.country === 'Morocco' && (
            <button
              type="button"
              onClick={() => setCategory('grand_blassa')}
              className={`p-3 rounded-xl border text-left transition-all ${
                category === 'grand_blassa'
                  ? 'bg-amber-500/15 border-amber-400 text-white shadow-sm ring-1 ring-amber-400/40'
                  : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="font-bold text-sm">{t.grandTaxiBlassa}</span>
                <Users className="w-3.5 h-3.5 text-amber-400" />
              </div>
              <p className="text-[11px] text-slate-400 line-clamp-2 leading-tight">
                {t.grandTaxiBlassaDesc}
              </p>
            </button>
          )}

          {/* Grand Taxi (Korsa Kamla) */}
          <button
            type="button"
            onClick={() => setCategory('grand_kamla')}
            className={`p-3 rounded-xl border text-left transition-all ${
              category === 'grand_kamla'
                ? 'bg-amber-500/15 border-amber-400 text-white shadow-sm ring-1 ring-amber-400/40'
                : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:border-slate-700'
            }`}
          >
            <div className="flex items-center justify-between mb-1">
              <span className="font-bold text-sm">{t.grandTaxiKamla}</span>
              <Briefcase className="w-3.5 h-3.5 text-amber-400" />
            </div>
            <p className="text-[11px] text-slate-400 line-clamp-2 leading-tight">
              {t.grandTaxiKamlaDesc}
            </p>
          </button>

          {/* Eco Cab */}
          <button
            type="button"
            onClick={() => setCategory('eco')}
            className={`p-3 rounded-xl border text-left transition-all ${
              category === 'eco'
                ? 'bg-amber-500/15 border-amber-400 text-white shadow-sm ring-1 ring-amber-400/40'
                : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:border-slate-700'
            }`}
          >
            <div className="flex items-center justify-between mb-1">
              <span className="font-bold text-sm">{t.ecoCab}</span>
              <span className="w-3 h-3 rounded-full bg-emerald-500" />
            </div>
            <p className="text-[11px] text-slate-400 line-clamp-2 leading-tight">
              {t.ecoCabDesc}
            </p>
          </button>

          {/* Executive Cab */}
          <button
            type="button"
            onClick={() => setCategory('executive')}
            className={`p-3 rounded-xl border text-left transition-all ${
              category === 'executive'
                ? 'bg-amber-500/15 border-amber-400 text-white shadow-sm ring-1 ring-amber-400/40'
                : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:border-slate-700'
            }`}
          >
            <div className="flex items-center justify-between mb-1">
              <span className="font-bold text-sm">{t.executiveCab}</span>
              <Car className="w-3.5 h-3.5 text-slate-300" />
            </div>
            <p className="text-[11px] text-slate-400 line-clamp-2 leading-tight">
              {t.executiveCabDesc}
            </p>
          </button>

        </div>
      </div>

      {/* Fare Selector & Bidding Benchmark Comparison */}
      <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-4 flex flex-col gap-4">
        
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-amber-400 block">
              {t.nameYourFare}
            </span>
            <span className="text-xs text-slate-400">
              {t.nameYourFareDesc}
            </span>
          </div>

          <div className="text-right">
            <span className="text-[11px] text-slate-400 block">{t.estimatedBenchmark}</span>
            <span className="text-xs font-semibold text-slate-200">
              ~{recommendedFareConverted} {currSymbol}
            </span>
          </div>
        </div>

        {/* Counter selector with quick buttons */}
        <div className="flex items-center justify-center gap-4 py-2">
          <button
            type="button"
            onClick={() => setCustomFare(prev => Math.max(3, prev - (currency === 'MAD' ? 5 : 1)))}
            className="w-11 h-11 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xl font-bold flex items-center justify-center transition-colors focus:outline-none"
          >
            -
          </button>

          <div className="flex items-baseline gap-1 text-center min-w-[120px]">
            <input
              type="number"
              value={customFare}
              onChange={(e) => setCustomFare(Math.max(1, parseInt(e.target.value) || 0))}
              className="w-24 text-3xl font-extrabold text-amber-400 bg-transparent text-center focus:outline-none border-b border-amber-500/40"
            />
            <span className="text-lg font-bold text-slate-300">{currSymbol}</span>
          </div>

          <button
            type="button"
            onClick={() => setCustomFare(prev => prev + (currency === 'MAD' ? 5 : 1))}
            className="w-11 h-11 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xl font-bold flex items-center justify-center transition-colors focus:outline-none"
          >
            +
          </button>
        </div>

        {/* Benchmark Comparison Strip */}
        <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-800/80 text-center text-xs">
          <div className="bg-slate-900/60 rounded-lg p-2">
            <span className="text-[10px] text-slate-400 block">{t.meterComparison}</span>
            <span className="font-semibold text-slate-300">{standardMeterConverted} {currSymbol}</span>
          </div>
          <div className="bg-slate-900/60 rounded-lg p-2 border border-amber-500/20">
            <span className="text-[10px] text-amber-400 font-medium block">Your Offer</span>
            <span className="font-bold text-amber-400">{customFare} {currSymbol}</span>
          </div>
          <div className="bg-slate-900/60 rounded-lg p-2">
            <span className="text-[10px] text-rose-400/80 block">{t.surgeComparison}</span>
            <span className="font-semibold text-slate-400 line-through">{surgeConverted} {currSymbol}</span>
          </div>
        </div>

        {/* Optional Ride Preferences */}
        <div className="flex flex-wrap items-center gap-3 pt-1 text-xs text-slate-300">
          <label className="flex items-center gap-1.5 cursor-pointer">
            <input
              type="checkbox"
              checked={hasAC}
              onChange={(e) => setHasAC(e.target.checked)}
              className="rounded bg-slate-800 border-slate-700 text-amber-500 focus:ring-0"
            />
            <Wind className="w-3.5 h-3.5 text-slate-400" />
            <span>Air Conditioning</span>
          </label>

          <label className="flex items-center gap-1.5 cursor-pointer">
            <input
              type="checkbox"
              checked={luggageCount > 0}
              onChange={(e) => setLuggageCount(e.target.checked ? 2 : 0)}
              className="rounded bg-slate-800 border-slate-700 text-amber-500 focus:ring-0"
            />
            <Briefcase className="w-3.5 h-3.5 text-slate-400" />
            <span>Luggage</span>
          </label>

          <div className="flex items-center gap-1 ml-auto">
            <Users className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={passengersCount}
              onChange={(e) => setPassengersCount(parseInt(e.target.value))}
              aria-label="Number of passengers"
              className="bg-slate-900 border border-slate-800 rounded px-1.5 py-0.5 text-xs text-slate-200 focus:outline-none"
            >
              <option value={1}>1 person</option>
              <option value={2}>2 persons</option>
              <option value={3}>3 persons</option>
              {category !== 'petit' && <option value={4}>4 persons</option>}
              {category === 'grand_kamla' && <option value={6}>6 persons (Full Grand Taxi)</option>}
            </select>
          </div>
        </div>

      </div>

      {/* Primary Action Button or Active Bidding Radar */}
      {!isBroadcasting ? (
        <button
          onClick={handleLaunchKorsa}
          className="w-full py-3.5 px-4 bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-slate-950 font-extrabold text-base rounded-xl shadow-lg transition-all transform active:scale-[0.99] flex items-center justify-center gap-2"
        >
          <span>{t.launchKorsa} ({customFare} {currSymbol})</span>
          <ChevronRight className="w-5 h-5" />
        </button>
      ) : (
        <div className="flex flex-col gap-4">
          
          {/* Radar Header */}
          <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-3.5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative w-4 h-4">
                <span className="w-4 h-4 rounded-full bg-amber-400 absolute animate-ping opacity-75" />
                <span className="w-4 h-4 rounded-full bg-amber-500 relative block" />
              </div>
              <div>
                <span className="text-xs font-bold text-amber-300 block">
                  {incomingBids.length > 0 ? `${incomingBids.length} ${t.bidsReceived}` : t.searchingTaxis}
                </span>
                <span className="text-[11px] text-slate-400">
                  {t.incomingOffers}
                </span>
              </div>
            </div>

            <button
              onClick={handleCancelBroadcast}
              className="text-xs font-semibold text-rose-400 hover:text-rose-300 underline focus:outline-none"
            >
              {t.cancelRide}
            </button>
          </div>

          {/* Incoming Driver Bids Stream */}
          <div className="flex flex-col gap-3 max-h-[360px] overflow-y-auto pr-1">
            {incomingBids.length === 0 ? (
              <div className="py-8 text-center text-slate-400 text-xs flex flex-col items-center gap-2">
                <div className="w-8 h-8 rounded-full border-2 border-amber-400 border-t-transparent animate-spin" />
                <span>Broadcasting to local licensed taxis in {city.name.split('(')[0]}...</span>
              </div>
            ) : (
              incomingBids.map((bid) => (
                <div
                  key={bid.id}
                  className="bg-slate-950 border border-slate-800 hover:border-amber-500/60 rounded-xl p-3.5 flex flex-col gap-3 transition-colors shadow-md"
                >
                  <div className="flex items-start justify-between gap-3">
                    {/* Driver Avatar & Details */}
                    <div className="flex items-center gap-3 min-w-0">
                      <img
                        src={bid.driver.avatar}
                        alt={bid.driver.name}
                        referrerPolicy="no-referrer"
                        className="w-12 h-12 rounded-full object-cover border-2 border-amber-400/60 shrink-0"
                      />
                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span className="font-bold text-sm text-white truncate">{bid.driver.name}</span>
                          <span className="text-[10px] text-amber-400 font-semibold bg-amber-400/10 px-1.5 py-0.5 rounded">
                            ★ {bid.driver.rating}
                          </span>
                        </div>
                        <p className="text-xs text-slate-400 truncate">
                          {bid.driver.vehicleModel} · {bid.driver.plateNumber}
                        </p>
                        <p className="text-[11px] text-slate-500">
                          {bid.driver.tripsCount} {t.korsasCompleted} · {bid.etaMinutes} min away
                        </p>
                      </div>
                    </div>

                    {/* Driver Bid Fare */}
                    <div className="text-right shrink-0">
                      <div className="flex items-baseline justify-end gap-1">
                        <span className="text-xl font-black text-amber-400">
                          {bid.bidAmount}
                        </span>
                        <span className="text-xs font-bold text-slate-300">{currSymbol}</span>
                      </div>

                      {bid.isCounterOffer ? (
                        <span className="text-[10px] text-amber-300 bg-amber-500/20 px-1.5 py-0.5 rounded font-medium">
                          Counter +{bid.bidAmount - bid.originalPassengerPrice} {currSymbol}
                        </span>
                      ) : (
                        <span className="text-[10px] text-emerald-400 font-medium">
                          ✓ Agreed to your price
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Badges */}
                  <div className="flex items-center gap-2 text-[10px] text-slate-400 flex-wrap">
                    {bid.driver.badges.map((badge, bIdx) => (
                      <span key={bIdx} className="bg-slate-900 border border-slate-800 rounded px-1.5 py-0.5">
                        {badge}
                      </span>
                    ))}
                  </div>

                  {/* Driver Actions */}
                  <div className="flex items-center gap-2 pt-1 border-t border-slate-800/60">
                    <button
                      onClick={() => handleAcceptBid(bid)}
                      className="flex-1 py-2 px-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-lg transition-colors flex items-center justify-center gap-1.5"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>{t.acceptFare} ({bid.bidAmount} {currSymbol})</span>
                    </button>

                    <button
                      onClick={() => {
                        if (counterInputOpen === bid.id) {
                          setCounterInputOpen(null);
                        } else {
                          setCounterInputOpen(bid.id);
                          setCounterValue(Math.max(1, bid.bidAmount - 5));
                        }
                      }}
                      className="py-2 px-3 bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs rounded-lg transition-colors"
                    >
                      {t.counterOffer}
                    </button>

                    <button
                      onClick={() => {
                        setIncomingBids(prev => prev.filter(b => b.id !== bid.id));
                      }}
                      className="py-2 px-2.5 text-slate-400 hover:text-slate-200 text-xs transition-colors"
                      title={t.passOffer}
                    >
                      ✕
                    </button>
                  </div>

                  {/* Counter offer inline input */}
                  {counterInputOpen === bid.id && (
                    <div className="bg-slate-900 p-2.5 rounded-lg flex items-center justify-between gap-2 border border-slate-700 animate-fadeIn">
                      <span className="text-xs text-slate-300">Counter with:</span>
                      <div className="flex items-center gap-1">
                        <input
                          type="number"
                          value={counterValue}
                          onChange={(e) => setCounterValue(parseInt(e.target.value) || 0)}
                          className="w-16 bg-slate-950 border border-slate-700 text-white text-xs font-bold px-2 py-1 rounded text-center"
                        />
                        <span className="text-xs text-slate-400">{currSymbol}</span>
                      </div>
                      <button
                        onClick={() => handleSendCounter(bid)}
                        className="py-1 px-3 bg-amber-500 text-slate-950 text-xs font-bold rounded hover:bg-amber-400"
                      >
                        Send Counter
                      </button>
                    </div>
                  )}

                </div>
              ))
            )}
          </div>

        </div>
      )}

    </div>
  );
};
