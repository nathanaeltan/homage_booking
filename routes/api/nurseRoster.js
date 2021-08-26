const express = require("express");
const { Create } = require("../../controllers/nuresRoster");
const router = express.Router();

router.post("/", Create)


module.exports = router;