const express = require('express');
const router = express.Router();
const plantationController = require('../controllers/plantations.controller');

router.patch('/:id/harvest', plantationController.harvest);
router.put('/:id', plantationController.update);
router.delete('/:id', plantationController.delete);
router.post('/', plantationController.create);
router.get('/', plantationController.findAll);

module.exports = router;