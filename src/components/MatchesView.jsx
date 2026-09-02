import React, { useState } from 'react';
import { Calendar, Clock, Check, Filter } from 'lucide-react';
import { GROUP_COLORS, TEAM_SHORT } from '../data/tournamentData';

export default function MatchesView({ groupMatches, updateGroupMatch }) {
  const [filterGroup, setFilterGroup] = useState('ALL');
  const [filterStatus, setFilterStatus] = useState('ALL');

  // Apply filters
  const filtered = groupMatches.filter((m) => {
    if (filterGroup !== 'ALL' && m.group !== filterGroup) return false;
    if (filterStatus === 'PLAYED' && (m.homeScore === null || m.awayScore === null)) return false;
    if (filterStatus === 'PENDING' && m.homeScore !== null && m.awayScore !== null) return false;
    return true;
  });

  // Group matches by date
  const byDate = [];
  let currentDate = null;
  for (const m of filtered) {
    if (m.date !== currentDate) {
      currentDate = m.date;
      byDate.push({ date: m.date, matches: [] });
    }
    byDate[byDate.length - 1].matches.push(m);
  }

  const handleScoreChange = (matchId, side, value) => {
    const match = groupMatches.find((m) => m.id === matchId);
    if (!match) return;

    const cleanVal = value.replace(/[^0-9]/g, '');
    if (side === 'home') {
      updateGroupMatch(matchId, cleanVal, match.awayScore ?? '');
    } else {
      updateGroupMatch(matchId, match.homeScore ?? '', cleanVal);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-white flex items-center justify-center gap-2">
          <Calendar className="w-6 h-6 text-red-500" />
          Partidos
        </h2>
        <p className="text-sm text-gray-400 mt-1">
          {groupMatches.filter((m) => m.homeScore !== null).length} de {groupMatches.length} partidos jugados
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center justify-center gap-3">
        <div className="flex items-center gap-1.5">
          <Filter className="w-4 h-4 text-gray-500" />
          <span className="text-xs font-medium text-gray-400 uppercase">Filtros:</span>
        </div>

        {/* Group filter */}
        <div className="flex gap-1">
          {['ALL', 'A', 'B', 'C', 'D'].map((g) => (
            <button
              key={g}
              onClick={() => setFilterGroup(g)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                filterGroup === g
                  ? 'bg-red-600 text-white shadow-sm'
                  : 'bg-gray-800/70 text-gray-300 border border-gray-700 hover:border-red-600/50'
              }`}
            >
              {g === 'ALL' ? 'Todos' : `Grupo ${g}`}
            </button>
          ))}
        </div>

        {/* Status filter */}
        <div className="flex gap-1">
          {[
            { key: 'ALL', label: 'Todos' },
            { key: 'PLAYED', label: 'Jugados' },
            { key: 'PENDING', label: 'Pendientes' },
          ].map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setFilterStatus(key)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                filterStatus === key
                  ? 'bg-gray-600 text-white shadow-sm'
                  : 'bg-gray-800/70 text-gray-300 border border-gray-700 hover:border-gray-500'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Match cards grouped by date */}
      {byDate.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          <Calendar className="w-12 h-12 mx-auto mb-3 opacity-50" />
          <p className="text-lg font-medium">No hay partidos con estos filtros</p>
        </div>
      )}

      {byDate.map(({ date, matches }) => (
        <div key={date} className="space-y-3">
          {/* Date header */}
          <div className="flex items-center gap-2 px-1">
            <Calendar className="w-4 h-4 text-gray-500" />
            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider">{date}</h3>
          </div>

          {/* Match cards */}
          {matches.map((match) => {
            const isPlayed = match.homeScore !== null && match.awayScore !== null;
            const colors = GROUP_COLORS[match.group];
            let homeWin = false;
            let awayWin = false;
            let isDraw = false;

            if (isPlayed) {
              const hs = Number(match.homeScore);
              const as = Number(match.awayScore);
              homeWin = hs > as;
              awayWin = as > hs;
              isDraw = hs === as;
            }

            return (
              <div
                key={match.id}
                className={`rounded-xl border ${isPlayed ? 'border-gray-700/50' : 'border-red-700/40 border-dashed'} bg-gray-900/70 backdrop-blur-sm shadow-lg overflow-hidden transition-shadow hover:shadow-xl`}
              >
                {/* Match card top bar */}
                <div className={`flex items-center justify-between px-4 py-1.5 ${colors.bg}`}>
                  <span className={`text-xs font-bold ${colors.text} ${colors.badge} px-2 py-0.5 rounded-full`}>
                    Grupo {match.group}
                  </span>
                  <span className="flex items-center gap-1 text-xs text-gray-400">
                    <Clock className="w-3 h-3" />
                    {match.time}
                  </span>
                  {isPlayed && (
                    <span className="flex items-center gap-1 text-xs text-green-400 font-semibold">
                      <Check className="w-3.5 h-3.5" /> Finalizado
                    </span>
                  )}
                  {!isPlayed && (
                    <span className="text-xs text-amber-400 font-semibold">Pendiente</span>
                  )}
                </div>

                {/* Score area */}
                <div className="flex items-center justify-between px-4 py-4 gap-2">
                  {/* Home team */}
                  <div className={`flex-1 text-right ${homeWin ? 'opacity-100' : isPlayed && !isDraw ? 'opacity-50' : ''}`}>
                    <p className={`font-bold text-sm sm:text-base ${homeWin ? 'text-red-400' : 'text-gray-100'}`}>
                      <span className="hidden sm:inline">{match.home}</span>
                      <span className="sm:hidden">{TEAM_SHORT[match.home] || match.home}</span>
                    </p>
                  </div>

                  {/* Score inputs */}
                  <div className="flex items-center gap-2 shrink-0">
                    <input
                      type="text"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      value={match.homeScore ?? ''}
                      onChange={(e) => handleScoreChange(match.id, 'home', e.target.value)}
                      placeholder="-"
                      className={`w-12 h-12 text-center text-xl font-bold rounded-lg border-2 outline-none transition-colors ${
                        isPlayed
                          ? homeWin
                            ? 'border-red-500/50 bg-red-950/40 text-red-300'
                            : 'border-gray-700 bg-gray-800 text-gray-300'
                          : 'border-red-600/40 bg-gray-800 text-white focus:border-red-500 focus:ring-2 focus:ring-red-500/20'
                      }`}
                    />
                    <span className="text-gray-600 text-xl font-light">—</span>
                    <input
                      type="text"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      value={match.awayScore ?? ''}
                      onChange={(e) => handleScoreChange(match.id, 'away', e.target.value)}
                      placeholder="-"
                      className={`w-12 h-12 text-center text-xl font-bold rounded-lg border-2 outline-none transition-colors ${
                        isPlayed
                          ? awayWin
                            ? 'border-red-500/50 bg-red-950/40 text-red-300'
                            : 'border-gray-700 bg-gray-800 text-gray-300'
                          : 'border-red-600/40 bg-gray-800 text-white focus:border-red-500 focus:ring-2 focus:ring-red-500/20'
                      }`}
                    />
                  </div>

                  {/* Away team */}
                  <div className={`flex-1 text-left ${awayWin ? 'opacity-100' : isPlayed && !isDraw ? 'opacity-50' : ''}`}>
                    <p className={`font-bold text-sm sm:text-base ${awayWin ? 'text-red-400' : 'text-gray-100'}`}>
                      <span className="hidden sm:inline">{match.away}</span>
                      <span className="sm:hidden">{TEAM_SHORT[match.away] || match.away}</span>
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}
