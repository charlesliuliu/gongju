export interface FlooringInput {
  length: number;
  width: number;
  wasteFactor: number;        // percentage (default 10)
  coveragePerBox: number;     // sq ft per box
  pricePerBox?: number;
}

export interface FlooringResult {
  totalArea: number;          // sq ft
  wasteAmount: number;        // sq ft
  areaWithWaste: number;      // sq ft
  boxesNeeded: number;
  estimatedCost: number | null;
  inputs: FlooringInput;
}

export function calculateFlooring(input: FlooringInput): FlooringResult {
  const totalArea = input.length * input.width;
  const wasteAmount = totalArea * (input.wasteFactor / 100);
  const areaWithWaste = totalArea + wasteAmount;
  const boxesNeeded = Math.ceil(areaWithWaste / input.coveragePerBox);

  let estimatedCost: number | null = null;
  if (input.pricePerBox && input.pricePerBox > 0) {
    estimatedCost = round(boxesNeeded * input.pricePerBox, 2);
  }

  return {
    totalArea: round(totalArea, 2),
    wasteAmount: round(wasteAmount, 2),
    areaWithWaste: round(areaWithWaste, 2),
    boxesNeeded,
    estimatedCost,
    inputs: input,
  };
}

export function formatArea(num: number): string {
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

export function validateFlooringInput(input: FlooringInput): string[] {
  const errors: string[] = [];
  if (!input.length || input.length <= 0) errors.push('Length must be greater than 0');
  if (input.length > 100) errors.push('Length seems too high (max 100 ft)');
  if (!input.width || input.width <= 0) errors.push('Width must be greater than 0');
  if (input.width > 100) errors.push('Width seems too high (max 100 ft)');
  if (!input.wasteFactor || input.wasteFactor < 0) errors.push('Waste factor must be 0 or greater');
  if (input.wasteFactor > 50) errors.push('Waste factor seems too high (max 50%)');
  if (!input.coveragePerBox || input.coveragePerBox <= 0) errors.push('Coverage per box must be greater than 0');
  if (input.coveragePerBox > 100) errors.push('Coverage per box seems too high (max 100 sq ft)');
  return errors;
}
