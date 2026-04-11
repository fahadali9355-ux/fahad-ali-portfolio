'use client';

import { useEffect, useState } from 'react';

interface Repo {
  id: number;
  name: string;
  description: string;
  url: string;
  liveUrl?: string;
  language: string;
  stars: number;
  tags?: string[];
  accentColor?: string;
}

const LANGUAGE_COLORS: Record<string, string> = {
  TypeScript: '#3178c6',
  JavaScript: '#f1e05a',
  Python: '#3572A5',
  Rust: '#dea584',
  Go: '#00ADD8',
  HTML: '#e34c26',
  CSS: '#563d7c',
  Unknown: '#818cf8',
};

// Real projects for Fahad Ali
const FALLBACK_PROJECTS: Repo[] = [
  {
    id: 1,
    name: 'Mardaan Store',
    description: 'Modern e-commerce platform built with Next.js and TypeScript. Production-ready with responsive design and optimized performance.',
    url: 'https://github.com/fahadali9355-ux',
    liveUrl: 'https://mardaan.store/index.html',
    language: 'Next.js',
    stars: 12,
    tags: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Responsive Design'],
    accentColor: '#818cf8'
  },
  {
    id: 2,
    name: 'Quaid Public School System',
    description: 'Full-scale School Management System with role-based access control, automated fee tracking, and teacher payroll modules.',
    url: 'https://github.com/fahadali9355-ux',
    liveUrl: 'https://quaid-public-school.vercel.app/',
    language: 'MERN Stack',
    stars: 8,
    tags: ['MERN Stack', 'RBAC', 'MongoDB', 'Node.js'],
    accentColor: '#22d3ee'
  },
  {
    id: 3,
    name: 'Hisaab App',
    description: 'Progressive Web App with mobile-first approach, offline capability, and Firebase integration for utility and finance tracking.',
    url: 'https://github.com/fahadali9355-ux',
    liveUrl: 'https://hisaab-app-ali.vercel.app/',
    language: 'PWA',
    stars: 15,
    tags: ['PWA', 'Firebase', 'Mobile-first', 'Offline Support'],
    accentColor: '#c084fc'
  },
  {
    id: 4,
    name: 'Virtual Solution Path',
    description: 'High-performance educational platform with SEO optimization, clean UI, and professional site architecture for client delivery.',
    url: 'https://github.com/fahadali9355-ux',
    liveUrl: 'https://www.virtualsolutionspath.com/',
    language: 'TypeScript',
    stars: 5,
    tags: ['Next.js', 'SEO', 'TypeScript', 'Freelance'],
    accentColor: '#34d399'
  }
];

export default function Projects() {
  const [repos, setRepos] = useState<Repo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchRepos() {
      try {
        const res = await fetch('/api/github');
        if (!res.ok) throw new Error('Failed to fetch');
        const data = await res.json();
        
        if (data.repos && data.repos.length > 0) {
          // Merge real data with placeholders if needed, but for now just use placeholders as base
          setRepos(FALLBACK_PROJECTS);
        } else {
          setRepos(FALLBACK_PROJECTS);
        }
      } catch (err) {
        setRepos(FALLBACK_PROJECTS);
      } finally {
        setLoading(false);
      }
    }
    fetchRepos();
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const rotateX = ((y / rect.height) - 0.5) * -10;
    const rotateY = ((x / rect.width) - 0.5) * 10;

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;

    const scan = card.querySelector('.holo-scan') as HTMLElement;
    if (scan) {
      scan.style.transform = `translateY(${y - rect.height / 2}px)`;
    }
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)';
    const scan = card.querySelector('.holo-scan') as HTMLElement;
    if (scan) {
      scan.style.transform = 'translateY(-100%)';
    }
  };

  return (
    <section className="relative py-16 px-4 overflow-hidden" id="projects">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-2">Featured Projects</h2>
        <div className="w-16 h-1 mt-1 mb-12 rounded-full bg-purple-500"></div>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="h-10 w-10 border-4 border-purple-500/20 border-t-purple-500 rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {repos.map((repo, i) => {
              const langColor = LANGUAGE_COLORS[repo.language] || (repo.accentColor || '#818cf8');
              const accentColor = repo.accentColor || '#818cf8';
              
              return (
                <div 
                  key={repo.id}
                  className="holo-card relative flex flex-col bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden group will-change-transform shadow-[0_0_0_transparent] hover:shadow-[0_0_30px_rgba(129,140,248,0.15)] hover:border-purple-500/40"
                  style={{ transition: 'transform 0.1s ease-out, box-shadow 0.3s ease, border-color 0.3s ease' }}
                  onMouseMove={handleMouseMove}
                  onMouseLeave={handleMouseLeave}
                >
                  <div className="absolute inset-0 z-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none mix-blend-overlay"></div>
                  <div className="holo-scan absolute left-0 right-0 h-1 bg-white/30 blur-sm pointer-events-none -translate-y-[100%] transition-transform duration-75"></div>
                  
                  <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-white/20 opacity-50"></div>
                  <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-white/20 opacity-50"></div>
                  <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-white/20 opacity-50"></div>
                  <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-white/20 opacity-50"></div>
                  
                  <div className="relative z-10 flex flex-col h-full">
                    <div className="h-1 w-full" style={{ backgroundColor: accentColor }}></div>
                    <div className="h-28 w-full opacity-20" style={{ background: `linear-gradient(135deg, ${accentColor}, transparent)` }}></div>
                    
                    <div className="p-5 flex flex-col flex-1 bg-[#0a0a0f]/40">
                      <div className="flex justify-between items-start">
                        <h3 className="holo-title text-base font-bold text-white group-hover:text-purple-400 transition-colors drop-shadow-[0_0_8px_rgba(255,255,255,0.2)]">{repo.name}</h3>
                        <span className="flex items-center gap-1 text-[10px] text-white/50 bg-white/5 px-2 py-0.5 rounded-full">
                          <span className="material-symbols-outlined text-[10px]">star</span>
                          {repo.stars}
                        </span>
                      </div>
                      
                      <p className="text-sm text-white/50 mt-2 line-clamp-3">{repo.description}</p>
                      
                      <div className="flex flex-wrap gap-2 mt-4">
                        {repo.tags?.map(tag => (
                          <span key={tag} className="px-2 py-0.5 bg-white/5 border border-white/10 rounded text-[9px] font-bold text-white/40 uppercase">
                            {tag}
                          </span>
                        ))}
                      </div>
                      
                      <div className="flex gap-3 mt-auto pt-4">
                        <a href={repo.url} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 px-3 py-1.5 bg-white/5 border border-white/10 rounded-full text-xs font-semibold text-white/70 hover:text-white hover:bg-white/10 transition-colors">
                          <span className="material-symbols-outlined text-[14px]">code</span>
                          Source
                        </a>
                        {repo.liveUrl && repo.liveUrl !== '#' && (
                          <a href={repo.liveUrl} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 px-3 py-1.5 bg-primary-container/10 border border-primary-container/20 rounded-full text-xs font-semibold text-primary-container hover:bg-primary-container/20 transition-colors">
                            <span className="material-symbols-outlined text-[14px]">rocket_launch</span>
                            Live
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
