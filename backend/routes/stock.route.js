const express = require('express');
const router = express.Router();

const { verifyToken } = require('../middlewares/auth.middleware');
const stockController = require('../controllers/stock.controller');


router.post('/stocks', verifyToken, stockController.create);
router.get('/stocks', verifyToken, stockController.findAll);
router.put('/stocks/:id', verifyToken, stockController.update);
router.delete('/stocks/:id', verifyToken, stockController.delete);

module.exports = router;