const express = require('express');
const router = express.Router();
const auditController = require('../controllers/auditlog.controller');

router.get('/auditlogs', auditController.findAll);
router.get('/auditlogs/:id', auditController.findOne);
router.get('/auditlogs/table/:table_name', auditController.findByTable);
router.get('/auditlogs/action/:action', auditController.findByAction);

module.exports = router;