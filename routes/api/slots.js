const express = require("express");
const { Create, Update, Delete } = require("../../controllers/slots");

const router = express.Router();

router.post("/", Create)
router.put("/", Update)
router.delete("/", Delete)

module.exports = router;