const express = require("express");
const { Create } = require("../../controllers/user");

const router = express.Router();

router.post("/", Create)



module.exports = router;