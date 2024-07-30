import mongoose , {Schema} from "mongoose"


const LostItemFormSchema = new Schema(
    {
      userName: {
        type: String,
        // required: true,
        // index: true,
      },
      phoneNo: {
        type: String,
        // required: true,
      },
      lostItemImage: {
        type: String, //cloudnary url
        // required: true,
        // index : true,
      },
      lostItemName: {
        type: String,
        // required: true,
      },
      lostItemDiscription: {
        type: String, 
        // required: true,
      },
      lostItemAddress: {
        type: String,
        // required : true,
      },
      lostItemDate: {
        type: String,
        // required : true,
      },
    },
    {
      timestamps: true,
    }
);
  
const FoundItemFormSchema = new Schema(

    {
        userName: {
          type: String,
        //   required: true,
        //   index: true,
        },
        phoneNo: {
          type: String,
        //   required: true,
        },
        foundItemImage: {
          type: String, //cloudnary url
        //   required: true,
        //   index : true,
        },
        foundItemName: {
          type: String,
        //   required: true,
        },
        foundItemDiscription: {
          type: String, 
        //   required: true,
        },
        foundItemAddress:{
          typr: String,
        //   required : true,
        },
        foundItemDate: {
          typr: String,
        //   required : true,
        },
        
      },
      {
        timestamps: true,
      }
);

export const LostItem = mongoose.model("LostItem", LostItemFormSchema);
export const FoundItem  = mongoose.model("FoundItem", FoundItemFormSchema)