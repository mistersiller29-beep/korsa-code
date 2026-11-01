import React, { useState } from 'react';
import { CityPreset, Currency, Language, LocationPoint } from '../types';
import { translations } from '../data/translations';
import { CURRENCY_SYMBOLS, CURRENCY_RATES } from '../data/cities';
import { STAR_DRIVER_PHOTO } from '../data/drivers';
import { soundManager } from '../utils/audio';
import {
  Car,
  TrendingUp,
  Award,
  Navigation,
  CheckCircle2,
  Clock,
  MapPin,
  Users,
  Shield,
  Phone,
  Power
} from 'lucide-react';

interface DriverFlowProps {
  city: CityPreset;
  currency: Currency;
  lang: Language;
}

interface IncomingPassengerJob {
  id: string;
  passengerName: string;
  passengerRating: number;
  pickup: string;
  destination: string;
  distanceKm: number;
  offeredFareMad: number;
  passengers: number;
  category: string;
  notes?: string;
  timeAgo: string;
}

export const DriverFlow: React.FC<DriverFlowProps> = ({
  city,
  currency,
  lang,
}) => {
  const t = translations[lang];
  const rate = CURRENCY_RATES[currency] || 1;
  const currSymbol = CURRENCY_SYMBOLS[currency] || 'د.م';

  const [isOnline, setIsOnline] = useState(true);
  const [activeJob, setActiveJob] = useState<IncomingPassengerJob | null>(null);
  const [jobStage, setJobStage] = useState<'approaching' | 'arrived' | 'trip' | 'completed'>('approaching');
  const [counterOpenJobId, setCounterOpenJobId] = useState<string | null>(null);
  const [driverCounterFare, setDriverCounterFare] = useState<number>(0);

  // Simulated live requests feed
  const [requests, setRequests] = useState<IncomingPassengerJob[]>([
    {
      id: 'req_1',
      passengerName: 'Salma Benjelloun',
      passengerRating: 4.95,
      pickup: city.popularLocations[0]?.name || 'City Center Plaza',
      destination: city.popularLocations[1]?.name || 'Old Medina Gate',
      distanceKm: 5.2,
      offeredFareMad: 35,
      passengers: 2,
      category: 'Petit Taxi',
      notes: 'Waiting next to the pharmacy, wearing green scarf',
      timeAgo: 'Just now'
    },
    {
      id: 'req_2',
      passengerName: 'Driss Kabbaj',
      passengerRating: 4.88,
      pickup: city.popularLocations[2]?.name || 'Railway Station',
      destination: city.popularLocations[3]?.name || 'Business District',
      distanceKm: 8.4,
      offeredFareMad: 50,
      passengers: 1,
      category: 'Petit Taxi',
      notes: 'Has 1 small suitcase',
      timeAgo: '1 min ago'
    },
    {
      id: 'req_3',
      passengerName: 'Mehdi & Yassine',
      passengerRating: 5.0,
      pickup: city.popularLocations[1]?.name || 'Grand Boulevard',
      destination: city.popularLocations[4]?.name || 'Airport Highway',
      distanceKm: 14.5,
      offeredFareMad: 120,
      passengers: 3,
      category: 'Grand Taxi',
      notes: 'Airport run, flight at 10:00',
      timeAgo: '2 min ago'
    }
  ]);

  const handleAcceptJob = (job: IncomingPassengerJob, agreedPrice: number) => {
    soundManager.playRideAccepted();
    setActiveJob({ ...job, offeredFareMad: agreedPrice });
    setJobStage('approaching');
  };

  const handleDeclineJob = (jobId: string) => {
    setRequests(prev => prev.filter(r => r.id !== jobId));
  };

  return (
    <div className="flex flex-col gap-6 text-slate-100">
      
      {/* Shift Cockpit Header */}
      <div className="bg-slate-900/90 backdrop-blur-xl border border-slate-800 rounded-2xl p-5 shadow-2xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          
          {/* Driver identity */}
          <div className="flex items-center gap-3.5">
            <img
              src={STAR_DRIVER_PHOTO}
              alt="Driver profile"
              referrerPolicy="no-referrer"
              className="w-14 h-14 rounded-full object-cover border-2 border-amber-400 shrink-0"
            />
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold text-white">Si Mohammed El Fassi</h3>
                <span className="text-xs bg-amber-400 text-slate-950 font-black px-1.5 py-0.5 rounded">
                  ★ 4.97
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Official Chifor · Dacia Logan Stepway (4932-A-1) · {city.name.split('(')[0]}
              </p>
            </div>
          </div>

          {/* Online/Offline status switch */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsOnline(!isOnline)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                isOnline
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/50 shadow-sm'
                  : 'bg-slate-800 text-slate-400 border border-slate-700'
              }`}
            >
              <Power className="w-4 h-4" />
              <span>{isOnline ? 'Online (Accepting Korsas)' : 'Shift Paused (Offline)'}</span>
            </button>
          </div>

        </div>

        {/* Shift Performance Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 text-center">
          <div className="bg-slate-950/70 p-3 rounded-xl border border-slate-800/80">
            <span className="text-[11px] text-slate-400 block">{t.todayEarnings}</span>
            <span className="text-xl font-black text-amber-400">
              {Math.round(480 * rate)} {currSymbol}
            </span>
          </div>

          <div className="bg-slate-950/70 p-3 rounded-xl border border-slate-800/80">
            <span className="text-[11px] text-slate-400 block">{t.ridesCompleted}</span>
            <span className="text-xl font-black text-white">8 Korsas</span>
          </div>

          <div className="bg-slate-950/70 p-3 rounded-xl border border-slate-800/80">
            <span className="text-[11px] text-slate-400 block">Korsa Commission</span>
            <span className="text-xl font-black text-emerald-400">Only 6%</span>
          </div>

          <div className="bg-slate-950/70 p-3 rounded-xl border border-slate-800/80">
            <span className="text-[11px] text-slate-400 block">Acceptance Rate</span>
            <span className="text-xl font-black text-sky-400">96%</span>
          </div>
        </div>

      </div>

      {/* Active Trip Cockpit if Job is in Progress */}
      {activeJob && (
        <div className="bg-amber-500/10 border-2 border-amber-500/60 rounded-2xl p-5 shadow-2xl flex flex-col gap-4 animate-fadeIn">
          <div className="flex items-center justify-between border-b border-amber-500/20 pb-3">
            <div>
              <span className="text-xs uppercase font-bold text-amber-400 tracking-wider block">
                Active Korsa in Progress
              </span>
              <h4 className="text-lg font-bold text-white">
                Passenger: {activeJob.passengerName} (★ {activeJob.passengerRating})
              </h4>
            </div>

            <div className="text-right">
              <span className="text-xs text-slate-400 block">Fare to Collect</span>
              <span className="text-2xl font-black text-amber-400">
                {Math.round(activeJob.offeredFareMad * rate)} {currSymbol}
              </span>
            </div>
          </div>

          {/* Navigation details */}
          <div className="bg-slate-950 p-4 rounded-xl flex flex-col gap-2 text-xs">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-blue-400 shrink-0" />
              <span className="text-slate-400">Pickup:</span>
              <span className="text-white font-semibold">{activeJob.pickup}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-rose-400 shrink-0" />
              <span className="text-slate-400">Destination:</span>
              <span className="text-white font-semibold">{activeJob.destination}</span>
            </div>
            {activeJob.notes && (
              <p className="text-[11px] text-amber-300/90 bg-amber-500/10 p-2 rounded mt-1">
                Note: "{activeJob.notes}"
              </p>
            )}
          </div>

          {/* Driver Execution Controls */}
          <div className="flex flex-wrap items-center gap-3 pt-1">
            {jobStage === 'approaching' && (
              <button
                onClick={() => {
                  soundManager.playTaxiHorn();
                  setJobStage('arrived');
                }}
                className="flex-1 py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl text-xs transition-colors"
              >
                I Have Arrived at Pickup Point (Wselt)
              </button>
            )}

            {jobStage === 'arrived' && (
              <button
                onClick={() => setJobStage('trip')}
                className="flex-1 py-3 bg-blue-500 hover:bg-blue-400 text-white font-bold rounded-xl text-xs transition-colors"
              >
                Passenger Onboard · Start Navigation
              </button>
            )}

            {jobStage === 'trip' && (
              <button
                onClick={() => {
                  soundManager.playRideAccepted();
                  setJobStage('completed');
                }}
                className="flex-1 py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl text-xs transition-colors"
              >
                Arrived at Destination · Collect {Math.round(activeJob.offeredFareMad * rate)} {currSymbol}
              </button>
            )}

            {jobStage === 'completed' && (
              <div className="w-full bg-slate-950 border border-emerald-500 p-4 rounded-xl text-center flex flex-col gap-2">
                <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
                <h5 className="font-bold text-white">Trip Finished · Fare Received</h5>
                <p className="text-xs text-slate-400">Commission deducted: only 6% (~{Math.round(activeJob.offeredFareMad * 0.06 * rate)} {currSymbol})</p>
                <button
                  onClick={() => setActiveJob(null)}
                  className="py-2 px-4 bg-amber-500 text-slate-950 font-bold rounded-lg text-xs"
                >
                  Return to Radar Feed
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Live Passenger Requests Radar Feed */}
      <div className="bg-slate-900/90 backdrop-blur-xl border border-slate-800 rounded-2xl p-5 shadow-2xl flex flex-col gap-4">
        
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-ping" />
            <h3 className="text-base font-bold text-white">
              {t.incomingPassengerRequests}
            </h3>
          </div>
          <span className="text-xs text-slate-400">
            {requests.length} open requests nearby
          </span>
        </div>

        {!isOnline ? (
          <div className="py-12 text-center text-slate-400 text-xs">
            You are currently offline. Turn your shift ON to start receiving ride bids in {city.name.split('(')[0]}.
          </div>
        ) : requests.length === 0 ? (
          <div className="py-12 text-center text-slate-400 text-xs">
            Scanning for new passenger requests... All nearby requests cleared!
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {requests.map(req => {
              const convertedFare = Math.round(req.offeredFareMad * rate);
              return (
                <div
                  key={req.id}
                  className="bg-slate-950 border border-slate-800 hover:border-slate-700 rounded-xl p-4 flex flex-col justify-between gap-3 shadow-md"
                >
                  <div>
                    {/* Header with Passenger & Fare */}
                    <div className="flex items-start justify-between gap-2 border-b border-slate-800/80 pb-2 mb-2">
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="font-bold text-sm text-white">{req.passengerName}</span>
                          <span className="text-[10px] text-amber-400 font-semibold bg-amber-400/10 px-1 py-0.5 rounded">
                            ★ {req.passengerRating}
                          </span>
                        </div>
                        <span className="text-[11px] text-slate-400">{req.category} · {req.passengers} pax</span>
                      </div>

                      <div className="text-right">
                        <span className="text-lg font-black text-amber-400">
                          {convertedFare} {currSymbol}
                        </span>
                        <span className="text-[10px] text-slate-400 block">{req.timeAgo}</span>
                      </div>
                    </div>

                    {/* Route */}
                    <div className="flex flex-col gap-1.5 text-xs text-slate-300">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-blue-500 shrink-0" />
                        <span className="truncate">{req.pickup}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-rose-500 shrink-0" />
                        <span className="truncate">{req.destination}</span>
                      </div>
                    </div>

                    {req.notes && (
                      <p className="text-[11px] text-slate-400 italic mt-2 bg-slate-900/60 p-1.5 rounded">
                        "{req.notes}"
                      </p>
                    )}
                  </div>

                  {/* Driver actions */}
                  <div className="flex flex-col gap-2 pt-1 border-t border-slate-800">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleAcceptJob(req, req.offeredFareMad)}
                        className="flex-1 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs rounded-lg transition-colors flex items-center justify-center gap-1"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Accept ({convertedFare} {currSymbol})</span>
                      </button>

                      <button
                        onClick={() => {
                          if (counterOpenJobId === req.id) {
                            setCounterOpenJobId(null);
                          } else {
                            setCounterOpenJobId(req.id);
                            setDriverCounterFare(convertedFare + (currency === 'MAD' ? 10 : 2));
                          }
                        }}
                        className="py-2 px-3 bg-slate-800 hover:bg-slate-700 text-amber-400 font-bold text-xs rounded-lg transition-colors"
                      >
                        Counter
                      </button>

                      <button
                        onClick={() => handleDeclineJob(req.id)}
                        className="p-2 text-slate-500 hover:text-slate-300 text-xs"
                        title="Decline"
                      >
                        ✕
                      </button>
                    </div>

                    {/* Counter offer input */}
                    {counterOpenJobId === req.id && (
                      <div className="bg-slate-900 p-2 rounded-lg flex items-center justify-between gap-2 border border-slate-700 animate-fadeIn">
                        <span className="text-[11px] text-slate-300">Your Bid:</span>
                        <div className="flex items-center gap-1">
                          <input
                            type="number"
                            value={driverCounterFare}
                            onChange={(e) => setDriverCounterFare(parseInt(e.target.value) || 0)}
                            className="w-16 bg-slate-950 border border-slate-700 text-white text-xs font-bold px-2 py-1 rounded text-center"
                          />
                          <span className="text-xs text-slate-400">{currSymbol}</span>
                        </div>
                        <button
                          onClick={() => {
                            const madEquivalent = driverCounterFare / rate;
                            handleAcceptJob(req, madEquivalent);
                          }}
                          className="py-1 px-2.5 bg-amber-500 text-slate-950 text-xs font-bold rounded hover:bg-amber-400"
                        >
                          Send Bid
                        </button>
                      </div>
                    )}
                  </div>

                </div>
              );
            })}
          </div>
        )}

      </div>

    </div>
  );
};
