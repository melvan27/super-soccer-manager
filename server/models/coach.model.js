const mongoose = require("mongoose");
const Team = require("./team.model")

const CoachSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "First name is required"],
    },
    lastName: {
      type: String,
      required: [true, "Last name is required"],
    },
    age: {
      type: Number,
      required: [true, "Age is required"],
    },
    placeOfBirth: {
      type: String,
      required: [true, "Place of birth is required"],
    },
    dateOfBirth: {
      type: Date,
      required: [true, "Date of birth is required"],
    },
    coachingMentality: {
      type: String,
      enum: ["very defensive", "defensive", "balanced", "attacking", "very attacking"],
      required: [true, "Please select a coaching mentality"],
    },
    preferredPosition: {
      type: String,
      enum: ["manager", "assistant manager", "training manager", "head scout"],
      required: [true, "Please select a coaching position"],
    },
    position: {
      type: String,
      enum: ["manager", "assistant manager", "training manager", "head scout"],
    },
    attacking: {
      type: Number,
      default: 10,
      min: 1,
      max: 99,
    },
    defending: {
      type: Number,
      default: 10,
      min: 1,
      max: 99,
    },
    training: {
      type: Number,
      default: 10,
      min: 1,
      max: 99,
    },
    scouting: {
      type: Number,
      default: 10,
      min: 1,
      max: 99,
    },
    tactics: {
      type: Number,
      default: 10,
      min: 1,
      max: 99,
    },
    persuasion: {
      type: Number,
      default: 10,
      min: 1,
      max: 99,
    },
    reputation: {
      type: Number,
      default: 1,
      min: 1,
      max: 99,
    },
    team: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Team",
    },
  },
  { timestamps: true }
);

const Coach = mongoose.model("Coach", CoachSchema);

module.exports = Coach;