const express = require('express');
const router = express.Router();

const { verifyToken } = require('../middlewares/auth.middleware');
const plantationsController = require('../controllers/plantations.controller');


router.post('/plantations', verifyToken, plantationsController.create);
router.get('/plantations', verifyToken, plantationsController.findAll);
router.put('/plantations/:id', verifyToken, plantationsController.update);
router.delete('/plantations/:id', verifyToken, plantationsController.delete);

module.exports = router;