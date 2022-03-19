const { conn } = require("../db/mongodb.js")

const insertUserRepo = async (data) => {
    try {        
        const connection = await conn()
        const db = connection.db("chat-app")
        await db.collection("users").insertOne(data)
    } catch (error) {
        console.error("error in insert user repository", error)
    }
}

const findUserRepo = async (username) => {
    try {        
        const connection = await conn()
        const db = connection.db("chat-app")
        const collection = await db.collection("users").findOne({username: username})
        return collection
    } catch (error) {
        console.error("error in find user repository", error)
    }
}

const findEmailRepo = async (email) => {
    try {        
        const connection = await conn()
        const db = connection.db("chat-app")
        const collection = await db.collection("users").findOne({email: email})
        return collection
    } catch (error) {
        console.error("error in find user repository", error)
    }
}

module.exports = { insertUserRepo, findUserRepo, findEmailRepo }