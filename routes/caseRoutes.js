const express = require("express");
const router = express.Router();
const {
  getCases,
  createCase,
  updateCase
} = require("../controllers/caseController");

const verifyToken = require("../middlewares/verifyToken");

router.get("/", verifyToken, getCases);
router.post("/", verifyToken, createCase);
router.put("/:id", verifyToken, updateCase);

module.exports = router;