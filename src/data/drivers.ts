import { Driver } from '../types';

export const STAR_DRIVER_PHOTO = "/src/assets/images/korsa_driver_profile_1793545223836.jpg";

export const MOCK_DRIVERS_POOL: Driver[] = [
  {
    id: 'drv_1',
    name: 'Si Mohammed El Fassi',
    phone: '+212 6 61 45 88 12',
    avatar: STAR_DRIVER_PHOTO,
    rating: 4.97,
    tripsCount: 2840,
    taxiType: 'petit',
    vehicleModel: 'Dacia Logan Stepway (Taxi Red)',
    plateNumber: '4932-A-1',
    licenseNumber: 'TX-CASA-08912',
    vehicleColor: '#dc2626',
    distanceKm: 0.8,
    etaMinutes: 3,
    badges: ['Top Chifor 2026', 'Punctual', 'Speaks French & Darija', 'Clean Interior']
  },
  {
    id: 'drv_2',
    name: 'Abdelkader Benali',
    phone: '+212 6 72 19 33 50',
    avatar: 'https://api.dicebear.com/7.x/personas/svg?seed=Abdelkader&backgroundColor=b6e3f4',
    rating: 4.92,
    tripsCount: 1650,
    taxiType: 'grand_kamla',
    vehicleModel: 'Mercedes-Benz W124 / Lodgy Grand Taxi',
    plateNumber: '1120-B-26',
    licenseNumber: 'GT-RAK-0341',
    vehicleColor: '#ca8a04',
    distanceKm: 1.4,
    etaMinutes: 5,
    badges: ['Highway Veteran', 'Luggage Specialist', 'Child Seat Available']
  },
  {
    id: 'drv_3',
    name: 'Karim Tazi',
    phone: '+212 6 63 90 11 44',
    avatar: 'https://api.dicebear.com/7.x/personas/svg?seed=KarimTazi&backgroundColor=c0aede',
    rating: 4.88,
    tripsCount: 920,
    taxiType: 'grand_blassa',
    vehicleModel: 'Dacia Lodgy 7-Seater Grand Taxi',
    plateNumber: '7841-A-6',
    licenseNumber: 'GT-RBA-1102',
    vehicleColor: '#2563eb',
    distanceKm: 0.5,
    etaMinutes: 2,
    badges: ['Shared Blassa Route', 'Express Line', 'Friendly Host']
  },
  {
    id: 'drv_4',
    name: 'Youssef El Amrani',
    phone: '+212 6 68 22 77 91',
    avatar: 'https://api.dicebear.com/7.x/personas/svg?seed=YoussefAmrani&backgroundColor=ffd5dc',
    rating: 4.95,
    tripsCount: 1890,
    taxiType: 'eco',
    vehicleModel: 'Toyota Corolla Cross Hybrid',
    plateNumber: '5501-D-1',
    licenseNumber: 'TX-ECO-0044',
    vehicleColor: '#10b981',
    distanceKm: 1.2,
    etaMinutes: 4,
    badges: ['Zero Emission City', 'Phone Chargers', 'Quiet Drive']
  },
  {
    id: 'drv_5',
    name: 'Rachid Berrada',
    phone: '+212 6 60 33 44 88',
    avatar: 'https://api.dicebear.com/7.x/personas/svg?seed=RachidBerrada&backgroundColor=d1d4f9',
    rating: 4.98,
    tripsCount: 3410,
    taxiType: 'executive',
    vehicleModel: 'Mercedes-Benz E-Class Berline',
    plateNumber: '9900-VIP-1',
    licenseNumber: 'TX-LUX-0012',
    vehicleColor: '#0f172a',
    distanceKm: 2.1,
    etaMinutes: 7,
    badges: ['VIP Hospitality', 'Airport Meet & Greet', 'English & Spanish']
  },
  {
    id: 'drv_6',
    name: 'Amina Mansouri',
    phone: '+212 6 65 89 20 14',
    avatar: 'https://api.dicebear.com/7.x/personas/svg?seed=AminaMansouri&backgroundColor=ffdfba',
    rating: 4.96,
    tripsCount: 1420,
    taxiType: 'petit',
    vehicleModel: 'Peugeot 208 Petit Taxi',
    plateNumber: '3318-B-1',
    licenseNumber: 'TX-TNG-0442',
    vehicleColor: '#06b6d4',
    distanceKm: 0.9,
    etaMinutes: 3,
    badges: ['Top Female Chifor', 'Safe City Rides', 'Speaks French']
  }
];

export function generateBidsForRequest(baseFare: number, passengerOffer: number): Array<{
  driver: Driver;
  bidAmount: number;
  isCounterOffer: boolean;
  etaMinutes: number;
}> {
  // Generate 2 to 4 realistic driver bids with realistic variations
  const shuffled = [...MOCK_DRIVERS_POOL].sort(() => 0.5 - Math.random());
  const selectedDrivers = shuffled.slice(0, 3);

  return selectedDrivers.map((driver, index) => {
    let bidAmount = passengerOffer;
    let isCounterOffer = false;

    // Driver 0 might accept user price right away!
    if (index === 0) {
      bidAmount = passengerOffer;
      isCounterOffer = false;
    } else if (index === 1) {
      // Driver 1 suggests a slight counter (e.g. +5% to 15%)
      const increase = Math.max(5, Math.round(passengerOffer * 0.1));
      bidAmount = passengerOffer + increase;
      isCounterOffer = true;
    } else {
      // Driver 2 might match or counter slightly depending on distance
      const variance = Math.random() > 0.5 ? Math.max(3, Math.round(passengerOffer * 0.05)) : 0;
      bidAmount = passengerOffer + variance;
      isCounterOffer = variance > 0;
    }

    return {
      driver,
      bidAmount,
      isCounterOffer,
      etaMinutes: Math.floor(Math.random() * 4) + 2,
    };
  });
}
