'use client';

import React, { useEffect, useState } from 'react';
import { 
  ArrowUpRight, 
  Terminal, 
  Camera, 
  Code2, 
  FileText, 
  Compass, 
  BookOpen,
  Sun,
  Moon,
  Cpu,
  CloudRain,
  Coins,
  Bike
} from 'lucide-react';

// Custom conceptual background overlay merging Tech (grid) and Personal (Rider, Numismatist, Photographer, Rain Lover)
const BackgroundGraphics = () => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
      {/* 1. Fine Technical Grid (Tech / Systems) */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--grid-color)_1px,transparent_1px),linear-gradient(to_bottom,var(--grid-color)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,#000_65%,transparent_100%)] opacity-30" />

      {/* 2. Custom SVG Art (Coins, Camera Aperture, Winding Road paths) */}
      <svg className="absolute inset-0 w-full h-full stroke-slate-200 dark:stroke-zinc-800/60 fill-none" xmlns="http://www.w3.org/2000/svg">
        {/* Numismatist & Photography: Concentric coin ridges and camera aperture lines */}
        {/* Top-left Coin/Aperture */}
        <circle cx="12%" cy="25%" r="80" strokeWidth="1" strokeDasharray="4 4" className="opacity-30" />
        <circle cx="12%" cy="25%" r="50" strokeWidth="1.5" className="opacity-20" />
        <circle cx="12%" cy="25%" r="30" strokeWidth="1" strokeDasharray="2 1" className="opacity-45" />
        {/* Coin inner gear/teeth (Numismatist details) */}
        <circle cx="12%" cy="25%" r="40" strokeWidth="1" strokeDasharray="1 3" className="opacity-40" />
        {/* Camera Focus Crosshair (Photographer) */}
        <path d="M 12% 25% l -12 0 M 12% 25% l 12 0 M 12% 25% l 0 -12 M 12% 25% l 0 12" strokeWidth="1" className="opacity-60" />

        {/* Bottom-right Coin/Aperture */}
        <circle cx="88%" cy="70%" r="120" strokeWidth="1" strokeDasharray="8 4" className="opacity-20" />
        <circle cx="88%" cy="70%" r="70" strokeWidth="1" className="opacity-30" />
        <circle cx="88%" cy="70%" r="40" strokeWidth="1.5" className="opacity-40" />
        <circle cx="88%" cy="70%" r="95" strokeWidth="1" strokeDasharray="2 6" className="opacity-25" />

        {/* Rider Winding Route: Curvy highway contours traversing the viewport */}
        <path d="M -100 480 C 250 420, 350 580, 650 360 C 850 200, 1050 420, 1550 220" strokeWidth="1.5" className="opacity-40" />
        <path d="M -100 484 C 250 424, 350 584, 650 364 C 850 204, 1050 424, 1550 224" strokeWidth="0.75" strokeDasharray="6 4" className="opacity-30" />
      </svg>

      {/* 3. Rain Streaks (Rain Lover) - Staggered falling particles */}
      <div className="absolute inset-0">
        <div className="rain-streak left-[8%] top-[-60px] [animation-delay:0s] [animation-duration:3.2s] h-[50px] opacity-35" />
        <div className="rain-streak left-[28%] top-[-60px] [animation-delay:1.8s] [animation-duration:4.2s] h-[40px] opacity-25" />
        <div className="rain-streak left-[52%] top-[-60px] [animation-delay:0.8s] [animation-duration:2.7s] h-[70px] opacity-40" />
        <div className="rain-streak left-[72%] top-[-60px] [animation-delay:2.5s] [animation-duration:3.6s] h-[45px] opacity-30" />
        <div className="rain-streak left-[90%] top-[-60px] [animation-delay:1.2s] [animation-duration:4.8s] h-[65px] opacity-35" />
      </div>

      {/* 4. Strategic Low-Opacity Motif Icons (Tech & Personal Interests) in non-text margins */}
      <div className="absolute inset-0 text-slate-300/40 dark:text-zinc-800/35 transition-colors duration-500">
        {/* Tech / Left Column Margin */}
        <div className="absolute left-[3.5%] top-[45%]">
          <Cpu size={30} strokeWidth={1} className="opacity-75 dark:opacity-55" />
        </div>
        <div className="absolute left-[6.5%] top-[65%]">
          <Code2 size={22} strokeWidth={1.25} className="opacity-65 dark:opacity-45" />
        </div>

        {/* Life / Personal (Right Column & Upper Right Margin) */}
        <div className="absolute right-[12%] top-[14%]">
          <Camera size={24} strokeWidth={1.25} className="opacity-65 dark:opacity-45" />
        </div>
        <div className="absolute right-[22%] top-[16%]">
          <CloudRain size={22} strokeWidth={1.25} className="opacity-80 dark:opacity-55" />
        </div>
        <div className="absolute right-[3.5%] top-[40%]">
          <Bike size={30} strokeWidth={1} className="opacity-75 dark:opacity-55" />
        </div>
        <div className="absolute right-[6%] top-[56%]">
          <Coins size={26} strokeWidth={1.25} className="opacity-75 dark:opacity-55" />
        </div>
      </div>
    </div>
  );
};

// Creative Viewfinder Camera corner markings with coordinates (Travel/Photography theme)
const ViewfinderBrackets = () => {
  return (
    <>
      {/* Top Left Corner */}
      <div className="absolute top-6 left-6 pointer-events-none hidden lg:flex flex-col gap-1 text-[10px] font-mono text-slate-400 dark:text-zinc-500 transition-colors duration-500">
        <div className="flex gap-2">
          <span className="border-t border-l border-slate-300 dark:border-zinc-800 w-4 h-4 transition-colors" />
          <span>35.6762° N, 139.6503° E // TOKYO</span>
        </div>
      </div>
      {/* Bottom Left Corner */}
      <div className="absolute bottom-6 left-6 pointer-events-none hidden lg:flex flex-col gap-1 text-[10px] font-mono text-slate-400 dark:text-zinc-500 transition-colors duration-500">
        <div className="flex gap-2 items-end">
          <span className="border-b border-l border-slate-300 dark:border-zinc-800 w-4 h-4 transition-colors" />
          <span>52.5200° N, 13.4050° E // BERLIN</span>
        </div>
      </div>
      {/* Bottom Right Corner */}
      <div className="absolute bottom-6 right-6 pointer-events-none hidden lg:flex flex-col items-end gap-1 text-[10px] font-mono text-slate-400 dark:text-zinc-500 transition-colors duration-500">
        <div className="flex gap-2 items-end">
          <span>19.0760° N, 72.8777° E // MUMBAI</span>
          <span className="border-b border-r border-slate-300 dark:border-zinc-800 w-4 h-4 transition-colors" />
        </div>
      </div>
    </>
  );
};

export default function HubPage() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [mounted, setMounted] = useState(false);
  const [resumeUrl, setResumeUrl] = useState('/resume');

  useEffect(() => {
    // Determine active theme on mount
    const root = document.documentElement;
    const isDark = root.classList.contains('dark') || localStorage.theme === 'dark';
    setTheme(isDark ? 'dark' : 'light');
    
    if (typeof window !== 'undefined') {
      if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        setResumeUrl('http://localhost:3001');
      } else {
        setResumeUrl('/resume');
      }
    }
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    const root = document.documentElement;
    if (theme === 'light') {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      setTheme('dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      setTheme('light');
    }
  };

  return (
    <div className="relative min-h-screen md:h-screen flex flex-col justify-between bg-slate-50 text-slate-900 dark:bg-zinc-950 dark:text-zinc-50 overflow-x-hidden md:overflow-y-hidden selection:bg-teal-100 selection:text-teal-900 transition-colors duration-500">
      
      {/* Background Graphic System */}
      <BackgroundGraphics />

      {/* Camera Viewfinder Corners */}
      <ViewfinderBrackets />

      {/* Main Viewport Container */}
      <main className="relative z-10 flex-grow flex flex-col max-w-7xl mx-auto w-full px-6 py-6 md:px-12 md:py-8 lg:px-16 lg:py-10 justify-center">
        
        {/* Top Header & Tagline */}
        <header className="mb-6 md:mb-8 lg:mb-10 flex flex-col gap-4">
          <div className="flex justify-between items-center w-full">
            {/* Brand Logo */}
            <a href="/" className="group flex items-center gap-2.5 font-display font-bold text-slate-800 dark:text-zinc-100 text-lg transition-colors">
              <span className="w-7 h-7 rounded-full border border-teal-500 bg-teal-50 flex items-center justify-center dark:bg-teal-950/25 text-xs text-teal-600 dark:text-teal-400 font-mono font-bold group-hover:bg-teal-600 group-hover:text-white dark:group-hover:bg-teal-500 dark:group-hover:text-zinc-950 transition-all duration-300">N</span>
              <span className="tracking-tight group-hover:text-teal-600 dark:group-hover:text-teal-500 transition-colors">neographer</span>
            </a>

            {/* Theme Toggle Button */}
            {mounted && (
              <button
                onClick={toggleTheme}
                aria-label="Toggle visual theme"
                className="p-3 rounded-full border border-slate-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm text-slate-600 dark:text-zinc-400 hover:text-teal-600 dark:hover:text-teal-400 hover:border-teal-500/30 transition-all duration-300 shadow-sm"
              >
                {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
              </button>
            )}
          </div>

          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-slate-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm text-[10px] font-mono text-slate-500 dark:text-zinc-400 tracking-wider uppercase mb-3.5 shadow-sm transition-colors duration-500">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-500 animate-pulse" />
              Landing Hub
            </div>
            
            <h1 className="text-2xl sm:text-3xl md:text-3.5xl lg:text-4xl font-light tracking-tight text-slate-800 dark:text-zinc-100 leading-[1.3] transition-colors duration-500 font-serif">
              I build software systems. I also travel, observe quietly, photograph streets, and collect fragments of life. This is a place for both.
            </h1>
          </div>
        </header>

        {/* 2-Column Balanced Container with Central Divider */}
        <div className="relative grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16 w-full items-stretch md:max-h-[50vh] lg:max-h-[54vh]">
          
          {/* Vertical dividing line between columns with interactive center node */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 -translate-x-1/2 w-[1px] bg-slate-200/60 dark:bg-zinc-800/40 pointer-events-none transition-colors duration-500">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full border border-slate-200 dark:border-zinc-800 bg-slate-50 dark:bg-zinc-950 flex items-center justify-center pointer-events-auto transition-all duration-700 hover:rotate-180 cursor-crosshair shadow-sm">
              <div className="w-4 h-4 rounded-full border-2 border-teal-500/80 flex items-center justify-center">
                <div className="w-1.5 h-1.5 bg-teal-500 rounded-full animate-ping" />
              </div>
            </div>
          </div>

          {/* Left Column: Tech */}
          <section className="group/column flex flex-col justify-between p-5 md:p-6 lg:p-7 rounded-2xl border border-slate-200 dark:border-zinc-900 bg-white/60 dark:bg-zinc-900/30 backdrop-blur-sm hover:border-teal-500/30 hover:bg-white dark:hover:bg-zinc-900/50 hover:shadow-[0_0_50px_-12px_rgba(13,148,136,0.1)] transition-all duration-500 ease-out overflow-hidden relative">
            {/* Visual Top Accent Indicator */}
            <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-teal-500 to-emerald-400 opacity-80" />
            
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-slate-100 dark:bg-zinc-850 border border-slate-200 dark:border-zinc-800 text-teal-600 dark:text-teal-500 group-hover/column:text-teal-700 dark:group-hover/column:text-teal-400 transition-colors duration-300">
                    <Terminal size={18} />
                  </div>
                  <span className="font-mono text-[10px] text-slate-400 dark:text-zinc-500 tracking-widest uppercase">
                    [01 // TECH]
                  </span>
                </div>
                <span className="font-mono text-[9px] text-teal-600/60 dark:text-teal-500/50 font-semibold">neographer:~$</span>
              </div>
              
              <h2 className="text-lg md:text-xl font-display font-semibold tracking-tight text-slate-800 dark:text-zinc-100 mb-2 group-hover/column:text-teal-600 dark:group-hover/column:text-teal-500 transition-colors duration-300">
                Build & Experiments
              </h2>
              
              <p className="text-slate-500 dark:text-zinc-400 font-light leading-relaxed mb-4 text-xs lg:text-sm">
                I work with software systems, APIs, and tools. Some are practical, some experimental - all are part of how I think.
              </p>
            </div>

            {/* Links for Tech */}
            <div className="space-y-2.5">
              {/* Tools & Sandboxes */}
              <a 
                href="/tools" 
                className="group/link flex items-center justify-between p-3 rounded-xl border border-slate-100 dark:border-zinc-900/80 bg-slate-50/50 dark:bg-zinc-950/50 hover:border-teal-500/40 dark:hover:border-teal-500/40 hover:bg-white dark:hover:bg-zinc-900/80 hover:shadow-sm transition-all duration-300"
              >
                <div className="flex items-center gap-3">
                  <div className="p-1.5 rounded-lg bg-white dark:bg-zinc-850 border border-slate-200 dark:border-zinc-800 text-slate-400 dark:text-zinc-500 group-hover/link:text-teal-600 dark:group-hover/link:text-teal-400 group-hover/link:border-teal-200 dark:group-hover/link:border-zinc-700 transition-all duration-300">
                    <Code2 size={16} />
                  </div>
                  <div>
                    <h3 className="font-display font-medium text-xs text-slate-700 dark:text-zinc-200 group-hover/link:text-slate-950 dark:group-hover/link:text-white transition-colors">
                      Tools & Sandboxes
                    </h3>
                    <p className="text-[10px] text-slate-400 dark:text-zinc-500 mt-0.5 font-light">
                      Prototypes, utilities, and dev sandboxes.
                    </p>
                  </div>
                </div>
                <ArrowUpRight size={16} className="text-slate-400 dark:text-zinc-500 group-hover/link:text-teal-600 dark:group-hover/link:text-teal-400 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-all duration-300" />
              </a>

              {/* Professional Resume */}
              <a 
                href={resumeUrl} 
                className="group/link flex items-center justify-between p-3 rounded-xl border border-slate-100 dark:border-zinc-900/80 bg-slate-50/50 dark:bg-zinc-950/50 hover:border-teal-500/40 dark:hover:border-teal-500/40 hover:bg-white dark:hover:bg-zinc-900/80 hover:shadow-sm transition-all duration-300"
              >
                <div className="flex items-center gap-3">
                  <div className="p-1.5 rounded-lg bg-white dark:bg-zinc-850 border border-slate-200 dark:border-zinc-800 text-slate-400 dark:text-zinc-500 group-hover/link:text-teal-600 dark:group-hover/link:text-teal-400 group-hover/link:border-teal-200 dark:group-hover/link:border-zinc-700 transition-all duration-300">
                    <FileText size={16} />
                  </div>
                  <div>
                    <h3 className="font-display font-medium text-xs text-slate-700 dark:text-zinc-200 group-hover/link:text-slate-950 dark:group-hover/link:text-white transition-colors">
                      Professional Resume
                    </h3>
                    <p className="text-[10px] text-slate-400 dark:text-zinc-500 mt-0.5 font-light">
                      resume.neographer.co.in
                    </p>
                  </div>
                </div>
                <ArrowUpRight size={16} className="text-slate-400 dark:text-zinc-500 group-hover/link:text-teal-600 dark:group-hover/link:text-teal-400 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-all duration-300" />
              </a>
            </div>
          </section>

          {/* Right Column: Life */}
          <section className="group/column flex flex-col justify-between p-5 md:p-6 lg:p-7 rounded-2xl border border-slate-200 dark:border-zinc-900 bg-white/60 dark:bg-zinc-900/30 backdrop-blur-sm hover:border-teal-500/30 hover:bg-white dark:hover:bg-zinc-900/50 hover:shadow-[0_0_50px_-12px_rgba(13,148,136,0.1)] transition-all duration-500 ease-out overflow-hidden relative">
            {/* Visual Top Accent Indicator */}
            <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-teal-500 to-amber-500 opacity-80" />

            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-slate-100 dark:bg-zinc-850 border border-slate-200 dark:border-zinc-800 text-teal-600 dark:text-teal-500 group-hover/column:text-teal-700 dark:group-hover/column:text-teal-400 transition-colors duration-300">
                    <Camera size={18} />
                  </div>
                  <span className="font-mono text-[10px] text-slate-400 dark:text-zinc-500 tracking-widest uppercase">
                    [02 // LIFE]
                  </span>
                </div>
                <span className="font-mono text-[9px] text-amber-600/70 dark:text-amber-500/60 font-semibold animate-pulse">● REC</span>
              </div>
              
              <h2 className="text-lg md:text-xl font-display font-semibold tracking-tight text-slate-800 dark:text-zinc-100 mb-2 group-hover/column:text-teal-600 dark:group-hover/column:text-teal-500 transition-colors duration-300">
                Life & Observations
              </h2>
              
              <p className="text-slate-500 dark:text-zinc-400 font-light leading-relaxed mb-4 text-xs lg:text-sm">
                Outside of code, I travel slowly, observe people and places, photograph streets, and collect objects that carry stories.
              </p>
            </div>

            {/* Links for Life */}
            <div className="space-y-2.5">
              {/* Photography Gallery */}
              <a 
                href="/photography" 
                className="group/link flex items-center justify-between p-3 rounded-xl border border-slate-100 dark:border-zinc-900/80 bg-slate-50/50 dark:bg-zinc-950/50 hover:border-teal-500/40 dark:hover:border-teal-500/40 hover:bg-white dark:hover:bg-zinc-900/80 hover:shadow-sm transition-all duration-300"
              >
                <div className="flex items-center gap-3">
                  <div className="p-1.5 rounded-lg bg-white dark:bg-zinc-850 border border-slate-200 dark:border-zinc-800 text-slate-400 dark:text-zinc-500 group-hover/link:text-teal-600 dark:group-hover/link:text-teal-400 group-hover/link:border-teal-200 dark:group-hover/link:border-zinc-700 transition-all duration-300">
                    <Compass size={16} />
                  </div>
                  <div>
                    <h3 className="font-display font-medium text-xs text-slate-700 dark:text-zinc-200 group-hover/link:text-slate-950 dark:group-hover/link:text-white transition-colors">
                      Photography Gallery
                    </h3>
                    <p className="text-[10px] text-slate-400 dark:text-zinc-500 mt-0.5 font-light">
                      Visual logs, landscapes, and street observation.
                    </p>
                  </div>
                </div>
                <ArrowUpRight size={16} className="text-slate-400 dark:text-zinc-500 group-hover/link:text-teal-600 dark:group-hover/link:text-teal-400 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-all duration-300" />
              </a>

              {/* Blog and Publications */}
              <a 
                href="https://blog.neographer.co.in" 
                target="_blank"
                rel="noopener noreferrer"
                className="group/link flex items-center justify-between p-3 rounded-xl border border-slate-100 dark:border-zinc-900/80 bg-slate-50/50 dark:bg-zinc-950/50 hover:border-teal-500/40 dark:hover:border-teal-500/40 hover:bg-white dark:hover:bg-zinc-900/80 hover:shadow-sm transition-all duration-300"
              >
                <div className="flex items-center gap-3">
                  <div className="p-1.5 rounded-lg bg-white dark:bg-zinc-850 border border-slate-200 dark:border-zinc-800 text-slate-400 dark:text-zinc-500 group-hover/link:text-teal-600 dark:group-hover/link:text-teal-400 group-hover/link:border-teal-200 dark:group-hover/link:border-zinc-700 transition-all duration-300">
                    <BookOpen size={16} />
                  </div>
                  <div>
                    <h3 className="font-display font-medium text-xs text-slate-700 dark:text-zinc-200 group-hover/link:text-slate-950 dark:group-hover/link:text-white transition-colors">
                      Publications & Travel Log
                    </h3>
                    <p className="text-[10px] text-slate-400 dark:text-zinc-500 mt-0.5 font-light">
                      blog.neographer.co.in
                    </p>
                  </div>
                </div>
                <ArrowUpRight size={16} className="text-slate-400 dark:text-zinc-500 group-hover/link:text-teal-600 dark:group-hover/link:text-teal-400 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-all duration-300" />
              </a>
            </div>
          </section>

        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 max-w-7xl mx-auto w-full px-6 py-4 md:px-12 lg:px-16 border-t border-slate-200/60 dark:border-zinc-900 flex flex-col sm:flex-row justify-between items-center gap-3 text-[10px] font-mono text-slate-450 dark:text-zinc-500 transition-colors duration-500">
        <div>
          &copy; {new Date().getFullYear()} Neographer. All rights reserved.
        </div>
        <div className="flex gap-4 sm:gap-6">
          <a href="/resume" className="hover:text-slate-700 dark:hover:text-zinc-300 transition-colors">Resume</a>
          <span className="text-slate-300 dark:text-zinc-800">&middot;</span>
          <a href="https://blog.neographer.co.in" target="_blank" rel="noopener noreferrer" className="hover:text-slate-700 dark:hover:text-zinc-300 transition-colors">Blog</a>
          <span className="text-slate-300 dark:text-zinc-800">&middot;</span>
          <a href="/tools" className="hover:text-slate-700 dark:hover:text-zinc-300 transition-colors">Tools</a>
          <span className="text-slate-300 dark:text-zinc-800">&middot;</span>
          <a href="/photography" className="hover:text-slate-700 dark:hover:text-zinc-300 transition-colors">Gallery</a>
        </div>
      </footer>
    </div>
  );
}
