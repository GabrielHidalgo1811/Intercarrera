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

// Apodos / Nombres de fantasía de los equipos
export const TEAM_NICKNAMES = {
  'Enfermería': 'Sanapotito',
  'Kinesiología': 'Masaje con final triste FC',
  'Administración Pública': 'Corrutos FC',
  'Publicidad': 'Amarillo y Weko FC',
  'Química y Farmacia': 'Real Farmacia',
  'Ing Civil Química': 'La Habana',
  'Ing Control de Gestión': 'Ingenieros en control de balón',
  'Psicología': 'Psiquiátrico Saint Germain',
  'Ing Civil Informática': 'Los Pythones',
  'Ing Comercial': 'Apalancados FC',
  'Periodismo': 'Periodismo FC',
  'Derecho': 'Plantel por confirmar',
};

// Planteles y registro de goleadores
export const PLAYERS_DATA = {
  'Enfermería': [
    { name: 'Alonso Brito', goals: 0 },
    { name: 'Benjamin Martínez', goals: 2 },
    { name: 'Benjamín González', goals: 2 },
    { name: 'Danae Madariaga', goals: 0 },
    { name: 'Diego Vergara', goals: 0 },
    { name: 'Fabian Castillo', goals: 0 },
    { name: 'Johan Araya', goals: 0 },
    { name: 'Josefa Rubio', goals: 0 },
    { name: 'Matias Lizana', goals: 0 },
  ],
  'Kinesiología': [
    { name: 'Exequiel Cerda', goals: 4 },
    { name: 'Carlos Urbano', goals: 3 },
    { name: 'Andrés Castañeda', goals: 2 },
    { name: 'Jorge Fuentes León', goals: 2 },
    { name: 'Tomás Díaz', goals: 2 },
    { name: 'Dylan Mahan', goals: 1 },
    { name: 'Alexis Inzunza', goals: 0 },
    { name: 'Benjamín Blaya', goals: 0 },
    { name: 'Maximiliano Aguilar', goals: 0 },
    { name: 'Mario Perez', goals: 0 },
    { name: 'Rodrigo Waall', goals: 0 },
    { name: 'Sebastián Alvial', goals: 0 },
  ],
  'Administración Pública': [
    { name: 'Diego Hazard', goals: 3 },
    { name: 'Javier Valdivia', goals: 1 },
    { name: 'Juan Pablo Miranda', goals: 1 },
    { name: 'Matías Molina', goals: 1 },
    { name: 'Benjamin Barros', goals: 0 },
    { name: 'Benjamin González', goals: 0 },
    { name: 'Cristóbal Cubillos', goals: 0 },
    { name: 'Daniel Simón', goals: 0 },
    { name: 'Flavio Oyarzun', goals: 0 },
    { name: 'Gabriel Villarroel', goals: 0 },
    { name: 'Sofía Fuentes', goals: 0 },
    { name: 'Tomás Gómez', goals: 0 },
  ],
  'Publicidad': [
    { name: 'Ismael Villegas', goals: 1 },
    { name: 'Luis Medina', goals: 1 },
    { name: 'Lukas Espinoza', goals: 1 },
    { name: 'Alonso Lizana', goals: 0 },
    { name: 'Bruno Vargas', goals: 0 },
    { name: 'Cristobal Lloncón', goals: 0 },
    { name: 'Gabriel Jara', goals: 0 },
    { name: 'Julio Ramos', goals: 0 },
    { name: 'Mateo Chavez', goals: 0 },
    { name: 'Natalia Chocano', goals: 0 },
    { name: 'Saray Gárate', goals: 0 },
    { name: 'Vicente Del Campo', goals: 0 },
  ],
  'Química y Farmacia': [
    { name: 'Alonso Molina', goals: 1 },
    { name: 'Diego Mella', goals: 1 },
    { name: 'Edu Mendoza', goals: 1 },
    { name: 'Martín Moraga', goals: 1 },
    { name: 'Antonia Portales', goals: 0 },
    { name: 'Benjamín Ramírez', goals: 0 },
    { name: 'Benjamín Portales', goals: 0 },
    { name: 'Daniel Rubio', goals: 0 },
    { name: 'Felipe Marín', goals: 0 },
    { name: 'Jorge Manque', goals: 0 },
    { name: 'Martin Osorio', goals: 0 },
    { name: 'Tomás Escalante', goals: 0 },
  ],
  'Ing Civil Química': [
    { name: 'Benjamin Moreno', goals: 4 },
    { name: 'Marcelo Vera', goals: 1 },
    { name: 'Vicente Silva', goals: 1 },
    { name: 'Alvaro Seguin Peña', goals: 0 },
    { name: 'Alvaro Gatica', goals: 0 },
    { name: 'Benjamin Ayala', goals: 0 },
    { name: 'Benjamín Góngora', goals: 0 },
    { name: 'Benjamín Toro', goals: 0 },
    { name: 'Ignacio López', goals: 0 },
    { name: 'Matias Ortiz', goals: 0 },
    { name: 'Raúl Vidal', goals: 0 },
    { name: 'Thomas Alarcon', goals: 0 },
  ],
  'Ing Control de Gestión': [
    { name: 'Exequiel Reyes', goals: 2 },
    { name: 'Felipe Pinilla', goals: 2 },
    { name: 'Cristhian Carrion', goals: 1 },
    { name: 'Bastian Barrios', goals: 0 },
    { name: 'Gabriel Parra', goals: 0 },
    { name: 'Javier Rivera', goals: 0 },
    { name: 'Lucas Arjona', goals: 0 },
    { name: 'Manuel Garrido', goals: 0 },
  ],
  'Psicología': [
    { name: 'Mateo Díaz', goals: 1 },
    { name: 'Maximiliano Bascur', goals: 1 },
    { name: 'Vicente Lopez', goals: 1 },
    { name: 'Cristóbal Pérez', goals: 0 },
    { name: 'Felipe Guerrero', goals: 0 },
    { name: 'Franco Riveros', goals: 0 },
    { name: 'Jesús Rubio', goals: 0 },
    { name: 'Jorshua troncoso', goals: 0 },
    { name: 'Martín Miranda', goals: 0 },
    { name: 'Milko Aviles', goals: 0 },
    { name: 'Rodrigo Chacón', goals: 0 },
    { name: 'Sebastián Campos', goals: 0 },
  ],
  'Ing Civil Informática': [
    { name: 'Pablo Jatib', goals: 1 },
    { name: 'Alejandro Del Río', goals: 0 },
    { name: 'Alonso Cornejo', goals: 0 },
    { name: 'Benjamín Contreras', goals: 0 },
    { name: 'Benjamín Osses', goals: 0 },
    { name: 'Diego Mendoza', goals: 0 },
    { name: 'Ignacio Pavez', goals: 0 },
    { name: 'José Lagos', goals: 0 },
    { name: 'Matías Flores', goals: 0 },
    { name: 'Maximiliano Gonzalez', goals: 0 },
    { name: 'Pablo Oteiza', goals: 0 },
    { name: 'Sebastián Herrera', goals: 0 },
  ],
  'Ing Comercial': [
    { name: 'Bryan Rivera', goals: 0 },
    { name: 'Cristobal Rojo', goals: 0 },
    { name: 'Daniel Plaza', goals: 0 },
    { name: 'Francisco padilla', goals: 0 },
    { name: 'Javier correa', goals: 0 },
    { name: 'Jeshua nuñez', goals: 0 },
    { name: 'Luciano sepulveda', goals: 0 },
    { name: 'Matias Ponce', goals: 0 },
    { name: 'Nicolas Fuentes', goals: 0 },
    { name: 'Victor Vergara', goals: 0 },
  ],
  'Periodismo': [
    { name: 'Benjamín Lizana Nicolás Pirquilaf', goals: 0 },
    { name: 'Diego Ignacio Correa Soto', goals: 0 },
    { name: 'Eduardo Domínguez', goals: 0 },
    { name: 'Evian Pavez', goals: 0 },
    { name: 'Fabián Cristóbal Sbarbaro Campos', goals: 0 },
    { name: 'Herser Muñoz', goals: 0 },
    { name: 'Ian Cienfuegos', goals: 0 },
    { name: 'Nicolás Ruiz', goals: 0 },
    { name: 'Pablo Vásquez Alegria', goals: 0 },
    { name: 'Ramón Ávila Diaz', goals: 0 },
    { name: 'Renato Carrizo', goals: 0 },
    { name: 'Víctor Lillo', goals: 0 },
  ],
  'Derecho': [
    // Plantel pendiente de registro por parte de la organización
  ],
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
