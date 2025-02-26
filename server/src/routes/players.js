const express = require('express');
const router = express.Router();
const Player = require('../models/Player');

// 获取所有球员数据
router.get('/', async (req, res) => {
  try {
    const { league, season, team, position } = req.query;
    const query = {};
    
    if (league) query.league = league;
    if (season) query.season = season;
    if (team) query.team = team;
    if (position) query.position = position;

    const players = await Player.find(query).sort({ goals: -1, assists: -1 });
    res.json(players);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 获取射手榜数据
router.get('/top-scorers', async (req, res) => {
  try {
    const { league, season, limit = 10 } = req.query;
    const players = await Player.find({ league, season })
      .sort({ goals: -1 })
      .limit(Number(limit));

    const scorersData = players.map(player => ({
      name: player.name,
      team: player.team,
      goals: player.goals,
      matches: player.matches
    }));

    res.json(scorersData);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 获取助攻榜数据
router.get('/top-assists', async (req, res) => {
  try {
    const { league, season, limit = 10 } = req.query;
    const players = await Player.find({ league, season })
      .sort({ assists: -1 })
      .limit(Number(limit));

    const assistsData = players.map(player => ({
      name: player.name,
      team: player.team,
      assists: player.assists,
      matches: player.matches
    }));

    res.json(assistsData);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;