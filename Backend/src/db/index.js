import mongoose from "mongoose"
import {DB_NAME} from "../constants.js" 

const connectDB = async () => {
    try{
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log(`\n [+] Mongodb connection !! DB  Host : ${connectionInstance.connection.host}`);
    }
    catch(error){
        console.log("[-] Mongoose Connection Error : ",error);
        process.exit(1);
        
    }
}

export default connectDB;