const express = require("express")
const dotenv = require("dotenv")
const cors = require("cors")

const connection = require("./config/conn.config.js")

const app = express()
app.use(express.json())
app.use(cors())
dotenv.config()
app.use("/", require("./routes/router.js"))

app.listen(connection.port, connection.host, () => console.log(`Connect in http://${connection.host}:${connection.port}`))