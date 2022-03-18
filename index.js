const connection = require("./config/conn.config.js")
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

io.on("connection", (socket) =>{
    socket.on("chat message", (msg) => {
        io.emit("chat message", msg)
    })
})
app.use("/", require("./routes/router.js"))


server.listen(connection.port, connection.host, () => console.log(`Connect in http://${connection.host}:${connection.port}`))