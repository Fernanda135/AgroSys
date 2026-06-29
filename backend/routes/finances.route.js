const express = require('express');
const router = express.Router();

const { verifyToken } = require('../middlewares/auth.middleware');
const financesController = require('../controllers/finances.controller');


router.post('/finances', verifyToken, financesController.create);
router.get('/finances', verifyToken, financesController.findAll);
router.put('/finances/:id', verifyToken, financesController.update);
router.delete('/finances/:id', verifyToken, financesController.delete);

module.exports = router;