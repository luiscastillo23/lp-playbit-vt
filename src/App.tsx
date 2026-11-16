import React, { useEffect, useState } from 'react';
import { HeroContainer } from './components/layout/HeroContainer';
import { Header } from './components/layout/Header';
import { BackgroundWatermark } from './features/landing/BackgroundWatermark';
import { HeroSection } from './features/landing/HeroSection';
import { ConsoleFeatureSection } from './features/landing/ConsoleFeatureSection';
import { GamesLibrarySection } from './features/landing/GamesLibrarySection';
import { TechSpecsSection } from './features/landing/TechSpecsSection';
import { StoreSection } from './features/landing/StoreSection';
import { Footer } from './components/layout/Footer';
import { HardwareFinish } from './utils/landingLogic';

export const App: React.FC = () => {
  const [selectedFinishId, setSelectedFinishId] =
    useState<HardwareFinish['id']>('signal-orange');

  useEffect(() => {
    const handleDelegatedNavigation = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      const button = target?.closest('button');
      if (!button) return;

      const label = button.textContent?.trim().toLowerCase();
      if (!label) return;

      const navMap: Record<string, string> = {
        console: 'console',
        games: 'games',
        specs: 'specs',
        store: 'store',
        'get access': 'store',
        'contact us': 'contact',
      };

      const sectionId = navMap[label];
      if (sectionId && button.closest('main')) {
        const sectionEl = document.getElementById(sectionId);
        if (sectionEl) {
          sectionEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    };

    document.addEventListener('click', handleDelegatedNavigation);
    return () => {
      document.removeEventListener('click', handleDelegatedNavigation);
    };
  }, []);

  return (
    <div id="top" className="w-full min-h-screen flex flex-col">
      <HeroContainer>
        <BackgroundWatermark />
        <Header />
        <HeroSection />
      </HeroContainer>

      <ConsoleFeatureSection
        selectedFinishId={selectedFinishId}
        onSelectFinish={setSelectedFinishId}
      />
      <GamesLibrarySection />
      <TechSpecsSection />
      <StoreSection
        selectedFinishId={selectedFinishId}
        onSelectFinish={setSelectedFinishId}
      />
      <Footer />
    </div>
  );
};

export default App;
