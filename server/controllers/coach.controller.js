const Coach = require("../models/coach.model");

module.exports.createCoach = async (req, res) => {
  try {
    const newCoach = await Coach.create( req.body );
    res.status(201).json(newCoach);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};