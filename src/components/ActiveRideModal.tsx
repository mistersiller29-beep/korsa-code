import React, { useState, useEffect } from 'react';
import { Driver, LocationPoint, RideStatus, Language, Currency, ChatMessage } from '../types';
import { translations } from '../data/translations';
import { CURRENCY_SYMBOLS } from '../data/cities';
import { soundManager } from '../utils/audio';
import {
  Phone,
  MessageSquare,
  ShieldAlert,
  CheckCircle,
  Star,
  Send,
  X,
  Clock,
  MapPin,
  Car,
  Receipt,
  Download
} from 'lucide-react';

interface ActiveRideModalProps {
  driver: Driver;
  pickup: LocationPoint;
  destination: LocationPoint;
  agreedFare: number;
  currency: Currency;
  lang: Language;
  rideStatus: RideStatus;
  pinCode: string;
  onUpdateStatus: (status: RideStatus) => void;
  onClose: () => void;
  driverProgressPercent: number;
}

export const ActiveRideModal: React.FC<ActiveRideModalProps> = ({
  driver,
  pickup,
  destination,
  agreedFare,
  currency,
  lang,
  rideStatus,
  pinCode,
  onUpdateStatus,
  onClose,
  driverProgressPercent,
}) => {
  const t = translations[lang];
  const currSymbol = CURRENCY_SYMBOLS[currency] || 'د.م';

  // In-app chat state
  const [chatOpen, setChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: 'm1',
      sender: 'driver',
      text: lang === 'ar' ? 'السلام عليكم، أنا جاي لعندك دابا دقيقة ونوصل.' : lang === 'fr' ? 'Salam ! Je suis en route, j\'arrive dans quelques minutes.' : 'Salam! I am on my way to your pickup location.',
      timestamp: 'Just now'
    }
  ]);
  const [messageInput, setMessageInput] = useState('');

  // Call simulation state
  const [callingDriver, setCallingDriver] = useState(false);

  // SOS Alert state
  const [sosActive, setSosActive] = useState(false);

  // Completion review state
  const [rating, setRating] = useState(5);
  const [selectedBadges, setSelectedBadges] = useState<string[]>(['Smooth Driving', 'Polite & Respectful']);
  const [tipAmount, setTipAmount] = useState<number>(0);

  // Handle sending chat message
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageInput.trim()) return;

    const userMsg: ChatMessage = {
      id: `usr_${Date.now()}`,
      sender: 'passenger',
      text: messageInput.trim(),
      timestamp: 'Just now'
    };
    setChatMessages(prev => [...prev, userMsg]);
    setMessageInput('');

    // Driver auto reply
    setTimeout(() => {
      soundManager.playBidReceived();
      setChatMessages(prev => [
        ...prev,
        {
          id: `drv_${Date.now()}`,
          sender: 'driver',
          text: lang === 'ar' ? 'واخا مرحبا، شفتك!' : lang === 'fr' ? 'Parfait, bien reçu !' : 'Got it, see you right there!',
          timestamp: 'Just now'
        }
      ]);
    }, 1200);
  };

  const handleToggleBadge = (badge: string) => {
    setSelectedBadges(prev =>
      prev.includes(badge) ? prev.filter(b => b !== badge) : [...prev, badge]
    );
  };

  return (
    <div className="bg-slate-900/95 backdrop-blur-xl border border-slate-800 rounded-2xl p-5 shadow-2xl flex flex-col gap-5 text-slate-100">
      
      {/* Header with Status Indicator */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2.5">
          <div className="w-3 h-3 rounded-full bg-amber-400 animate-pulse" />
          <div>
            <h3 className="text-base font-bold text-white">
              {rideStatus === 'driver_approaching' && t.driverArriving}
              {rideStatus === 'driver_arrived' && t.driverArrived}
              {rideStatus === 'in_progress' && t.onTrip}
              {rideStatus === 'completed' && t.tripComplete}
            </h3>
            <span className="text-[11px] text-slate-400">
              Korsa Fare Locked: <strong className="text-amber-400">{agreedFare} {currSymbol}</strong>
            </span>
          </div>
        </div>

        {/* Safety PIN */}
        <div className="bg-slate-950 border border-amber-500/30 rounded-xl px-3 py-1.5 text-center">
          <span className="text-[9px] uppercase font-bold text-slate-400 tracking-wider block">PIN Code</span>
          <span className="text-lg font-mono font-black text-amber-400 tracking-widest">{pinCode}</span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-slate-950 rounded-full h-2 overflow-hidden border border-slate-800">
        <div
          className="bg-gradient-to-r from-amber-500 to-emerald-400 h-full transition-all duration-500 ease-out"
          style={{ width: `${driverProgressPercent}%` }}
        />
      </div>

      {/* Driver Card */}
      <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <img
            src={driver.avatar}
            alt={driver.name}
            referrerPolicy="no-referrer"
            className="w-14 h-14 rounded-full object-cover border-2 border-amber-400"
          />
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-base text-white">{driver.name}</span>
              <span className="text-xs text-amber-400 font-semibold bg-amber-400/10 px-1.5 py-0.5 rounded">
                ★ {driver.rating}
              </span>
            </div>
            <p className="text-xs text-slate-300 font-medium">
              {driver.vehicleModel}
            </p>
            <p className="text-[11px] text-slate-400 font-mono">
              Plate: <strong className="text-white">{driver.plateNumber}</strong> · Lic: {driver.licenseNumber}
            </p>
          </div>
        </div>

        {/* Direct Contact Actions */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setChatOpen(!chatOpen)}
            className="p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 hover:text-white transition-colors relative"
            title="Chat with Driver"
          >
            <MessageSquare className="w-4 h-4 text-amber-400" />
            <span className="w-2 h-2 rounded-full bg-amber-400 absolute top-1.5 right-1.5" />
          </button>

          <button
            onClick={() => {
              setCallingDriver(true);
              setTimeout(() => setCallingDriver(false), 3000);
            }}
            className="p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 hover:text-white transition-colors"
            title="Call Driver"
          >
            <Phone className="w-4 h-4 text-emerald-400" />
          </button>
        </div>
      </div>

      {/* Calling Driver Toast */}
      {callingDriver && (
        <div className="bg-emerald-950/80 border border-emerald-500/50 rounded-xl p-3 text-xs text-emerald-200 flex items-center justify-between animate-fadeIn">
          <div className="flex items-center gap-2">
            <Phone className="w-4 h-4 text-emerald-400 animate-bounce" />
            <span>Connecting call to {driver.name} ({driver.phone})...</span>
          </div>
          <button onClick={() => setCallingDriver(false)} className="text-emerald-400 font-bold text-xs">
            End
          </button>
        </div>
      )}

      {/* In-App Direct Chat Drawer */}
      {chatOpen && (
        <div className="bg-slate-950 border border-slate-800 rounded-xl p-3 flex flex-col gap-2.5">
          <div className="flex items-center justify-between border-b border-slate-800 pb-1.5 text-xs font-semibold text-slate-300">
            <span>Direct Chat with {driver.name}</span>
            <button onClick={() => setChatOpen(false)} className="text-slate-400 hover:text-white">✕</button>
          </div>

          <div className="max-h-40 overflow-y-auto flex flex-col gap-2 pr-1">
            {chatMessages.map(msg => (
              <div
                key={msg.id}
                className={`max-w-[80%] rounded-xl px-3 py-1.5 text-xs ${
                  msg.sender === 'passenger'
                    ? 'ml-auto bg-amber-500 text-slate-950 font-medium'
                    : 'mr-auto bg-slate-900 text-slate-200 border border-slate-800'
                }`}
              >
                {msg.text}
              </div>
            ))}
          </div>

          <form onSubmit={handleSendMessage} className="flex items-center gap-2 pt-1 border-t border-slate-800">
            <input
              type="text"
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
              placeholder={lang === 'ar' ? 'كتب ميساج للشيفور...' : 'Type a quick note...'}
              className="flex-1 bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-amber-400"
            />
            <button
              type="submit"
              className="p-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 rounded-lg font-bold"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      )}

      {/* Route Summary */}
      <div className="flex flex-col gap-2 text-xs text-slate-300 bg-slate-950/60 p-3 rounded-xl border border-slate-800/80">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-blue-500 shrink-0" />
          <span className="text-slate-400 font-medium">Pickup:</span>
          <span className="text-white font-semibold truncate">{pickup.name}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-rose-500 shrink-0" />
          <span className="text-slate-400 font-medium">Destination:</span>
          <span className="text-white font-semibold truncate">{destination.name}</span>
        </div>
      </div>

      {/* Safety SOS and Status Simulator Controls */}
      <div className="flex items-center justify-between gap-3 pt-1">
        <button
          onClick={() => setSosActive(!sosActive)}
          className={`py-2 px-3 rounded-xl border text-xs font-bold flex items-center gap-1.5 transition-colors ${
            sosActive
              ? 'bg-rose-500 text-white border-rose-400'
              : 'bg-slate-950 border-slate-800 text-rose-400 hover:bg-rose-500/10'
          }`}
        >
          <ShieldAlert className="w-4 h-4" />
          <span>{sosActive ? 'SOS Active (Police 19 Alerted)' : t.sosAlert}</span>
        </button>

        {/* Ride Stage Progress Simulation Controls for instant demonstration */}
        <div className="flex items-center gap-1.5">
          {rideStatus === 'driver_approaching' && (
            <button
              onClick={() => onUpdateStatus('driver_arrived')}
              className="py-1.5 px-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-lg shadow-sm"
            >
              Simulate: Driver Arrived
            </button>
          )}

          {rideStatus === 'driver_arrived' && (
            <button
              onClick={() => onUpdateStatus('in_progress')}
              className="py-1.5 px-3 bg-blue-500 hover:bg-blue-400 text-white font-bold text-xs rounded-lg shadow-sm"
            >
              Simulate: Start Trip
            </button>
          )}

          {rideStatus === 'in_progress' && (
            <button
              onClick={() => onUpdateStatus('completed')}
              className="py-1.5 px-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs rounded-lg shadow-sm"
            >
              Simulate: Arrived & Complete
            </button>
          )}
        </div>
      </div>

      {/* Ride Completion & Rating Modal */}
      {rideStatus === 'completed' && (
        <div className="bg-slate-950 border border-emerald-500/40 rounded-xl p-5 flex flex-col gap-4 animate-fadeIn">
          <div className="text-center">
            <div className="w-12 h-12 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto mb-2">
              <CheckCircle className="w-6 h-6" />
            </div>
            <h4 className="text-lg font-extrabold text-white">Trip Finished · Hamdullah</h4>
            <p className="text-xs text-slate-400">
              Total fare to pay in cash or digital: <strong className="text-amber-400 text-sm">{agreedFare + tipAmount} {currSymbol}</strong>
            </p>
          </div>

          {/* Star Rating */}
          <div className="flex justify-center gap-2">
            {[1, 2, 3, 4, 5].map(s => (
              <button
                key={s}
                onClick={() => setRating(s)}
                className="text-2xl text-amber-400 hover:scale-125 transition-transform"
              >
                ★
              </button>
            ))}
          </div>

          {/* Moroccan Hospitality Badges */}
          <div className="flex flex-wrap justify-center gap-2 text-xs">
            {['Khaddoum (Helpful)', 'Safe Chifor', 'Clean Taxi', 'Great Conversation', 'Fair & Respectful'].map(b => (
              <button
                key={b}
                onClick={() => handleToggleBadge(b)}
                className={`px-2.5 py-1 rounded-full border transition-colors ${
                  selectedBadges.includes(b)
                    ? 'bg-amber-400 text-slate-950 font-semibold border-amber-400'
                    : 'bg-slate-900 text-slate-300 border-slate-700'
                }`}
              >
                {b}
              </button>
            ))}
          </div>

          {/* Optional Tip */}
          <div className="flex items-center justify-center gap-2 pt-1">
            <span className="text-xs text-slate-400">Add Chifor Tip:</span>
            {[0, 5, 10, 20].map(amt => (
              <button
                key={amt}
                onClick={() => setTipAmount(amt)}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold ${
                  tipAmount === amt ? 'bg-amber-500 text-slate-950' : 'bg-slate-800 text-slate-300'
                }`}
              >
                +{amt} {currSymbol}
              </button>
            ))}
          </div>

          <button
            onClick={onClose}
            className="w-full py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm rounded-xl transition-colors"
          >
            Submit Feedback & Finish
          </button>
        </div>
      )}

    </div>
  );
};
