const { MongoClient } = require("mongodb")
const host = process.env.DB_HOST
const port = process.env.DB_PORT

const conn = async () => {
    try {
        const url = `mongodb://${host}:${port}`
        const client = new MongoClient(url)
        return await client.connect()        
    } catch (error) {
        console.error("error in database", error)
    }
}

module.exports = { conn }