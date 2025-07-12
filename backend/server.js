import express from "express"
import cors from "cors"
import { connectDB } from "./config/db.js"
import foodRouter from "./routes/foodRouter.js"
import fs from 'fs';
if (!fs.existsSync('uploads')) {
  fs.mkdirSync('uploads');
}

//app config
const app = express()
const port = 4000

//middleware
app.use(express.json())
app.use(cors())

//DB Connection
connectDB();

//API ENDPOINTS
app.use("/api/food", foodRouter)
app.use("/images", express.static('uploads'))

app.get("/",(req,res)=>{
    res.send("API Working")
})

app.listen(port, ()=>{
    console.log(`Sever Started on http://localhost:${port}`)
})
//mongodb+srv://capaterjimenez:nm8QtI2cEKdPQ6aQ@cluster0.bpsaxn6.mongodb.net/?