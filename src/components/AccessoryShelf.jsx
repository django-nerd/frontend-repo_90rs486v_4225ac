import React from 'react';

const ALL_ACCESSORIES = [
  { key: 'bandana', label: 'Bandana', color: 'bg-rose-500' },
  { key: 'cap', label: 'Cap', color: 'bg-blue-500' },
  { key: 'glasses', label: 'Glasses', color: 'bg-slate-700' },
  { key: 'backpack', label: 'Backpack', color: 'bg-emerald-500' },
  { key: 'flower', label: 'Flower', color: 'bg-pink-500' },
];

export default function AccessoryShelf({ unlocked = [] }) {
  return (
    <div className="w-full max-w-2xl mx-auto bg-white/70 backdrop-blur rounded-2xl p-4 border border-black/5">
      <h3 className="text-sm font-semibold text-slate-700 mb-3">Your accessories</h3>
      <div className="grid grid-cols-5 gap-3">
        {ALL_ACCESSORIES.map((a) => {
          const isUnlocked = unlocked.includes(a.key);
          return (
            <div
              key={a.key}
              className={
                'flex flex-col items-center justify-center rounded-xl p-3 border transition ' +
                (isUnlocked
                  ? 'bg-white border-slate-200 shadow-sm'
                  : 'bg-slate-100/70 border-slate-200 opacity-60')
              }
            >
              <div className={`w-10 h-10 rounded-lg ${a.color} ${isUnlocked ? '' : 'grayscale'}`}></div>
              <span className="mt-2 text-xs font-medium text-slate-700">{a.label}</span>
              <span className="text-[10px] text-slate-400">{isUnlocked ? 'Collected' : 'Locked'}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export { ALL_ACCESSORIES };
