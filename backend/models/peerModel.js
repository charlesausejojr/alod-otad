import mongoose from "mongoose";

// Define Peer schema
const peerSchema = new mongoose.Schema({
  steamId : {type: Number, required:  true},
  name: { type: String, required: true },
  wins: { type: Number, required: true },
  losses: { type: Number, required: true },
  winRate: { type: Number, required: true, default: 0 },
  img: {
    type: String, // Image URL or path
    required: false, // Optional field
  },
});

// Pre-save hook to calculate the win rate
peerSchema.pre('save', function (next) {
  const totalGames = this.wins + this.losses;
  const percentage = parseFloat((this.wins / totalGames) * 100).toFixed(2);
  this.winRate = totalGames > 0 ? percentage : 0;
  // this.winRate = parseFloat(winRate.toFixed(2)); // Fix to 2 decimal places
  next();
});

const Peer = mongoose.model('Peer', peerSchema);

export default Peer;
