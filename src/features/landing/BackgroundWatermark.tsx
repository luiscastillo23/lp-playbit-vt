import React from 'react';

export const BackgroundWatermark: React.FC = () => {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute top-[11%] left-0 w-full overflow-hidden z-0 flex justify-start pl-4 sm:pl-8"
    >
      <span className="font-display font-black text-[13.5vw] leading-none tracking-[0.06em] text-[#B5AEA8]/45 uppercase whitespace-nowrap select-none">
        RETRO GAM
      </span>
    </div>
  );
};
