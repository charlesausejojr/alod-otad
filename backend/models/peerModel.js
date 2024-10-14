// models/peer.js

const mongoose = require('mongoose');

// Define Peer schema
const peerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  wins: { type: Number, required: true },
  losses: { type: Number, required: true },
  winRate: { type: Number, required: true, default: 0 },
});

// Pre-save hook to calculate the win rate
peerSchema.pre('save', function (next) {
  const totalGames = this.wins + this.losses;
  this.winRate = totalGames > 0 ? (this.wins / totalGames) * 100 : 0;
  next();
});

const Peer = mongoose.model('Peer', peerSchema);

module.exports = Peer;
