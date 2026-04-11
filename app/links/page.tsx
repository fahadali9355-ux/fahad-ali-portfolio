import Link from 'next/link';

export const metadata = {
  title: 'Links | Fahad Ali',
  description: 'Connect with me across the web',
};

export default function LinksPage() {
  const links = [
    { name: 'Instagram', url: 'https://instagram.com/FahadTechStack', label: '@FahadTechStack', icon: 'photo_camera' },
    { name: 'GitHub', url: 'https://github.com/fahadali9355-ux', label: 'fahadali9355-ux', icon: 'code' },
    { name: 'LinkedIn', url: 'https://www.linkedin.com/in/fahad-ali-a5591734b/', label: 'Fahad Ali', icon: 'work' },
    { name: 'Facebook', url: 'https://www.facebook.com/profile.php?id=61583673158036', label: 'Fahad Ali', icon: 'thumb_up' },
    { name: 'Email', url: 'mailto:fahadali9355@gmail.com', label: 'fahadali9355@gmail.com', icon: 'mail' },
    { name: 'Portfolio', url: 'https://fahadali.dev', label: 'fahadali.dev', icon: 'rocket_launch' },
  ];

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center py-20 px-4 relative z-10">
      
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl pointer-events-none z-0"></div>

      <div className="relative z-10 w-full max-w-md flex flex-col items-center">
        {/* Profile Avatar */}
        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-purple-600 to-indigo-600 flex items-center justify-center text-white font-bold text-2xl mb-6 shadow-[0_0_30px_rgba(168,85,247,0.4)] overflow-hidden">
          FA
        </div>
        
        <h1 className="text-3xl font-bold text-white mb-2">Fahad Ali</h1>
        <p className="text-white/60 mb-8 text-center text-sm">MERN Stack • Next.js • TypeScript • Algorithmic Trading</p>

        <div className="w-full space-y-4">
          {links.map((link) => (
            <a 
              key={link.name} 
              href={link.url}
              target="_blank"
              rel="noreferrer"
              className="group flex items-center gap-4 w-full p-4 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl hover:bg-white/10 hover:border-purple-500/50 hover:-translate-y-1 transition-all duration-300 shadow-[0_4px_20px_rgba(0,0,0,0.2)] hover:shadow-[0_4px_25px_rgba(168,85,247,0.2)]"
            >
              <div className="w-10 h-10 rounded-xl bg-black/30 flex items-center justify-center text-purple-400 group-hover:text-white transition-colors">
                <span className="material-symbols-outlined text-[20px]">{link.icon}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] uppercase tracking-widest text-white/30 font-bold leading-none mb-1">{link.name}</span>
                <span className="font-bold text-white/90 group-hover:text-white transition-colors">
                  {link.label}
                </span>
              </div>
              <span className="material-symbols-outlined ms-auto text-white/30 group-hover:text-white/70 group-hover:translate-x-1 transition-all">chevron_right</span>
            </a>
          ))}
        </div>
        
        <div className="mt-12 text-center text-white/40 text-xs">
          Built with Next.js & Three.js
        </div>
      </div>
    </div>
  );
}
