const express = require("express")
const connectDB = require("./config/db")
const cors = require("cors")
require("dotenv").config()
const PORT = process.env.PORT || 5000;
const authRoute = require("./routes/authRoute")

const app = express()
app.use(cors())
app.use(express.json)

connectDB()

app.get("/",(req,res)=>{
    res.send("blog api is running")
})

app.use("/api/auth/",authRoute)


app.listen(PORT,()=>{
    console.log(`blog api is running`)
})

