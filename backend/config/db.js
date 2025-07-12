import mongoose from "mongoose";

export const connectDB = async() => {
    await mongoose.connect('mongodb+srv://capaterjimenez:nm8QtI2cEKdPQ6aQ@cluster0.bpsaxn6.mongodb.net/Restaurant-management').then(()=>console.log("DB Connected"));
}