const { conn } = require("../db/mongodb.js")

const insertUserRepo = async (data) => {
    const connection = await conn()
    const db = connection.db("chat-app")
    const collection = await db.collection("users").insertOne(data)
    console.log(collection)
}

const findUserRepo = async (username) => {
    const connection = await conn()
    const db = connection.db("chat-app")
    const collection = await db.collection("users").findOne({username: username})
    return collection
}

module.exports = { insertUserRepo, findUserRepo }