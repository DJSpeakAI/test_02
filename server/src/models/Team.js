const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema({
  team: { type: String, required: true },
  matches: { type: Number, default: 0 },
  wins: { type: Number, default: 0 },
  draws: { type: Number, default: 0 },
  losses: { type: Number, default: 0 },
  goalsFor: { type: Number, default: 0 },
  goalsAgainst: { type: Number, default: 0 },
  points: { type: Number, default: 0 },
  season: { type: String, required: true },
  league: { type: String, required: true },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Team', teamSchema);