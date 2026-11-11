import React from 'react';
import { CartridgeGame, siteConfig } from '../../config/siteConfig';
import { ConsoleShowcase } from './ConsoleShowcase';
import { Button } from '../../components/ui/Button';

interface HeroSectionProps {
  activeGame: CartridgeGame;
  onCycleGame: () => void;
  selectedEditionId: string;
  onSelectEdition: (editionId: string) => void;
  onReserveClick: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  activeGame,
  onCycleGame,
  selectedEditionId,
  onSelectEdition,
  onReserveClick,
}) => {
  return (
    <section
      id="console"
      className="relative w-full max-w-[1440px] mx-auto px-6 sm:px-10 pt-8 pb-16 lg:pt-12 lg:pb-24 z-10"
    >
      {/* Primary 12-Column Hero Split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 items-center gap-10 lg:gap-8">
        {/* Left Column: Value Proposition, Finish Selector & Primary CTA */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#F85E10] tracking-wider">
              <span>{siteConfig.editionKicker}</span>
            </div>

            <h1
              className="font-headline font-extrabold text-4xl sm:text-5xl xl:text-[54px] text-[#181615] tracking-tight leading-[1.08]"
              style={{ textWrap: 'balance' }}
            >
              {siteConfig.headline.line1} {siteConfig.headline.line2}.{' '}
              <span className="text-[#F85E10]">{siteConfig.headline.line3}.</span>
            </h1>

            <p className="max-w-[54ch] text-sm sm:text-base text-[#3A3633] font-sans leading-relaxed">
              {siteConfig.description}
            </p>
          </div>

          {/* Interactive Chassis Finish Segmented Control */}
          <div className="space-y-2 pt-1">
            <div className="text-xs font-medium text-[#4A4643]">
              Interactive Chassis Finish · Click D-Pad &amp; A/B Buttons on Unit to Play
            </div>
            <div className="inline-flex flex-wrap items-center gap-1 p-1 bg-white/45 rounded-lg border border-[#181615]/10">
              {siteConfig.editions.map((edition) => {
                const active = selectedEditionId === edition.id;
                return (
                  <button
                    key={edition.id}
                    type="button"
                    onClick={() => onSelectEdition(edition.id)}
                    className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap shrink-0 ${
                      active
                        ? 'bg-[#181615] text-white shadow-sm'
                        : 'text-[#3A3633] hover:text-[#181615]'
                    }`}
                  >
                    {edition.name.replace('PLAYBIT ', '')}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Primary Decision Block */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <Button variant="primary" onClick={onReserveClick}>
              {siteConfig.ctas.primary}
            </Button>
            <Button variant="secondary" onClick={onCycleGame}>
              {siteConfig.ctas.secondary}
            </Button>
          </div>

          {/* Regional & Manufacturing Trust Signal (Unboxed Text) */}
          <div className="text-xs text-[#4A4643] pt-1">
            <span>Kyoto &amp; Munich Hardware Labs</span>
            <span aria-hidden="true" className="mx-2">·</span>
            <span>ISO 9001 CNC Certified</span>
            <span aria-hidden="true" className="mx-2">·</span>
            <span>2-Year Global Hardware Warranty</span>
          </div>
        </div>

        {/* Center Column: Interactive PLAYBIT Handheld Showcase */}
        <div className="lg:col-span-4 flex items-center justify-center">
          <ConsoleShowcase
            activeGame={activeGame}
            onCycleGame={onCycleGame}
            editionId={selectedEditionId}
          />
        </div>

        {/* Right Column: Live Inserted Cartridge Spec Card */}
        <div className="lg:col-span-3 flex flex-col justify-between space-y-6 bg-[#D6D0CA]/75 border border-[#181615]/10 rounded-2xl p-6">
          <div className="space-y-3">
            <div className="text-xs font-mono text-[#F85E10] font-bold">
              Active Slot · {activeGame.categoryLabel}
            </div>
            <h2 className="text-xl font-bold text-[#181615] tracking-tight">
              {activeGame.title}
            </h2>
            <div className="text-xs text-[#4A4643] font-mono tabular-nums">
              <span>{activeGame.studio}</span>
              <span aria-hidden="true" className="mx-1.5">·</span>
              <span>{activeGame.fps}</span>
              <span aria-hidden="true" className="mx-1.5">·</span>
              <span>{activeGame.romSize}</span>
            </div>
            <p className="text-xs sm:text-sm text-[#3A3633] leading-relaxed">
              {activeGame.summary}
            </p>
          </div>

          <div className="pt-4 border-t border-[#181615]/10 space-y-3">
            <div className="text-xs font-mono text-[#3A3633]">
              {activeGame.controlsHint}
            </div>
            <div className="flex items-center justify-between pt-1">
              <a
                href="#games"
                className="text-xs font-semibold text-[#181615] underline decoration-[#F85E10] underline-offset-4 hover:text-[#F85E10] transition-colors whitespace-nowrap shrink-0"
              >
                Explore 6 Launch Cartridges
              </a>
              <span className="text-xs font-mono font-bold text-[#181615] tabular-nums">
                ${activeGame.price} FRAM
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Full-Width 4-Column Quantitative Hardware Metrics Strip */}
      <div className="mt-14 pt-8 border-t border-[#181615]/15 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {siteConfig.heroMetrics.map((metric) => (
          <div key={metric.label} className="space-y-1">
            <div className="text-2xl sm:text-3xl font-display font-extrabold text-[#181615] tabular-nums tracking-tight">
              {metric.value}
            </div>
            <div className="text-xs font-semibold text-[#F85E10]">
              {metric.label}
            </div>
            <p className="text-xs text-[#4A4643] leading-relaxed">
              {metric.context}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};
