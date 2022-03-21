const router = require("express").Router()
const { registerUser, loginUser, verifyToken } = require("../handlers/auth.handler.js")

router.route("/api/auth/register")
    .post(registerUser)

router.route("/api/auth/login")
    .post(loginUser)

router.route("/api/auth/verify")
    .post(verifyToken)

router.all("*", (req, res) => { res.status(404), res.json({ message: "Endpoint not found" }) })
module.exports = router