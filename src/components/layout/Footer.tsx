import React, { useState } from 'react';
import { Logo } from '../ui/Logo';
import { ArrowUpRight, X } from 'lucide-react';

interface DocModalContent {
  title: string;
  code: string;
  body: string[];
}

const DOC_TOPICS: Record<string, DocModalContent> = {
  sdk: {
    title: 'OpenFPGA Core SDK & Cartridge Pinout',
    code: 'DOC-PB-SDK-2026',
    body: [
      'PLAYBIT provides open Verilog/VHDL synthesis templates for the secondary Altera Cyclone V 49K LE fabric.',
      'Developers can target the native 1600×1440 @ 120Hz pixel bus or compile cycle-accurate 8-bit/16-bit cores directly from SDXC or physical 44-pin FRAM cartridges.',
      'Full pinout schematics, KiCad cartridge PCB templates, and USB-C UART debugging tools are included with every unit.',
    ],
  },
  warranty: {
    title: '2-Year Modular Right-to-Repair Warranty',
    code: 'DOC-PB-WRT-2026',
    body: [
      'Every PLAYBIT console is assembled using standard Torx T6 fasteners without permanent adhesives.',
      'Replacement 4,200 mAh Li-Po battery cells, ALPS micro-switch boards, and laminated LTPS glass assemblies are stocked for 7 years from Batch 01 release.',
      'Opening the enclosure for user maintenance or FPGA probing does not void your 2-year hardware warranty.',
    ],
  },
  press: {
    title: 'Industrial Design & Acoustic Lab Press Kit',
    code: 'DOC-PB-PRS-2026',
    body: [
      'Designed in Stockholm and Tokyo, PLAYBIT bridges tactile pocket hardware with zero-latency studio synthesis.',
      'For retail distribution, custom studio editions, or review unit requests, use the allocation desk in the Store section above.',
    ],
  },
};

export const Footer: React.FC = () => {
  const [activeDocKey, setActiveDocKey] = useState<string | null>(null);

  const activeDoc = activeDocKey ? DOC_TOPICS[activeDocKey] : null;

  return (
    <footer className="relative w-full max-w-[1600px] mx-auto px-6 sm:px-10 pt-16 pb-12 border-t border-[#181615]/15">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-[#181615]/10">
        {/* Brand Column */}
        <div className="md:col-span-5 space-y-4">
          <Logo />
          <p className="text-xs sm:text-sm font-sans text-[#3A3633] max-w-sm leading-relaxed">
            Precision pocket-sized retro gaming hardware and portable chiptune workstation. Milled
            from solid 6061-T6 alloy and powered by dual Cyclone V FPGA silicon.
          </p>
          <div className="flex items-center gap-2 text-xs font-mono text-[#4A4643]">
            <span>BATCH 01 PRODUCTION</span>
            <span aria-hidden="true">·</span>
            <span>STOCKHOLM / TOKYO</span>
          </div>
        </div>

        {/* Navigation Mirror */}
        <div className="md:col-span-3 space-y-3">
          <div className="text-xs font-mono font-bold text-[#181615] uppercase">
            System Navigation
          </div>
          <ul className="space-y-2 text-xs sm:text-sm font-sans text-[#3A3633]">
            <li>
              <a href="#top" className="hover:text-[#F85E10] transition-colors">
                00. Hero Showcase
              </a>
            </li>
            <li>
              <a href="#console" className="hover:text-[#F85E10] transition-colors">
                01. Console Architecture
              </a>
            </li>
            <li>
              <a href="#games" className="hover:text-[#F85E10] transition-colors">
                02. Physical Cartridge Library
              </a>
            </li>
            <li>
              <a href="#specs" className="hover:text-[#F85E10] transition-colors">
                03. Technical Specifications
              </a>
            </li>
            <li>
              <a href="#store" className="hover:text-[#F85E10] transition-colors">
                04. Direct Hardware Store
              </a>
            </li>
          </ul>
        </div>

        {/* Engineering Documentation Drawer Triggers */}
        <div className="md:col-span-4 space-y-3">
          <div className="text-xs font-mono font-bold text-[#181615] uppercase">
            Engineering & Support
          </div>
          <div className="flex flex-col items-start gap-2.5">
            <button
              type="button"
              onClick={() => setActiveDocKey('sdk')}
              className="text-xs sm:text-sm font-sans text-[#3A3633] hover:text-[#F85E10] transition-colors inline-flex items-center gap-1.5"
            >
              <span>OpenFPGA Core SDK & Pinout</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={() => setActiveDocKey('warranty')}
              className="text-xs sm:text-sm font-sans text-[#3A3633] hover:text-[#F85E10] transition-colors inline-flex items-center gap-1.5"
            >
              <span>Right-to-Repair & 2-Year Warranty</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={() => setActiveDocKey('press')}
              className="text-xs sm:text-sm font-sans text-[#3A3633] hover:text-[#F85E10] transition-colors inline-flex items-center gap-1.5"
            >
              <span>Acoustic Lab & Retail Inquiries</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Interactive Documentation Callout Drawer if Opened */}
      {activeDoc && (
        <div className="my-6 bg-[#181615] text-[#F5EFE6] rounded-[24px] p-6 sm:p-8 border border-white/10">
          <div className="flex items-start justify-between gap-4 mb-3">
            <div>
              <span className="text-xs font-mono text-[#F85E10] font-bold">
                {activeDoc.code}
              </span>
              <h4 className="font-headline font-semibold text-xl text-white mt-0.5">
                {activeDoc.title}
              </h4>
            </div>
            <button
              type="button"
              onClick={() => setActiveDocKey(null)}
              aria-label="Close documentation panel"
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <div className="space-y-2 text-xs sm:text-sm font-sans text-[#CEC8C2] max-w-3xl leading-relaxed">
            {activeDoc.body.map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>
        </div>
      )}

      {/* Bottom Legal Row */}
      <div className="pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs font-mono text-[#4A4643]">
        <div>© 2026 PLAYBIT INSTRUMENTS AB. ALL RIGHTS RESERVED.</div>
        <div className="flex items-center gap-4">
          <a href="#top" className="hover:text-[#181615] transition-colors">
            BACK TO TOP ↑
          </a>
        </div>
      </div>
    </footer>
  );
};
