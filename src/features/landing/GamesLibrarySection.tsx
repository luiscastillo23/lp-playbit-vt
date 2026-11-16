import React, { useState } from 'react';
import {
  GAME_CARTRIDGES,
  GameCartridge,
  GameCategory,
  filterGameCartridges,
} from '../../utils/landingLogic';
import cartridgeLineupImg from '../../assets/images/playbit_cartridge_lineup_1794856721296.jpg';

interface GamesLibrarySectionProps {
  onSelectCartridgeForBundle?: (cartridge: GameCartridge) => void;
}

const CATEGORY_FILTERS: { id: GameCategory; label: string }[] = [
  { id: 'all', label: 'All Titles (6)' },
  { id: 'racing', label: 'Racing' },
  { id: 'arcade', label: 'Arcade' },
  { id: 'puzzle', label: 'Puzzle & Synth' },
  { id: 'rpg', label: 'Action RPG' },
];

export const GamesLibrarySection: React.FC<GamesLibrarySectionProps> = ({
  onSelectCartridgeForBundle,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<GameCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeGameId, setActiveGameId] = useState<string>(
    GAME_CARTRIDGES[0].id
  );
  const [lineupImgFailed, setLineupImgFailed] = useState(false);
  const [queuedCartridgeIds, setQueuedCartridgeIds] = useState<string[]>([
    'orbital-drive',
  ]);

  const filteredGames = filterGameCartridges(
    GAME_CARTRIDGES,
    selectedCategory,
    searchQuery
  );

  const featuredGame =
    filteredGames.find((g) => g.id === activeGameId) ??
    filteredGames[0] ??
    GAME_CARTRIDGES[0];

  const handleToggleQueue = (cartridge: GameCartridge) => {
    setQueuedCartridgeIds((prev) =>
      prev.includes(cartridge.id)
        ? prev.filter((id) => id !== cartridge.id)
        : [...prev, cartridge.id]
    );
    if (onSelectCartridgeForBundle) {
      onSelectCartridgeForBundle(cartridge);
    }
  };

  return (
    <section
      id="games"
      aria-labelledby="games-heading"
      className="relative w-full max-w-[1600px] mx-auto px-6 sm:px-10 py-20 lg:py-28 border-t border-[#181615]/10"
    >
      {/* Section Header */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-12 lg:mb-16">
        <div className="lg:col-span-7">
          <div className="flex items-center gap-3 text-xs sm:text-sm font-mono font-bold text-[#F85E10] tracking-widest mb-3">
            <span>/ 02</span>
            <span aria-hidden="true">·</span>
            <span>PHYSICAL CARTRIDGE ECOSYSTEM</span>
          </div>
          <h2
            id="games-heading"
            className="font-headline font-semibold text-3xl sm:text-5xl text-[#181615] tracking-tight leading-[1.06] uppercase"
          >
            SOLID-STATE ROMS. ZERO DOWNLOAD QUEUES.
          </h2>
        </div>
        <div className="lg:col-span-5 flex flex-col lg:items-end justify-end">
          <p className="text-sm sm:text-base text-[#4A4643] font-sans leading-relaxed max-w-md">
            Every PLAYBIT release ships on a tactile FRAM cartridge with gold
            edge connectors, instant 0.38-second boot, and permanent
            battery-free save memory.
          </p>
        </div>
      </div>

      {/* Interactive Featured Cartridge Deck + Physical Lineup Visual */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 mb-12">
        {/* Left: Live Cartridge Telemetry Deck */}
        <div className="lg:col-span-7 rounded-[28px] bg-[#181615] text-[#FBF8F3] p-6 sm:p-10 flex flex-col justify-between border border-[#181615]">
          <div>
            <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono text-[#C4BDB7] pb-4 border-b border-white/10">
              <span>
                {featuredGame.code} · {featuredGame.studio.toUpperCase()} ·{' '}
                {featuredGame.releaseYear}
              </span>
              <span className="text-[#F85E10] font-bold tabular-nums">
                {featuredGame.frameRate} · {featuredGame.romSize}
              </span>
            </div>

            <div className="mt-6">
              <div className="text-xs font-mono text-[#F85E10] tracking-wider uppercase">
                {featuredGame.categoryLabel}
              </div>
              <h3 className="font-headline font-semibold text-3xl sm:text-4xl text-white tracking-tight mt-1">
                {featuredGame.title}
              </h3>
              <p className="text-sm sm:text-base text-[#CEC8C2] font-sans leading-relaxed mt-3 max-w-2xl">
                {featuredGame.synopsis}
              </p>
            </div>

            {/* Simulated 1:1 Console Screen Readout */}
            <div className="mt-6 rounded-2xl bg-[#24211F] border border-white/10 p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="text-xs font-mono text-[#C4BDB7]">
                  CARTRIDGE CAPABILITIES
                </div>
                <div className="text-xs sm:text-sm font-mono text-white">
                  {featuredGame.features.join(' · ')}
                </div>
              </div>
              <div className="font-mono text-right shrink-0">
                <div className="text-xs text-[#C4BDB7]">MSRP</div>
                <div className="text-2xl font-bold text-white tabular-nums">
                  ${featuredGame.priceUsd}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
            <div className="text-xs font-mono text-[#C4BDB7] tabular-nums">
              {queuedCartridgeIds.length} cartridge
              {queuedCartridgeIds.length === 1 ? '' : 's'} bookmarked in launch
              list
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => handleToggleQueue(featuredGame)}
                className="font-display font-bold text-xs tracking-[0.16em] uppercase px-6 py-3.5 rounded-full bg-[#F85E10] text-white hover:bg-[#e04f06] transition-colors whitespace-nowrap shrink-0"
              >
                {queuedCartridgeIds.includes(featuredGame.id)
                  ? 'Saved to Launch List'
                  : `Bookmark Cartridge ($${featuredGame.priceUsd})`}
              </button>
              <a
                href="#store"
                className="font-display font-bold text-xs tracking-[0.16em] uppercase px-6 py-3.5 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors whitespace-nowrap shrink-0"
              >
                Bundle in Store
              </a>
            </div>
          </div>
        </div>

        {/* Right: Studio Overhead Photograph of the 4 Physical Cartridges */}
        <div className="lg:col-span-5 rounded-[28px] bg-[#E3DFDC]/80 border border-[#181615]/10 p-6 flex flex-col justify-between">
          <div className="relative w-full aspect-[4/3] rounded-[20px] overflow-hidden bg-[#181615]">
            {!lineupImgFailed ? (
              <img
                src={cartridgeLineupImg}
                alt="Four PLAYBIT physical game cartridges in international orange, warm cream, and smoked translucent polycarbonate"
                referrerPolicy="no-referrer"
                onError={() => setLineupImgFailed(true)}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center p-6 text-center font-mono text-xs text-white">
                PLAYBIT Solid-State FRAM Cartridges · 48-Pin Gold Edge
              </div>
            )}
          </div>

          <div className="pt-5">
            <div className="text-xs font-mono font-bold text-[#F85E10] tracking-wider">
              ARCHIVAL SOLID-STATE HARDWARE
            </div>
            <h4 className="font-headline font-semibold text-xl text-[#181615] mt-1">
              Collectible Polycarbonate Shells
            </h4>
            <p className="text-xs sm:text-sm text-[#4A4643] font-sans leading-relaxed mt-1.5">
              Color-coded by release series: Signal Orange for flagship arcade
              launches, Archival Cream for studio editions, and Smoked Clear for
              synth & experimental carts.
            </p>
          </div>
        </div>
      </div>

      {/* Filter Bar & Search Control */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div
          role="group"
          aria-label="Filter games by genre"
          className="flex flex-wrap items-center gap-1.5 bg-[#E3DFDC]/80 p-1.5 rounded-2xl border border-[#181615]/10"
        >
          {CATEGORY_FILTERS.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                aria-pressed={isActive}
                className={`px-4 py-2 rounded-xl text-xs font-sans font-semibold transition-colors duration-150 whitespace-nowrap shrink-0 ${
                  isActive
                    ? 'bg-[#181615] text-white shadow-sm'
                    : 'text-[#3A3633] hover:text-[#181615] hover:bg-white/50'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        <div className="relative w-full md:w-72">
          <label htmlFor="cartridge-search" className="sr-only">
            Search game cartridges
          </label>
          <input
            id="cartridge-search"
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Filter by title or studio..."
            className="w-full px-4 py-2.5 rounded-xl bg-[#FBF8F3] border border-[#181615]/15 text-xs sm:text-sm font-sans text-[#181615] placeholder:text-[#4A4643]/70 focus:outline-none focus:border-[#F85E10]"
          />
        </div>
      </div>

      {/* Cartridge Grid */}
      {filteredGames.length === 0 ? (
        <div className="rounded-2xl bg-[#E3DFDC]/60 border border-[#181615]/10 p-10 text-center">
          <p className="font-headline text-lg text-[#181615]">
            No cartridges match “{searchQuery}”.
          </p>
          <button
            type="button"
            onClick={() => {
              setSelectedCategory('all');
              setSearchQuery('');
            }}
            className="mt-4 px-5 py-2.5 rounded-full bg-[#181615] text-white text-xs font-mono uppercase tracking-wider whitespace-nowrap"
          >
            Reset Catalog Filter
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGames.map((game) => {
            const isSelected = game.id === featuredGame.id;
            const isBookmarked = queuedCartridgeIds.includes(game.id);
            const shellBg =
              game.shellColor === 'orange'
                ? 'bg-[#F85E10]'
                : game.shellColor === 'cream'
                ? 'bg-[#E5DDD0]'
                : 'bg-[#2B2927]';

            return (
              <article
                key={game.id}
                className={`rounded-[24px] p-6 transition-all duration-150 flex flex-col justify-between border ${
                  isSelected
                    ? 'bg-[#FBF8F3] border-[#F85E10] shadow-[0_14px_30px_-12px_rgba(24,22,21,0.18)]'
                    : 'bg-[#E3DFDC]/75 border-[#181615]/10 hover:bg-[#FBF8F3]/80'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 text-xs font-mono text-[#4A4643]">
                    <div className="flex items-center gap-2">
                      <span
                        aria-hidden="true"
                        className={`w-3 h-3 rounded-[3px] ${shellBg} border border-black/15`}
                      />
                      <span>{game.code}</span>
                      <span aria-hidden="true">·</span>
                      <span>{game.romSize}</span>
                    </div>
                    <span className="font-bold text-[#181615] tabular-nums">
                      ${game.priceUsd}
                    </span>
                  </div>

                  <h3 className="font-headline font-semibold text-2xl text-[#181615] mt-3 tracking-tight">
                    {game.title}
                  </h3>
                  <div className="text-xs font-mono text-[#F85E10] mt-0.5">
                    {game.studio} · {game.frameRate}
                  </div>

                  <p className="text-xs sm:text-sm text-[#4A4643] font-sans leading-relaxed mt-3">
                    {game.synopsis}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-[#181615]/10 flex items-center justify-between gap-3">
                  <button
                    type="button"
                    onClick={() => setActiveGameId(game.id)}
                    className={`text-xs font-mono font-bold transition-colors whitespace-nowrap shrink-0 ${
                      isSelected
                        ? 'text-[#F85E10]'
                        : 'text-[#181615] hover:text-[#F85E10]'
                    }`}
                  >
                    {isSelected ? 'ACTIVE IN DECK' : 'INSPECT CARTRIDGE'}
                  </button>

                  <button
                    type="button"
                    onClick={() => handleToggleQueue(game)}
                    className={`px-3.5 py-1.5 rounded-lg text-xs font-mono transition-colors whitespace-nowrap shrink-0 ${
                      isBookmarked
                        ? 'bg-[#181615] text-white'
                        : 'bg-[#C4BDB7]/60 text-[#181615] hover:bg-[#181615] hover:text-white'
                    }`}
                  >
                    {isBookmarked ? 'Bookmarked' : '+ Bookmark'}
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
};
