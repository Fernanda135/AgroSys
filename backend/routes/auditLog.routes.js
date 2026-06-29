const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middlewares/auth.middleware');
const auditlogController = require('../controllers/auditlog.controller.js');


router.get('/auditlogs', verifyToken, auditlogController.findAll);
router.get('/auditlogs/:id', verifyToken, auditlogController.findOne);
router.get('/auditlogs/table/:table_name', verifyToken, auditlogController.findByTable);
router.get('/auditlogs/action/:action', verifyToken, auditlogController.findByAction);


module.exports = router;