"use client"

import { motion } from 'framer-motion'
import { Award, Info } from 'lucide-react'
import data from '../data/data.json'
import { useState } from 'react'

export function Achievements() {
  const achievements = data.sections.find(section => section.name === 'achievements')?.data || []
  const [flippedCards, setFlippedCards] = useState<number[]>([])

  if (achievements.length === 0) return null

  const handleCardFlip = (index: number) => {
    setFlippedCards(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    )
  }

  return (
    <section id="achievements" className="py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="max-w-6xl mx-auto"
      >
        <div className="text-center mb-12">
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4"
          >
            <Award className="h-8 w-8 text-primary" />
          </motion.div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Achievements & Awards</h2>
          <div className="w-24 h-1 bg-primary mx-auto rounded-full"></div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {achievements.map((achievement, index) => {
            const isFlipped = flippedCards.includes(index)
            
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative h-48 cursor-pointer perspective-1000"
                onClick={() => handleCardFlip(index)}
              >
                <motion.div
                  className="relative w-full h-full transition-transform duration-700 transform-style-preserve-3d"
                  animate={{ rotateY: isFlipped ? 180 : 0 }}
                >
                  {/* Front of card */}
                  <div className="absolute inset-0 w-full h-full backface-hidden bg-card border border-border rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col items-center justify-center text-center">
                    <Award className="h-12 w-12 text-primary mb-4" />
                    <h3 className="font-bold text-primary text-lg leading-tight">
                      {achievement.name}
                    </h3>
                    <div className="mt-4 flex items-center text-sm text-muted-foreground">
                      <Info className="h-4 w-4 mr-1" />
                      <span>Click to see details</span>
                    </div>
                  </div>

                  {/* Back of card */}
                  <div className="absolute inset-0 w-full h-full backface-hidden bg-card border border-primary/50 rounded-2xl p-6 shadow-lg rotate-y-180 flex flex-col justify-center">
                    <div className="text-center">
                      <h3 className="font-bold text-primary text-lg mb-3">
                        {achievement.name}
                      </h3>
                      {'desc' in achievement && achievement.desc && (
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {achievement.desc[0]}
                        </p>
                      )}
                      <div className="mt-4 text-xs text-muted-foreground">
                        Click to flip back
                      </div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            )
          })}
        </div>
      </motion.div>
    </section>
  )
} 