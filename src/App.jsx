import React, { useEffect, useMemo, useState } from 'react';
import PomodoroTimer from './components/PomodoroTimer.jsx';
import ShibaCompanion from './components/ShibaCompanion.jsx';
import AccessoryShelf, { ALL_ACCESSORIES } from './components/AccessoryShelf.jsx';
import AudioPlayer from './components/AudioPlayer.jsx';
import BackgroundScene from './components/BackgroundScene.jsx';

const STORAGE_KEY = 'pomodoro-shiba-progress-v1';

function App() {
  const [unlocked, setUnlocked] = useState([]);
  const [sessions, setSessions] = useState(0);

  // load from localStorage
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        setUnlocked(parsed.unlocked ?? []);
        setSessions(parsed.sessions ?? 0);
      }
    } catch (_) {}
  }, []);

  // persist
  useEffect(() => {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ unlocked, sessions })
      );
    } catch (_) {}
  }, [unlocked, sessions]);

  const nextAccessoryKey = useMemo(() => {
    const all = ALL_ACCESSORIES.map((a) => a.key);
    const remaining = all.filter((k) => !unlocked.includes(k));
    return remaining[0] || null;
  }, [unlocked]);

  const handleWorkComplete = () => {
    setSessions((s) => s + 1);
    setUnlocked((curr) => {
      if (!nextAccessoryKey) return curr;
      if (curr.includes(nextAccessoryKey)) return curr;
      return [...curr, nextAccessoryKey];
    });
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      <BackgroundScene />

      <div className="relative z-10 max-w-6xl mx-auto px-4 py-8">
        <header className="flex flex-col items-center text-center gap-2 mb-8">
          <h1 className="text-3xl md:text-4xl font-semibold text-slate-900 drop-shadow-sm">
            Pomodoro in the Countryside
          </h1>
          <p className="text-slate-600 max-w-xl">
            Focus for 25 minutes, rest for 5. After every focus session, your pixel Shiba earns a new accessory.
          </p>
        </header>

        <main className="grid md:grid-cols-2 gap-8 items-start">
          <div className="flex flex-col gap-4">
            <div className="bg-white/70 backdrop-blur rounded-2xl p-4 border border-black/5">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-slate-600">Completed sessions</span>
                <span className="text-sm font-semibold text-slate-800">{sessions}</span>
              </div>
              <PomodoroTimer onWorkSessionComplete={handleWorkComplete} />
            </div>
            <AudioPlayer />
          </div>

          <div className="flex flex-col gap-4">
            <div className="bg-white/60 backdrop-blur rounded-2xl p-4 border border-black/5">
              <ShibaCompanion accessories={unlocked} />
              <div className="text-center text-sm text-slate-600 -mt-2">
                {nextAccessoryKey
                  ? `Next reward: ${nextAccessoryKey}`
                  : 'All accessories collected!'}
              </div>
            </div>
            <AccessoryShelf unlocked={unlocked} />
          </div>
        </main>

        <footer className="mt-10 text-center text-xs text-slate-500">
          Built for calm, cozy studying. Tip: start the music and press Start.
        </footer>
      </div>
    </div>
  );
}

export default App;
