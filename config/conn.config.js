const connConfig = {
    host: process.env.CONNECTION_HOST || "localhost",
    port: process.env.CONNECTION_PORT || "3000"
}

module.exports = connConfig