const express = require("express");
const router = express.Router();

const reportController = require("../controllers/reportController");

console.log("Controller import:", reportController);
console.log("Analyze function:", reportController.analyzeReport);

router.post("/analyze", reportController.analyzeReport);

router.get("/history", reportController.getAllReports);

router.get("/:id", reportController.getReportById);
router.delete("/:id", reportController.deleteReport);

module.exports = router;
