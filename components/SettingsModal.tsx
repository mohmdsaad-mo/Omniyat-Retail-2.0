
import React from 'react';
import { X, Upload, Download, Trash2 } from 'lucide-react';

interface SettingsModalProps {
  onClose: () => void;
  onImport: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onExport: () => void;
  onWipe: () => void;
}

const SettingsModal: React.FC<SettingsModalProps> = ({ onClose, onImport, onExport, onWipe }) => {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={onClose}></div>
      
      <div className="relative bg-white w-full max-w-lg rounded-[3rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
        <div className="p-8 border-b border-slate-100 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-slate-100 rounded-2xl flex items-center justify-center text-slate-500">
              <Upload size={20} />
            </div>
            <h2 className="text-xl font-bold text-slate-900">Application Settings</h2>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-xl transition-all">
            <X size={24} className="text-slate-400" />
          </button>
        </div>

        <div className="p-8 space-y-4">
          <label className="group flex items-center gap-6 p-6 border border-slate-100 rounded-[2rem] hover:bg-blue-50/30 hover:border-blue-200 transition-all cursor-pointer">
            <div className="w-14 h-14 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
              <Upload size={24} />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-slate-900">Import Data</h3>
              <p className="text-sm text-slate-500">Upload Excel or PDF master lease files</p>
            </div>
            <input type="file" className="hidden" accept=".xlsx,.xls,.pdf" onChange={onImport} />
          </label>

          <button 
            onClick={onExport}
            className="w-full group flex items-center gap-6 p-6 border border-slate-100 rounded-[2rem] hover:bg-indigo-50/30 hover:border-indigo-200 transition-all text-left"
          >
            <div className="w-14 h-14 bg-indigo-100 text-indigo-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
              <Download size={24} />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-slate-900">Export Portfolio</h3>
              <p className="text-sm text-slate-500">Download current database as Excel (.xlsx)</p>
            </div>
          </button>

          <button 
            onClick={onWipe}
            className="w-full group flex items-center gap-6 p-6 border border-slate-100 rounded-[2rem] hover:bg-rose-50/30 hover:border-rose-200 transition-all text-left"
          >
            <div className="w-14 h-14 bg-rose-100 text-rose-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
              <Trash2 size={24} />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-slate-900 text-rose-600">Wipe Database</h3>
              <p className="text-sm text-rose-500/70">Completely clear all records and start fresh</p>
            </div>
          </button>
        </div>

        <div className="bg-slate-50 p-6 flex justify-center border-t border-slate-100">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Omniyat Retail Portfolio Database V1.0</p>
        </div>
      </div>
    </div>
  );
};

export default SettingsModal;
