import express from "express" 
import mongoose from "mongoose"
import cors from "cors"
import dotenv from "dotenv"
import userRoute from "./routes/user.route.js"
import messageRoute from "./routes/message.route.js"
import cookieParser from "cookie-parser"
import { app , server } from "./socket.io/server.js"

// const app = express()
app.use(cors())
app.use(express.json())
app.use(cookieParser())
dotenv.config()
 
const port = process.env.PORT || 5000
let MONGODB_URI = process.env.MONGODB_URI

mongoose.connect(MONGODB_URI).then(() => {
    console.log('Connected to MongoDB');
  }).catch(err => {
    console.error('Connection error:', err);
  });

app.use("/user",userRoute)
app.use("/message",messageRoute)

app.get('/', (req, res) => {
    // console.log(process.env.PORT)
  res.send('Hello World!')
})

server.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})