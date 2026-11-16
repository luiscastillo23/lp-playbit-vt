import React, { useState } from 'react';
import { Logo } from '../ui/Logo';

export const Footer: React.FC = () => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterStatus, setNewsletterStatus] = useState<
    'idle' | 'error' | 'subscribed'
  >('idle');

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(newsletterEmail.trim())) {
      setNewsletterStatus('error');
      return;
    }
    setNewsletterStatus('subscribed');
  };

  return (
    <footer className="relative w-full bg-[#181615] text-[#FBF8F3] border-t border-white/10 mt-12">
      <div className="max-w-[1600px] mx-auto px-6 sm:px-10 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-14 border-b border-white/10">
          {/* Brand Column */}
          <div className="lg:col-span-4 space-y-4">
            <div className="inline-block bg-[#FBF8F3] px-3.5 py-2 rounded-xl">
              <Logo />
            </div>
            <p className="text-xs sm:text-sm text-[#CEC8C2] font-sans leading-relaxed max-w-sm">
              PLAYBIT Hardware Division designs pocket-sized tactile gaming
              instruments, solid-state FRAM cartridges, and open SDK tools for
              independent studios.
            </p>
            <div className="text-xs font-mono text-[#C4BDB7]">
              ZURICH · TOKYO · STOCKHOLM · ISO-9001 PRECISION ASSEMBLY
            </div>
          </div>

          {/* Navigation Columns */}
          <div className="lg:col-span-2 space-y-3">
            <div className="text-xs font-mono font-bold text-[#F85E10] tracking-widest">
              NAVIGATION
            </div>
            <ul className="space-y-2.5 text-sm font-sans text-[#CEC8C2]">
              <li>
                <a
                  href="#console"
                  className="hover:text-white transition-colors whitespace-nowrap"
                >
                  Console Architecture
                </a>
              </li>
              <li>
                <a
                  href="#games"
                  className="hover:text-white transition-colors whitespace-nowrap"
                >
                  Cartridge Catalog
                </a>
              </li>
              <li>
                <a
                  href="#specs"
                  className="hover:text-white transition-colors whitespace-nowrap"
                >
                  Technical Specs
                </a>
              </li>
              <li>
                <a
                  href="#store"
                  className="hover:text-white transition-colors whitespace-nowrap"
                >
                  Batch 01 Store
                </a>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-2 space-y-3">
            <div className="text-xs font-mono font-bold text-[#F85E10] tracking-widest">
              DEVELOPERS
            </div>
            <ul className="space-y-2.5 text-sm font-sans text-[#CEC8C2]">
              <li>
                <a
                  href="#store"
                  className="hover:text-white transition-colors whitespace-nowrap"
                >
                  C / Lua / Zig SDK
                </a>
              </li>
              <li>
                <a
                  href="#specs"
                  className="hover:text-white transition-colors whitespace-nowrap"
                >
                  48-Pin FRAM Pinout
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  className="hover:text-white transition-colors whitespace-nowrap"
                >
                  Cartridge Publishing
                </a>
              </li>
              <li>
                <a
                  href="#console"
                  className="hover:text-white transition-colors whitespace-nowrap"
                >
                  CAD Shell Schematics
                </a>
              </li>
            </ul>
          </div>

          {/* Firmware & Release Dispatch */}
          <div className="lg:col-span-4 space-y-4">
            <div className="text-xs font-mono font-bold text-[#F85E10] tracking-widest">
              STUDIO RELEASE DISPATCH
            </div>
            <p className="text-xs sm:text-sm text-[#CEC8C2] font-sans leading-relaxed">
              Receive quarterly cartridge pressings, PLAYBIT OS firmware notes,
              and Batch 02 allocation dates.
            </p>

            {newsletterStatus === 'subscribed' ? (
              <div className="rounded-xl bg-[#262321] border border-[#F85E10]/50 px-4 py-3 text-xs font-mono text-[#FBF8F3]">
                Subscribed ({newsletterEmail.trim()}). Next dispatch: Q4 2026.
              </div>
            ) : (
              <form
                onSubmit={handleNewsletterSubmit}
                noValidate
                className="flex flex-col sm:flex-row gap-2.5"
              >
                <label htmlFor="footer-newsletter" className="sr-only">
                  Email for studio dispatch
                </label>
                <input
                  id="footer-newsletter"
                  type="email"
                  value={newsletterEmail}
                  onChange={(e) => {
                    setNewsletterEmail(e.target.value);
                    if (newsletterStatus === 'error') {
                      setNewsletterStatus('idle');
                    }
                  }}
                  placeholder="engineer@domain.com"
                  className="flex-1 px-4 py-3 rounded-xl bg-[#262321] border border-white/15 text-xs sm:text-sm font-sans text-white placeholder:text-[#C4BDB7]/60 focus:outline-none focus:border-[#F85E10]"
                />
                <button
                  type="submit"
                  className="px-5 py-3 rounded-xl bg-[#F85E10] text-white font-display font-bold text-xs tracking-wider uppercase hover:bg-[#e04f06] transition-colors whitespace-nowrap shrink-0"
                >
                  Join List
                </button>
              </form>
            )}
            {newsletterStatus === 'error' && (
              <p role="alert" className="text-xs font-mono text-[#FF8A47]">
                Please enter a valid email address.
              </p>
            )}
          </div>
        </div>

        {/* Bottom Legal & Copyright Row */}
        <div className="pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs font-mono text-[#C4BDB7]">
          <div>
            © 2026 PLAYBIT INSTRUMENTS AG. ALL RIGHTS RESERVED.
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <a href="#top" className="hover:text-white transition-colors">
              Back to Top ↑
            </a>
            <span aria-hidden="true">·</span>
            <a href="#specs" className="hover:text-white transition-colors">
              Hardware Compliance
            </a>
            <span aria-hidden="true">·</span>
            <a href="#contact" className="hover:text-white transition-colors">
              Press Kit
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
