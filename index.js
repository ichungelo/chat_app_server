const express = require("express")
const http = require("http")
const dotenv = require("dotenv")
const cors = require("cors")
const socketio = require("socket.io")
const app = express()
const server = http.createServer(app)
const io = socketio(server)

io.on("connection", (socket) => {
    console.log("new ws connection", socket)
})
app.use(express.json())
app.use(cors())
dotenv.config()

io.on("connection", (socket) => {
    socket.on("chat message", (msg) => {
        io.emit("chat message", msg)
    })
})
app.use("/", require("./routes/router.js"))
const host = process.env.CONNECTION_HOST
const port = process.env.CONNECTION_PORT

server.listen(port, host, () => console.log(`Connect in http://${host}:${port}`))