module.exports = (headers) => {
  // main Database Crud Object Mcp Api Routers
  return {
    salesReportMcpRouter: require("./salesReport")(headers),
    exportJobMcpRouter: require("./exportJob")(headers),
    reportingJobAuditMcpRouter: require("./reportingJobAudit")(headers),
  };
};
