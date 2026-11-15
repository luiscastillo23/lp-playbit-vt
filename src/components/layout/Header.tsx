import React from 'react';
import { PillNav } from '../ui/PillNav';
import { Logo } from '../ui/Logo';

export const Header: React.FC = () => {
  return (
    <header className="relative z-40 w-full px-6 sm:px-10 pt-6 pb-2 flex items-center justify-between">
      <div className="flex-1 flex items-center justify-start">
        <PillNav />
      </div>
      <div className="flex-1 flex items-center justify-center">
        <Logo />
      </div>
      <div className="flex-1 hidden md:block" />
    </header>
  );
};
