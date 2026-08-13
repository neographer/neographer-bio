import React from "react";
import { X, Copy, Check } from "lucide-react";

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

interface PpcDetailModalProps {
  item: CancelItem | null;
  onClose: () => void;
  onCopy: (item: CancelItem) => void;
  copied: boolean;
}

export const PpcDetailModal: React.FC<PpcDetailModalProps> = ({
  item,
  onClose,
  onCopy,
  copied
}) => {
  if (!item) return null;

  return (
    <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4 z-50 transition-opacity duration-300">
      <div className="bg-white rounded-xl shadow-xl border border-slate-200 max-w-xl w-full flex flex-col overflow-hidden max-h-[90vh]">
        
        {/* Modal Header */}
        <div className="p-4 border-b border-slate-200 flex justify-between items-start bg-slate-50/50">
          <div>
            <div className="flex items-center gap-2">
              <span className="bg-teal-50 text-teal-700 border border-teal-100 text-[9px] font-bold font-mono px-2 py-0.5 rounded">
                {item.category}
              </span>
              <span className="text-[9px] font-mono text-slate-450">
                ID: {item.id}
              </span>
            </div>
            <h2 className="text-sm font-bold text-slate-800 tracking-tight mt-1">
              {item.subject}
            </h2>
          </div>
          <button 
            onClick={onClose}
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
              <div className="text-slate-800 font-bold mt-0.5">{item.poName}</div>
            </div>
            <div>
              <div className="text-slate-400 font-semibold uppercase">PIN Code</div>
              <div className="text-slate-800 font-bold mt-0.5">{item.pincode}</div>
            </div>
            <div>
              <div className="text-slate-400 font-semibold uppercase">District / State</div>
              <div className="text-slate-800 font-bold mt-0.5 truncate">{item.district}, {item.state}</div>
            </div>
            <div>
              <div className="text-slate-400 font-semibold uppercase">Introduction Date</div>
              <div className="text-slate-800 font-bold mt-0.5">{item.introDate} ({item.status})</div>
            </div>
          </div>

          {/* Design Motif */}
          <div className="space-y-1">
            <h4 className="text-[10px] font-semibold text-slate-400 uppercase font-mono tracking-wider">Design Motif Description</h4>
            <p className="text-slate-700 leading-relaxed bg-teal-50/20 border border-teal-200/20 p-2.5 rounded-lg">
              {item.motif}
            </p>
          </div>

          {/* Significance */}
          <div className="space-y-1">
            <h4 className="text-[10px] font-semibold text-slate-400 uppercase font-mono tracking-wider">Heritage & Significance</h4>
            <p className="text-slate-600 leading-relaxed bg-slate-50 border border-slate-200/60 p-2.5 rounded-lg">
              {item.details}
            </p>
          </div>

        </div>

        {/* Modal Actions Footer */}
        <div className="p-3 border-t border-slate-200 bg-slate-50/50 flex justify-between items-center">
          <button
            onClick={() => onCopy(item)}
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
            onClick={onClose}
            className="bg-slate-800 hover:bg-slate-900 text-white px-4 py-1.5 rounded-lg font-semibold text-xs transition"
          >
            Close details
          </button>
        </div>

      </div>
    </div>
  );
};
