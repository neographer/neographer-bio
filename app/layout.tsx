import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Anoop Kumar - Fullstack Developer',
  description: 'Agile oriented professional with 17+ years of technical management and development experience in Java technology.',
  keywords: ['Fullstack Developer', 'Java', 'React', 'Next.js', 'Technical Architect'],
  authors: [{ name: 'Anoop Kumar' }],
  creator: 'Anoop Kumar',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://neographer.dev',
    title: 'Anoop Kumar - Fullstack Developer',
    description: 'Agile oriented professional with 17+ years of technical management and development experience in Java technology.',
    siteName: 'Anoop Kumar Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Anoop Kumar - Fullstack Developer',
    description: 'Agile oriented professional with 17+ years of technical management and development experience in Java technology.',
    creator: '@neographr_kochi',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
} 