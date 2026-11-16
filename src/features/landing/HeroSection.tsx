import React, { useState } from 'react';
import { siteConfig } from '../../config/siteConfig';

const SPEAKER_GRID = [
  [0, 1, 1, 1, 0],
  [1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1],
  [0, 1, 1, 1, 0],
];

export const HeroSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState('console');

  return (
    <main className="relative w-full min-h-[100svh] lg:min-h-screen overflow-hidden overflow-x-clip flex flex-col justify-between select-none">
      {/* Background Watermark */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-[12%] sm:top-[11%] left-0 w-full overflow-hidden z-0 flex justify-start pl-3 sm:pl-8"
      >
        <span className="font-display font-black text-[13.5vw] leading-none tracking-[0.06em] text-[#B5AEA8]/45 uppercase whitespace-nowrap select-none">
          RETRO GAM
        </span>
      </div>

      {/* Header */}
      <header className="relative z-40 w-full max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-10 pt-3 sm:pt-6 pb-1 sm:pb-2 flex flex-col md:flex-row items-center justify-between gap-2.5 sm:gap-3.5 md:gap-4">
        <div className="w-full md:w-auto md:flex-1 flex items-center justify-center md:justify-start order-2 md:order-1">
          <nav
            aria-label="Primary Navigation"
            className="bg-white/20 backdrop-blur-md rounded-full p-1 sm:p-1.5 inline-flex items-center justify-center gap-0.5 sm:gap-1.5 border border-white/15 shadow-sm max-w-full"
          >
            {siteConfig.navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`text-xs sm:text-sm font-sans transition-all duration-200 rounded-full whitespace-nowrap ${
                    isActive
                      ? 'bg-[#E3DFDC] text-[#181615] px-3.5 sm:px-5 py-1.5 sm:py-2 font-medium shadow-sm'
                      : 'text-[#3A3633] px-3 sm:px-4 py-1.5 sm:py-2 hover:text-black'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>
        </div>

        <div className="w-full md:w-auto md:flex-1 flex items-center justify-center md:justify-end lg:justify-center order-1 md:order-2">
          <a
            href="#top"
            className="inline-flex items-center gap-2.5 sm:gap-3 group focus:outline-none"
            aria-label="PLAYBIT Home"
          >
            <div className="w-8 h-8 border-2 border-[#F85E10] rounded-lg p-1 flex items-center justify-center relative bg-[#C4BDB7]/30 shadow-sm group-hover:scale-105 transition-transform shrink-0">
              <svg
                viewBox="0 0 16 16"
                className="w-3.5 h-3.5 text-[#181615] -translate-x-0.5 -translate-y-0.5"
                fill="currentColor"
              >
                <path d="M6 1h3v4h4v3H9v4H6V8H2V5h4V1z" />
              </svg>
              <span className="w-1 h-1 bg-[#F85E10] absolute bottom-1.5 right-2.5 rounded-[1px]" />
              <span className="w-1 h-1 bg-[#F85E10] absolute bottom-1 right-1 rounded-[1px]" />
            </div>

            <span className="font-display font-extrabold text-sm md:text-base tracking-[0.28em] text-[#181615]">
              {siteConfig.brand}
            </span>
          </a>
        </div>

        <div className="hidden lg:block lg:flex-1 lg:order-3" />
      </header>

      {/* Hero Content */}
      <section className="relative flex-1 w-full max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-10 pt-1 sm:pt-4 lg:pt-6 pb-4 sm:pb-6 lg:pb-8 flex flex-col justify-between z-10">
        <div className="relative grid grid-cols-1 lg:grid-cols-12 items-center gap-3 sm:gap-5 lg:gap-6 my-auto">
          {/* Left Column: Headline + PLAY + CTAs */}
          <div className="lg:col-span-5 flex flex-col justify-between z-30 space-y-3 sm:space-y-5 lg:space-y-10">
            <div className="mt-1 sm:mt-2 lg:mt-10">
              <div className="flex items-baseline gap-3 sm:gap-6 lg:gap-5 xl:gap-10">
                <span className="text-[11px] sm:text-sm font-mono font-bold text-[#F85E10] tracking-widest whitespace-nowrap shrink-0">
                  {siteConfig.yearTag}
                </span>
                <h1 className="font-headline font-medium text-[25px] sm:text-4xl md:text-[42px] lg:text-[36px] xl:text-[48px] 2xl:text-[54px] text-[#181615] tracking-tight leading-[1.08] uppercase">
                  {siteConfig.headline.line1}
                </h1>
              </div>
              <div className="font-headline font-medium text-[25px] sm:text-4xl md:text-[42px] lg:text-[36px] xl:text-[48px] 2xl:text-[54px] text-[#181615] tracking-tight leading-[1.08] uppercase mt-0.5 sm:mt-1">
                <div>{siteConfig.headline.line2}</div>
                <div className="pl-4 sm:pl-10 md:pl-12 lg:pl-6 xl:pl-12">
                  {siteConfig.headline.line3}
                </div>
              </div>
            </div>

            <div className="relative z-30 pt-0.5 sm:pt-2 lg:pt-4 pointer-events-none">
              <div className="font-display-stretched font-black text-[16vw] sm:text-[13.5vw] md:text-[12vw] lg:text-[10.5vw] xl:text-[11.2vw] text-white leading-[0.85] tracking-wider uppercase select-none drop-shadow-[0_4px_20px_rgba(0,0,0,0.06)]">
                PLAY
              </div>
            </div>

            <div className="relative z-40 flex flex-wrap items-center gap-3 sm:gap-4 lg:gap-5 pt-0.5 sm:pt-1">
              <button className="font-display font-bold text-[10px] sm:text-xs tracking-[0.18em] uppercase px-6 sm:px-9 xl:px-11 py-3 sm:py-4 xl:py-5 rounded-full transition-all duration-200 active:scale-95 whitespace-nowrap bg-[#F85E10] text-white shadow-[0_12px_24px_-6px_rgba(248,94,16,0.55)] hover:bg-[#e04f06] hover:shadow-[0_16px_30px_-6px_rgba(248,94,16,0.7)]">
                {siteConfig.ctas.primary}
              </button>
              <button className="font-display font-bold text-[10px] sm:text-xs tracking-[0.18em] uppercase px-6 sm:px-9 xl:px-11 py-3 sm:py-4 xl:py-5 rounded-full transition-all duration-200 active:scale-95 whitespace-nowrap bg-white text-[#F85E10] shadow-[0_10px_25px_-5px_rgba(0,0,0,0.08)] hover:bg-gray-50 hover:shadow-[0_14px_28px_-5px_rgba(0,0,0,0.12)]">
                {siteConfig.ctas.secondary}
              </button>
            </div>
          </div>

          {/* Center Column: Console Showcase */}
          <div className="lg:col-span-4 flex items-center justify-center z-20 my-0 sm:my-1 lg:my-0 lg:-ml-4 xl:-ml-8">
            <div className="relative z-20 flex items-center justify-center pointer-events-none h-[285px] sm:h-[340px] md:h-[370px] lg:h-[450px] xl:h-[515px] w-full">
              <div className="scale-[0.58] sm:scale-[0.68] md:scale-[0.74] lg:scale-[0.86] xl:scale-100 origin-center transition-transform duration-300">
                <div
                  className="relative w-[340px] h-[515px] transition-transform duration-500 hover:scale-[1.02] pointer-events-auto"
                  style={{
                    transform: 'rotate(-14deg)',
                  }}
                >
                  <div
                    className="absolute -inset-3 rounded-[48px] pointer-events-none"
                    style={{
                      boxShadow:
                        '-25px 45px 65px -10px rgba(24, 22, 21, 0.48), 0 25px 35px -15px rgba(0, 0, 0, 0.35)',
                    }}
                  />

                  <div
                    className="absolute inset-0 rounded-[40px] bg-gradient-to-br from-[#FF7124] via-[#F85E10] to-[#C84304]"
                    style={{
                      transform: 'translate(14px, 14px)',
                      boxShadow: 'inset -4px -6px 12px rgba(0,0,0,0.35)',
                    }}
                  >
                    <div className="absolute top-[16%] -right-[4px] w-[7px] h-14 rounded-r-md bg-gradient-to-b from-[#FFFFFF] via-[#DCD7D2] to-[#9E9892] shadow-md border-l border-black/20" />
                    <div className="absolute top-[30%] right-1.5 w-[2px] h-[55%] bg-black/15 rounded-full" />
                    <div className="absolute bottom-[5px] left-1/2 -translate-x-1/2 w-12 h-3 rounded-full bg-[#2B1508] border border-[#FF8547]/40 shadow-inner flex items-center justify-center">
                      <div className="w-7 h-1 bg-[#6E6A66] rounded-full" />
                    </div>
                  </div>

                  <div className="absolute inset-0 rounded-[38px] bg-gradient-to-br from-[#FFFFFF] via-[#F7F3EB] to-[#DFD8CE] p-[5px] shadow-[inset_0_2px_4px_rgba(255,255,255,0.9)]">
                    <div className="relative w-full h-full rounded-[33px] bg-gradient-to-br from-[#FBF8F3] via-[#F2ECE1] to-[#E5DDD0] p-5 flex flex-col justify-between shadow-[inset_0_-6px_14px_rgba(0,0,0,0.08)] border border-white/60">
                      {/* Screen Bezel & Display */}
                      <div className="relative w-full h-[47%] rounded-[22px] bg-[#F85E10] p-[3.5px] shadow-[0_3px_8px_rgba(248,94,16,0.25)]">
                        <div className="relative w-full h-full rounded-[19px] bg-gradient-to-br from-[#2B2B2B] via-[#151515] to-[#0A0A0A] p-3 overflow-hidden shadow-[inset_0_4px_12px_rgba(0,0,0,0.9)]">
                          <div className="relative w-full h-full rounded-[12px] bg-gradient-to-tr from-[#0E0E0E] via-[#1C1C1C] to-[#292929] overflow-hidden border border-white/5">
                            <div
                              className="absolute -inset-full bg-gradient-to-br from-white/20 via-white/5 to-transparent pointer-events-none"
                              style={{
                                transform: 'rotate(-22deg) translateY(-18%)',
                              }}
                            />
                          </div>
                        </div>
                      </div>

                      {/* Controls: D-Pad & Action Buttons */}
                      <div className="relative w-full flex items-center justify-between px-3 my-auto">
                        <div className="relative w-28 h-28 rounded-full bg-gradient-to-br from-[#E3DCD0] to-[#F7F3EC] shadow-[inset_0_3px_7px_rgba(0,0,0,0.12)] flex items-center justify-center border border-white/50">
                          <div className="relative w-24 h-24 drop-shadow-[0_6px_8px_rgba(0,0,0,0.45)]">
                            <div className="absolute top-1/2 left-1 -translate-y-1/2 w-[92%] h-8 bg-gradient-to-b from-[#2E2E2E] to-[#141414] rounded-[6px] border-t border-white/15 flex items-center justify-between px-2">
                              <span className="w-0 h-0 border-y-[5px] border-y-transparent border-r-[7px] border-r-[#555]" />
                              <span className="w-0 h-0 border-y-[5px] border-y-transparent border-l-[7px] border-l-[#555]" />
                            </div>
                            <div className="absolute left-1/2 top-1 -translate-x-1/2 h-[92%] w-8 bg-gradient-to-r from-[#2E2E2E] to-[#141414] rounded-[6px] border-t border-white/15 flex flex-col items-center justify-between py-2">
                              <span className="w-0 h-0 border-x-[5px] border-x-transparent border-b-[7px] border-b-[#555]" />
                              <span className="w-0 h-0 border-x-[5px] border-x-transparent border-t-[7px] border-t-[#555]" />
                            </div>
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-gradient-to-br from-[#121212] to-[#2A2A2A] shadow-inner" />
                          </div>
                        </div>

                        <div className="relative w-32 h-28">
                          <div className="absolute bottom-2 left-1 w-12 h-12 rounded-full bg-gradient-to-br from-[#FF8A47] via-[#F85E10] to-[#C84304] shadow-[0_7px_12px_rgba(0,0,0,0.38),inset_0_2px_4px_rgba(255,255,255,0.6)] border border-[#D94B07]" />
                          <div className="absolute top-2 right-1 w-12 h-12 rounded-full bg-gradient-to-br from-[#FF8A47] via-[#F85E10] to-[#C84304] shadow-[0_7px_12px_rgba(0,0,0,0.38),inset_0_2px_4px_rgba(255,255,255,0.6)] border border-[#D94B07]" />
                        </div>
                      </div>

                      {/* Bottom Row: Vents, Start/Select, Speaker Grid */}
                      <div className="relative w-full flex items-end justify-between px-2 pb-1">
                        <div className="flex flex-col gap-1.5 pb-1">
                          <span className="w-7 h-1.5 rounded-full bg-[#F85E10] shadow-[inset_0_1px_2px_rgba(0,0,0,0.35)]" />
                          <span className="w-7 h-1.5 rounded-full bg-[#F85E10] shadow-[inset_0_1px_2px_rgba(0,0,0,0.35)]" />
                          <span className="w-7 h-1.5 rounded-full bg-[#F85E10] shadow-[inset_0_1px_2px_rgba(0,0,0,0.35)]" />
                        </div>

                        <div className="flex items-center gap-3 pb-2">
                          <span
                            className="w-7 h-2.5 rounded-full bg-gradient-to-b from-[#2D2D2D] to-[#121212] shadow-[0_3px_5px_rgba(0,0,0,0.4),inset_0_1px_1px_rgba(255,255,255,0.2)]"
                            style={{ transform: 'rotate(-28deg)' }}
                          />
                          <span
                            className="w-7 h-2.5 rounded-full bg-gradient-to-b from-[#2D2D2D] to-[#121212] shadow-[0_3px_5px_rgba(0,0,0,0.4),inset_0_1px_1px_rgba(255,255,255,0.2)]"
                            style={{ transform: 'rotate(-28deg)' }}
                          />
                        </div>

                        <div className="grid grid-cols-5 gap-1.5 p-1">
                          {SPEAKER_GRID.flat().map((active, idx) =>
                            active ? (
                              <span
                                key={idx}
                                className="w-1.5 h-1.5 rounded-full bg-[#231F1D] shadow-[inset_0_1px_1px_rgba(0,0,0,0.8)]"
                              />
                            ) : (
                              <span key={idx} className="w-1.5 h-1.5" />
                            )
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Description + MORE */}
          <div className="lg:col-span-3 flex flex-row lg:flex-col justify-between lg:justify-end items-end self-end z-10 gap-3 sm:gap-6 lg:space-y-6 mt-0 sm:mt-2 lg:mt-0 w-full">
            <p className="max-w-[185px] sm:max-w-[290px] text-[11px] sm:text-sm text-[#4A4643] font-sans font-medium leading-snug sm:leading-relaxed">
              {siteConfig.description}
            </p>

            <div className="w-auto lg:w-full flex justify-end overflow-visible pointer-events-none shrink-0">
              <div className="font-display-stretched-right font-black text-[13.5vw] sm:text-[13vw] md:text-[12vw] lg:text-[10.5vw] xl:text-[11.2vw] text-white leading-[0.85] tracking-wider uppercase select-none lg:translate-x-2 xl:translate-x-4">
                MORE
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};
