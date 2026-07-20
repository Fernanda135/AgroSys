const express = require('express');
const router = express.Router();
const plantationController = require('../controllers/plantations.controller');

router.post('/', plantationController.create);
router.get('/', plantationController.findAll);
router.patch('/:id/harvest', plantationController.harvest);
router.put('/:id', plantationController.update);
router.delete('/:id', plantationController.delete);

module.exports = router;