const { addTodo, renderTodo, removeTodo, upgradeTodo } = require("../controllers/todo.controller.js")
const { tokennn } = require("../middlewares/middlewares.js")
const { validate } = require("../middlewares/validate.js")
const todoRouter = (app) => {
    app.post("/todo/add", tokennn,validate, addTodo)
    app.get("/todo/all", renderTodo)
    app.delete("/todo/:id", tokennn, removeTodo)
    app.put("/todo/:id", tokennn, upgradeTodo)
}

module.exports = {
    todoRouter
}