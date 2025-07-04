"use client"

import Image from 'next/image'
import { motion } from 'framer-motion'
import { Github, Linkedin, Twitter } from 'lucide-react'
import data from '../data/data.json'
import { getExperienceText } from '../utils/experience'

const socialIcons = {
  github: Github,
  linkedin: Linkedin,
  twitter: Twitter,
}

export function Hero() {
  const experienceText = getExperienceText(data.careerStartYear)
  const dynamicDescription = data.shortdesc.replace('{{experience}}', experienceText)

  return (
    <section className="min-h-screen flex items-center justify-center py-20">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <div className="relative w-32 h-32 mx-auto mb-8">
            <Image
              src="/images/me.jpg"
              alt="Anoop Kumar"
              fill
              className="rounded-full object-cover shadow-2xl"
              priority
            />
            <motion.div
              className="absolute inset-0 rounded-full border-4 border-primary/20"
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            />
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-4xl md:text-6xl font-bold text-green-400 mb-4"
        >
          {data.name}
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mb-6"
        >
          {data.taglines.map((tagline, index) => (
            <h2
              key={index}
              className="text-xl md:text-2xl text-muted-foreground font-medium mb-2"
            >
              {tagline}
            </h2>
          ))}
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8 leading-relaxed"
        >
          {dynamicDescription}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex justify-center space-x-6"
        >
          {data.social.map((social, index) => {
            const Icon = socialIcons[social.type as keyof typeof socialIcons]
            return (
              <motion.a
                key={index}
                href={social.profileUrl}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="p-3 rounded-full bg-card border border-border shadow-lg hover:shadow-xl transition-all duration-200 hover:border-primary"
              >
                <Icon className="h-6 w-6 text-muted-foreground hover:text-primary transition-colors" />
              </motion.a>
            )
          })}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="mt-16"
        >
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-muted-foreground"
          >
            <div className="w-6 h-10 border-2 border-muted-foreground rounded-full mx-auto flex justify-center">
              <motion.div
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-1 h-3 bg-muted-foreground rounded-full mt-2"
              />
            </div>
            <p className="mt-2 text-sm">Scroll to explore</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
} 