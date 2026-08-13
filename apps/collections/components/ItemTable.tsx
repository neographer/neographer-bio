import React, { useState, useMemo, useEffect } from "react";
import { Search, Filter, Info } from "lucide-react";

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

interface ItemTableProps {
  activeTab: "coins" | "banknotes" | "exonumia";
  collectionData: CollectionItem[];
  coinCount: number;
  banknoteCount: number;
  tokenCount: number;
}

export const ItemTable: React.FC<ItemTableProps> = ({
  activeTab,
  collectionData,
  coinCount,
  banknoteCount,
  tokenCount
}) => {
  // Local Search & Filter State
  const [searchQuery, setSearchQuery] = useState("");
  const [countryFilter, setCountryFilter] = useState("ALL");
  const [gradeFilter, setGradeFilter] = useState("ALL");
  const [compositionFilter, setCompositionFilter] = useState("ALL");

  // Reset filters when the active tab category changes
  useEffect(() => {
    setSearchQuery("");
    setCountryFilter("ALL");
    setGradeFilter("ALL");
    setCompositionFilter("ALL");
  }, [activeTab]);

  // Compute active filtered items
  const filteredItems = useMemo(() => {
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
  }, [activeTab, collectionData, searchQuery, countryFilter, gradeFilter, compositionFilter]);

  // Options lists for dropdown filters
  const countryOptions = useMemo(() => {
    let dataset = collectionData;
    if (activeTab === "coins") dataset = collectionData.filter(d => d._category === "Coins");
    else if (activeTab === "banknotes") dataset = collectionData.filter(d => d._category === "Banknotes");
    else if (activeTab === "exonumia") dataset = collectionData.filter(d => d._category !== "Coins" && d._category !== "Banknotes");
    
    return Array.from(new Set(dataset.map(d => d.Country))).sort();
  }, [activeTab, collectionData]);

  const gradeOptions = useMemo(() => {
    let dataset = collectionData;
    if (activeTab === "coins") dataset = collectionData.filter(d => d._category === "Coins");
    else if (activeTab === "banknotes") dataset = collectionData.filter(d => d._category === "Banknotes");
    else if (activeTab === "exonumia") dataset = collectionData.filter(d => d._category !== "Coins" && d._category !== "Banknotes");
    
    return Array.from(new Set(dataset.map(d => d.Grade || "Unspecified"))).sort();
  }, [activeTab, collectionData]);

  const compositionOptions = useMemo(() => {
    let dataset = collectionData;
    if (activeTab === "coins") dataset = collectionData.filter(d => d._category === "Coins");
    else if (activeTab === "banknotes") dataset = collectionData.filter(d => d._category === "Banknotes");
    else if (activeTab === "exonumia") dataset = collectionData.filter(d => d._category !== "Coins" && d._category !== "Banknotes");

    return Array.from(new Set(dataset.map(d => d.Composition || "Unspecified"))).sort();
  }, [activeTab, collectionData]);

  const activeTotalCount = useMemo(() => {
    if (activeTab === "coins") return coinCount;
    if (activeTab === "banknotes") return banknoteCount;
    return tokenCount;
  }, [activeTab, coinCount, banknoteCount, tokenCount]);

  return (
    <div className="flex-grow flex flex-col min-h-0 bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
      
      {/* Filter Toolbar */}
      <div className="flex-none p-4 bg-slate-50/50 border-b border-slate-200 flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
        
        {/* Search */}
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

        {/* Dropdowns */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-1.5 text-xs text-slate-505">
            <Filter size={12} />
            <span>Filters:</span>
          </div>
          
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

      {/* Grid / Table area */}
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
              <tr className="bg-slate-50 text-[10px] font-mono text-slate-505 border-b border-slate-200 uppercase tracking-wider sticky top-0 z-10">
                <th className="py-2.5 px-4 font-semibold">Country</th>
                <th className="py-2.5 px-4 font-semibold">Face Value & Title</th>
                <th className="py-2.5 px-4 font-semibold hidden sm:table-cell">Year</th>
                <th className="py-2.5 px-4 font-semibold hidden md:table-cell">Composition</th>
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
                    <div className="text-[10px] text-slate-400 mt-0.5">
                      {item["Face value"]} {item.Currency || ""} &middot; {item.Type}
                      <span className="sm:hidden"> &middot; {item.Year || item["Gregorian year"]}</span>
                      <span className="md:hidden">{item.Composition ? ` &middot; ${item.Composition}` : ""}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 font-mono text-slate-500 hidden sm:table-cell">{item.Year || item["Gregorian year"]}</td>
                  <td className="py-3 px-4 text-slate-505 hidden md:table-cell">{item.Composition || "-"}</td>
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

      {/* Footer */}
      <div className="flex-none p-3 border-t border-slate-200 bg-slate-50/50 flex justify-between items-center text-[10px] font-mono text-slate-505">
        <div>
          Showing {filteredItems.length} of {activeTotalCount} filtered items
        </div>
        <div className="font-semibold">
          Est. Active Value: ₹{filteredItems.reduce((acc, curr) => acc + (parseFloat(curr["Estimate (INR)"]) || 0), 0).toLocaleString("en-IN", { maximumFractionDigits: 0 })}
        </div>
      </div>

    </div>
  );
};
