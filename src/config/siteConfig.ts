export interface CartridgeGame {
  id: string;
  title: string;
  studio: string;
  category: 'arcade' | 'rpg' | 'synth';
  categoryLabel: string;
  year: string;
  fps: string;
  romSize: string;
  resolution: string;
  price: number;
  summary: string;
  accentColor: string;
  secondaryColor: string;
  telemetryCode: string;
  controlsHint: string;
}

export interface HardwareCapability {
  index: string;
  title: string;
  subtitle: string;
  description: string;
  metricValue: string;
  metricUnit: string;
  metricContext: string;
  span: 'wide' | 'normal';
  diagramType: 'fpga' | 'oled' | 'switches' | 'audio';
}

export interface EngineeringProof {
  quote: string;
  author: string;
  role: string;
  organization: string;
  beforeAfterMetric: string;
}

export interface SpecItem {
  label: string;
  value: string;
  detail: string;
}

export interface SpecCategory {
  id: 'display' | 'silicon' | 'controls' | 'power' | 'enclosure';
  label: string;
  summary: string;
  items: SpecItem[];
}

export interface ConsoleEdition {
  id: string;
  name: string;
  finish: string;
  price: number;
  shippingBatch: string;
  shellGradient: string;
  frameColor: string;
  buttonAccent: string;
  inBox: string[];
  description: string;
}

export interface StoreAccessory {
  id: string;
  name: string;
  meta: string;
  price: number;
  description: string;
}

export const siteConfig = {
  brand: 'PLAYBIT',
  editionKicker: '2026 Founders Production Run · Batch 04',
  navItems: [
    { label: 'Console', id: 'console', href: '#console' },
    { label: 'Architecture', id: 'architecture', href: '#architecture' },
    { label: 'Games', id: 'games', href: '#games' },
    { label: 'Specs', id: 'specs', href: '#specs' },
    { label: 'Store', id: 'store', href: '#store' },
  ],
  headline: {
    line1: 'Pocket-Sized',
    line2: 'FPGA Retro Console',
    line3: 'Built From Solid Alloy',
  },
  description:
    'Hardware-level transistor synthesis meets a 3.5-inch 1600×1440 LTPO OLED display. Zero software emulation lag, physical FRAM cartridges, and custom Kailh mechanical switches in a 195g anodized chassis.',
  ctas: {
    primary: 'Reserve Unit — $189',
    secondary: 'Interactive Cartridge Demo',
  },
  heroMetrics: [
    {
      value: '1600×1440',
      label: '3.5" LTPO OLED · 571 PPI',
      context: '10× integer scaling for classic 160×144 handheld grids',
    },
    {
      value: '0.08 ms',
      label: 'Sub-Frame Input Latency',
      context: 'Direct Cyclone V FPGA hardware bus polling at 8,000 Hz',
    },
    {
      value: '59.7275 Hz',
      label: 'Crystal Oscillator Sync',
      context: 'Cycle-exact quartz clock matching original 1989–1998 timings',
    },
    {
      value: '14.5 hrs',
      label: 'Continuous Cartridge Play',
      context: '4,200 mAh high-density Li-Po cell with 30W USB-C PD fast charge',
    },
  ],
  capabilities: [
    {
      index: '01. Dual-Cyclone FPGA Hardware Synthesis',
      title: 'Transistor-Level Accuracy Without Software Emulation',
      subtitle: 'Altera Cyclone V 49K Logic Elements · Dedicated Cartridge Bus',
      description:
        'Instead of translating old CPU instructions in software, PLAYBIT configures 49,000 physical logic elements in real time to become the original host circuit board. Sprites, scanline interrupts, and DMA transfers execute on parallel silicon pathways.',
      metricValue: '0.08 ms',
      metricUnit: 'End-to-End Poll to Photon',
      metricContext: '98.4% lower input latency compared to Linux ARM software handhelds (5.2 ms average)',
      span: 'wide',
      diagramType: 'fpga',
    },
    {
      index: '02. 3.5-Inch Sapphire-Laminated LTPO OLED',
      title: '1600×1440 Native Pixel Grid With Hardware Sub-Pixel Masks',
      subtitle: '650 Nits Peak Brightness · 100% DCI-P3 · Anti-Reflective Etch',
      description:
        'Custom-cut 10:9 aspect ratio panel delivers an exact 10× integer multiple of classic handheld resolutions. Toggle hardware-rendered phosphor triad, dot-matrix LCD shadow, or razor-sharp raw pixels without frame buffering.',
      metricValue: '571 PPI',
      metricUnit: 'Zero-Blur Integer Scaling',
      metricContext: '1,000,000:1 contrast ratio with hardware scanline insertion at 120 Hz',
      span: 'normal',
      diagramType: 'oled',
    },
    {
      index: '03. Tactile Kailh Low-Profile Mechanical Controls',
      title: 'Pivot-Sphere D-Pad & Gold-Plated Action Micro-Switches',
      subtitle: '55gf Actuation Force · 0.8mm Pre-Travel · Rated for 30M Presses',
      description:
        'Every directional diagonal and action tap registers on precision-binned mechanical domes seated in an isolated stainless steel mid-plate, eliminating false diagonals during high-speed arcade shmups and fighting combos.',
      metricValue: '30M',
      metricUnit: 'Actuation Lifecycle',
      metricContext: '0.15 mm actuation tolerance across A, B, X, Y and shoulder triggers',
      span: 'normal',
      diagramType: 'switches',
    },
    {
      index: '04. Discrete 6-Operator FM & Chiptune Audio Engine',
      title: 'Burr-Brown 32-Bit DAC + Built-In 16-Track Hardware Tracker',
      subtitle: '118 dB SNR Headphone Stage · MIDI Over USB-C & 3.5mm TRS',
      description:
        'Designed in collaboration with chiptune composers in Tokyo and Stockholm. Drive studio planar headphones directly or sequence live pulse, wavetable, and FM patches using the onboard BitSynth workstation cartridge.',
      metricValue: '118 dB',
      metricUnit: 'Signal-to-Noise Ratio',
      metricContext: 'Dedicated low-noise linear regulator isolates audio rails from digital switching noise',
      span: 'wide',
      diagramType: 'audio',
    },
  ] as HardwareCapability[],
  engineeringProofs: [
    {
      quote:
        'Testing frame-by-frame with a 1,000 fps high-speed camera confirmed PLAYBIT matches original 1992 Japanese arcade PCB frame delivery within 40 nanoseconds—completely eliminating the 3-frame audio/visual drift we saw on ARM emulators.',
      author: 'Kenji Takahashi',
      role: 'Lead Preservation Engineer',
      organization: 'Akihabara Arcade Archive Foundation',
      beforeAfterMetric: '3.2 frames lag reduced to 0.00 frames vs original PCB hardware',
    },
    {
      quote:
        'Using PLAYBIT as a portable FM synth module on stage replaced two rack units in my live rig. The Burr-Brown DAC floor is dead silent even when patched directly into a club PA system at +4 dBu.',
      author: 'Astrid Lindqvist',
      role: 'Hardware Synth Designer & Performing Artist',
      organization: 'Nordic Waveform Lab, Stockholm',
      beforeAfterMetric: '-104 dBu noise floor measured under full 6-operator FM polyphony',
    },
    {
      quote:
        'Shipping our 16-bit racing title on physical FRAM cartridges with PLAYBIT SDK cut save-state write times to 12 microseconds with zero battery-backed SRAM degradation over a 40-year retention window.',
      author: 'Marcus Vance',
      role: 'Co-Founder & Technical Director',
      organization: 'Sunburst Interactive Munich',
      beforeAfterMetric: '+210% physical collector cartridge sell-through in 4 weeks',
    },
  ] as EngineeringProof[],
  games: [
    {
      id: 'chrono-drift',
      title: 'Chrono Drift 1989',
      studio: 'Sunburst Interactive',
      category: 'arcade',
      categoryLabel: '16-Bit Arcade Racer',
      year: '2026',
      fps: '60.0 FPS',
      romSize: '64 MB FRAM',
      resolution: '320×288 Integer',
      price: 39,
      summary:
        'Outrun the twilight coastal expressway across 18 branching mountain stages. Uses PLAYBIT custom Super-Scaler FPGA core for 60 fps sprite road banking and 6-channel FM synth soundtrack.',
      accentColor: '#F85E10',
      secondaryColor: '#1E293B',
      telemetryCode: 'CORE: SCALER-16 // CLK: 16.77 MHz',
      controlsHint: 'D-Pad: Steer Car · A: Turbo Boost · B: Downshift Drift',
    },
    {
      id: 'solaris-striker',
      title: 'Solaris Striker DX',
      studio: 'Kurogane Works Tokyo',
      category: 'arcade',
      categoryLabel: 'Vertical Bullet-Hell Shmup',
      year: '2026',
      fps: '60.0 FPS',
      romSize: '48 MB FRAM',
      resolution: '320×288 Integer',
      price: 42,
      summary:
        'Pilot the orbital interceptor VF-09 through dense plasma patterns above a binary star. Engineered specifically for PLAYBIT 10:9 vertical viewport with zero sprite-per-scanline flicker.',
      accentColor: '#EA580C',
      secondaryColor: '#0F172A',
      telemetryCode: 'CORE: SHMUP-V2 // SPRITES: 256/LINE',
      controlsHint: 'D-Pad: Thruster Vector · A: Plasma Vulcan · B:EMP Shield',
    },
    {
      id: 'clockwork-citadel',
      title: 'Clockwork Citadel',
      studio: 'Atelier Varnish',
      category: 'rpg',
      categoryLabel: 'Isometric Tactical RPG',
      year: '2026',
      fps: '60.0 FPS',
      romSize: '128 MB FRAM',
      resolution: '400×360 Integer',
      price: 45,
      summary:
        'Command a guild of automaton clockmakers inside a shifting mechanical mountain fortress. Manipulate gear elevation, wind direction, and chronometer turns across 45 hand-pixelated chapters.',
      accentColor: '#D97706',
      secondaryColor: '#1C1917',
      telemetryCode: 'CORE: ISO-TACTIC // SAVE: FRAM 64KB',
      controlsHint: 'D-Pad: Move Cursor · A: Inspect Gear · B: Rotate Elevation',
    },
    {
      id: 'bitsynth-fm8',
      title: 'BitSynth Studio FM-8',
      studio: 'Nordic Waveform Lab',
      category: 'synth',
      categoryLabel: 'Hardware Chiptune Workstation',
      year: '2026',
      fps: '120 Hz UI',
      romSize: '32 MB FRAM',
      resolution: '800×720 Hi-DPI',
      price: 49,
      summary:
        'Turn your PLAYBIT into a stage-ready 16-step tracker and 6-operator FM synthesizer. Export lossless 24-bit WAV stems or sync live with modular Eurorack hardware via 3.5mm TRS clock out.',
      accentColor: '#10B981',
      secondaryColor: '#090D16',
      telemetryCode: 'CORE: DSP-FM6 // DAC: 192kHz 32-BIT',
      controlsHint: 'D-Pad: Step Frequency · A: Trigger Arpeggio · B: Modulate Filter',
    },
    {
      id: 'kuroshio-express',
      title: 'Kuroshio Rail Sim 94',
      studio: 'Shinbashi Digital',
      category: 'rpg',
      categoryLabel: 'Precision Railway Simulation',
      year: '2026',
      fps: '60.0 FPS',
      romSize: '64 MB FRAM',
      resolution: '320×288 Integer',
      price: 38,
      summary:
        'Master timetable braking curves, coastal rain adhesion, and cab signaling along 240 km of authentic 1994 Japanese coastal commuter lines with real recorded traction motor acoustics.',
      accentColor: '#0284C7',
      secondaryColor: '#0F172A',
      telemetryCode: 'CORE: RAIL-cab // PHYSICS: 1000Hz',
      controlsHint: 'D-Pad: Master Controller Notch · A: Horn · B: ATS Brake Reset',
    },
    {
      id: 'hyper-prism',
      title: 'Hyper Prism Logic',
      studio: 'Bauhaus Pixel Collective',
      category: 'synth',
      categoryLabel: 'Optical Laser Puzzle',
      year: '2026',
      fps: '60.0 FPS',
      romSize: '16 MB FRAM',
      resolution: '800×720 Hi-DPI',
      price: 29,
      summary:
        'Refract monochromatic beams through dichromatic mirrors, delay prisms, and logic gates across 150 minimalist architectural chambers accompanied by a generative ambient score.',
      accentColor: '#8B5CF6',
      secondaryColor: '#18181B',
      telemetryCode: 'CORE: OPTIC-8 // RAY-STEPS: 64',
      controlsHint: 'D-Pad: Select Prism · A: Rotate 45° · B: Pulse Emitter',
    },
  ] as CartridgeGame[],
  specCategories: [
    {
      id: 'display',
      label: 'Display & Optics',
      summary: 'Custom 10:9 LTPO OLED bonded directly to 0.7mm Gorilla Glass Victus with zero air gap.',
      items: [
        { label: 'Panel Technology', value: '3.5" Custom LTPO AMOLED', detail: 'Diamond-free RGB stripe sub-pixel matrix' },
        { label: 'Native Resolution', value: '1600 × 1440 px (571 PPI)', detail: 'Exact 10× integer scale of 160×144' },
        { label: 'Refresh Rate', value: '30 Hz – 120 Hz Variable', detail: 'Hardware cycle-sync to cartridge quartz clock' },
        { label: 'Peak Luminance', value: '650 cd/m² (Nits)', detail: '1,000,000:1 contrast with 100% DCI-P3 coverage' },
        { label: 'Optical Lamination', value: 'Micro-Etched Sapphire Coat', detail: 'Reduces ambient surface reflection by 78%' },
      ],
    },
    {
      id: 'silicon',
      label: 'Dual-FPGA Architecture',
      summary: 'Dedicated Altera Cyclone V core for game hardware synthesis paired with a system supervisor FPGA.',
      items: [
        { label: 'Primary Core FPGA', value: 'Altera Cyclone V 5CEBA4', detail: '49,000 Logic Elements · 3.1 Mbits Embedded RAM' },
        { label: 'System Supervisor', value: 'Lattice MachXO3LF', detail: 'Handles instant sleep/wake state & CRT scaler masks' },
        { label: 'Memory Subsystem', value: '2 × 64 MB Cellular PSRAM', detail: 'Zero-wait-state 166 MHz synchronous bus' },
        { label: 'Cartridge Bus Interface', value: '44-Pin Gold-Plated Edge', detail: 'Auto-switching 3.3V / 5.0V hardware level shifters' },
        { label: 'Clock Generator', value: 'Programmable Fractional PLL', detail: 'Sub-picosecond jitter across PAL/NTSC/Handheld clocks' },
      ],
    },
    {
      id: 'controls',
      label: 'Controls & Audio DSP',
      summary: 'Tournament-grade Kailh tactile switches paired with an isolated audiophile Burr-Brown DAC.',
      items: [
        { label: 'Directional Pad', value: 'CNC Stainless Pivot-Sphere', detail: '4-way independent Kailh GM 2.0 tactile micro-switches' },
        { label: 'Action & Shoulder Buttons', value: 'Double-Shot PBT Caps', detail: '55gf actuation force · 0.8 mm travel distance' },
        { label: 'Digital-to-Analog Audio', value: 'TI Burr-Brown PCM5122', detail: '32-bit / 384 kHz DAC · 118 dB dynamic range' },
        { label: 'Speaker Array', value: 'Front-Firing NdFeB Chamber', detail: '1.8W linear acoustic suspension enclosure' },
        { label: 'Studio Sync I/O', value: '3.5mm Stereo + MIDI TRS', detail: 'Configurable as analog headphone out or DIN-Sync clock' },
      ],
    },
    {
      id: 'power',
      label: 'Power & Connectivity',
      summary: 'All-day high-density battery with pass-through desktop dock output and lossless 2.4 GHz link.',
      items: [
        { label: 'Battery Chemistry', value: '4,200 mAh High-Density Li-Po', detail: '16.17 Wh user-replaceable 4-screw pack' },
        { label: 'Battery Runtime', value: '14.5 Hours (Play) / 400 Hrs (Sleep)', detail: 'Measured at 250 nits with cartridge active' },
        { label: 'Charging Protocol', value: 'USB-C PD 3.0 (30W Max)', detail: '0% to 80% charge in 38 minutes; bypass mode supported' },
        { label: 'Local Multiplayer Link', value: 'Sub-1ms 2.4 GHz RF + Link Port', detail: 'Up to 4 consoles in peer-to-peer lockstep' },
        { label: 'External Display Out', value: 'DisplayPort 1.4 over USB-C', detail: '4K 60Hz integer output via optional Aluminum Dock' },
      ],
    },
    {
      id: 'enclosure',
      label: 'Chassis & Dimensions',
      summary: 'bead-blasted 6061-T6 aluminum unibody front shell with high-grip polycarbonate cartridge bay.',
      items: [
        { label: 'Dimensions (H × W × D)', value: '138.0 × 88.5 × 19.2 mm', detail: 'Ergonomic recessed rear index finger contours' },
        { label: 'Total Weight', value: '195 Grams (6.87 oz)', detail: 'Balanced 50/50 center of gravity across D-Pad axis' },
        { label: 'Primary Chassis Material', value: 'CNC 6061-T6 Anodized Alloy', detail: 'Ceramic micro-bead blasted to 1.2 Ra surface finish' },
        { label: 'Thermal Design', value: 'Fanless Copper Vapor Spreader', detail: 'Maintains external shell under 33°C during 4-hour play' },
        { label: 'Environmental Compliance', value: 'RoHS 3 · CE · FCC · TELEC', detail: 'Modular repairability score 9.4 / 10 (standard Torx T6)' },
      ],
    },
  ] as SpecCategory[],
  editions: [
    {
      id: 'sand-alloy',
      name: 'PLAYBIT Sand Alloy',
      finish: 'Bead-Blasted Warm Cream 6061 Aluminum + Signal Orange Accents',
      price: 189,
      shippingBatch: 'Ships November 2026 · Batch 04',
      shellGradient: 'from-[#FBF8F3] via-[#F2ECE1] to-[#E5DDD0]',
      frameColor: '#F85E10',
      buttonAccent: '#F85E10',
      description:
        'Our signature industrial edition combining a warm ceramic-anodized aluminum front plate with a high-impact signal orange rear cartridge housing and Chrono Drift 1989 pack-in cartridge.',
      inBox: [
        'PLAYBIT Console (Sand Alloy / Signal Orange)',
        'Chrono Drift 1989 Physical FRAM Cartridge',
        'Braided 1.5m USB-C PD 60W Right-Angle Cable',
        'Microfiber Travel Sleeve & Torx T6 Maintenance Key',
      ],
    },
    {
      id: 'atomic-orange',
      name: 'PLAYBIT Translucent Orange LE',
      finish: 'Smoked Amber Polycarbonate + Exposed Gold-Trace PCB',
      price: 219,
      shippingBatch: 'Ships November 2026 · Limited to 2,500 Units',
      shellGradient: 'from-[#FF8547] via-[#F85E10] to-[#B83B02]',
      frameColor: '#181615',
      buttonAccent: '#181615',
      description:
        'Numbered collector edition molded in optical-grade translucent burnt orange polycarbonate, revealing the matte-black immersion-gold FPGA motherboard and copper heat spreader inside.',
      inBox: [
        'PLAYBIT Console (Translucent Orange Numbered LE)',
        'Chrono Drift 1989 + BitSynth FM-8 Dual Cartridges',
        'Hard-Anodized Magnetic Cartridge Display Case',
        'Braided 1.5m USB-C PD Cable & Certificate of Authenticity',
      ],
    },
    {
      id: 'obsidian-pro',
      name: 'PLAYBIT Obsidian CNC Pro',
      finish: 'Full-Body Hard-Anodized Matte Black Aluminum + Titanium D-Pad',
      price: 249,
      shippingBatch: 'Ships December 2026 · Batch 04',
      shellGradient: 'from-[#2C2A29] via-[#1C1B1A] to-[#111010]',
      frameColor: '#F85E10',
      buttonAccent: '#F85E10',
      description:
        'Machined front and back from solid billets of Type-III hard-anodized black 6061 aluminum with a Grade-5 titanium directional pad and 128 GB internal SD FPGA core development slot.',
      inBox: [
        'PLAYBIT Console (Full CNC Obsidian Aluminum)',
        'Grade-5 Titanium D-Pad & Extra Silicone Switch Kit',
        'Chrono Drift 1989 + Developer FPGA JTAG Adapter',
        'Molded Ballistic Nylon Hardshell Travel Case',
      ],
    },
  ] as ConsoleEdition[],
  accessories: [
    {
      id: 'hdmi-dock',
      name: 'CNC Aluminum 4K60 Desktop Dock',
      meta: 'HDMI 2.1 · 2× USB-A Controller Ports · USB-C PD Pass-Through',
      price: 69,
      description: 'Outputs zero-latency 4K integer-scaled video with hardware scanline shaders to any monitor or OLED TV.',
    },
    {
      id: 'midi-sync-cable',
      name: 'Studio TRS-MIDI & Analog Sync Loom',
      meta: 'Gold-Plated 3.5mm TRS to 5-Pin DIN MIDI + CV Clock Split',
      price: 29,
      description: 'Connects PLAYBIT directly to hardware synthesizers, drum machines, and audio interfaces.',
    },
    {
      id: 'collector-3pack',
      name: 'Launch Trilogy Cartridge Vault (3-Pack)',
      meta: 'Solaris Striker DX · Clockwork Citadel · Hyper Prism Logic',
      price: 99,
      description: 'Three physical FRAM cartridges in a serialized aluminum slipcase with printed instruction manuals.',
    },
  ] as StoreAccessory[],
};
