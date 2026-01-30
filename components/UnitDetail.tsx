
import React, { useState } from 'react';
import { Unit, Category, UnitStatus } from '../types';
// Fix: Added missing CalendarClock to the lucide-react imports
import { ChevronLeft, Edit3, Layout, Clock, FileText, DollarSign, Plus, Eye, CheckCircle2, AlertCircle, CalendarClock } from 'lucide-react';

interface UnitDetailProps {
  unit: Unit;
  onBack: () => void;
  onEdit: () => void;
}

const UnitDetail: React.FC<UnitDetailProps> = ({ unit, onBack, onEdit }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'timeline' | 'terms' | 'rent'>('overview');

  const tabs = [
    { id: 'overview', label: 'Unit Overview', icon: Layout },
    { id: 'timeline', label: 'Documents & Timeline', icon: Clock },
    { id: 'terms', label: 'Lease Terms', icon: FileText },
    { id: 'rent', label: 'Rent Schedule', icon: DollarSign },
  ] as const;

  return (
    <div className="space-y-6 animate-in slide-in-from-right duration-500">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="p-3 bg-white border border-slate-200 rounded-2xl hover:bg-slate-50 transition-all custom-shadow">
            <ChevronLeft size={20} className="text-slate-600" />
          </button>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-3xl font-bold text-slate-900 tracking-tight">{unit.unitNumber}</h2>
              <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-lg text-[10px] font-bold uppercase ${
                unit.category === Category.FB ? 'bg-orange-50 text-orange-600' : 'bg-blue-50 text-blue-600'
              }`}>
                {unit.category}
              </span>
            </div>
            <p className="text-slate-500 flex items-center gap-2">
              <span className="font-bold">{unit.assetName}</span> — {unit.tradingName}
            </p>
          </div>
        </div>
        <button 
          onClick={onEdit}
          className="bg-indigo-600 text-white px-6 py-3 rounded-2xl font-bold flex items-center gap-2 hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-900/10 active:scale-95"
        >
          <Edit3 size={20} /> Edit Unit
        </button>
      </div>

      <div className="bg-white rounded-[2.5rem] custom-shadow border border-slate-100 overflow-hidden">
        {/* Tab Bar */}
        <div className="px-8 pt-6 border-b border-slate-100 flex gap-8">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`pb-4 text-sm font-bold flex items-center gap-2 transition-all border-b-2 ${
                activeTab === tab.id ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-400 hover:text-slate-600'
              }`}
            >
              <tab.icon size={18} /> {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="p-8">
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div className="space-y-8">
                <section>
                  <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-6">Unit Identity</h4>
                  <div className="grid grid-cols-2 gap-y-4 text-sm">
                    <span className="text-slate-400 font-medium uppercase text-[11px] tracking-tight">Unit Number</span>
                    <span className="text-slate-900 font-bold text-right">{unit.unitNumber}</span>
                    <span className="text-slate-400 font-medium uppercase text-[11px] tracking-tight">Trading Name</span>
                    <span className="text-slate-900 font-bold text-right">{unit.tradingName}</span>
                    <span className="text-slate-400 font-medium uppercase text-[11px] tracking-tight">Asset Group</span>
                    <span className="text-slate-900 font-bold text-right">{unit.assetName}</span>
                    <span className="text-slate-400 font-medium uppercase text-[11px] tracking-tight">Category</span>
                    <span className="text-slate-900 font-bold text-right">{unit.category}</span>
                  </div>
                </section>

                <section>
                  <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-6">Space Details</h4>
                  <div className="grid grid-cols-2 gap-y-4 text-sm">
                    <span className="text-slate-400 font-medium uppercase text-[11px] tracking-tight">Car Park Allocation</span>
                    <span className="text-slate-900 font-bold text-right">{unit.carParkAllocation}</span>
                    <span className="text-slate-400 font-medium uppercase text-[11px] tracking-tight">Permitted Use</span>
                    <span className="text-slate-900 font-bold text-right text-xs leading-relaxed">{unit.permittedUse}</span>
                  </div>
                </section>
              </div>

              <div className="space-y-8">
                <div className="bg-slate-50/50 rounded-3xl p-6 border border-slate-100">
                  <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-6">Unit Area (SQ.FT)</h4>
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { label: 'Indoor', val: unit.areas.indoor },
                      { label: 'Terrace', val: unit.areas.terrace },
                      { label: 'Mezzanine', val: unit.areas.mezzanine },
                      { label: 'Outdoor', val: unit.areas.outdoor },
                      { label: 'Other', val: unit.areas.other },
                    ].map(a => (
                      <div key={a.label} className="bg-white p-4 rounded-2xl border border-slate-100 custom-shadow">
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tight mb-1">{a.label}</p>
                        <p className="text-lg font-bold text-slate-900">{a.val} <span className="text-[10px] text-slate-400">sqft</span></p>
                      </div>
                    ))}
                    <div className="bg-blue-600 p-4 rounded-2xl shadow-xl shadow-blue-200">
                      <p className="text-[10px] font-bold text-blue-100 uppercase tracking-tight mb-1">Total</p>
                      <p className="text-lg font-bold text-white">{unit.areas.total} <span className="text-[10px] text-blue-200">sqft</span></p>
                    </div>
                  </div>
                </div>

                <div className="relative overflow-hidden group">
                  <div className="bg-blue-600 rounded-3xl p-8 text-white relative z-10">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-blue-100 mb-4">Active Occupancy</p>
                    <h3 className="text-2xl font-bold mb-2">{unit.currentTenant}</h3>
                    <p className="text-blue-100 flex items-center gap-2 text-sm">
                      <Clock size={16} /> Ends {unit.commercialTerms.red}
                    </p>
                    <div className="mt-12 flex items-center justify-between border-t border-blue-500/30 pt-4">
                      <p className="text-[10px] font-bold uppercase text-blue-200">Active Document</p>
                      <span className="text-[10px] font-bold uppercase px-2 py-1 bg-white/20 rounded-lg backdrop-blur-md">Third Amendment</span>
                    </div>
                  </div>
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl group-hover:scale-150 transition-transform"></div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'timeline' && (
            <div className="space-y-6">
              <div className="relative pl-8 space-y-8 before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-[2px] before:bg-slate-100">
                {unit.documents.map((doc, idx) => (
                  <div key={doc.id} className="relative">
                    <div className="absolute -left-[30px] top-1 w-6 h-6 rounded-full bg-white border-2 border-blue-500 flex items-center justify-center z-10">
                      <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                    </div>
                    <div className="bg-white rounded-3xl p-6 border border-slate-100 custom-shadow flex items-center justify-between group hover:border-blue-200 transition-all">
                      <div className="flex gap-6 items-start">
                        <div className="p-4 bg-slate-50 rounded-2xl text-slate-400 group-hover:bg-blue-50 group-hover:text-blue-500 transition-colors">
                          <FileText size={24} />
                        </div>
                        <div>
                          <div className="flex items-center gap-3 mb-4">
                            <h4 className="text-lg font-bold text-slate-900">{doc.type}</h4>
                            <span className="text-sm font-medium text-slate-400">{doc.date}</span>
                            <span className="px-2 py-0.5 bg-emerald-50 text-emerald-600 rounded text-[10px] font-bold uppercase">Active</span>
                          </div>
                          <div className="flex gap-12">
                            <div>
                              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter mb-1">Landlord</p>
                              <p className="text-xs font-bold text-slate-800 flex items-center gap-1.5">{doc.landlord} <CheckCircle2 size={12} className="text-emerald-500" /></p>
                            </div>
                            <div>
                              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter mb-1">Tenant</p>
                              <p className="text-xs font-bold text-slate-800 flex items-center gap-1.5">{doc.tenant} <CheckCircle2 size={12} className="text-emerald-500" /></p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button className="flex items-center gap-2 text-[10px] font-bold uppercase text-slate-400 px-4 py-2 hover:text-blue-600 transition-colors">
                          <Eye size={16} /> No File
                        </button>
                        <button className="bg-blue-600 text-white px-5 py-2.5 rounded-xl text-[10px] font-bold uppercase hover:bg-blue-700 transition-all active:scale-95 shadow-lg shadow-blue-100">
                          Add Document
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <button className="ml-8 w-[calc(100%-2rem)] border-2 border-dashed border-slate-100 rounded-3xl py-8 text-slate-400 font-bold text-sm hover:bg-slate-50 hover:border-blue-200 transition-all flex items-center justify-center gap-2">
                <Plus size={20} /> Add New Timeline Event
              </button>
            </div>
          )}

          {activeTab === 'terms' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div>
                <div className="flex items-center gap-2 mb-8">
                  <div className="p-2 bg-blue-50 rounded-xl text-blue-600"><CalendarClock size={20} /></div>
                  <h3 className="font-bold text-lg text-slate-900">Period & Term</h3>
                </div>
                <div className="grid grid-cols-2 gap-x-12 gap-y-8">
                  {[
                    { label: 'Commencement', val: unit.commercialTerms.commencementDate },
                    { label: 'Fitout Period', val: unit.commercialTerms.fitoutPeriod },
                    { label: 'Term Duration', val: unit.commercialTerms.termDuration },
                    { label: 'Rent Free', val: unit.commercialTerms.rentFreePeriod },
                    { label: 'RCD (Start)', val: unit.commercialTerms.rcd },
                    { label: 'RED (End)', val: unit.commercialTerms.red },
                  ].map(term => (
                    <div key={term.label}>
                      <p className="text-[10px] font-bold text-slate-300 uppercase tracking-widest mb-1">{term.label}</p>
                      <p className="text-sm font-bold text-slate-800">{term.val}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-8">
                  <div className="p-2 bg-blue-50 rounded-xl text-blue-600"><DollarSign size={20} /></div>
                  <h3 className="font-bold text-lg text-slate-900">Financial Terms</h3>
                </div>
                <div className="space-y-4">
                  <div className="bg-slate-50/50 rounded-2xl p-6 border border-slate-100">
                    <div className="flex justify-between items-start mb-4">
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Security Deposit</p>
                      <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">{(unit.commercialTerms.securityDepositPercent * 100).toFixed(1)}%</span>
                    </div>
                    <p className="text-xl font-bold text-slate-900">AED {unit.commercialTerms.securityDeposit.toLocaleString()}</p>
                  </div>
                  <div className="bg-slate-50/50 rounded-2xl p-6 border border-slate-100">
                    <div className="flex justify-between items-start mb-4">
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Fitout Deposit</p>
                      <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">{(unit.commercialTerms.fitoutDepositPercent * 100).toFixed(1)}%</span>
                    </div>
                    <p className="text-xl font-bold text-slate-900">AED {unit.commercialTerms.fitoutDeposit.toLocaleString()}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'rent' && (
            <div className="space-y-6">
              <div className="flex justify-between items-end mb-4">
                <h3 className="font-bold text-lg text-slate-900">Step-Rent Schedule</h3>
                <button className="bg-slate-50 text-slate-600 px-4 py-2 rounded-xl text-xs font-bold hover:bg-slate-100 transition-all flex items-center gap-2">
                  <Plus size={16} /> Add Year
                </button>
              </div>
              <div className="bg-slate-50/30 rounded-3xl border border-slate-100 overflow-hidden">
                <table className="w-full text-left">
                  <thead>
                    <tr className="text-[10px] font-bold text-slate-400 uppercase tracking-widest bg-slate-50 border-b border-slate-100">
                      <th className="px-6 py-4">Year</th>
                      <th className="px-6 py-4">Start Date</th>
                      <th className="px-6 py-4">End Date</th>
                      <th className="px-6 py-4 text-right">Base Rent (AED)</th>
                      <th className="px-6 py-4 text-right">SQFT Rate</th>
                      <th className="px-6 py-4 text-right">TOR %</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {unit.rentSchedule.map(rs => (
                      <tr key={rs.id} className="text-sm">
                        <td className="px-6 py-4 font-bold text-slate-900">Year {rs.year}</td>
                        <td className="px-6 py-4 text-slate-600">{rs.startDate}</td>
                        <td className="px-6 py-4 text-slate-600">{rs.endDate}</td>
                        <td className="px-6 py-4 text-right font-bold text-slate-900">AED {rs.baseRent.toLocaleString()}</td>
                        <td className="px-6 py-4 text-right font-medium text-slate-500">{rs.sqftRate.toFixed(2)}</td>
                        <td className="px-6 py-4 text-right font-bold text-blue-600">{rs.torPercentage}%</td>
                      </tr>
                    ))}
                    {unit.rentSchedule.length === 0 && (
                      <tr>
                        <td colSpan={6} className="px-6 py-20 text-center">
                          <div className="flex flex-col items-center gap-3 text-slate-300">
                            <AlertCircle size={40} className="opacity-20" />
                            <p className="text-xs uppercase tracking-widest font-bold">No rent schedule items defined</p>
                          </div>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UnitDetail;
