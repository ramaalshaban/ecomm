const { elasticClient } = require("common/elasticsearch");

const {
  CustomerOrderListViewAggregateData,
} = require("aggregates/CustomerOrderListView.aggregate");

const {
  ProductListViewAggregateData,
} = require("aggregates/ProductListView.aggregate");

const {
  SalesDashboardViewAggregateData,
} = require("aggregates/SalesDashboardView.aggregate");

const {
  SalesReportDashboardViewAggregateData,
} = require("aggregates/SalesReportDashboardView.aggregate");

const runAllRepair = async () => {
  console.group("Repair started at ", new Date());

  await CustomerOrderListViewRepair();

  await ProductListViewRepair();

  await SalesDashboardViewRepair();

  await SalesReportDashboardViewRepair();

  console.groupEnd();
};

const CustomerOrderListViewRepair = async () => {
  try {
    console.group("CustomerOrderListViewRepair started at ", new Date());
    await checkIndex("ecomm_customerorderlistview");
    const result = await elasticClient.search({
      index: "ecomm_order",
      body: {
        query: { match_all: {} },
      },
    });

    const ids = result?.hits?.hits.map((hit) => hit._source.id);
    await CustomerOrderListViewAggregateData(ids);
    console.log("Repair completed for customerorderlistview");
  } catch (error) {
    console.error("CustomerOrderListViewRepair failed at ", new Date(), error);
    //**errorLog
  } finally {
    console.groupEnd();
  }
};

const ProductListViewRepair = async () => {
  try {
    console.group("ProductListViewRepair started at ", new Date());
    await checkIndex("ecomm_productlistview");
    const result = await elasticClient.search({
      index: "ecomm_product",
      body: {
        query: { match_all: {} },
      },
    });

    const ids = result?.hits?.hits.map((hit) => hit._source.id);
    await ProductListViewAggregateData(ids);
    console.log("Repair completed for productlistview");
  } catch (error) {
    console.error("ProductListViewRepair failed at ", new Date(), error);
    //**errorLog
  } finally {
    console.groupEnd();
  }
};

const SalesDashboardViewRepair = async () => {
  try {
    console.group("SalesDashboardViewRepair started at ", new Date());
    await checkIndex("ecomm_salesdashboardview");
    const result = await elasticClient.search({
      index: "ecomm_salesreport",
      body: {
        query: { match_all: {} },
      },
    });

    const ids = result?.hits?.hits.map((hit) => hit._source.id);
    await SalesDashboardViewAggregateData(ids);
    console.log("Repair completed for salesdashboardview");
  } catch (error) {
    console.error("SalesDashboardViewRepair failed at ", new Date(), error);
    //**errorLog
  } finally {
    console.groupEnd();
  }
};

const SalesReportDashboardViewRepair = async () => {
  try {
    console.group("SalesReportDashboardViewRepair started at ", new Date());
    await checkIndex("ecomm_salesreportdashboardview");
    const result = await elasticClient.search({
      index: "ecomm_salesreport",
      body: {
        query: { match_all: {} },
      },
    });

    const ids = result?.hits?.hits.map((hit) => hit._source.id);
    await SalesReportDashboardViewAggregateData(ids);
    console.log("Repair completed for salesreportdashboardview");
  } catch (error) {
    console.error(
      "SalesReportDashboardViewRepair failed at ",
      new Date(),
      error,
    );
    //**errorLog
  } finally {
    console.groupEnd();
  }
};

// check index is exists and create if not exists
const checkIndex = async (index) => {
  const result = await elasticClient.indices.exists({ index });
  if (!result) {
    console.log("Index not found, creating index", index);
    await elasticClient.indices.create({ index });
    return;
  }
  console.log("Index found, skipping creation", index);
};

module.exports = { runAllRepair };
