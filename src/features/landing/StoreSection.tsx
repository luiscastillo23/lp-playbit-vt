import React, { useState } from 'react';
import {
  HARDWARE_FINISHES,
  HardwareFinish,
  STORE_ACCESSORIES,
  STORE_EDITIONS,
  StoreEdition,
  calculateOrderBreakdown,
  validateReservationInput,
} from '../../utils/landingLogic';

interface StoreSectionProps {
  selectedFinishId: HardwareFinish['id'];
  onSelectFinish: (finishId: HardwareFinish['id']) => void;
  initialMode?: 'preorder' | 'studio-contact';
}

export const StoreSection: React.FC<StoreSectionProps> = ({
  selectedFinishId,
  onSelectFinish,
  initialMode = 'preorder',
}) => {
  const [selectedEditionId, setSelectedEditionId] =
    useState<StoreEdition['id']>('founders');
  const [selectedAccessories, setSelectedAccessories] = useState<string[]>([
    'field-case',
  ]);
  const [inquiryType, setInquiryType] = useState<'preorder' | 'studio-contact'>(
    initialMode
  );
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [notes, setNotes] = useState('');
  const [formErrors, setFormErrors] = useState<{
    fullName?: string;
    email?: string;
  }>({});
  const [submittedReservation, setSubmittedReservation] = useState<{
    referenceCode: string;
    fullName: string;
    email: string;
    editionName: string;
    finishName: string;
    totalPrice: number;
    inquiryType: 'preorder' | 'studio-contact';
  } | null>(null);

  const activeEdition =
    STORE_EDITIONS.find((e) => e.id === selectedEditionId) ?? STORE_EDITIONS[0];
  const activeFinish =
    HARDWARE_FINISHES.find((f) => f.id === selectedFinishId) ??
    HARDWARE_FINISHES[0];

  const breakdown = calculateOrderBreakdown(
    selectedEditionId,
    selectedAccessories
  );

  const toggleAccessory = (id: string) => {
    setSelectedAccessories((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validation = validateReservationInput({
      fullName,
      email,
      inquiryType,
      editionId: selectedEditionId,
      finishId: selectedFinishId,
      accessoryIds: selectedAccessories,
      notes,
    });

    if (!validation.valid) {
      setFormErrors(validation.errors);
      return;
    }

    setFormErrors({});
    const deterministicSuffix =
      (fullName.trim().length * 137 + breakdown.totalPrice) % 9000 + 1000;
    setSubmittedReservation({
      referenceCode: `PB-2026-${deterministicSuffix}`,
      fullName: fullName.trim(),
      email: email.trim(),
      editionName: activeEdition.name,
      finishName: activeFinish.name,
      totalPrice: breakdown.totalPrice,
      inquiryType,
    });
  };

  return (
    <section
      id="store"
      aria-labelledby="store-heading"
      className="relative w-full max-w-[1600px] mx-auto px-6 sm:px-10 py-20 lg:py-28 border-t border-[#181615]/10"
    >
      {/* Section Header */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-14 lg:mb-20">
        <div className="lg:col-span-7">
          <div className="flex items-center gap-3 text-xs sm:text-sm font-mono font-bold text-[#F85E10] tracking-widest mb-3">
            <span>/ 04</span>
            <span aria-hidden="true">·</span>
            <span>STORE & BATCH ALLOCATION</span>
          </div>
          <h2
            id="store-heading"
            className="font-headline font-semibold text-3xl sm:text-5xl text-[#181615] tracking-tight leading-[1.06] uppercase"
          >
            CONFIGURE YOUR PLAYBIT ALLOCATION
          </h2>
        </div>
        <div className="lg:col-span-5 flex flex-col lg:items-end justify-end">
          <p className="text-sm sm:text-base text-[#4A4643] font-sans leading-relaxed max-w-md">
            Direct-from-studio hardware reservations with serialized batch
            tracking, 2-year modular repair warranty, and complimentary shipping
            on orders over $250.
          </p>
        </div>
      </div>

      {/* 3-Column Edition Selector */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
        {STORE_EDITIONS.map((edition) => {
          const isSelected = edition.id === selectedEditionId;
          return (
            <article
              key={edition.id}
              className={`rounded-[26px] p-6 sm:p-8 transition-all duration-150 flex flex-col justify-between border text-left ${
                isSelected
                  ? 'bg-[#181615] text-[#FBF8F3] border-[#181615] shadow-[0_20px_40px_-15px_rgba(24,22,21,0.35)]'
                  : 'bg-[#FBF8F3] text-[#181615] border-[#181615]/10 hover:border-[#F85E10]'
              }`}
            >
              <div>
                <div className="flex items-center justify-between gap-2 text-xs font-mono">
                  <span
                    className={
                      isSelected ? 'text-[#F85E10] font-bold' : 'text-[#4A4643]'
                    }
                  >
                    {edition.index} · {edition.batchAllocation}
                  </span>
                  <span className="tabular-nums font-bold">
                    {edition.shippingWindow}
                  </span>
                </div>

                <div className="flex items-baseline justify-between gap-4 mt-4">
                  <h3 className="font-headline font-semibold text-2xl sm:text-3xl tracking-tight">
                    {edition.name}
                  </h3>
                  <span className="font-display font-bold text-2xl sm:text-3xl text-[#F85E10] tabular-nums shrink-0">
                    ${edition.priceUsd}
                  </span>
                </div>

                <p
                  className={`text-xs sm:text-sm font-sans mt-2 ${
                    isSelected ? 'text-[#CEC8C2]' : 'text-[#4A4643]'
                  }`}
                >
                  {edition.tagline}
                </p>

                <ul className="mt-6 pt-5 border-t border-current/10 space-y-2.5 text-xs sm:text-sm font-sans">
                  {edition.includedItems.map((item) => (
                    <li key={item} className="flex items-start gap-2.5">
                      <span
                        aria-hidden="true"
                        className="text-[#F85E10] font-mono font-bold"
                      >
                        +
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-8 pt-4 border-t border-current/10 flex items-center justify-between">
                <span className="font-mono text-xs uppercase tracking-wider">
                  {isSelected ? 'Selected Allocation' : 'Batch 01 Available'}
                </span>
                <button
                  type="button"
                  onClick={() => setSelectedEditionId(edition.id)}
                  aria-pressed={isSelected}
                  aria-label={`Select ${edition.name}`}
                  className={`px-4 py-2 rounded-full font-mono text-xs font-bold transition-colors whitespace-nowrap shrink-0 ${
                    isSelected
                      ? 'bg-[#F85E10] text-white'
                      : 'bg-[#E3DFDC] text-[#181615] hover:bg-[#F85E10] hover:text-white'
                  }`}
                >
                  {isSelected ? 'Active Edition' : `Select · $${edition.priceUsd}`}
                </button>
              </div>
            </article>
          );
        })}
      </div>

      {/* Configurator Split: Accessories + Reservation / Contact Form */}
      <div
        id="contact"
        className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
      >
        {/* Left Span-6: Finish & Modular Accessories */}
        <div className="lg:col-span-6 rounded-[28px] bg-[#E3DFDC]/80 border border-[#181615]/10 p-6 sm:p-8 space-y-8">
          {/* Step 1: Finish Selection */}
          <div>
            <div className="text-xs font-mono font-bold text-[#F85E10] tracking-widest">
              STEP 01 · SHELL COLORWAY
            </div>
            <h3 className="font-headline font-semibold text-xl sm:text-2xl text-[#181615] mt-1">
              Select Chassis Finish
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-4">
              {HARDWARE_FINISHES.map((finish) => {
                const isSelected = finish.id === selectedFinishId;
                return (
                  <button
                    key={finish.id}
                    type="button"
                    onClick={() => onSelectFinish(finish.id)}
                    aria-pressed={isSelected}
                    className={`h-full flex flex-col justify-between p-3.5 rounded-2xl border text-left transition-all ${
                      isSelected
                        ? 'bg-[#181615] text-white border-[#181615]'
                        : 'bg-[#FBF8F3] text-[#181615] border-[#181615]/10 hover:border-[#F85E10]'
                    }`}
                  >
                    <div className="w-full flex items-center justify-between">
                      <span
                        className="w-5 h-5 rounded-md border border-black/20"
                        style={{ backgroundColor: finish.backHex }}
                      />
                      <span className="font-mono text-[11px] opacity-75 whitespace-nowrap">
                        {finish.code}
                      </span>
                    </div>
                    <div className="font-headline font-semibold text-sm mt-2.5">
                      {finish.name}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 2: Optional Accessories */}
          <div className="pt-6 border-t border-[#181615]/10">
            <div className="text-xs font-mono font-bold text-[#F85E10] tracking-widest">
              STEP 02 · MODULAR ACCESSORIES
            </div>
            <h3 className="font-headline font-semibold text-xl sm:text-2xl text-[#181615] mt-1">
              Add Studio Peripherals
            </h3>

            <div className="space-y-3 mt-4">
              {STORE_ACCESSORIES.map((acc) => {
                const isChecked = selectedAccessories.includes(acc.id);
                return (
                  <button
                    key={acc.id}
                    type="button"
                    onClick={() => toggleAccessory(acc.id)}
                    aria-pressed={isChecked}
                    aria-label={`Toggle ${acc.name}`}
                    className={`w-full p-4 rounded-2xl border transition-colors text-left flex items-center justify-between gap-4 ${
                      isChecked
                        ? 'bg-[#FBF8F3] border-[#F85E10]'
                        : 'bg-[#FBF8F3]/60 border-[#181615]/10 hover:bg-[#FBF8F3]'
                    }`}
                  >
                    <div>
                      <div className="font-headline font-semibold text-base text-[#181615]">
                        {acc.name}
                      </div>
                      <div className="text-xs text-[#4A4643] font-sans mt-0.5">
                        {acc.specSummary}
                      </div>
                    </div>
                    <div className="flex items-center gap-3 shrink-0">
                      <span className="font-mono font-bold text-sm text-[#181615] tabular-nums">
                        +${acc.priceUsd}
                      </span>
                      <span
                        className={`px-3 py-1 rounded-lg font-mono text-xs font-bold whitespace-nowrap ${
                          isChecked
                            ? 'bg-[#F85E10] text-white'
                            : 'bg-[#E3DFDC] text-[#181615]'
                        }`}
                      >
                        {isChecked ? 'Added' : 'Add'}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Live Itemized Summary */}
          <div className="pt-6 border-t border-[#181615]/10 font-mono text-xs sm:text-sm space-y-2.5">
            <div className="flex justify-between text-[#4A4643]">
              <span>
                {activeEdition.name} ({activeFinish.code})
              </span>
              <span className="tabular-nums font-bold text-[#181615]">
                ${breakdown.editionPrice}
              </span>
            </div>
            <div className="flex justify-between text-[#4A4643]">
              <span>
                Modular Accessories ({selectedAccessories.length} selected)
              </span>
              <span className="tabular-nums font-bold text-[#181615]">
                ${breakdown.accessoriesPrice}
              </span>
            </div>
            <div className="flex justify-between text-[#4A4643]">
              <span>Tracked Studio Courier</span>
              <span className="tabular-nums font-bold text-[#181615]">
                {breakdown.shippingPrice === 0
                  ? 'COMPLIMENTARY'
                  : `$${breakdown.shippingPrice}`}
              </span>
            </div>
            <div className="pt-3 border-t border-[#181615]/15 flex items-baseline justify-between text-base sm:text-lg font-bold text-[#181615]">
              <span>ESTIMATED TOTAL</span>
              <span
                data-testid="store-total-price"
                className="font-display text-2xl text-[#F85E10] tabular-nums"
              >
                ${breakdown.totalPrice} USD
              </span>
            </div>
          </div>
        </div>

        {/* Right Span-6: Direct Reservation & Studio Contact Form */}
        <div className="lg:col-span-6 rounded-[28px] bg-[#FBF8F3] border border-[#181615]/10 p-6 sm:p-10">
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-[#181615]/10">
            <div>
              <div className="text-xs font-mono font-bold text-[#F85E10] tracking-widest">
                DIRECT STUDIO DISPATCH
              </div>
              <h3 className="font-headline font-semibold text-2xl sm:text-3xl text-[#181615] mt-1">
                {inquiryType === 'preorder'
                  ? 'Reserve Batch Allocation'
                  : 'Contact Hardware Team'}
              </h3>
            </div>

            {/* Mode Switcher supporting both GET ACCESS and CONTACT US */}
            <div
              role="group"
              aria-label="Inquiry Mode"
              className="inline-flex bg-[#E3DFDC] p-1 rounded-xl"
            >
              <button
                type="button"
                onClick={() => setInquiryType('preorder')}
                aria-pressed={inquiryType === 'preorder'}
                className={`px-3.5 py-2 rounded-lg text-xs font-mono transition-colors whitespace-nowrap shrink-0 ${
                  inquiryType === 'preorder'
                    ? 'bg-[#181615] text-white font-bold'
                    : 'text-[#181615]'
                }`}
              >
                Get Access
              </button>
              <button
                type="button"
                onClick={() => setInquiryType('studio-contact')}
                aria-pressed={inquiryType === 'studio-contact'}
                className={`px-3.5 py-2 rounded-lg text-xs font-mono transition-colors whitespace-nowrap shrink-0 ${
                  inquiryType === 'studio-contact'
                    ? 'bg-[#181615] text-white font-bold'
                    : 'text-[#181615]'
                }`}
              >
                Contact Us
              </button>
            </div>
          </div>

          {submittedReservation ? (
            <div
              data-testid="reservation-confirmation"
              className="mt-8 rounded-2xl bg-[#181615] text-[#FBF8F3] p-6 sm:p-8 space-y-5"
            >
              <div className="flex items-center justify-between text-xs font-mono text-[#F85E10]">
                <span>ALLOCATION CONFIRMED</span>
                <span className="tabular-nums font-bold">
                  REF · {submittedReservation.referenceCode}
                </span>
              </div>
              <h4 className="font-headline font-semibold text-2xl text-white">
                Thank you, {submittedReservation.fullName}.
              </h4>
              <p className="text-xs sm:text-sm text-[#CEC8C2] font-sans leading-relaxed">
                {submittedReservation.inquiryType === 'preorder'
                  ? `Your Batch 01 allocation for the ${submittedReservation.editionName} in ${submittedReservation.finishName} ($${submittedReservation.totalPrice} USD) has been registered. Dispatch credentials were sent to ${submittedReservation.email}.`
                  : `Your inquiry regarding ${submittedReservation.editionName} has been routed to our industrial engineering desk. We will respond to ${submittedReservation.email} within 1 business day.`}
              </p>
              <button
                type="button"
                onClick={() => setSubmittedReservation(null)}
                className="px-6 py-3 rounded-full bg-[#F85E10] text-white font-display font-bold text-xs tracking-wider uppercase whitespace-nowrap"
              >
                Modify Configuration
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="mt-6 space-y-5">
              <div>
                <label
                  htmlFor="reservation-name"
                  className="block text-xs font-mono font-bold text-[#181615] uppercase tracking-wider mb-2"
                >
                  Full Name
                </label>
                <input
                  id="reservation-name"
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Elena Vance"
                  className="w-full px-4 py-3.5 rounded-xl bg-[#E3DFDC]/60 border border-[#181615]/15 text-sm font-sans text-[#181615] placeholder:text-[#4A4643]/60 focus:outline-none focus:border-[#F85E10]"
                />
                {formErrors.fullName && (
                  <p
                    role="alert"
                    className="text-xs font-mono text-[#C84304] mt-1.5"
                  >
                    {formErrors.fullName}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="reservation-email"
                  className="block text-xs font-mono font-bold text-[#181615] uppercase tracking-wider mb-2"
                >
                  Dispatch Email Address
                </label>
                <input
                  id="reservation-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="elena@studio.io"
                  className="w-full px-4 py-3.5 rounded-xl bg-[#E3DFDC]/60 border border-[#181615]/15 text-sm font-sans text-[#181615] placeholder:text-[#4A4643]/60 focus:outline-none focus:border-[#F85E10]"
                />
                {formErrors.email && (
                  <p
                    role="alert"
                    className="text-xs font-mono text-[#C84304] mt-1.5"
                  >
                    {formErrors.email}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="reservation-notes"
                  className="block text-xs font-mono font-bold text-[#181615] uppercase tracking-wider mb-2"
                >
                  {inquiryType === 'preorder'
                    ? 'Custom Engraving / Delivery Notes (Optional)'
                    : 'Project / OEM Partnership Inquiry'}
                </label>
                <textarea
                  id="reservation-notes"
                  rows={3}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder={
                    inquiryType === 'preorder'
                      ? 'Optional 12-character laser backplate callsign...'
                      : 'Tell our hardware team about your studio, SDK question, or retail distribution inquiry...'
                  }
                  className="w-full px-4 py-3 rounded-xl bg-[#E3DFDC]/60 border border-[#181615]/15 text-sm font-sans text-[#181615] placeholder:text-[#4A4643]/60 focus:outline-none focus:border-[#F85E10]"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full font-display font-bold text-xs tracking-[0.18em] uppercase px-8 py-4 sm:py-5 rounded-full bg-[#F85E10] text-white shadow-[0_12px_24px_-6px_rgba(248,94,16,0.5)] hover:bg-[#e04f06] transition-all whitespace-nowrap"
                >
                  {inquiryType === 'preorder'
                    ? `Reserve Allocation · $${breakdown.totalPrice} USD`
                    : 'Send Studio Dispatch'}
                </button>
              </div>

              <p className="text-xs font-mono text-[#4A4643] text-center">
                No immediate charge until Batch 01 leaves assembly · Cancel
                anytime
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};
