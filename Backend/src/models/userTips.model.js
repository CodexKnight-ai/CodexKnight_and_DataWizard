import {mongoose,  Schema } from "mongoose";

const userTipsSchema = new mongoose.Schema({
    
    tipType: {
       type: String, 
       required: true 
    },
    tipDescription: {
       type: String, 
       required: true 
    },
    tipLocation: { 
       type: String, 
       required: true
    },
    tipAttachments: {
       type: String, 
       required: true 
    },
}, 
{ 
  timestamps: true 
});
  
export const UserTip = mongoose.model("UserTip", userTipsSchema);