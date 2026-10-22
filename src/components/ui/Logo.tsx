import React from 'react';
import { siteConfig } from '../../config/siteConfig';

export const Logo: React.FC = () => {
  return (
    <a
      href="#top"
      className="inline-flex items-center gap-3 group focus:outline-none"
      aria-label="PLAYBIT Home"
    >
      <div className="w-8 h-8 border-2 border-[#F85E10] rounded-lg p-1 flex items-center justify-center relative bg-[#C4BDB7]/30 shadow-sm group-hover:scale-105 transition-transform">
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
  );
};
