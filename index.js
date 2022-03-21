const express = require("express")
const http = require("http")
const dotenv = require("dotenv")
const cors = require("cors")
const { webSocket } = require("./ws/ws.js")

const app = express()
const server = http.createServer(app)

app.use(express.json())
app.use(cors())
dotenv.config()

app.use("/", require("./routes/router.js"))
webSocket(server)

const HOST = process.env.CONNECTION_HOST
const PORT = process.env.CONNECTION_PORT

server.listen(PORT, HOST, () => console.log(`Connect in http://${HOST}:${PORT}`))