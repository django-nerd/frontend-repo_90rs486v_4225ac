import React from 'react';

export default function BackgroundScene() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Sky gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#bde0fe] via-[#e0fbfc] to-[#b8f2e6]" />
      {/* Distant mountains */}
      <svg className="absolute bottom-28 left-0 right-0 w-full" viewBox="0 0 800 200" preserveAspectRatio="none">
        <polygon points="0,200 120,120 260,200" fill="#a0c4ff" opacity="0.8" />
        <polygon points="160,200 340,90 520,200" fill="#90caf9" opacity="0.8" />
        <polygon points="380,200 560,110 740,200" fill="#a5d8ff" opacity="0.8" />
      </svg>
      {/* Rice fields */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#a0e3b2] to-[#b8f2e6]" />
      {/* Soft sun */}
      <div className="absolute -top-10 right-10 w-40 h-40 rounded-full bg-yellow-200 blur-2xl opacity-60" />
      {/* Subtle vignette */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
    </div>
  );
}
