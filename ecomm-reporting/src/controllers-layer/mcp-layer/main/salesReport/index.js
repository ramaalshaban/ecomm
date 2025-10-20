module.exports = (headers) => {
  // SalesReport Db Object Rest Api Router
  const salesReportMcpRouter = [];

  // createSalesReport controller
  salesReportMcpRouter.push(require("./create-salesreport-api")(headers));

  return salesReportMcpRouter;
};
