import React, { useState } from 'react';
import { Trophy, Calendar, GitBranch, Volleyball, Heart, Award } from 'lucide-react';
import useTournament from './hooks/useTournament';
import GroupStandings from './components/GroupStandings';
import MatchesView from './components/MatchesView';
import KnockoutBracket from './components/KnockoutBracket';
import VotingView from './components/VotingView';
import PlayersView from './components/PlayersView';

const TABS = [
  { id: 'groups',   label: 'Grupos',      shortLabel: 'Grupos',   icon: Trophy },
  { id: 'matches',  label: 'Partidos',    shortLabel: 'Partidos', icon: Calendar },
  { id: 'knockout', label: 'Llaves',      shortLabel: 'Llaves',   icon: GitBranch },
  { id: 'players',  label: 'Goleadores',  shortLabel: 'Goles',    icon: Award },
  { id: 'voting',   label: 'Votación',    shortLabel: 'Votar',    icon: Heart },
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

          <div className="text-right">
            <span className="inline-flex items-center gap-1.5 text-xs bg-red-800/50 text-red-200 border border-red-700/40 px-3 py-1.5 rounded-full font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              En juego
            </span>
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

        {activeTab === 'players' && (
          <PlayersView />
        )}

        {activeTab === 'voting' && (
          <VotingView />
        )}
      </main>

      {/* ─── Footer ─── */}
      <footer className="bg-gray-900/80 backdrop-blur-sm border-t border-gray-700/50 py-4 text-center text-xs text-gray-500">
        Intercarrera UA — Futsal 2026 — Los datos se guardan localmente en tu navegador
      </footer>
    </div>
  );
}
