const express = require('express');
const router = express.Router();
const todoController = require('../controllers/todo.controller');

router.post('/', todoController.create);
router.get('/', todoController.findAll);
router.patch('/complete-all', todoController.completeAll);
router.delete('/delete-completed', todoController.deleteCompleted);

router.get('/:id', todoController.findOne);
router.put('/:id', todoController.update);
router.delete('/:id', todoController.delete);
router.patch('/:id/toggle', todoController.toggleStatus);

module.exports = router;