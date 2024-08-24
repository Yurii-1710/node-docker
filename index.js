const express = require("express")
const mongoose = require('mongoose');

const app = express()

mongoose.connect(
"mongodb://admin:password@db:27017/?authSource=admin"
).then(() => console.log('Connected to DB'))
.catch((e) => console.log(e))

app.get("/", (req, res) => {
  res.send("<h2>Fuck you!</h2>")
})

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Listening on port ${port}`))