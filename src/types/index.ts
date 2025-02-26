export interface Team {
  id: number;
  name: string;
  points: number;
  rank: number;
  form: string[];
  league: string;
  season: string;
  team: string;
  wins: number;
  draws: number;
  losses: number;
  goalsFor: number;
  goalsAgainst: number;
}

export interface Player {
  id: number;
  name: string;
  team: string;
  goals: number;
  assists: number;
  position: string;
}

export interface Odd {
  id: number;
  homeTeam: string;
  awayTeam: string;
  homeOdds: number;
  drawOdds: number;
  awayOdds: number;
  confidence: number;
  date: string;
}

export interface LeagueStat {
  id: number;
  type: string;
  value: number;
  team: string;
}