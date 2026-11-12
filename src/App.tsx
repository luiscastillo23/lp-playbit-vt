import React, { useState } from 'react';
import { HeroContainer } from './components/layout/HeroContainer';
import { Header } from './components/layout/Header';
import { BackgroundWatermark } from './features/landing/BackgroundWatermark';
import { HeroSection } from './features/landing/HeroSection';
import { ConsoleArchitectureSection } from './features/landing/ConsoleArchitectureSection';
import {
  GamesShowcaseSection,
  CARTRIDGE_CATALOG,
  GameCartridge,
} from './features/landing/GamesShowcaseSection';
import { SpecsSection } from './features/landing/SpecsSection';
import { StoreSection } from './features/landing/StoreSection';
import { Footer } from './components/layout/Footer';

export const App: React.FC = () => {
  const [selectedFinishId, setSelectedFinishId] = useState<'cream' | 'obsidian' | 'alloy'>('cream');
  const [cartridgesInBag, setCartridgesInBag] = useState<GameCartridge[]>([
    CARTRIDGE_CATALOG[0],
  ]);

  const handleToggleCartridgeInBag = (cartridge: GameCartridge) => {
    setCartridgesInBag((prev) => {
      const exists = prev.some((c) => c.id === cartridge.id);
      if (exists) {
        return prev.filter((c) => c.id !== cartridge.id);
      }
      return [...prev, cartridge];
    });
  };

  const handleRemoveCartridge = (id: string) => {
    setCartridgesInBag((prev) => prev.filter((c) => c.id !== id));
  };

  return (
    <div id="top" className="w-full min-h-screen">
      <HeroContainer>
        <BackgroundWatermark />
        <Header />
        <HeroSection />
      </HeroContainer>

      <ConsoleArchitectureSection onSelectFinishForStore={setSelectedFinishId} />

      <GamesShowcaseSection
        addedCartridgeIds={cartridgesInBag.map((c) => c.id)}
        onToggleCartridgeInBag={handleToggleCartridgeInBag}
      />

      <SpecsSection />

      <StoreSection
        selectedFinishId={selectedFinishId}
        onChangeFinishId={setSelectedFinishId}
        cartridgesInBag={cartridgesInBag}
        onRemoveCartridge={handleRemoveCartridge}
      />

      <Footer />
    </div>
  );
};

export default App;
