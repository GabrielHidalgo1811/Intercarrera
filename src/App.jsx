import React, { useState } from 'react';
import { Trophy, Calendar, GitBranch, Volleyball, Award } from 'lucide-react';
import useTournament from './hooks/useTournament';
import GroupStandings from './components/GroupStandings';
import MatchesView from './components/MatchesView';
import KnockoutBracket from './components/KnockoutBracket';
import PlayersView from './components/PlayersView';

const TABS = [
  { id: 'groups',   label: 'Grupos',     icon: Trophy },
  { id: 'matches',  label: 'Partidos',   icon: Calendar },
  { id: 'knockout', label: 'Llaves',     icon: GitBranch },
  { id: 'players',  label: 'Goleadores', icon: Award },
];

export default function App() {
  const [activeTab, setActiveTab] = useState('groups');

  const {
    groupMatches,
    standings,
    qualified,
    knockout,
    champion,
    updateGroupMatch,
    updateKnockoutMatch,
  } = useTournament();

  return (
    <div className="min-h-screen flex flex-col">
      {/* ─── Header ─── */}
      <header className="bg-gradient-to-r from-gray-900 via-red-900 to-gray-900 text-white shadow-lg border-b border-red-800/50">
        <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4 flex items-center justify-between">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="bg-red-700/40 p-1.5 sm:p-2 rounded-xl border border-red-600/30">
              <Volleyball className="w-5 h-5 sm:w-7 sm:h-7 text-red-300" />
            </div>
            <div>
              <h1 className="text-base sm:text-2xl font-extrabold tracking-tight leading-tight">Intercarrera UA</h1>
              <p className="text-red-300 text-[10px] sm:text-sm leading-tight">Futsal 2026</p>
            </div>
          </div>

          <div>
            <span className="inline-flex items-center gap-1 sm:gap-1.5 text-[10px] sm:text-xs bg-red-800/50 text-red-200 border border-red-700/40 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full font-medium">
              <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              En juego
            </span>
          </div>
        </div>
      </header>

      {/* ─── Tab Navigation ─── */}
      <nav className="bg-gray-900/95 backdrop-blur-sm border-b border-gray-700/50 shadow-sm sticky top-0 z-40">
        <div className="max-w-[1500px] mx-auto">
          {/* Desktop nav */}
          <div className="hidden sm:flex px-6 lg:px-8">
            {TABS.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-5 py-3.5 text-sm font-semibold border-b-2 transition-all ${
                    isActive
                      ? 'border-red-500 text-red-400 bg-red-950/30'
                      : 'border-transparent text-gray-400 hover:text-gray-200 hover:bg-gray-800/50'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Mobile nav — icon + label stacked in a 4-column grid */}
          <div className="sm:hidden grid grid-cols-4 border-t border-gray-800/30">
            {TABS.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex flex-col items-center justify-center gap-1 py-2.5 text-[10px] font-semibold border-b-2 transition-all ${
                    isActive
                      ? 'border-red-500 text-red-400 bg-red-950/40'
                      : 'border-transparent text-gray-400 active:bg-gray-800/50'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="leading-none">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      {/* ─── Main Content ─── */}
      <main className="flex-1 max-w-[1500px] mx-auto w-full px-3 sm:px-6 lg:px-8 py-4 sm:py-6">
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

        {activeTab === 'players' && (
          <PlayersView />
        )}
      </main>

      {/* ─── Footer ─── */}
      <footer className="bg-gray-900/80 backdrop-blur-sm border-t border-gray-700/50 py-3 text-center text-[10px] sm:text-xs text-gray-500">
        Intercarrera UA — Futsal 2026
      </footer>
    </div>
  );
}
