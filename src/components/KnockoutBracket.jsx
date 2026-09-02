import React from 'react';
import { GitBranch, Trophy, Medal, Award, Clock, Calendar } from 'lucide-react';
import { TEAM_SHORT } from '../data/tournamentData';

// ─── Single knockout match card ─────────────────
function KnockoutMatchCard({ match, roundLabel, updateKnockoutMatch, accentColor }) {
  const isPlayed = match.homeScore !== null && match.awayScore !== null;
  const isTied = isPlayed && Number(match.homeScore) === Number(match.awayScore);
  const hasPenalties = isTied && match.homePen !== null && match.awayPen !== null;

  let homeWin = false;
  let awayWin = false;
  if (isPlayed) {
    if (Number(match.homeScore) > Number(match.awayScore)) homeWin = true;
    else if (Number(match.awayScore) > Number(match.homeScore)) awayWin = true;
    else if (hasPenalties) {
      if (Number(match.homePen) > Number(match.awayPen)) homeWin = true;
      else if (Number(match.awayPen) > Number(match.homePen)) awayWin = true;
    }
  }

  const handleChange = (field, value) => {
    const clean = value.replace(/[^0-9]/g, '');
    updateKnockoutMatch(match.id, field, clean);
  };

  return (
    <div className="bg-gray-900/70 backdrop-blur-sm rounded-xl border border-gray-700/50 shadow-lg overflow-hidden w-full max-w-sm">
      {/* Round label */}
      <div className={`${accentColor} text-white text-xs font-bold text-center py-1.5 uppercase tracking-wider`}>
        {roundLabel} — {match.label}
      </div>

      {/* Date & time */}
      {match.date && (
        <div className="flex items-center justify-center gap-3 py-1 bg-gray-800/50 text-xs text-gray-400 border-b border-gray-700/50">
          <span className="flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            {match.date}
          </span>
          {match.time && (
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {match.time}
            </span>
          )}
        </div>
      )}

      {/* Teams & scores */}
      <div className="p-3 space-y-2">
        {/* Home */}
        <TeamRow
          team={match.home}
          seed={match.homeSeed}
          score={match.homeScore}
          pen={match.homePen}
          isWinner={homeWin}
          isTied={isTied}
          showPen={isTied}
          onScoreChange={(v) => handleChange('homeScore', v)}
          onPenChange={(v) => handleChange('homePen', v)}
        />

        <div className="border-t border-dashed border-gray-700/50" />

        {/* Away */}
        <TeamRow
          team={match.away}
          seed={match.awaySeed}
          score={match.awayScore}
          pen={match.awayPen}
          isWinner={awayWin}
          isTied={isTied}
          showPen={isTied}
          onScoreChange={(v) => handleChange('awayScore', v)}
          onPenChange={(v) => handleChange('awayPen', v)}
        />
      </div>
    </div>
  );
}

// ─── Team row inside a knockout card ─────────────
function TeamRow({ team, seed, score, pen, isWinner, isTied, showPen, onScoreChange, onPenChange }) {
  const name = team || (seed ? `(${seed})` : 'Por definir');
  const short = team ? (TEAM_SHORT[team] || team) : name;
  const isEmpty = !team;

  return (
    <div className={`flex items-center gap-2 py-1 transition-opacity ${isEmpty ? 'opacity-40' : isWinner ? 'opacity-100' : score !== null ? 'opacity-60' : 'opacity-100'}`}>
      {/* Team name */}
      <div className="flex-1 min-w-0">
        <p className={`font-semibold text-sm truncate ${isWinner ? 'text-red-400' : 'text-gray-100'}`}>
          <span className="hidden sm:inline">{name}</span>
          <span className="sm:hidden">{short}</span>
        </p>
        {seed && (
          <p className="text-[10px] text-gray-500">{seed}</p>
        )}
      </div>

      {/* Score input */}
      <input
        type="text"
        inputMode="numeric"
        pattern="[0-9]*"
        value={score ?? ''}
        onChange={(e) => onScoreChange(e.target.value)}
        placeholder="-"
        disabled={!team}
        className={`w-10 h-10 text-center text-lg font-bold rounded-lg border-2 outline-none transition-colors ${
          isWinner
            ? 'border-red-500/50 bg-red-950/40 text-red-300'
            : 'border-gray-700 bg-gray-800 text-gray-200 focus:border-red-500 focus:ring-1 focus:ring-red-500/20'
        } disabled:opacity-30 disabled:cursor-not-allowed`}
      />

      {/* Penalty input (only shows when tied) */}
      {showPen && (
        <div className="flex flex-col items-center">
          <span className="text-[9px] text-gray-500 uppercase">Pen</span>
          <input
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            value={pen ?? ''}
            onChange={(e) => onPenChange(e.target.value)}
            placeholder="-"
            disabled={!team}
            className="w-8 h-8 text-center text-sm font-bold rounded border border-amber-700/50 bg-amber-950/30 text-amber-400 outline-none focus:border-amber-500 disabled:opacity-30 disabled:cursor-not-allowed"
          />
        </div>
      )}

      {/* Winner indicator */}
      {isWinner && (
        <Trophy className="w-4 h-4 text-amber-400 shrink-0" />
      )}
    </div>
  );
}

// ─── Main Knockout Bracket Component ─────────────
export default function KnockoutBracket({ knockout, updateKnockoutMatch, champion }) {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-white flex items-center justify-center gap-2">
          <GitBranch className="w-6 h-6 text-red-500" />
          Fase Eliminatoria
        </h2>
        <p className="text-sm text-gray-400 mt-1">Cuartos de Final → Semifinales → Final</p>
      </div>

      {/* Champion banner */}
      {champion && (
        <div className="bg-gradient-to-r from-red-800 via-red-700 to-red-800 rounded-2xl p-6 text-center shadow-lg border border-red-600/30">
          <Trophy className="w-12 h-12 mx-auto text-amber-400 mb-2" />
          <p className="text-sm font-semibold text-red-200 uppercase tracking-wider">Campeón</p>
          <p className="text-2xl font-extrabold text-white mt-1">{champion}</p>
        </div>
      )}

      {/* Quarter Finals */}
      <section>
        <h3 className="text-lg font-bold text-gray-200 mb-4 flex items-center gap-2">
          <Award className="w-5 h-5 text-red-400" />
          Cuartos de Final
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {knockout.quarterFinals.map((match) => (
            <KnockoutMatchCard
              key={match.id}
              match={match}
              roundLabel="4tos"
              updateKnockoutMatch={updateKnockoutMatch}
              accentColor="bg-red-700"
            />
          ))}
        </div>
      </section>

      {/* Semi Finals */}
      <section>
        <h3 className="text-lg font-bold text-gray-200 mb-4 flex items-center gap-2">
          <Award className="w-5 h-5 text-red-400" />
          Semifinales
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
          {knockout.semiFinals.map((match) => (
            <KnockoutMatchCard
              key={match.id}
              match={match}
              roundLabel="Semifinal"
              updateKnockoutMatch={updateKnockoutMatch}
              accentColor="bg-gray-700"
            />
          ))}
        </div>
      </section>

      {/* Third Place & Final */}
      <section>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
          {/* Third Place */}
          <div>
            <h3 className="text-lg font-bold text-gray-200 mb-4 flex items-center gap-2">
              <Medal className="w-5 h-5 text-amber-400" />
              3er Puesto
            </h3>
            <KnockoutMatchCard
              match={knockout.thirdPlace}
              roundLabel="3er Puesto"
              updateKnockoutMatch={updateKnockoutMatch}
              accentColor="bg-amber-800"
            />
          </div>

          {/* Final */}
          <div>
            <h3 className="text-lg font-bold text-gray-200 mb-4 flex items-center gap-2">
              <Trophy className="w-5 h-5 text-red-500" />
              Gran Final
            </h3>
            <KnockoutMatchCard
              match={knockout.final}
              roundLabel="Final"
              updateKnockoutMatch={updateKnockoutMatch}
              accentColor="bg-gradient-to-r from-red-700 to-red-800"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
