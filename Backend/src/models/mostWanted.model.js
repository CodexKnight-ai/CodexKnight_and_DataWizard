import mongoose, { Schema } from "mongoose";

const criminalSchema = new Schema(
  {
    criminalName: {
      type: String,
      required: true,
      index: true,
    },

    age: {
      type: String,
      required: true,
    },
    crime: {
      type: String,
      required: true,
    },
    detail: {
      type: String,
      required: true,
    },
    avatar: {
      type: String, //cloudinary url
      required: true,
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Criminal = mongoose.model("Criminal", criminalSchema);
