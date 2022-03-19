const jwt = require("jsonwebtoken")
const { insertUserRepo, findUserRepo, findEmailRepo } = require("../repositories/auth.repo.js")
const {
    generateBcrypt,
    authBcrypt
} = require("../utils/bcrypt.js")

const registerUser = async (req, res) => {
    try {
        const {
            username,
            email,
            name,
            password,
            confirm_password
        } = await req.body

        const findUser = await findUserRepo(username)
        const findEmail = await findEmailRepo(email)


        if (findUser != null || findEmail != null) {
            return res.status(401), res.json({
                succes: false,
                message: "invalid input"
            })
        }

        if (!(username && email && name && password && confirm_password)) {
            return res.status(401), res.json({
                success: false,
                message: "invalid input"
            })
        }

        if (password !== confirm_password) {
            return res.status(401), res.json({
                success: false,
                message: "password doesn't match"
            })
        }

        const hashedPassword = await generateBcrypt(password)

        const data = {
            username: username,
            email: email,
            name: name,
            password: hashedPassword
        }

        insertUserRepo(data)

        return res.status(200), res.json({
            success: true,
            message: {
                username: username,
                email: email,
                name: name,
                password: hashedPassword
            }
        })

    } catch (error) {
        console.error("error in auth register", error)
        return res.status(500), res.json({
            success: false,
            message: "internal server error"
        })
    }
}

const loginUser = async (req, res) => {
    try {
        const {
            username,
            password
        } = await req.body

        const findUser = await findUserRepo(username)
        const encodeResult = await authBcrypt(password, findUser.password)

        if (findUser == undefined) {
            return res.status(401), res.json({
                success: false,
                message: "Bad request"
            })
        }

        if (encodeResult == false) {
            return res.status(401), res.json({
                success: false,
                message: "Bad request"
            })
        }

        const payload = {
            username: findUser.username,
            email: findUser.email,
            name: findUser.name

        }

        const token = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: "10s" })

        return res.status(200), res.json({
            success: true,
            message: "Login Success",
            token: token
        })

    } catch (error) {
        console.error("error in auth login", error)
    }
}

module.exports = {
    registerUser,
    loginUser
}