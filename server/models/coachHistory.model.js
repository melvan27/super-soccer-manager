const mongoose = require("mongoose");

const coachHistorySchema = new mongoose.Schema({
  team: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Team', // Reference to the Team model
    required: true,
  },
  coach: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Coach', // Reference to the Coach model
    required: true,
  },
  position: String,
  fromDate: Date,
  toDate: Date,
  winCount: {
    type: Number,
    default: 0,
  },
  lossCount: {
    type: Number,
    default: 0,
  },
  drawCount: {
    type: Number,
    default: 0,
  },
  competitionsWon: [{
    competitionName: String,
    seasonWon: String, // e.g., "2023-24"
    managingTeam: {
      type: Schema.Types.ObjectId,
      ref: 'Team', // Reference to the Team model
    },
  }],
  individualAwards: [{
    awardName: String,
    season: String, // e.g., "2023-24"
  }],
  // Other historical data can be added here
  // Example: performance metrics, etc.
});

const CoachHistory = mongoose.model("CoachHistory", coachHistorySchema);
module.exports = CoachHistory;