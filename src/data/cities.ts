import { CityPreset } from '../types';

export const CITIES_DATA: CityPreset[] = [
  {
    id: 'casablanca',
    name: 'Casablanca (الدار البيضاء)',
    country: 'Morocco',
    flag: '🇲🇦',
    defaultCurrency: 'MAD',
    petitTaxiColor: '#dc2626', // Vibrant Red (Rouge vif)
    center: { lat: 33.5731, lng: -7.5898 },
    baseFare: 15,
    ratePerKm: 2.5,
    taxiTypes: ['petit', 'grand_kamla', 'grand_blassa', 'eco', 'executive'],
    popularLocations: [
      { id: 'casa_1', name: 'Hassan II Mosque', nameAr: 'مسجد الحسن الثاني', nameFr: 'Mosquée Hassan II', address: 'Boulevard de la Corniche', lat: 33.6083, lng: -7.6328, category: 'landmark' },
      { id: 'casa_2', name: 'Casa-Port Railway Station', nameAr: 'محطة كازا بور', nameFr: 'Gare Casa-Port', address: 'Boulevard Houphouët Boigny', lat: 33.5997, lng: -7.6119, category: 'station' },
      { id: 'casa_3', name: 'Twin Center (Maârif)', nameAr: 'التوين سنتر - المعاريف', nameFr: 'Twin Center Maârif', address: 'Boulevard Zerktouni', lat: 33.5855, lng: -7.6318, category: 'mall' },
      { id: 'casa_4', name: 'Morocco Mall (Ain Diab)', nameAr: 'موروكو مول - عين الذئاب', nameFr: 'Morocco Mall', address: 'Boulevard de l\'Océan', lat: 33.5746, lng: -7.7078, category: 'mall' },
      { id: 'casa_5', name: 'Mohammed V Airport (CMN)', nameAr: 'مطار محمد الخامس', nameFr: 'Aéroport Mohammed V', address: 'Nouasseur Province', lat: 33.3675, lng: -7.5899, category: 'airport' },
    ]
  },
  {
    id: 'marrakech',
    name: 'Marrakech (مراكش)',
    country: 'Morocco',
    flag: '🇲🇦',
    defaultCurrency: 'MAD',
    petitTaxiColor: '#ca8a04', // Golden Ochre / Yellow
    center: { lat: 31.6295, lng: -7.9811 },
    baseFare: 18,
    ratePerKm: 2.8,
    taxiTypes: ['petit', 'grand_kamla', 'grand_blassa', 'eco', 'executive'],
    popularLocations: [
      { id: 'rak_1', name: 'Jemaa el-Fnaa Square', nameAr: 'ساحة جامع الفنا', nameFr: 'Place Jemaa el-Fna', address: 'Medina Old Quarter', lat: 31.6258, lng: -7.9891, category: 'landmark' },
      { id: 'rak_2', name: 'Jardin Majorelle & YSL', nameAr: 'حديقة ماجوريل', nameFr: 'Jardin Majorelle', address: 'Rue Yves Saint Laurent', lat: 31.6417, lng: -8.0031, category: 'landmark' },
      { id: 'rak_3', name: 'Menara Airport (RAK)', nameAr: 'مطار مراكش المنارة', nameFr: 'Aéroport Marrakech Menara', address: 'Mhamid Avenue', lat: 31.6069, lng: -8.0363, category: 'airport' },
      { id: 'rak_4', name: 'Guéliz Central Plaza', nameAr: 'كيليز - ساحة 16 نونبر', nameFr: 'Guéliz Plaza 16 Novembre', address: 'Avenue Mohammed V', lat: 31.6346, lng: -8.0124, category: 'landmark' },
      { id: 'rak_5', name: 'Ourika Valley Departure Hub', nameAr: 'محطة أوريكا (كرون طاكسي)', nameFr: 'Station Grand Taxi Ourika', address: 'Bab Ghmat', lat: 31.6180, lng: -7.9710, category: 'station' },
    ]
  },
  {
    id: 'rabat',
    name: 'Rabat (الرباط)',
    country: 'Morocco',
    flag: '🇲🇦',
    defaultCurrency: 'MAD',
    petitTaxiColor: '#2563eb', // Cobalt Blue
    center: { lat: 34.0209, lng: -6.8416 },
    baseFare: 15,
    ratePerKm: 2.4,
    taxiTypes: ['petit', 'grand_kamla', 'grand_blassa', 'eco', 'executive'],
    popularLocations: [
      { id: 'rba_1', name: 'Hassan Tower & Mausoleum', nameAr: 'صومعة حسان وضريح محمد الخامس', nameFr: 'Tour Hassan', address: 'Boulevard Mohamed Lyazidi', lat: 34.0241, lng: -6.8227, category: 'landmark' },
      { id: 'rba_2', name: 'Agdal Train Station (LGV)', nameAr: 'محطة القطار الرباط أكدال', nameFr: 'Gare Rabat Agdal TGV', address: 'Avenue Haj Ahmed Cherkaoui', lat: 34.0045, lng: -6.8529, category: 'station' },
      { id: 'rba_3', name: 'Kasbah of the Udayas', nameAr: 'قصبة الأوداية', nameFr: 'Kasbah des Oudayas', address: 'Al Marsa Boulevard', lat: 34.0322, lng: -6.8364, category: 'landmark' },
      { id: 'rba_4', name: 'Mohammed VI Tower (Bouregreg)', nameAr: 'برج محمد السادس', nameFr: 'Tour Mohammed VI', address: 'Vallée du Bouregreg', lat: 34.0305, lng: -6.8090, category: 'landmark' },
    ]
  },
  {
    id: 'tangier',
    name: 'Tangier (طنجة)',
    country: 'Morocco',
    flag: '🇲🇦',
    defaultCurrency: 'MAD',
    petitTaxiColor: '#06b6d4', // Turquoise Cyan
    center: { lat: 35.7595, lng: -5.8340 },
    baseFare: 16,
    ratePerKm: 2.6,
    taxiTypes: ['petit', 'grand_kamla', 'grand_blassa', 'eco', 'executive'],
    popularLocations: [
      { id: 'tng_1', name: 'Grand Socco & Medina', nameAr: 'السوق الكبير والمدينة العتيقة', nameFr: 'Grand Socco', address: 'Place du 9 Avril', lat: 35.7844, lng: -5.8139, category: 'landmark' },
      { id: 'tng_2', name: 'Tanger-Ville Railway (TGV)', nameAr: 'محطة طنجة المدينة', nameFr: 'Gare Tanger Ville', address: 'Boulevard Mohamed VI', lat: 35.7725, lng: -5.7951, category: 'station' },
      { id: 'tng_3', name: 'Cap Spartel & Caves of Hercules', nameAr: 'رأس سبارطيل ومغارة هرقل', nameFr: 'Cap Spartel', address: 'Route de Cap Spartel', lat: 35.7925, lng: -5.9250, category: 'landmark' },
      { id: 'tng_4', name: 'Tanger Med Port Ferry Terminal', nameAr: 'ميناء طنجة المتوسط', nameFr: 'Port Tanger Med', address: 'Ksar Sghir Highway', lat: 35.8900, lng: -5.5000, category: 'station' },
    ]
  },
  {
    id: 'paris',
    name: 'Paris',
    country: 'France',
    flag: '🇫🇷',
    defaultCurrency: 'EUR',
    petitTaxiColor: '#3b82f6',
    center: { lat: 48.8566, lng: 2.3522 },
    baseFare: 7.5,
    ratePerKm: 1.8,
    taxiTypes: ['petit', 'grand_kamla', 'eco', 'executive'],
    popularLocations: [
      { id: 'par_1', name: 'Eiffel Tower', nameAr: 'برج إيفل', nameFr: 'Tour Eiffel', address: 'Champ de Mars, 7e', lat: 48.8584, lng: 2.2945, category: 'landmark' },
      { id: 'par_2', name: 'Gare de Lyon', nameAr: 'محطة غار دو ليون', nameFr: 'Gare de Lyon', address: 'Place Louis-Armand, 12e', lat: 48.8443, lng: 2.3744, category: 'station' },
      { id: 'par_3', name: 'Champs-Élysées & Arc de Triomphe', nameAr: 'الشانزلزيه وقوس النصر', nameFr: 'Champs-Élysées', address: 'Place Charles de Gaulle', lat: 48.8738, lng: 2.2950, category: 'landmark' },
      { id: 'par_4', name: 'Charles de Gaulle Airport (CDG)', nameAr: 'مطار شارل ديغول', nameFr: 'Aéroport CDG', address: 'Roissy-en-France', lat: 49.0097, lng: 2.5479, category: 'airport' },
    ]
  },
  {
    id: 'new_york',
    name: 'New York City',
    country: 'United States',
    flag: '🇺🇸',
    defaultCurrency: 'USD',
    petitTaxiColor: '#eab308', // NYC Yellow Cab
    center: { lat: 40.7128, lng: -74.0060 },
    baseFare: 8,
    ratePerKm: 2.4,
    taxiTypes: ['petit', 'grand_kamla', 'eco', 'executive'],
    popularLocations: [
      { id: 'nyc_1', name: 'Times Square & Broadway', nameAr: 'تايمز سكوير وبرودواي', nameFr: 'Times Square', address: 'Manhattan, NY 10036', lat: 40.7580, lng: -73.9855, category: 'landmark' },
      { id: 'nyc_2', name: 'Grand Central Terminal', nameAr: 'محطة غراند سنترال', nameFr: 'Grand Central', address: '89 E 42nd St', lat: 40.7527, lng: -73.9772, category: 'station' },
      { id: 'nyc_3', name: 'JFK International Airport', nameAr: 'مطار جون إف كينيدي', nameFr: 'Aéroport JFK', address: 'Queens, NY 11430', lat: 40.6413, lng: -73.7781, category: 'airport' },
      { id: 'nyc_4', name: 'Brooklyn Bridge Park', nameAr: 'حديقة جسر بروكلين', nameFr: 'Brooklyn Bridge Park', address: '334 Furman St', lat: 40.7023, lng: -73.9964, category: 'landmark' },
    ]
  },
  {
    id: 'dubai',
    name: 'Dubai (دبي)',
    country: 'United Arab Emirates',
    flag: '🇦🇪',
    defaultCurrency: 'AED',
    petitTaxiColor: '#f59e0b',
    center: { lat: 25.2048, lng: 55.2708 },
    baseFare: 12,
    ratePerKm: 2.2,
    taxiTypes: ['petit', 'grand_kamla', 'eco', 'executive'],
    popularLocations: [
      { id: 'dxb_1', name: 'Burj Khalifa & Dubai Mall', nameAr: 'برج خليفة ودبي مول', nameFr: 'Burj Khalifa', address: 'Downtown Dubai', lat: 25.1972, lng: 55.2744, category: 'landmark' },
      { id: 'dxb_2', name: 'Dubai Marina Walk', nameAr: 'ممشى مارينا دبي', nameFr: 'Dubai Marina Walk', address: 'Dubai Marina', lat: 25.0784, lng: 55.1408, category: 'landmark' },
      { id: 'dxb_3', name: 'Dubai Intl Airport (DXB)', nameAr: 'مطار دبي الدولي', nameFr: 'Aéroport DXB', address: 'Al Garhoud', lat: 25.2532, lng: 55.3657, category: 'airport' },
      { id: 'dxb_4', name: 'Palm Jumeirah Atlantis', nameAr: 'أتلانتس النخلة', nameFr: 'Atlantis The Palm', address: 'Crescent Rd', lat: 25.1304, lng: 55.1171, category: 'hotel' },
    ]
  },
  {
    id: 'london',
    name: 'London',
    country: 'United Kingdom',
    flag: '🇬🇧',
    defaultCurrency: 'GBP',
    petitTaxiColor: '#1e293b', // Black Cab
    center: { lat: 51.5074, lng: -0.1278 },
    baseFare: 6.5,
    ratePerKm: 2.2,
    taxiTypes: ['petit', 'grand_kamla', 'eco', 'executive'],
    popularLocations: [
      { id: 'lon_1', name: 'Piccadilly Circus & Soho', nameAr: 'بيكاديللي وسوهو', nameFr: 'Piccadilly Circus', address: 'Westminster, W1D 7ET', lat: 51.5101, lng: -0.1340, category: 'landmark' },
      { id: 'lon_2', name: 'London St Pancras International', nameAr: 'محطة سانت بانكراس', nameFr: 'Gare St Pancras', address: 'Euston Rd, N1C 4QP', lat: 51.5314, lng: -0.1261, category: 'station' },
      { id: 'lon_3', name: 'Heathrow Airport Terminal 2 & 3', nameAr: 'مطار هيثرو لندن', nameFr: 'Aéroport Heathrow', address: 'Hounslow, TW6 1AP', lat: 51.4700, lng: -0.4543, category: 'airport' },
    ]
  }
];

export const CURRENCY_RATES: Record<string, number> = {
  // relative to MAD
  MAD: 1.0,
  USD: 0.10,
  EUR: 0.093,
  AED: 0.37,
  GBP: 0.078,
};

export const CURRENCY_SYMBOLS: Record<string, string> = {
  MAD: 'د.م',
  USD: '$',
  EUR: '€',
  AED: 'د.إ',
  GBP: '£',
};
