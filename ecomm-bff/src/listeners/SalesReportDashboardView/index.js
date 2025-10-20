const runCreateListener = require("./create.listener");
const runUpdateListener = require("./update.listener");
const runDeleteListener = require("./delete.listener");

const startExportJobListener = require("./exportJob");

const startRequestedByUserListener = require("./requestedByUser");

const startSalesReportDashboardViewListener = async () => {
  console.log("Starting SalesReportDashboardView listeners");
  await runCreateListener();
  await runUpdateListener();
  await runDeleteListener();

  await startExportJobListener();

  await startRequestedByUserListener();
};

module.exports = startSalesReportDashboardViewListener;
