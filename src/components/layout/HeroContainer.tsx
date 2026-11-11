import React from 'react';

interface HeroContainerProps {
  children: React.ReactNode;
}

export const HeroContainer: React.FC<HeroContainerProps> = ({ children }) => {
  return (
    <div className="relative w-full min-h-screen overflow-x-hidden flex flex-col justify-between">
      {children}
    </div>
  );
};
