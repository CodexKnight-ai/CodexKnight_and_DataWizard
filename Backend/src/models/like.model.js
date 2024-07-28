import mongoose, {Schema} from "mongoose";


const likeSchema = new Schema({
    news: {
        type: Schema.Types.ObjectId,
        ref: "News"
    },
    comment: {
        type: Schema.Types.ObjectId,
        ref: "Comment"
    },
    likedBy: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    
}, {timestamps: true})

export const Like = mongoose.model("Like", likeSchema)