import React from 'react';
import { Trophy, Medal, Clock, Calendar } from 'lucide-react';
import { TEAM_SHORT } from '../data/tournamentData';

// ─── Team row inside a card ───────────────────────────────────────────────────
function TeamSlot({ team, seed, score, pen, isWinner, isTied, onScoreChange, onPenChange }) {
  const name  = team || (seed ? `(${seed})` : 'Por definir');
  const short = team ? (TEAM_SHORT[team] || team) : name;
  const isEmpty = !team;

  return (
    <div className={`flex items-center gap-2 px-3 py-2 ${
      isEmpty ? 'opacity-40' : isWinner ? 'bg-red-900/40' : score !== null ? 'opacity-60' : ''
    }`}>
      <span className={`w-2 h-2 rounded-full shrink-0 ${isWinner ? 'bg-red-400' : 'bg-gray-600'}`} />

      <span className={`flex-1 text-xs font-semibold truncate ${isWinner ? 'text-red-300' : 'text-gray-100'}`} title={name}>
        <span className="hidden lg:inline">{name}</span>
        <span className="lg:hidden">{short}</span>
      </span>

      {isTied && (
        <div className="flex flex-col items-center">
          <span className="text-[8px] text-amber-500 uppercase leading-none">Pen</span>
          <input
            type="text" inputMode="numeric"
            value={pen ?? ''} onChange={(e) => onPenChange(e.target.value.replace(/[^0-9]/g, ''))}
            placeholder="-" disabled={isEmpty}
            className="w-6 h-6 text-center text-xs font-bold rounded border border-amber-700/50 bg-amber-950/30 text-amber-400 outline-none disabled:opacity-30"
          />
        </div>
      )}

      <input
        type="text" inputMode="numeric"
        value={score ?? ''} onChange={(e) => onScoreChange(e.target.value.replace(/[^0-9]/g, ''))}
        placeholder="-" disabled={isEmpty}
        className={`w-9 h-9 text-center text-sm font-bold rounded-lg border-2 outline-none shrink-0 ${
          isWinner
            ? 'border-red-600/60 bg-red-950/60 text-red-300'
            : 'border-gray-700 bg-gray-800 text-gray-100 focus:border-red-500'
        } disabled:opacity-30 disabled:cursor-not-allowed`}
      />
    </div>
  );
}

// ─── Match card ───────────────────────────────────────────────────────────────
function BracketMatch({ match, accentColor, updateKnockoutMatch }) {
  const isPlayed = match.homeScore !== null && match.awayScore !== null;
  const isTied   = isPlayed && Number(match.homeScore) === Number(match.awayScore);
  const hasPen   = isTied && match.homePen !== null && match.awayPen !== null;

  let homeWin = false, awayWin = false;
  if (isPlayed) {
    if      (Number(match.homeScore) > Number(match.awayScore)) homeWin = true;
    else if (Number(match.awayScore) > Number(match.homeScore)) awayWin = true;
    else if (hasPen) {
      if      (Number(match.homePen) > Number(match.awayPen)) homeWin = true;
      else if (Number(match.awayPen) > Number(match.homePen)) awayWin = true;
    }
  }

  const handle = (field, value) => updateKnockoutMatch(match.id, field, value);

  return (
    <div className="bg-gray-900/90 border border-gray-700/60 rounded-xl overflow-hidden shadow-xl w-full">
      {/* Header bar */}
      <div className={`${accentColor} text-white text-[10px] font-bold px-3 py-1.5 flex items-center justify-between gap-2`}>
        <span className="uppercase tracking-wider">{match.label}</span>
        {match.date && (
          <span className="flex items-center gap-1 opacity-75 font-normal whitespace-nowrap">
            <Calendar className="w-2.5 h-2.5 shrink-0" />{match.date}
            {match.time && <><Clock className="w-2.5 h-2.5 ml-1 shrink-0" />{match.time}</>}
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
      <div className="border-t border-gray-800 mx-3" />
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

// ─── Bracket connector: 2 QFs (top+bottom) joining to 1 SF (center) ──────────
// The outer container stretches to full height.
// QF1 center ≈ 25% height, QF2 center ≈ 75%, SF center = 50%.
function ConnectorQFtoSF({ side }) {
  // side: 'right' (left QFs → right SF) | 'left' (right SF ← right QFs)
  const spine = side === 'right' ? 'right-0' : 'left-0';
  const border = side === 'right' ? 'border-r-2' : 'border-l-2';
  return (
    <div className="relative w-8 self-stretch shrink-0">
      {/* arm from QF1 center (25%) */}
      <div className={`absolute ${spine} top-[25%] w-full border-t-2 border-gray-600/60 -translate-y-px`} />
      {/* vertical spine 25% → 75% */}
      <div className={`absolute ${spine} top-[25%] bottom-[25%] ${border} border-gray-600/60`} />
      {/* arm from QF2 center (75%) */}
      <div className={`absolute ${spine} bottom-[25%] w-full border-t-2 border-gray-600/60 translate-y-px`} />
      {/* arrow out to SF at 50% */}
      <div className={`absolute ${side === 'right' ? 'left-0' : 'right-0'} top-1/2 w-full border-t-2 border-gray-600/60 -translate-y-px`} />
    </div>
  );
}

// Simple horizontal connector line (SF → Final)
function ConnectorSFtoFinal() {
  return <div className="self-center w-8 shrink-0 border-t-2 border-gray-600/60" />;
}

// ─── Main export ──────────────────────────────────────────────────────────────
export default function KnockoutBracket({ knockout, updateKnockoutMatch, champion }) {
  const { quarterFinals, semiFinals, thirdPlace, final } = knockout;
  const [lQF1, lQF2] = [quarterFinals[0], quarterFinals[1]];
  const [rQF1, rQF2] = [quarterFinals[2], quarterFinals[3]];
  const sf1 = semiFinals[0];
  const sf2 = semiFinals[1];

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
      <div className="overflow-x-auto pb-2">
        <div className="min-w-[860px]">

          {/* Round labels */}
          <div className="flex mb-3 text-center text-[11px] font-bold uppercase tracking-widest text-gray-500 select-none">
            <div className="flex-1">Cuartos</div>
            <div className="w-8 shrink-0" />
            <div className="flex-1">Semis</div>
            <div className="w-8 shrink-0" />
            <div className="flex-1 text-red-400">Final</div>
            <div className="w-8 shrink-0" />
            <div className="flex-1">Semis</div>
            <div className="w-8 shrink-0" />
            <div className="flex-1">Cuartos</div>
          </div>

          {/* ── Main bracket row ── */}
          {/*
            Layout: [QF_L col] [conn] [SF1 col] [conn] [FINAL col] [conn] [SF2 col] [conn] [QF_R col]
            The QF columns use flex-col so QF1 is in top half and QF2 in bottom half.
            SF and Final columns use flex items-center to vertically center.
            Connectors use absolute positioning at 25%, 50%, 75% of their own height.
          */}
          <div className="flex items-stretch">

            {/* ── LEFT QFs column ── */}
            <div className="flex-1 flex flex-col">
              <div className="flex-1 flex items-center pb-1.5">
                <BracketMatch match={lQF1} accentColor="bg-red-800" updateKnockoutMatch={updateKnockoutMatch} />
              </div>
              <div className="flex-1 flex items-center pt-1.5">
                <BracketMatch match={lQF2} accentColor="bg-red-800" updateKnockoutMatch={updateKnockoutMatch} />
              </div>
            </div>

            {/* QF → SF1 connector */}
            <ConnectorQFtoSF side="right" />

            {/* ── SF1 column ── */}
            <div className="flex-1 flex items-center">
              <BracketMatch match={sf1} accentColor="bg-gray-700" updateKnockoutMatch={updateKnockoutMatch} />
            </div>

            {/* SF1 → Final connector */}
            <ConnectorSFtoFinal />

            {/* ── FINAL column ── */}
            <div className="flex-1 flex items-center">
              <BracketMatch match={final} accentColor="bg-gradient-to-r from-red-700 to-red-900" updateKnockoutMatch={updateKnockoutMatch} />
            </div>

            {/* Final → SF2 connector */}
            <ConnectorSFtoFinal />

            {/* ── SF2 column ── */}
            <div className="flex-1 flex items-center">
              <BracketMatch match={sf2} accentColor="bg-gray-700" updateKnockoutMatch={updateKnockoutMatch} />
            </div>

            {/* SF2 → QF connector */}
            <ConnectorQFtoSF side="left" />

            {/* ── RIGHT QFs column ── */}
            <div className="flex-1 flex flex-col">
              <div className="flex-1 flex items-center pb-1.5">
                <BracketMatch match={rQF1} accentColor="bg-red-800" updateKnockoutMatch={updateKnockoutMatch} />
              </div>
              <div className="flex-1 flex items-center pt-1.5">
                <BracketMatch match={rQF2} accentColor="bg-red-800" updateKnockoutMatch={updateKnockoutMatch} />
              </div>
            </div>

          </div>{/* end bracket row */}

          {/* ── THIRD PLACE ── */}
          <div className="flex justify-center mt-8">
            <div className="flex flex-col items-center gap-2" style={{ width: 'calc(20% - 16px)' }}>
              <div className="flex items-center gap-1.5 text-xs text-amber-400 font-bold uppercase tracking-wider">
                <Medal className="w-3.5 h-3.5" /> 3er Puesto
              </div>
              <BracketMatch match={thirdPlace} accentColor="bg-amber-800" updateKnockoutMatch={updateKnockoutMatch} />
            </div>
          </div>

        </div>
      </div>

      {/* Legend */}
      <div className="text-center text-xs text-gray-500 flex items-center justify-center gap-2">
        <span className="w-2.5 h-2.5 rounded-full bg-red-500 inline-block" />
        Equipo ganador
      </div>
    </div>
  );
}

