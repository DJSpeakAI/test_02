import { teams, players, odds, leagueStats } from '../data/mockData';
import { Team, Player, Odd } from '../types';

const mockResponse = <T>(data: T): Promise<{ data: T }> => {
  try {
    return Promise.resolve({ data });
  } catch (error) {
    return Promise.reject(new Error('数据处理失败'));
  }
};

export const getTeams = (params?: { league?: string; season?: string }) => {
  try {
    const filteredTeams = teams.filter((team: Team) => {
      const leagueMatch = !params?.league || team.league === params.league;
      const seasonMatch = !params?.season || team.season === params.season;
      return leagueMatch && seasonMatch;
    });
    return mockResponse(filteredTeams);
  } catch (error) {
    return Promise.reject(new Error('获取球队数据失败'));
  }
};

export const getTeamPointsTrend = (params?: { league?: string; season?: string }) => {
  const filteredTeams = teams
    .filter((team: Team) => {
      if (params?.league && team.league !== params.league) return false;
      if (params?.season && team.season !== params.season) return false;
      return true;
    })
    .sort((a: Team, b: Team) => b.points - a.points)
    .slice(0, 5)
    .map((team: Team) => ({
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
    .filter((team: Team) => {
      if (params?.league && team.league !== params.league) return false;
      if (params?.season && team.season !== params.season) return false;
      return true;
    })
    .map((team: Team) => ({
      team: team.team,
      goalsFor: team.goalsFor,
      goalsAgainst: team.goalsAgainst,
      goalDifference: team.goalsFor - team.goalsAgainst
    }));
  return mockResponse(filteredTeams);
};

// 球员相关接口
export const getPlayers = (params?: { team?: string; position?: string }) => {
  try {
    const filteredPlayers = players.filter(player => {
      const teamMatch = !params?.team || player.team === params.team;
      const positionMatch = !params?.position || player.position === params.position;
      return teamMatch && positionMatch;
    });
    return mockResponse(filteredPlayers);
  } catch (error) {
    return Promise.reject(new Error('获取球员数据失败'));
  }
};

export const getTopScorers = (params?: { limit?: number }) => {
  try {
    const filteredPlayers = players
      .sort((a, b) => b.goals - a.goals)
      .slice(0, params?.limit || 10);
    return mockResponse(filteredPlayers);
  } catch (error) {
    return Promise.reject(new Error('获取射手榜数据失败'));
  }
};

export const getTopAssists = (params?: { limit?: number }) => {
  try {
    const filteredPlayers = players
      .sort((a: Player, b: Player) => b.assists - a.assists)
      .slice(0, params?.limit || 10);
    return mockResponse(filteredPlayers);
  } catch (error) {
    return Promise.reject(new Error('获取助攻榜数据失败'));
  }
};

// 赔率相关接口
export const getOdds = (params?: { league?: string; date?: string }) => {
  try {
    const filteredOdds = odds.filter((odd: Odd) => {
      const leagueMatch = !params?.league || odd.league === params.league;
      const dateMatch = !params?.date || new Date(odd.date).toISOString().split('T')[0] === params.date;
      return leagueMatch && dateMatch;
    });
    return mockResponse(filteredOdds);
  } catch (error) {
    return Promise.reject(new Error('获取赔率数据失败'));
  }
};

export const getHighConfidenceOdds = (params?: { league?: string; minConfidence?: number }) => {
  const filteredOdds = odds
    .filter((odd: Odd) => {
      if (params?.league && odd.league !== params.league) return false;
      if (params?.minConfidence && odd.confidence < params.minConfidence) return false;
      return true;
    })
    .sort((a: Odd, b: Odd) => b.confidence - a.confidence)
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