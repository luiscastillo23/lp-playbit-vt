import React from 'react';

interface HeroContainerProps {
  children: React.ReactNode;
}

export const HeroContainer: React.FC<HeroContainerProps> = ({ children }) => {
  return (
    <main className="relative w-full min-h-screen overflow-hidden flex flex-col justify-between select-none">
      {children}
    </main>
  );
};
