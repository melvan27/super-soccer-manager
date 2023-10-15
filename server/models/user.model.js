const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Coach = require("./coach.model")
const Role = require("./role.model")

const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "First name is required"],
    },
    lastName: {
      type: String,
      required: [true, "Last name is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      validate: {
        validator: val => /^([\w-\.]+@([\w-]+\.)+[\w-]+)?$/.test(val),
        message: "Please enter a valid email"
      },
      unique: true,
    },
    username: {
      type: String,
      required: [true, "Username is required"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      validate: {
        validator: val => /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(val),
        message: "Password must have at least 8 characters, 1 uppercase letter, 1 lowercase letter, and 1 number."
      },
    },
    coaches: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Coach",
    }],
    role: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Role",
    },
  },
  { timestamps: true }
);

// add this after UserSchema is defined
UserSchema.virtual("confirmPassword")
  .get( () => this._confirmPassword )
  .set( value => this._confirmPassword = value );

UserSchema.pre("validate", function(next) {
  if (this.password !== this.confirmPassword) {
    this.invalidate("confirmPassword", "Password must match confirm password");
  }
  next();
});

UserSchema.pre("save", function(next) {
  bcrypt.hash(this.password, 10)
    .then(hash => {
      this.password = hash;
      next();
    });
});

const User = mongoose.model("User", UserSchema);

module.exports = User;