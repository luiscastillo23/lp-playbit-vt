import React from 'react';
import { HeroContainer } from './components/layout/HeroContainer';
import { Header } from './components/layout/Header';
import { BackgroundWatermark } from './features/landing/BackgroundWatermark';
import { HeroSection } from './features/landing/HeroSection';

export const App: React.FC = () => {
  return (
    <HeroContainer>
      <BackgroundWatermark />
      <Header />
      <HeroSection />
    </HeroContainer>
  );
};

export default App;
