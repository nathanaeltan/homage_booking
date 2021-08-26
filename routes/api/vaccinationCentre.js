const express = require("express");
const { Create, Get } = require("../../controllers/vaccinationCentre");
const router = express.Router();

router.post("/", Create)
router.get("/", Get)

module.exports = router;