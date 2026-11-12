import React from 'react';
import { siteConfig } from '../../config/siteConfig';

export interface NavbarProps {
  activeSection?: string;
  onNavigate?: (sectionId: string) => void;
  onReserveClick?: () => void;
  cartCount?: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeSection = 'console',
  onNavigate,
  onReserveClick,
  cartCount = 1,
}) => {
  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    sectionId: string
  ) => {
    if (onNavigate) {
      e.preventDefault();
      onNavigate(sectionId);
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-[#C4BDB7]/90 backdrop-blur-md border-b border-[#181615]/10">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 py-3 sm:py-4 flex items-center justify-between gap-4 sm:gap-8">
        {/* Zone 1: Single text element wordmark */}
        <a
          href="#console"
          onClick={(e) => handleNavClick(e, 'console')}
          className="font-display font-extrabold text-sm sm:text-base lg:text-lg tracking-[0.2em] sm:tracking-[0.24em] text-[#181615] hover:text-[#F85E10] transition-colors whitespace-nowrap shrink-0"
        >
          {siteConfig.brand}
        </a>

        {/* Zone 2: Clean single-line text navigation links */}
        <nav
          aria-label="Primary Navigation"
          className="flex items-center gap-3 sm:gap-5 lg:gap-7 text-xs sm:text-sm font-medium text-[#3A3633] overflow-x-auto no-scrollbar py-0.5 max-w-full"
        >
          {siteConfig.navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.id}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.id)}
                className={`py-1.5 transition-colors whitespace-nowrap shrink-0 border-b-2 ${
                  isActive
                    ? 'text-[#181615] font-semibold border-[#F85E10]'
                    : 'border-transparent hover:text-[#181615] hover:border-[#181615]/30'
                }`}
              >
                {item.label}
              </a>
            );
          })}
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center shrink-0">
          <button
            type="button"
            onClick={onReserveClick}
            className="px-3 sm:px-5 py-2 sm:py-2.5 text-[10px] sm:text-xs font-display font-bold tracking-[0.12em] sm:tracking-[0.14em] uppercase text-white bg-[#181615] hover:bg-[#F85E10] rounded-lg transition-colors whitespace-nowrap shrink-0 shadow-sm min-h-[38px] sm:min-h-[40px]"
          >
            {cartCount > 0 ? `Reserve Unit (${cartCount})` : 'Reserve Unit'}
          </button>
        </div>
      </div>
    </header>
  );
};
