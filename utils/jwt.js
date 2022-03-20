const jwt = require("jsonwebtoken")

const generateToken = (payload) => {
    try {
        const token = jwt.sign({
            username: payload.username,
            name: payload.name
        }, process.env.SECRET_KEY,
        {
            expiresIn: "1h"
        })
        return token
    } catch (error) {
        console.error("error in jwt generate", error)
        throw error
    }
}

const authToken = (token) => {
    try {
        const payload = jwt.verify(token, process.env.SECRET_KEY)
        return payload
    } catch (error) {
        console.error("error in jwt auth", error)
        throw error
    }
}

module.exports = {
    generateToken,
    authToken
}