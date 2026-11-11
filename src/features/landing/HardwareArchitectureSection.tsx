import React, { useState } from 'react';
import { siteConfig, HardwareCapability } from '../../config/siteConfig';

export const HardwareArchitectureSection: React.FC = () => {
  const [selectedDiagram, setSelectedDiagram] = useState<string>('fpga');

  const renderTechnicalDiagram = (type: HardwareCapability['diagramType']) => {
    switch (type) {
      case 'fpga':
        return (
          <svg
            viewBox="0 0 360 110"
            className="w-full h-28 bg-[#181615] rounded-xl p-3 border border-white/10"
            aria-label="Cyclone V FPGA Silicon Bus Schematic"
          >
            {/* Cartridge 44-pin edge */}
            <rect x="14" y="22" width="68" height="66" rx="6" fill="#2A2624" stroke="#F85E10" strokeWidth="1.5" />
            <text x="48" y="50" textAnchor="middle" fill="#FFFFFF" fontSize="9" fontFamily="monospace" fontWeight="bold">
              FRAM CART
            </text>
            <text x="48" y="64" textAnchor="middle" fill="#F85E10" fontSize="8" fontFamily="monospace">
              44-PIN BUS
            </text>

            {/* Parallel Bus Lines */}
            {[34, 46, 58, 70].map((y) => (
              <line
                key={y}
                x1="82"
                y1={y}
                x2="138"
                y2={y}
                stroke="#F85E10"
                strokeWidth="1.5"
                strokeDasharray="4 2"
              />
            ))}

            {/* Central Cyclone V FPGA Die */}
            <rect x="138" y="14" width="92" height="82" rx="8" fill="#F85E10" fillOpacity="0.16" stroke="#F85E10" strokeWidth="1.8" />
            <rect x="150" y="26" width="68" height="58" rx="4" fill="#181615" stroke="#FFFFFF" strokeOpacity="0.35" />
            <text x="184" y="51" textAnchor="middle" fill="#FFFFFF" fontSize="9" fontFamily="monospace" fontWeight="bold">
              CYCLONE V
            </text>
            <text x="184" y="65" textAnchor="middle" fill="#F85E10" fontSize="8" fontFamily="monospace">
              49,000 LEs
            </text>

            {/* Direct Scanline Out */}
            {[38, 55, 72].map((y) => (
              <line key={y} x1="230" y1={y} x2="278" y2={y} stroke="#FFFFFF" strokeOpacity="0.5" strokeWidth="1.5" />
            ))}

            {/* Zero-Buffer OLED Timing Controller */}
            <rect x="278" y="22" width="68" height="66" rx="6" fill="#2A2624" stroke="#FFFFFF" strokeOpacity="0.4" strokeWidth="1.2" />
            <text x="312" y="50" textAnchor="middle" fill="#FFFFFF" fontSize="9" fontFamily="monospace" fontWeight="bold">
              LTPO OLED
            </text>
            <text x="312" y="64" textAnchor="middle" fill="#A39E99" fontSize="8" fontFamily="monospace">
              0.08ms OUT
            </text>
          </svg>
        );
      case 'oled':
        return (
          <svg
            viewBox="0 0 240 110"
            className="w-full h-28 bg-[#181615] rounded-xl p-3 border border-white/10"
            aria-label="1600x1440 Integer Sub-Pixel Matrix"
          >
            {/* RGB Sub-pixel Grid */}
            {[0, 1, 2, 3, 4].map((col) =>
              [0, 1, 2].map((row) => {
                const x = 22 + col * 38;
                const y = 20 + row * 26;
                return (
                  <g key={`${col}-${row}`}>
                    <rect x={x} y={y} width="8" height="18" rx="1.5" fill="#F85E10" />
                    <rect x={x + 10} y={y} width="8" height="18" rx="1.5" fill="#22C55E" />
                    <rect x={x + 20} y={y} width="8" height="18" rx="1.5" fill="#38BDF8" />
                  </g>
                );
              })
            )}
            <text x="120" y="102" textAnchor="middle" fill="#FFFFFF" fontSize="8" fontFamily="monospace">
              10× INTEGER PIXEL LOCK · 571 PPI
            </text>
          </svg>
        );
      case 'switches':
        return (
          <svg
            viewBox="0 0 240 110"
            className="w-full h-28 bg-[#181615] rounded-xl p-3 border border-white/10"
            aria-label="Kailh Tactile Mechanical Switch Profile"
          >
            {/* PBT Keycap Cross-Section */}
            <rect x="65" y="16" width="110" height="22" rx="6" fill="#F85E10" />
            <text x="120" y="30" textAnchor="middle" fill="#FFFFFF" fontSize="8" fontFamily="monospace" fontWeight="bold">
              DOUBLE-SHOT PBT CAP
            </text>
            {/* Stainless Actuator Stem */}
            <rect x="106" y="38" width="28" height="20" fill="#E5DDD0" />
            {/* Gold-Plated Tactile Leaf & Housing */}
            <rect x="50" y="58" width="140" height="26" rx="4" fill="#2A2624" stroke="#FFFFFF" strokeOpacity="0.3" />
            <path d="M 75 74 Q 120 56 165 74" fill="none" stroke="#F85E10" strokeWidth="2.5" />
            <text x="120" y="99" textAnchor="middle" fill="#A39E99" fontSize="8" fontFamily="monospace">
              0.8MM PRE-TRAVEL · 55GF FORCE
            </text>
          </svg>
        );
      case 'audio':
        return (
          <svg
            viewBox="0 0 360 110"
            className="w-full h-28 bg-[#181615] rounded-xl p-3 border border-white/10"
            aria-label="6-Operator FM Synth Harmonic Waveform"
          >
            <path
              d="M 16 55 C 36 10, 56 100, 76 55 C 96 15, 116 95, 136 55 C 156 5, 176 105, 196 55 C 216 20, 236 90, 256 55 C 276 12, 296 98, 316 55 L 344 55"
              fill="none"
              stroke="#F85E10"
              strokeWidth="2.2"
            />
            <path
              d="M 16 55 C 46 30, 76 80, 106 55 C 136 30, 166 80, 196 55 C 226 30, 256 80, 286 55 L 344 55"
              fill="none"
              stroke="#FFFFFF"
              strokeOpacity="0.45"
              strokeWidth="1.2"
            />
            <text x="180" y="98" textAnchor="middle" fill="#FFFFFF" fontSize="8" fontFamily="monospace">
              TI BURR-BROWN PCM5122 · 32-BIT / 384KHZ · 118 DB SNR
            </text>
          </svg>
        );
    }
  };

  return (
    <section
      id="architecture"
      className="w-full max-w-[1440px] mx-auto px-6 sm:px-10 py-20 lg:py-28 border-t border-[#181615]/15"
    >
      {/* Section Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
        <div className="space-y-3 max-w-2xl">
          <div className="text-xs font-mono font-bold text-[#F85E10] tracking-wider">
            Hardware Architecture &amp; Silicon Engineering
          </div>
          <h2
            className="font-headline font-extrabold text-3xl sm:text-4xl text-[#181615] tracking-tight"
            style={{ textWrap: 'balance' }}
          >
            Engineered to Eliminate Software Emulation Jitter
          </h2>
        </div>
        <p className="max-w-md text-sm text-[#3A3633] leading-relaxed">
          Every PLAYBIT subsystem is isolated on its own clock domain—pairing an Altera Cyclone V FPGA with a zero-buffer LTPO OLED panel and discrete audiophile DAC.
        </p>
      </div>

      {/* Asymmetric Bento-Grid (2+1 & 1+2 Spans) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {siteConfig.capabilities.map((cap) => {
          const isWide = cap.span === 'wide';
          const isFocused = selectedDiagram === cap.diagramType;
          return (
            <article
              key={cap.index}
              onClick={() => setSelectedDiagram(cap.diagramType)}
              className={`${
                isWide ? 'lg:col-span-2' : 'lg:col-span-1'
              } rounded-2xl p-6 sm:p-8 transition-colors cursor-pointer border ${
                isFocused
                  ? 'bg-[#DFD9D3] border-[#F85E10]'
                  : 'bg-[#D6D0CA]/75 border-[#181615]/10 hover:border-[#181615]/30'
              } flex flex-col justify-between gap-6`}
            >
              <div className="space-y-4">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <span className="text-xs font-mono font-bold text-[#F85E10]">
                    {cap.index}
                  </span>
                  <span className="text-xs text-[#4A4643] font-mono">
                    {cap.subtitle}
                  </span>
                </div>

                <h3
                  className="font-headline font-bold text-xl sm:text-2xl text-[#181615] tracking-tight"
                  style={{ textWrap: 'balance' }}
                >
                  {cap.title}
                </h3>

                <p className="text-sm text-[#3A3633] leading-relaxed max-w-[68ch]">
                  {cap.description}
                </p>
              </div>

              <div className="space-y-4">
                {renderTechnicalDiagram(cap.diagramType)}

                <div className="pt-3 border-t border-[#181615]/10 flex flex-wrap items-baseline justify-between gap-4">
                  <div>
                    <span className="text-2xl font-display font-extrabold text-[#181615] tabular-nums">
                      {cap.metricValue}
                    </span>
                    <span className="ml-2 text-xs font-semibold text-[#F85E10]">
                      {cap.metricUnit}
                    </span>
                  </div>
                  <p className="text-xs text-[#4A4643]">{cap.metricContext}</p>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      {/* Claim-to-Proof Adjacent Section: Verified Lab & Studio Benchmarks */}
      <div className="mt-16 pt-12 border-t border-[#181615]/15">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="text-xs font-mono font-bold text-[#F85E10]">
              Independent Hardware Verification
            </div>
            <h3 className="font-headline font-bold text-2xl text-[#181615] tracking-tight mt-1">
              Measured by Arcade Preservationists &amp; Touring Synth Artists
            </h3>
          </div>
          <div className="text-xs text-[#4A4643] font-mono tabular-nums">
            1,000 FPS High-Speed Camera &amp; Audio Precision APx555 Bench Tested
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {siteConfig.engineeringProofs.map((proof) => (
            <blockquote
              key={proof.author}
              className="rounded-2xl bg-[#D6D0CA]/60 border border-[#181615]/10 p-6 flex flex-col justify-between gap-6"
            >
              <div className="space-y-4">
                <div className="text-xs font-mono font-bold text-[#F85E10] tabular-nums">
                  {proof.beforeAfterMetric}
                </div>
                <p className="text-sm text-[#181615] leading-relaxed">
                  &ldquo;{proof.quote}&rdquo;
                </p>
              </div>
              <footer className="pt-4 border-t border-[#181615]/10 text-xs">
                <div className="font-bold text-[#181615]">{proof.author}</div>
                <div className="text-[#4A4643]">
                  {proof.role} · {proof.organization}
                </div>
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
};
