import React, { useState } from 'react';
import { Check, Minus, Plus, ShoppingBag, Trash2 } from 'lucide-react';
import { GameCartridge } from './GamesShowcaseSection';
import { Button } from '../../components/ui/Button';

interface EditionPackage {
  id: 'standard' | 'studio' | 'collector';
  code: string;
  name: string;
  subtitle: string;
  price: number;
  batchAllocation: string;
  includes: string[];
}

const EDITION_PACKAGES: EditionPackage[] = [
  {
    id: 'standard',
    code: 'PB-26-STD',
    name: 'PLAYBIT Handheld Console',
    subtitle: 'Core Dual-FPGA Unit · Batch 01',
    price: 249,
    batchAllocation: 'In Stock · Ships Within 48 Hours',
    includes: [
      'PLAYBIT Pocket Console (CNC Alloy + LTPS 1600×1440)',
      'Braided 1.5m USB-C PD Fast Charge & MIDI Cable',
      'Microfiber Optical Lens Cloth & Hard Collector Box',
      '2-Year International Hardware Warranty',
    ],
  },
  {
    id: 'studio',
    code: 'PB-26-PRO',
    name: 'PLAYBIT Studio & Dock Bundle',
    subtitle: 'Handheld + 4K60 HDMI & TRS MIDI Dock',
    price: 329,
    batchAllocation: 'In Stock · Ships Within 48 Hours',
    includes: [
      'PLAYBIT Pocket Console (CNC Alloy + LTPS 1600×1440)',
      'Anodized Weighted Desktop Dock (HDMI 2.1 + 4× USB-A/C)',
      'PULSE MATRIX // SYNTH-16 Chiptune Workstation Cartridge',
      '3.5mm TRS MIDI Breakout Adapter Pair',
    ],
  },
  {
    id: 'collector',
    code: 'PB-26-MST',
    name: 'PLAYBIT Master Founders Kit',
    subtitle: 'Complete Hardware + 3 Physical Cartridges + Case',
    price: 419,
    batchAllocation: 'Limited Run · 140 Units Remaining',
    includes: [
      'PLAYBIT Pocket Console + Weighted Desktop Dock',
      '3 Physical FRAM Cartridges (Chrono Drift, Valkyrie, Synth-16)',
      'Waterproof Ballistic Nylon Field Case',
      'Serialized Stainless Steel Founders Plate',
    ],
  },
];

interface AccessoryItem {
  id: string;
  name: string;
  code: string;
  spec: string;
  price: number;
}

const ACCESSORIES: AccessoryItem[] = [
  {
    id: 'acc-dock',
    name: 'Weighted Aluminum Desktop Dock',
    code: 'PB-ACC-01',
    spec: 'Zero-lag 4K60 HDMI Output · 4-Port Controller Hub · 32-Bit Optical Audio Out',
    price: 89,
  },
  {
    id: 'acc-case',
    name: 'Ballistic Nylon Field Shell',
    code: 'PB-ACC-02',
    spec: 'EVA crush-proof interior · Holds console + 4 physical game cartridges',
    price: 39,
  },
  {
    id: 'acc-flash',
    name: '64MB Programmable FRAM Dev Cart',
    code: 'PB-ACC-03',
    spec: 'USB-C direct ROM & homebrew flashing · Real-time clock (RTC) chip on board',
    price: 59,
  },
];

interface StoreSectionProps {
  selectedFinishId: 'cream' | 'obsidian' | 'alloy';
  onChangeFinishId: (finishId: 'cream' | 'obsidian' | 'alloy') => void;
  cartridgesInBag: GameCartridge[];
  onRemoveCartridge: (id: string) => void;
}

export const StoreSection: React.FC<StoreSectionProps> = ({
  selectedFinishId,
  onChangeFinishId,
  cartridgesInBag,
  onRemoveCartridge,
}) => {
  const [selectedEdition, setSelectedEdition] = useState<EditionPackage>(EDITION_PACKAGES[0]);
  const [consoleQty, setConsoleQty] = useState<number>(1);
  const [selectedAccessoryIds, setSelectedAccessoryIds] = useState<string[]>([]);

  // Checkout / Reservation Form State
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [shippingCity, setShippingCity] = useState('');
  const [paymentMode, setPaymentMode] = useState<'direct' | 'cod'>('direct');
  const [formError, setFormError] = useState<string | null>(null);
  const [confirmedOrder, setConfirmedOrder] = useState<{
    orderNumber: string;
    total: number;
    editionName: string;
    finishLabel: string;
    customerName: string;
    customerEmail: string;
  } | null>(null);

  const toggleAccessory = (id: string) => {
    setSelectedAccessoryIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const finishLabels: Record<'cream' | 'obsidian' | 'alloy', string> = {
    cream: 'Field Cream / Safety Orange (PB-01-CRM)',
    obsidian: 'Carbon Obsidian / Amber (PB-02-OBS)',
    alloy: 'Raw Anodized Alloy (PB-03-RAW)',
  };

  const accessoriesTotal = selectedAccessoryIds.reduce((sum, id) => {
    const found = ACCESSORIES.find((a) => a.id === id);
    return sum + (found ? found.price : 0);
  }, 0);

  const cartridgesTotal = cartridgesInBag.reduce((sum, c) => sum + c.price, 0);
  const orderTotal = selectedEdition.price * consoleQty + accessoriesTotal + cartridgesTotal;

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || fullName.trim().length < 2) {
      setFormError('Please enter your full recipient name.');
      return;
    }
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email.trim())) {
      setFormError('Please enter a valid email address for shipment tracking.');
      return;
    }
    if (!shippingCity.trim() || shippingCity.trim().length < 3) {
      setFormError('Please enter your shipping city and postal code.');
      return;
    }

    setFormError(null);
    setConfirmedOrder({
      orderNumber: `PB-2026-${Math.floor(100 + Math.random() * 899)}`,
      total: orderTotal,
      editionName: `${selectedEdition.name} (×${consoleQty})`,
      finishLabel: finishLabels[selectedFinishId],
      customerName: fullName.trim(),
      customerEmail: email.trim(),
    });
  };

  return (
    <section
      id="store"
      className="relative w-full max-w-[1600px] mx-auto px-6 sm:px-10 py-20 lg:py-28 border-t border-[#181615]/10"
    >
      {/* Section Header */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-14">
        <div className="lg:col-span-7">
          <div className="flex items-center gap-3 text-xs font-mono text-[#F85E10] mb-3">
            <span>04. DIRECT HARDWARE STORE</span>
            <span aria-hidden="true">·</span>
            <span className="text-[#4A4643]">BATCH 01 FACTORY DIRECT</span>
          </div>
          <h2 className="font-headline font-semibold text-3xl sm:text-5xl text-[#181615] tracking-tight leading-[1.06] uppercase max-w-2xl">
            Configure Your PLAYBIT System
          </h2>
        </div>
        <div className="lg:col-span-5 flex flex-col items-start lg:items-end justify-end">
          <div className="flex items-center gap-2 text-xs font-mono text-[#3A3633]">
            <span>FREE EXPRESS GLOBAL COURIER OVER $200</span>
            <span aria-hidden="true">·</span>
            <span className="text-[#F85E10] font-bold">30-DAY FIELD TRIAL</span>
          </div>
        </div>
      </div>

      {/* Contiguous Purchase Layout: Left Configurator (7 cols), Right Order Module & Checkout (5 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left 7 Columns: Step-by-Step Hardware Configurator */}
        <div className="lg:col-span-7 space-y-8">
          {/* Step 1: Select Hardware Edition */}
          <div className="bg-[#E3DFDC]/75 rounded-[30px] p-6 sm:p-8 border border-white/60">
            <div className="flex items-center justify-between mb-6">
              <div className="text-xs font-mono text-[#F85E10] font-bold">
                STEP 01 · SELECT HARDWARE EDITION
              </div>
              <span className="text-xs font-mono text-[#4A4643]">
                {selectedEdition.batchAllocation}
              </span>
            </div>

            <div className="space-y-4">
              {EDITION_PACKAGES.map((pkg) => {
                const isSelected = selectedEdition.id === pkg.id;
                return (
                  <button
                    key={pkg.id}
                    type="button"
                    onClick={() => setSelectedEdition(pkg)}
                    className={`w-full text-left rounded-[22px] p-5 sm:p-6 transition-all border ${
                      isSelected
                        ? 'bg-[#181615] text-[#F5EFE6] border-[#181615] shadow-md'
                        : 'bg-white/65 text-[#181615] border-white/80 hover:bg-white'
                    }`}
                  >
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <div>
                        <span className="text-[11px] font-mono text-[#F85E10] font-bold">
                          {pkg.code}
                        </span>
                        <h3 className="font-headline font-semibold text-lg sm:text-xl mt-0.5">
                          {pkg.name}
                        </h3>
                        <p
                          className={`text-xs font-sans mt-0.5 ${
                            isSelected ? 'text-[#CEC8C2]' : 'text-[#4A4643]'
                          }`}
                        >
                          {pkg.subtitle}
                        </p>
                      </div>
                      <div className="text-right">
                        <span className="font-mono font-bold text-2xl tabular-nums">
                          ${pkg.price}
                        </span>
                        <span
                          className={`block text-[10px] font-mono ${
                            isSelected ? 'text-[#CEC8C2]' : 'text-[#4A4643]'
                          }`}
                        >
                          USD · TAX INCL.
                        </span>
                      </div>
                    </div>

                    <div className="mt-4 pt-4 border-t border-current/10 grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {pkg.includes.map((line) => (
                        <div
                          key={line}
                          className={`text-xs font-sans flex items-start gap-2 ${
                            isSelected ? 'text-[#E3DFDC]' : 'text-[#3A3633]'
                          }`}
                        >
                          <Check className="w-3.5 h-3.5 text-[#F85E10] shrink-0 mt-0.5" />
                          <span>{line}</span>
                        </div>
                      ))}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 2: Select Anodized Chassis Finish */}
          <div className="bg-[#E3DFDC]/75 rounded-[30px] p-6 sm:p-8 border border-white/60">
            <div className="flex items-center justify-between mb-5">
              <div className="text-xs font-mono text-[#F85E10] font-bold">
                STEP 02 · SELECT ANODIZED SHELL FINISH
              </div>
              <span className="text-xs font-mono text-[#181615] font-semibold">
                {finishLabels[selectedFinishId]}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {(
                [
                  {
                    id: 'cream',
                    label: 'Field Cream',
                    sub: 'Orange Rear Chassis',
                    swatch: '#F5EFE6',
                    accent: '#F85E10',
                  },
                  {
                    id: 'obsidian',
                    label: 'Carbon Obsidian',
                    sub: 'Bead-Blasted Black',
                    swatch: '#1E1E1E',
                    accent: '#F85E10',
                  },
                  {
                    id: 'alloy',
                    label: 'Raw Alloy',
                    sub: 'Clear Coat 6061-T6',
                    swatch: '#D2CECA',
                    accent: '#181615',
                  },
                ] as const
              ).map((option) => {
                const active = selectedFinishId === option.id;
                return (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => onChangeFinishId(option.id)}
                    className={`p-4 rounded-[20px] border text-left transition-all flex items-center gap-3.5 ${
                      active
                        ? 'bg-[#181615] text-white border-[#181615]'
                        : 'bg-white/65 text-[#181615] border-white/80 hover:bg-white'
                    }`}
                  >
                    <span
                      className="w-9 h-9 rounded-full border-2 shrink-0 relative flex items-center justify-center"
                      style={{
                        backgroundColor: option.swatch,
                        borderColor: option.accent,
                      }}
                    >
                      <span
                        className="w-2.5 h-2.5 rounded-full"
                        style={{ backgroundColor: option.accent }}
                      />
                    </span>
                    <div className="min-w-0">
                      <div className="font-headline font-semibold text-sm truncate">
                        {option.label}
                      </div>
                      <div
                        className={`text-[11px] font-mono truncate ${
                          active ? 'text-[#CEC8C2]' : 'text-[#4A4643]'
                        }`}
                      >
                        {option.sub}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 3: Modular Hardware Accessories */}
          <div className="bg-[#E3DFDC]/75 rounded-[30px] p-6 sm:p-8 border border-white/60">
            <div className="flex items-center justify-between mb-5">
              <div className="text-xs font-mono text-[#F85E10] font-bold">
                STEP 03 · MODULAR HARDWARE ACCESSORIES
              </div>
              <span className="text-xs font-mono text-[#4A4643]">OPTIONAL EXPANSIONS</span>
            </div>

            <div className="space-y-3">
              {ACCESSORIES.map((acc) => {
                const isAdded = selectedAccessoryIds.includes(acc.id);
                return (
                  <div
                    key={acc.id}
                    className={`rounded-[20px] p-4 sm:p-5 border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                      isAdded
                        ? 'bg-white border-[#F85E10]'
                        : 'bg-white/55 border-white/80'
                    }`}
                  >
                    <div>
                      <div className="flex items-center gap-2 text-xs font-mono text-[#4A4643]">
                        <span>{acc.code}</span>
                        <span aria-hidden="true">·</span>
                        <span className="text-[#F85E10] font-bold tabular-nums">
                          +${acc.price} USD
                        </span>
                      </div>
                      <h4 className="font-headline font-semibold text-base text-[#181615] mt-0.5">
                        {acc.name}
                      </h4>
                      <p className="text-xs font-sans text-[#3A3633] mt-0.5">{acc.spec}</p>
                    </div>

                    <button
                      type="button"
                      onClick={() => toggleAccessory(acc.id)}
                      className={`px-4 py-2.5 rounded-full text-xs font-mono font-bold transition-colors whitespace-nowrap shrink-0 self-start sm:self-center ${
                        isAdded
                          ? 'bg-[#181615] text-white'
                          : 'bg-[#E3DFDC] text-[#181615] hover:bg-[#181615] hover:text-white'
                      }`}
                    >
                      {isAdded ? 'INCLUDED ✓' : '+ ADD MODULE'}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right 5 Columns: Contiguous Purchase Summary & Direct Checkout */}
        <div className="lg:col-span-5 bg-[#181615] text-[#F5EFE6] rounded-[32px] p-6 sm:p-9 border border-white/10 shadow-[0_28px_60px_-15px_rgba(24,22,21,0.45)]">
          <div className="flex items-center justify-between pb-5 border-b border-white/10">
            <div className="flex items-center gap-2.5">
              <ShoppingBag className="w-5 h-5 text-[#F85E10]" />
              <h3 className="font-headline font-semibold text-xl uppercase tracking-tight">
                Allocation Summary
              </h3>
            </div>
            <span className="text-xs font-mono text-[#F85E10] font-bold tabular-nums">
              BATCH 01 / 2026
            </span>
          </div>

          {/* Itemized Breakdown */}
          <div className="py-6 space-y-4 border-b border-white/10">
            {/* Primary Console Line Item */}
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="text-xs font-mono text-[#F85E10]">{selectedEdition.code}</div>
                <div className="font-headline font-semibold text-base text-white">
                  {selectedEdition.name}
                </div>
                <div className="text-xs font-mono text-[#CEC8C2] mt-0.5">
                  Finish: {finishLabels[selectedFinishId]}
                </div>
              </div>

              <div className="flex flex-col items-end gap-2">
                <span className="font-mono font-bold text-base text-white tabular-nums">
                  ${selectedEdition.price * consoleQty}
                </span>

                {/* Quantity Stepper */}
                <div className="inline-flex items-center gap-2 bg-white/10 rounded-full px-2.5 py-1 border border-white/15">
                  <button
                    type="button"
                    aria-label="Decrease console quantity"
                    onClick={() => setConsoleQty((q) => Math.max(1, q - 1))}
                    className="text-white/80 hover:text-white"
                  >
                    <Minus className="w-3 h-3" />
                  </button>
                  <span className="text-xs font-mono font-bold tabular-nums w-4 text-center">
                    {consoleQty}
                  </span>
                  <button
                    type="button"
                    aria-label="Increase console quantity"
                    onClick={() => setConsoleQty((q) => Math.min(5, q + 1))}
                    className="text-white/80 hover:text-white"
                  >
                    <Plus className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>

            {/* Selected Accessories */}
            {selectedAccessoryIds.map((accId) => {
              const acc = ACCESSORIES.find((a) => a.id === accId);
              if (!acc) return null;
              return (
                <div
                  key={acc.id}
                  className="flex items-center justify-between gap-4 pt-3 border-t border-white/10 text-xs font-mono"
                >
                  <div>
                    <span className="text-white font-semibold">{acc.name}</span>
                    <span className="block text-[#CEC8C2]">{acc.code}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-white font-bold tabular-nums">${acc.price}</span>
                    <button
                      type="button"
                      onClick={() => toggleAccessory(acc.id)}
                      aria-label={`Remove ${acc.name}`}
                      className="text-[#CEC8C2] hover:text-[#F85E10]"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}

            {/* Added Physical Game Cartridges from #games Section */}
            {cartridgesInBag.map((cart) => (
              <div
                key={cart.id}
                className="flex items-center justify-between gap-4 pt-3 border-t border-white/10 text-xs font-mono"
              >
                <div>
                  <span className="text-white font-semibold">{cart.title}</span>
                  <span className="block text-[#F85E10]">Physical Cartridge · {cart.code}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-white font-bold tabular-nums">${cart.price}</span>
                  <button
                    type="button"
                    onClick={() => onRemoveCartridge(cart.id)}
                    aria-label={`Remove ${cart.title}`}
                    className="text-[#CEC8C2] hover:text-[#F85E10]"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Total Calculation */}
          <div className="py-5 border-b border-white/10 space-y-2 text-xs font-mono tabular-nums">
            <div className="flex justify-between text-[#CEC8C2]">
              <span>INSURED DHL EXPRESS SHIPPING</span>
              <span className="text-white font-bold">$0.00 (INCLUDED)</span>
            </div>
            <div className="flex justify-between items-baseline pt-2">
              <span className="text-sm text-white font-bold">TOTAL ALLOCATION</span>
              <span className="text-2xl sm:text-3xl font-bold text-[#F85E10]">
                ${orderTotal}.00 USD
              </span>
            </div>
          </div>

          {/* Confirmed Order State vs Interactive Checkout Form */}
          {confirmedOrder ? (
            <div className="mt-6 bg-white/10 rounded-2xl p-6 border border-[#F85E10] space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-[#F85E10]">
                  ORDER CONFIRMED
                </span>
                <span className="text-xs font-mono text-white tabular-nums font-bold">
                  #{confirmedOrder.orderNumber}
                </span>
              </div>
              <h4 className="font-headline font-semibold text-xl text-white">
                Thank you, {confirmedOrder.customerName}
              </h4>
              <p className="text-xs font-sans text-[#CEC8C2] leading-relaxed">
                Your PLAYBIT hardware allocation ({confirmedOrder.editionName} in{' '}
                {confirmedOrder.finishLabel}) is locked for dispatch. A serial number manifest has
                been sent to <span className="text-white font-mono">{confirmedOrder.customerEmail}</span>.
              </p>
              <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs font-mono tabular-nums">
                <span>AMOUNT AUTHORIZED</span>
                <span className="text-[#F85E10] font-bold">${confirmedOrder.total}.00 USD</span>
              </div>
              <button
                type="button"
                onClick={() => setConfirmedOrder(null)}
                className="w-full py-3 rounded-full bg-white/10 hover:bg-white/20 text-xs font-mono text-white transition-colors"
              >
                MODIFY OR PLACE ANOTHER ORDER
              </button>
            </div>
          ) : (
            <form onSubmit={handleCheckoutSubmit} className="mt-6 space-y-4" noValidate>
              <div>
                <label
                  htmlFor="playbit-name"
                  className="block text-[11px] font-mono text-[#CEC8C2] uppercase mb-1.5"
                >
                  Recipient Full Name
                </label>
                <input
                  id="playbit-name"
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Alex Mercer"
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/15 text-sm font-sans text-white placeholder:text-white/30 focus:outline-none focus:border-[#F85E10]"
                />
              </div>

              <div>
                <label
                  htmlFor="playbit-email"
                  className="block text-[11px] font-mono text-[#CEC8C2] uppercase mb-1.5"
                >
                  Dispatch & Serial Notification Email
                </label>
                <input
                  id="playbit-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="alex@studio.io"
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/15 text-sm font-sans text-white placeholder:text-white/30 focus:outline-none focus:border-[#F85E10]"
                />
              </div>

              <div>
                <label
                  htmlFor="playbit-city"
                  className="block text-[11px] font-mono text-[#CEC8C2] uppercase mb-1.5"
                >
                  Shipping Address & Postal Code
                </label>
                <input
                  id="playbit-city"
                  type="text"
                  value={shippingCity}
                  onChange={(e) => setShippingCity(e.target.value)}
                  placeholder="742 Evergreen Ave · Brooklyn, NY 11201"
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/15 text-sm font-sans text-white placeholder:text-white/30 focus:outline-none focus:border-[#F85E10]"
                />
              </div>

              {/* Payment Method Selector */}
              <div className="grid grid-cols-2 gap-2.5 pt-1">
                <button
                  type="button"
                  onClick={() => setPaymentMode('direct')}
                  className={`py-2.5 px-3 rounded-xl text-xs font-mono border transition-colors whitespace-nowrap shrink-0 ${
                    paymentMode === 'direct'
                      ? 'bg-white text-[#181615] border-white font-bold'
                      : 'bg-white/5 text-[#CEC8C2] border-white/15'
                  }`}
                >
                  Direct Reservation
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMode('cod')}
                  className={`py-2.5 px-3 rounded-xl text-xs font-mono border transition-colors whitespace-nowrap shrink-0 ${
                    paymentMode === 'cod'
                      ? 'bg-white text-[#181615] border-white font-bold'
                      : 'bg-white/5 text-[#CEC8C2] border-white/15'
                  }`}
                >
                  Courier Cash on Delivery
                </button>
              </div>

              {formError && (
                <div className="p-3 rounded-xl bg-[#F85E10]/20 border border-[#F85E10] text-xs font-mono text-[#F85E10]">
                  {formError}
                </div>
              )}

              <div className="pt-2">
                <Button type="submit" variant="primary" className="w-full justify-center">
                  RESERVE ALLOCATION · ${orderTotal} USD
                </Button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};
