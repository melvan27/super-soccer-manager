import { Schema, model } from "mongoose";

const ConfederationSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    abbreviation: {
      type: String,
      required: [true, "Abbreviation is required"],
    },
    continent: {
      type: String,
      required: [true, "Continent is required"],
    },
    yearFounded: {
      type: Number,
    },
    competitions: [{
      type: Schema.Types.ObjectId,
      ref: "Competition",
    }],
  },
  { timestamps: true }
);

const Confederation = model("Confederation", ConfederationSchema);

export default Confederation;