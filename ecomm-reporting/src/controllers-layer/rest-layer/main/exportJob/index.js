const express = require("express");

// ExportJob Db Object Rest Api Router
const exportJobRouter = express.Router();

// add ExportJob controllers

// createExportJob controller
exportJobRouter.post("/v1/exportjobs", require("./create-exportjob-api"));
// getExportJob controller
exportJobRouter.get(
  "/v1/exportjobs/:exportJobId",
  require("./get-exportjob-api"),
);
// listExportJobs controller
exportJobRouter.get("/v1/exportjobs", require("./list-exportjobs-api"));

module.exports = exportJobRouter;
