const database = require("../config/config.js")

async function addTodos(nameProduct) {
    const [result] = await database.execute('insert into todolist (nameProduct) values (?)', [nameProduct])
    return result
}

async function getAllTodos() {
    const [result] = await database.execute('select * from todolist')
    return result
}

async function deleteTodo(id) {
    const [result] = await database.execute('delete from todolist where id = ?', [id])
    return result
}

async function updateTodo(nameProduct, id) {
    const [result] = await database.execute('update todolist set nameProduct = ? where id = ?', [nameProduct, id])
    return result
}
module.exports = {
    addTodos,
    getAllTodos,
    deleteTodo,
    updateTodo
}