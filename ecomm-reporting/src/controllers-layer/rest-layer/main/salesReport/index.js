const express = require("express");

// SalesReport Db Object Rest Api Router
const salesReportRouter = express.Router();

// add SalesReport controllers

// createSalesReport controller
salesReportRouter.post("/v1/salesreports", require("./create-salesreport-api"));

module.exports = salesReportRouter;
