const { ElasticIndexer } = require("serviceCommon");
const { hexaLogger } = require("common");

const productMapping = {
  id: { type: "keyword" },
  _owner: { type: "keyword" },
  name: { type: "keyword", index: true },
  description: { type: "text", index: true },
  category: { type: "keyword", index: true },
  price: { type: "integer", index: true },
  images: { type: "keyword", index: false },
  availability: { type: "boolean", null_value: false },
  status: { type: "keyword", index: true },
  status_: { type: "keyword" },
  inventoryCount: { type: "integer", index: true },
  sku: { type: "keyword", index: true },
  tags: { type: "keyword", index: true },
  weight: { type: "float", index: false },
  dimensions: { type: "object", enabled: false },
  attributes: { type: "object", enabled: false },
  recordVersion: { type: "integer" },
  createdAt: { type: "date" },
  updatedAt: { type: "date" },
};

const updateElasticIndexMappings = async () => {
  try {
    ElasticIndexer.addMapping("product", productMapping);
    await new ElasticIndexer("product").updateMapping(productMapping);
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
