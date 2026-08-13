"use client";

import React, { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { 
  Coins, 
  Wallet, 
  MapPin, 
  BookOpen, 
  Grid,
  ExternalLink,
  FolderOpen
} from "lucide-react";
import collectionDataRaw from "../data/collection.json";
import { DashboardOverview } from "../components/DashboardOverview";
import { ItemTable } from "../components/ItemTable";

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
  const [hubUrl, setHubUrl] = useState("/");

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1") {
        setHubUrl("http://localhost:3000");
      } else {
        setHubUrl("https://neographer.co.in");
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

  if (!mounted) return null;

  return (
    <div className="min-h-screen lg:max-h-screen flex flex-col bg-slate-50 text-slate-900 lg:overflow-hidden font-sans">
      
      {/* 1. Header Section */}
      <header className="flex-none bg-white border-b border-slate-200 py-3 px-6 shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <a href={hubUrl} className="group flex items-center gap-2 font-bold text-slate-800 text-base transition-colors">
              <span className="w-7 h-7 rounded-full border border-teal-500 bg-teal-50 flex items-center justify-center text-xs text-teal-600 font-mono font-bold group-hover:bg-teal-600 group-hover:text-white transition-all duration-300">N</span>
              <span className="tracking-tight group-hover:text-teal-600 transition-colors">neographer</span>
            </a>
            <span className="text-slate-300 hidden sm:inline">|</span>
            <h1 className="text-sm font-semibold text-slate-500 uppercase tracking-widest font-mono hidden sm:inline-block">
              [COLLECTIONS & ARCHIVES]
            </h1>
          </div>
          <div className="text-[11px] font-mono text-slate-405 bg-slate-150 py-1 px-2.5 rounded-md border border-slate-200 hidden xs:block">
            host: collections.neographer.co.in
          </div>
        </div>
      </header>

      <nav className="flex-none bg-white border-b border-slate-200 px-4 py-2 shadow-xs overflow-x-auto no-scrollbar">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex gap-1 flex-nowrap">
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

      <main className="flex-grow overflow-y-auto lg:overflow-hidden max-w-7xl mx-auto w-full p-3 lg:p-6 flex flex-col justify-stretch">
        
        {/* DASHBOARD TAB - FITS SCREEN STRICTLY */}
        {activeTab === "dashboard" && (
          <DashboardOverview stats={stats} />
        )}

        {/* LIST TABS - SCROLLABLE DATA TABLE */}
        {(activeTab === "coins" || activeTab === "banknotes" || activeTab === "exonumia") && (
          <ItemTable 
            activeTab={activeTab} 
            collectionData={collectionData} 
            coinCount={stats.coinCount}
            banknoteCount={stats.banknoteCount}
            tokenCount={stats.tokenCount}
          />
        )}

        {/* RESOURCES TAB */}
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
