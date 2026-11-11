import React, { useState } from 'react';
import { siteConfig } from '../../config/siteConfig';

interface StoreConfiguratorSectionProps {
  selectedEditionId: string;
  onSelectEdition: (editionId: string) => void;
  selectedCartridgeIds: string[];
  onToggleCartridge: (gameId: string) => void;
  selectedAccessoryIds: string[];
  onToggleAccessory: (accId: string) => void;
}

export const StoreConfiguratorSection: React.FC<StoreConfiguratorSectionProps> = ({
  selectedEditionId,
  onSelectEdition,
  selectedCartridgeIds,
  onToggleCartridge,
  selectedAccessoryIds,
  onToggleAccessory,
}) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [region, setRegion] = useState('North America (110V / USB-C PD)');
  const [includeSdkAccess, setIncludeSdkAccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [reservationCode, setReservationCode] = useState<string | null>(null);

  const selectedEdition =
    siteConfig.editions.find((e) => e.id === selectedEditionId) ||
    siteConfig.editions[0];

  const selectedCartridges = siteConfig.games.filter((g) =>
    selectedCartridgeIds.includes(g.id)
  );

  const selectedAccessories = siteConfig.accessories.filter((a) =>
    selectedAccessoryIds.includes(a.id)
  );

  const cartridgesTotal = selectedCartridges.reduce((sum, g) => sum + g.price, 0);
  const accessoriesTotal = selectedAccessories.reduce((sum, a) => sum + a.price, 0);
  const totalOrderPrice =
    selectedEdition.price + cartridgesTotal + accessoriesTotal;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedName = fullName.trim();
    const trimmedEmail = email.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (trimmedName.length < 2) {
      setErrorMessage('Please enter your full name to assign a serialized unit.');
      return;
    }
    if (!emailRegex.test(trimmedEmail)) {
      setErrorMessage('Please enter a valid email address for Batch 04 dispatch confirmation.');
      return;
    }

    setErrorMessage('');
    const serialNum = Math.floor(1040 + Math.random() * 8900);
    setReservationCode(`PB26-B04-${serialNum}`);
  };

  return (
    <section
      id="store"
      className="w-full max-w-[1440px] mx-auto px-6 sm:px-10 py-20 lg:py-28 border-t border-[#181615]/15"
    >
      <div className="space-y-3 max-w-2xl mb-12">
        <div className="text-xs font-mono font-bold text-[#F85E10] tracking-wider">
          Direct Factory Allocation · Batch 04
        </div>
        <h2
          className="font-headline font-extrabold text-3xl sm:text-4xl text-[#181615] tracking-tight"
          style={{ textWrap: 'balance' }}
        >
          Configure Your PLAYBIT Hardware Allocation
        </h2>
        <p className="text-sm text-[#3A3633] leading-relaxed">
          Select your anodized chassis edition, add physical FRAM cartridges or studio dock accessories, and lock in your Batch 04 production serial number.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left 7 Columns: Hardware Edition & Accessories Selector */}
        <div className="lg:col-span-7 space-y-10">
          {/* Step 1: Select Console Edition */}
          <div className="space-y-4">
            <h3 className="font-headline font-bold text-lg text-[#181615]">
              01. Select Console Edition
            </h3>

            <div className="grid grid-cols-1 gap-4">
              {siteConfig.editions.map((edition) => {
                const isSelected = edition.id === selectedEditionId;
                return (
                  <div
                    key={edition.id}
                    onClick={() => {
                      onSelectEdition(edition.id);
                      setReservationCode(null);
                    }}
                    className={`rounded-2xl p-6 cursor-pointer transition-colors border ${
                      isSelected
                        ? 'bg-[#DFD9D3] border-[#F85E10]'
                        : 'bg-[#D6D0CA]/75 border-[#181615]/10 hover:border-[#181615]/30'
                    }`}
                  >
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <div>
                        <span className="text-xs font-mono text-[#F85E10] font-semibold">
                          {edition.shippingBatch}
                        </span>
                        <h4 className="font-headline font-bold text-xl text-[#181615] mt-0.5">
                          {edition.name}
                        </h4>
                      </div>
                      <span className="font-display font-extrabold text-2xl text-[#181615] tabular-nums">
                        ${edition.price}
                      </span>
                    </div>

                    <p className="text-xs font-mono text-[#4A4643] mt-1">
                      {edition.finish}
                    </p>
                    <p className="text-xs sm:text-sm text-[#3A3633] mt-3 leading-relaxed">
                      {edition.description}
                    </p>

                    <div className="mt-4 pt-3 border-t border-[#181615]/10 text-xs text-[#4A4643]">
                      <span className="font-semibold text-[#181615]">In the Box: </span>
                      {edition.inBox.join(' · ')}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Step 2: Optional Studio & Dock Accessories */}
          <div className="space-y-4">
            <h3 className="font-headline font-bold text-lg text-[#181615]">
              02. Optional Studio &amp; Desktop Hardware
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {siteConfig.accessories.map((acc) => {
                const isSelected = selectedAccessoryIds.includes(acc.id);
                return (
                  <div
                    key={acc.id}
                    onClick={() => {
                      onToggleAccessory(acc.id);
                      setReservationCode(null);
                    }}
                    className={`rounded-xl p-5 cursor-pointer transition-colors border flex flex-col justify-between gap-4 ${
                      isSelected
                        ? 'bg-[#DFD9D3] border-[#F85E10]'
                        : 'bg-[#D6D0CA]/75 border-[#181615]/10 hover:border-[#181615]/30'
                    }`}
                  >
                    <div className="space-y-2">
                      <div className="flex items-baseline justify-between gap-2">
                        <h4 className="font-headline font-bold text-sm text-[#181615]">
                          {acc.name}
                        </h4>
                        <span className="font-mono font-bold text-sm text-[#181615] tabular-nums">
                          +${acc.price}
                        </span>
                      </div>
                      <p className="text-[11px] font-mono text-[#4A4643]">
                        {acc.meta}
                      </p>
                      <p className="text-xs text-[#3A3633] leading-relaxed">
                        {acc.description}
                      </p>
                    </div>

                    <div className="text-xs font-semibold text-[#F85E10]">
                      {isSelected ? 'Included in Allocation' : 'Click to Add'}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right 5 Columns: Order Summary & Validated Reservation Form */}
        <div className="lg:col-span-5 rounded-2xl bg-[#181615] text-white p-6 sm:p-8 border border-white/10 space-y-6">
          <div className="pb-4 border-b border-white/10 flex items-baseline justify-between">
            <div>
              <div className="text-xs font-mono text-[#F85E10]">
                BATCH 04 BUILD SHEET
              </div>
              <h3 className="font-headline font-bold text-xl text-white mt-0.5">
                Allocation Summary
              </h3>
            </div>
            <span className="text-xs font-mono text-white/60 tabular-nums">
              EST. DISPATCH NOV 2026
            </span>
          </div>

          {/* Line Items Breakdown */}
          <div className="space-y-3 text-xs sm:text-sm">
            <div className="flex items-baseline justify-between gap-4">
              <div>
                <div className="font-semibold text-white">{selectedEdition.name}</div>
                <div className="text-xs text-white/60">Includes Chrono Drift 1989 Cart</div>
              </div>
              <span className="font-mono font-bold text-white tabular-nums">
                ${selectedEdition.price}.00
              </span>
            </div>

            {selectedCartridges.map((cart) => (
              <div
                key={cart.id}
                className="flex items-baseline justify-between gap-4 pt-2 border-t border-white/10"
              >
                <div className="flex items-center gap-2">
                  <span className="text-white/90">{cart.title} (FRAM Cart)</span>
                  <button
                    type="button"
                    onClick={() => onToggleCartridge(cart.id)}
                    className="text-[11px] text-[#F85E10] hover:underline"
                  >
                    Remove
                  </button>
                </div>
                <span className="font-mono text-white tabular-nums">
                  ${cart.price}.00
                </span>
              </div>
            ))}

            {selectedAccessories.map((acc) => (
              <div
                key={acc.id}
                className="flex items-baseline justify-between gap-4 pt-2 border-t border-white/10"
              >
                <div className="flex items-center gap-2">
                  <span className="text-white/90">{acc.name}</span>
                  <button
                    type="button"
                    onClick={() => onToggleAccessory(acc.id)}
                    className="text-[11px] text-[#F85E10] hover:underline"
                  >
                    Remove
                  </button>
                </div>
                <span className="font-mono text-white tabular-nums">
                  ${acc.price}.00
                </span>
              </div>
            ))}

            <div className="pt-4 border-t border-white/20 flex items-baseline justify-between">
              <span className="font-mono text-xs uppercase tracking-wider text-white/70">
                Total Hardware Allocation
              </span>
              <span className="font-display font-extrabold text-2xl text-[#F85E10] tabular-nums">
                ${totalOrderPrice}.00 USD
              </span>
            </div>
          </div>

          {/* Reservation Form or Serialized Confirmation */}
          {reservationCode ? (
            <div className="rounded-xl bg-white/5 border border-[#F85E10] p-5 space-y-3">
              <div className="text-xs font-mono font-bold text-[#F85E10]">
                ALLOCATION CONFIRMED · SERIAL {reservationCode}
              </div>
              <h4 className="font-headline font-bold text-base text-white">
                Reserved for {fullName}
              </h4>
              <p className="text-xs text-white/75 leading-relaxed">
                We have dispatched your build sheet and payment link for{' '}
                <span className="text-white font-semibold">{selectedEdition.name}</span>{' '}
                (${totalOrderPrice}.00 USD) to <span className="underline">{email}</span>.
              </p>
              <div className="pt-2 flex items-center justify-between text-[11px] font-mono text-white/60">
                <span>REGION: {region.split(' ')[0]}</span>
                <button
                  type="button"
                  onClick={() => setReservationCode(null)}
                  className="text-[#F85E10] hover:underline"
                >
                  Modify Configuration
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 pt-2" noValidate>
              <div>
                <label
                  htmlFor="res-name"
                  className="block text-xs font-mono text-white/75 mb-1.5"
                >
                  Full Name (For Serialized Chassis Registry)
                </label>
                <input
                  id="res-name"
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Elena Rostova"
                  className="w-full px-3.5 py-2.5 rounded-lg bg-white/10 border border-white/15 text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-[#F85E10]"
                />
              </div>

              <div>
                <label
                  htmlFor="res-email"
                  className="block text-xs font-mono text-white/75 mb-1.5"
                >
                  Dispatch Email Address
                </label>
                <input
                  id="res-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="elena@studio-hardware.org"
                  className="w-full px-3.5 py-2.5 rounded-lg bg-white/10 border border-white/15 text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-[#F85E10]"
                />
              </div>

              <div>
                <label
                  htmlFor="res-region"
                  className="block text-xs font-mono text-white/75 mb-1.5"
                >
                  Regional Power &amp; Logistics Hub
                </label>
                <select
                  id="res-region"
                  value={region}
                  onChange={(e) => setRegion(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-[#262322] border border-white/15 text-sm text-white focus:outline-none focus:border-[#F85E10]"
                >
                  <option>North America (110V / USB-C PD)</option>
                  <option>European Union — Munich Hub (230V / CE)</option>
                  <option>Japan &amp; Asia-Pacific — Kyoto Hub (100V / TELEC)</option>
                  <option>United Kingdom (230V / UKCA)</option>
                  <option>Latin America &amp; Global Courier (Universal PD)</option>
                </select>
              </div>

              <label className="flex items-center gap-2.5 text-xs text-white/80 cursor-pointer pt-1">
                <input
                  type="checkbox"
                  checked={includeSdkAccess}
                  onChange={(e) => setIncludeSdkAccess(e.target.checked)}
                  className="rounded border-white/30 text-[#F85E10] focus:ring-[#F85E10]"
                />
                <span>Include complimentary Cyclone V FPGA Core SDK &amp; Verilog docs</span>
              </label>

              {errorMessage && (
                <div
                  role="alert"
                  className="text-xs font-medium text-[#FF8547] bg-[#F85E10]/15 border border-[#F85E10]/40 rounded-lg px-3 py-2"
                >
                  {errorMessage}
                </div>
              )}

              <button
                type="submit"
                className="w-full py-4 rounded-xl bg-[#F85E10] hover:bg-[#e04f06] text-white font-display font-bold text-xs tracking-[0.16em] uppercase transition-colors shadow-lg whitespace-nowrap"
              >
                Lock Batch 04 Allocation — ${totalOrderPrice}.00
              </button>

              <p className="text-[11px] text-white/55 text-center">
                No immediate charge until your serialized unit passes final 24-hour burn-in inspection.
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};
