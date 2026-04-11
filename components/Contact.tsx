'use client';

import { useEffect, useRef, useState, FormEvent } from 'react';

export default function Contact() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sendBtnRef = useRef<HTMLButtonElement>(null);

  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Setup Burst trigger ref to call it from React submit
  const triggerBurst = useRef<() => void>(() => {});

  useEffect(() => {
    if (!containerRef.current || !canvasRef.current) return;
    const container = containerRef.current;
    const section = container; 
    let started = false;
    let animId: number;

    const canvas = canvasRef.current;
    
    let mouseX = -9999;
    let mouseY = -9999;
    let mouseIn = false;

    function onMouseMove(e: MouseEvent) {
      const rect = section.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
      mouseIn = true;
    }
    function onMouseLeave() {
      mouseIn = false;
    }

    function initCanvas() {
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      function resize() {
        if (!container || !canvas) return;
        canvas.width = container.offsetWidth;
        canvas.height = container.offsetHeight;
      }
      resize();
      window.addEventListener('resize', resize);

      const NETWORK_COUNT = 90;
      const networkParticles: any[] = [];
      for (let i = 0; i < NETWORK_COUNT; i++) {
        networkParticles.push({
          x: Math.random() * (canvas.width || 800),
          y: Math.random() * (canvas.height || 600),
          vx: (Math.random() - 0.5) * 0.8,
          vy: (Math.random() - 0.5) * 0.8,
          r: 1 + Math.random(),
        });
      }

      const burstParticles: any[] = [];

      function sendBurst() {
        const cx = canvas?.width ? canvas.width / 2 : 400;
        const cy = canvas?.height ? canvas.height / 2 : 300;
        for (let i = 0; i < 50; i++) {
          const angle = Math.random() * Math.PI * 2;
          const speed = 2 + Math.random() * 5;
          burstParticles.push({
            x: cx, y: cy,
            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed,
            life: 60,
            r: 1.5 + Math.random() * 2.5,
            color: ['#818cf8', '#22d3ee', '#c084fc'][Math.floor(Math.random() * 3)],
          });
        }
      }
      triggerBurst.current = sendBurst;

      section.addEventListener('mousemove', onMouseMove);
      section.addEventListener('mouseleave', onMouseLeave);

      function animate() {
        animId = requestAnimationFrame(animate);
        if (!ctx || !canvas) return;
        const w = canvas.width;
        const h = canvas.height;
        ctx.clearRect(0, 0, w, h);

        for (const p of networkParticles) {
          if (mouseIn) {
            const dx = mouseX - p.x;
            const dy = mouseY - p.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 120 && dist > 0.1) {
              p.vx += (dx / dist) * 0.15;
              p.vy += (dy / dist) * 0.15;
            }
          }
          p.vx *= 0.97;
          p.vy *= 0.97;
          p.x += p.vx;
          p.y += p.vy;

          if (p.x < 0) { p.x = 0; p.vx *= -1; }
          if (p.x > w) { p.x = w; p.vx *= -1; }
          if (p.y < 0) { p.y = 0; p.vy *= -1; }
          if (p.y > h) { p.y = h; p.vy *= -1; }
        }

        for (let i = 0; i < networkParticles.length; i++) {
          for (let j = i + 1; j < networkParticles.length; j++) {
            const a = networkParticles[i];
            const b = networkParticles[j];
            const dx = a.x - b.x;
            const dy = a.y - b.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 80) {
              ctx.beginPath();
              ctx.moveTo(a.x, a.y);
              ctx.lineTo(b.x, b.y);
              ctx.strokeStyle = `rgba(129, 140, 248, ${(1 - dist / 80) * 0.12})`;
              ctx.lineWidth = 0.5;
              ctx.stroke();
            }
          }
        }

        for (const p of networkParticles) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(129, 140, 248, 0.35)';
          ctx.fill();
        }

        for (let i = burstParticles.length - 1; i >= 0; i--) {
          const p = burstParticles[i];
          p.x += p.vx;
          p.y += p.vy;
          p.vy += 0.05;
          p.life -= 1;

          if (p.life <= 0) {
            burstParticles.splice(i, 1);
            continue;
          }

          ctx.globalAlpha = p.life / 60;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
          ctx.fillStyle = p.color;
          ctx.fill();
        }
        ctx.globalAlpha = 1;
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
    
    observer.observe(container);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(animId);
      section.removeEventListener('mousemove', onMouseMove);
      section.removeEventListener('mouseleave', onMouseLeave);
      // Clean up resize inside, though it's technically orphaned in closure if not executed
      // Safer clean up approach for window events in React:
    };
  }, []);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg('');

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      message: formData.get('message') as string,
    };

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        throw new Error('Failed to send message');
      }

      setIsSuccess(true);
      triggerBurst.current(); // trigger the canvas burst manually
    } catch (err: any) {
      setErrorMsg(err.message || 'An error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section ref={containerRef} className="relative py-16 md:py-24 px-4 overflow-hidden" id="contact">
      <canvas ref={canvasRef} className="absolute inset-0 z-0 pointer-events-none w-full h-full" />
      
      <div className="relative z-10 max-w-lg mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4">Get In Touch</h2>
          <div className="w-16 h-1 mx-auto rounded-full mb-4 bg-purple-500"></div>
          <p className="text-white/50 text-sm">Let's collaborate on your next architectural masterpiece.</p>
        </div>

        <div className="glass-card p-8 rounded-3xl border border-white/10 relative overflow-hidden">
          {/* Subtle glow behind form */}
          <div className="absolute top-0 right-0 w-48 h-48 bg-purple-500/10 rounded-full blur-3xl pointer-events-none"></div>

          {isSuccess ? (
             <div className="flex flex-col items-center justify-center py-12 space-y-4 text-center">
               <div className="w-16 h-16 rounded-full bg-green-500/20 text-green-400 flex items-center justify-center">
                 <span className="material-symbols-outlined text-3xl">check</span>
               </div>
               <h3 className="text-2xl font-bold text-white">Message Sent!</h3>
               <p className="text-white/60">I'll get back to you as soon as possible.</p>
               <button 
                 onClick={() => setIsSuccess(false)}
                 className="mt-4 px-6 py-2 border border-white/10 rounded-full text-white/70 hover:text-white hover:bg-white/5 transition-all text-sm"
               >
                 Send another message
               </button>
             </div>
          ) : (
            <form className="space-y-6 relative z-10" onSubmit={handleSubmit}>
              <div>
                <label className="text-[10px] uppercase font-bold tracking-widest text-slate-500 mb-2 block">Your Name</label>
                <div className="relative group">
                  <input 
                    name="name"
                    required
                    placeholder="John Doe" 
                    type="text" 
                    className="w-full bg-transparent border-b border-white/10 py-3 text-white focus:outline-none focus:border-purple-500 transition-colors placeholder:text-white/20 peer"
                  />
                  <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-purple-500 peer-focus:w-full transition-all duration-300"></div>
                </div>
              </div>
              <div>
                <label className="text-[10px] uppercase font-bold tracking-widest text-slate-500 mb-2 block">Your Email</label>
                <div className="relative group">
                  <input 
                    name="email"
                    required
                    placeholder="john@example.com" 
                    type="email" 
                    className="w-full bg-transparent border-b border-white/10 py-3 text-white focus:outline-none focus:border-purple-500 transition-colors placeholder:text-white/20 peer"
                  />
                  <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-purple-500 peer-focus:w-full transition-all duration-300"></div>
                </div>
              </div>
              <div>
                <label className="text-[10px] uppercase font-bold tracking-widest text-slate-500 mb-2 block">Message</label>
                <div className="relative group">
                  <textarea 
                    name="message"
                    required
                    placeholder="Tell me about your project..." 
                    rows={4} 
                    className="w-full bg-transparent border-b border-white/10 py-3 text-white focus:outline-none focus:border-purple-500 transition-colors placeholder:text-white/20 peer resize-none"
                  ></textarea>
                  <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-purple-500 peer-focus:w-full transition-all duration-300"></div>
                </div>
              </div>

              {errorMsg && (
                <div className="text-red-400 text-sm font-medium">{errorMsg}</div>
              )}

              <button 
                ref={sendBtnRef}
                type="submit" 
                disabled={isLoading}
                className="w-full h-14 bg-white text-black font-bold rounded-xl flex items-center justify-center gap-2 hover:bg-gray-200 transition-colors active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Sending...' : 'Send Message'}
                {!isLoading && <span className="material-symbols-outlined text-[18px]">send</span>}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
