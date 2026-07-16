const express = require('express');
const router = express.Router();
const todoController = require('../controllers/todo.controller');

router.get('/', todoController.findAll);
router.post('/', todoController.create);
router.get('/:id', todoController.findOne);
router.put('/:id', todoController.update);
router.delete('/:id', todoController.delete);
router.patch('/:id/toggle', todoController.toggleStatus);

module.exports = router;