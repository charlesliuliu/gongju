import type { ReactNode } from 'react';

interface CategoryIllustrationProps {
  category: 'concrete' | 'roofing' | 'flooring' | 'paint' | 'lumber' | 'deck' | 'drywall' | 'fence';
  size?: 'sm' | 'md' | 'lg';
  caption?: string;
}

export default function CategoryIllustration({ category, size = 'md', caption }: CategoryIllustrationProps) {
  const dimensions = { sm: { w: 120, h: 80 }, md: { w: 200, h: 120 }, lg: { w: 280, h: 160 } };
  const { w, h } = dimensions[size];

  const illustrations: Record<string, ReactNode> = {
    concrete: (
      <svg viewBox="0 0 200 120" width={w} height={h} className="mx-auto" role="img" aria-label="Concrete slab illustration">
        {/* Ground line */}
        <line x1="20" y1="90" x2="180" y2="90" stroke="#9CA3AF" strokeWidth="1.5" strokeDasharray="6,3" />
        {/* Slab cross-section */}
        <rect x="30" y="55" width="140" height="35" rx="2" fill="#E5E7EB" stroke="#6B7280" strokeWidth="2" />
        {/* Rebar */}
        <line x1="45" y1="65" x2="155" y2="65" stroke="#F97316" strokeWidth="2.5" />
        <line x1="45" y1="78" x2="155" y2="78" stroke="#F97316" strokeWidth="2.5" />
        {/* Rebar dots at ends */}
        <circle cx="45" cy="65" r="4" fill="none" stroke="#F97316" strokeWidth="2" />
        <circle cx="155" cy="65" r="4" fill="none" stroke="#F97316" strokeWidth="2" />
        <circle cx="45" cy="78" r="4" fill="none" stroke="#F97316" strokeWidth="2" />
        <circle cx="155" cy="78" r="4" fill="none" stroke="#F97316" strokeWidth="2" />
        {/* Dimensions */}
        <text x="100" y="45" textAnchor="middle" fill="#6B7280" fontSize="10" fontFamily="monospace">4″ Slab</text>
        <text x="100" y="110" textAnchor="middle" fill="#9CA3AF" fontSize="9" fontFamily="monospace">Subgrade / Gravel Base</text>
      </svg>
    ),

    roofing: (
      <svg viewBox="0 0 200 120" width={w} height={h} className="mx-auto" role="img" aria-label="Roof pitch illustration">
        {/* House body */}
        <rect x="40" y="70" width="120" height="35" rx="1" fill="#F3F4F6" stroke="#9CA3AF" strokeWidth="1.5" />
        {/* Roof triangle */}
        <polygon points="30,70 100,20 170,70" fill="#F97316" fillOpacity="0.2" stroke="#F97316" strokeWidth="2" />
        {/* Pitch annotation */}
        <line x1="100" y1="20" x2="100" y2="70" stroke="#6B7280" strokeWidth="1" strokeDasharray="4,2" />
        <line x1="100" y1="70" x2="170" y2="70" stroke="#6B7280" strokeWidth="1" strokeDasharray="4,2" />
        <text x="107" y="55" fill="#6B7280" fontSize="9" fontFamily="monospace">Rise</text>
        <text x="125" y="82" fill="#6B7280" fontSize="9" fontFamily="monospace">Run</text>
        <text x="80" y="35" fill="#F97316" fontSize="10" fontWeight="bold" fontFamily="monospace">6:12</text>
      </svg>
    ),

    flooring: (
      <svg viewBox="0 0 200 120" width={w} height={h} className="mx-auto" role="img" aria-label="Flooring planks illustration">
        {/* Room outline */}
        <rect x="20" y="15" width="160" height="90" rx="2" fill="#F9FAFB" stroke="#D1D5DB" strokeWidth="1.5" />
        {/* Floor planks */}
        <rect x="25" y="20" width="45" height="28" rx="1" fill="#D4A574" stroke="#B8860B" strokeWidth="1" />
        <rect x="72" y="20" width="45" height="28" rx="1" fill="#DEB887" stroke="#B8860B" strokeWidth="1" />
        <rect x="119" y="20" width="56" height="28" rx="1" fill="#D4A574" stroke="#B8860B" strokeWidth="1" />
        <rect x="25" y="50" width="45" height="28" rx="1" fill="#CD853F" stroke="#B8860B" strokeWidth="1" />
        <rect x="72" y="50" width="45" height="28" rx="1" fill="#D4A574" stroke="#B8860B" strokeWidth="1" />
        <rect x="119" y="50" width="56" height="28" rx="1" fill="#DEB887" stroke="#B8860B" strokeWidth="1" />
        <rect x="25" y="80" width="45" height="20" rx="1" fill="#DEB887" stroke="#B8860B" strokeWidth="1" />
        <rect x="72" y="80" width="45" height="20" rx="1" fill="#CD853F" stroke="#B8860B" strokeWidth="1" />
        <rect x="119" y="80" width="56" height="20" rx="1" fill="#D4A574" stroke="#B8860B" strokeWidth="1" />
        {/* Dimension arrows */}
        <text x="100" y="120" textAnchor="middle" fill="#6B7280" fontSize="9" fontFamily="monospace">12′ × 10′ Room</text>
      </svg>
    ),

    paint: (
      <svg viewBox="0 0 200 120" width={w} height={h} className="mx-auto" role="img" aria-label="Paint roller illustration">
        {/* Wall */}
        <rect x="30" y="10" width="100" height="95" rx="1" fill="#E0E7FF" stroke="#A5B4FC" strokeWidth="1" />
        {/* Paint roller */}
        <line x1="155" y1="20" x2="155" y2="80" stroke="#6B7280" strokeWidth="3" strokeLinecap="round" />
        <rect x="145" y="15" width="20" height="12" rx="3" fill="#F97316" stroke="#EA580C" strokeWidth="1" />
        {/* Roller on wall */}
        <rect x="130" y="50" width="6" height="18" rx="3" fill="#F97316" stroke="#EA580C" strokeWidth="1" transform="rotate(-5, 133, 59)" />
        {/* Painted area */}
        <rect x="35" y="30" width="90" height="60" rx="1" fill="#FED7AA" opacity="0.6" />
        <text x="80" y="115" textAnchor="middle" fill="#6B7280" fontSize="9" fontFamily="monospace">1 gal ≈ 400 sq ft</text>
      </svg>
    ),

    lumber: (
      <svg viewBox="0 0 200 120" width={w} height={h} className="mx-auto" role="img" aria-label="Lumber dimension illustration">
        {/* 2x4 board */}
        <rect x="20" y="40" width="160" height="25" rx="1" fill="#D4A574" stroke="#8B7355" strokeWidth="1.5" />
        {/* Cross-section */}
        <rect x="50" y="65" width="25" height="25" rx="1" fill="#DEB887" stroke="#8B7355" strokeWidth="1.5" />
        {/* End grain lines */}
        <circle cx="58" cy="73" r="2" fill="#C4A06A" />
        <circle cx="66" cy="78" r="1.5" fill="#C4A06A" />
        <circle cx="60" cy="82" r="1.5" fill="#C4A06A" />
        {/* Measurements */}
        <line x1="20" y1="35" x2="20" y2="28" stroke="#6B7280" strokeWidth="1" />
        <line x1="180" y1="35" x2="180" y2="28" stroke="#6B7280" strokeWidth="1" />
        <line x1="20" y1="30" x2="180" y2="30" stroke="#6B7280" strokeWidth="1" />
        <text x="100" y="26" textAnchor="middle" fill="#6B7280" fontSize="9" fontFamily="monospace">8 ft</text>
        <text x="32" y="95" fill="#8B7355" fontSize="9" fontFamily="monospace">2″×4″</text>
        {/* Board ends */}
        <text x="130" y="95" fill="#8B7355" fontSize="9" fontFamily="monospace">actual: 1.5″×3.5″</text>
      </svg>
    ),

    deck: (
      <svg viewBox="0 0 200 120" width={w} height={h} className="mx-auto" role="img" aria-label="Deck framing illustration">
        {/* Ground */}
        <line x1="10" y1="95" x2="190" y2="95" stroke="#9CA3AF" strokeWidth="1" strokeDasharray="4,2" />
        {/* Posts */}
        <rect x="35" y="65" width="8" height="30" rx="1" fill="#8B7355" stroke="#6B5B3A" strokeWidth="1" />
        <rect x="157" y="65" width="8" height="30" rx="1" fill="#8B7355" stroke="#6B5B3A" strokeWidth="1" />
        {/* Beam */}
        <rect x="25" y="55" width="150" height="12" rx="1" fill="#B8860B" stroke="#8B7355" strokeWidth="1.5" />
        {/* Joists */}
        <rect x="30" y="42" width="140" height="6" rx="1" fill="#CD853F" stroke="#B8860B" strokeWidth="0.5" />
        <rect x="30" y="48" width="140" height="6" rx="1" fill="#D4A574" stroke="#B8860B" strokeWidth="0.5" />
        {/* Deck boards */}
        <rect x="25" y="25" width="45" height="12" rx="1" fill="#DEB887" stroke="#C4A06A" strokeWidth="0.5" />
        <rect x="72" y="25" width="45" height="12" rx="1" fill="#D4A574" stroke="#C4A06A" strokeWidth="0.5" />
        <rect x="119" y="25" width="41" height="12" rx="1" fill="#DEB887" stroke="#C4A06A" strokeWidth="0.5" />
        {/* Spacing indicators */}
        <text x="100" y="115" textAnchor="middle" fill="#6B7280" fontSize="9" fontFamily="monospace">16″ OC Joist Spacing</text>
      </svg>
    ),

    drywall: (
      <svg viewBox="0 0 200 120" width={w} height={h} className="mx-auto" role="img" aria-label="Drywall installation illustration">
        {/* Studs */}
        <rect x="30" y="5" width="5" height="110" rx="1" fill="#D1D5DB" stroke="#9CA3AF" strokeWidth="1" />
        <rect x="70" y="5" width="5" height="110" rx="1" fill="#D1D5DB" stroke="#9CA3AF" strokeWidth="1" />
        <rect x="110" y="5" width="5" height="110" rx="1" fill="#D1D5DB" stroke="#9CA3AF" strokeWidth="1" />
        <rect x="150" y="5" width="5" height="110" rx="1" fill="#D1D5DB" stroke="#9CA3AF" strokeWidth="1" />
        {/* Drywall panel */}
        <rect x="32" y="10" width="116" height="96" rx="1" fill="#F9FAFB" stroke="#9CA3AF" strokeWidth="1.5" />
        {/* Screws */}
        <circle cx="52" cy="25" r="2" fill="#6B7280" />
        <circle cx="88" cy="25" r="2" fill="#6B7280" />
        <circle cx="124" cy="25" r="2" fill="#6B7280" />
        <circle cx="52" cy="55" r="2" fill="#6B7280" />
        <circle cx="88" cy="55" r="2" fill="#6B7280" />
        <circle cx="124" cy="55" r="2" fill="#6B7280" />
        <circle cx="52" cy="85" r="2" fill="#6B7280" />
        <circle cx="88" cy="85" r="2" fill="#6B7280" />
        <circle cx="124" cy="85" r="2" fill="#6B7280" />
        <text x="90" y="120" textAnchor="middle" fill="#6B7280" fontSize="9" fontFamily="monospace">4′ × 8′ Panel on 16″ OC Studs</text>
      </svg>
    ),

    fence: (
      <svg viewBox="0 0 200 120" width={w} height={h} className="mx-auto" role="img" aria-label="Fence post spacing illustration">
        {/* Ground */}
        <line x1="10" y1="85" x2="190" y2="85" stroke="#9CA3AF" strokeWidth="1.5" strokeDasharray="6,3" />
        {/* Posts */}
        <rect x="20" y="30" width="10" height="65" rx="1" fill="#8B7355" stroke="#6B5B3A" strokeWidth="1.5" />
        <rect x="95" y="30" width="10" height="65" rx="1" fill="#8B7355" stroke="#6B5B3A" strokeWidth="1.5" />
        <rect x="170" y="30" width="10" height="65" rx="1" fill="#8B7355" stroke="#6B5B3A" strokeWidth="1.5" />
        {/* Rails */}
        <rect x="18" y="42" width="84" height="5" rx="1" fill="#CD853F" stroke="#B8860B" strokeWidth="0.5" />
        <rect x="93" y="42" width="84" height="5" rx="1" fill="#CD853F" stroke="#B8860B" strokeWidth="0.5" />
        <rect x="18" y="60" width="84" height="5" rx="1" fill="#CD853F" stroke="#B8860B" strokeWidth="0.5" />
        <rect x="93" y="60" width="84" height="5" rx="1" fill="#CD853F" stroke="#B8860B" strokeWidth="0.5" />
        {/* Pickets */}
        <rect x="22" y="32" width="8" height="28" rx="1" fill="#DEB887" stroke="#C4A06A" strokeWidth="0.5" />
        <rect x="33" y="32" width="8" height="28" rx="1" fill="#D4A574" stroke="#C4A06A" strokeWidth="0.5" />
        <rect x="44" y="32" width="8" height="28" rx="1" fill="#DEB887" stroke="#C4A06A" strokeWidth="0.5" />
        <rect x="97" y="32" width="8" height="28" rx="1" fill="#D4A574" stroke="#C4A06A" strokeWidth="0.5" />
        <rect x="108" y="32" width="8" height="28" rx="1" fill="#DEB887" stroke="#C4A06A" strokeWidth="0.5" />
        {/* Spacing measurement */}
        <line x1="30" y1="78" x2="95" y2="78" stroke="#6B7280" strokeWidth="1" />
        <line x1="30" y1="75" x2="30" y2="81" stroke="#6B7280" strokeWidth="1" />
        <line x1="95" y1="75" x2="95" y2="81" stroke="#6B7280" strokeWidth="1" />
        <text x="62" y="76" textAnchor="middle" fill="#6B7280" fontSize="8" fontFamily="monospace">8 ft</text>
        <text x="100" y="115" textAnchor="middle" fill="#6B7280" fontSize="9" fontFamily="monospace">6′–8′ Post Spacing</text>
      </svg>
    ),
  };

  return (
    <figure className="flex flex-col items-center my-8" aria-label={`${category} illustration`}>
      {illustrations[category]}
      {caption ? (
        <figcaption className="text-sm text-gray-500 text-center mt-3 max-w-lg leading-relaxed">
          {caption}
        </figcaption>
      ) : (
        <figcaption className="sr-only">{category} category illustration</figcaption>
      )}
    </figure>
  );
}
