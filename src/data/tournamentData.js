// ──────────────────────────────────────────────
// Datos iniciales del Torneo de Futsal
// ──────────────────────────────────────────────

export const GROUPS = {
  A: ['Química y Farmacia', 'Psicología', 'Derecho'],
  B: ['Ing Civil Química', 'Publicidad', 'Ing Control de Gestión'],
  C: ['Administración Pública', 'Enfermería', 'Ing Comercial'],
  D: ['Kinesiología', 'Ing Civil Informática', 'Periodismo'],
};

// Abreviaciones para mostrar en espacios reducidos
export const TEAM_SHORT = {
  'Química y Farmacia': 'QyF',
  'Psicología': 'PSI',
  'Derecho': 'DER',
  'Ing Civil Química': 'ICQ',
  'Publicidad': 'PUB',
  'Ing Control de Gestión': 'ICG',
  'Administración Pública': 'ADP',
  'Enfermería': 'ENF',
  'Ing Comercial': 'ICO',
  'Kinesiología': 'KIN',
  'Ing Civil Informática': 'ICI',
  'Periodismo': 'PER',
};

// Colores por grupo (dark theme)
export const GROUP_COLORS = {
  A: { bg: 'bg-red-950/30', border: 'border-red-800/40', text: 'text-red-400', badge: 'bg-red-900/50 text-red-300', header: 'bg-red-800' },
  B: { bg: 'bg-amber-950/30', border: 'border-amber-800/40', text: 'text-amber-400', badge: 'bg-amber-900/50 text-amber-300', header: 'bg-amber-800' },
  C: { bg: 'bg-sky-950/30', border: 'border-sky-800/40', text: 'text-sky-400', badge: 'bg-sky-900/50 text-sky-300', header: 'bg-sky-800' },
  D: { bg: 'bg-violet-950/30', border: 'border-violet-800/40', text: 'text-violet-400', badge: 'bg-violet-900/50 text-violet-300', header: 'bg-violet-800' },
};

// Fixture de la fase de grupos
// homeScore / awayScore = null → partido pendiente
export const INITIAL_GROUP_MATCHES = [
  // Fecha 1 — Miércoles 26 Ago
  { id: 1,  date: 'Miércoles 26 Ago', time: '12:00', group: 'A', home: 'Química y Farmacia',    away: 'Psicología',            homeScore: 4,    awayScore: 3    },
  { id: 2,  date: 'Miércoles 26 Ago', time: '13:00', group: 'C', home: 'Administración Pública', away: 'Enfermería',            homeScore: 7,    awayScore: 3    },
  // Fecha 2 — Viernes 28 Ago
  { id: 3,  date: 'Viernes 28 Ago',   time: '12:00', group: 'B', home: 'Ing Civil Química',      away: 'Publicidad',            homeScore: 3,    awayScore: 3    },
  { id: 4,  date: 'Viernes 28 Ago',   time: '13:00', group: 'D', home: 'Kinesiología',           away: 'Ing Civil Informática', homeScore: 5,    awayScore: 1    },
  // Fecha 3 — Miércoles 02 Sep
  { id: 5,  date: 'Miércoles 02 Sep', time: '12:00', group: 'B', home: 'Ing Control de Gestión', away: 'Ing Civil Química',     homeScore: 5,    awayScore: 3    },
  { id: 6,  date: 'Miércoles 02 Sep', time: '13:00', group: 'D', home: 'Kinesiología',           away: 'Periodismo',            homeScore: 9,    awayScore: 0    },
  // Fecha 4 — Viernes 04 Sep
  { id: 7,  date: 'Viernes 04 Sep',   time: '12:00', group: 'A', home: 'Psicología',             away: 'Derecho',               homeScore: null, awayScore: null },
  { id: 8,  date: 'Viernes 04 Sep',   time: '13:00', group: 'C', home: 'Enfermería',             away: 'Ing Comercial',         homeScore: null, awayScore: null },
  // Fecha 5 — Miércoles 09 Sep
  { id: 9,  date: 'Miércoles 09 Sep', time: '12:00', group: 'A', home: 'Derecho',                away: 'Química y Farmacia',    homeScore: null, awayScore: null },
  { id: 10, date: 'Miércoles 09 Sep', time: '13:00', group: 'C', home: 'Ing Comercial',          away: 'Administración Pública',homeScore: null, awayScore: null },
  // Fecha 6 — Viernes 11 Sep
  { id: 11, date: 'Viernes 11 Sep',   time: '12:00', group: 'B', home: 'Publicidad',             away: 'Ing Control de Gestión',homeScore: null, awayScore: null },
  { id: 12, date: 'Viernes 11 Sep',   time: '13:00', group: 'D', home: 'Ing Civil Informática',  away: 'Periodismo',            homeScore: null, awayScore: null },
];

// Estructura de cruces eliminatorios
export const KNOCKOUT_STRUCTURE = {
  quarterFinals: [
    { id: 'QF1', label: 'QF1', date: 'Miércoles 23 Sep', time: '12:00', homeSeed: '1A', awaySeed: '2B', home: null, away: null, homeScore: null, awayScore: null, homePen: null, awayPen: null },
    { id: 'QF2', label: 'QF2', date: 'Miércoles 23 Sep', time: '13:00', homeSeed: '1C', awaySeed: '2D', home: null, away: null, homeScore: null, awayScore: null, homePen: null, awayPen: null },
    { id: 'QF3', label: 'QF3', date: 'Viernes 25 Sep',   time: '12:00', homeSeed: '1B', awaySeed: '2A', home: null, away: null, homeScore: null, awayScore: null, homePen: null, awayPen: null },
    { id: 'QF4', label: 'QF4', date: 'Viernes 25 Sep',   time: '13:00', homeSeed: '1D', awaySeed: '2C', home: null, away: null, homeScore: null, awayScore: null, homePen: null, awayPen: null },
  ],
  semiFinals: [
    { id: 'SF1', label: 'SF1', date: 'Miércoles 30 Sep', time: '12:00', homeFrom: 'QF1', awayFrom: 'QF2', home: null, away: null, homeScore: null, awayScore: null, homePen: null, awayPen: null },
    { id: 'SF2', label: 'SF2', date: 'Miércoles 30 Sep', time: '13:00', homeFrom: 'QF3', awayFrom: 'QF4', home: null, away: null, homeScore: null, awayScore: null, homePen: null, awayPen: null },
  ],
  thirdPlace: { id: '3RD', label: '3er Puesto', date: 'Viernes 02 Oct', time: '12:00', homeFrom: 'SF1-loser', awayFrom: 'SF2-loser', home: null, away: null, homeScore: null, awayScore: null, homePen: null, awayPen: null },
  final:      { id: 'FINAL', label: 'Gran Final', date: 'Viernes 02 Oct', time: '13:00', homeFrom: 'SF1', awayFrom: 'SF2', home: null, away: null, homeScore: null, awayScore: null, homePen: null, awayPen: null },
};
