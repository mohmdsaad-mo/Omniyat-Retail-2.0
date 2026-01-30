
import React from 'react';
import { LayoutDashboard, Store, ClipboardList, Settings, LogOut, Database } from 'lucide-react';

interface SidebarProps {
  currentView: 'dashboard' | 'units' | 'reports';
  onNavigate: (view: 'dashboard' | 'units' | 'reports') => void;
  onOpenSettings: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentView, onNavigate, onOpenSettings }) => {
  const navItems = [
    { id: 'dashboard', label: 'Portfolio Dashboard', icon: LayoutDashboard },
    { id: 'units', label: 'Retail Units', icon: Store },
    { id: 'reports', label: 'Reports & Audit', icon: ClipboardList },
  ] as const;

  return (
    <div className="w-64 bg-[#020617] h-screen flex flex-col text-slate-400">
      <div className="p-8 flex items-center gap-3">
        <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white">
          <Database size={24} />
        </div>
        <div>
          <h1 className="text-white font-bold text-lg leading-tight tracking-tight uppercase">Omniyat</h1>
          <p className="text-[10px] text-slate-500 uppercase font-medium tracking-[0.1em]">Retail Portfolio</p>
        </div>
      </div>

      <nav className="flex-1 px-4 mt-4 space-y-1">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
              currentView === item.id 
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/20' 
                : 'hover:bg-slate-800/50 hover:text-white'
            }`}
          >
            <item.icon size={20} className={currentView === item.id ? 'text-white' : 'group-hover:text-blue-400'} />
            <span className="font-medium text-sm">{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="p-4 space-y-2 border-t border-slate-800/50">
        <button 
          onClick={onOpenSettings}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-slate-800/50 hover:text-white transition-all group"
        >
          <Settings size={20} className="group-hover:text-blue-400" />
          <span className="font-medium text-sm uppercase tracking-widest text-[11px]">Settings</span>
        </button>

        <div className="mt-4 bg-slate-900/50 rounded-2xl p-4 flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-xs ring-2 ring-slate-800">
            MS
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-white font-semibold text-xs truncate">Mohamed Saad</p>
            <p className="text-[10px] text-slate-500 truncate uppercase tracking-tighter">Full Access Editor</p>
          </div>
          <button className="text-slate-500 hover:text-white transition-colors">
            <LogOut size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
