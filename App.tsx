
import React, { useState, useEffect } from 'react';
import { Unit, AuditLog, AppState } from './types.ts';
import { INITIAL_ASSETS, INITIAL_UNITS, INITIAL_LOGS } from './constants.tsx';
import Sidebar from './components/Sidebar.tsx';
import Dashboard from './components/Dashboard.tsx';
import UnitList from './components/UnitList.tsx';
import UnitDetail from './components/UnitDetail.tsx';
import SettingsModal from './components/SettingsModal.tsx';
import { exportUnitsToExcel } from './services/excelService.ts';
import { ClipboardList } from 'lucide-react';

const App: React.FC = () => {
  const [isBooting, setIsBooting] = useState(true);
  const [currentView, setCurrentView] = useState<'dashboard' | 'units' | 'reports'>('dashboard');
  const [selectedUnitId, setSelectedUnitId] = useState<string | null>(null);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  
  const [appState, setAppState] = useState<AppState>(() => {
    const saved = localStorage.getItem('omniyat_app_state');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error("Failed to parse local storage", e);
      }
    }
    return {
      units: INITIAL_UNITS,
      assets: INITIAL_ASSETS,
      auditLogs: INITIAL_LOGS
    };
  });

  useEffect(() => {
    localStorage.setItem('omniyat_app_state', JSON.stringify(appState));
  }, [appState]);

  useEffect(() => {
    const timer = setTimeout(() => setIsBooting(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  const handleSelectUnit = (id: string) => {
    setSelectedUnitId(id);
    setCurrentView('units');
  };

  const handleBackToList = () => {
    setSelectedUnitId(null);
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    const newLog: AuditLog = {
      id: Math.random().toString(36),
      timestamp: new Date().toLocaleString(),
      activity: `${file.name} processed`,
      status: 'Success',
      count: 0
    };
    
    setAppState(prev => ({
      ...prev,
      auditLogs: [newLog, ...prev.auditLogs]
    }));
    
    alert(`File ${file.name} received. Simulation complete.`);
    setIsSettingsOpen(false);
  };

  const handleWipe = () => {
    if (window.confirm("Are you sure you want to clear all data? This cannot be undone.")) {
      setAppState({
        units: [],
        assets: [],
        auditLogs: []
      });
      setIsSettingsOpen(false);
    }
  };

  const handleExport = () => {
    exportUnitsToExcel(appState.units);
    setIsSettingsOpen(false);
  };

  if (isBooting) {
    return (
      <div className="fixed inset-0 bg-[#020617] flex flex-col items-center justify-center z-[200]">
        <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center text-white animate-pulse mb-8">
          <svg viewBox="0 0 24 24" className="w-8 h-8 fill-current">
            <path d="M12 3C7.58 3 4 4.79 4 7s3.58 4 8 4 8-1.79 8-4-3.58-4-8-4M4 10c0 2.21 3.58 4 8 4s8-1.79 8-4M4 13c0 2.21 3.58 4 8 4s8-1.79 8-4M4 16c0 2.21 3.58 4 8 4s8-1.79 8-4" />
          </svg>
        </div>
        <div className="space-y-2 text-center">
          <h1 className="text-white font-bold text-xl uppercase tracking-[0.2em]">Omniyat OS</h1>
          <p className="text-slate-500 text-[10px] uppercase font-medium tracking-widest">Initializing Secure Database Access...</p>
        </div>
        <div className="absolute bottom-12 w-48 h-1 bg-slate-900 rounded-full overflow-hidden">
          <div className="h-full bg-blue-600 animate-[loading_1.2s_ease-in-out_infinite]"></div>
        </div>
        <style>{`
          @keyframes loading {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(100%); }
          }
        `}</style>
      </div>
    );
  }

  const selectedUnit = appState.units.find(u => u.id === selectedUnitId);

  return (
    <div className="flex h-screen bg-[#F8FAFC]">
      <Sidebar 
        currentView={currentView} 
        onNavigate={(view) => {
          setCurrentView(view);
          setSelectedUnitId(null);
        }} 
        onOpenSettings={() => setIsSettingsOpen(true)}
      />
      
      <main className="flex-1 h-screen overflow-y-auto no-scrollbar p-8">
        <div className="max-w-7xl mx-auto pb-20">
          {currentView === 'dashboard' && (
            <Dashboard units={appState.units} logs={appState.auditLogs} />
          )}

          {currentView === 'units' && !selectedUnitId && (
            <UnitList 
              units={appState.units} 
              onSelectUnit={handleSelectUnit} 
              onAddUnit={() => alert('Add unit functionality available in local database')}
            />
          )}

          {currentView === 'units' && selectedUnitId && selectedUnit && (
            <UnitDetail 
              unit={selectedUnit} 
              onBack={handleBackToList} 
              onEdit={() => alert('Edit mode active')}
            />
          )}

          {currentView === 'reports' && (
            <div className="flex flex-col items-center justify-center h-[70vh] text-slate-400">
              <ClipboardList size={64} className="opacity-10 mb-6" />
              <p className="font-bold text-lg uppercase tracking-widest">Custom Reporting Engine</p>
              <p className="text-sm mt-2 opacity-50">Select parameters to generate analytical exports</p>
            </div>
          )}
        </div>
      </main>

      {isSettingsOpen && (
        <SettingsModal 
          onClose={() => setIsSettingsOpen(false)} 
          onImport={handleImport}
          onExport={handleExport}
          onWipe={handleWipe}
        />
      )}
    </div>
  );
};

export default App;
