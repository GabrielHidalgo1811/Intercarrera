import React, { useState, useMemo } from 'react';
import { Award, Users, Search, Trophy, Medal, Sparkles } from 'lucide-react';
import { PLAYERS_DATA, TEAM_NICKNAMES, TEAM_SHORT, GROUP_COLORS, GROUPS } from '../data/tournamentData';

export default function PlayersView() {
  const [selectedTeam, setSelectedTeam] = useState('ALL');
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState('scorers'); // 'scorers' | 'rosters'

  // Map each team to its group
  const teamToGroup = useMemo(() => {
    const map = {};
    for (const [group, teams] of Object.entries(GROUPS)) {
      for (const team of teams) {
        map[team] = group;
      }
    }
    return map;
  }, []);

  // Compute top scorers across all teams
  const allScorers = useMemo(() => {
    const list = [];
    for (const [team, players] of Object.entries(PLAYERS_DATA)) {
      for (const player of players) {
        if (player.goals > 0) {
          list.push({
            name: player.name,
            goals: player.goals,
            team,
            group: teamToGroup[team] || '-',
            nickname: TEAM_NICKNAMES[team] || '',
          });
        }
      }
    }
    // Sort descending by goals, then by name
    list.sort((a, b) => b.goals - a.goals || a.name.localeCompare(b.name));
    return list;
  }, [teamToGroup]);

  // Filtered scorers
  const filteredScorers = useMemo(() => {
    return allScorers.filter((s) => {
      const matchesSearch = s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.team.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.nickname.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesTeam = selectedTeam === 'ALL' || s.team === selectedTeam;
      return matchesSearch && matchesTeam;
    });
  }, [allScorers, searchTerm, selectedTeam]);

  // All teams list
  const allTeams = Object.keys(PLAYERS_DATA);

  // Teams to display in roster view
  const rosterTeams = useMemo(() => {
    let teams = allTeams;
    if (selectedTeam !== 'ALL') {
      teams = teams.filter((t) => t === selectedTeam);
    }
    return teams;
  }, [allTeams, selectedTeam]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-white flex items-center justify-center gap-2">
          <Award className="w-6 h-6 text-red-500" />
          Goleadores y Planteles
        </h2>
        <p className="text-sm text-gray-400 mt-1">
          Tabla de goleadores y nómina de jugadores por carrera
        </p>
      </div>

      {/* Mode Switcher */}
      <div className="flex justify-center gap-2">
        <button
          onClick={() => setViewMode('scorers')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
            viewMode === 'scorers'
              ? 'bg-red-600 text-white shadow-lg shadow-red-900/30'
              : 'bg-gray-900/70 text-gray-300 border border-gray-700 hover:border-gray-500'
          }`}
        >
          <Trophy className="w-4 h-4 text-amber-400" />
          Tabla de Goleadores ({allScorers.length})
        </button>
        <button
          onClick={() => setViewMode('rosters')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
            viewMode === 'rosters'
              ? 'bg-red-600 text-white shadow-lg shadow-red-900/30'
              : 'bg-gray-900/70 text-gray-300 border border-gray-700 hover:border-gray-500'
          }`}
        >
          <Users className="w-4 h-4 text-sky-400" />
          Planteles por Equipo
        </button>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-gray-900/70 backdrop-blur-sm p-4 rounded-xl border border-gray-700/50">
        {/* Search */}
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Buscar jugador o equipo..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 bg-gray-800 text-sm text-gray-100 placeholder-gray-500 rounded-lg border border-gray-700 outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500"
          />
        </div>

        {/* Team filter dropdown */}
        <div className="w-full sm:w-auto">
          <select
            value={selectedTeam}
            onChange={(e) => setSelectedTeam(e.target.value)}
            className="w-full sm:w-auto px-3 py-1.5 bg-gray-800 text-sm text-gray-200 rounded-lg border border-gray-700 outline-none focus:border-red-500"
          >
            <option value="ALL">Todos los equipos</option>
            {allTeams.map((team) => (
              <option key={team} value={team}>
                {team} {TEAM_NICKNAMES[team] ? `(${TEAM_NICKNAMES[team]})` : ''}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* ─── SCORERS TABLE VIEW ─── */}
      {viewMode === 'scorers' && (
        <div className="space-y-4">
          {/* Top 3 Podium Highlights */}
          {filteredScorers.length >= 3 && selectedTeam === 'ALL' && searchTerm === '' && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {filteredScorers.slice(0, 3).map((scorer, idx) => {
                const medals = [
                  { label: '1° Lugar - Bota de Oro', bg: 'bg-gradient-to-b from-amber-500/20 to-amber-950/40', border: 'border-amber-500/50', text: 'text-amber-300', icon: Trophy },
                  { label: '2° Lugar', bg: 'bg-gradient-to-b from-slate-400/20 to-slate-900/40', border: 'border-slate-400/50', text: 'text-slate-200', icon: Medal },
                  { label: '3° Lugar', bg: 'bg-gradient-to-b from-amber-700/20 to-amber-950/40', border: 'border-amber-700/50', text: 'text-amber-400', icon: Medal },
                ];
                const m = medals[idx];
                const Icon = m.icon;

                return (
                  <div
                    key={scorer.name}
                    className={`rounded-xl border ${m.border} ${m.bg} p-4 text-center relative overflow-hidden backdrop-blur-sm`}
                  >
                    <Icon className={`w-8 h-8 mx-auto mb-2 ${m.text}`} />
                    <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                      {m.label}
                    </span>
                    <h3 className="font-extrabold text-white text-base mt-1">{scorer.name}</h3>
                    <p className="text-xs text-gray-300 mt-0.5">
                      {scorer.team}
                    </p>
                    {scorer.nickname && (
                      <p className="text-[11px] text-red-400 italic">"{scorer.nickname}"</p>
                    )}
                    <div className="mt-3 inline-flex items-center gap-1 bg-red-600/30 border border-red-500/40 px-3 py-1 rounded-full">
                      <span className="text-base">⚽</span>
                      <span className="text-sm font-extrabold text-white">{scorer.goals} goles</span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Scorers Ranking List */}
          <div className="bg-gray-900/70 backdrop-blur-sm rounded-xl border border-gray-700/50 overflow-hidden shadow-lg">
            <div className="px-4 py-3 bg-gray-800/80 border-b border-gray-700 flex items-center justify-between">
              <span className="text-xs font-bold text-gray-300 uppercase tracking-wider">
                Goleador
              </span>
              <span className="text-xs font-bold text-gray-300 uppercase tracking-wider">
                Goles
              </span>
            </div>

            {filteredScorers.length === 0 ? (
              <div className="text-center py-10 text-gray-500">
                No se encontraron goleadores con ese criterio.
              </div>
            ) : (
              filteredScorers.map((scorer, idx) => {
                const groupColor = GROUP_COLORS[scorer.group] || {};
                const isTop = idx === 0;

                return (
                  <div
                    key={`${scorer.team}-${scorer.name}`}
                    className={`flex items-center justify-between px-4 py-3 border-b border-gray-800 last:border-b-0 hover:bg-gray-800/40 transition-colors ${
                      isTop ? 'bg-red-950/20' : ''
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      {/* Rank badge */}
                      <span
                        className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                          idx === 0
                            ? 'bg-amber-500 text-black shadow-sm'
                            : idx === 1
                            ? 'bg-slate-300 text-black'
                            : idx === 2
                            ? 'bg-amber-700 text-white'
                            : 'bg-gray-800 text-gray-400 border border-gray-700'
                        }`}
                      >
                        {idx + 1}
                      </span>

                      {/* Player info */}
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <p className="font-bold text-white text-sm truncate">{scorer.name}</p>
                          {isTop && (
                            <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                          )}
                        </div>
                        <div className="flex items-center gap-1.5 text-xs text-gray-400 flex-wrap">
                          <span className="text-gray-300">{scorer.team}</span>
                          {scorer.nickname && (
                            <span className="text-red-400 italic">({scorer.nickname})</span>
                          )}
                          {scorer.group !== '-' && (
                            <span className={`text-[10px] font-semibold px-1.5 py-0.2 rounded-full ${groupColor.badge || 'bg-gray-800 text-gray-300'}`}>
                              Grupo {scorer.group}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Goals badge */}
                    <div className="flex items-center gap-1.5 shrink-0 pl-2">
                      <span className="text-sm">⚽</span>
                      <span className="font-extrabold text-base text-white">{scorer.goals}</span>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      )}

      {/* ─── ROSTERS BY TEAM VIEW ─── */}
      {viewMode === 'rosters' && (
        <div className="space-y-6">
          {rosterTeams.map((team) => {
            const players = PLAYERS_DATA[team] || [];
            const nickname = TEAM_NICKNAMES[team];
            const group = teamToGroup[team];
            const colors = GROUP_COLORS[group] || {
              header: 'bg-gray-800',
              border: 'border-gray-700',
              badge: 'bg-gray-800 text-gray-300',
            };

            // Filter players inside this roster by search term
            const visiblePlayers = players.filter((p) =>
              p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
              team.toLowerCase().includes(searchTerm.toLowerCase()) ||
              (nickname && nickname.toLowerCase().includes(searchTerm.toLowerCase()))
            );

            if (searchTerm && visiblePlayers.length === 0 && !team.toLowerCase().includes(searchTerm.toLowerCase())) {
              return null;
            }

            const totalTeamGoals = players.reduce((s, p) => s + p.goals, 0);

            return (
              <div
                key={team}
                className={`rounded-xl border ${colors.border} overflow-hidden bg-gray-900/70 backdrop-blur-sm shadow-lg`}
              >
                {/* Team header */}
                <div className={`${colors.header} text-white px-4 py-3 flex flex-wrap items-center justify-between gap-2`}>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-base sm:text-lg">{team}</h3>
                      {group && (
                        <span className="text-xs font-semibold bg-black/30 px-2 py-0.5 rounded-full">
                          Grupo {group}
                        </span>
                      )}
                    </div>
                    {nickname && (
                      <p className="text-xs text-white/80 italic mt-0.5">
                        Apodo: <span className="font-semibold text-white">"{nickname}"</span>
                      </p>
                    )}
                  </div>
                  <div className="text-right">
                    <span className="text-xs bg-black/30 px-2.5 py-1 rounded-full font-semibold">
                      {players.length} jugadores • ⚽ {totalTeamGoals} goles
                    </span>
                  </div>
                </div>

                {/* Players list */}
                {players.length === 0 ? (
                  <div className="p-6 text-center text-gray-400 text-sm">
                    ⚠️ Plantel pendiente de registro oficial por la organización.
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 p-3">
                    {visiblePlayers.map((player) => (
                      <div
                        key={player.name}
                        className={`flex items-center justify-between px-3 py-2 rounded-lg border transition-colors ${
                          player.goals > 0
                            ? 'bg-red-950/30 border-red-800/40 text-white'
                            : 'bg-gray-800/50 border-gray-700/40 text-gray-300'
                        }`}
                      >
                        <span className="text-xs sm:text-sm font-medium truncate mr-2">
                          {player.name}
                        </span>
                        {player.goals > 0 ? (
                          <span className="inline-flex items-center gap-1 bg-red-600 text-white text-xs font-extrabold px-2 py-0.5 rounded-full shrink-0">
                            ⚽ {player.goals}
                          </span>
                        ) : (
                          <span className="text-[11px] text-gray-500 shrink-0">
                            0 goles
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
