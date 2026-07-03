/** Shared tool definitions — single source of truth for all tool metadata. */
export const ALL_TOOLS = [
  { slug: 'concrete-calculator', icon: '🏗️', titleKey: 'concreteTitle', descKey: 'concreteDesc' },
  { slug: 'roof-pitch-calculator', icon: '🏠', titleKey: 'roofingTitle', descKey: 'roofingDesc' },
  { slug: 'flooring-calculator', icon: '🪵', titleKey: 'flooringTitle', descKey: 'flooringDesc' },
  { slug: 'paint-calculator', icon: '🎨', titleKey: 'paintTitle', descKey: 'paintDesc' },
  { slug: 'lumber-calculator', icon: '🪵', titleKey: 'lumberTitle', descKey: 'lumberDesc' },
  { slug: 'deck-calculator', icon: '🪵', titleKey: 'deckTitle', descKey: 'deckDesc' },
  { slug: 'drywall-calculator', icon: '🧱', titleKey: 'drywallTitle', descKey: 'drywallDesc' },
  { slug: 'fence-calculator', icon: '🏡', titleKey: 'fenceTitle', descKey: 'fenceDesc' },
] as const;

export type ToolDef = (typeof ALL_TOOLS)[number];

/** Get all tools except the one with the given slug. */
export function getOtherTools(slug: string): readonly ToolDef[] {
  return ALL_TOOLS.filter((t) => t.slug !== slug);
}

/** Scene-based groupings for CTA sections. */
export const TOOL_GROUPS = [
  {
    key: 'foundation',
    tools: ['concrete-calculator'],
    icon: '🏗️',
  },
  {
    key: 'outdoor',
    tools: ['roof-pitch-calculator', 'fence-calculator', 'deck-calculator'],
    icon: '🏠',
  },
  {
    key: 'interior',
    tools: ['flooring-calculator', 'paint-calculator', 'drywall-calculator'],
    icon: '🪵',
  },
  {
    key: 'woodworking',
    tools: ['lumber-calculator'],
    icon: '🪵',
  },
] as const;

/** Look up a tool definition by slug. */
export function getToolBySlug(slug: string): ToolDef | undefined {
  return ALL_TOOLS.find((t) => t.slug === slug);
}
