import React, { useState, useEffect } from 'react';
import { LocationPoint, CityPreset, RideStatus, Driver } from '../types';
import { MapPin, Navigation, Compass, Layers, ShieldCheck } from 'lucide-react';

interface InteractiveMapProps {
  city: CityPreset;
  pickup: LocationPoint | null;
  destination: LocationPoint | null;
  onSelectMapLocation?: (loc: LocationPoint) => void;
  rideStatus: RideStatus;
  activeDriver?: Driver | null;
  className?: string;
  driverProgressPercent?: number; // 0 to 100
}

interface SimulatedCab {
  id: string;
  x: number;
  y: number;
  angle: number;
  color: string;
  type: string;
  speed: number;
}

export const InteractiveMap: React.FC<InteractiveMapProps> = ({
  city,
  pickup,
  destination,
  onSelectMapLocation,
  rideStatus,
  activeDriver,
  className = '',
  driverProgressPercent = 0,
}) => {
  const [zoom, setZoom] = useState(1);
  const [cabs, setCabs] = useState<SimulatedCab[]>([]);

  // Initialize roaming taxis on the map
  useEffect(() => {
    const initialCabs: SimulatedCab[] = [
      { id: 'cab-1', x: 28, y: 35, angle: 45, color: city.petitTaxiColor, type: 'Petit Taxi', speed: 0.15 },
      { id: 'cab-2', x: 62, y: 55, angle: 120, color: city.petitTaxiColor, type: 'Petit Taxi', speed: 0.2 },
      { id: 'cab-3', x: 45, y: 70, angle: 280, color: '#ca8a04', type: 'Grand Taxi', speed: 0.12 },
      { id: 'cab-4', x: 80, y: 25, angle: 190, color: '#10b981', type: 'Eco Cab', speed: 0.18 },
      { id: 'cab-5', x: 18, y: 65, angle: 30, color: city.petitTaxiColor, type: 'Petit Taxi', speed: 0.14 },
    ];
    setCabs(initialCabs);

    const interval = setInterval(() => {
      setCabs(prev =>
        prev.map(c => {
          const rad = (c.angle * Math.PI) / 180;
          let nx = c.x + Math.cos(rad) * c.speed;
          let ny = c.y + Math.sin(rad) * c.speed;
          let nAngle = c.angle;

          // Gentle bounce off borders
          if (nx < 10 || nx > 90) {
            nAngle = 180 - nAngle + (Math.random() * 20 - 10);
            nx = Math.max(10, Math.min(90, nx));
          }
          if (ny < 10 || ny > 90) {
            nAngle = 360 - nAngle + (Math.random() * 20 - 10);
            ny = Math.max(10, Math.min(90, ny));
          }

          // Random slight turn
          if (Math.random() < 0.1) {
            nAngle += (Math.random() * 40 - 20);
          }

          return { ...c, x: nx, y: ny, angle: nAngle };
        })
      );
    }, 150);

    return () => clearInterval(interval);
  }, [city]);

  // Convert coords or preset items to SVG percentage positions
  const getPointPercent = (point: LocationPoint | null, defaultOffset: { x: number; y: number }) => {
    if (!point) return defaultOffset;
    // Map latitude and longitude offsets around city center
    const dLat = point.lat - city.center.lat;
    const dLng = point.lng - city.center.lng;

    // Approximate projection to 15-85% view box
    const x = Math.min(88, Math.max(12, 50 + dLng * 280));
    const y = Math.min(88, Math.max(12, 50 - dLat * 280));
    return { x, y };
  };

  const pickupPos = getPointPercent(pickup, { x: 35, y: 45 });
  const destPos = getPointPercent(destination, { x: 68, y: 35 });

  // Calculate position of active assigned driver
  // When approaching: from an initial spot to pickup
  // When in progress: from pickup to destination
  const getActiveDriverPos = () => {
    if (!activeDriver) return { x: 40, y: 50 };

    if (rideStatus === 'driver_approaching') {
      const start = { x: 20, y: 60 };
      const frac = driverProgressPercent / 100;
      return {
        x: start.x + (pickupPos.x - start.x) * frac,
        y: start.y + (pickupPos.y - start.y) * frac,
      };
    } else if (rideStatus === 'in_progress') {
      const frac = driverProgressPercent / 100;
      return {
        x: pickupPos.x + (destPos.x - pickupPos.x) * frac,
        y: pickupPos.y + (destPos.y - pickupPos.y) * frac,
      };
    }
    return pickupPos;
  };

  const driverPos = getActiveDriverPos();

  return (
    <div className={`relative w-full h-full min-h-[420px] rounded-2xl overflow-hidden bg-[#0d131f] border border-slate-800/80 shadow-2xl select-none ${className}`}>
      
      {/* SVG Canvas Map Background */}
      <svg
        className="w-full h-full absolute inset-0 cursor-crosshair transition-transform duration-300 ease-out"
        style={{ transform: `scale(${zoom})` }}
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <defs>
          {/* Subtle grid pattern for modern mobility map */}
          <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
            <path d="M 10 0 L 0 0 0 10" fill="none" stroke="rgba(255, 255, 255, 0.025)" strokeWidth="0.2" />
          </pattern>

          {/* Glowing route gradient */}
          <linearGradient id="routeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.9" />
            <stop offset="50%" stopColor="#ef4444" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#10b981" stopOpacity="1" />
          </linearGradient>

          {/* Pulse animation filter */}
          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="0.8" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Base dark city terrain */}
        <rect width="100" height="100" fill="#0b101b" />
        <rect width="100" height="100" fill="url(#grid)" />

        {/* Waterway / Coastal curve (reminiscent of Casablanca/Tangier oceanfront or river) */}
        <path
          d="M 0 0 Q 30 15, 60 8 T 100 0 L 100 18 Q 70 24, 30 20 T 0 28 Z"
          fill="#082f49"
          opacity="0.35"
        />

        {/* Urban Parks / Medina green zones */}
        <polygon points="18,30 28,28 32,38 22,42" fill="#064e3b" opacity="0.2" />
        <polygon points="68,60 82,58 85,72 72,75" fill="#064e3b" opacity="0.2" />

        {/* Major Thoroughfares / Boulevard network */}
        <g stroke="rgba(255,255,255,0.06)" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
          <line x1="0" y1="50" x2="100" y2="50" />
          <line x1="50" y1="0" x2="50" y2="100" />
          <line x1="15" y1="15" x2="85" y2="85" />
          <line x1="85" y1="15" x2="15" y2="85" />
          <path d="M 0 35 Q 50 45, 100 35" fill="none" />
          <path d="M 0 65 Q 50 55, 100 65" fill="none" />
        </g>

        {/* Secondary Avenues & Streets */}
        <g stroke="rgba(255,255,255,0.035)" strokeWidth="1.2">
          <line x1="0" y1="20" x2="100" y2="20" />
          <line x1="0" y1="80" x2="100" y2="80" />
          <line x1="20" y1="0" x2="20" y2="100" />
          <line x1="80" y1="0" x2="80" y2="100" />
          <circle cx="50" cy="50" r="16" fill="none" />
          <circle cx="50" cy="50" r="32" fill="none" />
        </g>

        {/* City Landmarks subtle labels */}
        {city.popularLocations.map((loc) => {
          const pt = getPointPercent(loc, { x: 50, y: 50 });
          return (
            <g
              key={loc.id}
              onClick={() => onSelectMapLocation && onSelectMapLocation(loc)}
              className="cursor-pointer group"
            >
              <circle cx={pt.x} cy={pt.y} r="1.4" fill="#38bdf8" opacity="0.7" className="group-hover:fill-amber-400 group-hover:scale-125 transition-transform" />
              <text
                x={pt.x + 2}
                y={pt.y + 0.8}
                fill="#94a3b8"
                fontSize="2.1"
                fontWeight="500"
                className="group-hover:fill-white transition-colors pointer-events-none"
              >
                {loc.name.split('(')[0].trim()}
              </text>
            </g>
          );
        })}

        {/* Route Line if both pickup and destination exist */}
        {pickup && destination && (
          <g filter="url(#glow)">
            {/* Background shadow stroke */}
            <path
              d={`M ${pickupPos.x} ${pickupPos.y} Q ${(pickupPos.x + destPos.x) / 2 + 6} ${(pickupPos.y + destPos.y) / 2 - 6}, ${destPos.x} ${destPos.y}`}
              fill="none"
              stroke="#000"
              strokeWidth="1.8"
              opacity="0.6"
            />
            {/* Glowing route line */}
            <path
              d={`M ${pickupPos.x} ${pickupPos.y} Q ${(pickupPos.x + destPos.x) / 2 + 6} ${(pickupPos.y + destPos.y) / 2 - 6}, ${destPos.x} ${destPos.y}`}
              fill="none"
              stroke="url(#routeGradient)"
              strokeWidth="1.4"
              strokeDasharray="2 1"
              strokeLinecap="round"
            />
          </g>
        )}

        {/* Roaming Taxis on the street */}
        {cabs.map(cab => (
          <g key={cab.id} transform={`translate(${cab.x}, ${cab.y})`}>
            {/* Taxi shadow */}
            <ellipse cx="0" cy="0.6" rx="1.6" ry="0.9" fill="black" opacity="0.4" />
            {/* Taxi body */}
            <rect
              x="-1.4"
              y="-0.8"
              width="2.8"
              height="1.6"
              rx="0.4"
              fill={cab.color}
              stroke="#ffffff"
              strokeWidth="0.2"
            />
            {/* Taxi roof lamp (sign of Petit Taxi) */}
            <rect x="-0.5" y="-0.4" width="1.0" height="0.8" rx="0.2" fill="#ffffff" />
            <circle cx="0" cy="0" r="0.2" fill="#f59e0b" />
          </g>
        ))}

        {/* Active Driver Taxi Marker when Ride is Ongoing */}
        {activeDriver && (rideStatus === 'driver_approaching' || rideStatus === 'driver_arrived' || rideStatus === 'in_progress') && (
          <g transform={`translate(${driverPos.x}, ${driverPos.y})`} filter="url(#glow)">
            <circle cx="0" cy="0" r="3.2" fill="#eab308" opacity="0.3" className="animate-ping" />
            <rect x="-2.2" y="-1.2" width="4.4" height="2.4" rx="0.6" fill="#f59e0b" stroke="#ffffff" strokeWidth="0.4" />
            <rect x="-0.8" y="-0.6" width="1.6" height="1.2" rx="0.3" fill="#ffffff" />
            <text x="0" y="3.5" textAnchor="middle" fill="#fef08a" fontSize="2.2" fontWeight="bold">
              {activeDriver.name.split(' ')[0]}
            </text>
          </g>
        )}

        {/* Pickup Pin */}
        {pickup && (
          <g transform={`translate(${pickupPos.x}, ${pickupPos.y})`}>
            {/* Pulse wave */}
            <circle cx="0" cy="0" r="3" fill="#3b82f6" opacity="0.3" className="animate-pulse" />
            <circle cx="0" cy="0" r="1.6" fill="#2563eb" stroke="#ffffff" strokeWidth="0.4" />
            <circle cx="0" cy="0" r="0.6" fill="#ffffff" />
            <text x="0" y="-2.5" textAnchor="middle" fill="#93c5fd" fontSize="2.0" fontWeight="bold">
              Pickup
            </text>
          </g>
        )}

        {/* Destination Pin */}
        {destination && (
          <g transform={`translate(${destPos.x}, ${destPos.y})`}>
            <polygon points="0,-4.5 -1.8,-1.2 0,0 1.8,-1.2" fill="#ef4444" stroke="#ffffff" strokeWidth="0.3" />
            <circle cx="0" cy="0" r="1.2" fill="#dc2626" stroke="#ffffff" strokeWidth="0.3" />
            <text x="0" y="-5.2" textAnchor="middle" fill="#fca5a5" fontSize="2.0" fontWeight="bold">
              Drop-off
            </text>
          </g>
        )}
      </svg>

      {/* Floating Map Controls & Overlays */}
      <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
        <div className="bg-slate-900/90 backdrop-blur-md border border-slate-800 rounded-xl px-3 py-2 flex items-center gap-2.5 text-xs text-slate-200 shadow-lg">
          <span className="text-base">{city.flag}</span>
          <div className="flex flex-col">
            <span className="font-semibold text-white">{city.name.split('(')[0]}</span>
            <span className="text-[10px] text-amber-400 font-medium">
              {city.country === 'Morocco' ? `Moroccan Taxi Hub · ${cabs.length + 8} cabs online` : 'Korsa Global Cab Radar'}
            </span>
          </div>
        </div>
      </div>

      {/* Map Action Badges (Top Right) */}
      <div className="absolute top-4 right-4 z-10 flex items-center gap-2">
        <div className="bg-slate-900/90 backdrop-blur-md border border-slate-800 rounded-xl px-2.5 py-1.5 flex items-center gap-1.5 text-xs text-slate-300">
          <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: city.petitTaxiColor }} />
          <span className="font-medium text-[11px]">
            {city.country === 'Morocco' ? 'Official City Color' : 'Standard Taxi'}
          </span>
        </div>

        <div className="bg-slate-900/90 backdrop-blur-md border border-slate-800 rounded-xl p-1 flex flex-col gap-1 shadow-lg">
          <button
            onClick={() => setZoom(prev => Math.min(1.8, prev + 0.2))}
            aria-label="Zoom in"
            className="w-7 h-7 flex items-center justify-center text-slate-200 hover:text-white hover:bg-slate-800 rounded text-sm font-bold focus:outline-none"
          >
            +
          </button>
          <button
            onClick={() => setZoom(prev => Math.max(0.8, prev - 0.2))}
            aria-label="Zoom out"
            className="w-7 h-7 flex items-center justify-center text-slate-200 hover:text-white hover:bg-slate-800 rounded text-sm font-bold focus:outline-none"
          >
            -
          </button>
          <button
            onClick={() => setZoom(1)}
            aria-label="Reset zoom"
            className="w-7 h-7 flex items-center justify-center text-slate-200 hover:text-white hover:bg-slate-800 rounded text-xs focus:outline-none"
            title="Reset Zoom"
          >
            <Compass className="w-3.5 h-3.5 text-amber-400" />
          </button>
        </div>
      </div>

      {/* Bottom Status Ticker / Instructions */}
      <div className="absolute bottom-3 left-4 right-4 z-10 flex items-center justify-between pointer-events-none">
        <div className="pointer-events-auto bg-slate-950/85 backdrop-blur-md border border-slate-800/90 rounded-lg px-3 py-1.5 text-[11px] text-slate-300 flex items-center gap-2">
          <Navigation className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
          <span>Click any landmark on map to set route · GPS Active</span>
        </div>

        <div className="pointer-events-auto hidden sm:flex items-center gap-2 bg-slate-950/85 backdrop-blur-md border border-slate-800/90 rounded-lg px-2.5 py-1.5 text-[11px] text-slate-300">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span>100% Licensed Drivers Only</span>
        </div>
      </div>

    </div>
  );
};
