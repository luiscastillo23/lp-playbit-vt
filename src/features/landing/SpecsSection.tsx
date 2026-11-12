import React, { useState } from 'react';
import { Check, Copy, Ruler } from 'lucide-react';

interface SpecRow {
  parameter: string;
  metricValue: string;
  imperialValue?: string;
  notes: string;
}

interface SpecCategory {
  id: 'silicon' | 'display' | 'audio' | 'mechanical';
  index: string;
  title: string;
  rows: SpecRow[];
}

const SPEC_CATEGORIES: SpecCategory[] = [
  {
    id: 'silicon',
    index: '01.',
    title: 'Silicon & Dual-FPGA Logic',
    rows: [
      {
        parameter: 'Primary User Core FPGA',
        metricValue: 'Altera Cyclone V · 49,000 Logic Elements',
        notes: 'Dedicated to cycle-accurate console & arcade hardware replication',
      },
      {
        parameter: 'System Supervisor FPGA',
        metricValue: 'Altera Cyclone 10 LP · 10,320 Logic Elements',
        notes: 'Handles OS overlay, instant save states, and hardware scaler pipeline',
      },
      {
        parameter: 'Memory Bus Architecture',
        metricValue: '64 MB SDRAM (166 MHz) + 8 MB Asynchronous SRAM',
        notes: 'Zero-wait-state parallel memory access across 3 independent buses',
      },
      {
        parameter: 'Cartridge Interface',
        metricValue: '44-Pin Gold-Plated Edge Connector (3.3V / 5.0V Auto-Switch)',
        notes: 'Supports native PLAYBIT FRAM carts + legacy adapter modules',
      },
    ],
  },
  {
    id: 'display',
    index: '02.',
    title: 'Optical Stack & LTPS Display',
    rows: [
      {
        parameter: 'Active Panel Geometry',
        metricValue: '88.9 mm Diagonal · 10:9 Aspect Ratio',
        imperialValue: '3.50 in Diagonal · 10:9 Aspect Ratio',
        notes: 'Full OCA optically bonded Gorilla Glass Victus front surface',
      },
      {
        parameter: 'Native Pixel Matrix',
        metricValue: '1600 × 1440 Pixels · 615 PPI Density',
        notes: 'Exact 10× integer multiplier for 160×144 handheld matrices',
      },
      {
        parameter: 'Refresh & Sync Range',
        metricValue: 'Variable 50.00 Hz to 120.00 Hz Hardware Frame Lock',
        notes: 'Matches original NTSC (59.94 Hz) and PAL (50.00 Hz) crystal clocks',
      },
      {
        parameter: 'Peak Luminance & Contrast',
        metricValue: '1,000 cd/m² (Nits) Peak · 100% DCI-P3 Gamut',
        notes: 'Hardware sub-pixel CRT Trinitron, BVM, and Dot-Matrix masks',
      },
    ],
  },
  {
    id: 'audio',
    index: '03.',
    title: 'Audio DAC & Synthesizer Engine',
    rows: [
      {
        parameter: 'Digital-to-Analog Converter',
        metricValue: 'Burr-Brown PCM5102A · 32-Bit / 384 kHz Stereo DAC',
        notes: '114 dB SNR with ultra-low noise LDO analog power rail',
      },
      {
        parameter: 'Headphone Amplifier',
        metricValue: 'Texas Instruments TPA6133 · 2.1 VRMS Output (16–300 Ω)',
        notes: 'Drives studio reference headphones without distortion',
      },
      {
        parameter: 'Acoustic Speaker Array',
        metricValue: 'Front-Firing 2.5 W Neodymium Chamber · 21-Hole CNC Grille',
        notes: 'Tuned for crisp square-wave, pulse, and FM percussion transients',
      },
      {
        parameter: 'External Studio Sync',
        metricValue: 'USB-C Class-Compliant Audio + 3.5 mm TRS MIDI / Sync I/O',
        notes: 'Direct integration with hardware modular synths and DAWs',
      },
    ],
  },
  {
    id: 'mechanical',
    index: '04.',
    title: 'Power, I/O & Physical Enclosure',
    rows: [
      {
        parameter: 'Chassis Dimensions (H × W × D)',
        metricValue: '138.0 mm × 86.5 mm × 16.2 mm',
        imperialValue: '5.43 in × 3.41 in × 0.64 in',
        notes: 'CNC-milled 6061-T6 aluminum front shell with polycarbonate rear grip',
      },
      {
        parameter: 'Total Unloaded Mass',
        metricValue: '248 g (Weight-Balanced Center of Gravity)',
        imperialValue: '8.75 oz (Weight-Balanced Center of Gravity)',
        notes: 'Includes internal copper vapor chamber and 4,200 mAh battery cell',
      },
      {
        parameter: 'Battery & Power Delivery',
        metricValue: '4,200 mAh High-Density Li-Po · 14.5 Hours Gameplay',
        notes: 'USB-C PD 30W Fast Charge (0% to 80% in 34 minutes)',
      },
      {
        parameter: 'Connectivity & Expansion',
        metricValue: 'Dual USB-C (DisplayPort 1.4 4K60 + Data) · MicroSDXC UHS-II',
        notes: 'Wi-Fi 6 + Bluetooth 5.3 Low-Energy for 4-player dock controllers',
      },
    ],
  },
];

export const SpecsSection: React.FC = () => {
  const [unitSystem, setUnitSystem] = useState<'metric' | 'imperial'>('metric');
  const [activeCategory, setActiveCategory] = useState<'all' | SpecCategory['id']>('all');
  const [copiedSpecs, setCopiedSpecs] = useState<boolean>(false);

  const visibleCategories =
    activeCategory === 'all'
      ? SPEC_CATEGORIES
      : SPEC_CATEGORIES.filter((cat) => cat.id === activeCategory);

  const handleCopySpecSheet = () => {
    const summaryText = SPEC_CATEGORIES.map(
      (cat) =>
        `${cat.index} ${cat.title}\n` +
        cat.rows
          .map(
            (r) =>
              `- ${r.parameter}: ${
                unitSystem === 'imperial' && r.imperialValue ? r.imperialValue : r.metricValue
              }`
          )
          .join('\n')
    ).join('\n\n');

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(`PLAYBIT / 2026 TECHNICAL SPECIFICATION SHEET\n\n${summaryText}`);
    }
    setCopiedSpecs(true);
    setTimeout(() => setCopiedSpecs(false), 2500);
  };

  return (
    <section
      id="specs"
      className="relative w-full max-w-[1600px] mx-auto px-6 sm:px-10 py-20 lg:py-28 border-t border-[#181615]/10"
    >
      {/* Section Header & Controls */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-14">
        <div>
          <div className="flex items-center gap-3 text-xs font-mono text-[#F85E10] mb-3">
            <span>03. TECHNICAL SPECIFICATIONS</span>
            <span aria-hidden="true">·</span>
            <span className="text-[#4A4643]">HARDWARE REVISION 2.6</span>
          </div>
          <h2 className="font-headline font-semibold text-3xl sm:text-5xl text-[#181615] tracking-tight leading-[1.06] uppercase max-w-2xl">
            Engineered Without Compromises
          </h2>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Metric / Imperial Unit Switcher */}
          <div
            className="inline-flex items-center gap-1 bg-[#E3DFDC]/80 p-1.5 rounded-full border border-white/60"
            role="group"
            aria-label="Unit System Selection"
          >
            <button
              type="button"
              onClick={() => setUnitSystem('metric')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-mono transition-colors whitespace-nowrap shrink-0 ${
                unitSystem === 'metric'
                  ? 'bg-[#181615] text-white font-bold'
                  : 'text-[#3A3633] hover:text-[#181615]'
              }`}
            >
              Metric (mm / g)
            </button>
            <button
              type="button"
              onClick={() => setUnitSystem('imperial')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-mono transition-colors whitespace-nowrap shrink-0 ${
                unitSystem === 'imperial'
                  ? 'bg-[#181615] text-white font-bold'
                  : 'text-[#3A3633] hover:text-[#181615]'
              }`}
            >
              Imperial (in / oz)
            </button>
          </div>

          {/* Copy Full Spec Sheet Button */}
          <button
            type="button"
            onClick={handleCopySpecSheet}
            className="px-4 py-2.5 rounded-full bg-white/80 hover:bg-white text-xs font-mono font-bold text-[#181615] border border-white transition-all flex items-center gap-2 whitespace-nowrap shrink-0 shadow-sm"
          >
            {copiedSpecs ? (
              <>
                <Check className="w-3.5 h-3.5 text-[#F85E10]" />
                <span>SPEC SHEET COPIED</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-[#F85E10]" />
                <span>COPY SPEC SHEET</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Subsystem Filter Bar */}
      <div className="flex flex-wrap items-center gap-2 mb-10">
        {[
          { id: 'all', label: 'All Subsystems (16)' },
          { id: 'silicon', label: '01. Silicon & FPGA' },
          { id: 'display', label: '02. Optical Display' },
          { id: 'audio', label: '03. Audio & Synth' },
          { id: 'mechanical', label: '04. Power & Mechanical' },
        ].map((tab) => {
          const isActive = activeCategory === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveCategory(tab.id as typeof activeCategory)}
              className={`px-4 py-2 rounded-full text-xs font-mono transition-all whitespace-nowrap shrink-0 border ${
                isActive
                  ? 'bg-[#F85E10] text-white border-[#F85E10] font-bold shadow-sm'
                  : 'bg-[#E3DFDC]/60 text-[#3A3633] border-white/60 hover:bg-[#E3DFDC] hover:text-[#181615]'
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Main Specification Tables + Mechanical Dimension Blueprint */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left 8 Columns: Tabular Specification Matrix */}
        <div className="lg:col-span-8 space-y-6">
          {visibleCategories.map((category) => (
            <div
              key={category.id}
              className="bg-[#E3DFDC]/75 rounded-[28px] p-6 sm:p-8 border border-white/60"
            >
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#181615]/15">
                <div className="flex items-baseline gap-3">
                  <span className="font-mono font-bold text-sm text-[#F85E10]">
                    {category.index}
                  </span>
                  <h3 className="font-headline font-semibold text-xl sm:text-2xl text-[#181615] uppercase tracking-tight">
                    {category.title}
                  </h3>
                </div>
                <span className="text-xs font-mono text-[#4A4643] tabular-nums">
                  {category.rows.length} PARAMETERS
                </span>
              </div>

              <div className="divide-y divide-[#181615]/10">
                {category.rows.map((row) => {
                  const displayValue =
                    unitSystem === 'imperial' && row.imperialValue
                      ? row.imperialValue
                      : row.metricValue;

                  return (
                    <div
                      key={row.parameter}
                      className="py-4 grid grid-cols-1 sm:grid-cols-12 gap-2 sm:gap-6 items-baseline"
                    >
                      <div className="sm:col-span-4 text-xs font-mono text-[#4A4643] uppercase">
                        {row.parameter}
                      </div>
                      <div className="sm:col-span-8 space-y-1">
                        <div className="text-sm sm:text-base font-mono font-bold text-[#181615] tabular-nums">
                          {displayValue}
                        </div>
                        <div className="text-xs font-sans text-[#3A3633]">
                          {row.notes}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Right 4 Columns: Dimensional Orthographic Callout & FPGA Benchmark Proof */}
        <div className="lg:col-span-4 space-y-6">
          {/* Orthographic Dimension Card */}
          <div className="bg-[#181615] text-[#F5EFE6] rounded-[28px] p-6 sm:p-8 border border-white/10">
            <div className="flex items-center justify-between text-xs font-mono text-[#F85E10] mb-4">
              <span>ORTHOGRAPHIC ENCLOSURE</span>
              <Ruler className="w-4 h-4" />
            </div>

            {/* Technical Wireframe Box Diagram */}
            <div className="my-6 py-6 px-4 rounded-2xl bg-white/5 border border-white/10 flex flex-col items-center justify-center">
              <div className="relative w-36 h-52 border-2 border-[#F85E10] rounded-[18px] p-3 flex flex-col justify-between">
                {/* Top Width Dimension Label */}
                <span className="absolute -top-5 left-1/2 -translate-x-1/2 text-[10px] font-mono text-[#CEC8C2] whitespace-nowrap tabular-nums">
                  ← {unitSystem === 'metric' ? '86.5 mm' : '3.41 in'} →
                </span>

                {/* Side Height Dimension Label */}
                <span
                  className="absolute -right-14 top-1/2 -translate-y-1/2 text-[10px] font-mono text-[#CEC8C2] whitespace-nowrap tabular-nums"
                  style={{ transform: 'translateY(-50%) rotate(90deg)' }}
                >
                  {unitSystem === 'metric' ? '138.0 mm' : '5.43 in'}
                </span>

                {/* Screen Cutout Wireframe */}
                <div className="w-full h-[46%] border border-white/40 rounded-[8px] flex items-center justify-center text-[10px] font-mono text-[#F85E10] tabular-nums">
                  {unitSystem === 'metric' ? '88.9 mm' : '3.50 in'}
                </div>

                {/* Controls Wireframe */}
                <div className="flex items-center justify-between px-1 my-auto">
                  <div className="w-8 h-8 rounded-full border border-white/40 flex items-center justify-center text-[8px] font-mono text-white/60">
                    +
                  </div>
                  <div className="flex gap-1.5">
                    <span className="w-4 h-4 rounded-full border border-[#F85E10]" />
                    <span className="w-4 h-4 rounded-full border border-[#F85E10]" />
                  </div>
                </div>

                {/* Bottom Depth Callout */}
                <div className="text-center text-[9px] font-mono text-white/50 tabular-nums">
                  DEPTH: {unitSystem === 'metric' ? '16.2 mm' : '0.64 in'}
                </div>
              </div>
            </div>

            <div className="space-y-2.5 pt-2 border-t border-white/10 text-xs font-mono tabular-nums">
              <div className="flex justify-between">
                <span className="text-[#CEC8C2]">WEIGHT DISTRIBUTION</span>
                <span className="text-white font-bold">50 / 50 Balanced</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#CEC8C2]">TOTAL MASS</span>
                <span className="text-[#F85E10] font-bold">
                  {unitSystem === 'metric' ? '248 Grams' : '8.75 Ounces'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#CEC8C2]">THERMAL DISSIPATION</span>
                <span className="text-white">Fanless Copper Vapor Plate</span>
              </div>
            </div>
          </div>

          {/* Hardware FPGA vs Software Emulation Benchmark Proof Card */}
          <div className="bg-[#E3DFDC]/75 rounded-[28px] p-6 sm:p-8 border border-white/60 space-y-5">
            <div>
              <div className="text-xs font-mono text-[#F85E10] font-bold">
                BENCHMARK VERIFICATION
              </div>
              <h3 className="font-headline font-semibold text-xl text-[#181615] mt-1">
                Why Hardware FPGA Matters
              </h3>
              <p className="text-xs font-sans text-[#3A3633] mt-1.5 leading-relaxed">
                Tested across 10,000 consecutive frame intervals using a 1000fps photodiode rig.
              </p>
            </div>

            <div className="space-y-4 text-xs font-mono tabular-nums">
              <div>
                <div className="flex justify-between text-[#181615] font-bold mb-1">
                  <span>PLAYBIT Dual FPGA</span>
                  <span className="text-[#F85E10]">0.08 ms Latency</span>
                </div>
                <div className="w-full h-2.5 rounded-full bg-[#C4BDB7] overflow-hidden">
                  <div className="w-[8%] h-full bg-[#F85E10] rounded-full" />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-[#4A4643] mb-1">
                  <span>Standard ARM Software Emulator</span>
                  <span>34.20 ms Latency</span>
                </div>
                <div className="w-full h-2.5 rounded-full bg-[#C4BDB7] overflow-hidden">
                  <div className="w-[88%] h-full bg-[#3A3633] rounded-full" />
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-[#181615]/10 flex items-center justify-between text-xs font-mono text-[#181615]">
              <span>AUDIO CLOCK DRIFT</span>
              <span className="font-bold text-[#F85E10] tabular-nums">0.000% (Crystal Locked)</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
