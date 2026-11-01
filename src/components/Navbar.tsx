import React from 'react';
import { Language, Currency } from '../types';
import { Volume2, VolumeX, Globe } from 'lucide-react';
import { soundManager } from '../utils/audio';

interface NavbarProps {
  currentTab: 'passenger' | 'driver' | 'heritage' | 'compare';
  onSelectTab: (tab: 'passenger' | 'driver' | 'heritage' | 'compare') => void;
  lang: Language;
  onSelectLang: (lang: Language) => void;
  currency: Currency;
  onSelectCurrency: (currency: Currency) => void;
  soundOn: boolean;
  onToggleSound: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  onSelectTab,
  lang,
  onSelectLang,
  currency,
  onSelectCurrency,
  soundOn,
  onToggleSound,
}) => {
  return (
    <header className="sticky top-0 z-50 bg-slate-950/90 backdrop-blur-md border-b border-slate-800/80 px-4 sm:px-8 py-3.5">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 md:gap-8">
        
        {/* Zone 1: Single text wordmark */}
        <button
          onClick={() => onSelectTab('passenger')}
          className="flex items-center gap-2.5 text-left text-xl font-extrabold tracking-tight text-white whitespace-nowrap shrink-0 group focus:outline-none"
        >
          <span className="w-8 h-8 rounded-lg bg-amber-500 text-slate-950 flex items-center justify-center font-black text-lg shadow-sm group-hover:bg-amber-400 transition-colors">
            K
          </span>
          <span className="flex items-baseline gap-1.5">
            <span className="text-white text-lg font-bold">Korsa</span>
            <span className="text-amber-400 text-sm font-semibold opacity-90 font-serif">الكورسة</span>
          </span>
        </button>

        {/* Zone 2: 4-5 clean single-line nav links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-300">
          <button
            onClick={() => onSelectTab('passenger')}
            className={`whitespace-nowrap shrink-0 transition-colors hover:text-white pb-0.5 ${
              currentTab === 'passenger'
                ? 'text-amber-400 border-b-2 border-amber-400 font-semibold'
                : 'text-slate-300'
            }`}
          >
            {lang === 'ar' ? 'طلب طاكسي (راكب)' : lang === 'fr' ? 'Passager (Rakkab)' : 'Ride (Rakkab)'}
          </button>

          <button
            onClick={() => onSelectTab('driver')}
            className={`whitespace-nowrap shrink-0 transition-colors hover:text-white pb-0.5 ${
              currentTab === 'driver'
                ? 'text-amber-400 border-b-2 border-amber-400 font-semibold'
                : 'text-slate-300'
            }`}
          >
            {lang === 'ar' ? 'رادار الشوافرية' : lang === 'fr' ? 'Chauffeurs (Radar)' : 'Driver Cockpit (Chifor)'}
          </button>

          <button
            onClick={() => onSelectTab('compare')}
            className={`whitespace-nowrap shrink-0 transition-colors hover:text-white pb-0.5 ${
              currentTab === 'compare'
                ? 'text-amber-400 border-b-2 border-amber-400 font-semibold'
                : 'text-slate-300'
            }`}
          >
            {lang === 'ar' ? 'مقارنة الأثمنة' : lang === 'fr' ? 'Tarifs & Économies' : 'Fair Fare Model'}
          </button>

          <button
            onClick={() => onSelectTab('heritage')}
            className={`whitespace-nowrap shrink-0 transition-colors hover:text-white pb-0.5 ${
              currentTab === 'heritage'
                ? 'text-amber-400 border-b-2 border-amber-400 font-semibold'
                : 'text-slate-300'
            }`}
          >
            {lang === 'ar' ? 'تراث الطاكسي المغربي' : lang === 'fr' ? 'Héritage Korsa' : 'Moroccan Heritage'}
          </button>
        </nav>

        {/* Zone 3: 1 primary action & compact utility controls */}
        <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
          
          {/* Sound Toggle */}
          <button
            onClick={() => {
              onToggleSound();
              if (!soundOn) soundManager.playTaxiHorn();
            }}
            title={soundOn ? 'Mute audio' : 'Enable audio cues'}
            aria-label="Toggle audio cues"
            className="p-1.5 sm:p-2 text-slate-400 hover:text-slate-200 bg-slate-900 border border-slate-800 rounded-lg transition-colors focus:outline-none"
          >
            {soundOn ? <Volume2 className="w-4 h-4 text-amber-400" /> : <VolumeX className="w-4 h-4" />}
          </button>

          {/* Currency Switcher */}
          <div className="relative">
            <select
              value={currency}
              onChange={(e) => onSelectCurrency(e.target.value as Currency)}
              aria-label="Select currency"
              className="appearance-none bg-slate-900 border border-slate-800 text-slate-200 text-xs font-semibold py-1.5 pl-2.5 pr-6 rounded-lg hover:border-slate-700 cursor-pointer focus:outline-none focus:border-amber-500"
            >
              <option value="MAD">MAD (د.م)</option>
              <option value="USD">USD ($)</option>
              <option value="EUR">EUR (€)</option>
              <option value="AED">AED (د.إ)</option>
              <option value="GBP">GBP (£)</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-1.5 flex items-center px-1 text-slate-400 text-xs">
              ▾
            </div>
          </div>

          {/* Language Switcher */}
          <div className="relative">
            <div className="flex items-center gap-1 bg-slate-900 border border-slate-800 rounded-lg px-2 py-1.5">
              <Globe className="w-3.5 h-3.5 text-slate-400" />
              <select
                value={lang}
                onChange={(e) => onSelectLang(e.target.value as Language)}
                aria-label="Select language"
                className="bg-transparent text-slate-200 text-xs font-semibold cursor-pointer focus:outline-none pr-1"
              >
                <option value="en" className="bg-slate-900 text-slate-200">EN</option>
                <option value="fr" className="bg-slate-900 text-slate-200">FR</option>
                <option value="ar" className="bg-slate-900 text-slate-200">العربية</option>
              </select>
            </div>
          </div>

          {/* Primary Action Button */}
          {currentTab !== 'driver' ? (
            <button
              onClick={() => onSelectTab('driver')}
              className="px-3.5 py-1.5 text-xs font-semibold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors whitespace-nowrap shrink-0 shadow-sm"
            >
              {lang === 'ar' ? 'وضعية الشيفور' : lang === 'fr' ? 'Mode Chauffeur' : 'Driver Radar'}
            </button>
          ) : (
            <button
              onClick={() => onSelectTab('passenger')}
              className="px-3.5 py-1.5 text-xs font-semibold text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg transition-colors whitespace-nowrap shrink-0"
            >
              {lang === 'ar' ? 'طلب كورسة' : lang === 'fr' ? 'Mode Passager' : 'Book a Korsa'}
            </button>
          )}

        </div>
      </div>
    </header>
  );
};
