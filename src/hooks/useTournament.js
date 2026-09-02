import { useState, useCallback, useMemo } from 'react';
import {
  GROUPS,
  INITIAL_GROUP_MATCHES,
  KNOCKOUT_STRUCTURE,
} from '../data/tournamentData';

const STORAGE_KEY = 'futsal-torneo-data-v2';

// Deep-clone utility
function deepClone(obj) {
  return JSON.parse(JSON.stringify(obj));
}

// Build initial state from tournament data
function buildInitialState() {
  return {
    groupMatches: deepClone(INITIAL_GROUP_MATCHES),
    knockout: deepClone(KNOCKOUT_STRUCTURE),
  };
}

// Load from localStorage or fall back to initial state
function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch { /* ignore */ }
  return buildInitialState();
}

// Save state
function saveState(state) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch { /* ignore */ }
}

// ─── Standings computation ──────────────────────────
function computeStandings(groupMatches) {
  const standings = {};

  // Initialize all teams
  for (const [group, teams] of Object.entries(GROUPS)) {
    standings[group] = teams.map((team) => ({
      team,
      pj: 0, pg: 0, pe: 0, pp: 0,
      gf: 0, gc: 0, dif: 0, pts: 0,
    }));
  }

  // Process played matches
  for (const match of groupMatches) {
    if (match.homeScore === null || match.awayScore === null) continue;

    const group = standings[match.group];
    const homeEntry = group.find((t) => t.team === match.home);
    const awayEntry = group.find((t) => t.team === match.away);
    if (!homeEntry || !awayEntry) continue;

    const hs = Number(match.homeScore);
    const as = Number(match.awayScore);

    homeEntry.pj++;
    awayEntry.pj++;
    homeEntry.gf += hs;
    homeEntry.gc += as;
    awayEntry.gf += as;
    awayEntry.gc += hs;

    if (hs > as) {
      homeEntry.pg++;
      homeEntry.pts += 3;
      awayEntry.pp++;
    } else if (hs < as) {
      awayEntry.pg++;
      awayEntry.pts += 3;
      homeEntry.pp++;
    } else {
      homeEntry.pe++;
      awayEntry.pe++;
      homeEntry.pts += 1;
      awayEntry.pts += 1;
    }
  }

  // Compute diff and sort
  for (const group of Object.keys(standings)) {
    standings[group].forEach((t) => { t.dif = t.gf - t.gc; });
    standings[group].sort((a, b) => {
      if (b.pts !== a.pts) return b.pts - a.pts;
      if (b.dif !== a.dif) return b.dif - a.dif;
      if (b.gf !== a.gf) return b.gf - a.gf;
      return a.team.localeCompare(b.team);
    });
  }

  return standings;
}

// ─── Determine winner of a knockout match ─────────
function getMatchWinner(match) {
  if (match.homeScore === null || match.awayScore === null) return null;
  const hs = Number(match.homeScore);
  const as = Number(match.awayScore);
  if (hs > as) return match.home;
  if (as > hs) return match.away;
  // Tie → check penalties
  if (match.homePen !== null && match.awayPen !== null) {
    const hp = Number(match.homePen);
    const ap = Number(match.awayPen);
    if (hp > ap) return match.home;
    if (ap > hp) return match.away;
  }
  return null; // Still tied / no penalties entered
}

function getMatchLoser(match) {
  const winner = getMatchWinner(match);
  if (!winner) return null;
  return winner === match.home ? match.away : match.home;
}

// ─── useTournament Hook ─────────────────────────────
export default function useTournament() {
  const [state, setState] = useState(loadState);

  // Persist on every change
  const updateState = useCallback((newState) => {
    setState(newState);
    saveState(newState);
  }, []);

  // ── Update group match result ──
  const updateGroupMatch = useCallback((matchId, homeScore, awayScore) => {
    setState((prev) => {
      const next = deepClone(prev);
      const match = next.groupMatches.find((m) => m.id === matchId);
      if (match) {
        match.homeScore = homeScore === '' ? null : Number(homeScore);
        match.awayScore = awayScore === '' ? null : Number(awayScore);
      }
      saveState(next);
      return next;
    });
  }, []);

  // ── Update knockout match result ──
  const updateKnockoutMatch = useCallback((matchId, field, value) => {
    setState((prev) => {
      const next = deepClone(prev);
      const ko = next.knockout;

      // Find the match in any round
      let match = null;
      for (const qf of ko.quarterFinals) { if (qf.id === matchId) { match = qf; break; } }
      if (!match) for (const sf of ko.semiFinals) { if (sf.id === matchId) { match = sf; break; } }
      if (!match && ko.thirdPlace.id === matchId) match = ko.thirdPlace;
      if (!match && ko.final.id === matchId) match = ko.final;

      if (match) {
        match[field] = value === '' ? null : Number(value);
      }

      saveState(next);
      return next;
    });
  }, []);

  // ── Computed standings ──
  const standings = useMemo(() => computeStandings(state.groupMatches), [state.groupMatches]);

  // ── Qualified teams map: { '1A': teamName, '2A': teamName, ... } ──
  const qualified = useMemo(() => {
    const q = {};
    for (const [group, rows] of Object.entries(standings)) {
      if (rows[0]) q[`1${group}`] = rows[0].team;
      if (rows[1]) q[`2${group}`] = rows[1].team;
    }
    return q;
  }, [standings]);

  // ── Populate knockout bracket with qualified teams & propagate winners ──
  const knockout = useMemo(() => {
    const ko = deepClone(state.knockout);

    // Populate QF teams from group standings
    for (const qf of ko.quarterFinals) {
      qf.home = qualified[qf.homeSeed] || null;
      qf.away = qualified[qf.awaySeed] || null;
    }

    // Populate SF from QF winners
    const qfMap = {};
    for (const qf of ko.quarterFinals) {
      qfMap[qf.id] = qf;
    }

    for (const sf of ko.semiFinals) {
      const qfHome = qfMap[sf.homeFrom];
      const qfAway = qfMap[sf.awayFrom];
      sf.home = qfHome ? getMatchWinner(qfHome) : null;
      sf.away = qfAway ? getMatchWinner(qfAway) : null;
    }

    // Populate Final from SF winners
    const sfMap = {};
    for (const sf of ko.semiFinals) {
      sfMap[sf.id] = sf;
    }

    ko.final.home = sfMap['SF1'] ? getMatchWinner(sfMap['SF1']) : null;
    ko.final.away = sfMap['SF2'] ? getMatchWinner(sfMap['SF2']) : null;

    // Populate 3rd Place from SF losers
    ko.thirdPlace.home = sfMap['SF1'] ? getMatchLoser(sfMap['SF1']) : null;
    ko.thirdPlace.away = sfMap['SF2'] ? getMatchLoser(sfMap['SF2']) : null;

    return ko;
  }, [state.knockout, qualified]);

  // ── Champion ──
  const champion = useMemo(() => getMatchWinner(knockout.final), [knockout]);

  // ── Reset tournament ──
  const resetTournament = useCallback(() => {
    const initial = buildInitialState();
    updateState(initial);
  }, [updateState]);

  return {
    groupMatches: state.groupMatches,
    standings,
    qualified,
    knockout,
    champion,
    updateGroupMatch,
    updateKnockoutMatch,
    resetTournament,
  };
}
