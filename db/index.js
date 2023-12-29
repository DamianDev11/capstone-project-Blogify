import mongoose from "mongoose";

const connectToDb = () =>
mongoose.connect(process.env.MONGO_URL)
.then(()=>console.log("connected to the database"))
.catch(err=>console.log(err))

export default connectToDb;
