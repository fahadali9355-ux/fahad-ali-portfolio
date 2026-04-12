'use client';

import ScrollReveal from './ScrollReveal';
import { IconCloud } from '@/components/ui/interactive-icon-cloud';

const slugs = [
  "typescript",
  "javascript",
  "react",
  "nodedotjs",
  "express",
  "nextdotjs",
  "mongodb",
  "tailwindcss",
  "firebase",
  "git",
  "github",
  "html5",
  "css3",
  "vercel",
  "python",
  "visualstudiocode",
];

export default function Skills() {
  return (
    <section id="skills" className="py-24 px-6 md:px-16 relative overflow-hidden bg-transparent">
      <ScrollReveal direction="blur" delay={0.1}>
        <h2 className="text-4xl font-bold text-white text-center mb-4 shimmer-text">Skills & Technologies</h2>
        <p className="text-white/40 text-sm text-center mb-16">What I work with</p>
      </ScrollReveal>

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* LEFT — Skill Category Cards (2x2 grid) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          
          {/* Card 1 — Frontend */}
          <ScrollReveal direction="scale" delay={0.1}>
            <div className="group relative bg-white/5 border border-white/10 rounded-2xl p-6 cursor-pointer overflow-hidden transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(129,140,248,0.1)] hover:border-purple-400/40 hover:bg-purple-400/5">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-400/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" />
              <div className="relative z-10 w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-5 group-hover:bg-purple-500/15 group-hover:border-purple-500/30 transition-all duration-300">
                <svg className="w-6 h-6 text-white/70 group-hover:text-purple-400 transition-colors duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-white mb-2 group-hover:text-purple-300 transition-colors duration-300 relative z-10">Frontend Development</h3>
              <p className="text-sm text-white/50 leading-relaxed relative z-10">React, Next.js, TypeScript, Tailwind CSS</p>
            </div>
          </ScrollReveal>

          {/* Card 2 — Backend */}
          <ScrollReveal direction="scale" delay={0.2}>
            <div className="group relative bg-white/5 border border-white/10 rounded-2xl p-6 cursor-pointer overflow-hidden transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(34,211,238,0.1)] hover:border-cyan-400/40 hover:bg-cyan-400/5">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" />
              <div className="relative z-10 w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-5 group-hover:bg-cyan-500/15 group-hover:border-cyan-500/30 transition-all duration-300">
                <svg className="w-6 h-6 text-white/70 group-hover:text-cyan-400 transition-colors duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors duration-300 relative z-10">Backend Architecture</h3>
              <p className="text-sm text-white/50 leading-relaxed relative z-10">Node.js, Express.js, MongoDB, REST APIs</p>
            </div>
          </ScrollReveal>

          {/* Card 3 — App */}
          <ScrollReveal direction="scale" delay={0.3}>
            <div className="group relative bg-white/5 border border-white/10 rounded-2xl p-6 cursor-pointer overflow-hidden transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(244,114,182,0.1)] hover:border-pink-400/40 hover:bg-pink-400/5">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-pink-400/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" />
              <div className="relative z-10 w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-5 group-hover:bg-pink-500/15 group-hover:border-pink-500/30 transition-all duration-300">
                <svg className="w-6 h-6 text-white/70 group-hover:text-pink-400 transition-colors duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-white mb-2 group-hover:text-pink-300 transition-colors duration-300 relative z-10">App Development</h3>
              <p className="text-sm text-white/50 leading-relaxed relative z-10">PWA, Firebase, Mobile-first, Offline apps</p>
            </div>
          </ScrollReveal>

          {/* Card 4 — Trading */}
          <ScrollReveal direction="scale" delay={0.4}>
            <div className="group relative bg-white/5 border border-white/10 rounded-2xl p-6 cursor-pointer overflow-hidden transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(52,211,153,0.1)] hover:border-green-400/40 hover:bg-green-400/5">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-green-400/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" />
              <div className="relative z-10 w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-5 group-hover:bg-green-500/15 group-hover:border-green-500/30 transition-all duration-300">
                <svg className="w-6 h-6 text-white/70 group-hover:text-green-400 transition-colors duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-white mb-2 group-hover:text-green-300 transition-colors duration-300 relative z-10">Algorithmic Trading</h3>
              <p className="text-sm text-white/50 leading-relaxed relative z-10">MQL5, Trading bots, Financial automation</p>
            </div>
          </ScrollReveal>

        </div>

        {/* RIGHT — Floating Tech Icons */}
        <div className="relative flex w-full h-[500px] items-center justify-center overflow-hidden">
          <IconCloud iconSlugs={slugs} />
        </div>
      </div>
    </section>
  );
}
