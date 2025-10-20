const { elasticClient } = require("common/elasticsearch");

const getAllCartView = async (filter = null) => {
  try {
    const query = filter ? { match: filter } : { match_all: {} };
    const result = await elasticClient.search({
      index: "ecomm_cart",
      body: {
        query: query,
        _source: ["id", "userId", "lastModified"],
      },
    });

    const response = [];
    for (const hit of result?.hits?.hits) {
      let source = hit._source;
      let promises = [];

      promises.push(itemsAggregateDataFromIndex(source));

      promises.push(itemProductsAggregateDataFromIndex(source));

      promises.push(productStatusLabelLookupDataFromIndex(source));

      promises.push(productCategoryLabelLookupDataFromIndex(source));

      promises.push(totalCartPriceStatDataFromIndex(source));

      await Promise.all(promises);
      response.push(source);
    }
    return response;
  } catch (error) {
    console.log("Error in cartAggregateData", error);
    //**errorLog
  }
};

const getCartView = async (id) => {
  try {
    const idList = Array.isArray(id) ? id : [id];
    const result = await elasticClient.search({
      index: "ecomm_cart",
      body: {
        query: { terms: { id: idList } },
        _source: ["id", "userId", "lastModified"],
      },
    });

    const response = [];
    for (const hit of result?.hits?.hits) {
      let source = hit._source;
      let promises = [];

      promises.push(itemsAggregateDataFromIndex(source));

      promises.push(itemProductsAggregateDataFromIndex(source));

      promises.push(productStatusLabelLookupDataFromIndex(source));

      promises.push(productCategoryLabelLookupDataFromIndex(source));

      promises.push(totalCartPriceStatDataFromIndex(source));

      await Promise.all(promises);
      response.push(source);
    }
    return response;
  } catch (error) {
    console.log("Error in cartAggregateData", error);
    //**errorLog
  }
};

const itemsAggregateDataFromIndex = async (source) => {
  if (!source["id"]) return;
  const aggregation = await elasticClient.search({
    index: "ecomm_cartitem",
    body: {
      query: {
        match: {
          cartId: source["id"],
        },
      },
      _source: [
        "productId",
        "productName",
        "priceAtAdd",
        "quantity",
        "image",
        "attributes",
      ],
    },
  });

  source["items"] = aggregation.hits.hits.map((hit) => hit._source);
};

const itemProductsAggregateDataFromIndex = async (source) => {
  if (!source["items"]) return;
  const aggregation = await elasticClient.search({
    index: "ecomm_product",
    body: {
      query: {
        match: {
          id: source["items"],
        },
      },
      _source: [
        "id",
        "name",
        "category",
        "status",
        "price",
        "images",
        "inventoryCount",
        "sku",
      ],
    },
  });

  source["itemProducts"] = aggregation.hits.hits.map((hit) => hit._source);
};

const productStatusLabelLookupDataFromIndex = async (source) => {
  const query = {
    match: {
      id: source["itemProducts.status"],
    },
  };

  const lookupData = await elasticClient.search({
    index: "ecomm_productStatus",
    body: {
      query: query,
    },
  });

  if (lookupData.hits && lookupData.hits?.hits?.length > 1) {
    source["itemProducts.status"] = lookupData.hits.hits[0]?._source;
  }
};

const productCategoryLabelLookupDataFromIndex = async (source) => {
  const query = {
    match: {
      id: source["itemProducts.category"],
    },
  };

  const lookupData = await elasticClient.search({
    index: "ecomm_categories",
    body: {
      query: query,
    },
  });

  if (lookupData.hits && lookupData.hits?.hits?.length > 1) {
    source["itemProducts.category"] = lookupData.hits.hits[0]?._source;
  }
};

const totalCartPriceStatDataFromIndex = async (source) => {
  let aggs = {};

  aggs["sum"] = {
    sum: {
      field: "priceAtAdd",
    },
  };

  const statObject = await elasticClient.search({
    index: "ecomm_cartItem",
    body: {
      size: 0,
      aggs: aggs,
    },
  });

  source["cartItem"] = {};

  source["cartItem"]["totalPrice"] = statObject.aggregations["sum"].value;
};

module.exports = {
  getAllCartView,
  getCartView,
  itemsAggregateDataFromIndex,
  itemProductsAggregateDataFromIndex,
  productStatusLabelLookupDataFromIndex,
  productCategoryLabelLookupDataFromIndex,
  totalCartPriceStatDataFromIndex,
};
