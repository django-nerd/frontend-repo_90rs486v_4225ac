import React from 'react';

// Minimal pixel shiba using SVG with optional accessories overlays
// Accessories: bandana, cap, glasses, backpack, flower
export default function ShibaCompanion({ accessories = [] }) {
  const has = (name) => accessories.includes(name);

  return (
    <div className="relative w-full max-w-md mx-auto select-none">
      <div className="relative aspect-square">
        <svg viewBox="0 0 200 200" className="w-full h-full image-rendering-pixelated">
          {/* background grassy field */}
          <defs>
            <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#bde0fe" />
              <stop offset="100%" stopColor="#e0fbfc" />
            </linearGradient>
            <linearGradient id="field" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#b8f2e6" />
              <stop offset="100%" stopColor="#a0e3b2" />
            </linearGradient>
          </defs>
          <rect x="0" y="0" width="200" height="120" fill="url(#sky)" />
          {/* distant mountains */}
          <polygon points="0,120 40,90 80,120" fill="#a0c4ff" />
          <polygon points="60,120 110,80 160,120" fill="#90caf9" />
          <polygon points="120,120 170,95 200,120" fill="#a5d8ff" />
          {/* rice field */}
          <rect x="0" y="120" width="200" height="80" fill="url(#field)" />
          {/* Torii gate */}
          <g opacity="0.6">
            <rect x="140" y="88" width="6" height="32" fill="#b91c1c" />
            <rect x="170" y="88" width="6" height="32" fill="#b91c1c" />
            <rect x="133" y="84" width="50" height="6" fill="#ef4444" />
          </g>

          {/* Shiba body */}
          <g id="shiba" transform="translate(40,60)">
            {/* tail */}
            <circle cx="110" cy="74" r="10" fill="#f2d1a8" />
            <circle cx="104" cy="70" r="8" fill="#e19f63" />
            {/* body */}
            <rect x="30" y="60" width="70" height="40" rx="6" fill="#e19f63" />
            <rect x="30" y="80" width="70" height="20" rx="6" fill="#d68e50" />
            {/* belly */}
            <rect x="40" y="72" width="40" height="20" rx="6" fill="#f6ead7" />
            {/* legs */}
            <rect x="38" y="98" width="10" height="14" fill="#e19f63" />
            <rect x="72" y="98" width="10" height="14" fill="#e19f63" />
            {/* head */}
            <rect x="0" y="40" width="48" height="40" rx="8" fill="#e19f63" />
            {/* cheeks */}
            <circle cx="10" cy="70" r="5" fill="#f6ead7" />
            <circle cx="32" cy="70" r="5" fill="#f6ead7" />
            {/* ears */}
            <polygon points="4,38 14,44 4,52" fill="#e19f63" />
            <polygon points="44,38 34,44 44,52" fill="#e19f63" />
            {/* eyes */}
            <circle cx="14" cy="58" r="2.2" fill="#1f2937" />
            <circle cx="34" cy="58" r="2.2" fill="#1f2937" />
            {/* nose/mouth */}
            <circle cx="24" cy="62" r="1.8" fill="#1f2937" />
            <path d="M20 66 Q24 70 28 66" stroke="#1f2937" strokeWidth="2" fill="none" />

            {/* Accessories */}
            {/* bandana */}
            {has('bandana') && (
              <g>
                <path d="M6 76 L42 76 L24 84 Z" fill="#ef4444" />
                <circle cx="24" cy="80" r="3" fill="#991b1b" />
              </g>
            )}
            {/* cap */}
            {has('cap') && (
              <g>
                <path d="M2 42 Q24 30 46 42 L46 46 Q24 38 2 46 Z" fill="#3b82f6" />
                <rect x="6" y="46" width="36" height="4" fill="#2563eb" />
              </g>
            )}
            {/* glasses */}
            {has('glasses') && (
              <g>
                <rect x="10" y="56" width="8" height="6" rx="1" fill="#0f172a" />
                <rect x="30" y="56" width="8" height="6" rx="1" fill="#0f172a" />
                <rect x="18" y="58" width="12" height="2" fill="#0f172a" />
              </g>
            )}
            {/* backpack */}
            {has('backpack') && (
              <g>
                <rect x="75" y="60" width="16" height="24" rx="3" fill="#10b981" />
                <rect x="78" y="64" width="10" height="6" rx="1" fill="#34d399" />
              </g>
            )}
            {/* flower */}
            {has('flower') && (
              <g>
                <circle cx="36" cy="50" r="2.5" fill="#f59e0b" />
                <circle cx="38" cy="48" r="2" fill="#f472b6" />
                <circle cx="34" cy="48" r="2" fill="#f472b6" />
                <circle cx="36" cy="46" r="2" fill="#f472b6" />
                <circle cx="36" cy="52" r="2" fill="#f472b6" />
              </g>
            )}
          </g>
        </svg>
      </div>
    </div>
  );
}
