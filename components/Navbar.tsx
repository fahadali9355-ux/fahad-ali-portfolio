'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

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
    { name: 'Projects', href: '/#projects' },
    { name: 'Contact', href: '/#contact' },
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
      <header className={`fixed top-3 left-0 right-0 mx-auto w-[calc(100%-2rem)] max-w-[95vw] z-50 transition-all duration-300 rounded-2xl ${scrolled ? 'bg-[#0a0a0f]/60 backdrop-blur-[20px] border border-white/[0.08]' : 'bg-transparent border border-transparent'}`}>
        <div className="flex justify-between items-center px-6 py-3.5 w-full">
          {/* Logo */}
          <div className="w-32 md:w-40 flex-shrink-0">
            <Link href="/#home" onClick={(e) => handleSmoothScroll(e, '/#home')} className="flex items-center gap-3 w-fit">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br flex items-center justify-center text-white font-bold text-xs"><img src="/FA.jpeg" alt="" /></div>
              <span className="text-sm font-semibold text-white hidden sm:inline tracking-tight">Fahad Ali</span>
            </Link>
          </div>
          
          {/* Desktop Nav */}
          <nav className="hidden md:flex flex-1 items-center justify-center gap-8">
            {navLinks.map(link => {
              const isActiveId = link.href.startsWith('/#') && activeSection === link.href.substring(2);
              return (
                <motion.a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleSmoothScroll(e, link.href)}
                  className={`relative px-4 py-2 text-sm rounded-lg overflow-hidden group ${isActiveId ? 'text-purple-400' : 'text-white/60'}`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                >
                  {/* Background glow on hover */}
                  <span className="absolute inset-0 rounded-lg bg-purple-500/0 group-hover:bg-purple-500/10 transition-all duration-500" />
                
                  {/* Animated border */}
                  <span className="absolute inset-0 rounded-lg border border-transparent group-hover:border-purple-500/30 transition-all duration-500" />
                
                  {/* Text */}
                  <span className={`relative z-10 transition-colors duration-300 ${isActiveId ? 'text-purple-400 font-medium' : 'group-hover:text-purple-300'}`}>
                    {link.name}
                  </span>
                
                  {/* Bottom shimmer line, also forced for active links */}
                  <span className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-px bg-gradient-to-r from-transparent via-purple-400 to-transparent transition-all duration-500 ${isActiveId ? 'w-full' : 'w-0 group-hover:w-full'}`} />
                </motion.a>
              );
            })}
          </nav>
          
          {/* Right Section */}
          <div className="w-32 md:w-40 flex flex-shrink-0 items-center justify-end gap-2 md:gap-0">
            {/* Desktop Download CV Button */}
            <motion.a
              href="/resume.pdf"
              download="Fahad_Ali_Resume.pdf"
              className="hidden md:inline-flex px-5 py-2 text-sm font-medium text-white border border-purple-500/50 rounded-lg bg-purple-500/10 hover:bg-purple-500/30 hover:border-purple-400 transition-colors duration-300"
              whileHover={{ scale: 1.05, boxShadow: '0 0 25px rgba(129,140,248,0.5)' }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            >
              Download CV
            </motion.a>

            {/* Mobile Hamburger menu */}
            <button 
              onClick={() => setMenuOpen(true)}
              className="md:hidden w-10 h-10 flex items-center justify-end text-white/70 hover:text-white relative z-50"
            >
              <span className="material-symbols-outlined">menu</span>
            </button>
          </div>
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
