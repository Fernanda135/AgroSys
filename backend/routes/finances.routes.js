const express = require('express');
const router = express.Router();
const financesController = require('../controllers/finances.controller');

router.get('/', financesController.findAll);
router.post('/', financesController.create);
router.put('/:id', financesController.update);
router.delete('/:id', financesController.delete);

module.exports = router;