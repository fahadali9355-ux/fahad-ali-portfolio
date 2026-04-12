'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import ScrollReveal from './ScrollReveal';

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!containerRef.current || !sectionRef.current) return;
    const el = containerRef.current;
    const section = sectionRef.current;

    let started = false;
    let animFrameId: number;
    let points: { x: number, y: number, z: number }[] = [];
    let canvas: HTMLCanvasElement;
    let ctx: CanvasRenderingContext2D | null;
    let magCards: NodeListOf<HTMLElement>;
    let cardStates: { cx: number, cy: number, tx: number, ty: number }[];

    let mouseX = -9999;
    let mouseY = -9999;
    let mouseInSection = false;

    function onMouseMove(e: MouseEvent) {
      if (!section) return;
      const rect = section.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
      mouseInSection = true;
    }

    function onMouseLeave() {
      mouseInSection = false;
    }

    function resizeCanvas() {
      if (!canvas || !el) return;
      canvas.width = el.offsetWidth;
      canvas.height = el.offsetHeight;
    }

    let rotationY = 0;
    function animate() {
      animFrameId = requestAnimationFrame(animate);
      if (!ctx || !canvas) return;

      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);

      const centerX = w * 0.78;
      const centerY = h * 0.28;

      rotationY += 0.003;
      const cosR = Math.cos(rotationY);
      const sinR = Math.sin(rotationY);

      const SPHERE_RADIUS = 130;

      for (let i = 0; i < points.length; i++) {
        const p = points[i];
        const rx = p.x * cosR + p.z * sinR;
        const ry = p.y;
        const rz = -p.x * sinR + p.z * cosR;

        const perspective = 200;
        const scale = perspective / (perspective + rz);
        const sx = centerX + rx * scale;
        const sy = centerY + ry * scale;

        const normalizedZ = (rz + SPHERE_RADIUS) / (2 * SPHERE_RADIUS);
        const alpha = 0.08 + normalizedZ * 0.55;
        const dotRadius = 1.4 * scale;

        ctx.beginPath();
        ctx.arc(sx, sy, dotRadius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(129, 140, 248, ${alpha})`;
        ctx.fill();
      }

      for (let i = 0; i < magCards.length; i++) {
        const card = magCards[i];
        const state = cardStates[i];

        if (mouseInSection && section) {
          const sectionRect = section.getBoundingClientRect();
          const cardRect = card.getBoundingClientRect();
          const cardCenterX = cardRect.left - sectionRect.left + cardRect.width / 2;
          const cardCenterY = cardRect.top - sectionRect.top + cardRect.height / 2;

          const dx = mouseX - cardCenterX;
          const dy = mouseY - cardCenterY;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 200) {
            const strength = Math.pow(1 - dist / 200, 2) * 18;
            state.tx = (dx / dist) * strength;
            state.ty = (dy / dist) * strength;
          } else {
            state.tx = 0; state.ty = 0;
          }
        } else {
          state.tx = 0; state.ty = 0;
        }

        state.cx += (state.tx - state.cx) * 0.06;
        state.cy += (state.ty - state.cy) * 0.06;

        const displacement = Math.sqrt(state.cx * state.cx + state.cy * state.cy);
        const glowIntensity = Math.min(displacement / 18, 1);
        const glowSpread = 8 + glowIntensity * 16;
        const glowAlpha = (glowIntensity * 0.35).toFixed(3);

        card.style.transform = `translate(${state.cx.toFixed(2)}px, ${state.cy.toFixed(2)}px)`;
        card.style.boxShadow = glowIntensity > 0.01
          ? `0 0 ${glowSpread}px rgba(129, 140, 248, ${glowAlpha}), inset 0 0 ${glowSpread * 0.5}px rgba(129, 140, 248, ${(Number(glowAlpha) * 0.3).toFixed(3)})`
          : '';
        card.style.transition = 'none';
      }
    }

    function initCanvas() {
      canvas = document.createElement('canvas');
      canvas.style.position = 'absolute';
      canvas.style.inset = '0';
      canvas.style.width = '100%';
      canvas.style.height = '100%';
      canvas.style.pointerEvents = 'none';
      el.appendChild(canvas);

      ctx = canvas.getContext('2d');
      if (!ctx) return;

      resizeCanvas();

      const POINT_COUNT = 110;
      const SPHERE_RADIUS = 130;
      for (let i = 0; i < POINT_COUNT; i++) {
        const phi = Math.acos(1 - (2 * (i + 0.5)) / POINT_COUNT);
        const theta = Math.PI * (1 + Math.sqrt(5)) * i;
        points.push({
          x: SPHERE_RADIUS * Math.sin(phi) * Math.cos(theta),
          y: SPHERE_RADIUS * Math.sin(phi) * Math.sin(theta),
          z: SPHERE_RADIUS * Math.cos(phi),
        });
      }

      magCards = section.querySelectorAll('.mag-card') as NodeListOf<HTMLElement>;
      cardStates = Array.from(magCards).map(() => ({
        cx: 0, cy: 0, tx: 0, ty: 0,
      }));

      section.addEventListener('mousemove', onMouseMove);
      section.addEventListener('mouseleave', onMouseLeave);
      window.addEventListener('resize', resizeCanvas);

      animate();
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started) {
        started = true;
        initCanvas();
        observer.disconnect();
      }
    }, { threshold: 0.1 });
    observer.observe(el);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(animFrameId);
      section.removeEventListener('mousemove', onMouseMove);
      section.removeEventListener('mouseleave', onMouseLeave);
      window.removeEventListener('resize', resizeCanvas);
      if (magCards) {
        Array.from(magCards).forEach(card => {
          card.style.transform = '';
          card.style.boxShadow = '';
          card.style.transition = '';
        });
      }
      if (canvas && canvas.parentNode) canvas.parentNode.removeChild(canvas);
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative overflow-hidden py-16 md:py-24 px-4 md:px-8 lg:px-16" id="about">
      <div ref={containerRef} className="absolute inset-0 z-0 pointer-events-none opacity-40">
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl"></div>
      </div>
      <div className="relative z-10 max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <ScrollReveal direction="right" delay={0.2} duration={1.5} className="relative w-full aspect-[3/4] rounded-2xl overflow-hidden border border-white/10">
          <Image
            src="/profile.png"
            alt="Fahad Ali"
            fill
            className="object-cover object-top"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          <div className="absolute bottom-0 left-0 p-6">
            <h3 className="text-white font-bold text-xl">Fahad Ali</h3>
            <p className="text-purple-400 text-sm mt-1">Full Stack Developer</p>
          </div>
        </ScrollReveal>
        <div>
          <ScrollReveal direction="blur" delay={0.1}>
            <h2 className="text-3xl md:text-4xl font-bold text-white">About Me</h2>
            <div className="w-16 h-1 mt-3 mb-6 rounded-full bg-purple-500"></div>
          </ScrollReveal>
          
          <ScrollReveal direction="up" delay={0.3}>
            <p className="text-white/60 leading-relaxed max-w-lg mb-4">
              I am a dedicated Full Stack Developer with a strong foundation in the MERN stack and Next.js, focused on building scalable, user-centric web applications like educational systems and e-commerce platforms.
            </p>
            <p className="text-white/60 leading-relaxed max-w-lg">
              Beyond the web, I bridge the gap between technology and finance by developing automated algorithmic trading solutions. I thrive on solving complex problems with clean, efficient code and am constantly evolving my craft through emerging technologies.
            </p>

            <div className="mt-6 mb-8">
              <a 
                href="#contact"
                onClick={(e) => { e.preventDefault(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }) }}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-purple-500/50 text-purple-400 hover:bg-purple-500/10 transition-all duration-300"
              >
                Let's Connect →
              </a>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-2 gap-4">
            <ScrollReveal direction="scale" delay={0.1}>
              <div className="mag-card bg-white/5 border border-white/10 rounded-xl p-6 will-change-transform h-full">
                <span className="block text-3xl font-black mb-1 text-primary-container">4+</span>
                <span className="text-xs uppercase tracking-widest text-slate-400 font-bold">Projects Built</span>
              </div>
            </ScrollReveal>
            <ScrollReveal direction="scale" delay={0.2}>
              <div className="mag-card bg-white/5 border border-white/10 rounded-xl p-6 will-change-transform h-full">
                <span className="block text-3xl font-black mb-1 text-primary-container">6mo+</span>
                <span className="text-xs uppercase tracking-widest text-slate-400 font-bold">Experience</span>
              </div>
            </ScrollReveal>
            <ScrollReveal direction="scale" delay={0.3}>
              <div className="mag-card bg-white/5 border border-white/10 rounded-xl p-6 will-change-transform h-full">
                <span className="block text-3xl font-black mb-1 text-primary-container">12+</span>
                <span className="text-xs uppercase tracking-widest text-slate-400 font-bold">Technologies</span>
              </div>
            </ScrollReveal>
            <ScrollReveal direction="scale" delay={0.4}>
              <div className="mag-card bg-white/5 border border-white/10 rounded-xl p-6 will-change-transform h-full">
                <span className="block text-3xl font-black mb-1 text-primary-container">5+</span>
                <span className="text-xs uppercase tracking-widest text-slate-400 font-bold">Deployed Apps</span>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
