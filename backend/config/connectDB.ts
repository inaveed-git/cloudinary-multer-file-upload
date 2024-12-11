import mongoose from "mongoose";



let connectDB = async() => { 

    try {
        const mongoURL = process.env.MONGO_URL; 

        await mongoose.connect(mongoURL as string);
        console.log("database connected successfully")
    } catch (error) {
        console.log("error while connection")
    }


}


export default connectDB ; 
