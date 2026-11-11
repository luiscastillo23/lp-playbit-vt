import React from 'react';
import { siteConfig } from '../../config/siteConfig';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full border-t border-[#181615]/15 bg-[#BCB4AE]/60">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 py-14 flex flex-col gap-10">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div className="space-y-2 max-w-md">
            <a
              href="#console"
              className="font-display font-extrabold text-base tracking-[0.24em] text-[#181615] hover:text-[#F85E10] transition-colors"
            >
              {siteConfig.brand}
            </a>
            <p className="text-xs text-[#3A3633] leading-relaxed">
              Precision handheld gaming hardware and ferroelectric cartridge media. Engineered in Kyoto and Munich with modular Torx T6 repairability.
            </p>
          </div>

          <nav
            aria-label="Footer Navigation"
            className="flex flex-wrap items-center gap-6 text-xs font-medium text-[#3A3633]"
          >
            {siteConfig.navItems.map((item) => (
              <a
                key={item.id}
                href={item.href}
                className="hover:text-[#181615] transition-colors whitespace-nowrap"
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>

        <div className="pt-8 border-t border-[#181615]/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-[#4A4643]">
          <div>
            &copy; {new Date().getFullYear()} PLAYBIT Hardware GmbH &amp; Co. KG. All rights reserved.
          </div>
          <div>
            <span>ISO 9001 CNC Certified</span>
            <span aria-hidden="true" className="mx-2">·</span>
            <span>RoHS 3 &amp; CE Compliant</span>
            <span aria-hidden="true" className="mx-2">·</span>
            <span>Open FPGA Verilog SDK</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
