const { HttpServerError, BadRequestError } = require("common");

const { ElasticIndexer } = require("serviceCommon");

const { Cart } = require("models");
const { hexaLogger, newUUID } = require("common");

const indexDataToElastic = async (data) => {
  const elasticIndexer = new ElasticIndexer("cart");
  await elasticIndexer.indexData(data);
};

const validateData = (data) => {
  const requiredFields = [
    "userId",
    "items",
    "lastModified",
    "yuy",
    "OI",
    "frf",
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

const createCart = async (data) => {
  try {
    validateData(data);

    const current_cart = data.id ? await Cart.findByPk(data.id) : null;
    let newcart = null;

    if (current_cart) {
      delete data.id;
      data.isActive = true;
      await current_cart.update(data);
      newcart = current_cart;
    }

    if (!newcart) {
      newcart = await Cart.create(data);
    }

    const _data = newcart.getData();
    await indexDataToElastic(_data);
    return _data;
  } catch (err) {
    //**errorLog
    throw new HttpServerError("errMsg_dbErrorWhenCreatingCart", err);
  }
};

module.exports = createCart;
