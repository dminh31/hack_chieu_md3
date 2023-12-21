const { addTodos, getAllTodos, deleteTodo, updateTodo } = require("../repository/todo.repository.js")
// no bi loi khi chay cai nao e
async function addTodo(req, res) {
    const { name } = req.body
    // console.log(req.body)
    const result = await addTodos(name)
    res.status(201).json({
        message: "Them thanh cong"
    })
}

async function renderTodo(req, res) {
    const result = await getAllTodos();
    res.status(200).json(result);
}

async function removeTodo(req, res) {
    const { id } = req.params
    await deleteTodo(id)
    const result = await getAllTodos()
    res.status(200).json({
        result,
        message: "Xoa thanh cong"
    })
}

async function upgradeTodo(req, res) {
    const { id } = req.params
    const { name } = req.body
    await updateTodo(name, id)
    const result = await getAllTodos()
    res.status(200).json({
        result,
        message: "Cap nhat thanh cong"
    })
}

module.exports = {
    addTodo, renderTodo, removeTodo, upgradeTodo
}