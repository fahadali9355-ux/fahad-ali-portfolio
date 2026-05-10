'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import ScrollReveal from './ScrollReveal';

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
  imageUrl: string;
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
    id: 7,
    name: 'Kiswa',
    description: 'Premium e-commerce platform for luxury wear and watches, featuring AI-powered product recommendations, seamless cart management, and a refined architectural design. Built with React 19 and Prisma.',
    url: 'https://github.com/fahadali9355-ux/kiswa',
    liveUrl: 'https://kiswa-two.vercel.app/',
    language: 'TypeScript',
    stars: 25,
    tags: ['React 19', 'Prisma', 'PostgreSQL', 'Tailwind CSS', 'Gemini AI'],
    accentColor: '#D4AF37',
    imageUrl: '/projects/kiswa.png'
  },
  {
    id: 8,
    name: 'Dairy Flow',
    description: 'Advanced dairy management system designed as a Progressive Web App (PWA) for seamless inventory and finance tracking. Features automated report generation, real-time analytics, and offline support.',
    url: 'https://github.com/fahadali9355-ux/Dairy-FLow',
    liveUrl: 'https://dairy-f-low-akff.vercel.app/',
    language: 'TypeScript',
    stars: 20,
    tags: ['React 19', 'MongoDB', 'Express', 'PWA', 'Zustand'],
    accentColor: '#10b981',
    imageUrl: '/projects/dairy-flow.png'
  },
  {
    id: 1,
    name: 'Huraira Builders 3D',
    description: 'Modern architectural showcase platform featuring interactive 3D elements, image comparisons, and dynamic media galleries. Built with Next.js and Framer Motion.',
    url: 'https://github.com/fahadali9355-ux/3d-with-Huraira-Builders',
    liveUrl: 'https://3d-with-huraira-builders.vercel.app/',
    language: 'TypeScript',
    stars: 18,
    tags: ['Next.js', 'Framer Motion', 'Supabase', 'Tailwind CSS'],
    accentColor: '#f59e0b',
    imageUrl: '/projects/3d-with-Hurraira.png'
  },
  {
    id: 5,
    name: 'Mardaan Store',
    description: 'Modern e-commerce platform built with Next.js and TypeScript. Production-ready with responsive design and optimized performance.',
    url: 'https://github.com/fahadali9355-ux',
    liveUrl: 'https://mardaan.store/index.html',
    language: 'Next.js',
    stars: 12,
    tags: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Responsive Design'],
    accentColor: '#818cf8',
    imageUrl: '/projects/mardaan-store.png'
  },
  {
    id: 4,
    name: 'Quaid Public School System',
    description: 'Full-scale School Management System with role-based access control, automated fee tracking, and teacher payroll modules.',
    url: 'https://github.com/fahadali9355-ux',
    liveUrl: 'https://quaid-public-school.vercel.app/',
    language: 'MERN Stack',
    stars: 8,
    tags: ['MERN Stack', 'RBAC', 'MongoDB', 'Node.js'],
    accentColor: '#22d3ee',
    imageUrl: '/projects/school-system.png'
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
    accentColor: '#c084fc',
    imageUrl: '/projects/hisaab-app.png'
  },
  {
    id: 6,
    name: 'Virtual Solution Path',
    description: 'High-performance educational platform with SEO optimization, clean UI, and professional site architecture for client delivery.',
    url: 'https://github.com/fahadali9355-ux',
    liveUrl: 'https://www.virtualsolutionspath.com/',
    language: 'TypeScript',
    stars: 5,
    tags: ['Next.js', 'SEO', 'TypeScript', 'Freelance'],
    accentColor: '#34d399',
    imageUrl: '/projects/vsp-platform.png'
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
        <ScrollReveal direction="blur" delay={0.1}>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-2 shimmer-text">Featured Projects</h2>
          <div className="w-16 h-1 mt-1 mb-12 rounded-full bg-purple-500"></div>
        </ScrollReveal>

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
                <ScrollReveal key={repo.id} direction="up" delay={0.1 + (i * 0.15)} duration={1.2} className="h-full">
                  <div 
                    className="holo-card relative flex flex-col h-full bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden group will-change-transform shadow-[0_0_0_transparent] hover:shadow-[0_0_30px_rgba(129,140,248,0.15)] hover:border-purple-500/40"
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
                      <div className="relative w-full h-48 overflow-hidden">
                        <Image
                          src={repo.imageUrl}
                          alt={repo.name}
                          fill
                          className="object-cover object-top hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/40" />
                      </div>
                      
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
                </ScrollReveal>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
