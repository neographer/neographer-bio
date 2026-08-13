import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-sans',
})

export const metadata: Metadata = {
  title: 'Neographer Collections & Archives',
  description: 'Digital display catalog of curated banknotes, coins, and philatelic resources.',
  keywords: ['numismatics', 'coins', 'banknotes', 'notaphily', 'india post', 'philately', 'pictorial cancellations'],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable}`}>
      <body className="font-sans antialiased bg-slate-50 text-slate-900 selection:bg-teal-150 selection:text-teal-900">
        {children}
      </body>
    </html>
  )
}
