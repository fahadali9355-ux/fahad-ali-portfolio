'use client';

import { useEffect, useRef } from 'react';

export default function Skills() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const el = containerRef.current;
    
    let started = false;
    let animId: number;
    let resizeObserver: ResizeObserver;
    let canvas: HTMLCanvasElement;
    
    let mouseX = -9999;
    let mouseY = -9999;
    let mouseIn = false;

    function onMouseMove(e: MouseEvent) {
      const rect = el.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
      mouseIn = true;
    }

    function onMouseLeave() {
      mouseIn = false;
    }

    function initCanvas() {
      canvas = document.createElement('canvas');
      canvas.style.position = 'absolute';
      canvas.style.inset = '0';
      canvas.style.width = '100%';
      canvas.style.height = '100%';
      el.style.position = 'relative';
      el.appendChild(canvas);

      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const palette = ['#818cf8', '#22d3ee', '#c084fc', '#f472b6', '#34d399'];
      const labels = [
        'React', 'Next.js', 'TypeScript', 'Node.js',
        'Docker', 'MongoDB', 'PostgreSQL', 'Prisma',
        'Tailwind', 'Git', 'Redis', 'GraphQL',
      ];

      const SIZE = 34;
      const icons = labels.map((label, i) => ({
        label,
        color: palette[i % palette.length],
        size: SIZE,
        ox: 0, oy: 0,
        x: 0, y: 0,
        vx: 0, vy: 0,
        phase: Math.random() * Math.PI * 2,
      }));

      function spreadOrigins(newWidth: number, newHeight: number) {
        const cols = window.innerWidth < 640 ? 3 : window.innerWidth < 1024 ? 4 : 6;
        const rows = Math.ceil(icons.length / cols);
        const cellW = newWidth / cols;
        const cellH = newHeight / rows;

        icons.forEach((icon, i) => {
          icon.ox = cellW * (i % cols) + cellW / 2;
          icon.oy = cellH * Math.floor(i / cols) + cellH / 2;
          // If not initialized, or if we want to snap
          if (icon.x === 0 && icon.y === 0) {
            icon.x = icon.ox;
            icon.y = icon.oy;
          }
        });
      }

      function resize() {
        if (!el || !canvas) return;
        canvas.width = el.offsetWidth;
        canvas.height = el.offsetHeight;
        spreadOrigins(canvas.width, canvas.height);
      }
      
      // Initial setup
      resize();

      resizeObserver = new ResizeObserver((entries) => {
        for (let entry of entries) {
          if (entry.target === el) resize();
        }
      });
      resizeObserver.observe(el);

      el.addEventListener('mousemove', onMouseMove);
      el.addEventListener('mouseleave', onMouseLeave);

      function roundedRect(x: number, y: number, w: number, h: number, r: number) {
        if (!ctx) return;
        ctx.beginPath();
        ctx.moveTo(x + r, y);
        ctx.lineTo(x + w - r, y);
        ctx.quadraticCurveTo(x + w, y, x + w, y + r);
        ctx.lineTo(x + w, y + h - r);
        ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
        ctx.lineTo(x + r, y + h);
        ctx.quadraticCurveTo(x, y + h, x, y + h - r);
        ctx.lineTo(x, y + r);
        ctx.quadraticCurveTo(x, y, x + r, y);
        ctx.closePath();
      }

      let t = 0;

      function animate() {
        animId = requestAnimationFrame(animate);
        if (!ctx || !canvas) return;
        t += 0.016;

        const w = canvas.width;
        const h = canvas.height;
        ctx.clearRect(0, 0, w, h);

        const s = window.innerWidth < 640 ? 26 : 34;
        const fontSize = window.innerWidth < 640 ? '9px' : '10px';

        for (const icon of icons) {
          const currentSize = s;

          const tx = icon.ox + Math.sin(t + icon.phase) * 20;
          const ty = icon.oy + Math.cos(t * 0.65 + icon.phase) * 14;

          icon.vx += (tx - icon.x) * 0.025;
          icon.vy += (ty - icon.y) * 0.025;

          let isHover = false;
          if (mouseIn) {
            const dx = mouseX - icon.x;
            const dy = mouseY - icon.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 160 && dist > 0.1) {
              const strength = Math.pow(1 - dist / 160, 2) * 1.2;
              icon.vx += (dx / dist) * strength;
              icon.vy += (dy / dist) * strength;
              if (dist < 90) isHover = true;
            }
          }

          icon.vx *= 0.82;
          icon.vy *= 0.82;
          icon.x += icon.vx;
          icon.y += icon.vy;

          const cardW = currentSize * 2.6;
          const cardH = currentSize * 1.4;
          const cx = icon.x - cardW / 2;
          const cy = icon.y - cardH / 2;

          if (isHover) {
            ctx.shadowColor = icon.color;
            ctx.shadowBlur = 16;
          } else {
            ctx.shadowColor = 'transparent';
            ctx.shadowBlur = 0;
          }

          roundedRect(cx, cy, cardW, cardH, 8);
          ctx.fillStyle = 'rgba(10, 10, 20, 0.8)';
          ctx.fill();

          roundedRect(cx, cy, cardW, cardH, 8);
          ctx.strokeStyle = icon.color;
          ctx.lineWidth = isHover ? 1.2 : 0.6;
          ctx.globalAlpha = isHover ? 0.9 : 0.5;
          ctx.stroke();
          ctx.globalAlpha = 1;

          ctx.shadowColor = 'transparent';
          ctx.shadowBlur = 0;

          ctx.font = `500 ${fontSize} Inter, sans-serif`;
          ctx.fillStyle = isHover ? icon.color : 'rgba(255, 255, 255, 0.65)';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText(icon.label, icon.x, icon.y);
        }
      }

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
      cancelAnimationFrame(animId);
      el.removeEventListener('mousemove', onMouseMove);
      el.removeEventListener('mouseleave', onMouseLeave);
      if (resizeObserver) resizeObserver.disconnect();
      if (canvas && canvas.parentNode) canvas.parentNode.removeChild(canvas);
    };
  }, []);

  return (
    <section className="relative py-16 px-4 overflow-hidden" id="skills">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white inline-block">Skills & Technologies</h2>
          <div className="w-16 h-1 mt-3 mx-auto rounded-full bg-purple-500"></div>
        </div>
        <div ref={containerRef} className="relative w-full h-64 sm:h-72 md:h-80 lg:h-96" />
      </div>
    </section>
  );
}
