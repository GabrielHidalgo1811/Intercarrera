import React from 'react';
import { Trophy, Medal, Clock, Calendar } from 'lucide-react';
import { TEAM_SHORT } from '../data/tournamentData';

// ─── Individual team slot inside a match ─────────────────────────────────────
function TeamSlot({ team, seed, score, pen, isWinner, isTied, onScoreChange, onPenChange }) {
  const name  = team || (seed ? `(${seed})` : 'Por definir');
  const short = team ? (TEAM_SHORT[team] || team) : name;
  const isEmpty = !team;

  return (
    <div
      className={`flex items-center gap-1.5 px-2 py-1.5 transition-colors ${
        isEmpty ? 'opacity-40' : isWinner ? 'bg-red-900/40' : score !== null ? 'opacity-60' : ''
      }`}
    >
      <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${isWinner ? 'bg-red-400' : 'bg-gray-700'}`} />

      <span className={`flex-1 text-xs font-semibold truncate ${isWinner ? 'text-red-300' : 'text-gray-200'}`} title={name}>
        <span className="hidden sm:inline">{name}</span>
        <span className="sm:hidden">{short}</span>
      </span>

      {isTied && (
        <div className="flex flex-col items-center mr-0.5">
          <span className="text-[8px] text-amber-500 uppercase leading-none">Pen</span>
          <input
            type="text" inputMode="numeric"
            value={pen ?? ''} onChange={(e) => onPenChange(e.target.value.replace(/[^0-9]/g, ''))}
            placeholder="-" disabled={isEmpty}
            className="w-6 h-6 text-center text-xs font-bold rounded border border-amber-700/50 bg-amber-950/30 text-amber-400 outline-none focus:border-amber-400 disabled:opacity-30"
          />
        </div>
      )}

      <input
        type="text" inputMode="numeric"
        value={score ?? ''} onChange={(e) => onScoreChange(e.target.value.replace(/[^0-9]/g, ''))}
        placeholder="-" disabled={isEmpty}
        className={`w-8 h-8 text-center text-sm font-bold rounded border-2 outline-none transition-colors shrink-0 ${
          isWinner
            ? 'border-red-600/60 bg-red-950/50 text-red-300'
            : 'border-gray-700 bg-gray-800 text-gray-100 focus:border-red-500'
        } disabled:opacity-30 disabled:cursor-not-allowed`}
      />
    </div>
  );
}

// ─── Match card for the bracket ───────────────────────────────────────────────
function BracketMatch({ match, accentColor, updateKnockoutMatch }) {
  const isPlayed = match.homeScore !== null && match.awayScore !== null;
  const isTied   = isPlayed && Number(match.homeScore) === Number(match.awayScore);
  const hasPen   = isTied && match.homePen !== null && match.awayPen !== null;

  let homeWin = false, awayWin = false;
  if (isPlayed) {
    if (Number(match.homeScore) > Number(match.awayScore)) homeWin = true;
    else if (Number(match.awayScore) > Number(match.homeScore)) awayWin = true;
    else if (hasPen) {
      if (Number(match.homePen) > Number(match.awayPen)) homeWin = true;
      else if (Number(match.awayPen) > Number(match.homePen)) awayWin = true;
    }
  }

  const handle = (field, value) => updateKnockoutMatch(match.id, field, value);

  return (
    <div className="bg-gray-900/80 border border-gray-700/60 rounded-lg overflow-hidden shadow-lg w-full">
      <div className={`${accentColor} text-white text-[10px] font-bold px-2 py-1 flex items-center justify-between`}>
        <span>{match.label}</span>
        {match.date && (
          <span className="flex items-center gap-1 opacity-80 font-normal">
            <Calendar className="w-2.5 h-2.5" />{match.date}
            {match.time && <><Clock className="w-2.5 h-2.5 ml-1" />{match.time}</>}
          </span>
        )}
      </div>

      <TeamSlot
        team={match.home} seed={match.homeSeed}
        score={match.homeScore} pen={match.homePen}
        isWinner={homeWin} isTied={isTied}
        onScoreChange={(v) => handle('homeScore', v)}
        onPenChange={(v)  => handle('homePen',   v)}
      />
      <div className="border-t border-gray-800/80 mx-2" />
      <TeamSlot
        team={match.away} seed={match.awaySeed}
        score={match.awayScore} pen={match.awayPen}
        isWinner={awayWin} isTied={isTied}
        onScoreChange={(v) => handle('awayScore', v)}
        onPenChange={(v)  => handle('awayPen',   v)}
      />
    </div>
  );
}

// ─── Main Knockout Bracket ────────────────────────────────────────────────────
export default function KnockoutBracket({ knockout, updateKnockoutMatch, champion }) {
  const { quarterFinals, semiFinals, thirdPlace, final } = knockout;
  const [lQF1, lQF2] = [quarterFinals[0], quarterFinals[1]]; // left side → SF1
  const [rQF1, rQF2] = [quarterFinals[2], quarterFinals[3]]; // right side → SF2
  const sf1 = semiFinals[0];
  const sf2 = semiFinals[1];

  // Heights for connector alignment
  const matchH = 'h-[88px]'; // approximate match card height

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-white flex items-center justify-center gap-2">
          <Trophy className="w-6 h-6 text-red-500" />
          Fase Eliminatoria
        </h2>
        <p className="text-sm text-gray-400 mt-1">Cuartos de Final → Semifinales → Final</p>
      </div>

      {/* Champion banner */}
      {champion && (
        <div className="bg-gradient-to-r from-red-800 via-red-700 to-red-800 rounded-2xl p-5 text-center shadow-lg border border-red-600/30">
          <Trophy className="w-10 h-10 mx-auto text-amber-400 mb-1" />
          <p className="text-xs font-semibold text-red-200 uppercase tracking-widest">¡Campeón!</p>
          <p className="text-2xl font-extrabold text-white mt-1">{champion}</p>
        </div>
      )}

      {/* ── BRACKET ── */}
      <div className="overflow-x-auto pb-4">
        <div className="min-w-[700px] max-w-4xl mx-auto">

          {/* Column labels */}
          <div className="grid grid-cols-[1fr_32px_1fr_32px_80px_32px_1fr_32px_1fr] mb-2 text-center text-[10px] font-bold uppercase tracking-widest text-gray-500 select-none">
            <span>Cuartos</span><span/><span>Semis</span><span/>
            <span className="text-red-500">Final</span>
            <span/><span>Semis</span><span/><span>Cuartos</span>
          </div>

          {/* Bracket rows — top half */}
          <div className="grid grid-cols-[1fr_32px_1fr_32px_80px_32px_1fr_32px_1fr] items-start">

            {/* ── LEFT ── */}
            {/* QF1 */}
            <div><BracketMatch match={lQF1} accentColor="bg-red-800" updateKnockoutMatch={updateKnockoutMatch} /></div>

            {/* QF1 → SF1 top arm */}
            <div className="self-stretch flex flex-col">
              <div className="flex-1 border-r-2 border-t-2 border-gray-600/50 rounded-tr-md mt-[44px]" />
            </div>

            {/* SF1 — spans 2 rows via relative positioning */}
            <div className="row-span-3 flex items-center">
              <BracketMatch match={sf1} accentColor="bg-gray-700" updateKnockoutMatch={updateKnockoutMatch} />
            </div>

            {/* SF1 → Final left arm */}
            <div className="row-span-3 self-stretch flex items-center">
              <div className="w-full border-t-2 border-gray-600/50" />
            </div>

            {/* FINAL — spans all rows */}
            <div className="row-span-5 flex items-center">
              <BracketMatch match={final} accentColor="bg-gradient-to-r from-red-700 to-red-900" updateKnockoutMatch={updateKnockoutMatch} />
            </div>

            {/* SF2 → Final right arm */}
            <div className="row-span-3 self-stretch flex items-center justify-end">
              <div className="w-full border-t-2 border-gray-600/50" />
            </div>

            {/* SF2 — spans 2 rows */}
            <div className="row-span-3 flex items-center">
              <BracketMatch match={sf2} accentColor="bg-gray-700" updateKnockoutMatch={updateKnockoutMatch} />
            </div>

            {/* QF3 → SF2 top arm */}
            <div className="self-stretch flex flex-col">
              <div className="flex-1 border-l-2 border-t-2 border-gray-600/50 rounded-tl-md mt-[44px]" />
            </div>

            {/* QF3 */}
            <div><BracketMatch match={rQF1} accentColor="bg-red-800" updateKnockoutMatch={updateKnockoutMatch} /></div>

            {/* Spacer row */}
            <div className="h-3" />
            <div className="h-3" />
            {/* SF1 row-span covers this */}
            {/* Final row-span covers this */}
            {/* SF2 row-span covers this */}
            <div className="h-3" />
            <div className="h-3" />

            {/* QF2 */}
            <div><BracketMatch match={lQF2} accentColor="bg-red-800" updateKnockoutMatch={updateKnockoutMatch} /></div>

            {/* QF2 → SF1 bottom arm */}
            <div className="self-stretch flex flex-col">
              <div className="flex-1 border-r-2 border-b-2 border-gray-600/50 rounded-br-md mb-[44px]" />
            </div>

            {/* SF1 row-span */}
            {/* Final row-span */}
            {/* SF2 row-span */}

            {/* QF4 → SF2 bottom arm */}
            <div className="self-stretch flex flex-col">
              <div className="flex-1 border-l-2 border-b-2 border-gray-600/50 rounded-bl-md mb-[44px]" />
            </div>

            {/* QF4 */}
            <div><BracketMatch match={rQF2} accentColor="bg-red-800" updateKnockoutMatch={updateKnockoutMatch} /></div>
          </div>

          {/* ── THIRD PLACE ── */}
          <div className="flex justify-center mt-6">
            <div className="w-64 flex flex-col items-center gap-1">
              <div className="flex items-center gap-1.5 text-xs text-amber-400/90 font-bold uppercase tracking-wider">
                <Medal className="w-3.5 h-3.5" /> 3er Puesto
              </div>
              <BracketMatch match={thirdPlace} accentColor="bg-amber-800" updateKnockoutMatch={updateKnockoutMatch} />
            </div>
          </div>

        </div>
      </div>

      <div className="text-center text-xs text-gray-500 flex items-center justify-center gap-1.5">
        <span className="w-2.5 h-2.5 rounded-full bg-red-500 inline-block" />
        Equipo ganador
      </div>
    </div>
  );
}


