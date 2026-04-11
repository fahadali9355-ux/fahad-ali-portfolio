'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    // Scroll events for background and progress bar
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);
      
      const windowHeight = window.innerHeight;
      const documentHeight = document.body.scrollHeight;
      const progress = (window.scrollY / (documentHeight - windowHeight)) * 100;
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Intersection Observer for active sections
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, { threshold: 0.4 });

    const sections = document.querySelectorAll('section[id]');
    sections.forEach(section => observer.observe(section));

    return () => {
      window.removeEventListener('scroll', handleScroll);
      sections.forEach(section => observer.unobserve(section));
    };
  }, []);

  const navLinks = [
    { name: 'Home', href: '/#home' },
    { name: 'About', href: '/#about' },
    { name: 'Skills', href: '/#skills' },
    { name: 'Projects', href: '/#projects' },
    { name: 'Experience', href: '/#experience' },
    { name: 'Contact', href: '/#contact' },
    { name: 'Blog', href: '/blog' },
    { name: 'Links', href: '/links' },
  ];

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('/#')) {
      e.preventDefault();
      const targetId = href.substring(2);
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth' });
        setMenuOpen(false);
        // Also update URL without strict jump
        window.history.pushState(null, '', `/#${targetId}`);
      } else {
        // If we're not on the homepage and clicking a hash link, go to homepage hash
        window.location.href = href;
      }
    }
  };

  return (
    <>
      {/* Scroll Progress Bar */}
      <div 
        className="fixed top-0 left-0 h-[2px] z-[100] transition-all duration-75"
        style={{ 
          width: `${scrollProgress}%`, 
          background: 'linear-gradient(90deg, #818cf8, #22d3ee)' 
        }}
      />

      {/* Desktop Navbar */}
      <header className={`fixed top-0 w-full z-50 transition-colors duration-300 backdrop-blur-md ${scrolled ? 'bg-[#0a0a0f]/90 border-b border-white/5' : 'bg-transparent'}`}>
        <div className="flex justify-between items-center px-6 py-3.5 max-w-7xl mx-auto">
          {/* Logo */}
          <Link href="/#home" onClick={(e) => handleSmoothScroll(e, '/#home')} className="flex items-center gap-3 relative z-50">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-600 to-indigo-600 flex items-center justify-center text-white font-bold text-xs">OP</div>
            <span className="text-sm font-semibold text-white hidden sm:inline tracking-tight">Obsidian Pulse</span>
          </Link>
          
          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map(link => {
              const isActiveId = link.href.startsWith('/#') && activeSection === link.href.substring(2);
              // if it's a relative path like /blog, we need a different check, but activeSection deals with IDs mainly.
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleSmoothScroll(e, link.href)}
                  className={`relative text-sm transition-colors duration-200 ${isActiveId ? 'text-purple-400 font-medium' : 'text-white/60 hover:text-white'}`}
                >
                  {link.name}
                  {isActiveId && (
                    <span className="absolute -bottom-[6px] left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-purple-400 animate-pulse" />
                  )}
                </Link>
              );
            })}
          </nav>
          
          {/* Mobile Hamburger */}
          <button 
            onClick={() => setMenuOpen(true)}
            className="md:hidden w-10 h-10 flex items-center justify-center text-white/70 hover:text-white relative z-50"
          >
            <span className="material-symbols-outlined">menu</span>
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 bg-[#0a0a0f]/95 backdrop-blur-xl z-[60] flex flex-col items-center justify-center gap-6 transition-all duration-300 ${menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        <button 
          onClick={() => setMenuOpen(false)}
          className="absolute top-6 right-6 text-white/70 hover:text-white"
        >
          <span className="material-symbols-outlined text-3xl">close</span>
        </button>
        
        {navLinks.map(link => (
          <Link
            key={link.name}
            href={link.href}
            onClick={(e) => handleSmoothScroll(e, link.href)}
            className="text-2xl font-bold text-white/80 hover:text-purple-400 transition-colors"
          >
            {link.name}
          </Link>
        ))}
      </div>
    </>
  );
}
