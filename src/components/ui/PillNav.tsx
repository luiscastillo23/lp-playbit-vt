import React, { useState } from 'react';
import { siteConfig } from '../../config/siteConfig';

export const PillNav: React.FC = () => {
  const [activeTab, setActiveTab] = useState('console');

  return (
    <nav
      aria-label="Primary Navigation"
      className="bg-white/20 backdrop-blur-md rounded-full p-1.5 inline-flex items-center gap-1 sm:gap-2 border border-white/15 shadow-sm"
    >
      {siteConfig.navItems.map((item) => {
        const isActive = activeTab === item.id;
        return (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`text-xs sm:text-sm font-sans transition-all duration-200 rounded-full ${
              isActive
                ? 'bg-[#E3DFDC] text-[#181615] px-5 py-2 font-medium shadow-sm'
                : 'text-[#3A3633] px-4 py-2 hover:text-black'
            }`}
          >
            {item.label}
          </button>
        );
      })}
    </nav>
  );
};
