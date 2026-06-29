const express = require('express');
const router = express.Router();

const { verifyToken } = require('../middlewares/auth.middleware');
const todoController = require('../controllers/todo.controller');


router.post('/todos', verifyToken, todoController.create);
router.get('/todos', verifyToken, todoController.findAll);
router.put('/todos/:id', verifyToken, todoController.update);
router.delete('/todos/:id', verifyToken, todoController.delete);

module.exports = router;