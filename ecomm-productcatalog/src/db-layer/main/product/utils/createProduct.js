const { HttpServerError, BadRequestError } = require("common");

const { ElasticIndexer } = require("serviceCommon");

const { Product } = require("models");
const { hexaLogger, newUUID } = require("common");

const indexDataToElastic = async (data) => {
  const elasticIndexer = new ElasticIndexer("product");
  await elasticIndexer.indexData(data);
};

const validateData = (data) => {
  const requiredFields = [
    "name",
    "category",
    "price",
    "images",
    "status",
    "inventoryCount",
    "sku",
  ];

  requiredFields.forEach((field) => {
    if (data[field] === null || data[field] === undefined) {
      throw new BadRequestError(
        `Field "${field}" is required and cannot be null or undefined.`,
      );
    }
  });

  if (!data.id) {
    data.id = newUUID();
  }
};

const createProduct = async (data) => {
  try {
    validateData(data);

    const current_product = data.id ? await Product.findByPk(data.id) : null;
    let newproduct = null;

    if (current_product) {
      delete data.id;

      await current_product.update(data);
      newproduct = current_product;
    }

    if (!newproduct) {
      newproduct = await Product.create(data);
    }

    const _data = newproduct.getData();
    await indexDataToElastic(_data);
    return _data;
  } catch (err) {
    //**errorLog
    throw new HttpServerError("errMsg_dbErrorWhenCreatingProduct", err);
  }
};

module.exports = createProduct;
