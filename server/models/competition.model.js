const mongoose = require("mongoose");

const CompetitionSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    country: {
      type: String,
      required: [true, "Country is required"],
    },
    yearFounded: {
      type: Number,
    },
    confederation: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Confederation",
    },
    teams: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Team",
    }],
  },
  { timestamps: true }
);

const Competition = mongoose.model("Competition", CompetitionSchema);

module.exports = Competition;