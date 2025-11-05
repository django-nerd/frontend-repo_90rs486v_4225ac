import React, { useEffect, useRef, useState } from 'react';
import { Volume2, VolumeX, Play, Pause } from 'lucide-react';

// Simple background music player for gentle study music
const TRACKS = [
  {
    title: 'Lofi Breeze',
    url:
      'https://cdn.pixabay.com/download/audio/2022/03/15/audio_80b7f2d2d6.mp3?filename=lofi-study-112191.mp3',
  },
  {
    title: 'Soft Rain',
    url:
      'https://cdn.pixabay.com/download/audio/2022/03/10/audio_2c389ce8e4.mp3?filename=soft-rain-lofi-ambient-10164.mp3',
  },
];

export default function AudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.25);
  const [trackIndex, setTrackIndex] = useState(0);
  const audioRef = useRef(null);

  useEffect(() => {
    const a = audioRef.current;
    if (!a) return;
    a.volume = volume;
  }, [volume]);

  const toggle = async () => {
    const a = audioRef.current;
    if (!a) return;
    try {
      if (isPlaying) {
        a.pause();
        setIsPlaying(false);
      } else {
        await a.play();
        setIsPlaying(true);
      }
    } catch (e) {
      // autoplay likely blocked until user interaction
    }
  };

  const next = () => {
    const i = (trackIndex + 1) % TRACKS.length;
    setTrackIndex(i);
    const a = audioRef.current;
    if (a) {
      a.src = TRACKS[i].url;
      if (isPlaying) a.play();
    }
  };

  return (
    <div className="w-full max-w-sm mx-auto bg-white/70 backdrop-blur rounded-2xl p-4 border border-black/5">
      <div className="flex items-center gap-3">
        <button
          onClick={toggle}
          className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900 text-white hover:bg-slate-800"
          aria-label={isPlaying ? 'Pause' : 'Play'}
        >
          {isPlaying ? <Pause size={18} /> : <Play size={18} />}
        </button>
        <div className="flex-1">
          <div className="text-xs text-slate-500">Now playing</div>
          <div className="text-sm font-medium text-slate-800 truncate">
            {TRACKS[trackIndex].title}
          </div>
        </div>
        <button
          onClick={next}
          className="text-xs px-3 h-8 rounded-lg bg-slate-200 text-slate-700 hover:bg-slate-300"
        >
          Next
        </button>
      </div>
      <div className="mt-3 flex items-center gap-2">
        {volume === 0 ? <VolumeX size={16} className="text-slate-500" /> : <Volume2 size={16} className="text-slate-500" />}
        <input
          type="range"
          min={0}
          max={1}
          step={0.01}
          value={volume}
          onChange={(e) => setVolume(parseFloat(e.target.value))}
          className="w-full accent-slate-900"
        />
      </div>
      <audio ref={audioRef} src={TRACKS[trackIndex].url} loop />
    </div>
  );
}
