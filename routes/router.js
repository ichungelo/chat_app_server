const router = require("express").Router()
const { registerUser, loginUser, verifyToken } = require("../handlers/auth.handler.js")
const { writeChat } = require("../handlers/chat.handler.js")
const { socketIo } = require("../ws/ws.js")

router.route("/api/auth/register")
    .post(registerUser)

router.route("/api/auth/login")
    .post(loginUser)

router.route("/api/auth/verify").post(verifyToken)

router.route("/api/chat/:username")
    .get(socketIo)
    .post(writeChat)

router.all("*", (req, res) => { res.status(404), res.json({ message: "Endpoint not found" }) })
module.exports = router