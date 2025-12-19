const express = require("express");
const router = express.Router();
const { createCase } = require("../controllers/caseController");
const verifyToken = require("../middlewares/verifyToken");

router.post("/", verifyToken, createCase);

module.exports = router;

