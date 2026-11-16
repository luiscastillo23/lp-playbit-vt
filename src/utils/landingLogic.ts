export interface HardwareFinish {
  id: 'signal-orange' | 'raw-cream' | 'anodized-carbon';
  index: string;
  name: string;
  code: string;
  frontHex: string;
  backHex: string;
  accentHex: string;
  shellMaterial: string;
  finishNote: string;
}

export interface HardwareSubsystem {
  id: 'display' | 'controls' | 'acoustics' | 'cartridge';
  index: string;
  title: string;
  subtitle: string;
  summary: string;
  keyMetricLabel: string;
  keyMetricValue: string;
  specs: { label: string; value: string }[];
}

export type GameCategory = 'all' | 'arcade' | 'puzzle' | 'rpg' | 'racing';

export interface GameCartridge {
  id: string;
  code: string;
  title: string;
  studio: string;
  category: Exclude<GameCategory, 'all'>;
  categoryLabel: string;
  releaseYear: string;
  romSize: string;
  frameRate: string;
  resolution: string;
  shellColor: 'orange' | 'cream' | 'smoked';
  priceUsd: number;
  synopsis: string;
  features: string[];
  accentColor: string;
}

export interface BatteryConfig {
  brightnessPercent: number; // 20 to 100
  audioOutput: 'speaker' | 'headphones' | 'muted';
  shaderMode: '8bit-native' | 'crt-scanline' | '16bit-overclock';
}

export interface BatteryEstimate {
  runtimeHours: number;
  standbyDays: number;
  powerDrawMilliwatts: number;
  fastChargeMinutesTo80: number;
}

export interface StoreEdition {
  id: 'standard' | 'founders' | 'devkit';
  index: string;
  name: string;
  tagline: string;
  priceUsd: number;
  batchAllocation: string;
  shippingWindow: string;
  includedItems: string[];
}

export interface StoreAccessory {
  id: string;
  name: string;
  specSummary: string;
  priceUsd: number;
}

export interface ReservationInput {
  fullName: string;
  email: string;
  inquiryType: 'preorder' | 'studio-contact';
  editionId: StoreEdition['id'];
  finishId: HardwareFinish['id'];
  accessoryIds: string[];
  notes?: string;
}

export interface ValidationResult {
  valid: boolean;
  errors: {
    fullName?: string;
    email?: string;
  };
}

export const HARDWARE_FINISHES: HardwareFinish[] = [
  {
    id: 'signal-orange',
    index: '01',
    name: 'Signal Orange / Cream',
    code: 'PB-01-ORG',
    frontHex: '#F5EFE6',
    backHex: '#F85E10',
    accentHex: '#F85E10',
    shellMaterial: ' Bead-blasted polycarbonate + CNC 6061 aluminum chassis',
    finishNote: 'Signature launch colorway pairing warm archival cream with high-visibility international orange.',
  },
  {
    id: 'raw-cream',
    index: '02',
    name: 'Archival Putty / Stone',
    code: 'PB-02-CRM',
    frontHex: '#FBF8F3',
    backHex: '#CEC8C2',
    accentHex: '#181615',
    shellMaterial: 'Unbleached matte mineral-filled ABS + brushed steel fasteners',
    finishNote: 'Monochrome studio edition inspired by mid-century acoustic Braun and Dieter Rams instruments.',
  },
  {
    id: 'anodized-carbon',
    index: '03',
    name: 'Anodized Carbon / Copper',
    code: 'PB-03-BLK',
    frontHex: '#1E1E1E',
    backHex: '#141414',
    accentHex: '#F85E10',
    shellMaterial: 'Hard-anodized Type III dark alloy + smoked translucent rear bay',
    finishNote: 'Low-reflectance night session chassis with laser-etched legends and orange tactile action domes.',
  },
];

export const HARDWARE_SUBSYSTEMS: HardwareSubsystem[] = [
  {
    id: 'display',
    index: '01',
    title: 'Zero-Gap Laminated Square OLED',
    subtitle: '720 × 720 Integer-Scaled Pixel Grid',
    summary:
      'Custom 3.5-inch 1:1 aspect ratio LTPO OLED panel optically bonded to anti-reflective Gorilla Glass. Delivers exact 3x, 4x, and 5x integer scaling for classic handheld and arcade ratios with zero sub-pixel blur.',
    keyMetricLabel: 'Peak Contrast & Refresh',
    keyMetricValue: '120Hz · 600 nits',
    specs: [
      { label: 'Resolution', value: '720 × 720 px (291 PPI)' },
      { label: 'Color Gamut', value: '100% DCI-P3 · 10-bit LUT' },
      { label: 'Response Time', value: '0.1 ms GtG' },
    ],
  },
  {
    id: 'controls',
    index: '02',
    title: 'Tactile Micro-Switch Input Deck',
    subtitle: '0.2mm Actuation Precision D-Pad',
    summary:
      'Engineered with Japanese Omron gold-plated dome switches and a stainless-steel central pivot ball that prevents accidental cardinal diagonals during frame-critical platforming and shmups.',
    keyMetricLabel: 'Switch Lifecycle',
    keyMetricValue: '10,000,000 Cycles',
    specs: [
      { label: 'Actuation Force', value: '55 gf ± 5 gf' },
      { label: 'Polling Rate', value: '1000 Hz native USB/FPGA bus' },
      { label: 'Keycap Material', value: 'Double-shot PBT UV-stable' },
    ],
  },
  {
    id: 'acoustics',
    index: '03',
    title: 'Dual-Chamber Acoustic Synthesizer',
    subtitle: '24-Bit / 96kHz Cirrus Logic DAC',
    summary:
      'Front-firing 21-point CNC micro-perforated speaker grille backed by a sealed 1.8cc resonance chamber and dedicated hardware FM/wavetable audio co-processor.',
    keyMetricLabel: 'Signal-to-Noise Ratio',
    keyMetricValue: '114 dB SNR',
    specs: [
      { label: 'Transducer', value: '2W Neodymium planar driver' },
      { label: 'Line Out', value: '3.5mm TRS + USB-C UAC 2.0' },
      { label: 'Synth Voices', value: '8-channel hardware chiptune DSP' },
    ],
  },
  {
    id: 'cartridge',
    index: '04',
    title: 'Hot-Swap Gold Edge Cartridge Bay',
    subtitle: '48-Pin Zero-Latency FRAM Bus',
    summary:
      'Instant boot in under 380 milliseconds directly from physical solid-state cartridges. Save states write to battery-free ferroelectric RAM rated for 100+ years of archival retention.',
    keyMetricLabel: 'Cold Boot Latency',
    keyMetricValue: '0.38 Seconds',
    specs: [
      { label: 'Connector', value: '48-pin 30µ" hard gold fingers' },
      { label: 'Save Storage', value: '2 MB non-volatile FRAM' },
      { label: 'Insertion Cycles', value: '25,000+ physical swaps' },
    ],
  },
];

export const GAME_CARTRIDGES: GameCartridge[] = [
  {
    id: 'orbital-drive',
    code: 'CART-01',
    title: 'Orbital Drive',
    studio: 'Klangwerk Tokyo',
    category: 'racing',
    categoryLabel: 'Zero-G Anti-Gravity Racing',
    releaseYear: '2026',
    romSize: '64 MB FRAM',
    frameRate: '120 FPS',
    resolution: '720 × 720 Native',
    shellColor: 'orange',
    priceUsd: 39,
    synopsis:
      'Pilot high-thrust orbital skiffs across 18 low-atmosphere ring circuits with real-time vector lighting and a reactive 4-operator FM synth soundtrack.',
    features: ['120Hz Vector Mode', 'Ghost Time Trials', 'Link-Cable 2P Split'],
    accentColor: '#F85E10',
  },
  {
    id: 'neon-arcade',
    code: 'CART-02',
    title: 'Neon Arcade',
    studio: 'Studio Polygon Stockholm',
    category: 'arcade',
    categoryLabel: 'Tactical Bullet-Hell Anthology',
    releaseYear: '2026',
    romSize: '32 MB FRAM',
    frameRate: '120 FPS',
    resolution: '720 × 720 Native',
    shellColor: 'cream',
    priceUsd: 34,
    synopsis:
      'Four bespoke vertical arcade cabinets on a single cartridge featuring hardware-timed hit-stop, zero input lag, and online leaderboard verification via QR.',
    features: ['Zero-Frame Input', 'Tate Mode Support', '4 Original Cabinets'],
    accentColor: '#181615',
  },
  {
    id: 'void-runner',
    code: 'CART-03',
    title: 'Void Runner',
    studio: 'Atelier Mono Zurich',
    category: 'puzzle',
    categoryLabel: 'Architectural Logic & Stealth',
    releaseYear: '2026',
    romSize: '48 MB FRAM',
    frameRate: '60 FPS',
    resolution: '720 × 720 Native',
    shellColor: 'smoked',
    priceUsd: 36,
    synopsis:
      'Navigate shifting brutalist megastructures by manipulating phase-shifted shadows and acoustic resonance triggers across 90 hand-crafted chambers.',
    features: ['90 Logic Chambers', 'Custom Level Editor', 'Smoked Clear Shell'],
    accentColor: '#F85E10',
  },
  {
    id: 'stardust-risen',
    code: 'CART-04',
    title: 'Stardust Risen',
    studio: 'Vespera Craft Osaka',
    category: 'rpg',
    categoryLabel: 'Isometric Mecha Action RPG',
    releaseYear: '2026',
    romSize: '128 MB FRAM',
    frameRate: '60 FPS',
    resolution: '720 × 720 Native',
    shellColor: 'orange',
    priceUsd: 44,
    synopsis:
      'Scavenge ancient orbital derelicts, rewire modular mech cores, and restore a silent solar colony in a 35-hour hand-pixelated sci-fi epic.',
    features: ['35-Hour Campaign', 'Modular Mech Foundry', 'Battery-Free FRAM Saves'],
    accentColor: '#F85E10',
  },
  {
    id: 'chrono-circuit',
    code: 'CART-05',
    title: 'Chrono Circuit',
    studio: 'Nordic Bit Collective',
    category: 'racing',
    categoryLabel: 'Precision Touge Time-Attack',
    releaseYear: '2026',
    romSize: '64 MB FRAM',
    frameRate: '120 FPS',
    resolution: '720 × 720 Native',
    shellColor: 'cream',
    priceUsd: 38,
    synopsis:
      'Master weight-transfer drift physics across mist-shrouded mountain passes with dynamic weather transitions and frame-accurate telemetry replays.',
    features: ['120Hz Physics Tick', 'Telemetry Analyzer', '24 Mountain Stages'],
    accentColor: '#181615',
  },
  {
    id: 'klang-synth-8',
    code: 'CART-06',
    title: 'Klang Synth-8',
    studio: 'PLAYBIT Audio Lab',
    category: 'puzzle',
    categoryLabel: 'Sequencer & Generative Rhythm',
    releaseYear: '2026',
    romSize: '64 MB FRAM',
    frameRate: '120 FPS',
    resolution: '720 × 720 Native',
    shellColor: 'smoked',
    priceUsd: 42,
    synopsis:
      'Turn PLAYBIT into a pocket polyphonic step-sequencer and algorithmic rhythm puzzle workstation with USB-C MIDI out and live D-pad parameter modulation.',
    features: ['USB-C MIDI Out', '16-Track Sequencer', '80 Rhythm Challenges'],
    accentColor: '#F85E10',
  },
];

export const STORE_EDITIONS: StoreEdition[] = [
  {
    id: 'standard',
    index: '01',
    name: 'PLAYBIT Core Console',
    tagline: 'Essential pocket hardware + 1 launch cartridge',
    priceUsd: 199,
    batchAllocation: 'Batch 01 · Ships Q4 2026',
    shippingWindow: '14-Day Studio Dispatch',
    includedItems: [
      'PLAYBIT Handheld Console (Choice of Finish)',
      'Orbital Drive Physical Launch Cartridge',
      'Braided 1.5m International Orange USB-C Cable',
      'Serialized Aluminum Inspection Card',
    ],
  },
  {
    id: 'founders',
    index: '02',
    name: 'Founder’s Collector Pack',
    tagline: 'Complete launch ecosystem + magnetic desk dock + 4 cartridges',
    priceUsd: 289,
    batchAllocation: 'Numbered / 1,500 Units Worldwide',
    shippingWindow: 'Priority Batch 01 Dispatch',
    includedItems: [
      'PLAYBIT Handheld Console (Laser-Engraved Serial #)',
      'CNC Aluminum Magnetic Desktop Charging Dock',
      'Full 4-Cartridge Launch Box Set (Orbital, Neon, Void, Stardust)',
      'Ballistic Nylon & EVA Molded Field Case',
    ],
  },
  {
    id: 'devkit',
    index: '03',
    name: 'Studio SDK & Flash Kit',
    tagline: 'Hardware debugger + refillable FRAM cartridges for indie creators',
    priceUsd: 359,
    batchAllocation: 'Developer Allocation · Open SDK',
    shippingWindow: 'Express 7-Day Studio Dispatch',
    includedItems: [
      'PLAYBIT Console with Unlocked JTAG / UART Telemetry Header',
      'USB-C Cartridge Flasher Dock + 2 Blank 128MB FRAM Cartridges',
      'PLAYBIT C / Lua / Zig SDK Documentation Manual',
      'CNC Aluminum Magnetic Desktop Charging Dock',
    ],
  },
];

export const STORE_ACCESSORIES: StoreAccessory[] = [
  {
    id: 'magnetic-dock',
    name: 'CNC Magnetic Desktop Dock',
    specSummary: 'Machined 6061 aluminum · Pogo-pin fast charge + HDMI/USB-C passthrough',
    priceUsd: 59,
  },
  {
    id: 'cartridge-quad-pack',
    name: 'Launch 4-Cartridge Collection',
    specSummary: 'Orbital Drive, Neon Arcade, Void Runner, and Stardust Risen physical ROMs',
    priceUsd: 119,
  },
  {
    id: 'field-case',
    name: 'Hardshell Acoustic Field Case',
    specSummary: 'Water-resistant ripstop shell with 4-slot cartridge organizer',
    priceUsd: 39,
  },
];

export function filterGameCartridges(
  cartridges: GameCartridge[],
  category: GameCategory,
  searchQuery: string = ''
): GameCartridge[] {
  const normalizedQuery = searchQuery.trim().toLowerCase();
  return cartridges.filter((game) => {
    const matchesCategory = category === 'all' || game.category === category;
    if (!matchesCategory) return false;
    if (!normalizedQuery) return true;
    return (
      game.title.toLowerCase().includes(normalizedQuery) ||
      game.studio.toLowerCase().includes(normalizedQuery) ||
      game.categoryLabel.toLowerCase().includes(normalizedQuery)
    );
  });
}

export function calculateBatteryEstimate(config: BatteryConfig): BatteryEstimate {
  const clampedBrightness = Math.max(20, Math.min(100, config.brightnessPercent));
  // Battery capacity: 14,800 mWh (4000 mAh @ 3.7V)
  const batteryCapacityMwh = 14800;

  const baseSoCMw = 620;
  const displayMw = 220 + (clampedBrightness / 100) * 580;

  const audioMw =
    config.audioOutput === 'speaker'
      ? 240
      : config.audioOutput === 'headphones'
      ? 75
      : 15;

  const shaderMw =
    config.shaderMode === '8bit-native'
      ? 0
      : config.shaderMode === 'crt-scanline'
      ? 210
      : 460;

  const totalMw = Math.round(baseSoCMw + displayMw + audioMw + shaderMw);
  const rawHours = batteryCapacityMwh / totalMw;
  const runtimeHours = Math.round(rawHours * 10) / 10;

  return {
    runtimeHours,
    standbyDays: 28,
    powerDrawMilliwatts: totalMw,
    fastChargeMinutesTo80: 38,
  };
}

export function calculateOrderBreakdown(
  editionId: StoreEdition['id'],
  accessoryIds: string[],
  editions: StoreEdition[] = STORE_EDITIONS,
  accessories: StoreAccessory[] = STORE_ACCESSORIES
): {
  editionPrice: number;
  accessoriesPrice: number;
  shippingPrice: number;
  totalPrice: number;
} {
  const edition = editions.find((e) => e.id === editionId) ?? editions[0];
  const editionPrice = edition ? edition.priceUsd : 199;

  const accessoriesPrice = accessoryIds.reduce((sum, id) => {
    const item = accessories.find((a) => a.id === id);
    return sum + (item ? item.priceUsd : 0);
  }, 0);

  const subtotal = editionPrice + accessoriesPrice;
  const shippingPrice = subtotal >= 250 ? 0 : 12;

  return {
    editionPrice,
    accessoriesPrice,
    shippingPrice,
    totalPrice: subtotal + shippingPrice,
  };
}

export function validateReservationInput(input: ReservationInput): ValidationResult {
  const errors: ValidationResult['errors'] = {};
  const trimmedName = input.fullName.trim();
  const trimmedEmail = input.email.trim();

  if (trimmedName.length < 2) {
    errors.fullName = 'Please enter your full name (at least 2 characters).';
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(trimmedEmail)) {
    errors.email = 'Please enter a valid email address for dispatch confirmation.';
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}
