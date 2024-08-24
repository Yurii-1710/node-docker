const express = require("express")
const mongoose = require('mongoose');

const { MONGO_USER, MONGO_PASSWORD, MONGO_IP, MONGO_PORT } = require("./config/config")

const app = express()

const mongo_URL = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/?authSource=admin`

const postRouter = require("./routes/postRoutes")
const userRouter = require("./routes/userRoutes")

const connectWithRetry = () => {
  mongoose
  .connect(mongo_URL)
  .then(() => console.log('Connected to DB'))
  .catch((e) => {
    console.log(e)
    setTimeout(connectWithRetry, 5000)
  })
}

connectWithRetry()

app.use(express.json())

app.get("/", (req, res) => {
  res.send("<h2>Fuck you</h2>")
})

app.use("/api/v1/posts", postRouter)
app.use("/api/v1/users", userRouter)
const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Listening on port ${port}`))