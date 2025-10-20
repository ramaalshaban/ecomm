const { elasticClient } = require("common/elasticsearch");

const CustomerOrderListViewAggregateData = async (id) => {
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
          "paymentStatus-idx",
        ],
      },
    });

    for (const hit of result?.hits?.hits) {
      let source = hit._source;
      let promises = [];

      promises.push(itemsAggregateDataFromIndex(source));

      promises.push(userAggregateDataFromIndex(source));

      promises.push(statusLabelLookupDataFromIndex(source));

      promises.push(paymentStatusLabelLookupDataFromIndex(source));

      promises.push(orderCountStatDataFromIndex(source));

      await Promise.all(promises);

      await elasticClient.index({
        index: "ecomm_customerorderlistview",
        id: source["id"],
        body: source,
      });
    }
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

const itemsReCustomerOrderListView = async (id) => {
  try {
    const idList = Array.isArray(id) ? id : [id];
    if (idList.length === 0) return;
    const result = await elasticClient.search({
      index: "ecomm_customerorderlistview",
      body: {
        query: { terms: { "orderitem.orderId": idList } },
      },
    });

    for (const hit of result?.hits?.hits) {
      let source = hit._source;
      let promises = [];

      promises.push(itemsAggregateDataFromIndex(source));

      await Promise.all(promises);
      await elasticClient.index({
        index: "ecomm_customerorderlistview",
        id: hit.id,
        body: source,
      });
    }
  } catch (error) {
    console.log("Error in orderitemReAggregateCustomerOrderListView", error);
    //**errorLog
  }
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
      _source: ["fullname", "email", "avatar"],
    },
  });

  if (aggregation.hits.hits.length > 0) {
    source["user"] = aggregation.hits.hits[0]?._source;
  }
};

const userReCustomerOrderListView = async (id) => {
  try {
    const idList = Array.isArray(id) ? id : [id];
    if (idList.length === 0) return;
    const result = await elasticClient.search({
      index: "ecomm_customerorderlistview",
      body: {
        query: { terms: { "user.id": idList } },
      },
    });

    for (const hit of result?.hits?.hits) {
      let source = hit._source;
      let promises = [];

      promises.push(userAggregateDataFromIndex(source));

      await Promise.all(promises);
      await elasticClient.index({
        index: "ecomm_customerorderlistview",
        id: hit.id,
        body: source,
      });
    }
  } catch (error) {
    console.log("Error in userReAggregateCustomerOrderListView", error);
    //**errorLog
  }
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

const statusLabelReCustomerOrderListView = async (id) => {
  try {
    const idList = Array.isArray(id) ? id : [id];
    const result = await elasticClient.search({
      index: "ecomm_customerorderlistview",
      body: {
        query: { terms: { status: idList } },
      },
    });

    for (const hit of result?.hits?.hits) {
      let source = hit._source;
      let promises = [];

      promises.push(statusLabelLookupDataFromIndex(source));

      await Promise.all(promises);
      await elasticClient.index({
        index: "ecomm_customerorderlistview",
        id: hit.id,
        body: source,
      });
    }
  } catch (error) {
    console.log("Error in statusLabelReCustomerOrderListView", error);
    //**errorLog
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

const paymentStatusLabelReCustomerOrderListView = async (id) => {
  try {
    const idList = Array.isArray(id) ? id : [id];
    const result = await elasticClient.search({
      index: "ecomm_customerorderlistview",
      body: {
        query: { terms: { paymentStatus: idList } },
      },
    });

    for (const hit of result?.hits?.hits) {
      let source = hit._source;
      let promises = [];

      promises.push(paymentStatusLabelLookupDataFromIndex(source));

      await Promise.all(promises);
      await elasticClient.index({
        index: "ecomm_customerorderlistview",
        id: hit.id,
        body: source,
      });
    }
  } catch (error) {
    console.log("Error in paymentStatusLabelReCustomerOrderListView", error);
    //**errorLog
  }
};

const orderCountStatDataFromIndex = async (source) => {
  let aggs = {};

  aggs["count"] = {
    count: {
      field: "id",
    },
  };

  const statObject = await elasticClient.search({
    index: "ecomm_order",
    body: {
      size: 0,
      aggs: aggs,
    },
  });

  source["order"] = {};

  source["order"]["orderCount"] = statObject.aggregations["count"].value;
};

module.exports = {
  CustomerOrderListViewAggregateData,

  itemsReCustomerOrderListView,
  userReCustomerOrderListView,
  statusLabelReCustomerOrderListView,
  paymentStatusLabelReCustomerOrderListView,
  itemsAggregateDataFromIndex,
  userAggregateDataFromIndex,
  statusLabelLookupDataFromIndex,
  paymentStatusLabelLookupDataFromIndex,
  orderCountStatDataFromIndex,
};
