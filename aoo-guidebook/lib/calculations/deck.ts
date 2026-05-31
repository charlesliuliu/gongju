export interface DeckInput {
  deckLength: number; // feet
  deckWidth: number; // feet
  joistSpacing: number; // inches (default 16)
  deckingBoardWidth: number; // inches (standard 5.5 for 1x6)
  pricePerSqFt?: number;
}

export interface DeckResult {
  totalArea: number; // sq ft
  deckingBoards: number; // number of deck boards
  numberOfJoists: number;
  numberOfBeams: number; // 2 beams (ends)
  numberOfPosts: number; // 4 corners + intermediate every 6ft
  postConcreteBags: number; // 60lb bags
  estimatedCost: number | null;
  inputs: DeckInput;
}

function round(num: number, decimals: number = 2): number {
  return Math.round(num * Math.pow(10, decimals)) / Math.pow(10, decimals);
}

export function calculateDeck(input: DeckInput): DeckResult {
  const totalArea = input.deckLength * input.deckWidth;
  const deckingBoardWidthFeet = input.deckingBoardWidth / 12;
  const deckingBoards = Math.ceil(input.deckWidth / deckingBoardWidthFeet);
  const joistSpacingFeet = input.joistSpacing / 12;
  const numberOfJoists = Math.ceil(input.deckLength / joistSpacingFeet) + 1;
  const numberOfBeams = 2; // ledger + outer beam
  const numberOfPosts = Math.ceil(input.deckLength / 6) * 2 + 2; // every 6ft on both sides + corners
  const postConcreteBags = numberOfPosts * 2;
  const estimatedCost = input.pricePerSqFt ? totalArea * input.pricePerSqFt : null;

  return {
    totalArea: round(totalArea, 2),
    deckingBoards,
    numberOfJoists,
    numberOfBeams,
    numberOfPosts,
    postConcreteBags,
    estimatedCost: estimatedCost ? round(estimatedCost) : null,
    inputs: { ...input },
  };
}

export function validateDeckInput(input: DeckInput): string[] {
  const errors: string[] = [];
  if (input.deckLength <= 0) errors.push('Deck length must be greater than 0');
  if (input.deckWidth <= 0) errors.push('Deck width must be greater than 0');
  if (input.joistSpacing <= 0) errors.push('Joist spacing must be greater than 0');
  if (input.deckingBoardWidth <= 0) errors.push('Decking board width must be greater than 0');
  if (input.pricePerSqFt !== undefined && input.pricePerSqFt < 0) errors.push('Price per sq ft cannot be negative');
  return errors;
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 2 }).format(amount);
}
