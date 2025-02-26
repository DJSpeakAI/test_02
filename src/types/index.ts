export interface Team {
  id: number;
  name: string;
  team: string;
  league: string;
  season: string;
  points: number;
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
  position: string;
  goals: number;
  assists: number;
}

export interface Odd {
  id: number;
  homeTeam: string;
  awayTeam: string;
  league: string;
  date: string;
  homeOdds: number;
  drawOdds: number;
  awayOdds: number;
  confidence: number;
}

export interface LeagueStat {
  id: number;
  league: string;
  type: string;
  value: number;
}