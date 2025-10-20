const { HttpServerError, BadRequestError } = require("common");

const { ElasticIndexer } = require("serviceCommon");

const { OrderItem } = require("models");
const { hexaLogger, newUUID } = require("common");

const indexDataToElastic = async (data) => {
  const elasticIndexer = new ElasticIndexer("orderItem");
  await elasticIndexer.indexData(data);
};

const validateData = (data) => {
  const requiredFields = [
    "productId",
    "productName",
    "sku",
    "price",
    "quantity",
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

const createOrderItem = async (data) => {
  try {
    validateData(data);

    const current_orderItem = data.id
      ? await OrderItem.findByPk(data.id)
      : null;
    let neworderItem = null;

    if (current_orderItem) {
      delete data.id;

      await current_orderItem.update(data);
      neworderItem = current_orderItem;
    }

    if (!neworderItem) {
      neworderItem = await OrderItem.create(data);
    }

    const _data = neworderItem.getData();
    await indexDataToElastic(_data);
    return _data;
  } catch (err) {
    //**errorLog
    throw new HttpServerError("errMsg_dbErrorWhenCreatingOrderItem", err);
  }
};

module.exports = createOrderItem;
