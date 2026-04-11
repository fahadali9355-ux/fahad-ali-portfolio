import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="relative w-full bg-transparent">
      {/* Top neon divider line */}
      <div 
        className="w-full h-[1px]" 
        style={{ background: 'linear-gradient(90deg, transparent, #818cf8, #22d3ee, transparent)' }} 
      />

      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          
          {/* Column 1 - Brand */}
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 rounded bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center text-white font-bold text-xs">
                FA
              </div>
              <span className="text-xl font-bold text-white tracking-tight">Fahad Ali</span>
            </div>
            <p className="text-sm text-white/40">
              Full Stack Developer & MERN Specialist
            </p>
            
            <div className="flex gap-3 mt-6">
              <a href="https://instagram.com/FahadTechStack" target="_blank" rel="noreferrer" className="w-9 h-9 flex items-center justify-center rounded-lg bg-white/5 border border-white/10 text-white/60 hover:text-white hover:bg-purple-500/10 hover:border-purple-500/50 transition-all duration-300">
                <span className="material-symbols-outlined text-[18px]">photo_camera</span>
              </a>
              <a href="https://github.com/fahadali9355-ux" target="_blank" rel="noreferrer" className="w-9 h-9 flex items-center justify-center rounded-lg bg-white/5 border border-white/10 text-white/60 hover:text-white hover:bg-purple-500/10 hover:border-purple-500/50 transition-all duration-300">
                <span className="material-symbols-outlined text-[18px]">code</span>
              </a>
              <a href="https://www.linkedin.com/in/fahad-ali-a5591734b/" target="_blank" rel="noreferrer" className="w-9 h-9 flex items-center justify-center rounded-lg bg-white/5 border border-white/10 text-white/60 hover:text-white hover:bg-purple-500/10 hover:border-purple-500/50 transition-all duration-300">
                <span className="material-symbols-outlined text-[18px]">work</span>
              </a>
              <a href="https://www.facebook.com/profile.php?id=61583673158036" target="_blank" rel="noreferrer" className="w-9 h-9 flex items-center justify-center rounded-lg bg-white/5 border border-white/10 text-white/60 hover:text-white hover:bg-purple-500/10 hover:border-purple-500/50 transition-all duration-300">
                <span className="material-symbols-outlined text-[18px]">thumb_up</span>
              </a>
            </div>
          </div>

          {/* Column 2 - Navigation */}
          <div>
            <h3 className="text-xs uppercase tracking-widest text-white/30 mb-4 font-bold">Navigation</h3>
            <nav className="space-y-2">
              <Link href="/" className="text-sm text-white/50 hover:text-purple-400 transition-colors duration-200 block">Home</Link>
              <Link href="/#about" className="text-sm text-white/50 hover:text-purple-400 transition-colors duration-200 block">About</Link>
              <Link href="/#skills" className="text-sm text-white/50 hover:text-purple-400 transition-colors duration-200 block">Skills</Link>
              <Link href="/#projects" className="text-sm text-white/50 hover:text-purple-400 transition-colors duration-200 block">Projects</Link>
              <Link href="/#experience" className="text-sm text-white/50 hover:text-purple-400 transition-colors duration-200 block">Experience</Link>
              <Link href="/blog" className="text-sm text-white/50 hover:text-purple-400 transition-colors duration-200 block">Blog</Link>
              <Link href="/#contact" className="text-sm text-white/50 hover:text-purple-400 transition-colors duration-200 block">Contact</Link>
            </nav>
          </div>

          {/* Column 3 - Contact info */}
          <div>
            <h3 className="text-xs uppercase tracking-widest text-white/30 mb-4 font-bold">Get In Touch</h3>
            <div className="space-y-3">
              <a href="mailto:fahadali9355@gmail.com" className="flex items-center gap-2 text-sm text-white/50 hover:text-white transition-colors duration-200">
                <span className="material-symbols-outlined text-[18px]">mail</span>
                fahadali9355@gmail.com
              </a>
              <a href="https://instagram.com/FahadTechStack" target="_blank" rel="noreferrer" className="flex items-center gap-2 text-sm text-white/50 hover:text-white transition-colors duration-200">
                <span className="material-symbols-outlined text-[18px]">photo_camera</span>
                @FahadTechStack
              </a>
            </div>
            
            <div className="mt-6 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-500/10 border border-green-500/20">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
              <span className="text-xs font-bold text-green-400">Available for work</span>
            </div>
          </div>
          
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/5 mt-12 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/25">
            © 2025 Fahad Ali. All rights reserved.
          </p>
          <p className="text-xs text-white/25">
            Crafted with Next.js, Three.js & lots of ☕
          </p>
        </div>
      </div>
    </footer>
  );
}
