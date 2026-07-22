const express = require("express");
const router = express.Router();

const salesController = require("../controllers/sales.controller");

router.get("/", salesController.findAll);
router.post("/", salesController.create);
router.put("/:id", salesController.update);
router.delete("/:id", salesController.delete);

module.exports = router;