"use client"

import { motion } from 'framer-motion'
import { User } from 'lucide-react'
import data from '../data/data.json'
import { getExperienceText } from '../utils/experience'

export function About() {
  const experienceText = getExperienceText(data.careerStartYear)
  const dynamicDescription = data.shortdesc.replace('{{experience}}', experienceText)

  return (
    <section id="about" className="py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="max-w-4xl mx-auto"
      >
        <div className="text-center mb-12">
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4"
          >
            <User className="h-8 w-8 text-primary" />
          </motion.div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">About Me</h2>
          <div className="w-24 h-1 bg-primary mx-auto rounded-full"></div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="bg-card border border-border rounded-2xl p-8 shadow-lg"
        >
          <p className="text-lg text-muted-foreground leading-relaxed text-center">
            {dynamicDescription}
          </p>
        </motion.div>
      </motion.div>
    </section>
  )
} 