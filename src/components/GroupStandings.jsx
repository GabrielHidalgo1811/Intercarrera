import React from 'react';
import { Trophy, ChevronUp, ChevronDown, Minus } from 'lucide-react';
import { GROUP_COLORS, TEAM_SHORT } from '../data/tournamentData';

export default function GroupStandings({ standings, qualified }) {
  const groups = Object.keys(standings).sort();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-white flex items-center justify-center gap-2">
          <Trophy className="w-6 h-6 text-red-500" />
          Tabla de Posiciones
        </h2>
        <p className="text-sm text-gray-400 mt-1">Los 2 primeros de cada grupo clasifican a Cuartos de Final</p>
      </div>

      {/* Group tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {groups.map((group) => {
          const colors = GROUP_COLORS[group];
          const rows = standings[group];

          return (
            <div key={group} className={`rounded-xl border ${colors.border} overflow-hidden shadow-lg bg-gray-900/70 backdrop-blur-sm`}>
              {/* Group header */}
              <div className={`${colors.header} text-white px-4 py-3 flex items-center justify-between`}>
                <h3 className="text-lg font-bold tracking-wide">Grupo {group}</h3>
                <span className="text-sm opacity-80">
                  {rows.reduce((sum, r) => sum + r.pj, 0) / 2} / 3 partidos
                </span>
              </div>

              {/* Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className={`${colors.bg} text-xs uppercase tracking-wider text-gray-400`}>
                      <th className="text-left px-3 py-2 w-8">#</th>
                      <th className="text-left px-3 py-2">Equipo</th>
                      <th className="text-center px-2 py-2" title="Partidos Jugados">PJ</th>
                      <th className="text-center px-2 py-2" title="Ganados">PG</th>
                      <th className="text-center px-2 py-2" title="Empatados">PE</th>
                      <th className="text-center px-2 py-2" title="Perdidos">PP</th>
                      <th className="text-center px-2 py-2" title="Goles a Favor">GF</th>
                      <th className="text-center px-2 py-2" title="Goles en Contra">GC</th>
                      <th className="text-center px-2 py-2" title="Diferencia de Goles">DIF</th>
                      <th className="text-center px-2 py-2 font-bold" title="Puntos">PTS</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rows.map((row, idx) => {
                      const isQualified = idx < 2;
                      const pos = idx + 1;

                      return (
                        <tr
                          key={row.team}
                          className={`border-t border-gray-800 transition-colors ${
                            isQualified
                              ? 'bg-red-950/30 hover:bg-red-950/50'
                              : 'hover:bg-gray-800/50'
                          }`}
                        >
                          {/* Position */}
                          <td className="px-3 py-2.5">
                            <span className={`inline-flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold ${
                              isQualified
                                ? 'bg-red-600 text-white'
                                : 'bg-gray-700 text-gray-400'
                            }`}>
                              {pos}
                            </span>
                          </td>

                          {/* Team name */}
                          <td className="px-3 py-2.5">
                            <div className="flex items-center gap-2">
                              <span className="font-semibold text-gray-100 hidden sm:inline">{row.team}</span>
                              <span className="font-semibold text-gray-100 sm:hidden">{TEAM_SHORT[row.team] || row.team}</span>
                              {isQualified && (
                                <span className="badge-qualified hidden sm:inline-block">Clasifica</span>
                              )}
                            </div>
                          </td>

                          {/* Stats */}
                          <td className="text-center px-2 py-2.5 text-gray-300">{row.pj}</td>
                          <td className="text-center px-2 py-2.5 text-green-400 font-medium">{row.pg}</td>
                          <td className="text-center px-2 py-2.5 text-gray-400">{row.pe}</td>
                          <td className="text-center px-2 py-2.5 text-red-400">{row.pp}</td>
                          <td className="text-center px-2 py-2.5 text-gray-200">{row.gf}</td>
                          <td className="text-center px-2 py-2.5 text-gray-200">{row.gc}</td>

                          {/* Goal diff with icon */}
                          <td className="text-center px-2 py-2.5">
                            <span className={`inline-flex items-center gap-0.5 font-semibold ${
                              row.dif > 0 ? 'text-green-400' : row.dif < 0 ? 'text-red-400' : 'text-gray-500'
                            }`}>
                              {row.dif > 0 && <ChevronUp className="w-3 h-3" />}
                              {row.dif < 0 && <ChevronDown className="w-3 h-3" />}
                              {row.dif === 0 && <Minus className="w-3 h-3" />}
                              {row.dif > 0 ? `+${row.dif}` : row.dif}
                            </span>
                          </td>

                          {/* Points */}
                          <td className="text-center px-2 py-2.5">
                            <span className={`inline-flex items-center justify-center w-8 h-8 rounded-lg font-bold text-base ${
                              isQualified
                                ? 'bg-red-600 text-white'
                                : 'bg-gray-700 text-gray-300'
                            }`}>
                              {row.pts}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="flex items-center justify-center gap-6 text-xs text-gray-400">
        <span className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full bg-red-600" /> Clasificado a 4tos de Final
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full bg-gray-700" /> Eliminado
        </span>
      </div>
    </div>
  );
}
