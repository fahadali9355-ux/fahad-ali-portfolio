'use client';

import Link from 'next/link';
import { FormEvent, useState } from 'react';
import ScrollReveal from './ScrollReveal';

export default function Footer() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

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
    } catch (err: any) {
      setErrorMsg(err.message || 'An error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <footer className="relative w-full bg-transparent overflow-hidden">
      {/* Top neon divider line */}
      <div 
        className="w-full hpx bg-gradient-to-r from-transparent via-purple-500 to-cyan-500" 
        style={{ background: 'linear-gradient(90deg, transparent, #818cf8, #22d3ee, transparent)', height: '1px' }} 
      />

      {/* TOP CONTENT */}
      <div className="max-w-7xl mx-auto py-16 px-6 md:px-20 grid grid-cols-1 lg:grid-cols-5 gap-12">
        
        {/* LEFT — col-span-2 */}
        <ScrollReveal direction="fade" delay={0.1} className="lg:col-span-2 flex flex-col justify-start">
          <div className="flex items-center gap-4 mb-2">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-600 to-cyan-500 p-px">
              <div className="bg-[#0a0a0f] w-full h-full rounded-[11px] overflow-hidden">
                <img src="/FA.jpeg" alt="FA" className="w-full h-full object-cover opacity-90" />
              </div>
            </div>
            <span className="text-3xl font-bold text-white tracking-tight">Fahad Ali</span>
          </div>
          
          <p className="text-purple-400 text-lg font-medium mt-2">
            Full Stack Developer & MERN Specialist
          </p>
          
          <p className="text-white/50 text-sm mt-4 max-w-sm leading-relaxed mb-8">
            Building scalable web applications and algorithmic trading solutions.
          </p>
          
          <div className="flex gap-4 mb-8">
            <a href="https://github.com/fahadali9355-ux" target="_blank" rel="noreferrer" 
              className="w-11 h-11 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center transition-all duration-300 cursor-pointer hover:border-white/60 hover:bg-white/10 hover:shadow-[0_0_15px_rgba(255,255,255,0.2)] hover:-translate-y-[3px] text-white/60 hover:text-white">
              <svg className="w-5 h-5 fill-current transition-colors duration-300" viewBox="0 0 24 24">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
              </svg>
            </a>
            <a href="https://www.linkedin.com/in/fahad-ali-a5591734b/" target="_blank" rel="noreferrer" 
              className="w-11 h-11 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center transition-all duration-300 cursor-pointer hover:border-[#0077b5]/60 hover:bg-[#0077b5]/10 hover:shadow-[0_0_15px_rgba(0,119,181,0.3)] hover:-translate-y-[3px] text-white/60 hover:text-[#0077b5]">
              <svg className="w-5 h-5 fill-current transition-colors duration-300" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>
            <a href="https://instagram.com/FahadTechStack" target="_blank" rel="noreferrer" 
              className="w-11 h-11 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center transition-all duration-300 cursor-pointer hover:border-[#e1306c]/60 hover:bg-[#e1306c]/10 hover:shadow-[0_0_15px_rgba(225,48,108,0.3)] hover:-translate-y-[3px] text-white/60 hover:text-[#e1306c]">
              <svg className="w-5 h-5 fill-current transition-colors duration-300" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>
              </svg>
            </a>
            <a href="https://www.facebook.com/profile.php?id=61583673158036" target="_blank" rel="noreferrer" 
              className="w-11 h-11 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center transition-all duration-300 cursor-pointer hover:border-[#1877f2]/60 hover:bg-[#1877f2]/10 hover:shadow-[0_0_15px_rgba(24,119,242,0.3)] hover:-translate-y-[3px] text-white/60 hover:text-[#1877f2]">
              <svg className="w-5 h-5 fill-current transition-colors duration-300" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </a>
          </div>
          
          <div className="flex flex-col gap-2">
            <a href="mailto:fahadali9355@gmail.com" className="flex items-center gap-2 text-sm text-white/50 hover:text-white/80 transition-colors duration-300">
              <span className="material-symbols-outlined text-[16px]">mail</span>
              fahadali9355@gmail.com
            </a>
            <a href="https://instagram.com/FahadTechStack" className="flex items-center gap-2 text-sm text-white/50 hover:text-white/80 transition-colors duration-300">
              <span className="material-symbols-outlined text-[16px]">alternate_email</span>
              @FahadTechStack
            </a>
          </div>

          <div className="inline-flex items-center gap-2 mt-6 px-3 py-1.5 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
            Available for work
          </div>
        </ScrollReveal>

        {/* CENTER — col-span-1 — Quick Links */}
        <ScrollReveal direction="fade" delay={0.2} className="lg:col-span-1">
          <h4 className="text-xs uppercase tracking-[3px] text-white/30 mb-6 font-bold">Links</h4>
          <div className="flex flex-col">
            {['Home', 'Projects', 'Contact', 'Blog', 'Links'].map((item) => (
              <a 
                key={item} 
                href={item === 'Links' ? '/links' : (item === 'Blog' ? '/blog' : `/#${item.toLowerCase()}`)}
                className="group w-fit text-sm text-white/50 mb-3 hover:text-purple-400 hover:translate-x-1 transition-all duration-300 flex items-center gap-0"
              >
                <span className="opacity-0 w-0 overflow-hidden group-hover:opacity-100 group-hover:w-4 transition-all duration-300 inline-block text-xs">→</span>
                {item}
              </a>
            ))}
          </div>
        </ScrollReveal>

        {/* RIGHT — col-span-2 — Contact Form Card */}
        <ScrollReveal direction="fade" delay={0.3} className="lg:col-span-2">
          <div className="bg-white/[0.03] border border-white/[0.08] rounded-2xl p-8 h-full">
            <h2 className="text-2xl font-bold shimmer-text relative z-10 w-fit">Get In Touch</h2>
            <p className="text-sm text-white/40 mb-6">Let's collaborate on your next project</p>
            
            {isSuccess ? (
              <div className="flex flex-col items-center justify-center space-y-4 text-center h-full min-h-[250px]">
                <div className="w-16 h-16 rounded-full bg-green-500/10 text-green-400 flex items-center justify-center mb-2">
                  <span className="material-symbols-outlined text-3xl">check</span>
                </div>
                <h3 className="text-xl font-bold text-green-400">Message sent!</h3>
                <button 
                  onClick={() => setIsSuccess(false)}
                  className="mt-4 px-6 py-2.5 bg-white/5 border border-white/10 rounded-full text-white/70 hover:text-white hover:bg-white/10 transition-all text-sm font-medium"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="relative z-10 w-full">
                <input 
                  name="name"
                  required
                  placeholder="Name" 
                  type="text" 
                  className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white w-full outline-none mb-4 focus:border-purple-500/50 focus:shadow-[0_0_15px_rgba(129,140,248,0.15)] focus:bg-purple-500/5 transition-all duration-300 placeholder:text-white/30"
                />
                <input 
                  name="email"
                  required
                  placeholder="Email" 
                  type="email" 
                  className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white w-full outline-none mb-4 focus:border-purple-500/50 focus:shadow-[0_0_15px_rgba(129,140,248,0.15)] focus:bg-purple-500/5 transition-all duration-300 placeholder:text-white/30"
                />
                <textarea 
                  name="message"
                  required
                  placeholder="Message" 
                  rows={4} 
                  className="h-28 resize-none bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white w-full outline-none mb-4 focus:border-purple-500/50 focus:shadow-[0_0_15px_rgba(129,140,248,0.15)] focus:bg-purple-500/5 transition-all duration-300 placeholder:text-white/30"
                ></textarea>

                {errorMsg && (
                  <div className="text-red-400 text-sm font-medium mb-4">{errorMsg}</div>
                )}

                <button 
                  type="submit" 
                  disabled={isLoading}
                  className="group w-full py-3.5 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl text-white font-semibold text-sm relative overflow-hidden transition-all hover:bg-gradient-to-r hover:from-purple-500 hover:to-indigo-500 hover:shadow-[0_0_25px_rgba(129,140,248,0.4)] hover:-translate-y-px disabled:opacity-50 disabled:hover:-translate-y-0 disabled:hover:shadow-none disabled:cursor-not-allowed"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    {isLoading ? (
                      <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    ) : (
                      <>
                        Send Message <span className="transition-transform group-hover:translate-x-1 inline-block">→</span>
                      </>
                    )}
                  </span>
                </button>
              </form>
            )}
          </div>
        </ScrollReveal>
      </div>

      {/* BOTTOM BAR */}
      <div className="border-t border-white/5 py-6 px-6 md:px-20 flex justify-between items-center flex-wrap gap-4">
        <p className="text-xs text-white/20">
          © 2026 Fahad Ali. All rights reserved.
        </p>
        <p className="text-xs text-white/20">
          Crafted with Next.js, Three.js & ☕
        </p>
      </div>
    </footer>
  );
}
