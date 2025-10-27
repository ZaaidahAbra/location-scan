const express = require("express");
const router = express.Router();
const { addLocation } = require("../controllers/locationController");

router.post("/scan", addLocation);

module.exports = router;
