export type TaxiCategory = 'petit' | 'grand_blassa' | 'grand_kamla' | 'eco' | 'executive';

export type RideStatus = 'idle' | 'searching' | 'bidding' | 'accepted' | 'driver_approaching' | 'driver_arrived' | 'in_progress' | 'completed' | 'cancelled';

export type Language = 'en' | 'fr' | 'ar';
export type Currency = 'MAD' | 'USD' | 'EUR' | 'AED' | 'GBP';

export interface LocationPoint {
  id: string;
  name: string;
  nameAr?: string;
  nameFr?: string;
  address: string;
  lat: number;
  lng: number;
  category?: 'landmark' | 'airport' | 'station' | 'hotel' | 'mall';
}

export interface CityPreset {
  id: string;
  name: string;
  country: string;
  flag: string;
  defaultCurrency: Currency;
  center: { lat: number; lng: number };
  popularLocations: LocationPoint[];
  taxiTypes: TaxiCategory[];
  petitTaxiColor: string;
  baseFare: number;
  ratePerKm: number;
}

export interface Driver {
  id: string;
  name: string;
  phone: string;
  avatar: string;
  rating: number;
  tripsCount: number;
  taxiType: TaxiCategory;
  vehicleModel: string;
  plateNumber: string;
  licenseNumber: string;
  vehicleColor: string;
  distanceKm: number;
  etaMinutes: number;
  badges: string[];
}

export interface DriverBid {
  id: string;
  driverId: string;
  driver: Driver;
  bidAmount: number;
  originalPassengerPrice: number;
  isCounterOffer: boolean;
  timestamp: number;
  etaMinutes: number;
}

export interface RideRequest {
  id: string;
  passengerName: string;
  passengerRating: number;
  cityId: string;
  pickup: LocationPoint;
  destination: LocationPoint;
  category: TaxiCategory;
  passengersCount: number;
  luggageCount: number;
  hasAC: boolean;
  notes?: string;
  offeredFare: number;
  currency: Currency;
  distanceKm: number;
  estimatedMinutes: number;
  createdAt: number;
  status: RideStatus;
  selectedBid?: DriverBid;
  pinCode: string;
}

export interface ChatMessage {
  id: string;
  sender: 'passenger' | 'driver';
  text: string;
  timestamp: string;
}
