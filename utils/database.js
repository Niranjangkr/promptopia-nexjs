import mongoose from "mongoose"; 

let isConnected = false; // tracking the connection

export const connectDB = async() =>{
    mongoose.set('strictQuery', true);
    if(isConnected){
         console.log("Database already connected");
         return;
    }

    try {
        await mongoose.connect(process.env.MONGO_DB_URI,{
            dbName: "prompt_share",
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        
        isConnected = true;
        console.log("MongoDB is connected");
        
    } catch (error) {
        console.log(error, "something went wrong");
    }
} 