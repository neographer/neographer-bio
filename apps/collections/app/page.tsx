"use client";

import React, { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { 
  Coins, 
  Wallet, 
  MapPin, 
  IndianRupee, 
  Search, 
  ExternalLink,
  BookOpen, 
  TrendingUp, 
  Info,
  Calendar,
  Grid,
  Filter,
  CheckCircle2,
  FolderOpen
} from "lucide-react";
import collectionDataRaw from "../data/collection.json";

// Type definitions matching CSV headers
interface CollectionItem {
  Country: string;
  Issuer: string;
  Currency: string;
  "Face value": string;
  Title: string;
  Type: string;
  "Year range": string;
  Shape: string;
  Composition: string;
  Weight: string;
  Diameter: string;
  Year: string;
  "Gregorian year": string;
  Mintmark: string;
  Quantity: string;
  Grade: string;
  Collection: string;
  "From set": string;
  "Estimate (INR)": string;
  _category: "Coins" | "Banknotes" | "Tokens" | "Medals" | "Exonumia & Tokens";
}

const collectionData = collectionDataRaw as CollectionItem[];

export default function CollectionsDashboard() {
  const [activeTab, setActiveTab] = useState<"dashboard" | "coins" | "banknotes" | "exonumia" | "resources">("dashboard");
  const [mounted, setMounted] = useState(false);
  const [hubUrl, setHubUrl] = useState('/');

  // Search and Filter State
  const [searchQuery, setSearchQuery] = useState("");
  const [countryFilter, setCountryFilter] = useState("ALL");
  const [gradeFilter, setGradeFilter] = useState("ALL");
  const [compositionFilter, setCompositionFilter] = useState("ALL");

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        setHubUrl('http://localhost:3000');
      } else {
        setHubUrl('https://neographer.co.in');
      }
    }
    setMounted(true);
  }, []);

  // Compute stats for Dashboard
  const stats = useMemo(() => {
    const totalItems = collectionData.length;
    
    // Unique countries
    const countries = new Set(collectionData.map(d => d.Country));
    const totalCountries = countries.size;

    // Total value
    let totalValue = 0;
    collectionData.forEach(d => {
      const val = parseFloat(d["Estimate (INR)"]);
      if (!isNaN(val)) {
        totalValue += val;
      }
    });

    // Breakdown counts
    let coinCount = 0;
    let banknoteCount = 0;
    let tokenCount = 0;

    collectionData.forEach(d => {
      if (d._category === "Coins") coinCount++;
      else if (d._category === "Banknotes") banknoteCount++;
      else tokenCount++;
    });

    // Oldest Item
    let oldestItem: CollectionItem | null = null;
    let minYear = 3000;
    for (const d of collectionData) {
      const year = parseInt(d["Gregorian year"]);
      if (!isNaN(year) && year > 0 && year < minYear) {
        minYear = year;
        oldestItem = d;
      }
    }

    // Highest value item
    let highestValueItem: CollectionItem | null = null;
    let maxVal = 0;
    for (const d of collectionData) {
      const val = parseFloat(d["Estimate (INR)"]);
      if (!isNaN(val) && val > maxVal) {
        maxVal = val;
        highestValueItem = d;
      }
    }

    // Top Countries
    const countryCounts: Record<string, number> = {};
    collectionData.forEach(d => {
      countryCounts[d.Country] = (countryCounts[d.Country] || 0) + 1;
    });
    const topCountries = Object.entries(countryCounts)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);

    // Grade Distribution
    const gradeCounts: Record<string, number> = {};
    collectionData.forEach(d => {
      const g = d.Grade || "Unspecified";
      gradeCounts[g] = (gradeCounts[g] || 0) + 1;
    });
    const topGrades = Object.entries(gradeCounts)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);

    // Composition Breakdown
    const compCounts: Record<string, number> = {};
    collectionData.forEach(d => {
      const c = d.Composition || "Paper / Other";
      compCounts[c] = (compCounts[c] || 0) + 1;
    });
    const topCompositions = Object.entries(compCounts)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 3);

    return {
      totalItems,
      totalCountries,
      totalValue,
      coinCount,
      banknoteCount,
      tokenCount,
      oldestItem,
      highestValueItem,
      topCountries,
      topGrades,
      topCompositions
    };
  }, []);

  // Filter lists dynamically based on category
  const filteredItems = useMemo(() => {
    let targetCat: string = "";
    if (activeTab === "coins") targetCat = "Coins";
    else if (activeTab === "banknotes") targetCat = "Banknotes";
    else if (activeTab === "exonumia") targetCat = "Tokens"; // includes Tokens, Medals, Exonumia

    return collectionData.filter(item => {
      // Category filter check
      if (activeTab === "coins" && item._category !== "Coins") return false;
      if (activeTab === "banknotes" && item._category !== "Banknotes") return false;
      if (activeTab === "exonumia" && (item._category === "Coins" || item._category === "Banknotes")) return false;

      // Text Search
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchText = `${item.Country} ${item.Issuer} ${item.Currency} ${item.Title} ${item.Composition} ${item.Grade} ${item.Year}`.toLowerCase();
        if (!matchText.includes(query)) return false;
      }

      // Dropdown Filters
      if (countryFilter !== "ALL" && item.Country !== countryFilter) return false;
      if (gradeFilter !== "ALL" && (item.Grade || "Unspecified") !== gradeFilter) return false;
      if (compositionFilter !== "ALL" && item.Composition !== compositionFilter) return false;

      return true;
    });
  }, [activeTab, searchQuery, countryFilter, gradeFilter, compositionFilter]);

  // Unique lists for filters in active tab
  const countryOptions = useMemo(() => {
    let dataset = collectionData;
    if (activeTab === "coins") dataset = collectionData.filter(d => d._category === "Coins");
    else if (activeTab === "banknotes") dataset = collectionData.filter(d => d._category === "Banknotes");
    else if (activeTab === "exonumia") dataset = collectionData.filter(d => d._category !== "Coins" && d._category !== "Banknotes");
    
    return Array.from(new Set(dataset.map(d => d.Country))).sort();
  }, [activeTab]);

  const gradeOptions = useMemo(() => {
    let dataset = collectionData;
    if (activeTab === "coins") dataset = collectionData.filter(d => d._category === "Coins");
    else if (activeTab === "banknotes") dataset = collectionData.filter(d => d._category === "Banknotes");
    else if (activeTab === "exonumia") dataset = collectionData.filter(d => d._category !== "Coins" && d._category !== "Banknotes");
    
    return Array.from(new Set(dataset.map(d => d.Grade || "Unspecified"))).sort();
  }, [activeTab]);

  const compositionOptions = useMemo(() => {
    let dataset = collectionData;
    if (activeTab === "coins") dataset = collectionData.filter(d => d._category === "Coins");
    else if (activeTab === "banknotes") dataset = collectionData.filter(d => d._category === "Banknotes");
    else if (activeTab === "exonumia") dataset = collectionData.filter(d => d._category !== "Coins" && d._category !== "Banknotes");

    return Array.from(new Set(dataset.map(d => d.Composition || "Unspecified"))).sort();
  }, [activeTab]);

  // Reset page filters on tab change
  useEffect(() => {
    setSearchQuery("");
    setCountryFilter("ALL");
    setGradeFilter("ALL");
    setCompositionFilter("ALL");
  }, [activeTab]);

  if (!mounted) return null;

  return (
    <div className="min-h-screen max-h-screen flex flex-col bg-slate-50 text-slate-900 overflow-hidden font-sans">
      
      {/* 1. Header Section */}
      <header className="flex-none bg-white border-b border-slate-200 py-3 px-6 shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <a href={hubUrl} className="group flex items-center gap-2 font-bold text-slate-800 text-base transition-colors">
              <span className="w-7 h-7 rounded-full border border-teal-500 bg-teal-50 flex items-center justify-center text-xs text-teal-600 font-mono font-bold group-hover:bg-teal-600 group-hover:text-white transition-all duration-300">N</span>
              <span className="tracking-tight group-hover:text-teal-600 transition-colors">neographer</span>
            </a>
            <span className="text-slate-300">|</span>
            <h1 className="text-sm font-semibold text-slate-500 uppercase tracking-widest font-mono">
              [COLLECTIONS & ARCHIVES]
            </h1>
          </div>
          <div className="text-[11px] font-mono text-slate-400 bg-slate-150 py-1 px-2.5 rounded-md border border-slate-200">
            host: collections.neographer.co.in
          </div>
        </div>
      </header>

      {/* 2. Navigation Tabs Bar */}
      <nav className="flex-none bg-white border-b border-slate-200 px-6 py-2 shadow-xs">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex gap-1">
            <button
              onClick={() => setActiveTab("dashboard")}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-medium tracking-tight transition-all flex items-center gap-1.5 ${
                activeTab === "dashboard"
                  ? "bg-teal-50 text-teal-700 border border-teal-200/50 shadow-xs font-semibold"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
              }`}
            >
              <Grid size={14} />
              <span>Dashboard Overview</span>
            </button>
            <button
              onClick={() => setActiveTab("coins")}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-medium tracking-tight transition-all flex items-center gap-1.5 ${
                activeTab === "coins"
                  ? "bg-teal-50 text-teal-700 border border-teal-200/50 shadow-xs font-semibold"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
              }`}
            >
              <Coins size={14} />
              <span>Coins</span>
              <span className="text-[10px] bg-slate-100 text-slate-500 px-1.5 py-0.2 rounded-full font-mono font-normal">
                {stats.coinCount}
              </span>
            </button>
            <button
              onClick={() => setActiveTab("banknotes")}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-medium tracking-tight transition-all flex items-center gap-1.5 ${
                activeTab === "banknotes"
                  ? "bg-teal-50 text-teal-700 border border-teal-200/50 shadow-xs font-semibold"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
              }`}
            >
              <Wallet size={14} />
              <span>Banknotes</span>
              <span className="text-[10px] bg-slate-100 text-slate-500 px-1.5 py-0.2 rounded-full font-mono font-normal">
                {stats.banknoteCount}
              </span>
            </button>
            <button
              onClick={() => setActiveTab("exonumia")}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-medium tracking-tight transition-all flex items-center gap-1.5 ${
                activeTab === "exonumia"
                  ? "bg-teal-50 text-teal-700 border border-teal-200/50 shadow-xs font-semibold"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
              }`}
            >
              <FolderOpen size={14} />
              <span>Exonumia & Tokens</span>
              <span className="text-[10px] bg-slate-100 text-slate-500 px-1.5 py-0.2 rounded-full font-mono font-normal">
                {stats.tokenCount}
              </span>
            </button>
            <button
              onClick={() => setActiveTab("resources")}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-medium tracking-tight transition-all flex items-center gap-1.5 ${
                activeTab === "resources"
                  ? "bg-teal-50 text-teal-700 border border-teal-200/50 shadow-xs font-semibold"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
              }`}
            >
              <BookOpen size={14} />
              <span>Resources</span>
            </button>
          </div>
        </div>
      </nav>

      {/* 3. Content Area */}
      <main className="flex-grow overflow-hidden max-w-7xl mx-auto w-full p-4 lg:p-6 flex flex-col justify-stretch">
        
        {/* DASHBOARD TAB - FITS SCREEN STRICTLY */}
        {activeTab === "dashboard" && (
          <div className="flex-grow flex flex-col justify-between gap-4 h-full overflow-hidden">
            
            {/* Top Row: Metric Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 flex-none">
              
              {/* Total items */}
              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs hover:border-teal-500/20 transition-all duration-300 flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-teal-50 text-teal-600 flex items-center justify-center text-lg flex-none">
                  <Coins size={20} />
                </div>
                <div>
                  <div className="text-[10px] font-mono text-slate-500 uppercase tracking-wider">Total Items</div>
                  <div className="text-xl font-bold text-slate-800">{stats.totalItems}</div>
                </div>
              </div>

              {/* Unique Countries */}
              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs hover:border-teal-500/20 transition-all duration-300 flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-teal-50 text-teal-600 flex items-center justify-center text-lg flex-none">
                  <MapPin size={20} />
                </div>
                <div>
                  <div className="text-[10px] font-mono text-slate-500 uppercase tracking-wider">Countries</div>
                  <div className="text-xl font-bold text-slate-800">{stats.totalCountries}</div>
                </div>
              </div>

              {/* Estimated Value */}
              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs hover:border-teal-500/20 transition-all duration-300 flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-teal-50 text-teal-600 flex items-center justify-center text-lg flex-none">
                  <IndianRupee size={20} />
                </div>
                <div>
                  <div className="text-[10px] font-mono text-slate-500 uppercase tracking-wider">Est. Value (INR)</div>
                  <div className="text-xl font-bold text-slate-800">
                    ₹{stats.totalValue.toLocaleString("en-IN", { maximumFractionDigits: 0 })}
                  </div>
                </div>
              </div>

              {/* Breakdown ratio */}
              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs hover:border-teal-500/20 transition-all duration-300 flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-teal-50 text-teal-600 flex items-center justify-center text-lg flex-none">
                  <TrendingUp size={20} />
                </div>
                <div>
                  <div className="text-[10px] font-mono text-slate-500 uppercase tracking-wider">Coins / Notes Split</div>
                  <div className="text-sm font-bold text-slate-800 flex items-baseline gap-1">
                    <span>{stats.coinCount}c</span>
                    <span className="text-slate-300">/</span>
                    <span>{stats.banknoteCount}n</span>
                    <span className="text-[10px] text-slate-400 font-normal ml-1">
                      ({Math.round((stats.coinCount/stats.totalItems)*100)}%)
                    </span>
                  </div>
                </div>
              </div>

            </div>

            {/* Bottom Row: Charts & Insights Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 flex-grow min-h-0 overflow-hidden">
              
              {/* Column 1: Top Countries (SVG Bar Chart) */}
              <div className="bg-white p-4 rounded-xl border border-slate-200 flex flex-col justify-between overflow-hidden shadow-xs">
                <div className="flex-none">
                  <h3 className="text-xs font-semibold text-slate-800 uppercase tracking-wider flex items-center gap-1.5 mb-3">
                    <MapPin size={14} className="text-teal-600" />
                    Top Countries Representation
                  </h3>
                </div>
                
                <div className="flex-grow flex flex-col justify-center gap-3">
                  {stats.topCountries.map((c, i) => {
                    const pct = Math.round((c.count / stats.totalItems) * 100);
                    return (
                      <div key={c.name} className="space-y-1">
                        <div className="flex justify-between text-xs font-medium text-slate-600">
                          <span className="truncate max-w-[180px]">{c.name}</span>
                          <span className="font-mono text-slate-400">{c.count} items ({pct}%)</span>
                        </div>
                        {/* Custom Animated CSS Bar */}
                        <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-teal-600 rounded-full transition-all duration-1000 ease-out"
                            style={{ width: `${(c.count / stats.topCountries[0].count) * 100}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Column 2: Premium Visual Ring Chart & Grade Stats */}
              <div className="bg-white p-4 rounded-xl border border-slate-200 flex flex-col justify-between overflow-hidden shadow-xs">
                <div className="flex-none">
                  <h3 className="text-xs font-semibold text-slate-800 uppercase tracking-wider flex items-center gap-1.5 mb-2">
                    <TrendingUp size={14} className="text-teal-600" />
                    Category & Grade Distributions
                  </h3>
                </div>
                
                {/* SVG Donut / Ring chart */}
                <div className="flex-grow flex items-center justify-around py-2 min-h-0">
                  <div className="relative w-28 h-28 flex-none flex items-center justify-center">
                    <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                      <circle
                        cx="18"
                        cy="18"
                        r="15.915"
                        fill="transparent"
                        stroke="#e2e8f0"
                        strokeWidth="2.5"
                      />
                      {/* Coins segment (teal) */}
                      <circle
                        cx="18"
                        cy="18"
                        r="15.915"
                        fill="transparent"
                        stroke="#0d9488"
                        strokeWidth="2.8"
                        strokeDasharray={`${(stats.coinCount / stats.totalItems) * 100} ${100 - ((stats.coinCount / stats.totalItems) * 100)}`}
                        strokeDashoffset="0"
                      />
                      {/* Banknotes segment (indigo/slate) */}
                      <circle
                        cx="18"
                        cy="18"
                        r="15.915"
                        fill="transparent"
                        stroke="#475569"
                        strokeWidth="2.8"
                        strokeDasharray={`${(stats.banknoteCount / stats.totalItems) * 100} ${100 - ((stats.banknoteCount / stats.totalItems) * 100)}`}
                        strokeDashoffset={`-${(stats.coinCount / stats.totalItems) * 100}`}
                      />
                    </svg>
                    <div className="absolute flex flex-col items-center justify-center text-center">
                      <span className="text-[10px] font-mono text-slate-400 uppercase">Ratio</span>
                      <span className="text-sm font-bold text-slate-700">
                        {Math.round((stats.coinCount / stats.totalItems) * 100)}%
                      </span>
                    </div>
                  </div>

                  <div className="text-xs space-y-1.5">
                    <div className="flex items-center gap-2">
                      <div className="w-2.5 h-2.5 rounded-full bg-teal-600 flex-none" />
                      <span className="text-slate-600 font-medium">Coins ({stats.coinCount})</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2.5 h-2.5 rounded-full bg-slate-600 flex-none" />
                      <span className="text-slate-600 font-medium">Notes ({stats.banknoteCount})</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2.5 h-2.5 rounded-full bg-slate-300 flex-none" />
                      <span className="text-slate-600 font-medium">Other ({stats.tokenCount})</span>
                    </div>
                  </div>
                </div>

                <div className="flex-none pt-2 border-t border-slate-100">
                  <div className="flex items-center justify-between text-[11px] text-slate-500 font-mono mb-1">
                    <span>TOP GRADES</span>
                    <span>UNC / XF / VF</span>
                  </div>
                  <div className="flex gap-1.5">
                    {stats.topGrades.map((g, i) => (
                      <div key={g.name} className="flex-1 bg-slate-50 hover:bg-slate-100 p-1.5 rounded border border-slate-150 text-center transition-all duration-300">
                        <div className="text-[9px] font-mono font-bold text-teal-600 truncate">{g.name}</div>
                        <div className="text-xs font-semibold text-slate-800 mt-0.5">{g.count}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Column 3: Collector Insights Panel */}
              <div className="bg-white p-4 rounded-xl border border-slate-200 flex flex-col justify-between overflow-hidden shadow-xs">
                <div className="flex-none">
                  <h3 className="text-xs font-semibold text-slate-800 uppercase tracking-wider flex items-center gap-1.5 mb-2.5">
                    <Info size={14} className="text-teal-600" />
                    Collector Insights
                  </h3>
                </div>

                {/* Insights List */}
                <div className="flex-grow flex flex-col justify-between gap-2.5 py-1 min-h-0 overflow-y-auto no-scrollbar">
                  
                  {/* Insight 1: Oldest Item */}
                  {stats.oldestItem && (
                    <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200/60 flex items-start gap-3">
                      <Calendar size={16} className="text-teal-600 mt-0.5 flex-none" />
                      <div className="min-w-0">
                        <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Oldest Piece</div>
                        <div className="text-xs font-bold text-slate-800 truncate">
                          {stats.oldestItem.Title}
                        </div>
                        <div className="text-[10px] text-slate-500">
                          {stats.oldestItem.Country} &middot; Year {stats.oldestItem.Year}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Insight 2: Highest Est Value */}
                  {stats.highestValueItem && (
                    <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200/60 flex items-start gap-3">
                      <TrendingUp size={16} className="text-teal-600 mt-0.5 flex-none" />
                      <div className="min-w-0">
                        <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Key Highlight Value</div>
                        <div className="text-xs font-bold text-slate-800 truncate">
                          {stats.highestValueItem.Title}
                        </div>
                        <div className="text-[10px] text-slate-500">
                          {stats.highestValueItem.Country} &middot; Est. ₹{parseFloat(stats.highestValueItem["Estimate (INR)"]).toLocaleString("en-IN")}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Insight 3: Core compositions */}
                  <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200/60 flex items-start gap-3">
                    <Info size={16} className="text-teal-600 mt-0.5 flex-none" />
                    <div className="min-w-0 flex-grow">
                      <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Key Compositions</div>
                      <div className="text-[11px] font-semibold text-slate-700 mt-0.5">
                        {stats.topCompositions.map(c => `${c.name} (${c.count})`).join(" , ")}
                      </div>
                    </div>
                  </div>

                </div>
              </div>

            </div>

            {/* Viewport Footer */}
            <div className="flex-none flex items-center justify-between text-[10px] font-mono text-slate-400 border-t border-slate-200/60 pt-2.5">
              <div>&copy; {new Date().getFullYear()} Neographer. All rights reserved.</div>
              <div className="flex gap-3">
                <span className="text-emerald-500 font-semibold flex items-center gap-1">
                  <CheckCircle2 size={10} />
                  Registry Verified
                </span>
                <span>&middot;</span>
                <span>Dataset: Numista Export v1.0</span>
              </div>
            </div>

          </div>
        )}

        {/* LIST TABS (COINS, BANKNOTES, EXONUMIA) - SCROLLABLE CONTENT */}
        {(activeTab === "coins" || activeTab === "banknotes" || activeTab === "exonumia") && (
          <div className="flex-grow flex flex-col min-h-0 bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            
            {/* Filter Toolbar Header */}
            <div className="flex-none p-4 bg-slate-50/50 border-b border-slate-200 flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
              
              {/* Search Box */}
              <div className="relative flex-grow max-w-md">
                <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search item title, country, currency, composition, grade..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-1.5 bg-white border border-slate-300 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-teal-500 focus:border-teal-500 transition"
                />
              </div>

              {/* Filters Group */}
              <div className="flex flex-wrap items-center gap-2">
                <div className="flex items-center gap-1.5 text-xs text-slate-500">
                  <Filter size={12} />
                  <span>Filters:</span>
                </div>
                
                {/* Country Filter */}
                <select
                  value={countryFilter}
                  onChange={(e) => setCountryFilter(e.target.value)}
                  className="px-2 py-1.5 bg-white border border-slate-300 rounded-lg text-[11px] font-medium text-slate-700 focus:outline-none focus:ring-1 focus:ring-teal-500 focus:border-teal-500"
                >
                  <option value="ALL">All Countries</option>
                  {countryOptions.map(c => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>

                {/* Grade Filter */}
                <select
                  value={gradeFilter}
                  onChange={(e) => setGradeFilter(e.target.value)}
                  className="px-2 py-1.5 bg-white border border-slate-300 rounded-lg text-[11px] font-medium text-slate-700 focus:outline-none focus:ring-1 focus:ring-teal-500 focus:border-teal-500"
                >
                  <option value="ALL">All Grades</option>
                  {gradeOptions.map(g => (
                    <option key={g} value={g}>{g}</option>
                  ))}
                </select>

                {/* Composition Filter */}
                <select
                  value={compositionFilter}
                  onChange={(e) => setCompositionFilter(e.target.value)}
                  className="px-2 py-1.5 bg-white border border-slate-300 rounded-lg text-[11px] font-medium text-slate-700 focus:outline-none focus:ring-1 focus:ring-teal-500 focus:border-teal-500"
                >
                  <option value="ALL">All Compositions</option>
                  {compositionOptions.map(c => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>

                {/* Reset button */}
                {(searchQuery || countryFilter !== "ALL" || gradeFilter !== "ALL" || compositionFilter !== "ALL") && (
                  <button
                    onClick={() => {
                      setSearchQuery("");
                      setCountryFilter("ALL");
                      setGradeFilter("ALL");
                      setCompositionFilter("ALL");
                    }}
                    className="px-2.5 py-1.5 text-xs text-teal-600 hover:bg-teal-50 rounded-lg border border-teal-200 transition font-medium"
                  >
                    Reset
                  </button>
                )}
              </div>

            </div>

            {/* Scrollable Results Table container */}
            <div className="flex-grow overflow-y-auto">
              {filteredItems.length === 0 ? (
                <div className="py-20 text-center text-slate-400 flex flex-col items-center justify-center">
                  <Info size={30} className="mb-2 text-slate-300" />
                  <p className="text-sm font-medium">No collection items match active criteria.</p>
                  <p className="text-xs text-slate-400 mt-1">Try resetting search filters or queries.</p>
                </div>
              ) : (
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50 text-[10px] font-mono text-slate-500 border-b border-slate-200 uppercase tracking-wider sticky top-0 z-10">
                      <th className="py-2.5 px-4 font-semibold">Country</th>
                      <th className="py-2.5 px-4 font-semibold">Face Value & Title</th>
                      <th className="py-2.5 px-4 font-semibold">Year</th>
                      <th className="py-2.5 px-4 font-semibold">Composition</th>
                      <th className="py-2.5 px-4 font-semibold">Grade</th>
                      <th className="py-2.5 px-4 font-semibold text-right">Est. Value (INR)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-xs">
                    {filteredItems.map((item, idx) => (
                      <tr key={idx} className="hover:bg-slate-50 transition-colors">
                        <td className="py-3 px-4 font-medium text-slate-800">{item.Country}</td>
                        <td className="py-3 px-4">
                          <div className="font-semibold text-slate-800">{item.Title}</div>
                          {item.Currency && (
                            <div className="text-[10px] text-slate-400 mt-0.5">
                              {item["Face value"]} {item.Currency} &middot; {item.Type}
                            </div>
                          )}
                        </td>
                        <td className="py-3 px-4 font-mono text-slate-500">{item.Year || item["Gregorian year"]}</td>
                        <td className="py-3 px-4 text-slate-500">{item.Composition || "-"}</td>
                        <td className="py-3 px-4">
                          <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold font-mono ${
                            item.Grade === "UNC" 
                              ? "bg-teal-50 text-teal-700 border border-teal-200/40" 
                              : "bg-slate-100 text-slate-600"
                          }`}>
                            {item.Grade || "Unspecified"}
                          </span>
                        </td>
                        <td className="py-3 px-4 font-mono font-semibold text-slate-700 text-right">
                          {item["Estimate (INR)"] ? `₹${parseFloat(item["Estimate (INR)"]).toLocaleString("en-IN")}` : "-"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>

            {/* Results Count footer */}
            <div className="flex-none p-3 border-t border-slate-200 bg-slate-50/50 flex justify-between items-center text-[10px] font-mono text-slate-500">
              <div>
                Showing {filteredItems.length} of {
                  activeTab === "coins" ? stats.coinCount : activeTab === "banknotes" ? stats.banknoteCount : stats.tokenCount
                } filtered items
              </div>
              <div className="font-semibold">
                Est. Active Value: ₹{filteredItems.reduce((acc, curr) => acc + (parseFloat(curr["Estimate (INR)"]) || 0), 0).toLocaleString("en-IN", { maximumFractionDigits: 0 })}
              </div>
            </div>

          </div>
        )}

        {/* RESOURCES TAB - SCROLLABLE LINKS */}
        {activeTab === "resources" && (
          <div className="flex-grow flex flex-col min-h-0 bg-white rounded-xl border border-slate-200 shadow-sm p-6 overflow-y-auto">
            <h2 className="text-base font-bold text-slate-800 mb-1">Collector Resources & Archives</h2>
            <p className="text-xs text-slate-500 mb-6">Reference guides and registry databases compiled for collectors and philatelists.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              {/* Card 1: India Post Permanent Pictorial Cancellations */}
              <div className="border border-slate-200 hover:border-teal-500/40 hover:shadow-[0_4px_20px_-4px_rgba(13,148,136,0.08)] rounded-xl p-5 transition-all duration-300 flex flex-col justify-between bg-slate-50/20">
                <div>
                  <div className="w-10 h-10 rounded-lg bg-teal-50 text-teal-600 flex items-center justify-center text-lg mb-3">
                    <MapPin size={18} />
                  </div>
                  <h3 className="text-sm font-bold text-slate-800 mb-1.5">
                    Permanent Pictorial Cancellations (PPC) Registry
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed mb-4">
                    Comprehensive catalog of permanent pictorial cancellations issued by India Post. Includes detailed state-wise records, pin codes, post office locations, and local heritage descriptions.
                  </p>
                </div>
                <div>
                  <Link 
                    href="/ppc"
                    className="inline-flex items-center gap-1.5 text-xs text-teal-600 hover:text-teal-700 font-semibold transition"
                  >
                    <span>Open PPC Registry</span>
                    <ExternalLink size={13} />
                  </Link>
                </div>
              </div>

              {/* Card 2: Numista Coin & Banknote database */}
              <div className="border border-slate-200 hover:border-teal-500/40 hover:shadow-[0_4px_20px_-4px_rgba(13,148,136,0.08)] rounded-xl p-5 transition-all duration-300 flex flex-col justify-between bg-slate-50/20">
                <div>
                  <div className="w-10 h-10 rounded-lg bg-teal-50 text-teal-600 flex items-center justify-center text-lg mb-3">
                    <Coins size={18} />
                  </div>
                  <h3 className="text-sm font-bold text-slate-800 mb-1.5">
                    Numista Catalogue Utility
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed mb-4">
                    External link to the world coin and banknote catalog, offering grading parameters, catalog numbering (KM/Krause), and values verification.
                  </p>
                </div>
                <div>
                  <a 
                    href="https://en.numista.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs text-teal-600 hover:text-teal-700 font-semibold transition"
                  >
                    <span>Visit Numista.com</span>
                    <ExternalLink size={13} />
                  </a>
                </div>
              </div>

            </div>
          </div>
        )}

      </main>

    </div>
  );
}
