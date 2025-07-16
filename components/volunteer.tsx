"use client"

import { motion } from 'framer-motion'
import { Heart } from 'lucide-react'
import data from '../data/data.json'

export function Volunteer() {
  const volunteerData = data.sections.find(section => section.name === 'volunteer experience')?.data || []

  if (volunteerData.length === 0) return null

  return (
    <section id="volunteer" className="py-20">
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
            <Heart className="h-8 w-8 text-primary" />
          </motion.div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Volunteer Experience</h2>
          <div className="w-24 h-1 bg-primary mx-auto rounded-full"></div>
        </div>

        <div className="space-y-8">
          {volunteerData.map((item, index) => {
            const hasPosition = 'position' in item && typeof item.position === 'string';
            const hasLocation = 'location' in item && typeof item.location === 'string';
            const hasStart = 'start' in item && typeof item.start === 'string';
            const hasEnd = 'end' in item && typeof item.end === 'string';
            const hasDesc = 'desc' in item && Array.isArray(item.desc);
            const isCurrent = 'current' in item && item.current === true;
            
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`bg-card border border-border rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 ${
                  isCurrent ? 'border-primary/50 shadow-primary/10' : ''
                }`}
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                  <div>
                    {hasPosition && (
                      <h3 className="text-xl font-bold text-primary mb-1">
                        {item.position}
                        {isCurrent && (
                          <span className="ml-2 text-xs bg-primary/20 text-primary px-2 py-1 rounded-full">
                            Current
                          </span>
                        )}
                      </h3>
                    )}
                    <p className="text-lg font-medium">{item.name}</p>
                    {hasLocation && <p className="text-muted-foreground">{item.location}</p>}
                  </div>
                  <div className="text-right mt-2 md:mt-0">
                    {hasStart && (
                      <span className="inline-block bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">
                        {item.start} - {isCurrent ? 'Present' : (hasEnd ? item.end : '')}
                      </span>
                    )}
                  </div>
                </div>
                {hasDesc && (
                  <ul className="space-y-2">
                    {(item.desc as string[]).map((description: string, descIndex: number) => (
                      <li key={descIndex} className="text-muted-foreground flex items-start">
                        <span className="text-primary mr-2 flex-shrink-0 mt-0.5">•</span>
                        <span className="leading-relaxed">{description}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </section>
  )
} 