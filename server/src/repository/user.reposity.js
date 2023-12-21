const db = require("../config/config.js")

async function getUser(email) {
    try {
        const [result] = await db.execute('SELECT * FROM users where email = ?', [email])
        return result[0]
    } catch (error) {
        console.log("error", error)
    }
}

module.exports = {
    getUser
}