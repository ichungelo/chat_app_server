const { MongoClient } = require("mongodb")

const conn = async () => {
    const url = "mongodb://localhost:27017"
    const client = new MongoClient(url)
    return await client.connect()
}

module.exports = { conn }