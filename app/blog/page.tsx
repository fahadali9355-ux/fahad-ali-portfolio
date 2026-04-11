import { allPosts } from 'contentlayer/generated'
import Link from 'next/link'
import { format, parseISO } from 'date-fns'

export const metadata = {
  title: 'Blog | Fahad',
  description: 'Thoughts on software architecture, frontend development, and design.',
}

export default function BlogIndex() {
  // Filter published and sort by date descending
  const posts = allPosts
    .filter((post) => post.published)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  return (
    <div className="min-h-screen py-24 px-4 relative">
      {/* Background glow */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-purple-600/5 rounded-full blur-[100px] pointer-events-none z-0"></div>
      
      <div className="max-w-4xl mx-auto relative z-10">
        <div className="mb-16">
          <Link href="/" className="inline-flex items-center gap-2 text-white/50 hover:text-white mb-8 transition-colors">
            <span className="material-symbols-outlined text-sm">arrow_back</span>
            Back to Home
          </Link>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">Insights <span className="text-purple-400">&</span> Log</h1>
          <p className="text-lg text-white/60">Thoughts on software architecture, frontend development, and design engineering.</p>
        </div>

        <div className="space-y-8">
          {posts.map((post) => (
            <article 
              key={post._id} 
              className="group glass-card border border-white/10 rounded-2xl p-6 md:p-8 hover:bg-white/10 hover:border-purple-500/30 transition-all duration-300 relative overflow-hidden"
            >
              {/* Hover effect div */}
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/0 via-purple-500/0 to-purple-500/0 group-hover:to-purple-500/10 transition-all duration-500 pointer-events-none"></div>
              
              <div className="relative z-10 flex flex-col md:flex-row justify-between gap-4 md:items-baseline mb-4">
                <Link href={`/blog/${post.slug}`}>
                  <h2 className="text-2xl font-bold text-white group-hover:text-purple-400 transition-colors">
                    {post.title}
                  </h2>
                </Link>
                <time dateTime={post.date} className="text-sm font-mono text-white/40 shrink-0">
                  {format(parseISO(post.date), 'MMMM dd, yyyy')}
                </time>
              </div>
              
              <p className="text-white/60 leading-relaxed max-w-2xl relative z-10 mb-6">
                {post.description}
              </p>

              <div className="flex flex-wrap items-center justify-between gap-4 relative z-10">
                <div className="flex flex-wrap gap-2">
                  {post.tags.map(tag => (
                    <span key={tag} className="px-2.5 py-1 bg-white/5 border border-white/10 rounded-md text-xs font-bold text-white/50 uppercase tracking-wider">
                      {tag}
                    </span>
                  ))}
                </div>
                
                <Link 
                  href={`/blog/${post.slug}`}
                  className="text-sm font-bold text-purple-400 flex items-center gap-1 group/link"
                >
                  Read Article
                  <span className="material-symbols-outlined text-[16px] group-hover/link:translate-x-1 transition-transform">arrow_forward</span>
                </Link>
              </div>
            </article>
          ))}
        </div>
        
        {posts.length === 0 && (
          <div className="text-center py-20 glass-card rounded-2xl border border-white/10">
            <h3 className="text-xl font-bold text-white mb-2">No posts yet</h3>
            <p className="text-white/50">Check back later for new insights.</p>
          </div>
        )}
      </div>
    </div>
  )
}
