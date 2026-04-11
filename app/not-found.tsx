'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';

export default function NotFound() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const canvas = document.createElement('canvas');
    canvas.style.position = 'absolute';
    canvas.style.inset = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '0';
    containerRef.current.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    function resize() {
      if (!containerRef.current || !canvas) return;
      canvas.width = containerRef.current.offsetWidth;
      canvas.height = containerRef.current.offsetHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    const particles: any[] = [];
    for (let i = 0; i < 50; i++) {
      particles.push({
        x: Math.random() * (canvas.width || window.innerWidth),
        y: Math.random() * (canvas.height || window.innerHeight),
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5 - 0.5, // drift up
        size: Math.random() * 2 + 1,
      });
    }

    let animId: number;
    function animate() {
      animId = requestAnimationFrame(animate);
      if (!ctx || !canvas) return;
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        
        if (p.y < -10) p.y = canvas.height + 10;
        if (p.x < -10) p.x = canvas.width + 10;
        if (p.x > canvas.width + 10) p.x = -10;
        
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(129, 140, 248, 0.4)';
        ctx.fill();
      }
    }
    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
      if (canvas.parentNode) canvas.parentNode.removeChild(canvas);
    };
  }, []);

  return (
    <div ref={containerRef} className="relative min-h-[80vh] flex flex-col items-center justify-center p-4">
      <div className="relative z-10 text-center">
        <h1 className="text-9xl font-black text-transparent bg-clip-text bg-gradient-to-br from-purple-400 to-cyan-400 drop-shadow-[0_0_30px_rgba(168,85,247,0.5)]">
          404
        </h1>
        <h2 className="text-2xl font-bold text-white mt-4 mb-2">Fahad Ali | Signal Lost</h2>
        <p className="text-white/60 max-w-sm mx-auto mb-8">
          The transmission has been interrupted. This coordinate in Fahad's digital space does not exist.
        </p>
        <Link 
          href="/" 
          className="inline-flex h-14 px-8 border border-purple-500/50 text-purple-400 font-bold rounded-full items-center justify-center bg-transparent hover:bg-purple-500/10 hover:border-purple-400 transition-all gap-2 shadow-[0_0_15px_rgba(168,85,247,0.2)]"
        >
          <span className="material-symbols-outlined text-[18px]">rocket_launch</span>
          Return to Base
        </Link>
      </div>
    </div>
  );
}
