"use client";

import React, { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { 
  ArrowLeft, 
  Search, 
  MapPin, 
  Calendar, 
  FileText, 
  Download, 
  Copy, 
  X, 
  Check, 
  LayoutGrid, 
  Table, 
  RotateCcw,
  Sparkles,
  Info,
  CheckCircle2
} from "lucide-react";
import cancellationsRaw from "../../data/cancellations.json";

// Type definitions matching PPC records
interface CancelItem {
  id: string;
  state: string;
  district: string;
  poName: string;
  pincode: string;
  subject: string;
  category: string;
  introDate: string;
  status: string;
  motif: string;
  details: string;
}

const cancellationsData = cancellationsRaw as CancelItem[];

export default function PpcRegistry() {
  const [mounted, setMounted] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [stateFilter, setStateFilter] = useState("ALL");
  const [categoryFilter, setCategoryFilter] = useState("ALL");
  const [viewType, setViewType] = useState<"table" | "card">("table");
  
  // Modal State
  const [selectedItem, setSelectedItem] = useState<CancelItem | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Compute unique values for filters
  const uniqueStates = useMemo(() => {
    return Array.from(new Set(cancellationsData.map(item => item.state))).sort();
  }, []);

  const uniqueCategories = useMemo(() => {
    return Array.from(new Set(cancellationsData.map(item => item.category))).sort();
  }, []);

  // Search and Filter logic
  const filteredCancellations = useMemo(() => {
    return cancellationsData.filter(item => {
      // Text Search
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchText = `${item.state} ${item.district} ${item.poName} ${item.pincode} ${item.subject} ${item.category} ${item.motif} ${item.details}`.toLowerCase();
        if (!matchText.includes(query)) return false;
      }

      // State Filter
      if (stateFilter !== "ALL" && item.state !== stateFilter) return false;

      // Category Filter
      if (categoryFilter !== "ALL" && item.category !== categoryFilter) return false;

      return true;
    });
  }, [searchQuery, stateFilter, categoryFilter]);

  // Statistics
  const stats = useMemo(() => {
    const total = cancellationsData.length;
    const statesCount = new Set(cancellationsData.map(item => item.state)).size;
    const categoriesCount = new Set(cancellationsData.map(item => item.category)).size;
    const workingCount = cancellationsData.filter(item => item.status.toLowerCase() === "working").length;

    return {
      total,
      statesCount,
      categoriesCount,
      workingCount
    };
  }, []);

  // CSV Exporter
  const handleExportCsv = () => {
    const headers = [
      "ID", "State/UT", "District", "Post Office Name", 
      "PIN Code", "Cancellation Subject", "Category", 
      "Introduction Date", "Status", "Design Motif Description", 
      "Place Heritage & Significance"
    ];

    const rows = filteredCancellations.map(item => [
      `"${item.id}"`,
      `"${item.state}"`,
      `"${item.district}"`,
      `"${item.poName}"`,
      `"${item.pincode}"`,
      `"${item.subject.replace(/"/g, '""')}"`,
      `"${item.category}"`,
      `"${item.introDate}"`,
      `"${item.status}"`,
      `"${item.motif.replace(/"/g, '""')}"`,
      `"${item.details.replace(/"/g, '""')}"`
    ]);

    const csvContent = "\uFEFF" + [headers.join(","), ...rows.map(e => e.join(","))].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `india_post_ppc_registry_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // JSON Exporter
  const handleExportJson = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(filteredCancellations, null, 2));
    const link = document.createElement("a");
    link.setAttribute("href", dataStr);
    link.setAttribute("download", `india_post_ppc_registry_${new Date().toISOString().split('T')[0]}.json`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Copy Details Function
  const handleCopyDetails = (item: CancelItem) => {
    const textToCopy = `Permanent Pictorial Cancellation: ${item.subject}\nLocation: ${item.poName} (${item.pincode}), ${item.district}, ${item.state}\nCategory: ${item.category}\nMotif: ${item.motif}\nSignificance: ${item.details}`;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleResetFilters = () => {
    setSearchQuery("");
    setStateFilter("ALL");
    setCategoryFilter("ALL");
  };

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans flex flex-col antialiased">
      
      {/* Header Bar */}
      <header className="bg-white border-b border-slate-200 py-4 px-6 shadow-xs flex-none">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link 
              href="/" 
              className="p-1.5 rounded-lg border border-slate-200 text-slate-500 hover:text-slate-900 hover:bg-slate-50 transition"
              title="Back to Collections Dashboard"
            >
              <ArrowLeft size={16} />
            </Link>
            <div>
              <div className="flex items-center gap-2">
                <span className="bg-teal-50 text-teal-700 text-[10px] font-bold font-mono px-2 py-0.5 rounded border border-teal-200/40 uppercase tracking-wider">Philately Archive</span>
                <span className="text-[10px] text-slate-400 font-mono">India Post Official Catalog</span>
              </div>
              <h1 className="text-lg font-bold text-slate-800 tracking-tight mt-0.5">
                Permanent Pictorial Cancellations of India
              </h1>
            </div>
          </div>

          {/* Export Actions */}
          <div className="flex items-center gap-2 self-start sm:self-auto">
            <button
              onClick={handleExportCsv}
              disabled={filteredCancellations.length === 0}
              className="bg-white border border-slate-200 text-slate-700 px-3 py-1.5 rounded-lg font-semibold text-xs shadow-xs hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition flex items-center gap-1.5"
            >
              <Download size={13} />
              <span>Export CSV</span>
            </button>
            <button
              onClick={handleExportJson}
              disabled={filteredCancellations.length === 0}
              className="bg-white border border-slate-200 text-slate-700 px-3 py-1.5 rounded-lg font-semibold text-xs shadow-xs hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition flex items-center gap-1.5"
            >
              <Download size={13} />
              <span>Export JSON</span>
            </button>
          </div>
        </div>
      </header>

      {/* Stats Summary Bar */}
      <section className="bg-white border-b border-slate-200/80 shadow-xs flex-none">
        <div className="max-w-7xl mx-auto px-6 py-3.5 grid grid-cols-2 md:grid-cols-4 gap-4">
          
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-teal-50 text-teal-600 flex items-center justify-center font-bold text-base">
              <Sparkles size={16} />
            </div>
            <div>
              <div className="text-[9px] font-mono text-slate-450 uppercase tracking-wider">Total PPCs</div>
              <div className="text-base font-bold text-slate-800">{stats.total}</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-teal-50 text-teal-600 flex items-center justify-center font-bold text-base">
              <MapPin size={16} />
            </div>
            <div>
              <div className="text-[9px] font-mono text-slate-450 uppercase tracking-wider">States & UTs</div>
              <div className="text-base font-bold text-slate-800">{stats.statesCount}</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-teal-50 text-teal-600 flex items-center justify-center font-bold text-base">
              <FileText size={16} />
            </div>
            <div>
              <div className="text-[9px] font-mono text-slate-450 uppercase tracking-wider">Categories</div>
              <div className="text-base font-bold text-slate-800">{stats.categoriesCount}</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-teal-50 text-teal-600 flex items-center justify-center font-bold text-base">
              <CheckCircle2 size={16} />
            </div>
            <div>
              <div className="text-[9px] font-mono text-slate-450 uppercase tracking-wider">Active Status</div>
              <div className="text-base font-bold text-slate-800">{stats.workingCount} Working</div>
            </div>
          </div>

        </div>
      </section>

      {/* Main Filter and Results Section */}
      <main className="max-w-7xl mx-auto w-full px-6 py-6 flex-grow flex flex-col gap-6 overflow-hidden">
        
        {/* Filter Toolbar */}
        <div className="bg-white rounded-xl shadow-xs border border-slate-200 p-4 flex flex-col lg:flex-row gap-4 items-stretch lg:items-center justify-between flex-none">
          
          {/* Search Box */}
          <div className="relative flex-grow max-w-lg">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search by Post Office, Subject, district, PIN code, motif..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-8 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-teal-500 focus:border-teal-500 focus:bg-white transition"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery("")}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                <X size={14} />
              </button>
            )}
          </div>

          {/* Filters Controls */}
          <div className="flex flex-wrap items-center gap-3">
            
            {/* State filter */}
            <select
              value={stateFilter}
              onChange={(e) => setStateFilter(e.target.value)}
              className="py-2 px-3 bg-slate-50 border border-slate-300 rounded-lg text-xs font-semibold text-slate-700 focus:outline-none focus:ring-1 focus:ring-teal-500 focus:bg-white transition"
            >
              <option value="ALL">All States & UTs</option>
              {uniqueStates.map(state => (
                <option key={state} value={state}>{state}</option>
              ))}
            </select>

            {/* Category filter */}
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="py-2 px-3 bg-slate-50 border border-slate-300 rounded-lg text-xs font-semibold text-slate-700 focus:outline-none focus:ring-1 focus:ring-teal-500 focus:bg-white transition"
            >
              <option value="ALL">All Categories</option>
              {uniqueCategories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>

            {/* View Switcher Toggle */}
            <div className="flex bg-slate-100 p-0.5 rounded-lg border border-slate-200">
              <button
                onClick={() => setViewType("table")}
                className={`p-1.5 rounded-md transition ${
                  viewType === "table" 
                    ? "bg-white text-slate-800 shadow-xs" 
                    : "text-slate-500 hover:text-slate-800"
                }`}
                title="Table View"
              >
                <Table size={14} />
              </button>
              <button
                onClick={() => setViewType("card")}
                className={`p-1.5 rounded-md transition ${
                  viewType === "card" 
                    ? "bg-white text-slate-800 shadow-xs" 
                    : "text-slate-500 hover:text-slate-800"
                }`}
                title="Card View"
              >
                <LayoutGrid size={14} />
              </button>
            </div>

            {/* Reset filters */}
            {(searchQuery || stateFilter !== "ALL" || categoryFilter !== "ALL") && (
              <button
                onClick={handleResetFilters}
                className="p-2 text-slate-500 hover:text-teal-600 border border-slate-200 hover:border-teal-300 rounded-lg bg-white transition"
                title="Reset Filters"
              >
                <RotateCcw size={14} />
              </button>
            )}
          </div>
        </div>

        {/* Dynamic Category Badges (clicking selects category) */}
        <div className="flex flex-wrap gap-1.5 items-center flex-none">
          <span className="text-[10px] font-mono text-slate-450 uppercase mr-1">Quick categories:</span>
          <button
            onClick={() => setCategoryFilter("ALL")}
            className={`px-2.5 py-1 rounded-full text-[10px] font-semibold border transition ${
              categoryFilter === "ALL"
                ? "bg-teal-600 text-white border-teal-600"
                : "bg-white text-slate-600 border-slate-200 hover:border-slate-350 hover:bg-slate-50"
            }`}
          >
            All
          </button>
          {uniqueCategories.map(cat => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`px-2.5 py-1 rounded-full text-[10px] font-semibold border transition ${
                categoryFilter === cat
                  ? "bg-teal-600 text-white border-teal-600"
                  : "bg-white text-slate-600 border-slate-200 hover:border-slate-350 hover:bg-slate-50"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Results Listings Container */}
        <div className="flex-grow min-h-0 bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
          
          {filteredCancellations.length === 0 ? (
            <div className="py-24 text-center text-slate-400 flex flex-col items-center justify-center">
              <Info size={36} className="text-slate-300 mb-2" />
              <h3 className="text-sm font-semibold text-slate-700">No cancellations found</h3>
              <p className="text-xs text-slate-400 mt-1 max-w-sm px-6">
                No items match your active filters. Try modifying your search query or choosing another state.
              </p>
            </div>
          ) : viewType === "table" ? (
            
            // TABLE VIEW
            <div className="flex-grow overflow-y-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 text-[10px] font-mono text-slate-500 border-b border-slate-200 uppercase tracking-wider sticky top-0 z-10">
                    <th className="py-2.5 px-4 font-semibold">State / UT</th>
                    <th className="py-2.5 px-4 font-semibold">Post Office Name</th>
                    <th className="py-2.5 px-4 font-semibold">Cancellation Subject</th>
                    <th className="py-2.5 px-4 font-semibold">Category</th>
                    <th className="py-2.5 px-4 font-semibold">Motif</th>
                    <th className="py-2.5 px-4 font-semibold text-right">Intro Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-xs">
                  {filteredCancellations.map((item) => (
                    <tr 
                      key={item.id} 
                      onClick={() => setSelectedItem(item)}
                      className="hover:bg-slate-50 cursor-pointer transition-colors"
                    >
                      <td className="py-3 px-4 font-semibold text-slate-700 whitespace-nowrap">{item.state}</td>
                      <td className="py-3 px-4">
                        <div className="font-semibold text-slate-800">{item.poName}</div>
                        <div className="text-[10px] text-slate-400 mt-0.5">{item.district} &middot; PIN {item.pincode}</div>
                      </td>
                      <td className="py-3 px-4 font-semibold text-teal-700 max-w-[200px] truncate">{item.subject}</td>
                      <td className="py-3 px-4">
                        <span className="bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded text-[10px] font-medium">
                          {item.category}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-slate-500 max-w-[280px] truncate">{item.motif}</td>
                      <td className="py-3 px-4 font-mono text-slate-500 text-right whitespace-nowrap">{item.introDate}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            
            // CARD VIEW
            <div className="flex-grow overflow-y-auto p-5">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredCancellations.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => setSelectedItem(item)}
                    className="border border-slate-200 hover:border-teal-500/40 rounded-xl p-4 shadow-xs bg-slate-50/20 hover:shadow-[0_4px_20px_-4px_rgba(13,148,136,0.08)] cursor-pointer transition-all duration-300 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex justify-between items-start gap-2 mb-2.5">
                        <span className="text-[9px] font-mono text-slate-450 uppercase truncate">
                          {item.state} &middot; {item.pincode}
                        </span>
                        <span className="bg-teal-50 text-teal-700 border border-teal-100 px-1.5 py-0.2 rounded text-[9px] font-bold whitespace-nowrap">
                          {item.category}
                        </span>
                      </div>
                      <h3 className="text-xs font-bold text-slate-800 mb-1 leading-snug line-clamp-1">
                        {item.subject}
                      </h3>
                      <p className="text-[11px] font-semibold text-slate-500 mb-2">
                        {item.poName} SO
                      </p>
                      <p className="text-[10px] text-slate-400 leading-relaxed line-clamp-2">
                        {item.motif}
                      </p>
                    </div>

                    <div className="flex justify-between items-center mt-3 pt-2.5 border-t border-slate-100 text-[10px] font-mono text-slate-450">
                      <span>Intro: {item.introDate}</span>
                      <span className="text-emerald-600 font-semibold">{item.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Results Summary count */}
          <div className="flex-none p-3 border-t border-slate-200 bg-slate-50/50 flex justify-between items-center text-[10px] font-mono text-slate-500">
            <div>
              Showing {filteredCancellations.length} of {stats.total} pictorial cancellations
            </div>
            <div className="flex items-center gap-1.5">
              <span>View:</span>
              <span className="capitalize font-semibold text-slate-700">{viewType} layout</span>
            </div>
          </div>

        </div>

      </main>

      {/* DETAIL MODAL OVERLAY */}
      {selectedItem && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4 z-50 transition-opacity duration-300">
          <div className="bg-white rounded-xl shadow-xl border border-slate-200 max-w-xl w-full flex flex-col overflow-hidden max-h-[90vh]">
            
            {/* Modal Header */}
            <div className="p-4 border-b border-slate-200 flex justify-between items-start bg-slate-50/50">
              <div>
                <div className="flex items-center gap-2">
                  <span className="bg-teal-50 text-teal-700 border border-teal-100 text-[9px] font-bold font-mono px-2 py-0.5 rounded">
                    {selectedItem.category}
                  </span>
                  <span className="text-[9px] font-mono text-slate-450">
                    ID: {selectedItem.id}
                  </span>
                </div>
                <h2 className="text-sm font-bold text-slate-800 tracking-tight mt-1">
                  {selectedItem.subject}
                </h2>
              </div>
              <button 
                onClick={() => setSelectedItem(null)}
                className="text-slate-400 hover:text-slate-600 p-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 transition"
              >
                <X size={14} />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-5 overflow-y-auto space-y-4 text-xs">
              
              {/* Location Matrix */}
              <div className="grid grid-cols-2 gap-3 bg-slate-50 p-3 rounded-lg border border-slate-200/60 font-mono text-[10px]">
                <div>
                  <div className="text-slate-400 font-semibold uppercase">Post Office Name</div>
                  <div className="text-slate-800 font-bold mt-0.5">{selectedItem.poName}</div>
                </div>
                <div>
                  <div className="text-slate-400 font-semibold uppercase">PIN Code</div>
                  <div className="text-slate-800 font-bold mt-0.5">{selectedItem.pincode}</div>
                </div>
                <div>
                  <div className="text-slate-400 font-semibold uppercase">District / State</div>
                  <div className="text-slate-800 font-bold mt-0.5 truncate">{selectedItem.district}, {selectedItem.state}</div>
                </div>
                <div>
                  <div className="text-slate-400 font-semibold uppercase">Introduction Date</div>
                  <div className="text-slate-800 font-bold mt-0.5">{selectedItem.introDate} ({selectedItem.status})</div>
                </div>
              </div>

              {/* Design Motif */}
              <div className="space-y-1">
                <h4 className="text-[10px] font-semibold text-slate-400 uppercase font-mono tracking-wider">Design Motif Description</h4>
                <p className="text-slate-700 leading-relaxed bg-teal-50/20 border border-teal-200/20 p-2.5 rounded-lg">
                  {selectedItem.motif}
                </p>
              </div>

              {/* Significance */}
              <div className="space-y-1">
                <h4 className="text-[10px] font-semibold text-slate-400 uppercase font-mono tracking-wider">Heritage & Significance</h4>
                <p className="text-slate-600 leading-relaxed bg-slate-50 border border-slate-200/60 p-2.5 rounded-lg">
                  {selectedItem.details}
                </p>
              </div>

            </div>

            {/* Modal Actions Footer */}
            <div className="p-3 border-t border-slate-200 bg-slate-50/50 flex justify-between items-center">
              <button
                onClick={() => handleCopyDetails(selectedItem)}
                className="bg-white border border-slate-200 hover:border-teal-500/20 text-slate-700 px-3.5 py-1.5 rounded-lg font-semibold text-xs transition shadow-xs flex items-center gap-1.5"
              >
                {copied ? (
                  <>
                    <Check size={13} className="text-emerald-500" />
                    <span className="text-emerald-600">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy size={13} />
                    <span>Copy Info</span>
                  </>
                )}
              </button>
              <button
                onClick={() => setSelectedItem(null)}
                className="bg-slate-800 hover:bg-slate-900 text-white px-4 py-1.5 rounded-lg font-semibold text-xs transition"
              >
                Close details
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
