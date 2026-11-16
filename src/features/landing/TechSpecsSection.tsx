import React, { useState } from 'react';
import {
  BatteryConfig,
  calculateBatteryEstimate,
} from '../../utils/landingLogic';

const SPEC_GROUPS = [
  {
    index: '01',
    category: 'Display & Optical Stack',
    rows: [
      { label: 'Panel Type', value: '3.5" Square LTPO OLED (1:1 Aspect)' },
      { label: 'Native Resolution', value: '720 × 720 px · 291 PPI' },
      { label: 'Refresh Rate', value: 'Variable 30Hz – 120Hz VRR' },
      { label: 'Cover Lens', value: '0.8mm CNC Gorilla Glass · AR Coated' },
    ],
  },
  {
    index: '02',
    category: 'Compute & FPGA Co-Processor',
    rows: [
      { label: 'Primary SoC', value: 'Quad-Core ARM Cortex-A76 @ 2.2 GHz' },
      { label: 'Hardware FPGA', value: '49K LUT Logic Fabric for Cycle Timing' },
      { label: 'System Memory', value: '4 GB LPDDR5 · 6400 MT/s' },
      { label: 'Internal Storage', value: '64 GB eMMC 5.1 + MicroSDXC UHS-I' },
    ],
  },
  {
    index: '03',
    category: 'Acoustics & Connectivity',
    rows: [
      { label: 'DAC Architecture', value: 'Cirrus Logic 24-Bit / 96kHz MasterHIFI' },
      { label: 'Wireless', value: 'Wi-Fi 6E (802.11ax) + Bluetooth 5.3 LE' },
      { label: 'Physical Ports', value: 'Dual USB-C 3.2 · 3.5mm TRS · 48-Pin Bay' },
      { label: 'Multiplayer Link', value: 'Sub-2ms Local Peer Mesh + Link Cable' },
    ],
  },
  {
    index: '04',
    category: 'Dimensions & Power Envelope',
    rows: [
      { label: 'Footprint', value: '91.4 × 136.0 × 13.8 mm' },
      { label: 'Mass', value: '184 g (Chassis + Internal Battery)' },
      { label: 'Battery Cell', value: '4,000 mAh / 14.8 Wh High-Density Li-Po' },
      { label: 'Charging Protocol', value: 'USB-C PD 3.0 · 27W Magnetic Pogo Dock' },
    ],
  },
];

export const TechSpecsSection: React.FC = () => {
  const [batteryConfig, setBatteryConfig] = useState<BatteryConfig>({
    brightnessPercent: 60,
    audioOutput: 'speaker',
    shaderMode: 'crt-scanline',
  });

  const estimate = calculateBatteryEstimate(batteryConfig);

  return (
    <section
      id="specs"
      aria-labelledby="specs-heading"
      className="relative w-full max-w-[1600px] mx-auto px-6 sm:px-10 py-20 lg:py-28 border-t border-[#181615]/10"
    >
      {/* Section Header */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-14 lg:mb-20">
        <div className="lg:col-span-7">
          <div className="flex items-center gap-3 text-xs sm:text-sm font-mono font-bold text-[#F85E10] tracking-widest mb-3">
            <span>/ 03</span>
            <span aria-hidden="true">·</span>
            <span>TECHNICAL SPECIFICATIONS</span>
          </div>
          <h2
            id="specs-heading"
            className="font-headline font-semibold text-3xl sm:text-5xl text-[#181615] tracking-tight leading-[1.06] uppercase"
          >
            CYCLE-ACCURATE SILICON & TELEMETRY
          </h2>
        </div>
        <div className="lg:col-span-5 flex flex-col lg:items-end justify-end">
          <p className="text-sm sm:text-base text-[#4A4643] font-sans leading-relaxed max-w-md">
            Hybrid ARM + FPGA architecture pairs modern 120Hz OLED shaders with
            deterministic sub-millisecond hardware input polling.
          </p>
        </div>
      </div>

      {/* Interactive Battery & Thermal Session Simulator */}
      <div className="rounded-[28px] bg-[#181615] text-[#FBF8F3] p-6 sm:p-10 mb-10 border border-[#181615]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div>
              <div className="text-xs font-mono text-[#F85E10] tracking-widest">
                INTERACTIVE POWER BENCHMARK
              </div>
              <h3 className="font-headline font-semibold text-2xl sm:text-3xl text-white mt-1">
                SIMULATE SESSION BATTERY RUNTIME
              </h3>
              <p className="text-xs sm:text-sm text-[#CEC8C2] font-sans mt-1.5 max-w-xl">
                Adjust panel luminance, audio output path, and FPGA shader
                pipeline to calculate real-world discharge rate from the 14.8 Wh
                cell.
              </p>
            </div>

            {/* Brightness Slider */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-mono">
                <label htmlFor="oled-brightness" className="text-[#CEC8C2]">
                  OLED PANEL LUMINANCE
                </label>
                <span className="text-[#F85E10] font-bold tabular-nums">
                  {batteryConfig.brightnessPercent}% (
                  {Math.round((batteryConfig.brightnessPercent / 100) * 600)}{' '}
                  nits)
                </span>
              </div>
              <input
                id="oled-brightness"
                type="range"
                min={20}
                max={100}
                step={10}
                value={batteryConfig.brightnessPercent}
                onChange={(e) =>
                  setBatteryConfig((prev) => ({
                    ...prev,
                    brightnessPercent: Number(e.target.value),
                  }))
                }
                className="w-full accent-[#F85E10] cursor-pointer"
              />
            </div>

            {/* Audio & Shader Controls */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <div className="text-xs font-mono text-[#CEC8C2] mb-2">
                  AUDIO OUTPUT STAGE
                </div>
                <div
                  role="group"
                  aria-label="Audio Output Mode"
                  className="flex flex-wrap gap-1.5 bg-[#262321] p-1.5 rounded-xl border border-white/10"
                >
                  {(
                    [
                      { id: 'speaker', label: '2W Speaker' },
                      { id: 'headphones', label: '3.5mm / IEM' },
                      { id: 'muted', label: 'Muted' },
                    ] as const
                  ).map((mode) => {
                    const active = batteryConfig.audioOutput === mode.id;
                    return (
                      <button
                        key={mode.id}
                        type="button"
                        onClick={() =>
                          setBatteryConfig((prev) => ({
                            ...prev,
                            audioOutput: mode.id,
                          }))
                        }
                        aria-pressed={active}
                        className={`flex-1 px-3 py-2 rounded-lg text-xs font-mono transition-colors whitespace-nowrap shrink-0 ${
                          active
                            ? 'bg-[#F85E10] text-white font-bold'
                            : 'text-[#CEC8C2] hover:text-white'
                        }`}
                      >
                        {mode.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <div className="text-xs font-mono text-[#CEC8C2] mb-2">
                  FPGA SHADER WORKLOAD
                </div>
                <div
                  role="group"
                  aria-label="Shader Pipeline Mode"
                  className="flex flex-wrap gap-1.5 bg-[#262321] p-1.5 rounded-xl border border-white/10"
                >
                  {(
                    [
                      { id: '8bit-native', label: '8-Bit Core' },
                      { id: 'crt-scanline', label: 'CRT Mask' },
                      { id: '16bit-overclock', label: '120Hz 3D' },
                    ] as const
                  ).map((shader) => {
                    const active = batteryConfig.shaderMode === shader.id;
                    return (
                      <button
                        key={shader.id}
                        type="button"
                        onClick={() =>
                          setBatteryConfig((prev) => ({
                            ...prev,
                            shaderMode: shader.id,
                          }))
                        }
                        aria-pressed={active}
                        className={`flex-1 px-3 py-2 rounded-lg text-xs font-mono transition-colors whitespace-nowrap shrink-0 ${
                          active
                            ? 'bg-[#F85E10] text-white font-bold'
                            : 'text-[#CEC8C2] hover:text-white'
                        }`}
                      >
                        {shader.label}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Right: Calculated Runtime Readout */}
          <div className="lg:col-span-5 rounded-2xl bg-[#24211F] border border-white/10 p-6 sm:p-8 flex flex-col justify-between space-y-6">
            <div>
              <div className="text-xs font-mono text-[#C4BDB7]">
                ESTIMATED CONTINUOUS PLAYTIME
              </div>
              <div className="flex items-baseline gap-3 mt-2">
                <span
                  data-testid="battery-runtime-hours"
                  className="font-display font-extrabold text-5xl sm:text-6xl text-[#F85E10] tabular-nums"
                >
                  {estimate.runtimeHours.toFixed(1)}
                </span>
                <span className="font-mono text-sm sm:text-base text-white uppercase">
                  HOURS / CHARGE
                </span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 pt-5 border-t border-white/10 font-mono">
              <div>
                <div className="text-[11px] text-[#C4BDB7]">DRAW</div>
                <div className="text-sm sm:text-base font-bold text-white tabular-nums mt-0.5">
                  {estimate.powerDrawMilliwatts} mW
                </div>
              </div>
              <div>
                <div className="text-[11px] text-[#C4BDB7]">0–80% PD</div>
                <div className="text-sm sm:text-base font-bold text-white tabular-nums mt-0.5">
                  {estimate.fastChargeMinutesTo80} min
                </div>
              </div>
              <div>
                <div className="text-[11px] text-[#C4BDB7]">STANDBY</div>
                <div className="text-sm sm:text-base font-bold text-white tabular-nums mt-0.5">
                  {estimate.standbyDays} days
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 4-Quadrant Spec Sheet Table */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
        {SPEC_GROUPS.map((group) => (
          <div
            key={group.index}
            className="rounded-[24px] bg-[#E3DFDC]/80 border border-[#181615]/10 p-6 sm:p-8"
          >
            <div className="flex items-center justify-between gap-3 pb-4 mb-5 border-b border-[#181615]/10">
              <h3 className="font-headline font-semibold text-xl sm:text-2xl text-[#181615]">
                {group.index}. {group.category}
              </h3>
              <span className="font-mono text-xs text-[#F85E10] font-bold whitespace-nowrap shrink-0">
                REV 2026.4
              </span>
            </div>

            <dl className="divide-y divide-[#181615]/10 font-mono text-xs sm:text-sm">
              {group.rows.map((row) => (
                <div
                  key={row.label}
                  className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-4"
                >
                  <dt className="text-[#4A4643]">{row.label}</dt>
                  <dd className="text-[#181615] font-bold tabular-nums sm:text-right">
                    {row.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        ))}
      </div>
    </section>
  );
};
