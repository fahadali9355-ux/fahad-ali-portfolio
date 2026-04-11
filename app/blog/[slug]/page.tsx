import { allPosts } from 'contentlayer/generated'
import { notFound } from 'next/navigation'
import { format, parseISO } from 'date-fns'
import Link from 'next/link'
import { getMDXComponent } from 'next-contentlayer/hooks'

export async function generateStaticParams() {
  return allPosts.map((post) => ({
    slug: post.slug,
  }))
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const post = allPosts.find((post) => post.slug === params.slug)
  if (!post) throw new Error(`Post not found for slug: ${params.slug}`)
  
  return { 
    title: `${post.title} | Fahad`,
    description: post.description 
  }
}

export default function PostLayout({ params }: { params: { slug: string } }) {
  const post = allPosts.find((post) => post.slug === params.slug)
  if (!post) notFound()

  const MDXContent = getMDXComponent(post.body.code)

  return (
    <article className="min-h-screen py-24 px-4 relative">
      <div className="max-w-3xl mx-auto relative z-10">
        
        <Link href="/blog" className="inline-flex items-center gap-2 text-white/50 hover:text-white mb-10 transition-colors">
          <span className="material-symbols-outlined text-sm">arrow_back</span>
          Back to Insights
        </Link>

        <header className="mb-14 pb-8 border-b border-white/10">
          <div className="flex flex-wrap gap-2 mb-6">
            {post.tags.map(tag => (
              <span key={tag} className="px-2.5 py-1 bg-white/5 border border-white/10 rounded-md text-xs font-bold text-purple-400 uppercase tracking-wider">
                {tag}
              </span>
            ))}
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
            {post.title}
          </h1>
          <time dateTime={post.date} className="font-mono text-white/50 flex items-center gap-2">
            <span className="material-symbols-outlined text-sm">calendar_month</span>
            {format(parseISO(post.date), 'LLLL d, yyyy')}
          </time>
        </header>

        <div className="prose prose-invert prose-purple max-w-none 
          prose-headings:text-white prose-headings:font-bold 
          prose-p:text-white/70 prose-p:leading-relaxed 
          prose-a:text-purple-400 prose-a:no-underline hover:prose-a:underline
          prose-strong:text-white
          prose-code:text-cyan-400 prose-code:bg-white/5 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded
          prose-pre:bg-[#0a0a0f] prose-pre:border prose-pre:border-white/10"
        >
          <MDXContent />
        </div>
        
      </div>
    </article>
  )
}
