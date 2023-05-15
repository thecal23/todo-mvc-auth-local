const express = require('express')
const router = express.Router()
const todosController = require('../controllers/todos') 
const { ensureAuth } = require('../middleware/auth')

router.get('/', ensureAuth, todosController.getTodos)

router.get('/searchTodo', ensureAuth, todosController.searchTodo)

router.post('/downloadCSV', ensureAuth, todosController.downloadCSV)

router.post('/createTodo', ensureAuth, todosController.createTodo)

router.put('/markComplete', ensureAuth, todosController.markComplete)

router.put('/markIncomplete', ensureAuth, todosController.markIncomplete)

router.delete('/deleteTodo', ensureAuth, todosController.deleteTodo)

router.put('/modifyTodo', ensureAuth, todosController.modifyTodo)

router.put('/statusUpdate', ensureAuth, todosController.statusUpdate)


module.exports = router