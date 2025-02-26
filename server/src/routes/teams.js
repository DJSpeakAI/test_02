const express = require('express');
const router = express.Router();
const Team = require('../models/Team');

// 获取所有球队数据
router.get('/', async (req, res) => {
  try {
    const { league, season } = req.query;
    const query = {};
    
    if (league) query.league = league;
    if (season) query.season = season;

    const teams = await Team.find(query).sort({ points: -1 });
    res.json(teams);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 获取球队积分趋势数据
router.get('/points-trend', async (req, res) => {
  try {
    const { league, season } = req.query;
    const teams = await Team.find({ league, season })
      .sort({ points: -1 })
      .limit(5);

    const trendsData = teams.map(team => ({
      name: team.team,
      value: team.points,
      wins: team.wins,
      draws: team.draws,
      losses: team.losses
    }));

    res.json(trendsData);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 获取进球数据统计
router.get('/goals-stats', async (req, res) => {
  try {
    const { league, season } = req.query;
    const teams = await Team.find({ league, season })
      .sort({ goalsFor: -1 });

    const goalsData = teams.map(team => ({
      team: team.team,
      goalsFor: team.goalsFor,
      goalsAgainst: team.goalsAgainst,
      goalDifference: team.goalsFor - team.goalsAgainst
    }));

    res.json(goalsData);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;