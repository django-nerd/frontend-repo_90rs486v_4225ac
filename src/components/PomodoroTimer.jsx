import React, { useEffect, useMemo, useRef, useState } from 'react';

const formatTime = (seconds) => {
  const m = Math.floor(seconds / 60)
    .toString()
    .padStart(2, '0');
  const s = Math.floor(seconds % 60)
    .toString()
    .padStart(2, '0');
  return `${m}:${s}`;
};

export default function PomodoroTimer({
  workMinutes = 25,
  breakMinutes = 5,
  onWorkSessionComplete,
}) {
  const WORK = 'work';
  const BREAK = 'break';

  const [phase, setPhase] = useState(WORK);
  const [isRunning, setIsRunning] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(workMinutes * 60);
  const intervalRef = useRef(null);

  const totalForPhase = useMemo(
    () => (phase === WORK ? workMinutes * 60 : breakMinutes * 60),
    [phase, workMinutes, breakMinutes]
  );

  useEffect(() => {
    setSecondsLeft(phase === WORK ? workMinutes * 60 : breakMinutes * 60);
  }, [phase, workMinutes, breakMinutes]);

  useEffect(() => {
    if (!isRunning) return;

    intervalRef.current = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          clearInterval(intervalRef.current);
          if (phase === WORK) {
            onWorkSessionComplete?.();
            setPhase(BREAK);
          } else {
            setPhase(WORK);
          }
          setIsRunning(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(intervalRef.current);
  }, [isRunning, phase, onWorkSessionComplete]);

  const toggle = () => {
    setIsRunning((v) => !v);
  };

  const reset = () => {
    setIsRunning(false);
    setSecondsLeft(phase === WORK ? workMinutes * 60 : breakMinutes * 60);
  };

  const progress = 1 - secondsLeft / totalForPhase;
  const stroke = 10;
  const radius = 80;
  const circumference = 2 * Math.PI * radius;
  const dash = circumference * progress;

  return (
    <div className="w-full max-w-sm mx-auto bg-white/80 backdrop-blur rounded-2xl shadow-xl p-6 border border-black/5">
      <div className="text-center mb-4">
        <span
          className={
            'px-3 py-1 rounded-full text-sm font-medium ' +
            (phase === WORK
              ? 'bg-rose-100 text-rose-700'
              : 'bg-emerald-100 text-emerald-700')
          }
        >
          {phase === WORK ? 'Focus' : 'Break'} time
        </span>
      </div>

      <div className="relative flex items-center justify-center">
        <svg width={200} height={200} className="-rotate-90">
          <circle
            cx="100"
            cy="100"
            r={radius}
            stroke="#e5e7eb"
            strokeWidth={stroke}
            fill="none"
          />
          <circle
            cx="100"
            cy="100"
            r={radius}
            stroke={phase === WORK ? '#fb7185' : '#34d399'}
            strokeWidth={stroke}
            strokeLinecap="round"
            fill="none"
            strokeDasharray={`${dash} ${circumference}`}
            style={{ transition: 'stroke-dasharray 1s linear' }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-5xl font-semibold tabular-nums text-slate-800">
            {formatTime(secondsLeft)}
          </div>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-3 gap-2">
        <button
          onClick={toggle}
          className="col-span-2 h-11 rounded-xl bg-slate-900 text-white font-medium hover:bg-slate-800 active:scale-[0.99] transition"
        >
          {isRunning ? 'Pause' : 'Start'}
        </button>
        <button
          onClick={reset}
          className="h-11 rounded-xl bg-slate-200 text-slate-800 font-medium hover:bg-slate-300 active:scale-[0.99] transition"
        >
          Reset
        </button>
      </div>

      <p className="mt-3 text-center text-xs text-slate-500">
        25–5 Pomodoro. Complete a focus session to earn a new Shiba accessory.
      </p>
    </div>
  );
}
