'use client';

import { useEffect, useRef } from 'react';
import ScrollReveal from './ScrollReveal';

export default function Experience() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!containerRef.current || !canvasRef.current) return;
    const el = containerRef.current;
    
    let started = false;
    let animId: number;
    let canvas: HTMLCanvasElement;
    let entriesObserver: IntersectionObserver;

    function initCanvas() {
      canvas = canvasRef.current!;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      function resize() {
        if (!el || !canvas) return;
        canvas.width = el.offsetWidth;
        canvas.height = el.offsetHeight;
      }
      resize();

      const BURST_COLORS = ['#818cf8', '#22d3ee', '#c084fc', '#f472b6', '#34d399'];
      const particles: any[] = [];

      function burst(x: number, y: number) {
        for (let i = 0; i < 28; i++) {
          const angle = Math.random() * Math.PI * 2;
          const speed = 1 + Math.random() * 3;
          particles.push({
            x, y,
            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed,
            life: 40,
            maxLife: 40,
            r: 2 + Math.random() * 3,
            color: BURST_COLORS[Math.floor(Math.random() * BURST_COLORS.length)],
          });
        }
      }

      const entries = el.querySelectorAll('.tl-entry');
      let visibleCount = 0;

      entriesObserver = new IntersectionObserver((records) => {
        for (const record of records) {
          if (record.isIntersecting && !record.target.classList.contains('tl-visible')) {
            record.target.classList.add('tl-visible', 'opacity-100', 'translate-y-0');
            record.target.classList.remove('opacity-0', 'translate-y-8');
            visibleCount++;

            const dot = record.target.querySelector('.tl-dot');
            if (dot) {
              const dotRect = dot.getBoundingClientRect();
              const canvasRect = canvas.getBoundingClientRect();
              const bx = dotRect.left - canvasRect.left + dotRect.width / 2;
              const by = dotRect.top - canvasRect.top + dotRect.height / 2;
              burst(bx, by);
            }

            if (visibleCount >= entries.length) {
              entriesObserver.disconnect();
            }
          }
        }
      }, { threshold: 0.3 });

      entries.forEach(entry => entriesObserver.observe(entry));
      window.addEventListener('resize', resize);

      function animate() {
        animId = requestAnimationFrame(animate);
        if (!ctx || !canvas) return;
        const w = canvas.width;
        const h = canvas.height;
        ctx.clearRect(0, 0, w, h);

        const lineX = w / 2;
        const yStart = h * 0.08;
        const yEnd = h * 0.85;
        const grad = ctx.createLinearGradient(lineX, yStart, lineX, yEnd);
        grad.addColorStop(0, '#818cf8');
        grad.addColorStop(1, '#22d3ee');

        ctx.beginPath();
        ctx.moveTo(lineX, yStart);
        ctx.lineTo(lineX, yEnd);
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.5;
        ctx.stroke();

        for (let i = particles.length - 1; i >= 0; i--) {
          const p = particles[i];
          p.x += p.vx;
          p.y += p.vy;
          p.vy += 0.06;
          p.life -= 1;
          p.r *= 0.96;

          if (p.life <= 0) {
            particles.splice(i, 1);
            continue;
          }

          ctx.globalAlpha = p.life / p.maxLife;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
          ctx.fillStyle = p.color;
          ctx.fill();
        }
        ctx.globalAlpha = 1;
      }
      animate();
    }

    const initObserver = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started) {
        started = true;
        initCanvas();
        initObserver.disconnect();
      }
    }, { threshold: 0.1 });
    initObserver.observe(el);

    return () => {
      initObserver.disconnect();
      cancelAnimationFrame(animId);
      if (entriesObserver) entriesObserver.disconnect();
      window.removeEventListener('resize', () => {});
    };
  }, []);

  return (
    <section ref={containerRef} className="relative py-16 md:py-24 px-4 overflow-hidden" id="experience">
      <canvas ref={canvasRef} id="tl-canvas" className="hidden md:block absolute inset-0 z-0 pointer-events-none w-full h-full" />
      
      <div className="relative z-10 max-w-4xl mx-auto">
        <ScrollReveal direction="blur" delay={0.1}>
          <div className="text-center mb-16">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white shimmer-text inline-block">Experience</h2>
            <div className="w-16 h-1 mt-3 mx-auto rounded-full bg-purple-500"></div>
          </div>
        </ScrollReveal>

        <div className="relative">
          {/* Desktop Center Line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 bg-gradient-to-b from-purple-500/50 via-purple-500/30 to-transparent hidden md:block" />
          
          {/* Mobile Left Line */}
          <div className="md:hidden absolute left-5 top-0 bottom-0 w-px bg-gradient-to-b from-purple-500/40 to-transparent" />

          {/* Entry 1 */}
          <ScrollReveal direction="right" delay={0.2} className="w-full">
            <div className="tl-entry relative grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-4 md:gap-8 opacity-0 translate-y-8 transition-all duration-700 ease-out mb-8 md:mb-12">
              <div className="tl-dot absolute left-5 md:static md:left-1/2 -translate-x-1/2 top-5 md:top-0 md:mt-6 z-10 w-3 h-3 rounded-full bg-purple-500 md:mx-auto order-1 md:order-2" />
              
              <div className="ml-8 md:ml-0 md:text-right order-2 md:order-1 flex md:justify-end">
                <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-4 md:p-6 inline-block text-left w-full max-w-md overflow-hidden break-words">
                  <span className="text-xs font-mono mb-1 block text-purple-400">Feb 2026 – April 2026</span>
                  <h4 className="text-sm font-bold text-white">Lead Developer</h4>
                  <p className="text-xs text-white/50 mt-1">Quaid Public School</p>
                  <p className="text-xs md:text-sm text-white/40 mt-2 leading-relaxed line-clamp-3 md:line-clamp-none">Developed a full-scale School Management System from scratch. Implemented role-based access control (RBAC), automated fee tracking, and teacher payroll modules to digitize school operations.</p>
                </div>
              </div>
              <div className="hidden md:block order-3"></div>
            </div>
          </ScrollReveal>

          {/* Entry 2 */}
          <ScrollReveal direction="left" delay={0.2} className="w-full">
            <div className="tl-entry relative grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-4 md:gap-8 opacity-0 translate-y-8 transition-all duration-700 ease-out mb-8 md:mb-12">
              <div className="tl-dot absolute left-5 md:static md:left-1/2 -translate-x-1/2 top-5 md:top-0 md:mt-6 z-10 w-3 h-3 rounded-full bg-purple-500 md:mx-auto order-1 md:order-2" />
              
              <div className="hidden md:block order-1"></div>
              <div className="ml-8 md:ml-0 text-left order-2 md:order-3 flex md:justify-start">
                <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-4 md:p-6 inline-block text-left w-full max-w-md overflow-hidden break-words">
                  <span className="text-xs font-mono mb-1 block text-purple-400">Jan 2026 – Present</span>
                  <h4 className="text-sm font-bold text-white">Full Stack Developer</h4>
                  <p className="text-xs text-white/50 mt-1">Virtual Solution Path (Freelance)</p>
                  <p className="text-xs md:text-sm text-white/40 mt-2 leading-relaxed line-clamp-3 md:line-clamp-none">Designing and maintaining a high-performance educational platform. Focused on building a modern, SEO-optimized user interface and managing site architecture.</p>
                </div>
              </div>
            </div>
          </ScrollReveal>
          
           {/* Entry 3 */}
          <ScrollReveal direction="right" delay={0.2} className="w-full">
            <div className="tl-entry relative grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-4 md:gap-8 opacity-0 translate-y-8 transition-all duration-700 ease-out mb-8 md:mb-12">
              <div className="tl-dot absolute left-5 md:static md:left-1/2 -translate-x-1/2 top-5 md:top-0 md:mt-6 z-10 w-3 h-3 rounded-full bg-purple-500 md:mx-auto order-1 md:order-2" />
              
              <div className="ml-8 md:ml-0 md:text-right order-2 md:order-1 flex md:justify-end">
                <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-4 md:p-6 inline-block text-left w-full max-w-md overflow-hidden break-words">
                  <span className="text-xs font-mono mb-1 block text-purple-400">2025 – Present</span>
                  <h4 className="text-sm font-bold text-white">Web & Algorithmic Trading Developer</h4>
                  <p className="text-xs text-white/50 mt-1">Self-Employed</p>
                  <p className="text-xs md:text-sm text-white/40 mt-2 leading-relaxed line-clamp-3 md:line-clamp-none">Building production-ready web applications including Mardaan Store, and developing automated MQL5 trading bots for financial markets.</p>
                </div>
              </div>
              <div className="hidden md:block order-3"></div>
            </div>
          </ScrollReveal>

        </div>
      </div>
    </section>
  );
}
