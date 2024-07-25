import mongoose, { Schema } from "mongoose";

const careerSchema = new Schema(
{
    careerTitle: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    careerDescription: {
      type: String,
      required: true,
      index: true,
    },
    careerQualification: {
      type: String,
      required: true,
      index: true,
    },
    careerJob: {
      type: String,
      required: true,
      index: true,
    },
    careerSalary: {
      type: String,
      required: true,
      index: true,
    },
    careerImage: {
      type: String,
      required: true,
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Career = mongoose.model("Career", careerSchema);
