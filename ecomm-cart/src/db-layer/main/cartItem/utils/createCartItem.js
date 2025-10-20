const { HttpServerError, BadRequestError } = require("common");

const { ElasticIndexer } = require("serviceCommon");

const { CartItem } = require("models");
const { hexaLogger, newUUID } = require("common");

const indexDataToElastic = async (data) => {
  const elasticIndexer = new ElasticIndexer("cartItem");
  await elasticIndexer.indexData(data);
};

const validateData = (data) => {
  const requiredFields = ["productId", "productName", "priceAtAdd", "quantity"];

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

const createCartItem = async (data) => {
  try {
    validateData(data);

    const current_cartItem = data.id ? await CartItem.findByPk(data.id) : null;
    let newcartItem = null;

    if (current_cartItem) {
      delete data.id;

      await current_cartItem.update(data);
      newcartItem = current_cartItem;
    }

    if (!newcartItem) {
      newcartItem = await CartItem.create(data);
    }

    const _data = newcartItem.getData();
    await indexDataToElastic(_data);
    return _data;
  } catch (err) {
    //**errorLog
    throw new HttpServerError("errMsg_dbErrorWhenCreatingCartItem", err);
  }
};

module.exports = createCartItem;
