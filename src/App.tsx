import React, { useState } from 'react';
import { HeroContainer } from './components/layout/HeroContainer';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { HeroSection } from './features/landing/HeroSection';
import { HardwareArchitectureSection } from './features/landing/HardwareArchitectureSection';
import { GamesLibrarySection } from './features/landing/GamesLibrarySection';
import { SpecsSection } from './features/landing/SpecsSection';
import { StoreConfiguratorSection } from './features/landing/StoreConfiguratorSection';
import { CartridgeGame, siteConfig } from './config/siteConfig';

export const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>('console');
  const [activeGameIndex, setActiveGameIndex] = useState<number>(0);
  const [selectedEditionId, setSelectedEditionId] = useState<string>('sand-alloy');
  const [selectedCartridgeIds, setSelectedCartridgeIds] = useState<string[]>([
    'solaris-striker',
  ]);
  const [selectedAccessoryIds, setSelectedAccessoryIds] = useState<string[]>([
    'hdmi-dock',
  ]);

  const activeGame = siteConfig.games[activeGameIndex] || siteConfig.games[0];

  const handleCycleGame = () => {
    setActiveGameIndex((prev) => (prev + 1) % siteConfig.games.length);
  };

  const handleLoadGameOnConsole = (game: CartridgeGame) => {
    const idx = siteConfig.games.findIndex((g) => g.id === game.id);
    if (idx !== -1) {
      setActiveGameIndex(idx);
    }
    setActiveSection('console');
  };

  const handleToggleCartridgeInBundle = (gameId: string) => {
    setSelectedCartridgeIds((prev) =>
      prev.includes(gameId)
        ? prev.filter((id) => id !== gameId)
        : [...prev, gameId]
    );
  };

  const handleToggleAccessory = (accId: string) => {
    setSelectedAccessoryIds((prev) =>
      prev.includes(accId)
        ? prev.filter((id) => id !== accId)
        : [...prev, accId]
    );
  };

  const scrollToStore = () => {
    setActiveSection('store');
    const storeEl = document.getElementById('store');
    if (storeEl) {
      storeEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const totalItemsInAllocation =
    1 + selectedCartridgeIds.length + selectedAccessoryIds.length;

  return (
    <HeroContainer>
      <Header
        activeSection={activeSection}
        onNavigate={setActiveSection}
        onReserveClick={scrollToStore}
        cartCount={totalItemsInAllocation}
      />

      <main className="flex-1 w-full">
        <HeroSection
          activeGame={activeGame}
          onCycleGame={handleCycleGame}
          selectedEditionId={selectedEditionId}
          onSelectEdition={setSelectedEditionId}
          onReserveClick={scrollToStore}
        />

        <HardwareArchitectureSection />

        <GamesLibrarySection
          activeGameId={activeGame.id}
          onLoadGameOnConsole={handleLoadGameOnConsole}
          selectedCartridgeIds={selectedCartridgeIds}
          onToggleCartridgeInBundle={handleToggleCartridgeInBundle}
        />

        <SpecsSection />

        <StoreConfiguratorSection
          selectedEditionId={selectedEditionId}
          onSelectEdition={setSelectedEditionId}
          selectedCartridgeIds={selectedCartridgeIds}
          onToggleCartridge={handleToggleCartridgeInBundle}
          selectedAccessoryIds={selectedAccessoryIds}
          onToggleAccessory={handleToggleAccessory}
        />
      </main>

      <Footer />
    </HeroContainer>
  );
};

export default App;
