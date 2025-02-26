const express = require('express');
const router = express.Router();
const Odds = require('../models/Odds');

// 获取所有赔率数据
router.get('/', async (req, res) => {
  try {
    const { league, date } = req.query;
    const query = {};
    
    if (league) query.league = league;
    if (date) {
      const startDate = new Date(date);
      const endDate = new Date(startDate);
      endDate.setDate(endDate.getDate() + 1);
      query.matchDate = { $gte: startDate, $lt: endDate };
    }

    const odds = await Odds.find(query)
      .sort({ matchDate: 1 })
      .limit(20);
    res.json(odds);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 获取高置信度预测
router.get('/high-confidence', async (req, res) => {
  try {
    const { league, minConfidence = 70 } = req.query;
    const query = {
      confidence: { $gte: Number(minConfidence) }
    };
    
    if (league) query.league = league;

    const predictions = await Odds.find(query)
      .sort({ confidence: -1, matchDate: 1 })
      .limit(10);

    res.json(predictions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 获取联赛赔率统计
router.get('/league-stats', async (req, res) => {
  try {
    const { league } = req.query;
    const query = league ? { league } : {};

    const stats = await Odds.aggregate([
      { $match: query },
      { $group: {
        _id: '$league',
        totalMatches: { $sum: 1 },
        avgHomeWin: { $avg: '$homeWin' },
        avgDraw: { $avg: '$draw' },
        avgAwayWin: { $avg: '$awayWin' },
        homeWinCount: {
          $sum: { $cond: [{ $eq: ['$predictedResult', '主胜'] }, 1, 0] }
        },
        drawCount: {
          $sum: { $cond: [{ $eq: ['$predictedResult', '平局'] }, 1, 0] }
        },
        awayWinCount: {
          $sum: { $cond: [{ $eq: ['$predictedResult', '客胜'] }, 1, 0] }
        }
      }},
      { $project: {
        league: '$_id',
        totalMatches: 1,
        avgHomeWin: { $round: ['$avgHomeWin', 2] },
        avgDraw: { $round: ['$avgDraw', 2] },
        avgAwayWin: { $round: ['$avgAwayWin', 2] },
        homeWinPercentage: {
          $round: [{ $multiply: [{ $divide: ['$homeWinCount', '$totalMatches'] }, 100] }, 1]
        },
        drawPercentage: {
          $round: [{ $multiply: [{ $divide: ['$drawCount', '$totalMatches'] }, 100] }, 1]
        },
        awayWinPercentage: {
          $round: [{ $multiply: [{ $divide: ['$awayWinCount', '$totalMatches'] }, 100] }, 1]
        }
      }}
    ]);

    res.json(stats);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;