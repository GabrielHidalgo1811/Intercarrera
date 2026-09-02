import React, { useState, useCallback, useMemo } from 'react';
import { Heart, Star, Trophy, BarChart3, RotateCcw } from 'lucide-react';
import { GROUPS, TEAM_SHORT, GROUP_COLORS } from '../data/tournamentData';

const VOTES_KEY = 'futsal-votes-v1';
const VOTED_KEY = 'futsal-user-voted-v1';

function loadVotes() {
  try {
    const raw = localStorage.getItem(VOTES_KEY);
    if (raw) return JSON.parse(raw);
  } catch { /* ignore */ }
  // Initialize all teams with 0 votes
  const votes = {};
  for (const teams of Object.values(GROUPS)) {
    for (const team of teams) {
      votes[team] = 0;
    }
  }
  return votes;
}

function loadUserVote() {
  try {
    return localStorage.getItem(VOTED_KEY) || null;
  } catch { return null; }
}

export default function VotingView() {
  const [votes, setVotes] = useState(loadVotes);
  const [userVote, setUserVote] = useState(loadUserVote);
  const [justVoted, setJustVoted] = useState(false);

  const totalVotes = useMemo(() => Object.values(votes).reduce((s, v) => s + v, 0), [votes]);

  // Sorted ranking
  const ranking = useMemo(() => {
    const entries = Object.entries(votes).map(([team, count]) => ({ team, count }));
    entries.sort((a, b) => b.count - a.count);
    return entries;
  }, [votes]);

  const maxVotes = ranking.length > 0 ? ranking[0].count : 0;

  // Find which group a team belongs to
  const teamGroup = useMemo(() => {
    const map = {};
    for (const [group, teams] of Object.entries(GROUPS)) {
      for (const team of teams) {
        map[team] = group;
      }
    }
    return map;
  }, []);

  const handleVote = useCallback((team) => {
    setVotes((prev) => {
      const next = { ...prev };
      // If user already voted, remove previous vote
      if (userVote && next[userVote] !== undefined) {
        next[userVote] = Math.max(0, next[userVote] - 1);
      }
      // Add new vote
      next[team] = (next[team] || 0) + 1;
      localStorage.setItem(VOTES_KEY, JSON.stringify(next));
      return next;
    });
    setUserVote(team);
    localStorage.setItem(VOTED_KEY, team);
    setJustVoted(true);
    setTimeout(() => setJustVoted(false), 1500);
  }, [userVote]);

  const resetVotes = useCallback(() => {
    const fresh = {};
    for (const teams of Object.values(GROUPS)) {
      for (const team of teams) {
        fresh[team] = 0;
      }
    }
    setVotes(fresh);
    setUserVote(null);
    localStorage.setItem(VOTES_KEY, JSON.stringify(fresh));
    localStorage.removeItem(VOTED_KEY);
  }, []);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-white flex items-center justify-center gap-2">
          <Heart className="w-6 h-6 text-red-500" />
          Vota por tu Equipo
        </h2>
        <p className="text-sm text-gray-400 mt-1">
          Selecciona tu equipo favorito — {totalVotes} voto{totalVotes !== 1 ? 's' : ''} registrado{totalVotes !== 1 ? 's' : ''}
        </p>
      </div>

      {/* Voted confirmation */}
      {justVoted && (
        <div className="bg-red-900/40 border border-red-700/40 rounded-xl p-3 text-center text-red-300 text-sm font-semibold animate-pulse">
          ✅ ¡Voto registrado por {userVote}!
        </div>
      )}

      {/* Team grid - vote cards */}
      <div>
        <h3 className="text-lg font-bold text-gray-200 mb-4 flex items-center gap-2">
          <Star className="w-5 h-5 text-amber-400" />
          Equipos
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {Object.entries(GROUPS).map(([group, teams]) =>
            teams.map((team) => {
              const isSelected = userVote === team;
              const colors = GROUP_COLORS[group];
              const teamVotes = votes[team] || 0;
              const pct = totalVotes > 0 ? Math.round((teamVotes / totalVotes) * 100) : 0;

              return (
                <button
                  key={team}
                  onClick={() => handleVote(team)}
                  className={`relative rounded-xl border p-4 text-left transition-all duration-200 overflow-hidden group ${
                    isSelected
                      ? 'border-red-500 bg-red-950/50 shadow-lg shadow-red-900/20 scale-[1.02]'
                      : 'border-gray-700/50 bg-gray-900/70 backdrop-blur-sm hover:border-red-600/50 hover:bg-gray-800/70'
                  }`}
                >
                  {/* Vote percentage bar background */}
                  <div
                    className={`absolute bottom-0 left-0 h-1 transition-all duration-500 rounded-full ${
                      isSelected ? 'bg-red-500' : 'bg-gray-600'
                    }`}
                    style={{ width: `${pct}%` }}
                  />

                  {/* Group badge */}
                  <span className={`text-[10px] font-bold ${colors.badge} px-1.5 py-0.5 rounded-full`}>
                    {group}
                  </span>

                  {/* Team name */}
                  <p className="font-bold text-gray-100 text-sm mt-2 leading-tight">
                    <span className="hidden sm:inline">{team}</span>
                    <span className="sm:hidden">{TEAM_SHORT[team] || team}</span>
                  </p>

                  {/* Vote count */}
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-xs text-gray-400">
                      {teamVotes} voto{teamVotes !== 1 ? 's' : ''}
                    </span>
                    {totalVotes > 0 && (
                      <span className={`text-xs font-bold ${isSelected ? 'text-red-400' : 'text-gray-500'}`}>
                        {pct}%
                      </span>
                    )}
                  </div>

                  {/* Selected indicator */}
                  {isSelected && (
                    <div className="absolute top-2 right-2">
                      <Heart className="w-4 h-4 text-red-400 fill-red-400" />
                    </div>
                  )}
                </button>
              );
            })
          )}
        </div>
      </div>

      {/* Ranking */}
      {totalVotes > 0 && (
        <div>
          <h3 className="text-lg font-bold text-gray-200 mb-4 flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-red-400" />
            Ranking de Popularidad
          </h3>
          <div className="bg-gray-900/70 backdrop-blur-sm rounded-xl border border-gray-700/50 overflow-hidden shadow-lg">
            {ranking.map((entry, idx) => {
              const pct = totalVotes > 0 ? Math.round((entry.count / totalVotes) * 100) : 0;
              const barWidth = maxVotes > 0 ? Math.round((entry.count / maxVotes) * 100) : 0;
              const group = teamGroup[entry.team];
              const isTop3 = idx < 3 && entry.count > 0;
              const medalColors = ['text-amber-400', 'text-gray-300', 'text-amber-700'];

              return (
                <div
                  key={entry.team}
                  className={`flex items-center gap-3 px-4 py-3 border-b border-gray-800 last:border-b-0 transition-colors ${
                    userVote === entry.team ? 'bg-red-950/30' : 'hover:bg-gray-800/50'
                  }`}
                >
                  {/* Position */}
                  <div className="w-8 text-center shrink-0">
                    {isTop3 ? (
                      <Trophy className={`w-5 h-5 mx-auto ${medalColors[idx]}`} />
                    ) : (
                      <span className="text-sm font-bold text-gray-500">{idx + 1}</span>
                    )}
                  </div>

                  {/* Team info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-semibold text-gray-100 text-sm truncate">
                        <span className="hidden sm:inline">{entry.team}</span>
                        <span className="sm:hidden">{TEAM_SHORT[entry.team] || entry.team}</span>
                      </span>
                      <span className={`text-[10px] font-bold ${GROUP_COLORS[group]?.badge} px-1.5 py-0.5 rounded-full`}>
                        {group}
                      </span>
                      {userVote === entry.team && (
                        <Heart className="w-3 h-3 text-red-400 fill-red-400 shrink-0" />
                      )}
                    </div>
                    {/* Progress bar */}
                    <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${
                          idx === 0 && entry.count > 0 ? 'bg-red-500' : 'bg-gray-600'
                        }`}
                        style={{ width: `${barWidth}%` }}
                      />
                    </div>
                  </div>

                  {/* Vote count */}
                  <div className="text-right shrink-0">
                    <p className="text-sm font-bold text-gray-200">{entry.count}</p>
                    <p className="text-[10px] text-gray-500">{pct}%</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Reset votes */}
      <div className="text-center">
        <button
          onClick={resetVotes}
          className="inline-flex items-center gap-1.5 text-xs text-gray-500 hover:text-red-400 transition-colors"
        >
          <RotateCcw className="w-3 h-3" />
          Reiniciar votos
        </button>
      </div>
    </div>
  );
}
