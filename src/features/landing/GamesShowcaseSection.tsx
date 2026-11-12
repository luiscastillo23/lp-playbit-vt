import React, { useState } from 'react';
import { Play, Plus, Check } from 'lucide-react';

export interface GameCartridge {
  id: string;
  code: string;
  title: string;
  studio: string;
  category: 'action' | 'synth' | 'rpg';
  categoryLabel: string;
  releaseYear: string;
  resolution: string;
  fps: string;
  romSize: string;
  price: number;
  shellColor: string;
  labelAccent: string;
  synopsis: string;
  channels: { name: string; freq: string; level: number }[];
  screenArt: {
    primaryHex: string;
    secondaryHex: string;
    bgHex: string;
    hudScore: string;
    stageLabel: string;
  };
}

export const CARTRIDGE_CATALOG: GameCartridge[] = [
  {
    id: 'chrono-drift-86',
    code: 'PB-CRT-01',
    title: 'CHRONO DRIFT // 86',
    studio: 'Kuroshio Heavy Industries',
    category: 'action',
    categoryLabel: 'High-Speed Vector Racer',
    releaseYear: '2026',
    resolution: '1600×1440 (10× Native)',
    fps: '120 FPS Locked',
    romSize: '32 MB FRAM',
    price: 39,
    shellColor: '#F85E10',
    labelAccent: '#181615',
    synopsis:
      'Precision mountain pass time-attack built natively for PLAYBIT’s 120Hz FPGA sprite scaler with real-time FM synth engine telemetry.',
    channels: [
      { name: 'CH1 · Pulse Lead', freq: '440 Hz', level: 88 },
      { name: 'CH2 · FM Sawtooth', freq: '880 Hz', level: 74 },
      { name: 'CH3 · Sub-Triangle', freq: '110 Hz', level: 92 },
      { name: 'CH4 · White Noise', freq: '2.4 kHz', level: 61 },
    ],
    screenArt: {
      primaryHex: '#F85E10',
      secondaryHex: '#F5EFE6',
      bgHex: '#141211',
      hudScore: '01:24.088',
      stageLabel: 'STAGE 04 · HAKONE SKYLINE',
    },
  },
  {
    id: 'orbital-valkyrie',
    code: 'PB-CRT-02',
    title: 'ORBITAL VALKYRIE Zero',
    studio: 'Studio Vespera Tokyo',
    category: 'action',
    categoryLabel: 'Vertical Bullet-Hell Shmup',
    releaseYear: '2026',
    resolution: '1600×1440 (10× Native)',
    fps: '60.00 Hz Exact',
    romSize: '64 MB Mask ROM',
    price: 44,
    shellColor: '#181615',
    labelAccent: '#F85E10',
    synopsis:
      'Zero-lag hardware sprite multiplexing renders up to 512 simultaneous projectiles without slowdown or scanline flicker.',
    channels: [
      { name: 'CH1 · Arpeggio Pulse', freq: '660 Hz', level: 95 },
      { name: 'CH2 · Harmonic Chord', freq: '523 Hz', level: 82 },
      { name: 'CH3 · Octave Bass', freq: '98 Hz', level: 89 },
      { name: 'CH4 · Metallic Snare', freq: '4.1 kHz', level: 77 },
    ],
    screenArt: {
      primaryHex: '#FF7124',
      secondaryHex: '#38BDF8',
      bgHex: '#0F1319',
      hudScore: '9,482,100 PTS',
      stageLabel: 'SECTOR 07 · LOW ORBIT ELEVATOR',
    },
  },
  {
    id: 'pocket-modular-16',
    code: 'PB-CRT-03',
    title: 'PULSE MATRIX // SYNTH-16',
    studio: 'PLAYBIT Acoustic Lab',
    category: 'synth',
    categoryLabel: '16-Track Chiptune Workstation',
    releaseYear: '2026',
    resolution: '1600×1440 High-Contrast UI',
    fps: '120 FPS Oscilloscope',
    romSize: '16 MB + 512KB SRAM',
    price: 49,
    shellColor: '#E5DDD0',
    labelAccent: '#F85E10',
    synopsis:
      'Turn PLAYBIT into a stage-ready hardware synthesizer and step sequencer with live D-pad parameter morphing and USB-C MIDI clock sync.',
    channels: [
      { name: 'CH1 · Dual Duty Square', freq: '330 Hz', level: 91 },
      { name: 'CH2 · 4-Op FM Bell', freq: '1.2 kHz', level: 68 },
      { name: 'CH3 · Acid Resonant Sub', freq: '65 Hz', level: 96 },
      { name: 'CH4 · Transient Sampler', freq: '8.0 kHz', level: 84 },
    ],
    screenArt: {
      primaryHex: '#10B981',
      secondaryHex: '#F85E10',
      bgHex: '#111615',
      hudScore: '134.0 BPM · SYNC',
      stageLabel: 'PATTERN A08 · LIVE SEQUENCER',
    },
  },
  {
    id: 'kurogane-tactics',
    code: 'PB-CRT-04',
    title: 'KUROGANE MECH PROTOCOL',
    studio: 'Aethelgard Softworks',
    category: 'rpg',
    categoryLabel: 'Isometric Turn-Based Strategy',
    releaseYear: '2026',
    resolution: '1600×1440 (10× Native)',
    fps: '60 FPS Locked',
    romSize: '64 MB FRAM',
    price: 42,
    shellColor: '#3A3633',
    labelAccent: '#F5EFE6',
    synopsis:
      'Command mechanized infantry across destructible isometric grids with battery-free FRAM cartridge save states and link-cable multiplayer.',
    channels: [
      { name: 'CH1 · Brass Ensemble', freq: '293 Hz', level: 79 },
      { name: 'CH2 · Counter Melody', freq: '440 Hz', level: 64 },
      { name: 'CH3 · Timpani Bass', freq: '82 Hz', level: 85 },
      { name: 'CH4 · Servo Telemetry', freq: '1.8 kHz', level: 52 },
    ],
    screenArt: {
      primaryHex: '#F59E0B',
      secondaryHex: '#E5DDD0',
      bgHex: '#181615',
      hudScore: 'TURN 14 · AP 08/10',
      stageLabel: 'GRID 11-B · ASHEN FOUNDRY',
    },
  },
  {
    id: 'monolith-dungeon',
    code: 'PB-CRT-05',
    title: 'ABYSSAL MONOLITH IX',
    studio: 'Nordic Pixel Foundry',
    category: 'rpg',
    categoryLabel: 'First-Person Dungeon Crawler',
    releaseYear: '2026',
    resolution: '1600×1440 (10× Native)',
    fps: '60 FPS Locked',
    romSize: '32 MB FRAM',
    price: 39,
    shellColor: '#181615',
    labelAccent: '#E5DDD0',
    synopsis:
      'Hand-drawn 1-bit and 4-bit dithered catacombs brought to life on PLAYBIT’s high-contrast LTPS panel with physical automap grid tools.',
    channels: [
      { name: 'CH1 · Pipe Organ Lead', freq: '261 Hz', level: 83 },
      { name: 'CH2 · Echo Harpsichord', freq: '523 Hz', level: 71 },
      { name: 'CH3 · Drone Sub-Pedal', freq: '55 Hz', level: 90 },
      { name: 'CH4 · Dungeon Ambience', freq: '900 Hz', level: 44 },
    ],
    screenArt: {
      primaryHex: '#F5EFE6',
      secondaryHex: '#F85E10',
      bgHex: '#121110',
      hudScore: 'FLOOR B09 · TORCH 82%',
      stageLabel: 'SANCTUM OF THE IRON CLOCK',
    },
  },
  {
    id: 'tape-loop-tracker',
    code: 'PB-CRT-06',
    title: 'FIELD TAPE // SAMPLER 01',
    studio: 'PLAYBIT Acoustic Lab',
    category: 'synth',
    categoryLabel: 'Lo-Fi 12-Bit Granular Sampler',
    releaseYear: '2026',
    resolution: '1600×1440 Vector Reel UI',
    fps: '120 FPS Reel Physics',
    romSize: '64 MB Flash + Line-In',
    price: 49,
    shellColor: '#F85E10',
    labelAccent: '#F5EFE6',
    synopsis:
      'Sample external audio directly through the cartridge’s dedicated 3.5mm line-in jack and slice loops in real time using the tactile A/B triggers.',
    channels: [
      { name: 'CH1 · 12-Bit Grain A', freq: '1.0 kHz', level: 87 },
      { name: 'CH2 · Tape Flutter B', freq: '620 Hz', level: 76 },
      { name: 'CH3 · Warm Sub Filter', freq: '90 Hz', level: 93 },
      { name: 'CH4 · Vinyl Crackle', freq: '3.4 kHz', level: 58 },
    ],
    screenArt: {
      primaryHex: '#F85E10',
      secondaryHex: '#FBF8F3',
      bgHex: '#181514',
      hudScore: 'TAPE SPEED: 7.5 IPS',
      stageLabel: 'BANK C · 12-BIT CRUNCH ENGINE',
    },
  },
];

interface GamesShowcaseSectionProps {
  addedCartridgeIds: string[];
  onToggleCartridgeInBag: (cartridge: GameCartridge) => void;
}

export const GamesShowcaseSection: React.FC<GamesShowcaseSectionProps> = ({
  addedCartridgeIds,
  onToggleCartridgeInBag,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'action' | 'synth' | 'rpg'>('all');
  const [loadedCartridge, setLoadedCartridge] = useState<GameCartridge>(CARTRIDGE_CATALOG[0]);
  const [shaderMode, setShaderMode] = useState<'raw' | 'crt' | 'dmg'>('raw');
  const [soloChannelIdx, setSoloChannelIdx] = useState<number | null>(null);

  const filteredGames =
    selectedCategory === 'all'
      ? CARTRIDGE_CATALOG
      : CARTRIDGE_CATALOG.filter((game) => game.category === selectedCategory);

  return (
    <section
      id="games"
      className="relative w-full max-w-[1600px] mx-auto px-6 sm:px-10 py-20 lg:py-28 border-t border-[#181615]/10"
    >
      {/* Section Header & Filter Controls */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-14">
        <div>
          <div className="flex items-center gap-3 text-xs font-mono text-[#F85E10] mb-3">
            <span>02. PHYSICAL CARTRIDGE ECOSYSTEM</span>
            <span aria-hidden="true">·</span>
            <span className="text-[#4A4643]">INSTANT BOOT · ZERO DOWNLOADS</span>
          </div>
          <h2 className="font-headline font-semibold text-3xl sm:text-5xl text-[#181615] tracking-tight leading-[1.06] uppercase max-w-2xl">
            Tactile Media Built To Outlast Servers
          </h2>
        </div>

        {/* Interactive Category Filter Bar */}
        <div
          className="inline-flex flex-wrap items-center gap-1.5 bg-[#E3DFDC]/80 p-1.5 rounded-full border border-white/60 self-start lg:self-end"
          role="group"
          aria-label="Filter Cartridges by Genre"
        >
          {[
            { id: 'all', label: 'All Titles (6)' },
            { id: 'action', label: 'Arcade & Action' },
            { id: 'synth', label: 'Synthesizer & Audio' },
            { id: 'rpg', label: 'Strategy & RPG' },
          ].map((tab) => {
            const active = selectedCategory === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setSelectedCategory(tab.id as typeof selectedCategory)}
                className={`px-4 py-2 rounded-full text-xs font-sans font-medium transition-all whitespace-nowrap shrink-0 ${
                  active
                    ? 'bg-[#181615] text-white shadow-sm'
                    : 'text-[#3A3633] hover:text-[#181615]'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Live Interactive Cartridge Deck Simulator */}
      <div className="bg-[#181615] text-[#F5EFE6] rounded-[34px] p-6 sm:p-10 mb-12 border border-white/10 shadow-[0_26px_50px_-15px_rgba(24,22,21,0.4)]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left: Simulated High-DPI PLAYBIT Screen Viewport */}
          <div className="lg:col-span-7 flex flex-col justify-between bg-[#11100F] rounded-[24px] p-5 sm:p-6 border border-white/10">
            <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-white/10">
              <div className="flex items-center gap-2.5 text-xs font-mono">
                <span className="text-[#F85E10] font-bold">DECK SLOT A:</span>
                <span className="text-white font-semibold">{loadedCartridge.code}</span>
                <span aria-hidden="true" className="text-white/30">·</span>
                <span className="text-[#CEC8C2]">{loadedCartridge.fps}</span>
              </div>

              {/* Optical Shader Mode Selector */}
              <div className="flex items-center gap-1 bg-white/5 p-1 rounded-full border border-white/10">
                {[
                  { id: 'raw', label: '10× Pixel' },
                  { id: 'crt', label: 'CRT Mask' },
                  { id: 'dmg', label: 'DMG Matrix' },
                ].map((mode) => (
                  <button
                    key={mode.id}
                    type="button"
                    onClick={() => setShaderMode(mode.id as typeof shaderMode)}
                    className={`px-3 py-1 rounded-full text-[11px] font-mono transition-colors whitespace-nowrap shrink-0 ${
                      shaderMode === mode.id
                        ? 'bg-[#F85E10] text-white font-bold'
                        : 'text-[#CEC8C2] hover:text-white'
                    }`}
                  >
                    {mode.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Simulated Screen Output */}
            <div
              className="relative my-5 h-[220px] sm:h-[250px] rounded-[18px] p-5 flex flex-col justify-between overflow-hidden border border-white/15 transition-colors duration-300"
              style={{
                backgroundColor:
                  shaderMode === 'dmg' ? '#2B331F' : loadedCartridge.screenArt.bgHex,
              }}
            >
              {/* Scanline / Subpixel Overlay based on Shader Mode */}
              {shaderMode === 'crt' && (
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 opacity-25"
                  style={{
                    backgroundImage:
                      'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.85) 3px)',
                  }}
                />
              )}
              {shaderMode === 'dmg' && (
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 opacity-20"
                  style={{
                    backgroundImage:
                      'radial-gradient(#9BBC0F 1px, transparent 1px)',
                    backgroundSize: '6px 6px',
                  }}
                />
              )}

              {/* Top Screen HUD */}
              <div className="relative z-10 flex items-center justify-between text-xs font-mono tabular-nums">
                <span
                  style={{
                    color: shaderMode === 'dmg' ? '#9BBC0F' : loadedCartridge.screenArt.primaryHex,
                  }}
                  className="font-bold"
                >
                  {loadedCartridge.screenArt.stageLabel}
                </span>
                <span
                  style={{
                    color: shaderMode === 'dmg' ? '#8BAC0F' : loadedCartridge.screenArt.secondaryHex,
                  }}
                >
                  {loadedCartridge.screenArt.hudScore}
                </span>
              </div>

              {/* Center Interactive Vector Graphic / Synth Visualization */}
              <div className="relative z-10 my-auto flex flex-col items-center justify-center text-center">
                <div
                  className="font-display font-black text-xl sm:text-3xl tracking-[0.14em] uppercase"
                  style={{
                    color: shaderMode === 'dmg' ? '#9BBC0F' : '#FFFFFF',
                  }}
                >
                  {loadedCartridge.title}
                </div>
                <div className="mt-2 text-xs font-mono text-white/70">
                  {loadedCartridge.studio} · {loadedCartridge.romSize}
                </div>

                {/* Live 16-Bar Hardware Spectrum Analyzer */}
                <div className="mt-5 flex items-end justify-center gap-1.5 h-10">
                  {Array.from({ length: 16 }).map((_, idx) => {
                    const chIndex = idx % 4;
                    const isMuted = soloChannelIdx !== null && soloChannelIdx !== chIndex;
                    const baseHeight =
                      ((idx * 17 + loadedCartridge.price) % 70) + 25;
                    return (
                      <span
                        key={idx}
                        className="w-2 sm:w-2.5 rounded-t-[2px] transition-all duration-300"
                        style={{
                          height: isMuted ? '15%' : `${baseHeight}%`,
                          backgroundColor:
                            shaderMode === 'dmg'
                              ? '#9BBC0F'
                              : idx % 2 === 0
                              ? loadedCartridge.screenArt.primaryHex
                              : loadedCartridge.screenArt.secondaryHex,
                          opacity: isMuted ? 0.2 : 0.9,
                        }}
                      />
                    );
                  })}
                </div>
              </div>

              {/* Bottom Screen Telemetry */}
              <div className="relative z-10 flex items-center justify-between text-[11px] font-mono text-white/60 tabular-nums">
                <span>SHADER: {shaderMode.toUpperCase()}</span>
                <span>RESOLUTION: {loadedCartridge.resolution}</span>
              </div>
            </div>

            {/* 4-Channel Hardware Sound Chip Solo Controls */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {loadedCartridge.channels.map((ch, idx) => {
                const isSolo = soloChannelIdx === idx;
                return (
                  <button
                    key={ch.name}
                    type="button"
                    onClick={() =>
                      setSoloChannelIdx((prev) => (prev === idx ? null : idx))
                    }
                    className={`p-2.5 rounded-xl border text-left transition-all ${
                      isSolo
                        ? 'bg-[#F85E10] text-white border-[#F85E10]'
                        : 'bg-white/5 text-[#CEC8C2] border-white/10 hover:bg-white/10'
                    }`}
                  >
                    <div className="flex items-center justify-between text-[10px] font-mono">
                      <span className="truncate">{ch.name}</span>
                      <span className="tabular-nums font-bold">{ch.level}%</span>
                    </div>
                    <div className="text-[10px] font-mono opacity-75 mt-0.5 tabular-nums">
                      {ch.freq} {isSolo ? '· SOLO' : ''}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right: Loaded Cartridge Details & Add to Bag CTA */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-[#F85E10]">
                <span>ACTIVE CARTRIDGE IN SLOT</span>
                <span aria-hidden="true">·</span>
                <span className="text-[#CEC8C2]">{loadedCartridge.categoryLabel}</span>
              </div>

              <h3 className="font-headline font-semibold text-2xl sm:text-4xl text-white tracking-tight mt-2">
                {loadedCartridge.title}
              </h3>

              <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-[#CEC8C2] mt-2 tabular-nums">
                <span>{loadedCartridge.studio}</span>
                <span aria-hidden="true">·</span>
                <span>Released {loadedCartridge.releaseYear}</span>
                <span aria-hidden="true">·</span>
                <span>{loadedCartridge.romSize}</span>
              </div>

              <p className="text-sm text-[#CEC8C2] font-sans leading-relaxed mt-5">
                {loadedCartridge.synopsis}
              </p>
            </div>

            <div className="border-t border-white/10 pt-5 space-y-3 text-xs font-mono">
              <div className="flex items-center justify-between">
                <span className="text-[#CEC8C2]">CARTRIDGE MEDIUM</span>
                <span className="text-white">Gold-Plated 44-Pin PCB + Hard Case</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#CEC8C2]">SAVE ARCHITECTURE</span>
                <span className="text-white">Battery-Free Ferroelectric RAM (FRAM)</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#CEC8C2]">UNIT PRICE</span>
                <span className="text-lg font-bold text-[#F85E10] tabular-nums">
                  ${loadedCartridge.price}.00 USD
                </span>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                type="button"
                onClick={() => onToggleCartridgeInBag(loadedCartridge)}
                className={`px-7 py-4 rounded-full font-display font-bold text-xs tracking-[0.16em] uppercase transition-all whitespace-nowrap shrink-0 flex items-center gap-2.5 ${
                  addedCartridgeIds.includes(loadedCartridge.id)
                    ? 'bg-white text-[#181615] hover:bg-[#E3DFDC]'
                    : 'bg-[#F85E10] text-white hover:bg-[#e04f06] shadow-[0_12px_24px_-6px_rgba(248,94,16,0.5)]'
                }`}
              >
                {addedCartridgeIds.includes(loadedCartridge.id) ? (
                  <>
                    <Check className="w-4 h-4 text-[#F85E10]" />
                    <span>ADDED TO STORE BAG (${loadedCartridge.price})</span>
                  </>
                ) : (
                  <>
                    <Plus className="w-4 h-4" />
                    <span>ADD PHYSICAL CARTRIDGE · ${loadedCartridge.price}</span>
                  </>
                )}
              </button>

              <a
                href="#store"
                className="px-6 py-4 rounded-full font-mono text-xs text-[#CEC8C2] hover:text-white border border-white/15 hover:border-white/40 transition-colors whitespace-nowrap shrink-0"
              >
                VIEW BAG ({addedCartridgeIds.length}) →
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* 3-Column Uniform Physical Cartridge Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {filteredGames.map((game) => {
          const isLoaded = loadedCartridge.id === game.id;
          const isInBag = addedCartridgeIds.includes(game.id);

          return (
            <article
              key={game.id}
              className={`rounded-[28px] p-6 transition-all duration-200 flex flex-col justify-between border ${
                isLoaded
                  ? 'bg-[#E3DFDC] border-[#F85E10] shadow-[0_20px_40px_-15px_rgba(24,22,21,0.18)]'
                  : 'bg-[#E3DFDC]/65 border-white/60 hover:bg-[#E3DFDC]'
              }`}
            >
              <div>
                {/* Tactile Physical Cartridge Illustration */}
                <div className="relative h-48 rounded-[20px] bg-[#C4BDB7]/55 border border-white/50 flex items-center justify-center p-4 overflow-hidden">
                  <div
                    className="relative w-36 h-40 rounded-t-[14px] rounded-b-[6px] p-3 flex flex-col justify-between shadow-[0_14px_24px_-8px_rgba(0,0,0,0.35)] border border-white/20 transition-transform duration-300 hover:-translate-y-1"
                    style={{ backgroundColor: game.shellColor }}
                  >
                    {/* Cartridge Top Grip Ribs */}
                    <div className="space-y-1">
                      <div className="w-full h-1 rounded-full bg-black/25" />
                      <div className="w-full h-1 rounded-full bg-black/25" />
                    </div>

                    {/* Cartridge Center Sticker Label */}
                    <div
                      className="my-auto rounded-[8px] p-2.5 flex flex-col justify-between h-24 border border-black/15"
                      style={{
                        backgroundColor: game.labelAccent,
                        color: game.labelAccent === '#181615' ? '#F5EFE6' : '#181615',
                      }}
                    >
                      <div className="flex items-center justify-between text-[8px] font-mono opacity-80">
                        <span>{game.code}</span>
                        <span>ROM</span>
                      </div>
                      <div className="font-display font-black text-[10px] leading-tight tracking-wider uppercase line-clamp-2">
                        {game.title}
                      </div>
                      <div className="text-[8px] font-mono opacity-75 truncate">
                        {game.studio}
                      </div>
                    </div>

                    {/* Cartridge Bottom Insertion Arrow */}
                    <div className="flex justify-center">
                      <span className="w-0 h-0 border-x-[5px] border-x-transparent border-t-[6px] border-t-white/50" />
                    </div>
                  </div>

                  {/* Top-Right Serial Status */}
                  <span className="absolute top-3.5 left-4 text-[11px] font-mono text-[#3A3633] tabular-nums">
                    {game.code}
                  </span>
                  {isLoaded && (
                    <span className="absolute top-3.5 right-4 text-[11px] font-mono font-bold text-[#F85E10]">
                      IN DECK
                    </span>
                  )}
                </div>

                {/* Clean Unboxed Metadata */}
                <div className="mt-5 flex items-center gap-2 text-xs font-mono text-[#4A4643]">
                  <span>{game.categoryLabel}</span>
                  <span aria-hidden="true">·</span>
                  <span className="tabular-nums">{game.romSize}</span>
                </div>

                {/* Title & Price Row */}
                <div className="mt-1.5 flex items-baseline justify-between gap-4">
                  <h3 className="font-headline font-semibold text-lg text-[#181615] tracking-tight">
                    {game.title}
                  </h3>
                  <span className="font-mono font-bold text-base text-[#181615] tabular-nums shrink-0">
                    ${game.price}
                  </span>
                </div>

                <p className="mt-2 text-xs sm:text-sm text-[#3A3633] font-sans leading-relaxed line-clamp-2">
                  {game.synopsis}
                </p>
              </div>

              {/* Card Interactive Actions */}
              <div className="mt-6 pt-4 border-t border-[#181615]/10 flex items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={() => setLoadedCartridge(game)}
                  className={`flex-1 py-2.5 px-4 rounded-full text-xs font-mono font-bold transition-colors whitespace-nowrap shrink-0 flex items-center justify-center gap-1.5 ${
                    isLoaded
                      ? 'bg-[#181615] text-white'
                      : 'bg-white/80 text-[#181615] hover:bg-[#181615] hover:text-white'
                  }`}
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>{isLoaded ? 'PLAYING IN DECK' : 'LOAD IN DECK'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => onToggleCartridgeInBag(game)}
                  className={`py-2.5 px-4 rounded-full text-xs font-mono font-bold transition-colors whitespace-nowrap shrink-0 border ${
                    isInBag
                      ? 'bg-[#F85E10] text-white border-[#F85E10]'
                      : 'border-[#181615]/25 text-[#181615] hover:border-[#F85E10] hover:text-[#F85E10]'
                  }`}
                >
                  {isInBag ? 'IN BAG ✓' : '+ ADD'}
                </button>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
};
