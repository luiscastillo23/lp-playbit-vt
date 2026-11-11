import React, { useState } from 'react';
import { CartridgeGame, siteConfig } from '../../config/siteConfig';

interface GamesLibrarySectionProps {
  activeGameId: string;
  onLoadGameOnConsole: (game: CartridgeGame) => void;
  selectedCartridgeIds: string[];
  onToggleCartridgeInBundle: (gameId: string) => void;
}

export const GamesLibrarySection: React.FC<GamesLibrarySectionProps> = ({
  activeGameId,
  onLoadGameOnConsole,
  selectedCartridgeIds,
  onToggleCartridgeInBundle,
}) => {
  const [filter, setFilter] = useState<'all' | 'arcade' | 'rpg' | 'synth'>('all');

  const filteredGames =
    filter === 'all'
      ? siteConfig.games
      : siteConfig.games.filter((g) => g.category === filter);

  const renderCartridgeArtwork = (game: CartridgeGame) => {
    return (
      <div
        className="relative w-full h-44 rounded-xl overflow-hidden border border-[#181615]/15 p-4 flex flex-col justify-between"
        style={{
          background: `linear-gradient(135deg, ${game.secondaryColor} 0%, #09090B 100%)`,
        }}
      >
        {/* Top Physical Cartridge Grip Ribs */}
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-1">
            <span className="w-10 h-1 rounded-full bg-white/20" />
            <span className="w-10 h-1 rounded-full bg-white/20" />
          </div>
          <span className="text-[10px] font-mono text-white/60 tabular-nums">
            {game.romSize} · {game.resolution}
          </span>
        </div>

        {/* Custom 16-Bit Vector / Pixel Scene */}
        <div className="my-auto flex items-center justify-center">
          <svg
            viewBox="0 0 260 80"
            className="w-full h-24"
            aria-label={`${game.title} Cartridge Label Art`}
          >
            <defs>
              <linearGradient id={`grad-${game.id}`} x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor={game.accentColor} stopOpacity="0.9" />
                <stop offset="100%" stopColor={game.accentColor} stopOpacity="0.15" />
              </linearGradient>
            </defs>

            {/* Horizon & Retro Grid */}
            <rect
              x="8"
              y="8"
              width="244"
              height="64"
              rx="6"
              fill={`url(#grad-${game.id})`}
              stroke="rgba(255,255,255,0.15)"
            />

            {game.category === 'arcade' && (
              <g>
                <circle cx="195" cy="34" r="18" fill={game.accentColor} />
                <path
                  d="M 18 66 L 90 38 L 155 38 L 242 66 Z"
                  fill="rgba(15, 23, 42, 0.78)"
                  stroke="#FFFFFF"
                  strokeWidth="1"
                />
                <rect x="98" y="48" width="44" height="12" rx="2" fill="#FFFFFF" />
                <rect x="104" y="43" width="32" height="6" rx="1.5" fill={game.accentColor} />
              </g>
            )}

            {game.category === 'rpg' && (
              <g>
                <polygon
                  points="130,14 175,36 130,58 85,36"
                  fill="rgba(24,22,21,0.75)"
                  stroke="#FFFFFF"
                  strokeWidth="1.2"
                />
                <polygon
                  points="130,22 158,36 130,50 102,36"
                  fill={game.accentColor}
                  fillOpacity="0.65"
                />
                <circle cx="130" cy="36" r="6" fill="#FFFFFF" />
              </g>
            )}

            {game.category === 'synth' && (
              <g>
                {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((bar) => {
                  const h = 16 + ((bar * 17) % 38);
                  return (
                    <rect
                      key={bar}
                      x={28 + bar * 21}
                      y={64 - h}
                      width="13"
                      height={h}
                      rx="2"
                      fill={bar % 2 === 0 ? '#FFFFFF' : game.accentColor}
                    />
                  );
                })}
              </g>
            )}
          </svg>
        </div>

        {/* Bottom Gold-Plated Edge Connector Indicator */}
        <div className="flex items-center justify-between pt-2 border-t border-white/10 text-[10px] font-mono text-white/75">
          <span>{game.studio}</span>
          <span className="text-[#F85E10] font-bold">GOLD 44-PIN FRAM</span>
        </div>
      </div>
    );
  };

  return (
    <section
      id="games"
      className="w-full max-w-[1440px] mx-auto px-6 sm:px-10 py-20 lg:py-28 border-t border-[#181615]/15"
    >
      {/* Header & Interactive Filter Bar */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
        <div className="space-y-3 max-w-2xl">
          <div className="text-xs font-mono font-bold text-[#F85E10] tracking-wider">
            Physical FRAM Cartridge Library
          </div>
          <h2
            className="font-headline font-extrabold text-3xl sm:text-4xl text-[#181615] tracking-tight"
            style={{ textWrap: 'balance' }}
          >
            Instant-On Physical Media Built to Last 40 Years
          </h2>
          <p className="text-sm text-[#3A3633] leading-relaxed">
            Every PLAYBIT title ships on a bespoke ferroelectric RAM cartridge—requiring zero patches, zero downloads, and zero coin-cell batteries. Click any title to test it live on the console above.
          </p>
        </div>

        {/* Interactive Filter Tabs (Functional Buttons) */}
        <div
          role="tablist"
          aria-label="Filter Cartridges by Genre"
          className="inline-flex flex-wrap items-center gap-1 p-1 bg-[#D6D0CA] rounded-lg border border-[#181615]/10 self-start lg:self-end"
        >
          {[
            { id: 'all', label: 'All Cartridges (6)' },
            { id: 'arcade', label: 'Arcade & Action' },
            { id: 'rpg', label: 'RPG & Simulation' },
            { id: 'synth', label: 'Audio & Synth' },
          ].map((tab) => {
            const active = filter === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setFilter(tab.id as typeof filter)}
                className={`px-3.5 py-2 text-xs font-semibold rounded-md transition-colors whitespace-nowrap shrink-0 ${
                  active
                    ? 'bg-[#181615] text-white shadow-sm'
                    : 'text-[#3A3633] hover:text-[#181615]'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Cartridge Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredGames.map((game) => {
          const isLoaded = activeGameId === game.id;
          const isInBundle = selectedCartridgeIds.includes(game.id);

          return (
            <article
              key={game.id}
              className={`rounded-2xl p-6 transition-colors border flex flex-col justify-between gap-5 ${
                isLoaded
                  ? 'bg-[#DFD9D3] border-[#F85E10]'
                  : 'bg-[#D6D0CA]/75 border-[#181615]/10 hover:border-[#181615]/30'
              }`}
            >
              <div className="space-y-4">
                {renderCartridgeArtwork(game)}

                {/* Clean Unboxed Metadata with Typographic Separators (Zero Pills) */}
                <div className="flex flex-wrap items-center gap-1.5 text-xs text-[#4A4643] font-mono tabular-nums">
                  <span className="font-semibold text-[#F85E10]">
                    {game.categoryLabel}
                  </span>
                  <span aria-hidden="true">·</span>
                  <span>{game.fps}</span>
                  <span aria-hidden="true">·</span>
                  <span>{game.romSize}</span>
                </div>

                <div className="flex items-baseline justify-between gap-2">
                  <h3 className="font-headline font-bold text-xl text-[#181615] tracking-tight">
                    {game.title}
                  </h3>
                  <span className="font-mono font-bold text-base text-[#181615] tabular-nums">
                    ${game.price}
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-[#3A3633] leading-relaxed">
                  {game.summary}
                </p>
              </div>

              <div className="pt-4 border-t border-[#181615]/10 flex items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={() => {
                    onLoadGameOnConsole(game);
                    const heroEl = document.getElementById('console');
                    if (heroEl) heroEl.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className={`px-3.5 py-2 rounded-lg text-xs font-semibold transition-colors whitespace-nowrap shrink-0 ${
                    isLoaded
                      ? 'bg-[#F85E10] text-white'
                      : 'bg-white/70 hover:bg-white text-[#181615]'
                  }`}
                >
                  {isLoaded ? 'Running on Console' : 'Load on Console'}
                </button>

                <button
                  type="button"
                  onClick={() => onToggleCartridgeInBundle(game.id)}
                  className={`px-3.5 py-2 rounded-lg text-xs font-semibold transition-colors whitespace-nowrap shrink-0 ${
                    isInBundle
                      ? 'bg-[#181615] text-white'
                      : 'border border-[#181615]/25 text-[#181615] hover:bg-[#181615] hover:text-white'
                  }`}
                >
                  {isInBundle ? 'Added to Order' : `Add Cartridge (+$${game.price})`}
                </button>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
};
