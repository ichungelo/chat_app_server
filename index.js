const express = require("express")
const http = require("http")
const dotenv = require("dotenv")
const cors = require("cors")
const app = express()
const server = http.createServer(app)
const io = require("socket.io")(server, {
    cors: {origin: "http://localhost:4200"}
}) 

app.use(express.json())
app.use(cors())
dotenv.config()

app.use("/", require("./routes/router.js"))


const HOST = process.env.CONNECTION_HOST
const PORT = process.env.CONNECTION_PORT

io.on("connection", (socket) => {
    console.log("a user connected")
    socket.on("chat", (chat) => {
        console.log(chat)
        io.emit("chat", `${socket.id.substr(0, 2)} said ${chat}`)
    })

    socket.on("disconnect", () => {
        console.log("user disconnected")
    })
})

server.listen(PORT, HOST, () => console.log(`Connect in http://${HOST}:${PORT}`))