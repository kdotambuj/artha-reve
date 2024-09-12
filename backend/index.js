import express from "express";
import cors from "cors"
import cookieParser from "cookie-parser";
import dotenv from "dotenv"
import connectDB from "./utils/db.js";
import userRoute from "./routes/user.route.js"
import companyRoute from "./routes/company.route.js"
import jobRoute from "./routes/job.route.js"
import applicationRoute from "./routes/application.route.js"


dotenv.config({})


const app = express()

// middlewares
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
const corsOptions = {
    origin:'http://localhost:5173',
    credentials:true
}
app.use(cors((corsOptions)))

const PORT = process.env.PORT || 3000




// api
app.use("/api/v1/user",userRoute)
app.use("/api/v1/company",companyRoute)
app.use("/api/v1/job",jobRoute)
app.use("/api/v1/application",applicationRoute)

app.listen(PORT,()=>{
    connectDB()
    console.log(`Server running on Port ${PORT}`);
})