export interface FenceInput {
  fenceLength: number; // total fence length in feet
  postSpacing: number; // feet between posts (default 8)
  fenceHeight: number; // feet
  picketWidth: number; // inches (default 5.5 for standard 1x6)
  picketSpacing: number; // inches between pickets (default 1)
  numberOfGates: number;
  pricePerFoot?: number;
}

export interface FenceResult {
  numberOfPosts: number;
  numberOfRails: number; // 3 rails per section typically
  numberOfPickets: number;
  postConcreteBags: number; // 60lb bags
  totalCost: number | null;
  inputs: FenceInput;
}

function round(num: number, decimals: number = 2): number {
  return Math.round(num * Math.pow(10, decimals)) / Math.pow(10, decimals);
}

export function calculateFence(input: FenceInput): FenceResult {
  const sections = Math.ceil(input.fenceLength / input.postSpacing);
  const numberOfPosts = sections + 1 + input.numberOfGates * 2; // extra posts for gates
  const numberOfRails = sections * 3; // 3 rails per section
  const picketWidthFeet = input.picketWidth / 12;
  const picketSpacingFeet = input.picketSpacing / 12;
  const picketsPerSection = Math.ceil(input.postSpacing / (picketWidthFeet + picketSpacingFeet));
  const numberOfPickets = picketsPerSection * sections;
  const postConcreteBags = numberOfPosts * 2; // 2 bags per post (standard estimate)
  const totalCost = input.pricePerFoot ? input.fenceLength * input.pricePerFoot : null;

  return {
    numberOfPosts,
    numberOfRails,
    numberOfPickets,
    postConcreteBags,
    totalCost: totalCost ? round(totalCost) : null,
    inputs: { ...input },
  };
}

export function validateFenceInput(input: FenceInput): string[] {
  const errors: string[] = [];
  if (input.fenceLength <= 0) errors.push('Fence length must be greater than 0');
  if (input.postSpacing <= 0) errors.push('Post spacing must be greater than 0');
  if (input.fenceHeight <= 0) errors.push('Fence height must be greater than 0');
  if (input.picketWidth <= 0) errors.push('Picket width must be greater than 0');
  if (input.pricePerFoot !== undefined && input.pricePerFoot < 0) errors.push('Price cannot be negative');
  return errors;
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 2 }).format(amount);
}
