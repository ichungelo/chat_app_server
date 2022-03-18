const router = require("express").Router()
const { registerUser, loginUser } = require("../handlers/auth.handler.js")

router.route("/api/auth/register")
    .post(registerUser)

router.route("/api/auth/login")
    .get((req, res) => { res.status(200), res.json({ message: "Login" }) })
    .post(loginUser)

router.route("/api/chat/:uuid").post((req,res) => {
    const uuid = req.params.uuid
    const body = {
        success: req.body.success,
        message: req.body.message,
    }
    res.status(200), res.json({
        success: body.success,
        id: uuid,
        message: body.message
    })
})
router.all("*", (req, res) => { res.status(200), res.json({ message: "OK" }) })
module.exports = router