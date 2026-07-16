const express = require('express');
const router = express.Router();
const stockController = require('../controllers/stock.controller');

router.get('/', stockController.findAll);
router.post('/', stockController.create);
router.put('/:id', stockController.update);
router.delete('/:id', stockController.delete);
router.patch('/:id/add-quantity', stockController.addQuantity);
router.get('/low-stock', stockController.lowStock);

module.exports = router;