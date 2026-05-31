export interface DrywallInput {
  roomLength: number; // feet
  roomWidth: number; // feet
  ceilingHeight: number; // feet (default 8)
  numberOfDoors: number;
  numberOfWindows: number;
  sheetSize: '4x8' | '4x10' | '4x12'; // standard sheet sizes
  pricePerSheet?: number;
}

export interface DrywallResult {
  totalWallArea: number; // sq ft
  ceilingArea: number; // sq ft
  totalArea: number; // sq ft
  sheetsNeeded: number;
  jointCompoundGallons: number;
  jointTapeFeet: number;
  screwsCount: number;
  estimatedCost: number | null;
  inputs: DrywallInput;
}

function round(num: number, decimals: number = 2): number {
  return Math.round(num * Math.pow(10, decimals)) / Math.pow(10, decimals);
}

const SHEET_SIZES: Record<string, number> = {
  '4x8': 32,
  '4x10': 40,
  '4x12': 48,
};

export function calculateDrywall(input: DrywallInput): DrywallResult {
  const perimeter = 2 * (input.roomLength + input.roomWidth);
  const wallArea = perimeter * input.ceilingHeight;
  const doorArea = input.numberOfDoors * 21; // standard door ~21 sq ft
  const windowArea = input.numberOfWindows * 15; // standard window ~15 sq ft
  const totalWallArea = Math.max(0, wallArea - doorArea - windowArea);
  const ceilingArea = input.roomLength * input.roomWidth;
  const totalArea = totalWallArea + ceilingArea;
  const sheetArea = SHEET_SIZES[input.sheetSize];
  const sheetsNeeded = Math.ceil(totalArea / sheetArea);
  const jointCompoundGallons = round(sheetsNeeded * 0.5); // ~0.5 gal per sheet
  const jointTapeFeet = Math.ceil(sheetsNeeded * 40); // ~40ft per sheet
  const screwsCount = Math.ceil(sheetsNeeded * 32); // ~32 screws per sheet
  const estimatedCost = input.pricePerSheet ? sheetsNeeded * input.pricePerSheet : null;

  return {
    totalWallArea: round(totalWallArea),
    ceilingArea: round(ceilingArea),
    totalArea: round(totalArea),
    sheetsNeeded,
    jointCompoundGallons,
    jointTapeFeet,
    screwsCount,
    estimatedCost: estimatedCost ? round(estimatedCost) : null,
    inputs: { ...input },
  };
}

export function validateDrywallInput(input: DrywallInput): string[] {
  const errors: string[] = [];
  if (input.roomLength <= 0) errors.push('Room length must be greater than 0');
  if (input.roomWidth <= 0) errors.push('Room width must be greater than 0');
  if (input.ceilingHeight <= 0) errors.push('Ceiling height must be greater than 0');
  if (input.pricePerSheet !== undefined && input.pricePerSheet < 0) errors.push('Price per sheet cannot be negative');
  return errors;
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 2 }).format(amount);
}
