import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-sans',
})

import resumeData from '../data/data.json'

export const metadata: Metadata = {
  title: `${resumeData.name} - ${resumeData.title}`,
  description: resumeData.summary,
  keywords: ['Senior Java Technical Lead', 'Solution Architect', resumeData.name, 'Java', 'Next.js', 'Spring Boot', 'Cloud Migration'],
  authors: [{ name: resumeData.name }],
  creator: resumeData.name,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable}`}>
      <body className="font-sans antialiased">
        {children}
      </body>
    </html>
  )
}
