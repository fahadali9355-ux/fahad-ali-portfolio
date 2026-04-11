'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';

const TYPEWRITER_TEXTS = [
  'Full Stack Developer',
  'MERN Stack Developer',
  'Next.js & TypeScript Developer',
  'AI & DS Enthusiast'
];

const HeroCanvas = dynamic(() => import('./HeroCanvas'), {
  ssr: false,
  loading: () => <div className="w-full h-full" />
})

export default function Hero() {
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    const currentTextIndex = loopNum % TYPEWRITER_TEXTS.length;
    const fullText = TYPEWRITER_TEXTS[currentTextIndex];

    if (isDeleting) {
      if (text === '') {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
        timer = setTimeout(() => {}, 500); // small pause before typing next word
      } else {
        timer = setTimeout(() => {
          setText(text.substring(0, text.length - 1));
        }, 40);
      }
    } else {
      if (text === fullText) {
        timer = setTimeout(() => {
          setIsDeleting(true);
        }, 2000); // Pause when fully typed
      } else {
        timer = setTimeout(() => {
          setText(fullText.substring(0, text.length + 1));
        }, 80);
      }
    }

    return () => clearTimeout(timer);
  }, [text, isDeleting, loopNum]);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden" id="home">
      <div className="relative z-10 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center px-4 md:px-8 lg:px-16 py-20">
        
        {/* LEFT — Text content */}
        <div className="flex flex-col items-start gap-6">
          <div className="inline-flex px-4 py-1.5 rounded-full bg-primary-container/20 border border-primary-container/30">
            <span className="text-xs font-bold tracking-widest uppercase text-primary leading-none flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
              Currently Available for Work
            </span>
          </div>
          
          <div className="space-y-4 min-h-[140px]">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
              Hi, I'm <span className="text-primary">Fahad Ali</span>
            </h1>
            <h2 className="text-2xl md:text-3xl font-bold text-white/80">Full Stack Developer</h2>
            <p className="text-lg text-white/50 font-medium max-w-md h-8 text-nowrap">
              {text}<span className="animate-pulse text-purple-400 font-bold">|</span>
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            <Link href="/#projects" className="h-14 px-8 bg-primary-container text-[#0a0a0f] font-bold rounded-full flex items-center justify-center shadow-lg shadow-indigo-500/20 hover:-translate-y-1 hover:shadow-indigo-500/40 transition-all">
              View My Work
            </Link>
            <Link href="/#contact" className="h-14 px-8 border border-white/20 text-white font-bold rounded-full flex items-center justify-center bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-all">
              Contact Me
            </Link>
          </div>
          <div className="mt-2">
             <a href="/resume.pdf" download="Fahad_Ali_Resume.pdf" target="_blank" rel="noopener noreferrer" className="group inline-flex h-12 px-6 border border-purple-500/50 text-purple-400 font-bold rounded-full items-center justify-center bg-transparent hover:bg-purple-500/10 hover:border-purple-400 transition-all gap-2">
              <span className="material-symbols-outlined text-sm group-hover:-translate-y-0.5 transition-transform">download</span>
              Download CV
            </a>
          </div>
        </div>

        {/* RIGHT — 3D canvas, hidden on mobile */}
        <div className="hidden lg:block">
          <div className="relative w-full h-[500px] rounded-2xl overflow-hidden">
            <HeroCanvas />
          </div>
        </div>
      </div>
    </section>
  );
}
