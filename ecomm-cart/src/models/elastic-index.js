const { ElasticIndexer } = require("serviceCommon");
const { hexaLogger } = require("common");

const cartMapping = {
  id: { type: "keyword" },
  _owner: { type: "keyword" },
  userId: { type: "keyword", index: true },
  items: { type: "object", enabled: false },
  lastModified: { type: "date", index: true },
  yuy: { properties: {} },
  OI: { type: "boolean", null_value: false },
  frf: { type: "integer", index: true },
  vrg: { type: "boolean", null_value: false },
  ff: { type: "integer", index: true },
  isActive: { type: "boolean" },
  recordVersion: { type: "integer" },
  createdAt: { type: "date" },
  updatedAt: { type: "date" },
};
const cartItemMapping = {
  id: { type: "keyword" },
  _owner: { type: "keyword" },
  productId: { type: "keyword", index: true },
  productName: { type: "keyword", index: true },
  priceAtAdd: { type: "integer", index: false },
  quantity: { type: "integer", index: false },
  image: { type: "keyword", index: false },
  attributes: { type: "object", enabled: false },
  recordVersion: { type: "integer" },
  createdAt: { type: "date" },
  updatedAt: { type: "date" },
};
const koMapping = {
  id: { type: "keyword" },
  _owner: { type: "keyword" },
  isActive: { type: "boolean" },
  recordVersion: { type: "integer" },
  createdAt: { type: "date" },
  updatedAt: { type: "date" },
};
const bvfMapping = {
  id: { type: "keyword" },
  _owner: { type: "keyword" },
  isActive: { type: "boolean" },
  recordVersion: { type: "integer" },
  createdAt: { type: "date" },
  updatedAt: { type: "date" },
};

const updateElasticIndexMappings = async () => {
  try {
    ElasticIndexer.addMapping("cart", cartMapping);
    await new ElasticIndexer("cart").updateMapping(cartMapping);
    ElasticIndexer.addMapping("cartItem", cartItemMapping);
    await new ElasticIndexer("cartItem").updateMapping(cartItemMapping);
    ElasticIndexer.addMapping("ko", koMapping);
    await new ElasticIndexer("ko").updateMapping(koMapping);
    ElasticIndexer.addMapping("bvf", bvfMapping);
    await new ElasticIndexer("bvf").updateMapping(bvfMapping);
  } catch (err) {
    hexaLogger.insertError(
      "UpdateElasticIndexMappingsError",
      { function: "updateElasticIndexMappings" },
      "elastic-index.js->updateElasticIndexMappings",
      err,
    );
  }
};

module.exports = updateElasticIndexMappings;
