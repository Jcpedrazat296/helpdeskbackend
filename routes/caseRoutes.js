const express = require("express");
const router = express.Router();
const { createCase, getCases } = require("../controllers/caseController");
const verifyToken = require("../middlewares/verifyToken");

router.get("/", verifyToken, getCases);
router.post("/", verifyToken, createCase);

module.exports = router;
