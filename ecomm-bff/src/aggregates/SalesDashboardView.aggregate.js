const { elasticClient } = require("common/elasticsearch");

const SalesDashboardViewAggregateData = async (id) => {
  try {
    const idList = Array.isArray(id) ? id : [id];

    const result = await elasticClient.search({
      index: "ecomm_salesreport",
      body: {
        query: { terms: { id: idList } },
        _source: [
          "id",
          "dateRange",
          "totalRevenue",
          "orderCount",
          "productCount",
          "refundsTotal",
        ],
      },
    });

    for (const hit of result?.hits?.hits) {
      let source = hit._source;
      let promises = [];

      promises.push(bestsellersAggregateDataFromIndex(source));

      promises.push(exportJobAggregateDataFromIndex(source));

      promises.push(adminAggregateDataFromIndex(source));

      await Promise.all(promises);

      await elasticClient.index({
        index: "ecomm_salesdashboardview",
        id: source["id"],
        body: source,
      });
    }
  } catch (error) {
    console.log("Error in salesreportAggregateData", error);
    //**errorLog
  }
};

const bestsellersAggregateDataFromIndex = async (source) => {
  if (!source["id"]) return;
  const aggregation = await elasticClient.search({
    index: "ecomm_salesreport",
    body: {
      query: {
        match: {
          id: source["id"],
        },
      },
      _source: ["bestsellers"],
    },
  });

  if (aggregation.hits.hits.length > 0) {
    source["bestsellers"] = aggregation.hits.hits[0]?._source;
  }
};

const bestsellersReSalesDashboardView = async (id) => {
  try {
    const idList = Array.isArray(id) ? id : [id];
    if (idList.length === 0) return;
    const result = await elasticClient.search({
      index: "ecomm_salesdashboardview",
      body: {
        query: { terms: { "salesreport.id": idList } },
      },
    });

    for (const hit of result?.hits?.hits) {
      let source = hit._source;
      let promises = [];

      promises.push(bestsellersAggregateDataFromIndex(source));

      await Promise.all(promises);
      await elasticClient.index({
        index: "ecomm_salesdashboardview",
        id: hit.id,
        body: source,
      });
    }
  } catch (error) {
    console.log("Error in salesreportReAggregateSalesDashboardView", error);
    //**errorLog
  }
};

const exportJobAggregateDataFromIndex = async (source) => {
  if (!source["exportJobId"]) return;
  const aggregation = await elasticClient.search({
    index: "ecomm_exportjob",
    body: {
      query: {
        match: {
          id: source["exportJobId"],
        },
      },
      _source: ["id", "exportType", "status", "requestedBy", "downloadUrl"],
    },
  });

  if (aggregation.hits.hits.length > 0) {
    source["exportJob"] = aggregation.hits.hits[0]?._source;
  }
};

const exportJobReSalesDashboardView = async (id) => {
  try {
    const idList = Array.isArray(id) ? id : [id];
    if (idList.length === 0) return;
    const result = await elasticClient.search({
      index: "ecomm_salesdashboardview",
      body: {
        query: { terms: { "exportjob.id": idList } },
      },
    });

    for (const hit of result?.hits?.hits) {
      let source = hit._source;
      let promises = [];

      promises.push(exportJobAggregateDataFromIndex(source));

      await Promise.all(promises);
      await elasticClient.index({
        index: "ecomm_salesdashboardview",
        id: hit.id,
        body: source,
      });
    }
  } catch (error) {
    console.log("Error in exportjobReAggregateSalesDashboardView", error);
    //**errorLog
  }
};

const adminAggregateDataFromIndex = async (source) => {
  if (!source["exportJob"]) return;
  const aggregation = await elasticClient.search({
    index: "ecomm_user",
    body: {
      query: {
        match: {
          id: source["exportJob"],
        },
      },
      _source: ["fullname", "email"],
    },
  });

  if (aggregation.hits.hits.length > 0) {
    source["admin"] = aggregation.hits.hits[0]?._source;
  }
};

const adminReSalesDashboardView = async (id) => {
  try {
    const idList = Array.isArray(id) ? id : [id];
    if (idList.length === 0) return;
    const result = await elasticClient.search({
      index: "ecomm_salesdashboardview",
      body: {
        query: { terms: { "user.id": idList } },
      },
    });

    for (const hit of result?.hits?.hits) {
      let source = hit._source;
      let promises = [];

      promises.push(adminAggregateDataFromIndex(source));

      await Promise.all(promises);
      await elasticClient.index({
        index: "ecomm_salesdashboardview",
        id: hit.id,
        body: source,
      });
    }
  } catch (error) {
    console.log("Error in userReAggregateSalesDashboardView", error);
    //**errorLog
  }
};

module.exports = {
  SalesDashboardViewAggregateData,

  bestsellersReSalesDashboardView,
  exportJobReSalesDashboardView,
  adminReSalesDashboardView,

  bestsellersAggregateDataFromIndex,
  exportJobAggregateDataFromIndex,
  adminAggregateDataFromIndex,
};
