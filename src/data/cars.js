import { CAR_IMAGES, SHOWROOM_IMAGES, AVATAR_IMAGES } from '../assets/images';

export const CARS_DATA = [
  {
    id: 'bugatti-tourbillon',
    name: 'Bugatti Tourbillon',
    brand: 'Bugatti',
    modelYear: 2026,
    category: 'Hypercar',
    priceUsd: 4100000,
    badge: 'Rare Allocation',
    isFeatured: true,
    tagline: 'Pour l’Éternité — 1,800 HP Naturally Aspirated V16 Hybrid',
    description: 'The Bugatti Tourbillon represents an unprecedented evolutionary leap. Powered by a bespoke 8.3-liter naturally aspirated V16 developed alongside Cosworth, revving to 9,000 RPM and paired with three high-performance electric motors, the Tourbillon is an analogue horological masterpiece crafted for eternity.',
    provenance: 'Handcrafted in Molsheim, France. Limited to only 250 examples worldwide. Allocation authenticated with factory documentation.',
    heroImage: CAR_IMAGES.bugattiTourbillon,
    galleryImages: [
      CAR_IMAGES.bugattiTourbillon,
      CAR_IMAGES.galleryRear,
      CAR_IMAGES.galleryCockpit,
      CAR_IMAGES.galleryWheel
    ],
    colorOptions: [
      { name: 'French Racing Blue / Nocturne', hex: '#0f3c85', image: CAR_IMAGES.bugattiTourbillon },
      { name: 'Carbon Titanium & Champagne Gold', hex: '#d4af37', image: CAR_IMAGES.galleryRear },
      { name: 'Shadow Black & Crimson Red', hex: '#111111', image: CAR_IMAGES.galleryCockpit }
    ],
    specs: {
      engine: '8.3L Naturally Aspirated Cosworth V16 + 3 E-Motors',
      powerHp: 1800,
      powerKw: 1324,
      torqueNm: 1500,
      acceleration0to100: 2.0,
      topSpeedKmh: 445,
      transmission: 'Dual-Clutch',
      drivetrain: 'Electric Torque Vectoring All-Wheel Drive',
      fuelType: 'Hybrid',
      curbWeightKg: 1995,
      displacementCc: '8,350 cc',
      fuelEconomy: '14.8 L / 100 km'
    },
    dimensions: {
      lengthMm: 4671,
      widthMm: 2051,
      heightMm: 1189,
      wheelbaseMm: 2740
    },
    features: [
      'Skeletonized instrument cluster designed with Swiss watchmakers (600+ titanium & ruby components)',
      'Bespoke Dihedral gullwing doors with electric automatic closure',
      'Diffuser tunnel starting behind the passenger cabin generating 1,000kg downforce',
      '800V high-voltage oil-cooled battery system developed by Rimac Technology',
      '3D-printed titanium suspension arms saving 45% mass'
    ],
    soundProfile: {
      engineType: 'v16-quad-hybrid',
      idleRpm: 850,
      redlineRpm: 9000,
      soundFrequencyBase: 135,
      rumbleIntensity: 0.95
    },
    showroomLocation: 'Monaco Private Vault'
  },
  {
    id: 'porsche-911-gt3-rs',
    name: 'Porsche 911 GT3 RS (992.2)',
    brand: 'Porsche',
    modelYear: 2025,
    category: 'Supercar',
    priceUsd: 345000,
    badge: 'Available',
    isFeatured: true,
    tagline: 'Born from Flacht — Pure Aerodynamic Weaponry',
    description: 'The Porsche 911 GT3 RS is motorsport engineering elevated to its absolute zenith. Featuring Formula 1-derived Drag Reduction System (DRS), central radiator concept, and a screaming 4.0-liter naturally aspirated flat-six engine that revs uninhibited to 9,000 RPM.',
    provenance: 'Weissach Package with exposed carbon fiber roof, anti-roll bars, and magnesium wheels. Delivery mileage only.',
    heroImage: CAR_IMAGES.porscheGt3rs,
    galleryImages: [
      CAR_IMAGES.porscheGt3rs,
      CAR_IMAGES.galleryCockpit,
      CAR_IMAGES.paganiUtopia,
      CAR_IMAGES.lamborghiniUrus
    ],
    colorOptions: [
      { name: 'Ice Grey Metallic with Pyro Red Decals', hex: '#cfd4d8', image: CAR_IMAGES.porscheGt3rs },
      { name: 'Guards Red with Carbon Package', hex: '#d91b24', image: CAR_IMAGES.paganiUtopia },
      { name: 'Python Green Bespoke', hex: '#16a34a', image: CAR_IMAGES.lamborghiniUrus }
    ],
    specs: {
      engine: '4.0L High-Revving Naturally Aspirated Boxer-6',
      powerHp: 525,
      powerKw: 386,
      torqueNm: 465,
      acceleration0to100: 3.2,
      topSpeedKmh: 296,
      transmission: 'Dual-Clutch',
      drivetrain: 'Rear-Wheel Drive with Electronic LSD',
      fuelType: 'Petrol',
      curbWeightKg: 1450,
      displacementCc: '3,996 cc',
      fuelEconomy: '13.4 L / 100 km'
    },
    dimensions: {
      lengthMm: 4572,
      widthMm: 1900,
      heightMm: 1322,
      wheelbaseMm: 2457
    },
    features: [
      'Active Drag Reduction System (DRS) operated from steering wheel',
      '860 kg downforce generated at 285 km/h (twice as much as its predecessor)',
      'Four rotary switches on steering wheel for Rebound, Compression, PTV+, and Traction Control',
      'Full carbon-fiber reinforced plastic (CFRP) doors, front fenders, roof, and hood',
      'PCCB Porsche Ceramic Composite Brakes with bespoke yellow 6-piston calipers'
    ],
    soundProfile: {
      engineType: 'flat-6',
      idleRpm: 950,
      redlineRpm: 9000,
      soundFrequencyBase: 180,
      rumbleIntensity: 0.88
    },
    showroomLocation: 'Zurich Private Salon'
  },
  {
    id: 'ferrari-sf90-xx-stradale',
    name: 'Ferrari SF90 XX Stradale',
    brand: 'Ferrari',
    modelYear: 2025,
    category: 'Hypercar',
    priceUsd: 890000,
    badge: 'Rare Allocation',
    isFeatured: true,
    tagline: 'Track-Bred Corse Clienti Legend Unleashed for the Road',
    description: 'The first road-legal XX model in Maranello’s storied history. Delivering 1,030 cv through a twin-turbo V8 integrated with three electric motors, featuring a fixed rear wing reminiscent of the iconic F40 and patented Ferrari Extra Boost logic.',
    provenance: '1 of only 799 Coupes built worldwide. Ferrari Classiche pre-certified and registered in Maranello registry.',
    heroImage: CAR_IMAGES.ferrariSf90,
    galleryImages: [
      CAR_IMAGES.ferrariSf90,
      CAR_IMAGES.astonMartinDbs,
      CAR_IMAGES.galleryRear,
      CAR_IMAGES.galleryCockpit
    ],
    colorOptions: [
      { name: 'Rosso Corsa Lucido with Giallo Modena Accents', hex: '#d00000', image: CAR_IMAGES.ferrariSf90 },
      { name: 'Bianco Artico with Exposed Carbon', hex: '#f8fafc', image: CAR_IMAGES.astonMartinDbs },
      { name: 'Nero Daytona Satin', hex: '#1c1917', image: CAR_IMAGES.galleryRear }
    ],
    specs: {
      engine: '3.9L 90° Twin-Turbo V8 + 3 Electric Motors',
      powerHp: 1030,
      powerKw: 758,
      torqueNm: 804,
      acceleration0to100: 2.3,
      topSpeedKmh: 320,
      transmission: 'Dual-Clutch',
      drivetrain: 'e4WD Electric All-Wheel Drive',
      fuelType: 'Hybrid',
      curbWeightKg: 1560,
      displacementCc: '3,990 cc',
      fuelEconomy: '8.2 L / 100 km (Hybrid Mode)'
    },
    dimensions: {
      lengthMm: 4850,
      widthMm: 2014,
      heightMm: 1225,
      wheelbaseMm: 2650
    },
    features: [
      '530 kg of downforce at 250 km/h via fixed racing rear wing and blown shut-off Gurney',
      'Ferrari Extra Boost system provides short bursts of maximum electrical thrust out of apexes',
      'Carbon fiber race bucket seats with bespoke Alcantara laser perforations',
      'ABS EVO controller for ultra-late braking precision',
      'Integrated telemetry system with onboard track camera logging'
    ],
    soundProfile: {
      engineType: 'v8-twin-turbo',
      idleRpm: 800,
      redlineRpm: 8000,
      soundFrequencyBase: 145,
      rumbleIntensity: 0.92
    },
    showroomLocation: 'Dubai Marina Showroom'
  },
  {
    id: 'koenigsegg-jesko-absolut',
    name: 'Koenigsegg Jesko Absolut',
    brand: 'Koenigsegg',
    modelYear: 2025,
    category: 'Hypercar',
    priceUsd: 3850000,
    badge: 'Rare Allocation',
    isFeatured: true,
    tagline: 'The Fastest Koenigsegg That Will Ever Be Built — 530+ km/h Target',
    description: 'Engineered in Ängelholm, Sweden to shatter all earthly land-speed records. With an ultra-low drag coefficient of just 0.278 Cd, the Jesko Absolut channels up to 1,600 hp on E85 biofuel through the revolutionary 9-speed Light Speed Transmission (LST) with 7 wet clutches.',
    provenance: 'Christian von Koenigsegg verified build sheet. Custom carbon weave finish with 24k gold leaf striping.',
    heroImage: CAR_IMAGES.koenigseggJesko,
    galleryImages: [
      CAR_IMAGES.koenigseggJesko,
      CAR_IMAGES.galleryCockpit,
      CAR_IMAGES.galleryRear,
      CAR_IMAGES.porscheGt3rs
    ],
    colorOptions: [
      { name: 'Raw Naked Carbon with Tang Orange Accents', hex: '#262626', image: CAR_IMAGES.koenigseggJesko },
      { name: 'Crystal White with 24k Gold Flake', hex: '#f1f5f9', image: CAR_IMAGES.galleryCockpit },
      { name: 'Swedish Imperial Blue', hex: '#1e3a8a', image: CAR_IMAGES.galleryRear }
    ],
    specs: {
      engine: '5.0L Twin-Turbo Flat-Plane Crank V8 with 20-bar Air Injection',
      powerHp: 1600,
      powerKw: 1193,
      torqueNm: 1500,
      acceleration0to100: 2.5,
      topSpeedKmh: 531,
      transmission: 'Direct Drive',
      drivetrain: 'Rear-Wheel Drive with Koenigsegg Electronic Differential',
      fuelType: 'Petrol',
      curbWeightKg: 1390,
      displacementCc: '5,065 cc',
      fuelEconomy: '16.0 L / 100 km'
    },
    dimensions: {
      lengthMm: 4845,
      widthMm: 2030,
      heightMm: 1210,
      wheelbaseMm: 2700
    },
    features: [
      'Patented 9-speed Light Speed Transmission (shifts between any gear instantaneously with zero delay)',
      '180-degree flat-plane crankshaft weighing just 12.5 kg (the world’s lightest V8 crank)',
      'Patented Triplex damper suspension with horizontal rear damper to eliminate squat',
      'Koenigsegg Autoskin automated pneumatic opening of doors, front hood, and rear clamshell',
      'SmartCenter touchscreen and SmartCluster instrument screen that rotates with the steering wheel'
    ],
    soundProfile: {
      engineType: 'v8-twin-turbo',
      idleRpm: 900,
      redlineRpm: 8500,
      soundFrequencyBase: 140,
      rumbleIntensity: 0.98
    },
    showroomLocation: 'Beverly Hills Sanctuary'
  },
  {
    id: 'pagani-utopia',
    name: 'Pagani Utopia',
    brand: 'Pagani',
    modelYear: 2025,
    category: 'Hypercar',
    priceUsd: 2950000,
    badge: 'Heritage Vault',
    isFeatured: true,
    tagline: 'Art and Science in Pure Harmony — 7-Speed Gated Manual V12',
    description: 'Conceived over six rigorous years by Horacio Pagani, Utopia shuns screens and hybrid weight in favor of romantic tactile purity. Powered by a bespoke 6.0-liter Mercedes-AMG twin-turbo V12 producing 864 hp, mated to an open-gate manual transmission with exposed linkage.',
    provenance: '1 of 99 coupes constructed in San Cesario sul Panaro. Bespoke Pagani Rinascimento certified.',
    heroImage: CAR_IMAGES.paganiUtopia,
    galleryImages: [
      CAR_IMAGES.paganiUtopia,
      CAR_IMAGES.bugattiTourbillon,
      CAR_IMAGES.galleryRear,
      CAR_IMAGES.astonMartinDbs
    ],
    colorOptions: [
      { name: 'Rinascimento Silver & Cognac Leather', hex: '#94a3b8', image: CAR_IMAGES.paganiUtopia },
      { name: 'Exposed Carbo-Titanium & Claret', hex: '#3f1d24', image: CAR_IMAGES.bugattiTourbillon },
      { name: 'Giallo Modena Pure Gloss', hex: '#eab308', image: CAR_IMAGES.galleryRear }
    ],
    specs: {
      engine: '6.0L Mercedes-AMG Twin-Turbo 60° V12',
      powerHp: 864,
      powerKw: 635,
      torqueNm: 1100,
      acceleration0to100: 2.8,
      topSpeedKmh: 380,
      transmission: 'Manual',
      drivetrain: 'Rear-Wheel Drive with Mechanical Limited-Slip Differential',
      fuelType: 'Petrol',
      curbWeightKg: 1280,
      displacementCc: '5,980 cc',
      fuelEconomy: '15.2 L / 100 km'
    },
    dimensions: {
      lengthMm: 4655,
      widthMm: 2060,
      heightMm: 1165,
      wheelbaseMm: 2795
    },
    features: [
      'Open-gate 7-speed manual gearbox with exposed polished mechanical linkages',
      'Carbo-Titanium HP62 G2 and Carbo-Triax HP62 monocoque chassis offering 38% higher torsional rigidity',
      'Four titanium exhaust pipes with ceramic coating and signature four-pipe quad collector',
      'Pure analog dial instrument cluster illuminated like haute horlogerie',
      'Forged aluminum double-wishbone suspension connected directly to carbon tubs'
    ],
    soundProfile: {
      engineType: 'v12-high-rev',
      idleRpm: 800,
      redlineRpm: 6700,
      soundFrequencyBase: 120,
      rumbleIntensity: 0.90
    },
    showroomLocation: 'London Mayfair Gallery'
  },
  {
    id: 'rolls-royce-cullinan-black-badge',
    name: 'Rolls-Royce Cullinan Series II Black Badge',
    brand: 'Rolls-Royce',
    modelYear: 2025,
    category: 'Luxury SUV',
    priceUsd: 520000,
    badge: 'Available',
    isFeatured: true,
    tagline: 'The King of Luxury SUVs — Dark, Menacing, Effortless',
    description: 'The definitive luxury all-terrain motor car, reimagined in the subversive alter-ego of Black Badge. Featuring dark-chrome Pantheon grille, illuminated Spirit of Ecstasy in high-gloss black, and a twin-turbocharged 6.75-liter V12 delivering relentless torque with whisper-quiet serenity.',
    provenance: 'Commissioned through Goodwood Bespoke Studio. Starlight headliner with shooting star animation.',
    heroImage: CAR_IMAGES.rollsRoyceCullinan,
    galleryImages: [
      CAR_IMAGES.rollsRoyceCullinan,
      CAR_IMAGES.galleryRear,
      CAR_IMAGES.bugattiTourbillon,
      CAR_IMAGES.galleryCockpit
    ],
    colorOptions: [
      { name: 'Diamond Black with Mandarin Orange Coachline', hex: '#0a0a0a', image: CAR_IMAGES.rollsRoyceCullinan },
      { name: 'Tempest Grey with Forge Yellow Interior', hex: '#4b5563', image: CAR_IMAGES.galleryRear },
      { name: 'English White with Navy Leather', hex: '#f8fafc', image: CAR_IMAGES.bugattiTourbillon }
    ],
    specs: {
      engine: '6.75L Twin-Turbocharged V12',
      powerHp: 600,
      powerKw: 441,
      torqueNm: 900,
      acceleration0to100: 4.8,
      topSpeedKmh: 250,
      transmission: 'Automatic',
      drivetrain: 'Permanent All-Wheel Drive & All-Wheel Steering',
      fuelType: 'Petrol',
      curbWeightKg: 2750,
      displacementCc: '6,749 cc',
      fuelEconomy: '16.3 L / 100 km'
    },
    dimensions: {
      lengthMm: 5341,
      widthMm: 2000,
      heightMm: 1835,
      wheelbaseMm: 3295
    },
    features: [
      'Bespoke Starlight Headliner hand-woven with 1,344 fiber optic lights and shooting star effects',
      'Rear Viewing Suite: Two electronically deployable leather seats and cocktail table emerge from tailgate',
      'Magic Carpet Ride suspension with stereo camera scanning road terrain ahead',
      'Duality Twill bamboo fabric interior option utilizing 2.2 million stitches',
      'Self-righting wheel center caps ensuring Rolls-Royce monogram remains vertical at all times'
    ],
    soundProfile: {
      engineType: 'v12-high-rev',
      idleRpm: 600,
      redlineRpm: 5500,
      soundFrequencyBase: 85,
      rumbleIntensity: 0.50
    },
    showroomLocation: 'Dubai Marina Showroom'
  },
  {
    id: 'rimac-nevera-time-attack',
    name: 'Rimac Nevera Time Attack',
    brand: 'Rimac',
    modelYear: 2025,
    category: 'Hypercar',
    priceUsd: 2500000,
    badge: 'Rare Allocation',
    isFeatured: true,
    tagline: 'Record-Shattering 1,914 HP Electric Phenomenon',
    description: 'Holder of over 20 global acceleration and braking records, including the Nürburgring EV lap record. Powered by four independent bespoke surface-mounted electric motors producing a staggering 1,914 horsepower and 2,360 Nm of instantaneous torque.',
    provenance: '1 of 12 Time Attack Edition units in Squadron Black with Lightning Green aero graphics. Rimac factory telemetry certified.',
    heroImage: CAR_IMAGES.rimacNevera,
    galleryImages: [
      CAR_IMAGES.rimacNevera,
      CAR_IMAGES.bugattiTourbillon,
      CAR_IMAGES.galleryRear,
      CAR_IMAGES.galleryCockpit
    ],
    colorOptions: [
      { name: 'Squadron Black & Lightning Green', hex: '#121212', image: CAR_IMAGES.rimacNevera },
      { name: 'Glacier Blue Metallic', hex: '#0284c7', image: CAR_IMAGES.bugattiTourbillon },
      { name: 'Galactic Silver with Raw Carbon', hex: '#e2e8f0', image: CAR_IMAGES.galleryRear }
    ],
    specs: {
      engine: '4 Surface-Mounted Permanent Magnet E-Motors',
      powerHp: 1914,
      powerKw: 1408,
      torqueNm: 2360,
      acceleration0to100: 1.81,
      topSpeedKmh: 412,
      transmission: 'Direct Drive',
      drivetrain: 'Rimac All-Wheel Torque Vectoring (R-AWTV 2)',
      fuelType: 'Electric',
      curbWeightKg: 2300,
      displacementCc: 'Electric Battery: 120 kWh',
      fuelEconomy: '490 km WLTP Range'
    },
    dimensions: {
      lengthMm: 4750,
      widthMm: 1986,
      heightMm: 1208,
      wheelbaseMm: 2745
    },
    features: [
      'World record 0-400-0 km/h in 29.93 seconds',
      'Rimac All-Wheel Torque Vectoring system calculates torque distribution 100 times per second per wheel',
      'Bespoke 120 kWh liquid-cooled battery with 500kW fast-charging capability (0-80% in 19 min)',
      'Carbon-fiber monocoque including integrated structural battery pack forming the stiffest structure (70,000 Nm/deg)',
      'Autonomous Driving Coach AI system utilizing 12 ultrasonic sensors, 13 cameras, and 6 radars'
    ],
    soundProfile: {
      engineType: 'quad-motor-electric',
      idleRpm: 0,
      redlineRpm: 17500,
      soundFrequencyBase: 280,
      rumbleIntensity: 0.65
    },
    showroomLocation: 'Zurich Private Salon'
  },
  {
    id: 'lamborghini-urus-performante',
    name: 'Lamborghini Urus Performante',
    brand: 'Lamborghini',
    modelYear: 2025,
    category: 'Luxury SUV',
    priceUsd: 285000,
    badge: 'Available',
    isFeatured: false,
    tagline: 'Super Sport Dynamics Meets Uncompromising All-Terrain Dominance',
    description: 'Lowered, widened, and sharpened with extensive carbon fiber bodywork. Urus Performante broke the Pikes Peak International Hill Climb record in the production SUV category with a time of 10:32.064. Armed with titanium Akrapovič exhaust and dedicated RALLY drive mode.',
    provenance: 'Finished in Giallo Inti with Nero Ade Sportivo Alcantara. Lamborghini Squadra Corse telemetry integrated.',
    heroImage: CAR_IMAGES.lamborghiniUrus,
    galleryImages: [
      CAR_IMAGES.lamborghiniUrus,
      CAR_IMAGES.rollsRoyceCullinan,
      CAR_IMAGES.galleryRear,
      CAR_IMAGES.galleryCockpit
    ],
    colorOptions: [
      { name: 'Giallo Inti with Carbon Fiber Hood', hex: '#facc15', image: CAR_IMAGES.lamborghiniUrus },
      { name: 'Verde Mantis Metallic', hex: '#22c55e', image: CAR_IMAGES.rollsRoyceCullinan },
      { name: 'Nero Noctis Matte Finish', hex: '#171717', image: CAR_IMAGES.galleryRear }
    ],
    specs: {
      engine: '4.0L Twin-Turbocharged 90° V8',
      powerHp: 666,
      powerKw: 490,
      torqueNm: 850,
      acceleration0to100: 3.3,
      topSpeedKmh: 306,
      transmission: 'Automatic',
      drivetrain: 'Permanent 4WD with Active Torque Vectoring',
      fuelType: 'Petrol',
      curbWeightKg: 2150,
      displacementCc: '3,996 cc',
      fuelEconomy: '14.1 L / 100 km'
    },
    dimensions: {
      lengthMm: 5137,
      widthMm: 2026,
      heightMm: 1618,
      wheelbaseMm: 3006
    },
    features: [
      'Pikes Peak record-holding SUV configuration with -20mm lowered steel spring suspension',
      'Lightweight titanium Akrapovič exhaust system with signature acoustic harmonics',
      'Carbon fiber vented hood and carbon roof panel reducing center of gravity',
      'New RALLY mode engineered specifically for oversteer dirt track excitement',
      '23-inch Pelope diamond-cut lightweight alloy wheels with titanium bolts'
    ],
    soundProfile: {
      engineType: 'v8-twin-turbo',
      idleRpm: 800,
      redlineRpm: 6800,
      soundFrequencyBase: 130,
      rumbleIntensity: 0.94
    },
    showroomLocation: 'Monaco Private Vault'
  },
  {
    id: 'aston-martin-dbs-770-ultimate',
    name: 'Aston Martin DBS 770 Ultimate',
    brand: 'Aston Martin',
    modelYear: 2024,
    category: 'Grand Tourer',
    priceUsd: 420000,
    badge: 'Heritage Vault',
    isFeatured: false,
    tagline: 'Ferocious Elegance — The Grand Finale of the Twin-Turbo V12 Dynasty',
    description: 'The swan song for Aston Martin’s flagship Super GT. Boosting power to 770 PS, with recalibrated 8-speed ZF transmission, solid-mounted steering column for surgical tactile feedback, and horseshoe hood louvre that enhances cooling while commanding supreme respect.',
    provenance: '1 of 300 Coupes globally. Aston Martin Q Commission bespoke luggage set included.',
    heroImage: CAR_IMAGES.astonMartinDbs,
    galleryImages: [
      CAR_IMAGES.astonMartinDbs,
      CAR_IMAGES.galleryCockpit,
      CAR_IMAGES.galleryRear,
      CAR_IMAGES.porscheGt3rs
    ],
    colorOptions: [
      { name: 'British Racing Green Satin & Bronze Accents', hex: '#14532d', image: CAR_IMAGES.astonMartinDbs },
      { name: 'Ultramarine Black Pearl', hex: '#0f172a', image: CAR_IMAGES.galleryCockpit },
      { name: 'Xenon Grey Metallic', hex: '#475569', image: CAR_IMAGES.galleryRear }
    ],
    specs: {
      engine: '5.2L Quad-Cam 48-Valve Twin-Turbo V12',
      powerHp: 770,
      powerKw: 566,
      torqueNm: 900,
      acceleration0to100: 3.4,
      topSpeedKmh: 340,
      transmission: 'Automatic',
      drivetrain: 'Rear-Wheel Drive with Mechanical LSD',
      fuelType: 'Petrol',
      curbWeightKg: 1845,
      displacementCc: '5,204 cc',
      fuelEconomy: '13.8 L / 100 km'
    },
    dimensions: {
      lengthMm: 4715,
      widthMm: 1970,
      heightMm: 1285,
      wheelbaseMm: 2805
    },
    features: [
      'Solid-mounted steering column increasing front-end lateral stiffness by 25%',
      'Signature horseshoe engine bay vent extracting airflow at high speed',
      'Sports Plus seats trimmed in full semi-aniline leather and Alcantara with fluted quilting',
      'Bespoke 21-inch multi-spoke wheel design inspired by the Valkyrie and Victor hypercars',
      'Standard Carbon Ceramic Brakes (CCB) with 410mm front and 360mm rear discs'
    ],
    soundProfile: {
      engineType: 'v12-high-rev',
      idleRpm: 750,
      redlineRpm: 7000,
      soundFrequencyBase: 110,
      rumbleIntensity: 0.91
    },
    showroomLocation: 'London Mayfair Gallery'
  },
  {
    id: 'mclaren-750s-spider',
    name: 'McLaren 750S Spider',
    brand: 'McLaren',
    modelYear: 2025,
    category: 'Supercar',
    priceUsd: 350000,
    badge: 'Available',
    isFeatured: false,
    tagline: 'Benchmark Performance Elevated — 30 kg Lighter Than the Renowned 720S',
    description: 'Lighter, more powerful, and laser-focused. With 750 PS from its mid-mounted 4.0-liter twin-turbo V8, carbon fibre Monocage II-S structure, and Retractable Hard Top that opens or closes in an astonishing 11 seconds at speeds up to 50 km/h.',
    provenance: 'Single owner, McLaren Senna carbon bucket seats, telemetry pack, front axle lift.',
    heroImage: CAR_IMAGES.mclaren750s,
    galleryImages: [
      CAR_IMAGES.mclaren750s,
      CAR_IMAGES.bugattiTourbillon,
      CAR_IMAGES.galleryCockpit,
      CAR_IMAGES.porscheGt3rs
    ],
    colorOptions: [
      { name: 'Papaya Orange Heritage', hex: '#ea580c', image: CAR_IMAGES.mclaren750s },
      { name: 'Sarigan Quartz Metallic', hex: '#64748b', image: CAR_IMAGES.bugattiTourbillon },
      { name: 'Volcano Red Tinted Lacquer', hex: '#991b1b', image: CAR_IMAGES.porscheGt3rs }
    ],
    specs: {
      engine: '4.0L Twin-Turbocharged Flat-Plane M840T V8',
      powerHp: 750,
      powerKw: 552,
      torqueNm: 800,
      acceleration0to100: 2.8,
      topSpeedKmh: 332,
      transmission: 'Dual-Clutch',
      drivetrain: 'Rear-Wheel Drive with Brake Steer',
      fuelType: 'Petrol',
      curbWeightKg: 1389,
      displacementCc: '3,994 cc',
      fuelEconomy: '12.2 L / 100 km'
    },
    dimensions: {
      lengthMm: 4569,
      widthMm: 1930,
      heightMm: 1196,
      wheelbaseMm: 2670
    },
    features: [
      'Proactive Chassis Control III (PCC III) linking hydraulic suspension with bespoke spring tuning',
      'Retractable Hard Top (RHT) activates in just 11 seconds with electrochromic glazed glass option',
      'Formula 1-inspired central exit stainless steel exhaust saving 2.2 kg and enhancing high-frequency resonance',
      'Super-lightweight forged 10-spoke turbine wheels (saving 13.8 kg across the set)',
      'McLaren Control Launcher (MCL) allowing one-touch recall of favorite aerodynamic setups'
    ],
    soundProfile: {
      engineType: 'v8-twin-turbo',
      idleRpm: 850,
      redlineRpm: 8500,
      soundFrequencyBase: 160,
      rumbleIntensity: 0.89
    },
    showroomLocation: 'Beverly Hills Sanctuary'
  },
  {
    id: 'mercedes-maybach-s680',
    name: 'Mercedes-Maybach S 680 4MATIC',
    brand: 'Mercedes-Maybach',
    modelYear: 2025,
    category: 'Ultra-Luxury',
    priceUsd: 245000,
    badge: 'Available',
    isFeatured: false,
    tagline: 'The Zenith of First-Class Travel — Handcrafted 6.0L Biturbo V12',
    description: 'The definitive expression of executive distinction and acoustic silence. Equipped with executive first-class rear suite with calf massage, active road noise cancellation through 30 Burmester High-End 4D speakers, and automated comfort doors operated via gesture.',
    provenance: 'Manufaktur Kalahari Gold two-tone paintwork. Full nappa leather including headliner and pillars.',
    heroImage: CAR_IMAGES.mercedesMaybach,
    galleryImages: [
      CAR_IMAGES.mercedesMaybach,
      CAR_IMAGES.bugattiTourbillon,
      CAR_IMAGES.galleryRear,
      CAR_IMAGES.galleryCockpit
    ],
    colorOptions: [
      { name: 'Kalahari Gold over Onyx Black Two-Tone', hex: '#ca8a04', image: CAR_IMAGES.mercedesMaybach },
      { name: 'Obsidian Black Metallic Pure', hex: '#18181b', image: CAR_IMAGES.bugattiTourbillon },
      { name: 'High-Tech Silver & Nautic Blue Two-Tone', hex: '#3b82f6', image: CAR_IMAGES.galleryRear }
    ],
    specs: {
      engine: '6.0L Biturbo Handcrafted V12 (M279)',
      powerHp: 621,
      powerKw: 457,
      torqueNm: 900,
      acceleration0to100: 4.5,
      topSpeedKmh: 250,
      transmission: 'Automatic',
      drivetrain: '4MATIC All-Wheel Drive with Rear-Axle Steering (10°)',
      fuelType: 'Petrol',
      curbWeightKg: 2350,
      displacementCc: '5,980 cc',
      fuelEconomy: '13.3 L / 100 km'
    },
    dimensions: {
      lengthMm: 5469,
      widthMm: 1921,
      heightMm: 1510,
      wheelbaseMm: 3396
    },
    features: [
      'Burmester® High-End 4D Surround Sound System (30 speakers, 1,750 watts)',
      'Active Road Noise Compensation generating counter-phase sound waves in real time',
      'Electrically operated comfort rear doors with MBUX gesture control integration',
      'Refrigerated rear compartment with custom silver-plated champagne flutes and holder',
      'E-ACTIVE BODY CONTROL predictive suspension with curve tilting function'
    ],
    soundProfile: {
      engineType: 'v12-high-rev',
      idleRpm: 600,
      redlineRpm: 6200,
      soundFrequencyBase: 80,
      rumbleIntensity: 0.40
    },
    showroomLocation: 'Zurich Private Salon'
  },
  {
    id: 'ferrari-purosangue',
    name: 'Ferrari Purosangue',
    brand: 'Ferrari',
    modelYear: 2025,
    category: 'Luxury SUV',
    priceUsd: 430000,
    badge: 'Rare Allocation',
    isFeatured: false,
    tagline: 'Four Doors, Four Seats, One Pure Naturally Aspirated V12 Soul',
    description: 'Ferrari’s very first four-door four-seater creation. Not an ordinary SUV, but a genuine Maranello thoroughbred equipped with a 725 cv 6.5-liter naturally aspirated V12, rear-hinged welcome doors, and world-first Multimatic active spool-valve suspension.',
    provenance: 'VIP client factory allocation. Rosso Portofino with Cuoio full-grain leather cabin.',
    heroImage: CAR_IMAGES.ferrariPurosangue,
    galleryImages: [
      CAR_IMAGES.ferrariPurosangue,
      CAR_IMAGES.astonMartinDbs,
      CAR_IMAGES.porscheGt3rs,
      CAR_IMAGES.galleryCockpit
    ],
    colorOptions: [
      { name: 'Rosso Portofino Metallic', hex: '#991b1b', image: CAR_IMAGES.ferrariPurosangue },
      { name: 'Grigio Titanio Metallic', hex: '#64748b', image: CAR_IMAGES.astonMartinDbs },
      { name: 'Nero Purosangue Diamond Flake', hex: '#0f172a', image: CAR_IMAGES.porscheGt3rs }
    ],
    specs: {
      engine: '6.5L Naturally Aspirated 65° V12 (F140IA)',
      powerHp: 725,
      powerKw: 533,
      torqueNm: 716,
      acceleration0to100: 3.3,
      topSpeedKmh: 310,
      transmission: 'Dual-Clutch',
      drivetrain: '4RM-S evo All-Wheel Drive with Independent 4-Wheel Steering',
      fuelType: 'Petrol',
      curbWeightKg: 2033,
      displacementCc: '6,496 cc',
      fuelEconomy: '17.1 L / 100 km'
    },
    dimensions: {
      lengthMm: 4973,
      widthMm: 2028,
      heightMm: 1589,
      wheelbaseMm: 3018
    },
    features: [
      'Welcome rear-hinged doors opening to 73 degrees for theatrical cabin ingress',
      'World-first Ferrari Active Suspension Technology enabled by Multimatic 48V electric spool-valve dampers',
      'Mid-front engine layout with rear transaxle achieving an ideal 49:51 weight distribution',
      'Four individually heated and ventilated electric bucket seats with independent climate zones',
      'Carbon fiber roof panel as standard providing rigid structural protection while saving 20% weight'
    ],
    soundProfile: {
      engineType: 'v12-high-rev',
      idleRpm: 850,
      redlineRpm: 8250,
      soundFrequencyBase: 150,
      rumbleIntensity: 0.93
    },
    showroomLocation: 'Dubai Marina Showroom'
  }
];

export const BRANDS_DATA = [
  {
    name: 'Bugatti',
    country: 'France',
    flag: '🇫🇷',
    foundingYear: 1909,
    logo: 'EB',
    heroCarId: 'bugatti-tourbillon',
    description: 'Pur Sang automotive art from Molsheim. The benchmark for peerless luxury, record-breaking speed, and horological craftsmanship.',
    totalModels: 1
  },
  {
    name: 'Ferrari',
    country: 'Italy',
    flag: '🇮🇹',
    foundingYear: 1939,
    logo: '🐎',
    heroCarId: 'ferrari-sf90-xx-stradale',
    description: 'The Prancing Horse of Maranello. Synonymous with Formula 1 glory, passionate racing DNA, and aerodynamic mastery.',
    totalModels: 2
  },
  {
    name: 'Porsche',
    country: 'Germany',
    flag: '🇩🇪',
    foundingYear: 1931,
    logo: '🛡️',
    heroCarId: 'porsche-911-gt3-rs',
    description: 'Engineering excellence honed in Weissach and Flacht. Unrivaled track precision, driver purity, and daily usability.',
    totalModels: 1
  },
  {
    name: 'Koenigsegg',
    country: 'Sweden',
    flag: '🇸🇪',
    foundingYear: 1994,
    logo: '👻',
    heroCarId: 'koenigsegg-jesko-absolut',
    description: 'Ängelholm ghosts conquering physics. World leaders in extreme speed, patented megacar transmissions, and composite materials.',
    totalModels: 1
  },
  {
    name: 'Pagani',
    country: 'Italy',
    flag: '🇮🇹',
    foundingYear: 1992,
    logo: '⚜️',
    heroCarId: 'pagani-utopia',
    description: 'Horacio Pagani’s synthesis of art and science. Bespoke hand-built carbon-titanium sculptures powered by Mercedes-AMG V12 hearts.',
    totalModels: 1
  },
  {
    name: 'Rolls-Royce',
    country: 'United Kingdom',
    flag: '🇬🇧',
    foundingYear: 1906,
    logo: 'RR',
    heroCarId: 'rolls-royce-cullinan-black-badge',
    description: 'The standard of the world. Hand-built in Goodwood, England, offering serenity, magic-carpet ride, and bespoke luxury without equal.',
    totalModels: 1
  },
  {
    name: 'Rimac',
    country: 'Croatia',
    flag: '🇭🇷',
    foundingYear: 2009,
    logo: '⚡',
    heroCarId: 'rimac-nevera-time-attack',
    description: 'Pioneers of hyper-electric performance. Pushing the boundaries of electric motors, software torque vectoring, and battery technology.',
    totalModels: 1
  },
  {
    name: 'Aston Martin',
    country: 'United Kingdom',
    flag: '🇬🇧',
    foundingYear: 1913,
    logo: '🪶',
    heroCarId: 'aston-martin-dbs-770-ultimate',
    description: 'Power, beauty, and soul from Gaydon. British grand touring royalty commanding timeless elegance with aggressive twin-turbo V12 rumble.',
    totalModels: 1
  },
  {
    name: 'McLaren',
    country: 'United Kingdom',
    flag: '🇬🇧',
    foundingYear: 1963,
    logo: '🏎️',
    heroCarId: 'mclaren-750s-spider',
    description: 'Woking Formula 1 technology brought to the road. Carbon monocoque pioneers dedicated to lightweight agility and telepathic steering.',
    totalModels: 1
  },
  {
    name: 'Mercedes-Maybach',
    country: 'Germany',
    flag: '🇩🇪',
    foundingYear: 1921,
    logo: '👑',
    heroCarId: 'mercedes-maybach-s680',
    description: 'Ultimate distinction and peerless executive craftsmanship. Whisper-quiet V12 comfort built for connoisseurs of the finer things in life.',
    totalModels: 1
  }
];

export const SHOWROOM_LOCATIONS = [
  {
    id: 'monaco',
    name: 'Aura Vault Monaco',
    city: 'Monte Carlo, Monaco',
    address: 'Place du Casino 14, 98000 Monaco',
    phone: '+377 98 06 20 00',
    hours: 'Mon - Sat: 10:00 - 20:00 (By VIP Appointment)',
    image: SHOWROOM_IMAGES.monaco
  },
  {
    id: 'dubai',
    name: 'Aura Sanctuary Dubai',
    city: 'Dubai Marina & DIFC, UAE',
    address: 'Gate Precinct 4, Level 5, DIFC, Dubai',
    phone: '+971 4 362 7000',
    hours: 'Sun - Fri: 11:00 - 22:00 (Concierge Active 24/7)',
    image: SHOWROOM_IMAGES.dubai
  },
  {
    id: 'london',
    name: 'Aura Gallery Mayfair',
    city: 'London, United Kingdom',
    address: '25 Berkeley Square, Mayfair, London W1J 6HN',
    phone: '+44 20 7493 0000',
    hours: 'Mon - Fri: 09:30 - 18:30',
    image: SHOWROOM_IMAGES.london
  },
  {
    id: 'beverly-hills',
    name: 'Aura Beverly Hills',
    city: 'Los Angeles, California',
    address: '9600 Wilshire Blvd, Beverly Hills, CA 90212',
    phone: '+1 310 550 4000',
    hours: 'Mon - Sat: 10:00 - 19:00',
    image: SHOWROOM_IMAGES.beverlyHills
  },
  {
    id: 'zurich',
    name: 'Aura Alpine Salon',
    city: 'Zurich, Switzerland',
    address: 'Bahnhofstrasse 45, 8001 Zürich',
    phone: '+41 44 211 5000',
    hours: 'Mon - Sat: 09:00 - 19:00',
    image: SHOWROOM_IMAGES.zurich
  }
];

export const TESTIMONIALS_DATA = [
  {
    id: 't1',
    clientName: 'Lord Alistair Sterling',
    title: 'Private Collector & Horology Patron',
    location: 'London & Saint-Tropez',
    avatar: AVATAR_IMAGES.client1,
    quote: 'Acquiring my Bugatti Tourbillon allocation through Aura Motors was an experience of absolute perfection. Their concierge arranged private helicopter transport to Molsheim for my factory spec commissioning. Unrivaled discretion.',
    carPurchased: 'Bugatti Tourbillon (Allocation #47)',
    rating: 5
  },
  {
    id: 't2',
    clientName: 'Dr. Elena Rostova',
    title: 'Tech Founder & Endurance Driver',
    location: 'Zurich, Switzerland',
    avatar: AVATAR_IMAGES.client2,
    quote: 'The comparison tool on Aura Motors helped my team evaluate downforce dynamics between the 911 GT3 RS and SF90 XX. The delivery arrived at my Alpine chalet within 72 hours, enclosed in climate-controlled transport.',
    carPurchased: 'Porsche 911 GT3 RS (Weissach Package)',
    rating: 5
  },
  {
    id: 't3',
    clientName: 'Tariq Al-Maktoum',
    title: 'Managing Partner, Sovereign Capital',
    location: 'Dubai, UAE',
    avatar: AVATAR_IMAGES.client3,
    quote: 'Aura Motors is the only boutique that understands the expectations of serious collectors. Their escrow verification and instant multi-currency settlement in AED made the transaction utterly seamless.',
    carPurchased: 'Koenigsegg Jesko Absolut',
    rating: 5
  }
];

export const FAQ_DATA = [
  {
    question: 'How does Aura Motors verify the authenticity and provenance of rare hypercars?',
    answer: 'Every vehicle in the Aura collection undergoes a 180-point forensic inspection by our master mechanics and factory historians. We cross-reference chassis numbers, paint depth, engine telemetry, and factory service registries with manufacturers in Maranello, Weissach, Molsheim, and Ängelholm. Every purchase includes an immutable certificate of provenance.'
  },
  {
    question: 'Can I schedule an international private viewing or test drive?',
    answer: 'Yes. For qualified collectors, we arrange private viewings at our salons in Monaco, Dubai, London, Zurich, or Beverly Hills. Alternatively, our white-glove logistics team can fly the car and concierge directly to your private estate or local circuit.'
  },
  {
    question: 'What financing, lease, and payment methods do you support?',
    answer: 'We provide bespoke ultra-high-net-worth financing structures through premier private banking partners with rates starting at 4.2% APR, custom lease terms from 12 to 60 months, international wire transfers in USD, EUR, GBP, CHF, and AED, as well as institutional-grade cryptocurrency escrow via audited custodian vaults.'
  },
  {
    question: 'How is international delivery and importation handled?',
    answer: 'Aura Motors manages end-to-end global white-glove transport via sealed, climate-controlled air freight or dedicated transporters. We handle all customs documentation, ATA Carnets, luxury tax structuring, and direct delivery to your garage or yacht berth.'
  },
  {
    question: 'Can Aura Motors source off-market vehicles not listed on the website?',
    answer: 'Yes. Through our private VIP desk and confidential relationships with racing dynasties and elite collectors, we have access to off-market unicorn allocations including McLaren F1, Ferrari 250 GTO, and Bugatti Bolide. Simply contact our VIP Concierge.'
  }
];
