import express from 'express'
import session from 'express-session';
import cors from 'cors'
import { adminRouter } from './Routes/AdminRoute.js'
import { mahasiswaRouter } from './Routes/MahasiswaRoute.js'

const app = express()
app.use(cors({
    origin: ["http://localhost:5173"],
    methods: ["GET", 'POST, PUT', 'DELETE'],
    credentials: true
}))

app.use(express.json())
app.use('', adminRouter)
app.use('', mahasiswaRouter)
app.use(express.static('public'))


app.listen(3000, () => {
    console.log("Server is running!");
})