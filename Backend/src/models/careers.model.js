import mongoose, { Schema } from "mongoose"


const careerSchema = new Schema({
    careerNumber:{
        type:Number,
        required:true,
        unique:true,
    },
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
    careerImage: {
        type: String,
        required: true,
        index: true,
    }
}, {
    timestamps: true
})

export const Career = mongoose.model("Career", careerSchema)