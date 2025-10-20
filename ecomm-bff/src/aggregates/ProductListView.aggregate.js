const { elasticClient } = require("common/elasticsearch");

const ProductListViewAggregateData = async (id) => {
  try {
    const idList = Array.isArray(id) ? id : [id];

    const result = await elasticClient.search({
      index: "ecomm_product",
      body: {
        query: { terms: { id: idList } },
        _source: [
          "id",
          "name",
          "description",
          "category",
          "price",
          "status",
          "images",
          "inventoryCount",
          "sku",
        ],
      },
    });

    for (const hit of result?.hits?.hits) {
      let source = hit._source;
      let promises = [];

      promises.push(statusLabelLookupDataFromIndex(source));

      promises.push(categoryLabelLookupDataFromIndex(source));

      promises.push(orderCountStatDataFromIndex(source));

      promises.push(unitsSoldStatDataFromIndex(source));

      await Promise.all(promises);

      await elasticClient.index({
        index: "ecomm_productlistview",
        id: source["id"],
        body: source,
      });
    }
  } catch (error) {
    console.log("Error in productAggregateData", error);
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
    index: "ecomm_productStatus",
    body: {
      query: query,
    },
  });

  if (lookupData.hits && lookupData.hits?.hits?.length > 1) {
    source["status"] = lookupData.hits.hits[0]?._source;
  }
};

const statusLabelReProductListView = async (id) => {
  try {
    const idList = Array.isArray(id) ? id : [id];
    const result = await elasticClient.search({
      index: "ecomm_productlistview",
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
        index: "ecomm_productlistview",
        id: hit.id,
        body: source,
      });
    }
  } catch (error) {
    console.log("Error in statusLabelReProductListView", error);
    //**errorLog
  }
};

const categoryLabelLookupDataFromIndex = async (source) => {
  const query = {
    match: {
      id: source["category"],
    },
  };

  const lookupData = await elasticClient.search({
    index: "ecomm_categories",
    body: {
      query: query,
    },
  });

  if (lookupData.hits && lookupData.hits?.hits?.length > 1) {
    source["category"] = lookupData.hits.hits[0]?._source;
  }
};

const categoryLabelReProductListView = async (id) => {
  try {
    const idList = Array.isArray(id) ? id : [id];
    const result = await elasticClient.search({
      index: "ecomm_productlistview",
      body: {
        query: { terms: { category: idList } },
      },
    });

    for (const hit of result?.hits?.hits) {
      let source = hit._source;
      let promises = [];

      promises.push(categoryLabelLookupDataFromIndex(source));

      await Promise.all(promises);
      await elasticClient.index({
        index: "ecomm_productlistview",
        id: hit.id,
        body: source,
      });
    }
  } catch (error) {
    console.log("Error in categoryLabelReProductListView", error);
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
    index: "ecomm_orderItem",
    body: {
      size: 0,
      aggs: aggs,
    },
  });

  source["orderItem"] = {};

  source["orderItem"]["orderCount"] = statObject.aggregations["count"].value;
};

const unitsSoldStatDataFromIndex = async (source) => {
  let aggs = {};

  aggs["sum"] = {
    sum: {
      field: "quantity",
    },
  };

  const statObject = await elasticClient.search({
    index: "ecomm_orderItem",
    body: {
      size: 0,
      aggs: aggs,
    },
  });

  source["orderItem"] = {};

  source["orderItem"]["unitsSold"] = statObject.aggregations["sum"].value;
};

module.exports = {
  ProductListViewAggregateData,

  statusLabelReProductListView,
  categoryLabelReProductListView,

  statusLabelLookupDataFromIndex,
  categoryLabelLookupDataFromIndex,
  orderCountStatDataFromIndex,
  unitsSoldStatDataFromIndex,
};
