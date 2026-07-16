const express = require('express');
const router = express.Router();
const plantationController = require('../controllers/plantations.controller');

router.get('/', plantationController.findAll);
router.post('/', plantationController.create);
router.put('/:id', plantationController.update);
router.delete('/:id', plantationController.delete);

module.exports = router;