"use client"

import Image from 'next/image'
import mePic from '../public/images/me.jpg'
import resumeDataRaw from '../data/data.json'

interface ExperienceItem {
  company: string;
  position: string;
  location: string;
  start: string;
  end: string;
  current: boolean;
  desc?: string[];
}

interface SkillCategory {
  type: string;
  items: string[];
}

interface EducationItem {
  institution: string;
  degree: string;
  location: string;
  start: string;
  end: string;
}

interface AchievementItem {
  title: string;
  organization: string;
  description: string;
}

interface VolunteerItem {
  organization: string;
  position: string;
  location: string;
  start: string;
  end: string;
  desc: string[];
}

interface ResumeData {
  name: string;
  title: string;
  location: string;
  phone: string;
  email: string;
  linkedin: string;
  github: string;
  summary: string;
  companies: string[];
  clients: string[];
  experience: ExperienceItem[];
  skills: SkillCategory[];
  education: EducationItem[];
  achievements: AchievementItem[];
  volunteer: VolunteerItem[];
  interests: string[];
}

const resumeData = resumeDataRaw as unknown as ResumeData;

export default function ResumePage() {
  return (
    <>
      {/* ========================================================================= */}
      {/* 1. SCREEN VIEW: Interactive Professional Portfolio Website                */}
      {/* ========================================================================= */}
      <div className="print:hidden min-h-screen bg-slate-50 text-slate-800 font-sans selection:bg-teal-200">
        

        {/* Hero Section */}
        <header className="bg-gradient-to-br from-slate-900 via-slate-800 to-teal-950 text-white py-16 px-4">
          <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white">
                {resumeData.name}
              </h1>
              <p className="text-xl sm:text-2xl font-bold text-teal-400 mt-2 tracking-wide uppercase">
                {resumeData.title}
              </p>
              
              {/* Contact Icons Grid */}
              <div className="flex flex-wrap justify-center md:justify-start gap-4 mt-6 text-sm text-slate-300">
                <div className="flex items-center gap-1.5 bg-white/10 px-3.5 py-2 rounded-full border border-white/5 backdrop-blur-sm">
                  <span>📍 {resumeData.location}</span>
                </div>
                <div className="flex items-center gap-1.5 bg-white/10 px-3.5 py-2 rounded-full border border-white/5 backdrop-blur-sm">
                  <span>📞 {resumeData.phone}</span>
                </div>
                <a 
                  href={`mailto:${resumeData.email}`}
                  className="flex items-center gap-1.5 bg-white/10 hover:bg-white/20 px-3.5 py-2 rounded-full border border-white/5 backdrop-blur-sm transition-all"
                >
                  <span>✉️ {resumeData.email}</span>
                </a>
                <a 
                  href={`https://${resumeData.linkedin}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1.5 bg-white/10 hover:bg-white/20 px-3.5 py-2 rounded-full border border-white/5 backdrop-blur-sm transition-all"
                >
                  <span>🔗 LinkedIn</span>
                </a>
                {resumeData.github && (
                  <a 
                    href={`https://${resumeData.github}`}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1.5 bg-white/10 hover:bg-white/20 px-3.5 py-2 rounded-full border border-white/5 backdrop-blur-sm transition-all"
                  >
                    <span>💻 GitHub</span>
                  </a>
                )}
              </div>

              {/* Companies & Clients Quick Peek */}
              <div className="mt-6 pt-5 border-t border-white/10 flex flex-col sm:flex-row gap-x-8 gap-y-2 text-xs text-slate-300">
                <div>
                  <span className="text-teal-400 font-bold uppercase tracking-wider block mb-0.5">Companies Worked With:</span>
                  <span className="text-white font-semibold">{resumeData.companies.join(" • ")}</span>
                </div>
                <div>
                  <span className="text-teal-400 font-bold uppercase tracking-wider block mb-0.5">Clients Worked With:</span>
                  <span className="text-white font-semibold">{resumeData.clients.join(" • ")}</span>
                </div>
              </div>
            </div>

            {/* Profile Avatar with Animation */}
            <div className="flex-shrink-0 relative group">
              <div className="absolute inset-0 bg-teal-500 rounded-full blur-lg opacity-40 group-hover:opacity-75 transition-all duration-300"></div>
              <div className="relative w-36 h-36 sm:w-44 sm:h-44 rounded-full border-4 border-teal-500 overflow-hidden shadow-2xl transition-all duration-300 group-hover:scale-105">
                <Image 
                  src={mePic} 
                  alt={resumeData.name} 
                  layout="fill"
                  objectFit="cover" 
                  priority
                />
              </div>
            </div>
          </div>
        </header>

        {/* Main Content Layout */}
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left / Sidebar Column: Summary & Technical Skills & Education */}
          <div className="lg:col-span-1 space-y-8">
            
            {/* Summary Card */}
            <section className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition-all duration-200 border border-slate-200">
              <h2 className="text-lg font-bold text-slate-800 border-b border-slate-100 pb-2 mb-4 flex items-center gap-2">
                <span className="w-1.5 h-5 bg-teal-600 rounded-full"></span>
                About Me
              </h2>
              <p className="text-slate-600 text-sm leading-relaxed">
                {resumeData.summary}
              </p>
            </section>

            {/* Technical Skills Card */}
            <section className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition-all duration-200 border border-slate-200">
              <h2 className="text-lg font-bold text-slate-800 border-b border-slate-100 pb-2 mb-4 flex items-center gap-2">
                <span className="w-1.5 h-5 bg-teal-600 rounded-full"></span>
                Technical Skills
              </h2>
              <div className="space-y-4">
                {resumeData.skills.map((skillCat, idx) => (
                  <div key={idx}>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-teal-600 mb-2">{skillCat.type}</h3>
                    <div className="flex flex-wrap gap-1.5">
                      {skillCat.items.map((skill, sIdx) => (
                        <span 
                          key={sIdx}
                          className="bg-teal-50 text-teal-800 text-xs px-2.5 py-1 rounded-md font-medium border border-teal-100 hover:bg-teal-100 transition-colors"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Education Card */}
            <section className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition-all duration-200 border border-slate-200">
              <h2 className="text-lg font-bold text-slate-800 border-b border-slate-100 pb-2 mb-4 flex items-center gap-2">
                <span className="w-1.5 h-5 bg-teal-600 rounded-full"></span>
                Education
              </h2>
              <div className="space-y-4">
                {resumeData.education.map((edu, idx) => (
                  <div key={idx} className="relative pl-4 border-l border-slate-200">
                    <span className="absolute -left-[5px] top-1.5 w-2 h-2 rounded-full bg-teal-600"></span>
                    <h3 className="font-bold text-slate-800 text-sm">{edu.degree}</h3>
                    <p className="text-slate-600 text-xs mt-0.5">{edu.institution}</p>
                    <div className="flex justify-between text-slate-400 text-xxs mt-1 font-medium">
                      <span>Graduated: {edu.end}</span>
                      <span>{edu.location}</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Right Column: Work Experience & Achievements & Volunteering */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Work Experience */}
            <section className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition-all duration-200 border border-slate-200">
              <h2 className="text-lg font-bold text-slate-800 border-b border-slate-100 pb-2 mb-6 flex items-center gap-2">
                <span className="w-1.5 h-5 bg-teal-600 rounded-full"></span>
                Work Experience
              </h2>
              <div className="space-y-6">
                {resumeData.experience.map((exp, idx) => (
                  <article key={idx} className="relative pl-6 border-l-2 border-slate-100 hover:border-teal-500 transition-colors">
                    {/* Timeline Node */}
                    <div className="absolute -left-[7px] top-1 w-3 h-3 rounded-full bg-slate-200 border-2 border-white hover:bg-teal-500 transition-colors"></div>
                    
                    <div className="flex flex-col sm:flex-row justify-between items-start gap-1">
                      <div>
                        <h3 className="font-bold text-slate-800 text-base">{exp.position}</h3>
                        <p className="text-teal-600 text-sm font-semibold mt-0.5">{exp.company}</p>
                      </div>
                      <div className="text-slate-400 text-xs sm:text-right font-medium">
                        <span>{exp.start} – {exp.end}</span>
                        <div className="text-xxs italic">{exp.location}</div>
                      </div>
                    </div>
                    {exp.desc && (
                      <ul className="list-disc pl-4 mt-3 space-y-1.5 text-slate-600 text-sm leading-relaxed">
                        {exp.desc.map((bullet, bIdx) => (
                          <li key={bIdx}>{bullet}</li>
                        ))}
                      </ul>
                    )}
                  </article>
                ))}
              </div>
            </section>

            {/* Key Achievements */}
            <section className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition-all duration-200 border border-slate-200">
              <h2 className="text-lg font-bold text-slate-800 border-b border-slate-100 pb-2 mb-4 flex items-center gap-2">
                <span className="w-1.5 h-5 bg-teal-600 rounded-full"></span>
                Key Achievements
              </h2>
              <ul className="space-y-4">
                {resumeData.achievements.map((ach, idx) => (
                  <li key={idx} className="flex gap-3">
                    <span className="text-xl">🏆</span>
                    <div>
                      <h3 className="font-bold text-slate-800 text-sm">{ach.title}</h3>
                      <p className="text-teal-600 text-xs font-semibold">{ach.organization}</p>
                      <p className="text-slate-600 text-xs mt-1 leading-relaxed">{ach.description}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </section>

            {/* Volunteering & Interests */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Volunteering */}
              <section className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition-all duration-200 border border-slate-200">
                <h2 className="text-lg font-bold text-slate-800 border-b border-slate-100 pb-2 mb-4 flex items-center gap-2">
                  <span className="w-1.5 h-5 bg-teal-600 rounded-full"></span>
                  Volunteering
                </h2>
                {resumeData.volunteer.map((vol, idx) => (
                  <div key={idx} className="space-y-2">
                    <div className="flex justify-between items-start">
                      <h3 className="font-bold text-slate-800 text-sm">{vol.position}</h3>
                      <span className="text-slate-400 text-[10px] font-semibold">{vol.start} – {vol.end}</span>
                    </div>
                    <p className="text-teal-600 text-xs font-semibold">{vol.organization}</p>
                    <p className="text-slate-600 text-xs leading-relaxed">{vol.desc[0]}</p>
                  </div>
                ))}
              </section>

              {/* Interests */}
              <section className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition-all duration-200 border border-slate-200">
                <h2 className="text-lg font-bold text-slate-800 border-b border-slate-100 pb-2 mb-4 flex items-center gap-2">
                  <span className="w-1.5 h-5 bg-teal-600 rounded-full"></span>
                  Interests
                </h2>
                <div className="flex flex-wrap gap-2 mt-4">
                  {resumeData.interests.map((interest, idx) => (
                    <span 
                      key={idx}
                      className="bg-slate-100 text-slate-700 text-xs px-3 py-1.5 rounded-full font-medium"
                    >
                      {interest}
                    </span>
                  ))}
                </div>
              </section>
            </div>
          </div>
        </div>

        {/* Floating Print Button for Screen View */}
        <div className="fixed bottom-6 right-6 z-50">
          <button
            onClick={() => window.print()}
            className="bg-teal-600 hover:bg-teal-700 text-white font-bold p-4 rounded-full shadow-2xl flex items-center justify-center transition-all hover:scale-110 active:scale-95 group"
            title="Print or Save as PDF"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6.72 13.829c-.24.03-.48.062-.72.096m.72-.096a42.415 42.415 0 0110.56 0m-10.56 0L6.34 18m10.94-4.171c.24.03.48.062.72.096m-.72-.096L17.66 18m0 0l.229 1.258a1.791 1.791 0 01-1.761 2.112H7.872A1.791 1.791 0 016.11 20.13l.23-1.258m11.32 0A12.006 12.006 0 0018 15V7.5a4.5 4.5 0 00-9 0V15c0 .73-.082 1.44-.24 2.13m11.28 0H6.108" />
            </svg>
            <span className="max-w-0 overflow-hidden group-hover:max-w-xs group-hover:ml-2 transition-all duration-300 ease-out font-semibold text-sm whitespace-nowrap">
              Print / Save PDF
            </span>
          </button>
        </div>

        {/* Footer */}
        <footer className="bg-slate-900 text-slate-500 text-center py-8 text-xs border-t border-slate-800">
          <p>© {new Date().getFullYear()} {resumeData.name}. All rights reserved.</p>
        </footer>
      </div>

      {/* ========================================================================= */}
      {/* 2. PRINT VIEW: High-Fidelity Two-Column A4 PDF Layout                     */}
      {/* ========================================================================= */}
      <div className="hidden print:block w-[210mm] text-black font-sans selection:bg-transparent">
        
        {/* Header Block */}
        <div className="flex justify-between items-start border-b-[3px] border-teal-800 pb-3.5 mb-4">
          <div className="flex-1 pr-6">
            <h1 className="text-2xl font-black text-teal-800 uppercase tracking-tight leading-none">
              {resumeData.name}
            </h1>
            <p className="text-[9pt] font-extrabold text-teal-700 tracking-wider mt-1.5 uppercase leading-none">
              {resumeData.title}
            </p>
            <div className="flex flex-wrap items-center gap-x-3.5 gap-y-1 text-[7.5pt] text-neutral-600 mt-3 font-semibold">
              <span className="flex items-center gap-1">📍 {resumeData.location}</span>
              <span>•</span>
              <span className="flex items-center gap-1">📞 {resumeData.phone}</span>
              <span>•</span>
              <a 
                href={`mailto:${resumeData.email}`} 
                className="hover:underline flex items-center gap-1"
              >
                ✉️ {resumeData.email}
              </a>
              <span>•</span>
              <a 
                href={`https://${resumeData.linkedin}`} 
                className="hover:underline flex items-center gap-1"
              >
                🔗 {resumeData.linkedin}
              </a>
            </div>

            <div className="mt-2.5 pt-2 border-t border-neutral-100 flex flex-col gap-0.5 text-[7.5pt] text-neutral-600">
              <div>
                <strong className="text-teal-800">Companies Worked With:</strong> {resumeData.companies.join(", ")}
              </div>
              <div>
                <strong className="text-teal-800">Clients Worked With:</strong> {resumeData.clients.join(", ")}
              </div>
            </div>
          </div>
          
          {/* Circular Photo with Teal Ring */}
          <div className="flex-shrink-0 relative w-16 h-16 rounded-full border-2 border-teal-800 overflow-hidden shadow-sm">
            <Image 
              src={mePic} 
              alt={resumeData.name} 
              layout="fill"
              objectFit="cover" 
              priority
            />
          </div>
        </div>

        {/* Two-Column Layout Grid */}
        <div className="grid grid-cols-[1.85fr_1fr] gap-x-6 gap-y-4">
          
          {/* Left Column: Work Experience */}
          <div className="space-y-4">
            <div>
              <h2 className="text-[10pt] font-bold text-teal-800 uppercase tracking-wider border-b-2 border-teal-800 pb-0.5 mb-3 flex items-center justify-between">
                <span>Work Experience</span>
              </h2>
              
              <div className="space-y-3.5">
                {resumeData.experience.map((exp, idx) => (
                  <article key={idx} className="break-inside-avoid">
                    <div className="flex justify-between items-start leading-tight">
                      <div>
                        <h3 className="text-[8.5pt] font-black text-neutral-900">
                          {exp.position}
                        </h3>
                        <p className="text-[7.5pt] font-extrabold text-teal-700 mt-0.5">
                          {exp.company}
                        </p>
                      </div>
                      <div className="text-right text-[7.5pt] text-neutral-500 font-semibold flex flex-col items-end">
                        <span className="text-neutral-800">{exp.start} – {exp.current ? 'Present' : exp.end}</span>
                        <span className="text-[7pt] text-neutral-400 mt-0.5">{exp.location}</span>
                      </div>
                    </div>
                    {exp.desc && exp.desc.length > 0 && (
                      <ul className="list-disc pl-3.5 mt-1.5 space-y-0.5 text-[7.5pt] text-neutral-700 leading-snug">
                        {exp.desc.map((bullet, bIdx) => (
                          <li key={bIdx}>
                            {bullet}
                          </li>
                        ))}
                      </ul>
                    )}
                  </article>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Sidebar (Skills, Summary, Education, Achievements, volunteering, Interests) */}
          <div className="space-y-4.5 border-l border-neutral-100 pl-4">
            
            {/* Profile Summary Section */}
            <div className="break-inside-avoid">
              <h2 className="text-[10pt] font-bold text-teal-800 uppercase tracking-wider border-b-2 border-teal-800 pb-0.5 mb-2.5">
                Profile Summary
              </h2>
              <p className="text-[7.5pt] text-neutral-700 leading-relaxed text-justify">
                {resumeData.summary}
              </p>
            </div>

            {/* Technical Skills Section */}
            <div className="break-inside-avoid">
              <h2 className="text-[10pt] font-bold text-teal-800 uppercase tracking-wider border-b-2 border-teal-800 pb-0.5 mb-2.5">
                Technical Skills
              </h2>
              <div className="space-y-2">
                {resumeData.skills.map((skillCat, idx) => (
                  <div key={idx} className="text-[7.5pt] leading-tight">
                    <strong className="text-teal-800 font-black">{skillCat.type}</strong>
                    <p className="text-neutral-700 mt-0.5">{skillCat.items.join(", ")}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Education Section */}
            <div className="break-inside-avoid">
              <h2 className="text-[10pt] font-bold text-teal-800 uppercase tracking-wider border-b-2 border-teal-800 pb-0.5 mb-2.5">
                Education
              </h2>
              <div className="space-y-2.5">
                {resumeData.education.map((edu, idx) => (
                  <div key={idx} className="text-[7.5pt]">
                    <div className="flex justify-between items-start font-black text-neutral-800 leading-tight">
                      <span>{edu.degree}</span>
                      <span className="font-semibold text-neutral-500">{edu.end}</span>
                    </div>
                    <p className="text-teal-700 mt-0.5 font-bold">{edu.institution}</p>
                    <p className="text-neutral-400 text-[7pt] mt-0.5 font-medium">{edu.location}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Achievements Section */}
            <div className="break-inside-avoid">
              <h2 className="text-[10pt] font-bold text-teal-800 uppercase tracking-wider border-b-2 border-teal-800 pb-0.5 mb-2.5">
                Key Achievements
              </h2>
              <ul className="list-disc pl-3.5 text-[7.5pt] text-neutral-700 space-y-2 leading-tight">
                {resumeData.achievements.map((ach, idx) => (
                  <li key={idx}>
                    <strong className="text-neutral-900 font-black">{ach.title}</strong>
                    <span className="text-teal-700 font-bold block">{ach.organization}</span>
                    <p className="text-neutral-600 text-[7pt] mt-0.5 leading-normal">{ach.description}</p>
                  </li>
                ))}
              </ul>
            </div>

            {/* Volunteering Section */}
            <div className="break-inside-avoid">
              <h2 className="text-[10pt] font-bold text-teal-800 uppercase tracking-wider border-b-2 border-teal-800 pb-0.5 mb-2.5">
                Volunteering
              </h2>
              {resumeData.volunteer.map((vol, idx) => (
                <div key={idx} className="text-[7.5pt]">
                  <div className="flex justify-between font-black text-neutral-800 leading-tight">
                    <span>{vol.position}, {vol.organization}</span>
                    <span className="font-semibold text-neutral-500">{vol.start} – {vol.end}</span>
                  </div>
                  <p className="text-neutral-600 mt-1.5 leading-relaxed">{vol.desc[0]}</p>
                </div>
              ))}
            </div>

            {/* Interests Section */}
            <div className="break-inside-avoid">
              <h2 className="text-[10pt] font-bold text-teal-800 uppercase tracking-wider border-b-2 border-teal-800 pb-0.5 mb-2">
                Interests
              </h2>
              <p className="text-[7.5pt] text-neutral-700 font-medium">
                {resumeData.interests.join(", ")}
              </p>
            </div>

          </div>
        </div>

      </div>
    </>
  )
}
