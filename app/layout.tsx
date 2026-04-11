import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Preloader from '../components/Preloader';
import dynamic from 'next/dynamic';
const PageBackground = dynamic(() => import('../components/PageBackground'), { ssr: false });
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  title: 'Fahad Ali | Full Stack Developer',
  description: 'Full Stack Developer specializing in MERN Stack, Next.js and TypeScript. Building scalable web applications and algorithmic trading solutions.',
  keywords: ['Full Stack Developer', 'MERN Stack', 'Next.js', 'TypeScript', 'React', 'Pakistan', 'Fahad Ali'],
  authors: [{ name: 'Fahad Ali' }],
  metadataBase: new URL('https://fahad-ali-portfolio-nine.vercel.app'),
  openGraph: {
    title: 'Fahad Ali | Full Stack Developer',
    description: 'Building scalable, user-centric web applications and algorithmic trading solutions.',
    url: 'https://fahad-ali-portfolio-nine.vercel.app',
    siteName: 'Fahad Ali Portfolio',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630 }],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Fahad Ali | Full Stack Developer',
    description: 'Building scalable, user-centric web applications and algorithmic trading solutions.',
    images: ['/og-image.jpg'],
  },
  robots: { index: true, follow: true },
  icons: { icon: '/favicon.ico', apple: '/apple-touch-icon.png' },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} dark`} style={{ scrollBehavior: 'smooth' }}>
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body text-white/90 bg-background antialiased overflow-x-hidden relative">
        <PageBackground />
        <Preloader />
        <Navbar />
        <div className="page-wrapper relative z-10">
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}
