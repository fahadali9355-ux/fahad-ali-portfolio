'use client';

import { useEffect, useState } from 'react';

export default function Preloader() {
  const [show, setShow] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Check if we've already shown the preloader this session
    const hasPreloaded = sessionStorage.getItem('preloaderShown');
    if (hasPreloaded) {
      setShow(false);
      return;
    }

    // Set a flag to remember for this session
    sessionStorage.setItem('preloaderShown', 'true');

    // Start progress bar animation
    let start = Date.now();
    const duration = 1800;
    
    const interval = setInterval(() => {
      const elapsed = Date.now() - start;
      const p = Math.min((elapsed / duration) * 100, 100);
      setProgress(p);
      
      if (p >= 100) {
        clearInterval(interval);
      }
    }, 16);

    // Fade out after 2 seconds
    const hideTimeout = setTimeout(() => {
      setShow(false);
    }, 2000);

    return () => {
      clearInterval(interval);
      clearTimeout(hideTimeout);
    };
  }, []);

  if (!show) return null;

  return (
    <div 
      className={`fixed inset-0 z-[9999] bg-[#0a0a0f] flex flex-col items-center justify-center transition-all duration-700 ${progress >= 100 ? 'opacity-0 -translate-y-full' : 'opacity-100 translate-y-0'}`}
    >
      <div className="flex flex-col items-center gap-6">
        <h1 className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-br from-purple-400 to-cyan-400 animate-pulse" style={{ textShadow: '0 0 40px rgba(129,140,248,0.5)' }}>
          FA
        </h1>
        <div className="w-48 h-[2px] bg-white/10 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-[#818cf8] to-[#22d3ee] transition-all duration-75 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
}
