const { elasticClient } = require("common/elasticsearch");

const getAllNotificationExportJobView = async (filter = null) => {
  try {
    const query = filter ? { match: filter } : { match_all: {} };
    const result = await elasticClient.search({
      index: "ecomm_exportjob",
      body: {
        query: query,
        _source: [
          "id",
          "exportType",
          "status",
          "requestedBy",
          "downloadUrl",
          "startedAt",
          "completedAt",
        ],
      },
    });

    const response = [];
    for (const hit of result?.hits?.hits) {
      let source = hit._source;
      let promises = [];

      promises.push(salesReportAggregateDataFromIndex(source));

      promises.push(adminAggregateDataFromIndex(source));

      promises.push(exportTypeLabelLookupDataFromIndex(source));

      promises.push(exportStatusLabelLookupDataFromIndex(source));

      await Promise.all(promises);
      response.push(source);
    }
    return response;
  } catch (error) {
    console.log("Error in exportjobAggregateData", error);
    //**errorLog
  }
};

const getNotificationExportJobView = async (id) => {
  try {
    const idList = Array.isArray(id) ? id : [id];
    const result = await elasticClient.search({
      index: "ecomm_exportjob",
      body: {
        query: { terms: { id: idList } },
        _source: [
          "id",
          "exportType",
          "status",
          "requestedBy",
          "downloadUrl",
          "startedAt",
          "completedAt",
        ],
      },
    });

    const response = [];
    for (const hit of result?.hits?.hits) {
      let source = hit._source;
      let promises = [];

      promises.push(salesReportAggregateDataFromIndex(source));

      promises.push(adminAggregateDataFromIndex(source));

      promises.push(exportTypeLabelLookupDataFromIndex(source));

      promises.push(exportStatusLabelLookupDataFromIndex(source));

      await Promise.all(promises);
      response.push(source);
    }
    return response;
  } catch (error) {
    console.log("Error in exportjobAggregateData", error);
    //**errorLog
  }
};

const salesReportAggregateDataFromIndex = async (source) => {
  if (!source["id"]) return;
  const aggregation = await elasticClient.search({
    index: "ecomm_salesreport",
    body: {
      query: {
        match: {
          exportJobId: source["id"],
        },
      },
      _source: [
        "dateRange",
        "totalRevenue",
        "orderCount",
        "productCount",
        "refundsTotal",
      ],
    },
  });

  if (aggregation.hits.hits.length > 0) {
    source["salesReport"] = aggregation.hits.hits[0]?._source;
  }
};

const adminAggregateDataFromIndex = async (source) => {
  if (!source["requestedBy"]) return;
  const aggregation = await elasticClient.search({
    index: "ecomm_user",
    body: {
      query: {
        match: {
          id: source["requestedBy"],
        },
      },
      _source: ["fullname", "email"],
    },
  });

  if (aggregation.hits.hits.length > 0) {
    source["admin"] = aggregation.hits.hits[0]?._source;
  }
};

const exportTypeLabelLookupDataFromIndex = async (source) => {
  const query = {
    match: {
      id: source["exportType"],
    },
  };

  const lookupData = await elasticClient.search({
    index: "ecomm_exportTypes",
    body: {
      query: query,
    },
  });

  if (lookupData.hits && lookupData.hits?.hits?.length > 1) {
    source["exportType"] = lookupData.hits.hits[0]?._source;
  }
};

const exportStatusLabelLookupDataFromIndex = async (source) => {
  const query = {
    match: {
      id: source["status"],
    },
  };

  const lookupData = await elasticClient.search({
    index: "ecomm_exportStatuses",
    body: {
      query: query,
    },
  });

  if (lookupData.hits && lookupData.hits?.hits?.length > 1) {
    source["status"] = lookupData.hits.hits[0]?._source;
  }
};

module.exports = {
  getAllNotificationExportJobView,
  getNotificationExportJobView,
  salesReportAggregateDataFromIndex,
  adminAggregateDataFromIndex,
  exportTypeLabelLookupDataFromIndex,
  exportStatusLabelLookupDataFromIndex,
};
