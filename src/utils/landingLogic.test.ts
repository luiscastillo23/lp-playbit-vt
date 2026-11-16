import test from 'node:test';
import assert from 'node:assert/strict';
import {
  GAME_CARTRIDGES,
  filterGameCartridges,
  calculateBatteryEstimate,
  calculateOrderBreakdown,
  validateReservationInput,
} from './landingLogic';

test('filterGameCartridges filters by category and search query accurately', () => {
  const all = filterGameCartridges(GAME_CARTRIDGES, 'all');
  assert.equal(all.length, 6);

  const racing = filterGameCartridges(GAME_CARTRIDGES, 'racing');
  assert.equal(racing.length, 2);
  assert.ok(racing.every((g) => g.category === 'racing'));

  const searched = filterGameCartridges(GAME_CARTRIDGES, 'all', 'stardust');
  assert.equal(searched.length, 1);
  assert.equal(searched[0].id, 'stardust-risen');
});

test('calculateBatteryEstimate computes realistic runtime hours across workloads', () => {
  const eco = calculateBatteryEstimate({
    brightnessPercent: 40,
    audioOutput: 'headphones',
    shaderMode: '8bit-native',
  });
  const heavy = calculateBatteryEstimate({
    brightnessPercent: 100,
    audioOutput: 'speaker',
    shaderMode: '16bit-overclock',
  });

  assert.ok(eco.runtimeHours > heavy.runtimeHours);
  assert.ok(eco.runtimeHours >= 10);
  assert.ok(heavy.runtimeHours >= 6);
  assert.equal(eco.fastChargeMinutesTo80, 38);
});

test('calculateOrderBreakdown totals edition, accessories, and free shipping threshold', () => {
  // Standard ($199) + no accessories = $199 + $12 shipping = $211
  const standardOnly = calculateOrderBreakdown('standard', []);
  assert.equal(standardOnly.editionPrice, 199);
  assert.equal(standardOnly.accessoriesPrice, 0);
  assert.equal(standardOnly.shippingPrice, 12);
  assert.equal(standardOnly.totalPrice, 211);

  // Founders ($289) + field-case ($39) = $328 + $0 free shipping = $328
  const foundersWithCase = calculateOrderBreakdown('founders', ['field-case']);
  assert.equal(foundersWithCase.editionPrice, 289);
  assert.equal(foundersWithCase.accessoriesPrice, 39);
  assert.equal(foundersWithCase.shippingPrice, 0);
  assert.equal(foundersWithCase.totalPrice, 328);
});

test('validateReservationInput rejects invalid name or email and accepts valid input', () => {
  const invalid = validateReservationInput({
    fullName: 'A',
    email: 'invalid-email',
    inquiryType: 'preorder',
    editionId: 'standard',
    finishId: 'signal-orange',
    accessoryIds: [],
  });
  assert.equal(invalid.valid, false);
  assert.ok(invalid.errors.fullName);
  assert.ok(invalid.errors.email);

  const valid = validateReservationInput({
    fullName: 'Elena Vance',
    email: 'elena@playbit.studio',
    inquiryType: 'preorder',
    editionId: 'founders',
    finishId: 'signal-orange',
    accessoryIds: ['magnetic-dock'],
  });
  assert.equal(valid.valid, true);
  assert.deepEqual(valid.errors, {});
});
