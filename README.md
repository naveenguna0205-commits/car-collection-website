# AURA MOTORS — The Sovereign Automotive Vault

A modern, ultra-premium, and fully responsive luxury car collection web application built with **React.js**, **Tailwind CSS**, and **Framer Motion** (pure JavaScript / JSX, no TypeScript).

---

## 🏎️ Features & Modules Implemented

### 1. Cinematic Hero Section
- Dynamic multi-car slider showcasing flagship allocations (Bugatti Tourbillon, Koenigsegg Jesko Absolut, Ferrari SF90 XX Stradale, Pagani Utopia).
- **Interactive Engine Acoustic Synthesizer** (Web Audio API) with realistic engine idle and rev harmonics.
- Live Telemetry HUD Bar (Horsepower, 0–100 km/h acceleration, Top Speed, Powertrain format).
- Allocation badges, currency valuations, and direct inspection CTAs.

### 2. Sovereign Car Collection Gallery
- **Live Search & Autocomplete**: Search by model, marque, engine type (V12, Cosworth, V8, Flat-6, EV), or power.
- **Multi-Faceted Filtering**:
  - Category Pills (All, Hypercar, Supercar, Grand Tourer, Luxury SUV, Ultra-Luxury) with real-time count badges.
  - Manufacturer Selector (Bugatti, Ferrari, Porsche, Koenigsegg, Pagani, Rolls-Royce, Rimac, Aston Martin, McLaren, Mercedes-Maybach).
  - Price Range Slider ($200,000 to $5,000,000+).
  - Minimum Horsepower Filter (0 to 1,800+ HP).
  - Powertrain Architecture (Petrol, Hybrid, Electric).
- **Multi-Mode Sorting**: Price (Asc/Desc), Horsepower (Max to Min), 0–100 km/h (Fastest to Slowest), Year (Newest).
- **Three Layout View Modes**: 3-Column Responsive Grid, Cinema Wide Showcase, and Detailed Executive List view.

### 3. Interactive Car Details Experience
- **High-Resolution Multi-Angle Image Gallery** with thumbnail picker.
- **Bespoke Exterior Paint Configurator**: Switch between authentic factory liveries with interactive color swatch buttons.
- **Engine Sound Studio & Tachometer**:
  - Press "IGNITE ENGINE" to start the engine.
  - Press & hold "HOLD THROTTLE TO REV" to climb through the RPM spectrum up to 9,000 RPM with interactive tachometer needle and audio frequency modulation.
- **Comprehensive Technical Specification Sheet**: Powertrain architecture, performance dynamics, chassis dimensions, and curb weight.
- **Private Client Financing & Lease Estimator**: Custom sliders for down payment %, financing terms (12, 24, 36, 48 months), and APR interest rate with instant monthly payment calculation.
- One-click PDF Dossier download & link share.

### 4. Automotive Comparison Arena
- Floating Dock at the bottom of the screen when vehicles are selected.
- Benchmark up to 4 vehicles side-by-side.
- Automated highlight badges indicating class-leading stats (🏆 Best HP, ⚡ Fastest 0-100, 🔥 Highest Top Speed, 🌱 Lightest Mass).
- Visual comparison bar charts.
- Add or remove vehicles directly from within the arena.

### 5. Private Vault (Wishlist & Favorites)
- Persistent in browser `localStorage`.
- Heart toggles on every vehicle card with animated feedback.
- Dedicated slide-over drawer displaying saved vehicles, valuations, and quick booking triggers.

### 6. VIP Experience & Test Drive Booking
- 4-Step private reservation wizard:
  1. Vehicle & Private Salon Selection (Monaco, Dubai, London, Beverly Hills, Zurich)
  2. Date & Dedicated VIP Slot (Morning Champagne Reception, Afternoon Session, Sunset Run, Evening Gala) with complimentary Maybach chauffeur pickup toggle
  3. Client Credentials & Refreshment Preferences
  4. Confirmation Voucher with unique reference code (`AUR-XXXXXX`) and celebration confetti animation!

### 7. Brands & Categories Directory
- Interactive brand cards with country flags, founding years, heritage overviews, and direct halo car inspection.
- Distinct category cards highlighting each automotive segment.

### 8. Heritage, Testimonials, FAQ & Showrooms
- **Heritage & Provenance**: 180-point forensic certification, climate-controlled storage, and escrow guarantees.
- **Patron Testimonials**: Verified client reviews and acquired allocations.
- **Interactive FAQ Accordion**: Global shipping, air transport, escrow, crypto settlement, and off-market sourcing.
- **Global Showrooms Locator**: Interactive selector for Monte Carlo, Dubai, London, Beverly Hills, and Zurich with address, direct hotline, opening hours, and direct inquiry form.
- **Footer**: Newsletter subscription ("The Sovereign Dispatch"), currency switcher (USD, EUR, GBP, AED), and legal provisions.

---

## 🛠️ Tech Stack

- **React 18** (Pure JavaScript / JSX)
- **Vite 6** (Blazing-fast build tool)
- **Tailwind CSS 3** (Custom luxury dark palette: Obsidian Carbon, Liquid Gold, Racing Crimson, Electric Cyan)
- **Framer Motion** (Smooth transitions, spring animations, and micro-interactions)
- **Lucide React** (Modern automotive and luxury iconography)
- **Canvas Confetti** (Celebratory VIP booking confirmation)
- **Web Audio API** (Procedural engine acoustics synthesizer)

---

## 🚀 Getting Started

```bash
# 1. Install dependencies
npm install

# 2. Run local development server
npm run dev

# 3. Build for production
npm run build

# 4. Preview production build
npm run preview
```

