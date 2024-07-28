import mongoose,{Schema} from "mongoose";
const newsSchema = new Schema({
    newsHeading:{
        type:String,
        required:true,
    },
    newsDescription:{
        type:String,
        required:true,
    },
    newsImage:{
        type:String,
        required:true,
    },
    likes:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }]

    }
,{
    timestamps:true
})

export const News = mongoose.model("News", newsSchema)
