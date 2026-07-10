import type { Metadata } from 'next'
import { Inter, Plus_Jakarta_Sans, Playfair_Display } from 'next/font/google'
import './globals.css'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
})

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-serif',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Neographer | Hub',
  description: 'I build software systems. I also travel, observe quietly, photograph streets, and collect fragments of life. This is a place for both.',
  keywords: ['Neographer', 'Software Engineer', 'Travel Photography', 'Street Photography', 'Web Developer', 'API Design'],
  authors: [{ name: 'Neographer' }],
  creator: 'Neographer',
  metadataBase: new URL('https://neographer.co.in'),
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${plusJakarta.variable} ${playfair.variable}`}>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                if (localStorage.theme === 'dark') {
                  document.documentElement.classList.add('dark');
                } else {
                  document.documentElement.classList.remove('dark');
                }
              } catch (_) {}
            `,
          }}
        />
      </head>
      <body className="font-sans antialiased bg-slate-50 text-slate-900 dark:bg-zinc-950 dark:text-zinc-50 selection:bg-teal-100 selection:text-teal-900 transition-colors duration-500">
        {children}
      </body>
    </html>
  )
}
