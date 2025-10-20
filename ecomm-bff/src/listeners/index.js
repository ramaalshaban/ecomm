const startCustomerOrderListViewListener = require("./CustomerOrderListView");

const startProductListViewListener = require("./ProductListView");

const startSalesDashboardViewListener = require("./SalesDashboardView");

const startSalesReportDashboardViewListener = require("./SalesReportDashboardView");

const startListener = async () => {
  console.log("Starting listener");

  await startCustomerOrderListViewListener();

  await startProductListViewListener();

  await startSalesDashboardViewListener();

  await startSalesReportDashboardViewListener();
};

module.exports = startListener;
