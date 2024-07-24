import mongoose, { Schema } from "mongoose";

const selfDefenseLessonSchema = new Schema({
    id: Number,
    name: String,
    description: String,
    duration: String,
    status: Boolean,
    image: String,
    url  :String,
    timestamps: String,
  });
  
export const Lesson = mongoose.model("Lesson", selfDefenseLessonSchema);