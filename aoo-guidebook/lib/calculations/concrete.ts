const CUBIC_FEET_PER_CUBIC_YARD = 27;
const CUBIC_FEET_PER_60LB_BAG = 0.45;
const CUBIC_FEET_PER_80LB_BAG = 0.60;

export interface ConcreteInput {
  calculationType: 'slab' | 'footing' | 'column' | 'wall';
  length?: number;
  width?: number;
  thickness?: number;
  height?: number;
  diameter?: number;
  pricePerCubicYard?: number;
}

export interface ConcreteResult {
  volumeCubicYards: number;
  volumeCubicFeet: number;
  bags60lb: number;
  bags80lb: number;
  estimatedCost: number | null;
  inputs: ConcreteInput;
}

export function calculateConcrete(input: ConcreteInput): ConcreteResult {
  let volumeCubicFeet = 0;

  switch (input.calculationType) {
    case 'slab':
      if (input.length && input.width && input.thickness) {
        volumeCubicFeet = input.length * input.width * (input.thickness / 12);
      }
      break;

    case 'footing':
      if (input.length && input.width && input.height) {
        volumeCubicFeet = input.length * input.width * input.height;
      }
      break;

    case 'column':
      if (input.diameter && input.height) {
        const radius = input.diameter / 2;
        volumeCubicFeet = Math.PI * radius * radius * input.height;
      }
      break;

    case 'wall':
      if (input.length && input.height && input.thickness) {
        volumeCubicFeet = input.length * input.height * input.thickness;
      }
      break;
  }

  const volumeCubicYards = volumeCubicFeet / CUBIC_FEET_PER_CUBIC_YARD;
  const bags60lb = Math.ceil(volumeCubicFeet / CUBIC_FEET_PER_60LB_BAG);
  const bags80lb = Math.ceil(volumeCubicFeet / CUBIC_FEET_PER_80LB_BAG);

  let estimatedCost: number | null = null;
  if (input.pricePerCubicYard && input.pricePerCubicYard > 0) {
    estimatedCost = volumeCubicYards * input.pricePerCubicYard;
  }

  return {
    volumeCubicYards: roundToTwoDecimals(volumeCubicYards),
    volumeCubicFeet: roundToTwoDecimals(volumeCubicFeet),
    bags60lb,
    bags80lb,
    estimatedCost: estimatedCost !== null ? roundToTwoDecimals(estimatedCost) : null,
    inputs: input,
  };
}

function roundToTwoDecimals(num: number): number {
  return Math.round(num * 100) / 100;
}

export function formatNumber(num: number): string {
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

export function validateInput(input: ConcreteInput): string[] {
  const errors: string[] = [];

  switch (input.calculationType) {
    case 'slab':
      if (!input.length || input.length <= 0) errors.push('Length must be greater than 0');
      if (!input.width || input.width <= 0) errors.push('Width must be greater than 0');
      if (!input.thickness || input.thickness <= 0) errors.push('Thickness must be greater than 0');
      break;

    case 'footing':
      if (!input.length || input.length <= 0) errors.push('Length must be greater than 0');
      if (!input.width || input.width <= 0) errors.push('Width must be greater than 0');
      if (!input.height || input.height <= 0) errors.push('Height must be greater than 0');
      break;

    case 'column':
      if (!input.diameter || input.diameter <= 0) errors.push('Diameter must be greater than 0');
      if (!input.height || input.height <= 0) errors.push('Height must be greater than 0');
      break;

    case 'wall':
      if (!input.length || input.length <= 0) errors.push('Length must be greater than 0');
      if (!input.height || input.height <= 0) errors.push('Height must be greater than 0');
      if (!input.thickness || input.thickness <= 0) errors.push('Thickness must be greater than 0');
      break;
  }

  return errors;
}
