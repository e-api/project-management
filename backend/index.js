import dotenv from 'dotenv'
import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import mongoose from 'mongoose'
import routes from './routes/index.js'

dotenv.config()

const app = express()
app.use(express.json())
// Additional Code
app.use(express.urlencoded({ extended: true }))
app.use(cors({
    origin: process.env.FRONTEND_URL,
    methods: ["GET", "POST", "DELETE", "PUT"],
    allowedHeaders: ['Content-Type','Authorization']
}))
app.use(morgan("dev"))

// Database Connection
mongoose.connect(process.env.MONGO_URI).then(() => console.log("DATABASE CONNECTED SUCCESSFULLY")).catch((err) => console.log("FAILED TO CONNECT DATABASE: ", err))

const PORT = process.env.PORT || 3450

app.get('/', async(req, res) => {
    res.status(200).json({
        message: "WELCOME TO TASKHUB API",
    })
})

// http:localhost:3450/api-v1
app.use('/api-v1', routes)

// error middleware
app.use((err, req, res, next) => {
    console.log(err.stack)
    res.status(500).json({
        message: "INTERAL SERVER ERROR"
    })
})

// not found middleware
app.use((req, res) => {
    res.status(404).json({
        message: "NOT FOUND"
    })
})

app.listen(PORT, () => {
    console.log(`SERVER RUNNING ON PORT ${PORT}`)
})