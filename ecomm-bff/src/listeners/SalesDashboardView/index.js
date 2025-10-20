const runCreateListener = require("./create.listener");
const runUpdateListener = require("./update.listener");
const runDeleteListener = require("./delete.listener");

const startBestsellersListener = require("./bestsellers");

const startExportJobListener = require("./exportJob");

const startAdminListener = require("./admin");

const startSalesDashboardViewListener = async () => {
  console.log("Starting SalesDashboardView listeners");
  await runCreateListener();
  await runUpdateListener();
  await runDeleteListener();

  await startBestsellersListener();

  await startExportJobListener();

  await startAdminListener();
};

module.exports = startSalesDashboardViewListener;
