import mongoose,{Schema} from "mongoose";
const newsSchema = new Schema({
    newsHeading:{
        type:String,
        required:true,
    },
    newsDescription:{
        type:String,
        required:true,
    }
},{
    timestamps:true
})

export const News = mongoose.model("News", careerSchema)
