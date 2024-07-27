import mongoose, { Schema } from "mongoose";

const selfDefenseLessonSchema = new mongoose.Schema({
    LessonId: {
       type: String, 
       required: true 
    },
    LessonName: {
       type: String, 
       required: true 
    },
    LessonDescription: {
       type: String, 
       required: true 
    },
    LessonDuration: { 
       type: String, 
       required: true
    },
    LessonURL: {
       type: String, 
       required: true 
    },
}, 
{ 
  timestamps: true 
});
  
export const Lesson = mongoose.model("Lesson", selfDefenseLessonSchema);