const webSocket = (server) => {
    const io = require("socket.io")(server, {
        cors: {origin: "http://localhost:4200"}
    }) 
    
    io.on("connection", (socket) => {
        console.log("a user connected")
        socket.on("chat", (chat) => {
            io.emit("chat", {
                name: chat.name,
                text: chat.text
            })
        })
    
        socket.on("disconnect", () => {
            console.log("user disconnected")
        })
    })
}

module.exports = {webSocket}