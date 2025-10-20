const { DataTypes } = require("sequelize");
const { getEnumValue } = require("serviceCommon");
const { ElasticIndexer } = require("serviceCommon");
const updateElasticIndexMappings = require("./elastic-index");
const { hexaLogger } = require("common");

const Product = require("./product");

Product.prototype.getData = function () {
  const data = this.dataValues;

  for (const key of Object.keys(data)) {
    if (key.startsWith("json_")) {
      data[key] = JSON.parse(data[key]);
      const newKey = key.slice(5);
      data[newKey] = data[key];
      delete data[key];
    }
  }

  // set enum Index and enum value
  const statusOptions = ["active", "discontinued"];
  const dataTypestatusProduct = typeof data.status;
  const enumIndexstatusProduct =
    dataTypestatusProduct === "string"
      ? statusOptions.indexOf(data.status)
      : data.status;
  data.status_idx = enumIndexstatusProduct;
  data.status =
    enumIndexstatusProduct > -1 ? statusOptions[enumIndexstatusProduct] : null;

  return data;
};

module.exports = {
  Product,
  updateElasticIndexMappings,
};
