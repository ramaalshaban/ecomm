const { elasticClient } = require("common/elasticsearch");

const SalesReportDashboardViewAggregateData = async (id) => {
  try {
    const idList = Array.isArray(id) ? id : [id];

    const result = await elasticClient.search({
      index: "ecomm_salesreport",
      body: {
        query: { terms: { id: idList } },
        _source: [
          "id",
          "createdAt",
          "updatedAt",
          "dateRange",
          "totalRevenue",
          "orderCount",
          "productCount",
          "refundsTotal",
          "bestsellers",
          "exportJobId",
        ],
      },
    });

    for (const hit of result?.hits?.hits) {
      let source = hit._source;
      let promises = [];

      promises.push(exportJobAggregateDataFromIndex(source));

      promises.push(requestedByUserAggregateDataFromIndex(source));

      promises.push(statusLabelLookupDataFromIndex(source));

      promises.push(exportTypeLabelLookupDataFromIndex(source));

      await Promise.all(promises);

      await elasticClient.index({
        index: "ecomm_salesreportdashboardview",
        id: source["id"],
        body: source,
      });
    }
  } catch (error) {
    console.log("Error in salesreportAggregateData", error);
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
      _source: ["id", "status", "exportType", "downloadUrl", "requestedBy"],
    },
  });

  if (aggregation.hits.hits.length > 0) {
    source["exportJob"] = aggregation.hits.hits[0]?._source;
  }
};

const exportJobReSalesReportDashboardView = async (id) => {
  try {
    const idList = Array.isArray(id) ? id : [id];
    if (idList.length === 0) return;
    const result = await elasticClient.search({
      index: "ecomm_salesreportdashboardview",
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
        index: "ecomm_salesreportdashboardview",
        id: hit.id,
        body: source,
      });
    }
  } catch (error) {
    console.log("Error in exportjobReAggregateSalesReportDashboardView", error);
    //**errorLog
  }
};

const requestedByUserAggregateDataFromIndex = async (source) => {
  if (!source["exportJob"]) return;
  const aggregation = await elasticClient.search({
    index: "ecomm_user",
    body: {
      query: {
        match: {
          id: source["exportJob"],
        },
      },
      _source: ["id", "fullname", "email"],
    },
  });

  if (aggregation.hits.hits.length > 0) {
    source["requestedByUser"] = aggregation.hits.hits[0]?._source;
  }
};

const requestedByUserReSalesReportDashboardView = async (id) => {
  try {
    const idList = Array.isArray(id) ? id : [id];
    if (idList.length === 0) return;
    const result = await elasticClient.search({
      index: "ecomm_salesreportdashboardview",
      body: {
        query: { terms: { "user.id": idList } },
      },
    });

    for (const hit of result?.hits?.hits) {
      let source = hit._source;
      let promises = [];

      promises.push(requestedByUserAggregateDataFromIndex(source));

      await Promise.all(promises);
      await elasticClient.index({
        index: "ecomm_salesreportdashboardview",
        id: hit.id,
        body: source,
      });
    }
  } catch (error) {
    console.log("Error in userReAggregateSalesReportDashboardView", error);
    //**errorLog
  }
};

const statusLabelLookupDataFromIndex = async (source) => {
  const query = {
    match: {
      id: source["exportJob.status"],
    },
  };

  const lookupData = await elasticClient.search({
    index: "ecomm_exportJobStatus",
    body: {
      query: query,
    },
  });

  if (lookupData.hits && lookupData.hits?.hits?.length > 1) {
    source["exportJob.status"] = lookupData.hits.hits[0]?._source;
  }
};

const statusLabelReSalesReportDashboardView = async (id) => {
  try {
    const idList = Array.isArray(id) ? id : [id];
    const result = await elasticClient.search({
      index: "ecomm_salesreportdashboardview",
      body: {
        query: { terms: { "exportJob.status": idList } },
      },
    });

    for (const hit of result?.hits?.hits) {
      let source = hit._source;
      let promises = [];

      promises.push(statusLabelLookupDataFromIndex(source));

      await Promise.all(promises);
      await elasticClient.index({
        index: "ecomm_salesreportdashboardview",
        id: hit.id,
        body: source,
      });
    }
  } catch (error) {
    console.log("Error in statusLabelReSalesReportDashboardView", error);
    //**errorLog
  }
};

const exportTypeLabelLookupDataFromIndex = async (source) => {
  const query = {
    match: {
      id: source["exportJob.exportType"],
    },
  };

  const lookupData = await elasticClient.search({
    index: "ecomm_exportJobType",
    body: {
      query: query,
    },
  });

  if (lookupData.hits && lookupData.hits?.hits?.length > 1) {
    source["exportJob.exportType"] = lookupData.hits.hits[0]?._source;
  }
};

const exportTypeLabelReSalesReportDashboardView = async (id) => {
  try {
    const idList = Array.isArray(id) ? id : [id];
    const result = await elasticClient.search({
      index: "ecomm_salesreportdashboardview",
      body: {
        query: { terms: { "exportJob.exportType": idList } },
      },
    });

    for (const hit of result?.hits?.hits) {
      let source = hit._source;
      let promises = [];

      promises.push(exportTypeLabelLookupDataFromIndex(source));

      await Promise.all(promises);
      await elasticClient.index({
        index: "ecomm_salesreportdashboardview",
        id: hit.id,
        body: source,
      });
    }
  } catch (error) {
    console.log("Error in exportTypeLabelReSalesReportDashboardView", error);
    //**errorLog
  }
};

module.exports = {
  SalesReportDashboardViewAggregateData,

  exportJobReSalesReportDashboardView,
  requestedByUserReSalesReportDashboardView,
  statusLabelReSalesReportDashboardView,
  exportTypeLabelReSalesReportDashboardView,
  exportJobAggregateDataFromIndex,
  requestedByUserAggregateDataFromIndex,
  statusLabelLookupDataFromIndex,
  exportTypeLabelLookupDataFromIndex,
};
