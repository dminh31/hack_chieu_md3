const { login } = require("../controllers/db.controller")

const userRouter = (app) => {
    app.post("/api/v1/login", login)
}


module.exports = {
    login,
    userRouter
}