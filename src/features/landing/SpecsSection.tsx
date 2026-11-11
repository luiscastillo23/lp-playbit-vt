import React, { useState } from 'react';
import { siteConfig, SpecCategory } from '../../config/siteConfig';

export const SpecsSection: React.FC = () => {
  const [activeCategoryId, setActiveCategoryId] =
    useState<SpecCategory['id']>('display');

  const activeCategory =
    siteConfig.specCategories.find((c) => c.id === activeCategoryId) ||
    siteConfig.specCategories[0];

  return (
    <section
      id="specs"
      className="w-full max-w-[1440px] mx-auto px-6 sm:px-10 py-20 lg:py-28 border-t border-[#181615]/15"
    >
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
        <div className="space-y-3 max-w-2xl">
          <div className="text-xs font-mono font-bold text-[#F85E10] tracking-wider">
            Complete Hardware Datasheet
          </div>
          <h2
            className="font-headline font-extrabold text-3xl sm:text-4xl text-[#181615] tracking-tight"
            style={{ textWrap: 'balance' }}
          >
            Dimensional Blueprints &amp; Component Tolerances
          </h2>
        </div>

        {/* Subsystem Selector Tabs */}
        <div
          role="tablist"
          aria-label="Hardware Specification Subsystems"
          className="inline-flex flex-wrap items-center gap-1 p-1 bg-[#D6D0CA] rounded-lg border border-[#181615]/10"
        >
          {siteConfig.specCategories.map((cat) => {
            const isActive = cat.id === activeCategoryId;
            return (
              <button
                key={cat.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveCategoryId(cat.id)}
                className={`px-3 py-2 text-xs font-semibold rounded-md transition-colors whitespace-nowrap shrink-0 ${
                  isActive
                    ? 'bg-[#181615] text-white shadow-sm'
                    : 'text-[#3A3633] hover:text-[#181615]'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* 12-Column Split: CAD Blueprint + Tabular Spec Sheet */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        {/* Left 5 Columns: Orthographic CAD Blueprint SVG */}
        <div className="lg:col-span-5 rounded-2xl bg-[#181615] text-white p-6 sm:p-8 flex flex-col justify-between border border-white/10">
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-mono text-[#F85E10]">
              <span>CAD ORTHOGRAPHIC PROJECTION</span>
              <span className="tabular-nums">SCALE 1:1 · TOL ±0.02MM</span>
            </div>
            <h3 className="font-headline font-bold text-lg text-white">
              6061-T6 Unibody Enclosure Geometry
            </h3>
          </div>

          <div className="my-6 flex items-center justify-center">
            <svg
              viewBox="0 0 320 260"
              className="w-full max-w-[320px] h-auto"
              aria-label="PLAYBIT Dimensional Blueprint"
            >
              {/* Subtle Blueprint Grid */}
              <defs>
                <pattern
                  id="cadGrid"
                  width="20"
                  height="20"
                  patternUnits="userSpaceOnUse"
                >
                  <path
                    d="M 20 0 L 0 0 0 20"
                    fill="none"
                    stroke="rgba(255,255,255,0.06)"
                    strokeWidth="0.75"
                  />
                </pattern>
              </defs>
              <rect width="320" height="260" rx="8" fill="url(#cadGrid)" />

              {/* Top Dimension Callout: 88.5 mm Width */}
              <line x1="45" y1="20" x2="175" y2="20" stroke="#F85E10" strokeWidth="1" />
              <line x1="45" y1="15" x2="45" y2="25" stroke="#F85E10" strokeWidth="1" />
              <line x1="175" y1="15" x2="175" y2="25" stroke="#F85E10" strokeWidth="1" />
              <text
                x="110"
                y="14"
                textAnchor="middle"
                fill="#F85E10"
                fontSize="8.5"
                fontFamily="monospace"
                fontWeight="bold"
              >
                88.5 MM
              </text>

              {/* Front View Outline */}
              <rect
                x="45"
                y="32"
                width="130"
                height="200"
                rx="16"
                fill="rgba(255,255,255,0.03)"
                stroke="#FFFFFF"
                strokeWidth="1.5"
              />
              {/* 3.5" 10:9 OLED Viewport */}
              <rect
                x="56"
                y="44"
                width="108"
                height="92"
                rx="8"
                fill="rgba(248,94,16,0.12)"
                stroke="#F85E10"
                strokeWidth="1.2"
              />
              <text
                x="110"
                y="88"
                textAnchor="middle"
                fill="#FFFFFF"
                fontSize="8"
                fontFamily="monospace"
              >
                3.5&quot; LTPO OLED
              </text>
              <text
                x="110"
                y="100"
                textAnchor="middle"
                fill="#F85E10"
                fontSize="7.5"
                fontFamily="monospace"
              >
                1600 × 1440 PX
              </text>

              {/* D-Pad CAD Cross */}
              <circle
                cx="78"
                cy="172"
                r="18"
                fill="none"
                stroke="rgba(255,255,255,0.35)"
                strokeDasharray="2 2"
              />
              <path
                d="M 73 158 H 83 V 167 H 92 V 177 H 83 V 186 H 73 V 177 H 64 V 167 H 73 Z"
                fill="none"
                stroke="#FFFFFF"
                strokeWidth="1.1"
              />

              {/* Action B & A CAD Circles */}
              <circle cx="132" cy="180" r="8.5" fill="none" stroke="#F85E10" strokeWidth="1.2" />
              <circle cx="150" cy="166" r="8.5" fill="none" stroke="#F85E10" strokeWidth="1.2" />

              {/* Side Profile View (19.2 mm Depth) */}
              <rect
                x="222"
                y="32"
                width="28"
                height="200"
                rx="8"
                fill="rgba(255,255,255,0.03)"
                stroke="#FFFFFF"
                strokeWidth="1.5"
              />
              {/* Cartridge Slot Cutout */}
              <rect
                x="234"
                y="32"
                width="16"
                height="62"
                rx="3"
                fill="rgba(248,94,16,0.22)"
                stroke="#F85E10"
                strokeWidth="1"
              />

              {/* Height Callout: 138.0 mm */}
              <line x1="276" y1="32" x2="276" y2="232" stroke="#F85E10" strokeWidth="1" />
              <line x1="271" y1="32" x2="281" y2="32" stroke="#F85E10" strokeWidth="1" />
              <line x1="271" y1="232" x2="281" y2="232" stroke="#F85E10" strokeWidth="1" />
              <text
                x="296"
                y="135"
                textAnchor="middle"
                fill="#F85E10"
                fontSize="8.5"
                fontFamily="monospace"
                fontWeight="bold"
                transform="rotate(90 296 135)"
              >
                138.0 MM HEIGHT
              </text>

              {/* Depth Callout: 19.2 mm */}
              <text
                x="236"
                y="248"
                textAnchor="middle"
                fill="#FFFFFF"
                fontSize="8"
                fontFamily="monospace"
              >
                19.2 MM
              </text>
            </svg>
          </div>

          <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono text-white/75 tabular-nums">
            <span>MASS: 195.0g (BALANCED 50:50)</span>
            <span className="text-[#F85E10]">TORX T6 MODULAR</span>
          </div>
        </div>

        {/* Right 7 Columns: Active Category Specification Table */}
        <div className="lg:col-span-7 rounded-2xl bg-[#D6D0CA]/75 border border-[#181615]/10 p-6 sm:p-8 flex flex-col justify-between">
          <div>
            <div className="pb-6 border-b border-[#181615]/15">
              <div className="text-xs font-mono font-bold text-[#F85E10]">
                Subsystem Specification · {activeCategory.label}
              </div>
              <p className="text-sm text-[#3A3633] mt-1">
                {activeCategory.summary}
              </p>
            </div>

            <div className="divide-y divide-[#181615]/10">
              {activeCategory.items.map((item) => (
                <div
                  key={item.label}
                  className="py-4 grid grid-cols-1 sm:grid-cols-12 gap-2 sm:gap-4 items-baseline"
                >
                  <div className="sm:col-span-4 text-xs font-semibold text-[#4A4643]">
                    {item.label}
                  </div>
                  <div className="sm:col-span-4 text-sm font-mono font-bold text-[#181615] tabular-nums">
                    {item.value}
                  </div>
                  <div className="sm:col-span-4 text-xs text-[#3A3633]">
                    {item.detail}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-[#181615]/15 flex flex-wrap items-center justify-between gap-4 text-xs text-[#4A4643]">
            <span>
              Open FPGA Core SDK documentation &amp; pinout schematics included with every unit.
            </span>
            <a
              href="#store"
              className="font-semibold text-[#181615] underline decoration-[#F85E10] underline-offset-4 hover:text-[#F85E10] transition-colors whitespace-nowrap shrink-0"
            >
              Configure Hardware Edition
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
