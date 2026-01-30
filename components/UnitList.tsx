
import React, { useState, useMemo } from 'react';
import { Unit, Category, UnitStatus } from '../types';
import { Search, Filter, Plus, ChevronDown, ArrowUpDown, Utensils, ShoppingBag, Box } from 'lucide-react';

interface UnitListProps {
  units: Unit[];
  onSelectUnit: (id: string) => void;
  onAddUnit: () => void;
}

const UnitList: React.FC<UnitListProps> = ({ units, onSelectUnit, onAddUnit }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [assetFilter, setAssetFilter] = useState('All Assets');
  
  const filteredUnits = useMemo(() => {
    return units.filter(u => {
      const matchesSearch = u.tradingName.toLowerCase().includes(searchTerm.toLowerCase()) || 
                           u.unitNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           u.currentTenant.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesAsset = assetFilter === 'All Assets' || u.assetName === assetFilter;
      return matchesSearch && matchesAsset;
    });
  }, [units, searchTerm, assetFilter]);

  const uniqueAssets = Array.from(new Set(units.map(u => u.assetName)));

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Retail Units</h2>
          <p className="text-slate-500 mt-1">Managing {units.length} retail units across {uniqueAssets.length} assets</p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={onAddUnit}
            className="bg-blue-600 text-white px-6 py-3 rounded-2xl font-bold flex items-center gap-2 hover:bg-blue-700 transition-all shadow-lg shadow-blue-900/10 active:scale-95"
          >
            <Plus size={20} /> Add New Unit
          </button>
          <div className="relative group">
            <button className="bg-white border border-slate-200 text-slate-700 px-6 py-3 rounded-2xl font-bold flex items-center gap-2 hover:bg-slate-50 transition-all shadow-sm">
              <Filter size={20} className="text-slate-400" /> {assetFilter} <ChevronDown size={16} className="text-slate-400" />
            </button>
            <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-2xl border border-slate-100 py-2 hidden group-hover:block z-50">
              <button onClick={() => setAssetFilter('All Assets')} className="w-full text-left px-4 py-2 hover:bg-slate-50 text-sm font-medium">All Assets</button>
              {uniqueAssets.map(asset => (
                <button key={asset} onClick={() => setAssetFilter(asset)} className="w-full text-left px-4 py-2 hover:bg-slate-50 text-sm font-medium">{asset}</button>
              ))}
            </div>
          </div>
        </div>
      </header>

      <div className="bg-white rounded-[2.5rem] custom-shadow border border-slate-100 overflow-hidden">
        <div className="p-6 border-b border-slate-100">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
            <input 
              type="text" 
              placeholder="Search by unit, tenant or trading name..." 
              className="w-full bg-slate-50 border-none rounded-2xl py-3 pl-12 pr-4 text-sm font-medium focus:ring-2 focus:ring-blue-100 transition-all outline-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="overflow-x-auto no-scrollbar">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="text-[10px] font-bold text-slate-400 uppercase tracking-widest bg-slate-50/50">
                <th className="px-6 py-4">Asset <ArrowUpDown size={12} className="inline ml-1 opacity-50" /></th>
                <th className="px-6 py-4">Unit #</th>
                <th className="px-6 py-4">Unit Name <ArrowUpDown size={12} className="inline ml-1 opacity-50" /></th>
                <th className="px-6 py-4">Category <ArrowUpDown size={12} className="inline ml-1 opacity-50" /></th>
                <th className="px-6 py-4">Total Area <ArrowUpDown size={12} className="inline ml-1 opacity-50" /></th>
                <th className="px-6 py-4">Tenant</th>
                <th className="px-6 py-4">Landlord</th>
                <th className="px-6 py-4">RCD <ArrowUpDown size={12} className="inline ml-1 opacity-50" /></th>
                <th className="px-6 py-4">RED <ArrowUpDown size={12} className="inline ml-1 opacity-50" /></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filteredUnits.map((u) => (
                <tr 
                  key={u.id} 
                  onClick={() => onSelectUnit(u.id)}
                  className="group hover:bg-blue-50/30 transition-all cursor-pointer"
                >
                  <td className="px-6 py-6 font-bold text-slate-900 text-sm">{u.assetName}</td>
                  <td className="px-6 py-6 font-bold text-blue-600 text-sm">{u.unitNumber}</td>
                  <td className="px-6 py-6 font-bold text-slate-900 text-sm">{u.tradingName}</td>
                  <td className="px-6 py-6">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase ${
                      u.category === Category.FB ? 'bg-orange-50 text-orange-600 border border-orange-100' : 'bg-blue-50 text-blue-600 border border-blue-100'
                    }`}>
                      {u.category === Category.FB ? <Utensils size={10} /> : <ShoppingBag size={10} />}
                      {u.category}
                    </span>
                  </td>
                  <td className="px-6 py-6 font-semibold text-slate-900 text-sm">
                    {u.areas.total.toLocaleString()} <span className="text-slate-400 font-normal">sqft</span>
                  </td>
                  <td className="px-6 py-6">
                    <p className="text-sm font-bold text-slate-900 truncate max-w-[150px]">{u.currentTenant}</p>
                    <span className="text-[10px] font-bold uppercase text-emerald-600 tracking-tighter">{u.status}</span>
                  </td>
                  <td className="px-6 py-6 text-xs text-slate-500 max-w-[150px] truncate">{u.landlord}</td>
                  <td className="px-6 py-6 text-sm text-slate-700 font-medium whitespace-nowrap">{u.commercialTerms.rcd || '—'}</td>
                  <td className="px-6 py-6 text-sm text-slate-700 font-medium whitespace-nowrap">{u.commercialTerms.red || '—'}</td>
                </tr>
              ))}
              {filteredUnits.length === 0 && (
                <tr>
                  <td colSpan={9} className="py-20 text-center">
                    <div className="flex flex-col items-center gap-4 text-slate-400">
                      <Box size={48} className="opacity-20" />
                      <p className="font-medium">No units found matching your search</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UnitList;
