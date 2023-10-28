import express from "express";
import "dotenv/config";
import client from './db/db.js';
import cors from "cors"
import restaurantRouter from './router/restaurant.js'

const app = express()

app.use(express.json())
app.use(cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization", "Access-Control-Allow-Origin", "Access-Control-Allow-Credentials"],
    credentials: true,
  }))

app.use("/api", restaurantRouter)

const port = 3000 || process.env.PORT

client.on("connected", () => {
    app.listen(port, () => {
        console.log(`Server listening to ${port}`)
    })

    app.listen(80, () => {
        console.log("CORS-enabled web server listening on port 80")
    })
})