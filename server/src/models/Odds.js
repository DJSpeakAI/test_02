const mongoose = require('mongoose');

const oddsSchema = new mongoose.Schema({
  match: { type: String, required: true },
  league: { type: String, required: true },
  homeTeam: { type: String, required: true },
  awayTeam: { type: String, required: true },
  homeWin: { type: Number, required: true },
  draw: { type: Number, required: true },
  awayWin: { type: Number, required: true },
  predictedResult: { type: String, required: true },
  confidence: { type: Number, required: true },
  matchDate: { type: Date, required: true },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Odds', oddsSchema);