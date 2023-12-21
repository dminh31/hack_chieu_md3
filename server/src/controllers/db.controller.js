const { getUser } = require("../repository/user.reposity.js")
require("dotenv").config()
const jwt = require("jsonwebtoken")
async function login(req, res) {
    const { email, password } = req.body
    const user = await getUser(email)
    if (!user) {
        return res.status(404).json({
            message: "Email chua duoc dang ky"
        })
    }
    if (user.password != password) {
        return res.status(400).json({
            message: "Mat khau khong chinh xac"
        })
    }

    const token = jwt.sign({ id: user.id, role: user.role }, process.env.SECRET_KEY)

    res.status(200).json({
        message: "Dang nhap thanh cong",
        token
    })
}


module.exports = { login }