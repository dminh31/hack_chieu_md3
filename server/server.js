const express = require('express');
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser');
const { userRouter } = require('./src/routes/user.routes');
const database = require('./src/config/config');
const { todoRouter } = require('./src/routes/todo.routes');

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
    

userRouter(app)
todoRouter(app)

app.listen(8600, () => {
    console.log("Server is running on port 8600");
})