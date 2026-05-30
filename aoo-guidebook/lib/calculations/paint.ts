export interface PaintInput {
  length: number;
  width: number;
  height: number;
  windows: number;
  doors: number;
  coats: number;
  coveragePerGallon: number;
  pricePerGallon?: number;
}

export interface PaintResult {
  wallArea: number;
  windowArea: number;
  doorArea: number;
  netArea: number;
  gallonsNeeded: number;
  estimatedCost: number | null;
  inputs: PaintInput;
}

const WINDOW_AREA = 15;
const DOOR_AREA = 20;

export function calculatePaint(input: PaintInput): PaintResult {
  const wallArea = 2 * (input.length + input.width) * input.height;
  const windowArea = input.windows * WINDOW_AREA;
  const doorArea = input.doors * DOOR_AREA;
  const netArea = wallArea - windowArea - doorArea;
  const gallonsNeeded = Math.ceil((netArea * input.coats) / input.coveragePerGallon);

  let estimatedCost: number | null = null;
  if (input.pricePerGallon && input.pricePerGallon > 0) {
    estimatedCost = round(gallonsNeeded * input.pricePerGallon, 2);
  }

  return {
    wallArea: round(wallArea, 2),
    windowArea,
    doorArea,
    netArea: round(netArea, 2),
    gallonsNeeded,
    estimatedCost,
    inputs: input,
  };
}

export function formatPaintArea(num: number): string {
  return num.toLocaleString('en-US', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  });
}

export function formatCurrency(num: number): string {
  return num.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
  });
}

function round(num: number, decimals: number): number {
  const factor = Math.pow(10, decimals);
  return Math.round(num * factor) / factor;
}

export function validatePaintInput(input: PaintInput): string[] {
  const errors: string[] = [];
  if (!input.length || input.length <= 0) errors.push('Length must be greater than 0');
  if (input.length > 100) errors.push('Length seems too high (max 100 ft)');
  if (!input.width || input.width <= 0) errors.push('Width must be greater than 0');
  if (input.width > 100) errors.push('Width seems too high (max 100 ft)');
  if (!input.height || input.height <= 0) errors.push('Height must be greater than 0');
  if (input.height > 20) errors.push('Height seems too high (max 20 ft)');
  if (input.windows < 0) errors.push('Windows cannot be negative');
  if (input.windows > 20) errors.push('Windows seems too high (max 20)');
  if (input.doors < 0) errors.push('Doors cannot be negative');
  if (input.doors > 10) errors.push('Doors seems too high (max 10)');
  if (!input.coats || input.coats <= 0) errors.push('Coats must be at least 1');
  if (input.coats > 5) errors.push('Coats seems too high (max 5)');
  if (!input.coveragePerGallon || input.coveragePerGallon <= 0) errors.push('Coverage must be greater than 0');
  if (input.coveragePerGallon > 600) errors.push('Coverage seems too high (max 600 sq ft)');
  return errors;
}
