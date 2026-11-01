/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { InteractiveMap } from './components/InteractiveMap';
import { PassengerFlow } from './components/PassengerFlow';
import { ActiveRideModal } from './components/ActiveRideModal';
import { DriverFlow } from './components/DriverFlow';
import { KorsaHeritageModal } from './components/KorsaHeritageModal';
import { FareComparisonSection } from './components/FareComparisonSection';
import { CITIES_DATA } from './data/cities';
import { CityPreset, LocationPoint, DriverBid, RideStatus, Driver, Language, Currency } from './types';
import { translations } from './data/translations';
import { soundManager } from './utils/audio';
import {
  ShieldCheck,
  Zap,
  Sparkles,
  ArrowRight,
  Car,
  Compass,
  CheckCircle2,
  Users
} from 'lucide-react';

const HERO_IMAGE = "/src/assets/images/korsa_hero_taxi_1793545223368.jpg";
const APP_EXPERIENCE_IMAGE = "/src/assets/images/korsa_app_experience_1793545223624.jpg";

export default function App() {
  const [lang, setLang] = useState<Language>('en');
  const [currency, setCurrency] = useState<Currency>('MAD');
  const [soundOn, setSoundOn] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<'passenger' | 'driver' | 'heritage' | 'compare'>('passenger');

  // Selected city
  const [currentCity, setCurrentCity] = useState<CityPreset>(CITIES_DATA[0]); // Casablanca default

  // Locations
  const [pickup, setPickup] = useState<LocationPoint | null>(CITIES_DATA[0].popularLocations[0]);
  const [destination, setDestination] = useState<LocationPoint | null>(CITIES_DATA[0].popularLocations[1]);

  // Active Ride tracking state
  const [rideStatus, setRideStatus] = useState<RideStatus>('idle');
  const [activeDriver, setActiveDriver] = useState<Driver | null>(null);
  const [agreedFare, setAgreedFare] = useState<number>(30);
  const [pinCode, setPinCode] = useState<string>('8241');
  const [driverProgressPercent, setDriverProgressPercent] = useState<number>(0);

  const t = translations[lang];

  // Set RTL or LTR document direction according to selected language
  useEffect(() => {
    if (lang === 'ar') {
      document.documentElement.dir = 'rtl';
      document.documentElement.lang = 'ar';
    } else {
      document.documentElement.dir = 'ltr';
      document.documentElement.lang = lang;
    }
  }, [lang]);

  // Handle passenger accepting a bid
  const handleRideAccepted = (bid: DriverBid, p: LocationPoint, d: LocationPoint, fare: number) => {
    setActiveDriver(bid.driver);
    setPickup(p);
    setDestination(d);
    setAgreedFare(fare);
    setPinCode(Math.floor(1000 + Math.random() * 9000).toString());
    setRideStatus('driver_approaching');
    setDriverProgressPercent(15);
  };

  // Simulate taxi progress when ride is active
  useEffect(() => {
    if (rideStatus === 'driver_approaching') {
      const interval = setInterval(() => {
        setDriverProgressPercent(prev => {
          if (prev >= 90) {
            clearInterval(interval);
            setRideStatus('driver_arrived');
            soundManager.playTaxiHorn();
            return 100;
          }
          return prev + 12;
        });
      }, 1500);
      return () => clearInterval(interval);
    } else if (rideStatus === 'in_progress') {
      const interval = setInterval(() => {
        setDriverProgressPercent(prev => {
          if (prev >= 95) {
            clearInterval(interval);
            setRideStatus('completed');
            soundManager.playRideAccepted();
            return 100;
          }
          return prev + 10;
        });
      }, 1800);
      return () => clearInterval(interval);
    }
  }, [rideStatus]);

  const handleCloseActiveRide = () => {
    setRideStatus('idle');
    setActiveDriver(null);
    setDriverProgressPercent(0);
  };

  return (
    <div className="min-h-screen bg-[#070b12] text-slate-100 flex flex-col font-sans selection:bg-amber-500 selection:text-slate-950">
      
      {/* Top Bar Navigation adhering to Section 2 Top Bar Contract */}
      <Navbar
        currentTab={activeTab}
        onSelectTab={setActiveTab}
        lang={lang}
        onSelectLang={setLang}
        currency={currency}
        onSelectCurrency={setCurrency}
        soundOn={soundOn}
        onToggleSound={() => {
          const next = !soundOn;
          setSoundOn(next);
          soundManager.enabled = next;
        }}
      />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col gap-8">
        
        {/* Hero Section Banner with Authentic Generated Imagery & Moroccan Heritage */}
        <div className="relative rounded-3xl overflow-hidden border border-slate-800 shadow-2xl bg-slate-950">
          
          {/* Background Hero Photography */}
          <div className="absolute inset-0 z-0">
            <img
              src={HERO_IMAGE}
              alt="Iconic Moroccan Petit Taxi red car and grand taxi on sunny avenue"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center brightness-[0.42] scale-105 transform hover:scale-100 transition-transform duration-1000"
            />
            {/* Scrim Overlay ensuring at least 4.5:1 text contrast */}
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/85 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-black/30" />
          </div>

          {/* Hero Content */}
          <div className="relative z-10 px-6 sm:px-12 py-10 sm:py-14 max-w-3xl flex flex-col gap-4">
            
            {/* Quiet text kicker adhering to Section 1.A */}
            <div className="flex items-center gap-2 text-xs font-semibold text-amber-400">
              <span className="w-2 h-2 rounded-full bg-amber-400" />
              <span>Moroccan Heritage · Worldwide Taxi Network</span>
              <span aria-hidden="true">·</span>
              <span>Casablanca, Marrakech, Paris, NYC, Dubai</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-[1.15] text-balance">
              {t.tagline}
            </h1>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl">
              {t.subtagline}
            </p>

            {/* Quick Hero Call-to-Actions */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => setActiveTab('passenger')}
                className={`px-5 py-2.5 text-xs font-bold rounded-xl transition-all shadow-md flex items-center gap-2 ${
                  activeTab === 'passenger'
                    ? 'bg-amber-400 text-slate-950 hover:bg-amber-300'
                    : 'bg-slate-900/90 text-white hover:bg-slate-800 border border-slate-700'
                }`}
              >
                <Car className="w-4 h-4 text-slate-950" />
                <span>{t.passengerMode}</span>
              </button>

              <button
                onClick={() => setActiveTab('driver')}
                className={`px-5 py-2.5 text-xs font-bold rounded-xl transition-all shadow-md flex items-center gap-2 ${
                  activeTab === 'driver'
                    ? 'bg-amber-400 text-slate-950 hover:bg-amber-300'
                    : 'bg-slate-900/90 text-white hover:bg-slate-800 border border-slate-700'
                }`}
              >
                <Zap className="w-4 h-4 text-amber-400" />
                <span>{t.driverMode}</span>
              </button>

              <button
                onClick={() => setActiveTab('heritage')}
                className="px-4 py-2.5 text-xs font-semibold text-slate-300 hover:text-white bg-slate-950/60 hover:bg-slate-900 border border-slate-800 rounded-xl transition-colors"
              >
                {t.moroccanHeritage}
              </button>
            </div>

            {/* Micro proof points */}
            <div className="flex items-center gap-4 pt-3 text-xs text-slate-400 border-t border-slate-800/60">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>100% Licensed Cabs</span>
              </div>
              <span aria-hidden="true">·</span>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Zero Corporate Surge</span>
              </div>
              <span aria-hidden="true">·</span>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Drivers Keep 94%</span>
              </div>
            </div>

          </div>
        </div>

        {/* Content Tabs Navigation */}
        {activeTab === 'passenger' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            
            {/* Left Column: Passenger Booking Form or Active Ride Modal */}
            <div className="lg:col-span-5 flex flex-col gap-6">
              {rideStatus === 'idle' || rideStatus === 'searching' ? (
                <PassengerFlow
                  city={currentCity}
                  allCities={CITIES_DATA}
                  onSelectCity={setCurrentCity}
                  pickup={pickup}
                  destination={destination}
                  onSetPickup={setPickup}
                  onSetDestination={setDestination}
                  currency={currency}
                  lang={lang}
                  onRideAccepted={handleRideAccepted}
                />
              ) : activeDriver && pickup && destination ? (
                <ActiveRideModal
                  driver={activeDriver}
                  pickup={pickup}
                  destination={destination}
                  agreedFare={agreedFare}
                  currency={currency}
                  lang={lang}
                  rideStatus={rideStatus}
                  pinCode={pinCode}
                  onUpdateStatus={setRideStatus}
                  onClose={handleCloseActiveRide}
                  driverProgressPercent={driverProgressPercent}
                />
              ) : null}

              {/* Side story card showing app in action */}
              <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-4 flex items-center gap-4">
                <img
                  src={APP_EXPERIENCE_IMAGE}
                  alt="Korsa mobile fare bidding screen in action"
                  referrerPolicy="no-referrer"
                  className="w-20 h-20 rounded-xl object-cover border border-slate-700 shrink-0"
                />
                <div className="min-w-0">
                  <span className="text-[10px] uppercase font-bold text-amber-400 tracking-wider block">
                    Fair Bidding Freedom
                  </span>
                  <h4 className="text-xs font-bold text-white truncate">Direct Negotiation Protocol</h4>
                  <p className="text-[11px] text-slate-400 leading-tight mt-0.5 line-clamp-2">
                    Unlike standard algorithmic apps, you control the fare. No surge pricing, no sudden 3x rates in the rain.
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column: Interactive Map */}
            <div className="lg:col-span-7 flex flex-col gap-4">
              <InteractiveMap
                city={currentCity}
                pickup={pickup}
                destination={destination}
                onSelectMapLocation={(loc) => {
                  if (!pickup) setPickup(loc);
                  else setDestination(loc);
                }}
                rideStatus={rideStatus}
                activeDriver={activeDriver}
                driverProgressPercent={driverProgressPercent}
                className="h-[580px]"
              />

              {/* Bottom Quick Presets Strip */}
              <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-3 flex items-center justify-between gap-2 overflow-x-auto text-xs">
                <span className="text-slate-400 font-medium whitespace-nowrap">
                  {currentCity.name.split('(')[0]} Landmarks:
                </span>
                <div className="flex items-center gap-2">
                  {currentCity.popularLocations.slice(0, 3).map(loc => (
                    <button
                      key={loc.id}
                      onClick={() => setDestination(loc)}
                      className="px-2.5 py-1 bg-slate-950 hover:bg-slate-800 border border-slate-700 rounded-lg text-slate-300 hover:text-white whitespace-nowrap transition-colors"
                    >
                      {loc.name.split('(')[0]}
                    </button>
                  ))}
                </div>
              </div>
            </div>

          </div>
        )}

        {/* Driver Cockpit Mode */}
        {activeTab === 'driver' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            <div className="lg:col-span-7 flex flex-col gap-6">
              <DriverFlow
                city={currentCity}
                currency={currency}
                lang={lang}
              />
            </div>
            <div className="lg:col-span-5 flex flex-col gap-4">
              <InteractiveMap
                city={currentCity}
                pickup={pickup}
                destination={destination}
                rideStatus={rideStatus}
                activeDriver={activeDriver}
                driverProgressPercent={driverProgressPercent}
                className="h-[520px]"
              />
              <div className="bg-slate-900/60 border border-slate-800 p-4 rounded-xl text-xs text-slate-300 flex flex-col gap-1">
                <span className="font-bold text-white">Chifor Radar Active</span>
                <p className="text-[11px] text-slate-400">
                  Scanning for rides with zero lock-in. Pick jobs with fares that honor your fuel, maintenance, and time.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Moroccan Heritage Tab */}
        {activeTab === 'heritage' && (
          <KorsaHeritageModal
            lang={lang}
            onClose={() => setActiveTab('passenger')}
          />
        )}

        {/* Fare Comparison & Fair Model Tab */}
        {activeTab === 'compare' && (
          <FareComparisonSection
            currency={currency}
            lang={lang}
            onBookNow={() => setActiveTab('passenger')}
          />
        )}

      </main>

      {/* Quiet Footer adhering to Section 1.B */}
      <footer className="mt-16 border-t border-slate-900 bg-slate-950 py-8 px-6 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-200">Korsa (الكورسة)</span>
            <span aria-hidden="true">·</span>
            <span>Worldwide Fair Taxi Mobility</span>
            <span aria-hidden="true">·</span>
            <span>Casablanca · Marrakech · Rabat · Paris · London · New York · Dubai</span>
          </div>

          <div className="flex items-center gap-6">
            <button onClick={() => setActiveTab('heritage')} className="hover:text-slate-300 transition-colors">
              Taxi Heritage
            </button>
            <button onClick={() => setActiveTab('compare')} className="hover:text-slate-300 transition-colors">
              Fair Fare Model
            </button>
            <button onClick={() => setActiveTab('driver')} className="hover:text-slate-300 transition-colors">
              Chifor Portal
            </button>
          </div>
        </div>
      </footer>

    </div>
  );
}
