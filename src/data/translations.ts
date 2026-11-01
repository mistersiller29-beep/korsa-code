import { Language } from '../types';

export const translations: Record<Language, {
  appName: string;
  tagline: string;
  subtagline: string;
  passengerMode: string;
  driverMode: string;
  whereTo: string;
  pickupLocation: string;
  dropoffLocation: string;
  selectCity: string;
  selectVehicle: string;
  petitTaxi: string;
  petitTaxiDesc: string;
  grandTaxiBlassa: string;
  grandTaxiBlassaDesc: string;
  grandTaxiKamla: string;
  grandTaxiKamlaDesc: string;
  ecoCab: string;
  ecoCabDesc: string;
  executiveCab: string;
  executiveCabDesc: string;
  nameYourFare: string;
  nameYourFareDesc: string;
  estimatedBenchmark: string;
  meterComparison: string;
  surgeComparison: string;
  korsaSavings: string;
  launchKorsa: string;
  searchingTaxis: string;
  bidsReceived: string;
  incomingOffers: string;
  acceptFare: string;
  counterOffer: string;
  passOffer: string;
  driverArriving: string;
  driverArrived: string;
  onTrip: string;
  tripComplete: string;
  safetyPin: string;
  showToDriver: string;
  chatWithDriver: string;
  callDriver: string;
  sosAlert: string;
  cancelRide: string;
  culturalLoreTitle: string;
  culturalLoreDesc: string;
  moroccanHeritage: string;
  learnMore: string;
  driverRadar: string;
  driverStats: string;
  todayEarnings: string;
  ridesCompleted: string;
  driverRating: string;
  incomingPassengerRequests: string;
  acceptRequest: string;
  placeBid: string;
  blassaSeat: string;
  privateRide: string;
  soundEnabled: string;
  soundDisabled: string;
  reviews: string;
  korsasCompleted: string;
}> = {
  en: {
    appName: "Korsa",
    tagline: "Fair Taxi Bidding. Worldwide.",
    subtagline: "Inspired by the Moroccan art of respectful taxi negotiation. Name your fare, deal directly with licensed taxi drivers, and ride without surge markups.",
    passengerMode: "Passenger (Rakkab)",
    driverMode: "Driver Cockpit (Chifor)",
    whereTo: "Where are you heading?",
    pickupLocation: "Pickup Location",
    dropoffLocation: "Destination",
    selectCity: "Select City",
    selectVehicle: "Select Taxi Category",
    petitTaxi: "Petit Taxi",
    petitTaxiDesc: "Iconic urban city cab. Quick, agile, and local to municipal zones.",
    grandTaxiBlassa: "Grand Taxi (Blassa)",
    grandTaxiBlassaDesc: "Moroccan shared-seat intercity tradition. Pay per seat, save big.",
    grandTaxiKamla: "Grand Taxi (Korsa Kamla)",
    grandTaxiKamlaDesc: "Full private charter. Mercedes saloon or van, maximum luggage.",
    ecoCab: "Eco Hybrid / Electric",
    ecoCabDesc: "Modern low-emission taxi for conscious urban travel.",
    executiveCab: "Executive Taxi",
    executiveCabDesc: "Black-car licensed limousine standard with prime comfort.",
    nameYourFare: "Name Your Fare",
    nameYourFareDesc: "Drivers see your offer and either accept or propose counter-bids.",
    estimatedBenchmark: "Fair Market Benchmark",
    meterComparison: "Standard Meter",
    surgeComparison: "Corporate App Surge",
    korsaSavings: "Save ~25% vs Surge",
    launchKorsa: "Launch Korsa Request",
    searchingTaxis: "Broadcasting to nearby licensed taxis...",
    bidsReceived: "Driver Bids",
    incomingOffers: "Nearby drivers are bidding on your Korsa:",
    acceptFare: "Accept Offer",
    counterOffer: "Counter",
    passOffer: "Decline",
    driverArriving: "Driver is on the way",
    driverArrived: "Driver arrived at your pickup spot!",
    onTrip: "Korsa in progress to destination",
    tripComplete: "You have arrived! Korsa completed.",
    safetyPin: "Safety PIN Code",
    showToDriver: "Give this 4-digit code to your driver when getting in",
    chatWithDriver: "Direct Chat",
    callDriver: "Call Driver",
    sosAlert: "SOS Assistance",
    cancelRide: "Cancel Korsa",
    culturalLoreTitle: "The Spirit of Korsa (الكورسة)",
    culturalLoreDesc: "In Morocco, taking a taxi is called 'Dert Korsa'. It represents mutual human respect ('Rabha b-Rida') where rider and driver agree on fair terms before closing the door.",
    moroccanHeritage: "Moroccan Taxi Heritage",
    learnMore: "How Korsa Works",
    driverRadar: "Driver Radar Feed",
    driverStats: "Shift Performance",
    todayEarnings: "Today's Earnings",
    ridesCompleted: "Completed Korsas",
    driverRating: "Chifor Rating",
    incomingPassengerRequests: "Live Passenger Requests in Your Area",
    acceptRequest: "Accept Request",
    placeBid: "Bid Custom Fare",
    blassaSeat: "Shared Seat (Blassa)",
    privateRide: "Private Charter (Kamla)",
    soundEnabled: "Audio Cues On",
    soundDisabled: "Audio Muted",
    reviews: "reviews",
    korsasCompleted: "Korsas completed",
  },
  fr: {
    appName: "Korsa",
    tagline: "Négociation Équitable de Taxis. Dans le Monde Entier.",
    subtagline: "Inspiré par la culture marocaine de la course à la demande. Proposez votre prix, négociez directement avec les chauffeurs de taxi et voyagez sans surtarification.",
    passengerMode: "Passager (Rakkab)",
    driverMode: "Espace Chauffeur (Chifor)",
    whereTo: "Où allez-vous ?",
    pickupLocation: "Lieu de prise en charge",
    dropoffLocation: "Destination",
    selectCity: "Choisir la ville",
    selectVehicle: "Type de Taxi",
    petitTaxi: "Petit Taxi",
    petitTaxiDesc: "Taxi urbain emblématique. Rapide et économique en centre-ville.",
    grandTaxiBlassa: "Grand Taxi (Blassa)",
    grandTaxiBlassaDesc: "Tradition marocaine de place partagée. Économique pour trajets interurbains.",
    grandTaxiKamla: "Grand Taxi (Course Complète)",
    grandTaxiKamlaDesc: "Privatisation intégrale du véhicule, idéal avec bagages et aéroport.",
    ecoCab: "Éco Hybride / Électrique",
    ecoCabDesc: "Taxi moderne à faibles émissions pour déplacements urbains.",
    executiveCab: "Taxi Exécutif",
    executiveCabDesc: "Berline haut de gamme avec confort supérieur.",
    nameYourFare: "Proposez votre prix",
    nameYourFareDesc: "Les chauffeurs consultent votre offre et l'acceptent ou contre-proposent.",
    estimatedBenchmark: "Tarif estimé équitable",
    meterComparison: "Compteur Standard",
    surgeComparison: "Tarif Majoration Appli",
    korsaSavings: "Économisez ~25%",
    launchKorsa: "Lancer la Korsa",
    searchingTaxis: "Diffusion vers les taxis aux alentours...",
    bidsReceived: "Offres des Chauffeurs",
    incomingOffers: "Les chauffeurs de taxi proposent leurs tarifs :",
    acceptFare: "Accepter l'offre",
    counterOffer: "Contre-offre",
    passOffer: "Refuser",
    driverArriving: "Le chauffeur est en route",
    driverArrived: "Le chauffeur est arrivé au point de rendez-vous !",
    onTrip: "Course en cours vers votre destination",
    tripComplete: "Vous êtes arrivé à bon port ! Course terminée.",
    safetyPin: "Code PIN de Sécurité",
    showToDriver: "Communiquez ce code à 4 chiffres à votre chauffeur à l'embarquement",
    chatWithDriver: "Message direct",
    callDriver: "Appeler",
    sosAlert: "Assistance SOS",
    cancelRide: "Annuler la Korsa",
    culturalLoreTitle: "L'Esprit de la Korsa (الكورسة)",
    culturalLoreDesc: "Au Maroc, faire une 'Korsa' signifie s'accorder d'humain à humain sur un prix juste ('Rabha b-Rida') dans le respect mutuel avant de fermer la portière.",
    moroccanHeritage: "L'héritage des taxis marocains",
    learnMore: "Comment fonctionne Korsa",
    driverRadar: "Radar des Courses Disponibles",
    driverStats: "Performance de la journée",
    todayEarnings: "Gains du jour",
    ridesCompleted: "Courses effectuées",
    driverRating: "Note Chauffeur",
    incomingPassengerRequests: "Demandes de passagers à proximité",
    acceptRequest: "Accepter la course",
    placeBid: "Proposer un autre montant",
    blassaSeat: "Place Partagée (Blassa)",
    privateRide: "Course Privée (Kamla)",
    soundEnabled: "Sons activés",
    soundDisabled: "Sons coupés",
    reviews: "avis",
    korsasCompleted: "Korsas complétées",
  },
  ar: {
    appName: "كورسة",
    tagline: "اقترح ثمنك، اركب طاكسي فالعالم كامل",
    subtagline: "مستوحى من ثقافة الطاكسي المغربية الأصيلة. حط الثمن ديالك، تفاوض مباشرة مع مول الطاكسي و سافر بكرامتك بلا زيادات عشوائية.",
    passengerMode: "راكب (Rakkab)",
    driverMode: "شيفور (Chifor)",
    whereTo: "فين غادي أخويا / أختي؟",
    pickupLocation: "نقطة الانطلاق (البلاصة فين راك)",
    dropoffLocation: "الوجهة ديالك",
    selectCity: "اختار المدينة",
    selectVehicle: "نوع الطاكسي",
    petitTaxi: "بتي طاكسي (Petit Taxi)",
    petitTaxiDesc: "طاكسي صغير ديال المدينة، خفيف وسريع وبلدي.",
    grandTaxiBlassa: "كرون طاكسي (بلاصة)",
    grandTaxiBlassaDesc: "الثقافة المغربية الشعبية: خلص غير بلاصتك وسافر مرتاح و مقتصد.",
    grandTaxiKamla: "كرون طاكسي (كورسة كاملة)",
    grandTaxiKamlaDesc: "طاكسي كبير كامل ليك ولعائلتك وللفاليزات، خصوصية تامة.",
    ecoCab: "طاكسي إيكو هايبرد",
    ecoCabDesc: "طاكسي عصري ونقي كيحافظ على البيئة.",
    executiveCab: "طاكسي برستيج VIP",
    executiveCabDesc: "سيارة فارهة مريحة للاجتماعات والمشاوير الخاصة.",
    nameYourFare: "اقترح الثمن ديالك",
    nameYourFareDesc: "الشوافرية غايشوفو العرض ديالك ويقبلوه ولا يقترحو عليك ثمن مناسب.",
    estimatedBenchmark: "الثمن المرجعي العادل",
    meterComparison: "الكونتور العادي",
    surgeComparison: "تطبيقات الاحتكار وقت الذروة",
    korsaSavings: "وفّر حتى 25%",
    launchKorsa: "طلب الكورسة دابا",
    searchingTaxis: "كنقلبو على أقرب طاكسي مرخص ليك...",
    bidsReceived: "عروض الشوافرية",
    incomingOffers: "شوافرية الطاكسي القريبين كيقترحو عروضهم:",
    acceptFare: "قبول العرض",
    counterOffer: "تفاوض",
    passOffer: "تجاوز",
    driverArriving: "الشيفور في الطريق إليك",
    driverArrived: "الشيفور وصل لبلاصتك!",
    onTrip: "الكورسة غادية دابا في أمان الله",
    tripComplete: "الحمد لله على السلامة! الكورسة كملات.",
    safetyPin: "كود الأمان PIN",
    showToDriver: "عطي هاد 4 الأرقام للشيفور ملي تطلع للطاكسي",
    chatWithDriver: "شات مباشر",
    callDriver: "اتصال بالشيفور",
    sosAlert: "طلب النجدة SOS",
    cancelRide: "إلغاء الكورسة",
    culturalLoreTitle: "روح الكورسة الأصيلة",
    culturalLoreDesc: "في المغرب، 'الكورسة' ماشي غير مشوار، هي اتفاق إنساني ومحبة ورضا متبادل بلا وسيط جشع كياخد نسبة كبيرة من عرق الشيفور.",
    moroccanHeritage: "تراث الطاكسيات في المغرب",
    learnMore: "كيفاش خدامة كورسة",
    driverRadar: "رادار الكورسات للشيفور",
    driverStats: "مدخول الشيفور اليوم",
    todayEarnings: "مدخول اليوم",
    ridesCompleted: "الكورسات المنجزة",
    driverRating: "تنقيط الشيفور",
    incomingPassengerRequests: "طلبات الركاب القريبة منك دابا",
    acceptRequest: "قبول الكورسة",
    placeBid: "اقتراح ثمن آخر",
    blassaSeat: "بلاصة (مقعد)",
    privateRide: "كورسة كاملة",
    soundEnabled: "الصوت مشغل",
    soundDisabled: "الصوت صامت",
    reviews: "تقييم",
    korsasCompleted: "كورسة منجزة",
  }
};
