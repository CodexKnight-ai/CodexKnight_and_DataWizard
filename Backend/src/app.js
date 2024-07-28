import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import dotenv from 'dotenv';
import bodyParser from 'body-parser'
dotenv.config(
    {
        path: './.env'
    }
);


const app = express()

app.use(cors({
    // origin: process.env.CORS_ORIGIN,
    origin : process.env.CORS_ORIGIN,
    credentials: true
}))

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static("public"))
app.use(cookieParser())


//routes import
import userRouter from './routes/users.route.js'
import mostWantedRouter from './routes/mostWanted.route.js'
import careerRouter from './routes/career.route.js'
import selfDefenseRouter from './routes/selfDefense.route.js'
import userTipsRouter from './routes/userTips.route.js'
import newsRouter from './routes/news.route.js'

//routes declaration
app.use("/api/v1/users", userRouter)
app.use("/api/v1/mostWanted", mostWantedRouter)
app.use("/api/v1/career", careerRouter)
app.use("/api/v1/selfDefense",selfDefenseRouter)
app.use("/api/v1/userTips",userTipsRouter)
app.use("/api/v1/news",newsRouter)


export { app }