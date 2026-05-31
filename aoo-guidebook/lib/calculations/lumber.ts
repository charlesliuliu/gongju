export interface LumberInput {
  length: number; // feet
  width: number; // inches
  thickness: number; // inches
  quantity: number;
  pricePerBoardFoot?: number;
}

export interface LumberResult {
  boardFeetPerPiece: number;
  totalBoardFeet: number;
  linearFeet: number;
  estimatedCost: number | null;
  inputs: LumberInput;
}

function round(num: number, decimals: number = 2): number {
  return Math.round(num * Math.pow(10, decimals)) / Math.pow(10, decimals);
}

export function calculateLumber(input: LumberInput): LumberResult {
  // Board feet formula: (thickness * width * length) / 12
  const boardFeetPerPiece = (input.thickness * input.width * input.length) / 12;
  const totalBoardFeet = boardFeetPerPiece * input.quantity;
  const linearFeet = input.length * input.quantity;
  const estimatedCost = input.pricePerBoardFoot ? totalBoardFeet * input.pricePerBoardFoot : null;

  return {
    boardFeetPerPiece: round(boardFeetPerPiece),
    totalBoardFeet: round(totalBoardFeet),
    linearFeet: round(linearFeet),
    estimatedCost: estimatedCost ? round(estimatedCost) : null,
    inputs: { ...input },
  };
}

export function validateLumberInput(input: LumberInput): string[] {
  const errors: string[] = [];
  if (input.length <= 0) errors.push('Length must be greater than 0');
  if (input.width <= 0) errors.push('Width must be greater than 0');
  if (input.thickness <= 0) errors.push('Thickness must be greater than 0');
  if (input.quantity <= 0) errors.push('Quantity must be at least 1');
  if (input.pricePerBoardFoot !== undefined && input.pricePerBoardFoot < 0) errors.push('Price cannot be negative');
  return errors;
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 2 }).format(amount);
}
