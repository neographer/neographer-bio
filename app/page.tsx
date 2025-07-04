import { Suspense } from 'react'
import { Hero } from '@/components/hero'
import { About } from '@/components/about'
import { Experience } from '@/components/experience'
import { Skills } from '@/components/skills'
import { Achievements } from '@/components/achievements'
import { Contact } from '@/components/contact'
import { ThemeToggle } from '@/components/theme-toggle'
import { LoadingSpinner } from '@/components/loading-spinner'

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 relative overflow-hidden">
      {/* Matrix-style background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,hsl(var(--primary)),transparent_50%)]"></div>
      </div>
      
      <div className="fixed top-4 right-4 z-50">
        <ThemeToggle />
      </div>
      
      <div className="container mx-auto px-4 py-8 relative z-10">
        <Suspense fallback={<LoadingSpinner />}>
          <Hero />
        </Suspense>
        
        <Suspense fallback={<LoadingSpinner />}>
          <About />
        </Suspense>
        
        <Suspense fallback={<LoadingSpinner />}>
          <Experience />
        </Suspense>
        
        <Suspense fallback={<LoadingSpinner />}>
          <Skills />
        </Suspense>
        
        <Suspense fallback={<LoadingSpinner />}>
          <Achievements />
        </Suspense>
        
        <Suspense fallback={<LoadingSpinner />}>
          <Contact />
        </Suspense>
      </div>
    </main>
  )
} 