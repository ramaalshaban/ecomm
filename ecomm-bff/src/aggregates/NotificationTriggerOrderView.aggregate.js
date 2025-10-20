const { elasticClient } = require("common/elasticsearch");

const getAllNotificationTriggerOrderView = async (filter = null) => {
  try {
    const query = filter ? { match: filter } : { match_all: {} };
    const result = await elasticClient.search({
      index: "ecomm_order",
      body: {
        query: query,
        _source: [
          "id",
          "userId",
          "status",
          "paymentStatus",
          "placedAt",
          "totalAmount",
          "currency",
          "shippingAddress",
          "refundRequested",
          "refundAmount",
        ],
      },
    });

    const response = [];
    for (const hit of result?.hits?.hits) {
      let source = hit._source;
      let promises = [];

      promises.push(itemsAggregateDataFromIndex(source));

      promises.push(userAggregateDataFromIndex(source));

      promises.push(productsAggregateDataFromIndex(source));

      promises.push(statusLabelLookupDataFromIndex(source));

      promises.push(paymentStatusLabelLookupDataFromIndex(source));

      await Promise.all(promises);
      response.push(source);
    }
    return response;
  } catch (error) {
    console.log("Error in orderAggregateData", error);
    //**errorLog
  }
};

const getNotificationTriggerOrderView = async (id) => {
  try {
    const idList = Array.isArray(id) ? id : [id];
    const result = await elasticClient.search({
      index: "ecomm_order",
      body: {
        query: { terms: { id: idList } },
        _source: [
          "id",
          "userId",
          "status",
          "paymentStatus",
          "placedAt",
          "totalAmount",
          "currency",
          "shippingAddress",
          "refundRequested",
          "refundAmount",
        ],
      },
    });

    const response = [];
    for (const hit of result?.hits?.hits) {
      let source = hit._source;
      let promises = [];

      promises.push(itemsAggregateDataFromIndex(source));

      promises.push(userAggregateDataFromIndex(source));

      promises.push(productsAggregateDataFromIndex(source));

      promises.push(statusLabelLookupDataFromIndex(source));

      promises.push(paymentStatusLabelLookupDataFromIndex(source));

      await Promise.all(promises);
      response.push(source);
    }
    return response;
  } catch (error) {
    console.log("Error in orderAggregateData", error);
    //**errorLog
  }
};

const itemsAggregateDataFromIndex = async (source) => {
  if (!source["id"]) return;
  const aggregation = await elasticClient.search({
    index: "ecomm_orderitem",
    body: {
      query: {
        match: {
          orderId: source["id"],
        },
      },
      _source: [
        "productId",
        "productName",
        "sku",
        "price",
        "quantity",
        "image",
        "attributes",
      ],
    },
  });

  source["items"] = aggregation.hits.hits.map((hit) => hit._source);
};

const userAggregateDataFromIndex = async (source) => {
  if (!source["userId"]) return;
  const aggregation = await elasticClient.search({
    index: "ecomm_user",
    body: {
      query: {
        match: {
          id: source["userId"],
        },
      },
      _source: ["fullname", "email"],
    },
  });

  if (aggregation.hits.hits.length > 0) {
    source["user"] = aggregation.hits.hits[0]?._source;
  }
};

const productsAggregateDataFromIndex = async (source) => {
  if (!source["items"]) return;
  const aggregation = await elasticClient.search({
    index: "ecomm_product",
    body: {
      query: {
        match: {
          id: source["items"],
        },
      },
      _source: ["id", "name", "status", "category", "images", "price", "sku"],
    },
  });

  source["products"] = aggregation.hits.hits.map((hit) => hit._source);
};

const statusLabelLookupDataFromIndex = async (source) => {
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

const paymentStatusLabelLookupDataFromIndex = async (source) => {
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
  getAllNotificationTriggerOrderView,
  getNotificationTriggerOrderView,
  itemsAggregateDataFromIndex,
  userAggregateDataFromIndex,
  productsAggregateDataFromIndex,
  statusLabelLookupDataFromIndex,
  paymentStatusLabelLookupDataFromIndex,
};
