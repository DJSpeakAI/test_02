import { teams, players, odds, leagueStats } from '../data/mockData';

// 模拟API响应
const mockResponse = (data: any) => {
  return Promise.resolve({ data });
};

// 球队相关接口
export const getTeams = (params?: { league?: string; season?: string }) => {
  const filteredTeams = teams.filter(team => {
    if (params?.league && team.league !== params.league) return false;
    if (params?.season && team.season !== params.season) return false;
    return true;
  });
  return mockResponse(filteredTeams);
};

export const getTeamPointsTrend = (params?: { league?: string; season?: string }) => {
  const filteredTeams = teams
    .filter(team => {
      if (params?.league && team.league !== params.league) return false;
      if (params?.season && team.season !== params.season) return false;
      return true;
    })
    .sort((a, b) => b.points - a.points)
    .slice(0, 5)
    .map(team => ({
      name: team.team,
      value: team.points,
      wins: team.wins,
      draws: team.draws,
      losses: team.losses
    }));
  return mockResponse(filteredTeams);
};

export const getTeamGoalsStats = (params?: { league?: string; season?: string }) => {
  const filteredTeams = teams
    .filter(team => {
      if (params?.league && team.league !== params.league) return false;
      if (params?.season && team.season !== params.season) return false;
      return true;
    })
    .map(team => ({
      team: team.team,
      goalsFor: team.goalsFor,
      goalsAgainst: team.goalsAgainst,
      goalDifference: team.goalsFor - team.goalsAgainst
    }));
  return mockResponse(filteredTeams);
};

// 球员相关接口
export const getPlayers = (params?: { league?: string; season?: string; team?: string; position?: string }) => {
  const filteredPlayers = players.filter(player => {
    if (params?.league && player.league !== params.league) return false;
    if (params?.season && player.season !== params.season) return false;
    if (params?.team && player.team !== params.team) return false;
    if (params?.position && player.position !== params.position) return false;
    return true;
  });
  return mockResponse(filteredPlayers);
};

export const getTopScorers = (params?: { league?: string; season?: string; limit?: number }) => {
  const filteredPlayers = players
    .filter(player => {
      if (params?.league && player.league !== params.league) return false;
      if (params?.season && player.season !== params.season) return false;
      return true;
    })
    .sort((a, b) => b.goals - a.goals)
    .slice(0, params?.limit || 10);
  return mockResponse(filteredPlayers);
};

export const getTopAssists = (params?: { league?: string; season?: string; limit?: number }) => {
  const filteredPlayers = players
    .filter(player => {
      if (params?.league && player.league !== params.league) return false;
      if (params?.season && player.season !== params.season) return false;
      return true;
    })
    .sort((a, b) => b.assists - a.assists)
    .slice(0, params?.limit || 10);
  return mockResponse(filteredPlayers);
};

// 赔率相关接口
export const getOdds = (params?: { league?: string; date?: string }) => {
  const filteredOdds = odds.filter(odd => {
    if (params?.league && odd.league !== params.league) return false;
    if (params?.date) {
      const matchDate = new Date(odd.matchDate).toISOString().split('T')[0];
      if (matchDate !== params.date) return false;
    }
    return true;
  });
  return mockResponse(filteredOdds);
};

export const getHighConfidenceOdds = (params?: { league?: string; minConfidence?: number }) => {
  const filteredOdds = odds
    .filter(odd => {
      if (params?.league && odd.league !== params.league) return false;
      if (params?.minConfidence && odd.confidence < params.minConfidence) return false;
      return true;
    })
    .sort((a, b) => b.confidence - a.confidence)
    .slice(0, 10);
  return mockResponse(filteredOdds);
};

export const getLeagueOddsStats = (params?: { league?: string }) => {
  const filteredStats = leagueStats.filter(stat => {
    if (params?.league && stat.league !== params.league) return false;
    return true;
  });
  return mockResponse(filteredStats);
};