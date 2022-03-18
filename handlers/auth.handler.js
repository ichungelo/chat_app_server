const { insertUserRepo, findUserRepo } = require("../repositories/auth.repo.js")
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

        if (!(username && email && name && password && confirm_password)) {
            return res.status(401), res.json({
                success: false,
                message: "input invalid"
            })
        }

        if (password !== confirm_password) {
            return res.status(401), res.json({
                success: false,
                message: "Input invalid"
            })
        }

        const hashedPassword = await generateBcrypt(password)

        // const data = {
        //     username: username,
        //     email: email,
        //     name: name,
        //     password: hashedPassword
        // }

        // insertUserRepo(data)

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
        console.log(error)
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

        // const findResult = findUserRepo(username)
        // console.log(findResult)
        // const encodeResult = await authBcrypt(password, findResult[0].password)

        // if (findResult == undefined) {
        //     return res.status(401), res.json({
        //         success: false,
        //         message: "Bad request"
        //     })
        // }

        // if (encodeResult == false) {
        //     return res.status(401), res.json({
        //         success: false,
        //         message: "Bad request"
        //     })
        // }

        return res.status(200), res.json({
            success: true,
            message: username, password
        })

    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    registerUser,
    loginUser
}