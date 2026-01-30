
import React from 'react';
import { Unit, AuditLog, Category } from '../types';
import { Building2, Layers, Ruler, CalendarClock, Store, ArrowUpRight } from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Cell } from 'recharts';

interface DashboardProps {
  units: Unit[];
  logs: AuditLog[];
}

const Dashboard: React.FC<DashboardProps> = ({ units, logs }) => {
  const totalAssets = new Set(units.map(u => u.assetId)).size;
  const totalGFA = units.reduce((acc, u) => acc + (u.areas.total || 0), 0);
  const vacantUnits = units.filter(u => u.status === 'Vacant').length;
  
  // Fake calculation for expirations (simulated logic)
  const expiring180 = 0;

  const categoryCounts = {
    [Category.FB]: units.filter(u => u.category === Category.FB).length,
    [Category.RETAIL]: units.filter(u => u.category === Category.RETAIL).length,
    [Category.OTHER]: units.filter(u => u.category === Category.OTHER).length,
  };

  const totalCount = units.length || 1;
  const distributionData = [
    { name: 'F&B', value: categoryCounts[Category.FB], percentage: Math.round((categoryCounts[Category.FB] / totalCount) * 100) },
    { name: 'Retail', value: categoryCounts[Category.RETAIL], percentage: Math.round((categoryCounts[Category.RETAIL] / totalCount) * 100) },
    { name: 'Other', value: categoryCounts[Category.OTHER], percentage: Math.round((categoryCounts[Category.OTHER] / totalCount) * 100) },
  ];

  const stats = [
    { label: 'Total Assets', value: totalAssets, icon: Building2, color: 'bg-indigo-600' },
    { label: 'Total Units', value: units.length, icon: Layers, color: 'bg-blue-600' },
    { label: 'Total GFA (SQFT)', value: totalGFA.toLocaleString('en-US', { minimumFractionDigits: 2 }), icon: Ruler, color: 'bg-emerald-600' },
    { label: 'Expiring (180D)', value: expiring180, icon: CalendarClock, color: 'bg-rose-600' },
    { label: 'Vacant Units', value: vacantUnits, icon: Store, color: 'bg-amber-600' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <header className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Portfolio Dashboard</h2>
          <p className="text-slate-500 mt-1">Single source of truth for Omniyat asset performance</p>
        </div>
      </header>

      {/* KPI Row */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-white rounded-[2.5rem] p-6 custom-shadow border border-slate-100 flex flex-col justify-between group hover:border-blue-200 transition-all cursor-default">
            <div className={`w-12 h-12 ${stat.color} rounded-2xl flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform`}>
              <stat.icon size={22} />
            </div>
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">{stat.label}</p>
              <p className="text-2xl font-bold text-slate-900 leading-none">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Update History */}
        <div className="lg:col-span-2 bg-white rounded-[2.5rem] custom-shadow border border-slate-100 p-8">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-lg text-slate-900">Update History</h3>
            <button className="text-blue-600 text-sm font-semibold flex items-center gap-1 hover:underline">
              View All <ArrowUpRight size={14} />
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="text-[10px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-50">
                  <th className="pb-4 pr-4">Timestamp</th>
                  <th className="pb-4 pr-4">Activity</th>
                  <th className="pb-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {logs.map((log) => (
                  <tr key={log.id} className="group hover:bg-slate-50/50 transition-colors">
                    <td className="py-4 pr-4">
                      <p className="text-sm font-semibold text-slate-900">{log.timestamp.split(' ')[0]}</p>
                      <p className="text-xs text-slate-400">{log.timestamp.split(' ').slice(1).join(' ')}</p>
                    </td>
                    <td className="py-4 pr-4 text-sm text-slate-600 font-medium">
                      {log.activity}
                    </td>
                    <td className="py-4">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase bg-amber-50 text-amber-600 border border-amber-100">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-600"></span>
                        {log.count} {log.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Distribution Chart */}
        <div className="bg-white rounded-[2.5rem] custom-shadow border border-slate-100 p-8 flex flex-col">
          <h3 className="font-bold text-lg text-slate-900 mb-8">Unit Category Distribution</h3>
          <div className="flex-1 space-y-8">
            {distributionData.map((item, idx) => (
              <div key={idx} className="space-y-2">
                <div className="flex justify-between items-end">
                  <span className="text-xs font-bold text-slate-900 uppercase tracking-tight">{item.name}</span>
                  <div className="text-right">
                    <span className="text-sm font-bold text-slate-900">{item.percentage}%</span>
                    <span className="text-xs text-slate-400 ml-1">({item.value} units)</span>
                  </div>
                </div>
                <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div 
                    className={`h-full transition-all duration-1000 ease-out rounded-full ${
                      item.name === 'F&B' ? 'bg-blue-600' : 
                      item.name === 'Retail' ? 'bg-indigo-500' : 'bg-slate-400'
                    }`}
                    style={{ width: `${item.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-12 pt-8 border-t border-slate-50">
            <p className="text-xs text-slate-400 italic">Data reflecting current Q1 2026 inventory</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
