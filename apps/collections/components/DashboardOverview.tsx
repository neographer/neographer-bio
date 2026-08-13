import React from "react";
import { 
  Coins, 
  Wallet, 
  MapPin, 
  IndianRupee, 
  TrendingUp, 
  Info,
  Calendar,
  Sparkles,
  CheckCircle2
} from "lucide-react";

// Types matching page.tsx
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

interface StatsProps {
  totalItems: number;
  totalCountries: number;
  totalValue: number;
  coinCount: number;
  banknoteCount: number;
  tokenCount: number;
  oldestItem: CollectionItem | null;
  highestValueItem: CollectionItem | null;
  topCountries: { name: string; count: number }[];
  topGrades: { name: string; count: number }[];
  topCompositions: { name: string; count: number }[];
}

interface DashboardOverviewProps {
  stats: StatsProps;
}

// Reusable MetricCard Component
export const MetricCard: React.FC<{
  title: string;
  value: string | number;
  icon: React.ReactNode;
}> = ({ title, value, icon }) => (
  <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs hover:border-teal-500/20 transition-all duration-300 flex items-center gap-4">
    <div className="w-10 h-10 rounded-lg bg-teal-50 text-teal-600 flex items-center justify-center text-lg flex-none">
      {icon}
    </div>
    <div>
      <div className="text-[10px] font-mono text-slate-500 uppercase tracking-wider">{title}</div>
      <div className="text-xl font-bold text-slate-800">{value}</div>
    </div>
  </div>
);

// DashboardOverview Component containing Dashboard sub-layout
export const DashboardOverview: React.FC<DashboardOverviewProps> = ({ stats }) => {
  return (
    <div className="flex-grow flex flex-col justify-between gap-4 h-full lg:overflow-hidden">
      
      {/* Top Row: Metric Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 flex-none">
        <MetricCard 
          title="Total Items" 
          value={stats.totalItems} 
          icon={<Coins size={20} />} 
        />
        <MetricCard 
          title="Countries" 
          value={stats.totalCountries} 
          icon={<MapPin size={20} />} 
        />
        <MetricCard 
          title="Est. Value (INR)" 
          value={`₹${stats.totalValue.toLocaleString("en-IN", { maximumFractionDigits: 0 })}`} 
          icon={<IndianRupee size={20} />} 
        />
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
                ({Math.round((stats.coinCount / stats.totalItems) * 100)}%)
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Row: Charts & Insights Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:flex-grow lg:min-h-0 overflow-y-auto lg:overflow-hidden pb-4 lg:pb-0">
        
        {/* Column 1: Top Countries Chart */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 flex flex-col justify-between overflow-hidden shadow-xs">
          <div className="flex-none">
            <h3 className="text-xs font-semibold text-slate-800 uppercase tracking-wider flex items-center gap-1.5 mb-3">
              <MapPin size={14} className="text-teal-600" />
              Top Countries Representation
            </h3>
          </div>
          
          <div className="flex-grow flex flex-col justify-center gap-3">
            {stats.topCountries.map((c) => {
              const pct = Math.round((c.count / stats.totalItems) * 100);
              return (
                <div key={c.name} className="space-y-1">
                  <div className="flex justify-between text-xs font-medium text-slate-600">
                    <span className="truncate max-w-[180px]">{c.name}</span>
                    <span className="font-mono text-slate-400">{c.count} items ({pct}%)</span>
                  </div>
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

        {/* Column 2: Category & Grade Distributions */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 flex flex-col justify-between overflow-hidden shadow-xs">
          <div className="flex-none">
            <h3 className="text-xs font-semibold text-slate-800 uppercase tracking-wider flex items-center gap-1.5 mb-2">
              <TrendingUp size={14} className="text-teal-600" />
              Category & Grade Distributions
            </h3>
          </div>
          
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
              {stats.topGrades.map((g) => (
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

          <div className="flex-grow flex flex-col justify-between gap-2.5 py-1 min-h-0 overflow-y-auto no-scrollbar">
            
            {/* Oldest Piece */}
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

            {/* Key Highlight Value */}
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

            {/* Core compositions */}
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
      <div className="flex-none flex items-center justify-between text-[10px] font-mono text-slate-450 border-t border-slate-200/60 pt-2.5">
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
  );
};
