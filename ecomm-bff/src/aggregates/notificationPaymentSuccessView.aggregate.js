const { elasticClient } = require("common/elasticsearch");

const getAllNotificationPaymentSuccessView = async (filter = null) => {
  try {
    const query = filter ? { match: filter } : { match_all: {} };
    const result = await elasticClient.search({
      index: "ecomm_order",
      body: {
        query: query,
        _source: [
          "id",
          "userId",
          "createdAt",
          "placedAt",
          "totalAmount",
          "currency",
          "status",
          "paymentStatus",
        ],
      },
    });

    const response = [];
    for (const hit of result?.hits?.hits) {
      let source = hit._source;
      let promises = [];

      promises.push(userInfoAggregateDataFromIndex(source));

      promises.push(statusNameLookupDataFromIndex(source));

      promises.push(paymentStatusNameLookupDataFromIndex(source));

      await Promise.all(promises);
      response.push(source);
    }
    return response;
  } catch (error) {
    console.log("Error in orderAggregateData", error);
    //**errorLog
  }
};

const getNotificationPaymentSuccessView = async (id) => {
  try {
    const idList = Array.isArray(id) ? id : [id];
    const result = await elasticClient.search({
      index: "ecomm_order",
      body: {
        query: { terms: { id: idList } },
        _source: [
          "id",
          "userId",
          "createdAt",
          "placedAt",
          "totalAmount",
          "currency",
          "status",
          "paymentStatus",
        ],
      },
    });

    const response = [];
    for (const hit of result?.hits?.hits) {
      let source = hit._source;
      let promises = [];

      promises.push(userInfoAggregateDataFromIndex(source));

      promises.push(statusNameLookupDataFromIndex(source));

      promises.push(paymentStatusNameLookupDataFromIndex(source));

      await Promise.all(promises);
      response.push(source);
    }
    return response;
  } catch (error) {
    console.log("Error in orderAggregateData", error);
    //**errorLog
  }
};

const userInfoAggregateDataFromIndex = async (source) => {
  if (!source["userId"]) return;
  const aggregation = await elasticClient.search({
    index: "ecomm_user",
    body: {
      query: {
        match: {
          id: source["userId"],
        },
      },
      _source: ["id", "fullname", "email"],
    },
  });

  if (aggregation.hits.hits.length > 0) {
    source["userInfo"] = aggregation.hits.hits[0]?._source;
  }
};

const statusNameLookupDataFromIndex = async (source) => {
  const query = {
    match: {
      id: source["status"],
    },
  };

  const lookupData = await elasticClient.search({
    index: "ecomm_orderStatus",
    body: {
      query: query,
    },
  });

  if (lookupData.hits && lookupData.hits?.hits?.length > 1) {
    source["status"] = lookupData.hits.hits[0]?._source;
  }
};

const paymentStatusNameLookupDataFromIndex = async (source) => {
  const query = {
    match: {
      id: source["paymentStatus"],
    },
  };

  const lookupData = await elasticClient.search({
    index: "ecomm_paymentStatus",
    body: {
      query: query,
    },
  });

  if (lookupData.hits && lookupData.hits?.hits?.length > 1) {
    source["paymentStatus"] = lookupData.hits.hits[0]?._source;
  }
};

module.exports = {
  getAllNotificationPaymentSuccessView,
  getNotificationPaymentSuccessView,
  userInfoAggregateDataFromIndex,
  statusNameLookupDataFromIndex,
  paymentStatusNameLookupDataFromIndex,
};
