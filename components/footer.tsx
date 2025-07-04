"use client"

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Sparkles } from 'lucide-react'

export default function Footer() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const modernizationChanges = [
    {
      category: "Framework & Architecture",
      changes: [
        "Upgraded from Next.js 12 to Next.js 14 with App Router",
        "Migrated from Pages Router to App Router for better performance",
        "Converted all components from JavaScript to TypeScript",
        "Added proper TypeScript types and interfaces"
      ]
    },
    {
      category: "UI/UX Improvements",
      changes: [
        "Implemented Matrix-inspired green theme with glow effects",
        "Added dark/light mode toggle with system preference support",
        "Integrated Framer Motion for smooth animations and transitions",
        "Created interactive achievement cards with 3D flip effects",
        "Added professional hero section with muted styling"
      ]
    },
    {
      category: "New Features",
      changes: [
        "Dynamic experience calculation (since 2005 career start)",
        "Current job indicators with 'Present' labels and 'Current' badges",
        "Volunteer experience section with proper formatting",
        "Enhanced contact section with animated social icons",
        "Loading spinners with Suspense boundaries"
      ]
    },
    {
      category: "Technical Enhancements",
      changes: [
        "Modern component architecture with proper separation",
        "Responsive design improvements with Tailwind CSS 3",
        "Better accessibility with proper ARIA labels",
        "SEO optimizations with metadata and structured data",
        "Performance improvements with code splitting"
      ]
    }
  ]

  return (
    <>
      <footer className="py-8 border-t border-border">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Anoop Kumar. All Rights Reserved.
            </div>
            <div className="flex items-center space-x-2 text-sm">
              <span className="text-muted-foreground">Vibe coded with</span>
              <Sparkles className="h-4 w-4 text-primary" />
              <span className="text-primary font-medium">Cursor</span>
              <button
                onClick={() => setIsModalOpen(true)}
                className="text-primary hover:text-primary/80 underline underline-offset-2 transition-colors"
              >
                See How
              </button>
            </div>
          </div>
        </div>
      </footer>

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setIsModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="bg-card border border-border rounded-2xl p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-start mb-6">
                <div className="flex items-center space-x-2">
                  <Sparkles className="h-6 w-6 text-primary" />
                  <h2 className="text-2xl font-bold">Modernization Journey</h2>
                </div>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="p-2 rounded-full hover:bg-muted transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="space-y-6">
                <p className="text-muted-foreground leading-relaxed">
                  This bio page was completely modernized using Cursor AI, transforming it from a basic Next.js 12 site to a cutting-edge Next.js 14 application with modern UI/UX patterns.
                </p>

                {modernizationChanges.map((section, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="space-y-3"
                  >
                    <h3 className="text-lg font-semibold text-primary">
                      {section.category}
                    </h3>
                    <ul className="space-y-2">
                      {section.changes.map((change, changeIndex) => (
                        <li key={changeIndex} className="flex items-start">
                          <span className="text-primary mr-2 flex-shrink-0 mt-1">•</span>
                          <span className="text-sm text-muted-foreground leading-relaxed">
                            {change}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                ))}

                <div className="pt-4 border-t border-border">
                  <p className="text-sm text-muted-foreground text-center">
                    Built with ❤️ using Cursor AI for intelligent code generation and modern development practices.
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
} 