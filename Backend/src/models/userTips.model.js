import {mongoose,  Schema } from "mongoose";

const userTipsSchema = new mongoose.Schema({
    
    tipCategory: {
       type: String, 
       required: true 
    },
    tipDescription: {
       type: String, 
       required: true 
    },
    tipDate: { 
       type: String, 
       required: true
    },
    tipAttachments: {
      
    },
}, 
{ 
  timestamps: true 
});
  
export const UserTip = mongoose.model("UserTip", userTipsSchema);