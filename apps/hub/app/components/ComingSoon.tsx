'use client';

import React, { useEffect, useState } from 'react';
import { ArrowLeft, Sun, Moon } from 'lucide-react';

interface FeatureItem {
  title: string;
  desc: string;
}

interface ComingSoonProps {
  title: string;
  tag: string;
  explanation: string;
  features: FeatureItem[];
  icon: React.ReactNode;
}

// Corner brackets to match the viewfinder photography/travel theme of Neographer
const ViewfinderBrackets = () => {
  return (
    <>
      <div className="absolute top-6 left-6 pointer-events-none hidden lg:flex flex-col gap-1 text-[10px] font-mono text-slate-400 dark:text-zinc-500 transition-colors duration-500">
        <div className="flex gap-2">
          <span className="border-t border-l border-slate-300 dark:border-zinc-800 w-4 h-4 transition-colors" />
          <span>35.6762° N, 139.6503° E // TOKYO</span>
        </div>
      </div>
      <div className="absolute bottom-6 left-6 pointer-events-none hidden lg:flex flex-col gap-1 text-[10px] font-mono text-slate-400 dark:text-zinc-500 transition-colors duration-500">
        <div className="flex gap-2 items-end">
          <span className="border-b border-l border-slate-300 dark:border-zinc-800 w-4 h-4 transition-colors" />
          <span>52.5200° N, 13.4050° E // BERLIN</span>
        </div>
      </div>
      <div className="absolute bottom-6 right-6 pointer-events-none hidden lg:flex flex-col items-end gap-1 text-[10px] font-mono text-slate-400 dark:text-zinc-500 transition-colors duration-500">
        <div className="flex gap-2 items-end">
          <span>19.0760° N, 72.8777° E // MUMBAI</span>
          <span className="border-b border-r border-slate-300 dark:border-zinc-800 w-4 h-4 transition-colors" />
        </div>
      </div>
    </>
  );
};

export default function ComingSoon({ title, tag, explanation, features, icon }: ComingSoonProps) {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    const isDark = root.classList.contains('dark') || localStorage.theme === 'dark';
    setTheme(isDark ? 'dark' : 'light');
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
    <div className="relative min-h-screen flex flex-col justify-between bg-slate-50 text-slate-900 dark:bg-zinc-950 dark:text-zinc-50 overflow-x-hidden selection:bg-teal-100 selection:text-teal-900 transition-colors duration-500">
      
      {/* Subtle Grid Backdrop */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--grid-color,rgba(13,148,136,0.05))_1px,transparent_1px),linear-gradient(to_bottom,var(--grid-color,rgba(13,148,136,0.05))_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,#000_65%,transparent_100%)] opacity-30 dark:opacity-20" />
      </div>

      <ViewfinderBrackets />

      {/* Top Header */}
      <header className="relative z-10 max-w-7xl mx-auto w-full px-6 py-6 md:px-12 lg:px-16 flex justify-between items-center">
        {/* Brand Logo & Back navigation */}
        <a href="/" className="group flex items-center gap-2.5 font-display font-bold text-slate-800 dark:text-zinc-100 text-lg transition-colors">
          <span className="w-7 h-7 rounded-full border border-teal-500 bg-teal-50 flex items-center justify-center dark:bg-teal-950/25 text-xs text-teal-600 dark:text-teal-400 font-mono font-bold group-hover:bg-teal-600 group-hover:text-white dark:group-hover:bg-teal-500 dark:group-hover:text-zinc-950 transition-all duration-300">N</span>
          <span className="tracking-tight group-hover:text-teal-600 dark:group-hover:text-teal-500 transition-colors">neographer</span>
        </a>

        {/* Action Controls */}
        <div className="flex items-center gap-3">
          <a
            href="/"
            className="flex items-center gap-1.5 px-4 py-2 rounded-full border border-slate-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm text-xs font-mono text-slate-500 dark:text-zinc-400 hover:text-teal-600 dark:hover:text-teal-400 hover:border-teal-500/30 transition-all duration-300 shadow-sm"
          >
            <ArrowLeft size={14} />
            <span>Back to Hub</span>
          </a>

          {mounted && (
            <button
              onClick={toggleTheme}
              aria-label="Toggle visual theme"
              className="p-2.5 rounded-full border border-slate-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm text-slate-600 dark:text-zinc-400 hover:text-teal-600 dark:hover:text-teal-400 hover:border-teal-500/30 transition-all duration-300 shadow-sm"
            >
              {theme === 'light' ? <Moon size={16} /> : <Sun size={16} />}
            </button>
          )}
        </div>
      </header>

      {/* Main Content Area */}
      <main className="relative z-10 flex-grow flex flex-col items-center justify-center max-w-4xl mx-auto w-full px-6 py-12 md:py-16">
        <div className="w-full group/column flex flex-col p-6 md:p-8 lg:p-10 rounded-2xl border border-slate-200 dark:border-zinc-900 bg-white/60 dark:bg-zinc-900/30 backdrop-blur-sm hover:border-teal-500/30 hover:bg-white dark:hover:bg-zinc-900/50 hover:shadow-[0_0_50px_-12px_rgba(13,148,136,0.1)] transition-all duration-500 ease-out relative">
          
          {/* Accent Line Indicator */}
          <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-teal-500 to-emerald-400 opacity-80" />

          {/* Top Info Banner */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-lg bg-slate-100 dark:bg-zinc-850 border border-slate-200 dark:border-zinc-800 text-teal-600 dark:text-teal-500 group-hover/column:text-teal-700 dark:group-hover/column:text-teal-400 transition-colors duration-300">
                {icon}
              </div>
              <span className="font-mono text-xxs sm:text-xs text-slate-400 dark:text-zinc-500 tracking-widest uppercase">
                {tag}
              </span>
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-teal-500/20 bg-teal-500/5 text-[10px] font-mono text-teal-600 dark:text-teal-400 font-bold uppercase tracking-wider">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-500 animate-pulse" />
              Coming Soon
            </div>
          </div>

          {/* Title and Explanation */}
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-semibold tracking-tight text-slate-800 dark:text-zinc-100 mb-4 transition-colors duration-300 font-serif">
            {title}
          </h2>
          
          <p className="text-slate-500 dark:text-zinc-400 font-light leading-relaxed mb-8 text-sm md:text-base max-w-2xl">
            {explanation}
          </p>

          {/* Planned Features Section */}
          <div className="border-t border-slate-200/60 dark:border-zinc-800/80 pt-6">
            <h3 className="font-mono text-xxs sm:text-xs text-slate-400 dark:text-zinc-550 tracking-wider uppercase mb-5">
              // Planned Features & Directions
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {features.map((feature, idx) => (
                <div 
                  key={idx} 
                  className="p-4 rounded-xl border border-slate-100 dark:border-zinc-900/60 bg-slate-50/50 dark:bg-zinc-950/40 hover:border-teal-500/20 dark:hover:border-teal-500/20 hover:bg-white dark:hover:bg-zinc-900/40 transition-all duration-300"
                >
                  <h4 className="font-display font-semibold text-xs sm:text-sm text-slate-700 dark:text-zinc-200 mb-1.5">
                    {feature.title}
                  </h4>
                  <p className="text-slate-500 dark:text-zinc-400 text-xxs sm:text-xs font-light leading-relaxed">
                    {feature.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 max-w-7xl mx-auto w-full px-6 py-4 md:px-12 lg:px-16 border-t border-slate-200/60 dark:border-zinc-900 flex flex-col sm:flex-row justify-between items-center gap-3 text-[10px] font-mono text-slate-450 dark:text-zinc-500 transition-colors duration-500">
        <div>
          &copy; {new Date().getFullYear()} Neographer. All rights reserved.
        </div>
        <div className="flex gap-4 sm:gap-6">
          <a href="/" className="hover:text-slate-700 dark:hover:text-zinc-300 transition-colors">Landing Hub</a>
          <span className="text-slate-300 dark:text-zinc-800">&middot;</span>
          <a href="/resume" className="hover:text-slate-700 dark:hover:text-zinc-300 transition-colors">Resume</a>
        </div>
      </footer>
    </div>
  );
}
