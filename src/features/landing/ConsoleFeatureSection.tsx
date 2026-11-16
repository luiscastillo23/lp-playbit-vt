import React, { useState } from 'react';
import {
  HARDWARE_FINISHES,
  HARDWARE_SUBSYSTEMS,
  HardwareFinish,
  HardwareSubsystem,
} from '../../utils/landingLogic';
import hardwareStudioImg from '../../assets/images/playbit_hardware_studio_1794856717809.jpg';
import magneticDockImg from '../../assets/images/playbit_magnetic_dock_1794856715441.jpg';

interface ConsoleFeatureSectionProps {
  selectedFinishId: HardwareFinish['id'];
  onSelectFinish: (finishId: HardwareFinish['id']) => void;
}

export const ConsoleFeatureSection: React.FC<ConsoleFeatureSectionProps> = ({
  selectedFinishId,
  onSelectFinish,
}) => {
  const [activeSubsystemId, setActiveSubsystemId] =
    useState<HardwareSubsystem['id']>('display');
  const [studioImgFailed, setStudioImgFailed] = useState(false);
  const [dockImgFailed, setDockImgFailed] = useState(false);

  const selectedFinish =
    HARDWARE_FINISHES.find((f) => f.id === selectedFinishId) ??
    HARDWARE_FINISHES[0];
  const activeSubsystem =
    HARDWARE_SUBSYSTEMS.find((s) => s.id === activeSubsystemId) ??
    HARDWARE_SUBSYSTEMS[0];

  return (
    <section
      id="console"
      aria-labelledby="console-heading"
      className="relative w-full max-w-[1600px] mx-auto px-6 sm:px-10 py-20 lg:py-28 border-t border-[#181615]/10"
    >
      {/* Section Header */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-14 lg:mb-20">
        <div className="lg:col-span-7">
          <div className="flex items-center gap-3 text-xs sm:text-sm font-mono font-bold text-[#F85E10] tracking-widest mb-3">
            <span>/ 01</span>
            <span aria-hidden="true">·</span>
            <span>INDUSTRIAL ARCHITECTURE</span>
          </div>
          <h2
            id="console-heading"
            className="font-headline font-semibold text-3xl sm:text-5xl text-[#181615] tracking-tight leading-[1.06] uppercase"
          >
            MACHINED FOR TACTILE PERMANENCE
          </h2>
        </div>
        <div className="lg:col-span-5 flex flex-col lg:items-end justify-end">
          <p className="text-sm sm:text-base text-[#4A4643] font-sans leading-relaxed max-w-md">
            Every PLAYBIT chassis is milled from 6061 aerospace aluminum and
            paired with compression-molded polycarbonate shells, eliminating
            flex, creaks, and display light bleed.
          </p>
        </div>
      </div>

      {/* Asymmetric Bento Grid: Studio Photography + Interactive Finish Selector */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 mb-8">
        {/* Marquee Span-7 Hardware Studio Visual + Finish Switcher */}
        <div className="lg:col-span-7 rounded-[28px] bg-[#E3DFDC]/75 border border-[#181615]/10 p-6 sm:p-8 flex flex-col justify-between">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <div className="text-xs font-mono text-[#4A4643] tracking-wider">
                CHASSIS EDITION · {selectedFinish.code}
              </div>
              <h3 className="font-headline font-semibold text-xl sm:text-2xl text-[#181615] mt-1">
                {selectedFinish.name}
              </h3>
            </div>

            {/* Interactive Finish Selector */}
            <div
              role="group"
              aria-label="Select Console Finish"
              className="inline-flex items-center gap-1.5 bg-[#C4BDB7]/60 p-1.5 rounded-xl border border-[#181615]/10 self-start sm:self-auto"
            >
              {HARDWARE_FINISHES.map((finish) => {
                const isSelected = finish.id === selectedFinish.id;
                return (
                  <button
                    key={finish.id}
                    type="button"
                    onClick={() => onSelectFinish(finish.id)}
                    aria-pressed={isSelected}
                    aria-label={`Finish ${finish.index}: ${finish.name}`}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-mono transition-colors duration-150 whitespace-nowrap shrink-0 ${
                      isSelected
                        ? 'bg-[#181615] text-[#FBF8F3] font-bold shadow-sm'
                        : 'text-[#181615] hover:bg-white/40'
                    }`}
                  >
                    <span
                      aria-hidden="true"
                      className="w-3 h-3 rounded-sm border border-black/20 shrink-0"
                      style={{ backgroundColor: finish.backHex }}
                    />
                    <span>{finish.index}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Visual Showcase Frame */}
          <div className="relative w-full aspect-[16/10] rounded-[20px] overflow-hidden bg-[#181615] border border-[#181615]/15">
            {!studioImgFailed ? (
              <img
                src={hardwareStudioImg}
                alt={`PLAYBIT console in ${selectedFinish.name} finish resting on a studio stone surface`}
                referrerPolicy="no-referrer"
                onError={() => setStudioImgFailed(true)}
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-[1.02]"
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center p-8 text-center bg-gradient-to-br from-[#231F1D] to-[#141414] text-[#FBF8F3]">
                <span className="font-mono text-xs text-[#F85E10] tracking-widest">
                  {selectedFinish.code}
                </span>
                <p className="font-headline text-2xl mt-2">
                  {selectedFinish.name}
                </p>
              </div>
            )}

            {/* Measured contrast scrim overlay with live finish telemetry */}
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/50 to-transparent p-5 sm:p-6 flex flex-col sm:flex-row sm:items-end justify-between gap-3">
              <div>
                <p className="text-xs font-mono text-[#FBF8F3]/80">
                  {selectedFinish.shellMaterial}
                </p>
                <p className="text-xs sm:text-sm font-sans text-white mt-1 max-w-xl">
                  {selectedFinish.finishNote}
                </p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <span
                  className="w-4 h-4 rounded-sm border border-white/40"
                  style={{ backgroundColor: selectedFinish.frontHex }}
                  title="Front Shell Tone"
                />
                <span
                  className="w-4 h-4 rounded-sm border border-white/40"
                  style={{ backgroundColor: selectedFinish.backHex }}
                  title="Rear Chassis Tone"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Span-5 Dock & Acoustic Proof Card */}
        <div className="lg:col-span-5 rounded-[28px] bg-[#181615] text-[#FBF8F3] p-6 sm:p-8 flex flex-col justify-between border border-[#181615]">
          <div>
            <div className="flex items-center justify-between text-xs font-mono text-[#C4BDB7] tracking-wider">
              <span>DESKTOP CONTINUITY</span>
              <span className="tabular-nums">4K 60HZ HDMI OUT</span>
            </div>
            <h3 className="font-headline font-semibold text-2xl sm:text-3xl text-white mt-2 tracking-tight">
              01. POCKET TO STUDIO DOCKING IN ONE MOTION
            </h3>
            <p className="text-sm text-[#CEC8C2] font-sans leading-relaxed mt-3">
              Drop PLAYBIT onto the weighted CNC aluminum cradle for instant
              pogo-pin PD fast charging, uncompressed digital audio, and
              integer-scaled external monitor output.
            </p>
          </div>

          <div className="my-6 relative w-full aspect-[4/3] rounded-[18px] overflow-hidden bg-[#262321] border border-white/10">
            {!dockImgFailed ? (
              <img
                src={magneticDockImg}
                alt="PLAYBIT console docked in the matte black CNC aluminum magnetic charging cradle"
                referrerPolicy="no-referrer"
                onError={() => setDockImgFailed(true)}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center p-6 text-center font-mono text-xs text-[#C4BDB7]">
                PLAYBIT Magnetic Desktop Dock · CNC 6061 Aluminum
              </div>
            )}
          </div>

          <div className="grid grid-cols-3 gap-4 pt-4 border-t border-white/10 font-mono">
            <div>
              <div className="text-[11px] text-[#C4BDB7]">WEIGHT</div>
              <div className="text-base sm:text-lg font-bold text-white tabular-nums mt-0.5">
                184 g
              </div>
            </div>
            <div>
              <div className="text-[11px] text-[#C4BDB7]">THICKNESS</div>
              <div className="text-base sm:text-lg font-bold text-white tabular-nums mt-0.5">
                13.8 mm
              </div>
            </div>
            <div>
              <div className="text-[11px] text-[#C4BDB7]">BOOT TIME</div>
              <div className="text-base sm:text-lg font-bold text-[#F85E10] tabular-nums mt-0.5">
                0.38 s
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Subsystem Inspector */}
      <div className="rounded-[28px] bg-[#FBF8F3] border border-[#181615]/10 p-6 sm:p-10">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-8 border-b border-[#181615]/10">
          <div>
            <div className="text-xs font-mono font-bold text-[#F85E10] tracking-widest">
              SUBSYSTEM BREAKDOWN
            </div>
            <h3 className="font-headline font-semibold text-2xl sm:text-3xl text-[#181615] mt-1">
              INSPECT INTERNAL ENGINEERING
            </h3>
          </div>

          {/* Interactive Subsystem Selector Tabs */}
          <div
            role="tablist"
            aria-label="Hardware Subsystems"
            className="flex flex-wrap items-center gap-2"
          >
            {HARDWARE_SUBSYSTEMS.map((sub) => {
              const isActive = sub.id === activeSubsystem.id;
              return (
                <button
                  key={sub.id}
                  role="tab"
                  type="button"
                  aria-selected={isActive}
                  onClick={() => setActiveSubsystemId(sub.id)}
                  className={`px-4 py-2.5 rounded-xl font-mono text-xs transition-colors duration-150 whitespace-nowrap shrink-0 ${
                    isActive
                      ? 'bg-[#F85E10] text-white font-bold shadow-sm'
                      : 'bg-[#E3DFDC]/70 text-[#181615] hover:bg-[#E3DFDC]'
                  }`}
                >
                  {sub.index}. {sub.id.toUpperCase()}
                </button>
              );
            })}
          </div>
        </div>

        {/* Active Subsystem Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-8 items-center">
          <div className="lg:col-span-7 space-y-4">
            <div className="text-xs font-mono text-[#4A4643] tracking-wider">
              MODULE {activeSubsystem.index} · {activeSubsystem.subtitle}
            </div>
            <h4 className="font-headline font-semibold text-2xl sm:text-4xl text-[#181615] tracking-tight">
              {activeSubsystem.title}
            </h4>
            <p className="text-sm sm:text-base text-[#4A4643] font-sans leading-relaxed max-w-2xl">
              {activeSubsystem.summary}
            </p>
          </div>

          <div className="lg:col-span-5 bg-[#E3DFDC]/65 rounded-2xl p-6 border border-[#181615]/10 space-y-5">
            <div className="pb-4 border-b border-[#181615]/10 flex items-baseline justify-between gap-4">
              <span className="text-xs font-mono text-[#4A4643]">
                {activeSubsystem.keyMetricLabel}
              </span>
              <span className="font-display font-bold text-lg sm:text-xl text-[#F85E10] tabular-nums">
                {activeSubsystem.keyMetricValue}
              </span>
            </div>

            <dl className="space-y-3 font-mono text-xs sm:text-sm">
              {activeSubsystem.specs.map((spec) => (
                <div
                  key={spec.label}
                  className="flex items-center justify-between gap-4"
                >
                  <dt className="text-[#4A4643]">{spec.label}</dt>
                  <dd className="text-[#181615] font-bold tabular-nums text-right">
                    {spec.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
};
