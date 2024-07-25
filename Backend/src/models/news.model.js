import mongoose,{Schema} from "mongoose";
const newsSchema = new Schema({
    news:{
        type:String,
        required:true,
        index:true,
    },
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
