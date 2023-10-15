const mongoose = require("mongoose");

const playerSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    birthday: {
      type: Date,
      required: true,
    },
    position: {
      type: String,
      enum: [
        "GK",
        "CB",
        "LB",
        "RB",
        "LWB",
        "RWB",
        "CDM",
        "CM",
        "LM",
        "RM",
        "CAM",
        "LW",
        "RW",
        "LF",
        "RF",
        "CF",
        "ST",
      ],
    },
    secondaryPositions: [{
      type: String,
      enum: [
        "GK",
        "CB",
        "LB",
        "RB",
        "LWB",
        "RWB",
        "CDM",
        "CM",
        "LM",
        "RM",
        "CAM",
        "LW",
        "RW",
        "LF",
        "RF",
        "CF",
        "ST",
      ],
    }],
    favoredFoot: {
      type: String,
      enum: ["Left", "Right", "Both"],
    },
    height: Number,
    weight: Number,
    nationality: String,
    sellValue: Number,
    wages: Number,
    contractEndDate: Date,
    // Reference to the club the player belongs to
    club: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Team",
    },
    nationalTeam: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Team",
    },
    // Player attributes
    attributes: {
      pace: {
        acceleration: {
          type: Number,
          min: 1,
          max: 99,
        },
        sprintSpeed: {
          type: Number,
          min: 1,
          max: 99,
        },
      },
      shooting: {
        // Subsections for shooting attributes (e.g., accuracy, power)
        finishing: {
          type: Number,
          min: 1,
          max: 99,
        },
        longShots: {
          type: Number,
          min: 1,
          max: 99,
        },
        penalties: {
          type: Number,
          min: 1,
          max: 99,
        },
        positioning: {
          type: Number,
          min: 1,
          max: 99,
        },
        shotPower: {
          type: Number,
          min: 1,
          max: 99,
        },
        volleys: {
          type: Number,
          min: 1,
          max: 99,
        },
      },
      passing: {
        // Subsections for passing attributes (e.g., short passing, long passing)
        crossing: {
          type: Number,
          min: 1,
          max: 99,
        },
        curve: {
          type: Number,
          min: 1,
          max: 99,
        },
        freeKickAccuracy: {
          type: Number,
          min: 1,
          max: 99,
        },
        shortPassing: {
          type: Number,
          min: 1,
          max: 99,
        },
        longPassing: {
          type: Number,
          min: 1,
          max: 99,
        },
        vision: {
          type: Number,
          min: 1,
          max: 99,
        },
      },
      dribbling: {
        agility: {
          type: Number,
          min: 1,
          max: 99
        },
        balance: {
          type: Number,
          min: 1,
          max: 99
        },
        reactions: {
          type: Number,
          min: 1,
          max: 99
        },
        ballControl: {
          type: Number,
          min: 1,
          max: 99
        },
        dribbling: {
          type: Number,
          min: 1,
          max: 99
        },
        composure: {
          type: Number,
          min: 1,
          max: 99
        },
      },
      defending: {
        interceptions: {
          type: Number,
          min: 1,
          max: 99
        },
        headingAccuracy: {
          type: Number,
          min: 1,
          max: 99
        },
        defensiveAwareness: {
          type: Number,
          min: 1,
          max: 99
        },
        standingTackle: {
          type: Number,
          min: 1,
          max: 99
        },
        slidingTackle: {
          type: Number,
          min: 1,
          max: 99
        },
      },
      physicality: {
        jumping: {
          type: Number,
          min: 1,
          max: 99
        },
        stamina: {
          type: Number,
          min: 1,
          max: 99
        },
        strength: {
          type: Number,
          min: 1,
          max: 99
        },
        aggression: {
          type: Number,
          min: 1,
          max: 99
        },
      },
      goalkeeping: {
        diving: {
          type: Number,
          min: 1,
          max: 99,
        },
        handling: {
          type: Number,
          min: 1,
          max: 99,
        },
        kicking: {
          type: Number,
          min: 1,
          max: 99,
        },
        reflexes: {
          type: Number,
          min: 1,
          max: 99,
        },
        positioning: {
          type: Number,
          min: 1,
          max: 99,
        },
      },
    },
  // Other player-related fields can be added here
  // Example: injuries, performance statistics, etc.
  }
);

const Player = mongoose.model("Player", playerSchema);

module.exports = Player;
