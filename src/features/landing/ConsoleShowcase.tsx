import React, { useState, useEffect } from 'react';
import { CartridgeGame, siteConfig } from '../../config/siteConfig';

interface ConsoleShowcaseProps {
  activeGame?: CartridgeGame;
  onCycleGame?: () => void;
  editionId?: string;
}

export const ConsoleShowcase: React.FC<ConsoleShowcaseProps> = ({
  activeGame = siteConfig.games[0],
  onCycleGame,
  editionId = 'sand-alloy',
}) => {
  const [playerX, setPlayerX] = useState(50);
  const [playerY, setPlayerY] = useState(65);
  const [boostActive, setBoostActive] = useState(false);
  const [scanlinesOn, setScanlinesOn] = useState(true);
  const [score, setScore] = useState(14280);
  const [isFlatView, setIsFlatView] = useState(false);
  const [synthSteps, setSynthSteps] = useState<number[]>([75, 40, 90, 55, 80, 30, 95, 65]);

  const speakerGrid = [
    [0, 1, 1, 1, 0],
    [1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1],
    [0, 1, 1, 1, 0],
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setScore((prev) => prev + (boostActive ? 45 : 10));
    }, 350);
    return () => clearInterval(interval);
  }, [boostActive]);

  const handleDpad = (dir: 'up' | 'down' | 'left' | 'right') => {
    if (dir === 'left') setPlayerX((x) => Math.max(18, x - 12));
    if (dir === 'right') setPlayerX((x) => Math.min(82, x + 12));
    if (dir === 'up') setPlayerY((y) => Math.max(25, y - 10));
    if (dir === 'down') setPlayerY((y) => Math.min(80, y + 10));

    if (activeGame.category === 'synth') {
      setSynthSteps((prev) =>
        prev.map((val, idx) =>
          dir === 'up' || dir === 'right'
            ? Math.min(95, ((val + (idx + 1) * 11) % 85) + 15)
            : Math.max(15, ((val + (idx + 3) * 7) % 80) + 10)
        )
      );
    }
  };

  const handleActionA = () => {
    setBoostActive(true);
    setScore((s) => s + 250);
    if (activeGame.category === 'synth') {
      setSynthSteps((prev) => prev.map((v) => Math.min(100, ((v + 25) % 90) + 15)));
    }
    setTimeout(() => setBoostActive(false), 600);
  };

  const handleActionB = () => {
    setScanlinesOn((prev) => !prev);
  };

  const currentEdition =
    siteConfig.editions.find((e) => e.id === editionId) || siteConfig.editions[0];

  const isObsidian = editionId === 'obsidian-pro';
  const isOrangeLE = editionId === 'atomic-orange';

  return (
    <div className="relative z-20 flex flex-col items-center justify-center my-2 lg:my-0">
      {/* Interactive Hardware Unit */}
      <div
        className="relative w-[300px] h-[460px] sm:w-[346px] sm:h-[526px] transition-transform duration-300 select-none"
        style={{
          transform: isFlatView ? 'rotate(0deg)' : 'rotate(-10deg)',
        }}
      >
        {/* Ambient Ground Shadow */}
        <div
          className="absolute -inset-3 rounded-[48px] pointer-events-none"
          style={{
            boxShadow:
              '-25px 45px 65px -10px rgba(24, 22, 21, 0.46), 0 25px 35px -15px rgba(0, 0, 0, 0.32)',
          }}
        />

        {/* Rear Orange / Dark Cartridge Shell Layer */}
        <div
          className={`absolute inset-0 rounded-[40px] ${
            isObsidian
              ? 'bg-gradient-to-br from-[#F85E10] via-[#C84304] to-[#7C2802]'
              : 'bg-gradient-to-br from-[#FF7124] via-[#F85E10] to-[#C84304]'
          }`}
          style={{
            transform: 'translate(13px, 13px)',
            boxShadow: 'inset -4px -6px 12px rgba(0,0,0,0.35)',
          }}
        >
          {/* Side Volume Rocker */}
          <div className="absolute top-[16%] -right-[4px] w-[7px] h-14 rounded-r-md bg-gradient-to-b from-[#FFFFFF] via-[#DCD7D2] to-[#9E9892] shadow-md border-l border-black/20" />
          <div className="absolute top-[30%] right-1.5 w-[2px] h-[55%] bg-black/15 rounded-full" />
          {/* Bottom USB-C & 3.5mm Port Cutout */}
          <div className="absolute bottom-[5px] left-1/2 -translate-x-1/2 w-12 h-3 rounded-full bg-[#2B1508] border border-[#FF8547]/40 shadow-inner flex items-center justify-center">
            <div className="w-7 h-1 bg-[#6E6A66] rounded-full" />
          </div>
        </div>

        {/* Main CNC Front Enclosure */}
        <div
          className={`absolute inset-0 rounded-[38px] p-[5px] shadow-[inset_0_2px_4px_rgba(255,255,255,0.8)] ${
            isObsidian
              ? 'bg-gradient-to-br from-[#3A3735] via-[#22201F] to-[#121110]'
              : isOrangeLE
              ? 'bg-gradient-to-br from-[#FF945E] via-[#F85E10] to-[#B83B02]'
              : 'bg-gradient-to-br from-[#FFFFFF] via-[#F7F3EB] to-[#DFD8CE]'
          }`}
        >
          <div
            className={`relative w-full h-full rounded-[33px] bg-gradient-to-br ${currentEdition.shellGradient} p-4 sm:p-5 flex flex-col justify-between shadow-[inset_0_-6px_14px_rgba(0,0,0,0.12)] border ${
              isObsidian ? 'border-white/15' : 'border-white/60'
            }`}
          >
            {/* 3.5" 1600x1440 LTPO OLED Display Bezel */}
            <div
              className="relative w-full h-[48%] rounded-[22px] p-[3.5px] shadow-[0_3px_10px_rgba(248,94,16,0.28)]"
              style={{ backgroundColor: currentEdition.frameColor }}
            >
              <div className="relative w-full h-full rounded-[19px] bg-gradient-to-br from-[#1C1B1A] via-[#111111] to-[#080808] p-2.5 overflow-hidden shadow-[inset_0_4px_12px_rgba(0,0,0,0.95)] flex flex-col justify-between">
                {/* Top OLED Bezel Telemetry Bar */}
                <div className="flex items-center justify-between px-1.5 pb-1 text-[9px] font-mono tracking-wider text-white/70">
                  <span className="truncate max-w-[140px] font-bold text-[#F85E10]">
                    {activeGame.title}
                  </span>
                  <span className="tabular-nums text-white/80">
                    {activeGame.fps} · {scanlinesOn ? 'CRT' : 'RAW'}
                  </span>
                </div>

                {/* Active Game Viewport */}
                <div
                  className="relative flex-1 w-full rounded-[11px] overflow-hidden border border-white/10 flex flex-col justify-between p-2.5"
                  style={{
                    background: `radial-gradient(circle at 50% 25%, ${activeGame.accentColor}33 0%, ${activeGame.secondaryColor} 75%, #070709 100%)`,
                  }}
                >
                  {/* Top HUD inside Game */}
                  <div className="relative z-10 flex items-center justify-between text-[9px] font-mono text-white/90 tabular-nums">
                    <span>SCORE {score.toString().padStart(6, '0')}</span>
                    <span className="text-[#F85E10] font-bold">
                      {boostActive ? 'TURBO ENGAGED' : activeGame.categoryLabel}
                    </span>
                  </div>

                  {/* Interactive Scene Graphics */}
                  <div className="relative z-10 my-auto h-24 w-full flex items-center justify-center">
                    {activeGame.category === 'arcade' && (
                      <svg
                        viewBox="0 0 200 90"
                        className="w-full h-full overflow-visible"
                        aria-label={activeGame.title}
                      >
                        {/* Horizon Grid & Synth Sun */}
                        <circle
                          cx="100"
                          cy="28"
                          r={boostActive ? '22' : '18'}
                          fill={activeGame.accentColor}
                          fillOpacity="0.85"
                        />
                        <line
                          x1="0"
                          y1="45"
                          x2="200"
                          y2="45"
                          stroke="#FFFFFF"
                          strokeOpacity="0.25"
                          strokeWidth="1"
                        />
                        {/* Perspective Road / Starfield Vectors */}
                        <line
                          x1="100"
                          y1="45"
                          x2="15"
                          y2="90"
                          stroke={activeGame.accentColor}
                          strokeOpacity="0.55"
                          strokeWidth="1.5"
                        />
                        <line
                          x1="100"
                          y1="45"
                          x2="65"
                          y2="90"
                          stroke="#FFFFFF"
                          strokeOpacity="0.25"
                          strokeWidth="1"
                        />
                        <line
                          x1="100"
                          y1="45"
                          x2="135"
                          y2="90"
                          stroke="#FFFFFF"
                          strokeOpacity="0.25"
                          strokeWidth="1"
                        />
                        <line
                          x1="100"
                          y1="45"
                          x2="185"
                          y2="90"
                          stroke={activeGame.accentColor}
                          strokeOpacity="0.55"
                          strokeWidth="1.5"
                        />

                        {/* Interactive Player Sprite (Controlled by D-Pad!) */}
                        <g
                          transform={`translate(${(playerX / 100) * 150 + 10}, ${
                            (playerY / 100) * 42 + 34
                          })`}
                        >
                          <rect
                            x="-14"
                            y="-7"
                            width="28"
                            height="12"
                            rx="3"
                            fill="#FFFFFF"
                          />
                          <rect
                            x="-10"
                            y="-11"
                            width="20"
                            height="6"
                            rx="2"
                            fill={activeGame.accentColor}
                          />
                          {/* Twin Thruster / Taillight Glow */}
                          <circle
                            cx="-7"
                            cy="0"
                            r={boostActive ? '4.5' : '2.5'}
                            fill="#F85E10"
                          />
                          <circle
                            cx="7"
                            cy="0"
                            r={boostActive ? '4.5' : '2.5'}
                            fill="#F85E10"
                          />
                        </g>
                      </svg>
                    )}

                    {activeGame.category === 'rpg' && (
                      <svg
                        viewBox="0 0 200 90"
                        className="w-full h-full"
                        aria-label={activeGame.title}
                      >
                        {/* Isometric Tactical Tiles */}
                        {[0, 1, 2, 3].map((row) =>
                          [0, 1, 2, 3].map((col) => {
                            const isoX = 100 + (col - row) * 20;
                            const isoY = 18 + (col + row) * 10;
                            return (
                              <polygon
                                key={`${row}-${col}`}
                                points={`${isoX},${isoY} ${isoX + 18},${isoY + 9} ${isoX},${isoY + 18} ${isoX - 18},${isoY + 9}`}
                                fill={
                                  (row + col) % 2 === 0
                                    ? 'rgba(255,255,255,0.12)'
                                    : 'rgba(248,94,16,0.22)'
                                }
                                stroke="rgba(255,255,255,0.35)"
                                strokeWidth="0.8"
                              />
                            );
                          })
                        )}
                        {/* Player Unit Marker */}
                        <g
                          transform={`translate(${(playerX / 100) * 110 + 45}, ${
                            (playerY / 100) * 45 + 18
                          })`}
                        >
                          <polygon
                            points="0,-12 9,-3 0,4 -9,-3"
                            fill={boostActive ? '#FFFFFF' : activeGame.accentColor}
                            stroke="#FFFFFF"
                            strokeWidth="1.2"
                          />
                        </g>
                      </svg>
                    )}

                    {activeGame.category === 'synth' && (
                      <div className="w-full h-full flex items-end justify-between gap-1.5 px-2 pt-3 pb-1">
                        {synthSteps.map((height, idx) => (
                          <div
                            key={idx}
                            className="flex-1 h-full flex flex-col justify-end items-center gap-1"
                          >
                            <div
                              className="w-full rounded-t-sm transition-all duration-150"
                              style={{
                                height: `${boostActive ? Math.min(100, height + 20) : height}%`,
                                backgroundColor:
                                  idx % 2 === 0 ? activeGame.accentColor : '#FFFFFF',
                              }}
                            />
                            <span className="text-[7px] font-mono text-white/60 tabular-nums">
                              0{idx + 1}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Bottom Telemetry Footer inside OLED */}
                  <div className="relative z-10 flex items-center justify-between text-[8px] font-mono text-white/65 border-t border-white/10 pt-1 tabular-nums">
                    <span>{activeGame.resolution}</span>
                    <span>POS {playerX},{playerY}</span>
                  </div>

                  {/* Optional Hardware Scanline Overlay */}
                  {scanlinesOn && (
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-0 opacity-25"
                      style={{
                        backgroundImage:
                          'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.85) 2px, rgba(0,0,0,0.85) 4px)',
                      }}
                    />
                  )}

                  {/* Sapphire Glass Anti-Reflective Sheen */}
                  <div
                    className="absolute -inset-full bg-gradient-to-br from-white/15 via-white/5 to-transparent pointer-events-none"
                    style={{
                      transform: 'rotate(-22deg) translateY(-18%)',
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Interactive Controls Section (D-Pad + Action A/B) */}
            <div className="relative w-full flex items-center justify-between px-2 sm:px-3 my-auto">
              {/* Interactive 4-Way D-Pad */}
              <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-gradient-to-br from-[#E3DCD0] to-[#F7F3EC] shadow-[inset_0_3px_7px_rgba(0,0,0,0.15)] flex items-center justify-center border border-white/50">
                <div className="relative w-20 h-20 sm:w-24 sm:h-24 drop-shadow-[0_6px_8px_rgba(0,0,0,0.45)]">
                  {/* Horizontal Bar (Left / Right) */}
                  <div className="absolute top-1/2 left-1 -translate-y-1/2 w-[92%] h-7 sm:h-8 bg-gradient-to-b from-[#2E2E2E] to-[#141414] rounded-[6px] border-t border-white/15 flex items-center justify-between px-1">
                    <button
                      type="button"
                      onClick={() => handleDpad('left')}
                      aria-label="D-Pad Left"
                      className="w-7 h-full flex items-center justify-center active:scale-90 transition-transform"
                    >
                      <span className="w-0 h-0 border-y-[5px] border-y-transparent border-r-[7px] border-r-[#999]" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDpad('right')}
                      aria-label="D-Pad Right"
                      className="w-7 h-full flex items-center justify-center active:scale-90 transition-transform"
                    >
                      <span className="w-0 h-0 border-y-[5px] border-y-transparent border-l-[7px] border-l-[#999]" />
                    </button>
                  </div>
                  {/* Vertical Bar (Up / Down) */}
                  <div className="absolute left-1/2 top-1 -translate-x-1/2 h-[92%] w-7 sm:w-8 bg-gradient-to-r from-[#2E2E2E] to-[#141414] rounded-[6px] border-t border-white/15 flex flex-col items-center justify-between py-1">
                    <button
                      type="button"
                      onClick={() => handleDpad('up')}
                      aria-label="D-Pad Up"
                      className="h-7 w-full flex items-center justify-center active:scale-90 transition-transform"
                    >
                      <span className="w-0 h-0 border-x-[5px] border-x-transparent border-b-[7px] border-b-[#999]" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDpad('down')}
                      aria-label="D-Pad Down"
                      className="h-7 w-full flex items-center justify-center active:scale-90 transition-transform"
                    >
                      <span className="w-0 h-0 border-x-[5px] border-x-transparent border-t-[7px] border-t-[#999]" />
                    </button>
                  </div>
                  {/* Center Pivot Sphere */}
                  <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-gradient-to-br from-[#121212] to-[#2A2A2A] shadow-inner" />
                </div>
              </div>

              {/* Interactive Action B and A Mechanical Buttons */}
              <div className="relative w-28 h-24 sm:w-32 sm:h-28">
                <button
                  type="button"
                  onClick={handleActionB}
                  aria-label="Button B - Toggle CRT Mask"
                  title="Button B: Toggle CRT Scanline Filter"
                  className="absolute bottom-2 left-1 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-[#FF8A47] via-[#F85E10] to-[#C84304] shadow-[0_7px_12px_rgba(0,0,0,0.38),inset_0_2px_4px_rgba(255,255,255,0.6)] border border-[#D94B07] flex items-center justify-center text-white font-display font-bold text-xs active:translate-y-0.5 transition-transform"
                >
                  B
                </button>
                <button
                  type="button"
                  onClick={handleActionA}
                  aria-label="Button A - Turbo Action"
                  title="Button A: Engage Boost / Trigger Synth"
                  className="absolute top-2 right-1 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-[#FF8A47] via-[#F85E10] to-[#C84304] shadow-[0_7px_12px_rgba(0,0,0,0.38),inset_0_2px_4px_rgba(255,255,255,0.6)] border border-[#D94B07] flex items-center justify-center text-white font-display font-bold text-xs active:translate-y-0.5 transition-transform"
                >
                  A
                </button>
              </div>
            </div>

            {/* Bottom Console Section (Status Grill, Start/Select, Acoustic Speaker Matrix) */}
            <div className="relative w-full flex items-end justify-between px-2 pb-1">
              <div className="flex flex-col gap-1.5 pb-1">
                <span className="w-7 h-1.5 rounded-full bg-[#F85E10] shadow-[inset_0_1px_2px_rgba(0,0,0,0.35)]" />
                <span className="w-7 h-1.5 rounded-full bg-[#F85E10] shadow-[inset_0_1px_2px_rgba(0,0,0,0.35)]" />
                <span className="w-7 h-1.5 rounded-full bg-[#F85E10] shadow-[inset_0_1px_2px_rgba(0,0,0,0.35)]" />
              </div>

              {/* Interactive SELECT / START Pill Buttons */}
              <div className="flex items-center gap-3 pb-2">
                <button
                  type="button"
                  onClick={() => setIsFlatView((prev) => !prev)}
                  title="Select: Toggle Upright / Tilted Hardware View"
                  aria-label="Toggle Console Angle"
                  className="w-7 h-2.5 rounded-full bg-gradient-to-b from-[#2D2D2D] to-[#121212] shadow-[0_3px_5px_rgba(0,0,0,0.4),inset_0_1px_1px_rgba(255,255,255,0.2)] active:scale-90 transition-transform"
                  style={{ transform: 'rotate(-28deg)' }}
                />
                <button
                  type="button"
                  onClick={onCycleGame}
                  title="Start: Switch Active Cartridge"
                  aria-label="Switch Active Cartridge"
                  className="w-7 h-2.5 rounded-full bg-gradient-to-b from-[#2D2D2D] to-[#121212] shadow-[0_3px_5px_rgba(0,0,0,0.4),inset_0_1px_1px_rgba(0,0,0,0.2)] active:scale-90 transition-transform"
                  style={{ transform: 'rotate(-28deg)' }}
                />
              </div>

              {/* CNC Micro-Drilled Speaker Array */}
              <div className="grid grid-cols-5 gap-1.5 p-1">
                {speakerGrid.flat().map((active, idx) =>
                  active ? (
                    <span
                      key={idx}
                      className={`w-1.5 h-1.5 rounded-full ${
                        isObsidian ? 'bg-black' : 'bg-[#231F1D]'
                      } shadow-[inset_0_1px_1px_rgba(0,0,0,0.8)]`}
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

      {/* Quiet Hardware Controls Bar Underneath */}
      <div className="mt-6 flex flex-wrap items-center justify-center gap-2 text-xs text-[#3A3633]">
        <button
          type="button"
          onClick={onCycleGame}
          className="px-3 py-1.5 rounded-md bg-white/60 hover:bg-white text-[#181615] font-medium transition-colors whitespace-nowrap shrink-0 shadow-sm"
        >
          Switch Cartridge ({activeGame.title})
        </button>
        <button
          type="button"
          onClick={() => setIsFlatView((prev) => !prev)}
          className="px-3 py-1.5 rounded-md bg-white/40 hover:bg-white/80 text-[#181615] font-medium transition-colors whitespace-nowrap shrink-0"
        >
          {isFlatView ? 'Tilted Showcase Angle' : 'Upright Inspection View'}
        </button>
      </div>
    </div>
  );
};
