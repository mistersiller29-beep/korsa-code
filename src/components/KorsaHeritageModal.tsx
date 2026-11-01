import React from 'react';
import { Language } from '../types';
import { translations } from '../data/translations';
import { Sparkles, Car, ShieldCheck, HeartHandshake, MapPin } from 'lucide-react';

interface KorsaHeritageModalProps {
  lang: Language;
  onClose: () => void;
}

export const KorsaHeritageModal: React.FC<KorsaHeritageModalProps> = ({
  lang,
  onClose,
}) => {
  const t = translations[lang];

  const cityColors = [
    { city: 'Casablanca & Fez', color: '#dc2626', name: 'Rouge Casablanca', desc: 'Vibrant scarlet red taxis cruising the Atlantic boulevards and ancient medinas.' },
    { city: 'Marrakech', color: '#ca8a04', name: 'Ocre Jaune', desc: 'Warm sand ochre matching the red clay ramparts and palm groves.' },
    { city: 'Rabat', color: '#2563eb', name: 'Bleu Cobalt', desc: 'Deep royal blue honoring the capital and the Bouregreg river estuary.' },
    { city: 'Tangier', color: '#06b6d4', name: 'Cyan Méditerranéen', desc: 'Turquoise and white mirroring the Strait of Gibraltar where ocean meets sea.' },
    { city: 'Chefchaouen', color: '#1d4ed8', name: 'Bleu Majorelle', desc: 'Indigo blue blending seamlessly with the blue walls of the Rif mountains.' },
    { city: 'Agadir', color: '#ea580c', name: 'Orange Souss', desc: 'Sunny citrus orange of the Atlantic bay and argan valleys.' },
  ];

  return (
    <div className="bg-slate-900/95 backdrop-blur-xl border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-2xl flex flex-col gap-8 text-slate-100 max-w-4xl mx-auto">
      
      {/* Header */}
      <div className="border-b border-slate-800 pb-5">
        <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider mb-1">
          <Sparkles className="w-4 h-4" />
          <span>Moroccan Cultural Soul & Global Fair Mobility</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          The Story of Korsa (الكورسة)
        </h2>
        <p className="text-sm text-slate-400 mt-2 max-w-2xl leading-relaxed">
          {t.culturalLoreDesc}
        </p>
      </div>

      {/* Hero Cultural Feature Block */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
        <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-5 flex flex-col justify-between gap-4">
          <div>
            <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block mb-1">
              "Rabha b-Rida" (الربحة بالرضا)
            </span>
            <h3 className="text-lg font-bold text-white mb-2">
              Fair Negotiation Over Corporate Algorithms
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              In Moroccan taxi culture, you do not enter a taxi in silence wondering what a hidden algorithm will bill you. You lean into the window, greet the Chifor with respect, state your destination, and agree on the fare upfront.
            </p>
            <p className="text-xs text-slate-400 mt-2 leading-relaxed">
              Korsa took this timeless, human philosophy and turned it into a modern global platform: <strong>the passenger names their price</strong>, nearby licensed taxi drivers respond directly, and both parties leave satisfied.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs text-emerald-400 font-semibold bg-emerald-500/10 p-2.5 rounded-lg border border-emerald-500/20">
            <ShieldCheck className="w-4 h-4 shrink-0" />
            <span>Drivers keep 94% of their fare. Zero 30% Silicon Valley commissions.</span>
          </div>
        </div>

        {/* Grand Taxi & Blassa System */}
        <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-5 flex flex-col justify-between gap-4">
          <div>
            <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block mb-1">
              The Grand Taxi Legacy: Blassa vs Kamla
            </span>
            <h3 className="text-lg font-bold text-white mb-2">
              Pioneers of Ride-Sharing Long Before Tech Apps
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Decades before ridesharing apps existed, Morocco invented the <strong>"Blassa"</strong> system. Legendary Mercedes 240D saloons and modern Dacia Lodgy taxis would line up at city departure hubs. You could buy a single seat ("Blassa") for pennies to travel 100 km, or book the whole car ("Korsa Kamla") for your family.
            </p>
            <p className="text-xs text-slate-400 mt-2 leading-relaxed">
              Korsa brings this exact dual option to taxis worldwide: travel privately, or share a ride route and divide costs respectfully.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs text-amber-400 font-semibold bg-amber-500/10 p-2.5 rounded-lg border border-amber-500/20">
            <HeartHandshake className="w-4 h-4 shrink-0" />
            <span>Human-to-human dignity in mobility across 50+ global cities.</span>
          </div>
        </div>
      </div>

      {/* Visual Guide: Moroccan Petit Taxi Palette */}
      <div className="flex flex-col gap-4">
        <div>
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Car className="w-4 h-4 text-amber-400" />
            <span>The Iconic Colors of Moroccan Petit Taxis</span>
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Every Moroccan city has an official municipal taxi hue established by royal and civil decree.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {cityColors.map((item, idx) => (
            <div
              key={idx}
              className="bg-slate-950 border border-slate-800 rounded-xl p-3.5 flex items-start gap-3"
            >
              <div
                className="w-8 h-8 rounded-lg shrink-0 border border-white/20 shadow-sm"
                style={{ backgroundColor: item.color }}
              />
              <div>
                <span className="font-bold text-xs text-white block">{item.city}</span>
                <span className="text-[10px] text-amber-400 font-medium block">{item.name}</span>
                <p className="text-[11px] text-slate-400 leading-tight mt-0.5">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Close button */}
      <div className="flex justify-end pt-2 border-t border-slate-800">
        <button
          onClick={onClose}
          className="px-6 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl transition-colors"
        >
          Close & Book a Korsa
        </button>
      </div>

    </div>
  );
};
