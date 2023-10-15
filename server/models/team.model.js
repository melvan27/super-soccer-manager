const mongoose = require("mongoose");
const Player = require("./player.model");

const financesSchema = new mongoose.Schema({
  balance: Number,
  transferBudget: Number,
  totalWeeklyWages: Number,
});

const TeamSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    country: {
      type: String,
      required: [true, "Country is required"],
    },
    city: {
      type: String,
    },
    stadium: {
      type: String,
      required: [true, "Stadium is required"],
    },
    yearFounded: {
      type: Number,
    },
    finances: financesSchema,
    competition: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Competition",
    },
    manager: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Coach",
    },
    squad: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Player",
    }],
  },
  { timestamps: true }
);

const Team = mongoose.model("Team", TeamSchema);

module.exports = Team;