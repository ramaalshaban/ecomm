const { elasticClient } = require("common/elasticsearch");

const getAllAdminExportJobView = async (filter = null) => {
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
          "startedAt",
          "completedAt",
          "downloadUrl",
        ],
      },
    });

    const response = [];
    for (const hit of result?.hits?.hits) {
      let source = hit._source;
      let promises = [];

      promises.push(requestedByUserAggregateDataFromIndex(source));

      promises.push(statusLabelLookupDataFromIndex(source));

      promises.push(exportTypeLabelLookupDataFromIndex(source));

      await Promise.all(promises);
      response.push(source);
    }
    return response;
  } catch (error) {
    console.log("Error in exportjobAggregateData", error);
    //**errorLog
  }
};

const getAdminExportJobView = async (id) => {
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
          "startedAt",
          "completedAt",
          "downloadUrl",
        ],
      },
    });

    const response = [];
    for (const hit of result?.hits?.hits) {
      let source = hit._source;
      let promises = [];

      promises.push(requestedByUserAggregateDataFromIndex(source));

      promises.push(statusLabelLookupDataFromIndex(source));

      promises.push(exportTypeLabelLookupDataFromIndex(source));

      await Promise.all(promises);
      response.push(source);
    }
    return response;
  } catch (error) {
    console.log("Error in exportjobAggregateData", error);
    //**errorLog
  }
};

const requestedByUserAggregateDataFromIndex = async (source) => {
  if (!source["requestedBy"]) return;
  const aggregation = await elasticClient.search({
    index: "ecomm_user",
    body: {
      query: {
        match: {
          id: source["requestedBy"],
        },
      },
      _source: ["id", "fullname", "email"],
    },
  });

  if (aggregation.hits.hits.length > 0) {
    source["requestedByUser"] = aggregation.hits.hits[0]?._source;
  }
};

const statusLabelLookupDataFromIndex = async (source) => {
  const query = {
    match: {
      id: source["status"],
    },
  };

  const lookupData = await elasticClient.search({
    index: "ecomm_exportJobStatus",
    body: {
      query: query,
    },
  });

  if (lookupData.hits && lookupData.hits?.hits?.length > 1) {
    source["status"] = lookupData.hits.hits[0]?._source;
  }
};

const exportTypeLabelLookupDataFromIndex = async (source) => {
  const query = {
    match: {
      id: source["exportType"],
    },
  };

  const lookupData = await elasticClient.search({
    index: "ecomm_exportJobType",
    body: {
      query: query,
    },
  });

  if (lookupData.hits && lookupData.hits?.hits?.length > 1) {
    source["exportType"] = lookupData.hits.hits[0]?._source;
  }
};

module.exports = {
  getAllAdminExportJobView,
  getAdminExportJobView,
  requestedByUserAggregateDataFromIndex,
  statusLabelLookupDataFromIndex,
  exportTypeLabelLookupDataFromIndex,
};
