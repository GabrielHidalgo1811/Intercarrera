import React, { useState } from 'react';
import { Trophy, Calendar, GitBranch, RotateCcw, Volleyball } from 'lucide-react';
import useTournament from './hooks/useTournament';
import GroupStandings from './components/GroupStandings';
import MatchesView from './components/MatchesView';
import KnockoutBracket from './components/KnockoutBracket';

const TABS = [
  { id: 'groups',   label: 'Grupos',   shortLabel: 'Grupos',   icon: Trophy },
  { id: 'matches',  label: 'Partidos', shortLabel: 'Partidos', icon: Calendar },
  { id: 'knockout', label: 'Llaves',   shortLabel: 'Llaves',   icon: GitBranch },
];

export default function App() {
  const [activeTab, setActiveTab] = useState('groups');
  const [showReset, setShowReset] = useState(false);

  const {
    groupMatches,
    standings,
    qualified,
    knockout,
    champion,
    updateGroupMatch,
    updateKnockoutMatch,
    resetTournament,
  } = useTournament();

  const handleReset = () => {
    resetTournament();
    setShowReset(false);
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* ─── Header ─── */}
      <header className="bg-gradient-to-r from-gray-900 via-red-900 to-gray-900 text-white shadow-lg border-b border-red-800/50">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-red-700/40 p-2 rounded-xl border border-red-600/30">
              <Volleyball className="w-7 h-7 text-red-300" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight">Intercarrera UA</h1>
              <p className="text-red-300 text-xs sm:text-sm">Futsal 2026</p>
            </div>
          </div>

          {/* Reset button */}
          <div className="relative">
            <button
              onClick={() => setShowReset(!showReset)}
              className="flex items-center gap-1.5 bg-white/10 hover:bg-white/20 px-3 py-2 rounded-lg text-sm font-medium transition-colors border border-white/10"
              title="Restablecer torneo"
            >
              <RotateCcw className="w-4 h-4" />
              <span className="hidden sm:inline">Restablecer</span>
            </button>

            {showReset && (
              <div className="absolute right-0 top-full mt-2 bg-gray-800 rounded-xl shadow-xl border border-gray-700 p-4 z-50 w-64">
                <p className="text-sm text-gray-200 font-medium mb-3">
                  ¿Restablecer todos los resultados a los valores iniciales?
                </p>
                <div className="flex gap-2">
                  <button
                    onClick={handleReset}
                    className="flex-1 bg-red-600 hover:bg-red-700 text-white text-sm font-semibold py-2 rounded-lg transition-colors"
                  >
                    Sí, restablecer
                  </button>
                  <button
                    onClick={() => setShowReset(false)}
                    className="flex-1 bg-gray-700 hover:bg-gray-600 text-gray-200 text-sm font-semibold py-2 rounded-lg transition-colors"
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* ─── Tab Navigation ─── */}
      <nav className="bg-gray-900/90 backdrop-blur-sm border-b border-gray-700/50 shadow-sm sticky top-0 z-40">
        <div className="max-w-5xl mx-auto px-4">
          <div className="flex">
            {TABS.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;

              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 flex items-center justify-center gap-2 py-3.5 text-sm font-semibold border-b-2 transition-all ${
                    isActive
                      ? 'border-red-500 text-red-400 bg-red-950/30'
                      : 'border-transparent text-gray-400 hover:text-gray-200 hover:bg-gray-800/50'
                  }`}
                >
                  <Icon className="w-4.5 h-4.5" />
                  <span className="hidden sm:inline">{tab.label}</span>
                  <span className="sm:hidden">{tab.shortLabel}</span>
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      {/* ─── Main Content ─── */}
      <main className="flex-1 max-w-5xl mx-auto w-full px-4 py-6">
        {activeTab === 'groups' && (
          <GroupStandings standings={standings} qualified={qualified} />
        )}

        {activeTab === 'matches' && (
          <MatchesView
            groupMatches={groupMatches}
            updateGroupMatch={updateGroupMatch}
          />
        )}

        {activeTab === 'knockout' && (
          <KnockoutBracket
            knockout={knockout}
            updateKnockoutMatch={updateKnockoutMatch}
            champion={champion}
          />
        )}
      </main>

      {/* ─── Footer ─── */}
      <footer className="bg-gray-900/80 backdrop-blur-sm border-t border-gray-700/50 py-4 text-center text-xs text-gray-500">
        Intercarrera UA — Futsal 2026 — Los datos se guardan localmente en tu navegador
      </footer>
    </div>
  );
}
