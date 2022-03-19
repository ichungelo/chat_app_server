const router = require("express").Router()
const { registerUser, loginUser } = require("../handlers/auth.handler.js")
const { writeChat } = require("../handlers/chat.handler.js")

router.route("/api/auth/register")
    .post(registerUser)

router.route("/api/auth/login")
    .get((req, res) => { res.status(200), res.json({ message: "Login" }) })
    .post(loginUser)

router.route("/api/chat/:username")
    // .get(getChat)
    .post(writeChat)

router.all("*", (req, res) => { res.status(404), res.json({ message: "Endpoint not found" }) })
module.exports = router