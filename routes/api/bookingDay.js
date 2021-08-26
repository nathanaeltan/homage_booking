const express = require("express");
const { Create } = require("../../controllers/bookingDay");

const router = express.Router();

router.post("/", Create)


module.exports = router;