import React, { useState } from 'react';
import { Cpu, Maximize2, Volume2, Sliders } from 'lucide-react';

export interface FinishOption {
  id: 'cream' | 'obsidian' | 'alloy';
  name: string;
  code: string;
  shellBg: string;
  accentBg: string;
  textColor: string;
  borderStyle: string;
  description: string;
}

const FINISH_OPTIONS: FinishOption[] = [
  {
    id: 'cream',
    name: 'Field Cream / Safety Orange',
    code: 'PB-01-CRM',
    shellBg: 'from-[#FBF8F3] via-[#F2ECE1] to-[#E5DDD0]',
    accentBg: '#F85E10',
    textColor: '#181615',
    borderStyle: 'border-white/70',
    description: 'Warm ceramic-coated magnesium-aluminum front shell with high-visibility safety orange rear chassis.',
  },
  {
    id: 'obsidian',
    name: 'Carbon Obsidian / Amber',
    code: 'PB-02-OBS',
    shellBg: 'from-[#2A2827] via-[#1D1B1A] to-[#121110]',
    accentBg: '#F85E10',
    textColor: '#F5EFE6',
    borderStyle: 'border-white/15',
    description: 'Bead-blasted matte black anodized aluminum body with laser-etched legends and orange tactile buttons.',
  },
  {
    id: 'alloy',
    name: 'Raw Anodized Alloy',
    code: 'PB-03-RAW',
    shellBg: 'from-[#E4E2DF] via-[#D2CECA] to-[#BDB7B2]',
    accentBg: '#181615',
    textColor: '#181615',
    borderStyle: 'border-white/60',
    description: 'Un-dyed CNC machined 6061-T6 aluminum enclosure with high-contrast carbon controls and clear coat.',
  },
];

interface LayerSpec {
  id: 'controls' | 'fpga' | 'display' | 'acoustics';
  index: string;
  title: string;
  subtitle: string;
  metric: string;
  metricUnit: string;
  summary: string;
  callouts: { label: string; value: string; coord: string }[];
}

const ARCHITECTURE_LAYERS: LayerSpec[] = [
  {
    id: 'controls',
    index: '01.',
    title: 'Tactile Micro-Switch Controls & CNC Shell',
    subtitle: 'Ergonomic Mechanical Precision',
    metric: '0.2',
    metricUnit: 'mm actuation travel · 5,000,000 cycle rating',
    summary:
      'Engineered with a pivot-balanced D-pad and custom dome-switch action buttons that eliminate false diagonals during high-speed platforming and fighting inputs.',
    callouts: [
      { label: 'D-Pad Pivot', value: 'Stainless Steel Ball-Bearing Fulcrum', coord: 'X: 34.2 / Y: 68.0' },
      { label: 'Action Switches', value: 'Custom 55gf Tactile Gold-Plated Dome', coord: 'X: 78.5 / Y: 64.5' },
      { label: 'Rear Triggers', value: 'Dual Chamfered L1/L2 & R1/R2 Micro-Levers', coord: 'X: 50.0 / Y: 18.2' },
    ],
  },
  {
    id: 'fpga',
    index: '02.',
    title: 'Dual-Core Cyclone V FPGA Silicon',
    subtitle: 'Transistor-Level Hardware Reproduction',
    metric: '0.08',
    metricUnit: 'ms input-to-photon latency · Zero software emulation lag',
    summary:
      'Instead of translating instructions in software, PLAYBIT reconfigures physical logic gates to operate identically to original 8-bit, 16-bit, and 32-bit processors at native clock speeds.',
    callouts: [
      { label: 'Primary FPGA', value: 'Altera Cyclone V 49K Logic Elements', coord: 'X: 48.0 / Y: 44.0' },
      { label: 'System Memory', value: '64MB Low-Latency SDRAM @ 166MHz', coord: 'X: 62.4 / Y: 51.8' },
      { label: 'Cartridge Bus', value: '44-Pin Gold-Fingers Auto-Voltage Bus (3.3V / 5V)', coord: 'X: 50.0 / Y: 12.0' },
    ],
  },
  {
    id: 'display',
    index: '03.',
    title: '3.5" 1600×1440 LTPS Sub-Pixel Display',
    subtitle: '10× Integer Scaling Without Interpolation Blur',
    metric: '615',
    metricUnit: 'PPI density · 1000 nits peak outdoor luminance',
    summary:
      'Custom-cut 10:9 aspect ratio laminated Gorilla Glass panel designed specifically for exact 10× integer scaling of classic 160×144 handheld matrices with hardware sub-pixel aperture masks.',
    callouts: [
      { label: 'Panel Resolution', value: '1600 × 1440 Pixels (615 PPI)', coord: 'X: 50.0 / Y: 32.0' },
      { label: 'Refresh Sync', value: 'Variable 50Hz–120Hz Hardware Frame Lock', coord: 'X: 28.0 / Y: 29.5' },
      { label: 'Optical Stack', value: 'Full OCA Lamination · Anti-Reflective Coating', coord: 'X: 71.0 / Y: 35.0' },
    ],
  },
  {
    id: 'acoustics',
    index: '04.',
    title: '24-Bit Stereo DAC & Chiptune Synthesizer',
    subtitle: 'Studio-Grade Portable Sound Engine',
    metric: '114',
    metricUnit: 'dB dynamic range · Dedicated 3.5mm TRS + MIDI USB-C',
    summary:
      'Built-in front-firing acoustic chamber paired with a Burr-Brown PCM5102A DAC and native 16-track tracker sequencer for live chiptune composition and crisp stereo stage.',
    callouts: [
      { label: 'Audio DAC', value: 'Burr-Brown 32-Bit / 384kHz Low-Jitter DAC', coord: 'X: 66.0 / Y: 84.0' },
      { label: 'Speaker Array', value: '21-Point CNC Micro-Perforated Acoustic Chamber', coord: 'X: 74.0 / Y: 88.5' },
      { label: 'Studio Sync', value: 'USB-C Class-Compliant Audio + TRS Clock Out', coord: 'X: 50.0 / Y: 95.0' },
    ],
  },
];

interface ConsoleArchitectureSectionProps {
  onSelectFinishForStore?: (finishId: 'cream' | 'obsidian' | 'alloy') => void;
}

export const ConsoleArchitectureSection: React.FC<ConsoleArchitectureSectionProps> = ({
  onSelectFinishForStore,
}) => {
  const [activeLayerId, setActiveLayerId] = useState<LayerSpec['id']>('controls');
  const [selectedFinish, setSelectedFinish] = useState<FinishOption>(FINISH_OPTIONS[0]);
  const [xrayMode, setXrayMode] = useState<boolean>(false);

  const activeLayer =
    ARCHITECTURE_LAYERS.find((layer) => layer.id === activeLayerId) || ARCHITECTURE_LAYERS[0];

  const handleFinishSelect = (finish: FinishOption) => {
    setSelectedFinish(finish);
    if (onSelectFinishForStore) {
      onSelectFinishForStore(finish.id);
    }
  };

  return (
    <section
      id="console"
      className="relative w-full max-w-[1600px] mx-auto px-6 sm:px-10 py-20 lg:py-28 border-t border-[#181615]/10"
    >
      {/* Section Header */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-14 lg:mb-20">
        <div className="lg:col-span-7">
          <div className="flex items-center gap-3 text-xs font-mono text-[#F85E10] mb-3">
            <span>01. HARDWARE ARCHITECTURE</span>
            <span aria-hidden="true">·</span>
            <span className="text-[#4A4643]">INDUSTRIAL DESIGN SYSTEM</span>
          </div>
          <h2 className="font-headline font-semibold text-3xl sm:text-5xl text-[#181615] tracking-tight leading-[1.06] uppercase max-w-2xl">
            Precision-Machined For Tactile Permanence
          </h2>
        </div>
        <div className="lg:col-span-5 flex flex-col items-start lg:items-end justify-end">
          <p className="text-sm sm:text-base text-[#3A3633] font-sans leading-relaxed max-w-md">
            Every PLAYBIT unit is milled from solid alloy blocks, pairing zero-latency dual FPGA
            silicon with custom mechanical switches and a high-density 1600×1440 optical stack.
          </p>
        </div>
      </div>

      {/* Asymmetric Bento Grid: Left Interactive Hardware Inspector (col-span-7), Right Architecture Layer Stack (col-span-5) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        {/* Left Column: Interactive Hardware Blueprint & Finish Studio */}
        <div className="lg:col-span-7 bg-[#E3DFDC]/75 backdrop-blur-sm rounded-[32px] border border-white/60 p-6 sm:p-10 flex flex-col justify-between">
          {/* Top Toolbar: Colorway Selector & X-Ray Toggle */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-[#181615]/10">
            <div>
              <div className="text-xs font-mono text-[#4A4643]">
                CHASSIS FINISH · <span className="text-[#181615] font-bold">{selectedFinish.code}</span>
              </div>
              <div className="text-sm font-sans font-semibold text-[#181615] mt-0.5">
                {selectedFinish.name}
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div
                className="flex items-center gap-1.5 bg-[#C4BDB7]/60 p-1.5 rounded-full border border-white/40"
                role="group"
                aria-label="Select Console Finish"
              >
                {FINISH_OPTIONS.map((finish) => {
                  const isSelected = selectedFinish.id === finish.id;
                  return (
                    <button
                      key={finish.id}
                      type="button"
                      onClick={() => handleFinishSelect(finish)}
                      className={`px-3.5 py-1.5 rounded-full text-xs font-mono transition-all whitespace-nowrap shrink-0 ${
                        isSelected
                          ? 'bg-[#181615] text-white font-bold shadow-sm'
                          : 'text-[#3A3633] hover:text-[#181615]'
                      }`}
                    >
                      {finish.id === 'cream' ? 'Cream' : finish.id === 'obsidian' ? 'Obsidian' : 'Alloy'}
                    </button>
                  );
                })}
              </div>

              <button
                type="button"
                onClick={() => setXrayMode((prev) => !prev)}
                className={`px-3.5 py-2 rounded-full text-xs font-mono transition-all whitespace-nowrap shrink-0 border ${
                  xrayMode
                    ? 'bg-[#F85E10] text-white border-[#F85E10] font-bold'
                    : 'bg-white/60 text-[#181615] border-white/80 hover:bg-white'
                }`}
              >
                {xrayMode ? 'Schematic: ON' : 'Schematic: OFF'}
              </button>
            </div>
          </div>

          {/* Center Interactive Hardware Schematic / Console Visual */}
          <div className="relative my-8 py-6 flex flex-col xl:flex-row items-center justify-around gap-8">
            {/* Interactive Console Front/Internal Render */}
            <div className="relative flex items-center justify-center">
              <div
                className={`relative w-[240px] h-[365px] sm:w-[265px] sm:h-[400px] rounded-[34px] bg-gradient-to-br ${selectedFinish.shellBg} p-4 flex flex-col justify-between border ${selectedFinish.borderStyle} shadow-[0_24px_48px_-12px_rgba(24,22,21,0.28)] transition-all duration-300`}
              >
                {/* Rear Offset Lip */}
                <div
                  className="absolute -z-10 inset-0 rounded-[34px] transition-transform duration-300"
                  style={{
                    backgroundColor: selectedFinish.accentBg,
                    transform: 'translate(10px, 10px)',
                  }}
                />

                {/* Top Display Bezel */}
                <div
                  className={`relative w-full h-[46%] rounded-[18px] p-[3px] transition-colors duration-300 ${
                    activeLayerId === 'display' ? 'bg-[#F85E10] ring-4 ring-[#F85E10]/30' : 'bg-[#181615]'
                  }`}
                >
                  <div className="relative w-full h-full rounded-[15px] bg-[#121110] p-3 flex flex-col justify-between overflow-hidden">
                    {/* Display Active Content */}
                    <div className="flex items-center justify-between text-[10px] font-mono text-[#F85E10] z-10">
                      <span>{activeLayer.id.toUpperCase()}</span>
                      <span className="tabular-nums">1600×1440 · 120HZ</span>
                    </div>

                    {xrayMode || activeLayerId === 'fpga' ? (
                      /* Internal FPGA Die & Bus Schematic Overlay */
                      <div className="my-auto border border-[#F85E10]/40 bg-[#F85E10]/10 rounded-lg p-2.5 text-center">
                        <div className="text-[10px] font-mono text-[#F5EFE6] tracking-wider uppercase">
                          CYCLONE V FPGA CORE
                        </div>
                        <div className="text-[9px] font-mono text-[#F85E10] mt-0.5 tabular-nums">
                          49,000 LE · 0.08MS BUS
                        </div>
                        <div className="mt-2 grid grid-cols-6 gap-1">
                          {Array.from({ length: 12 }).map((_, i) => (
                            <span
                              key={i}
                              className={`h-1.5 rounded-[1px] ${
                                i % 3 === 0 ? 'bg-[#F85E10]' : 'bg-white/25'
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                    ) : (
                      /* Optical Sub-Pixel Grid & Waveform Readout */
                      <div className="my-auto flex flex-col items-center justify-center">
                        <div className="text-xs font-display font-bold tracking-[0.2em] text-white uppercase">
                          PLAYBIT OS 2.6
                        </div>
                        <div className="text-[10px] font-mono text-[#CEC8C2] mt-1 tabular-nums">
                          {activeLayer.metric} {activeLayer.metricUnit.split('·')[0]}
                        </div>
                      </div>
                    )}

                    <div className="flex items-center justify-between text-[9px] font-mono text-white/50 z-10 tabular-nums">
                      <span>INTEGER 10×</span>
                      <span>FPGA LOCKED</span>
                    </div>
                  </div>
                </div>

                {/* Middle Controls Section */}
                <div
                  className={`relative w-full flex items-center justify-between px-2 my-auto py-2 rounded-2xl transition-all ${
                    activeLayerId === 'controls' ? 'ring-2 ring-[#F85E10]' : ''
                  }`}
                >
                  {/* D-Pad */}
                  <div className="relative w-20 h-20 rounded-full bg-black/10 flex items-center justify-center border border-black/10">
                    <div className="relative w-16 h-16">
                      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-full h-5 bg-[#1E1E1E] rounded-[4px]" />
                      <div className="absolute left-1/2 top-0 -translate-x-1/2 h-full w-5 bg-[#1E1E1E] rounded-[4px]" />
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3.5 h-3.5 rounded-full bg-[#F85E10]/80" />
                    </div>
                  </div>

                  {/* Internal PCB X-Ray Badge when xrayMode is active */}
                  {xrayMode && (
                    <div className="px-2 py-1 rounded bg-[#181615] text-[9px] font-mono text-[#F85E10] border border-[#F85E10]/40 tabular-nums">
                      ALPS 55GF
                    </div>
                  )}

                  {/* Dual Action Buttons */}
                  <div className="relative w-20 h-16">
                    <div className="absolute bottom-1 left-1 w-9 h-9 rounded-full bg-[#F85E10] shadow-md border border-black/20 flex items-center justify-center text-[10px] font-mono font-bold text-white">
                      B
                    </div>
                    <div className="absolute top-1 right-1 w-9 h-9 rounded-full bg-[#F85E10] shadow-md border border-black/20 flex items-center justify-center text-[10px] font-mono font-bold text-white">
                      A
                    </div>
                  </div>
                </div>

                {/* Bottom Acoustic Chamber & System Ribbons */}
                <div
                  className={`relative w-full flex items-end justify-between px-2 pt-1 pb-0.5 rounded-xl transition-all ${
                    activeLayerId === 'acoustics' ? 'ring-2 ring-[#F85E10]' : ''
                  }`}
                >
                  <div className="flex flex-col gap-1">
                    <span className="w-6 h-1 rounded-full bg-[#F85E10]" />
                    <span className="w-6 h-1 rounded-full bg-[#F85E10]" />
                    <span className="w-6 h-1 rounded-full bg-[#F85E10]" />
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-2 rounded-full bg-[#231F1D] -rotate-12" />
                    <span className="w-5 h-2 rounded-full bg-[#231F1D] -rotate-12" />
                  </div>
                  <div className="grid grid-cols-5 gap-1">
                    {Array.from({ length: 15 }).map((_, i) => (
                      <span
                        key={i}
                        className={`w-1 h-1 rounded-full ${
                          selectedFinish.id === 'obsidian' ? 'bg-white/60' : 'bg-[#181615]'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Active Layer Coordinate Callouts */}
            <div className="flex-1 w-full max-w-sm space-y-4">
              <div className="border-b border-[#181615]/10 pb-3">
                <div className="text-xs font-mono text-[#F85E10] font-bold">
                  {activeLayer.index} {activeLayer.subtitle.toUpperCase()}
                </div>
                <div className="mt-1 flex items-baseline gap-2">
                  <span className="font-mono font-bold text-3xl sm:text-4xl text-[#181615] tabular-nums">
                    {activeLayer.metric}
                  </span>
                  <span className="text-xs font-mono text-[#4A4643]">{activeLayer.metricUnit}</span>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-[#3A3633] font-sans leading-relaxed">
                {activeLayer.summary}
              </p>

              <div className="space-y-2.5 pt-2">
                {activeLayer.callouts.map((callout) => (
                  <div
                    key={callout.label}
                    className="bg-white/60 rounded-2xl p-3.5 border border-white/80 flex items-center justify-between gap-4"
                  >
                    <div>
                      <div className="text-[11px] font-mono text-[#4A4643] uppercase">
                        {callout.label}
                      </div>
                      <div className="text-xs sm:text-sm font-sans font-semibold text-[#181615]">
                        {callout.value}
                      </div>
                    </div>
                    <span className="text-[10px] font-mono text-[#F85E10] tabular-nums whitespace-nowrap shrink-0">
                      {callout.coord}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Finish Note & Direct Store Sync Link */}
          <div className="pt-5 border-t border-[#181615]/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <p className="text-xs font-sans text-[#4A4643]">{selectedFinish.description}</p>
            <a
              href="#store"
              onClick={() => handleFinishSelect(selectedFinish)}
              className="text-xs font-mono font-bold text-[#F85E10] hover:text-[#181615] transition-colors whitespace-nowrap shrink-0"
            >
              CONFIGURE {selectedFinish.code} IN STORE →
            </a>
          </div>
        </div>

        {/* Right Column: 4 Interactive Architecture Modules */}
        <div className="lg:col-span-5 flex flex-col justify-between gap-4">
          {ARCHITECTURE_LAYERS.map((layer) => {
            const isSelected = layer.id === activeLayerId;
            const IconComponent =
              layer.id === 'controls'
                ? Sliders
                : layer.id === 'fpga'
                ? Cpu
                : layer.id === 'display'
                ? Maximize2
                : Volume2;

            return (
              <button
                key={layer.id}
                type="button"
                onClick={() => setActiveLayerId(layer.id)}
                className={`w-full text-left rounded-[26px] p-6 transition-all duration-200 border ${
                  isSelected
                    ? 'bg-[#181615] text-[#F5EFE6] border-[#181615] shadow-[0_18px_36px_-12px_rgba(24,22,21,0.35)]'
                    : 'bg-[#E3DFDC]/65 text-[#181615] border-white/60 hover:bg-[#E3DFDC]'
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2 text-xs font-mono">
                      <span className="text-[#F85E10] font-bold">{layer.index}</span>
                      <span className={isSelected ? 'text-[#CEC8C2]' : 'text-[#4A4643]'}>
                        {layer.subtitle}
                      </span>
                    </div>
                    <h3 className="font-headline font-semibold text-lg sm:text-xl tracking-tight">
                      {layer.title}
                    </h3>
                  </div>

                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                      isSelected
                        ? 'bg-[#F85E10] text-white'
                        : 'bg-[#C4BDB7]/60 text-[#181615]'
                    }`}
                  >
                    <IconComponent className="w-5 h-5" />
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-current/10 flex items-center justify-between text-xs font-mono tabular-nums">
                  <span className={isSelected ? 'text-[#CEC8C2]' : 'text-[#4A4643]'}>
                    {layer.metric} {layer.metricUnit}
                  </span>
                  <span className="text-[#F85E10] font-bold whitespace-nowrap shrink-0">
                    {isSelected ? 'ACTIVE LAYER' : 'INSPECT →'}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Bottom Quantitative Proof Strip */}
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          {
            metric: '0.08 ms',
            label: 'Hardware FPGA Input Latency',
            context: 'Measured via high-speed optical sensor vs original CRT',
          },
          {
            metric: '1600×1440',
            label: 'Custom 10:9 LTPS Glass Matrix',
            context: 'Exact 10× integer pixel multiplier with zero scaling blur',
          },
          {
            metric: '14.5 hrs',
            label: 'Continuous Gameplay Runtime',
            context: '4,200 mAh high-density Li-Po cell with 30W USB-C PD fast charge',
          },
          {
            metric: '2,800+',
            label: 'Legacy & Native Cartridges Supported',
            context: 'Direct physical pin compatibility + OpenFPGA core bus',
          },
        ].map((item) => (
          <div
            key={item.label}
            className="bg-[#E3DFDC]/55 rounded-[24px] p-6 border border-white/50 flex flex-col justify-between"
          >
            <div>
              <div className="font-mono font-bold text-2xl sm:text-3xl text-[#181615] tabular-nums">
                {item.metric}
              </div>
              <div className="font-headline font-semibold text-sm sm:text-base text-[#181615] mt-1">
                {item.label}
              </div>
            </div>
            <p className="text-xs font-sans text-[#4A4643] mt-3 leading-relaxed">
              {item.context}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};
