const {
  HttpServerError,
  BadRequestError,
  NotAuthenticatedError,
  ForbiddenError,
  NotFoundError,
} = require("common");
const { hexaLogger } = require("common");
const { Product } = require("models");
const { Op } = require("sequelize");

const getProductBySku = async (sku) => {
  try {
    const product = await Product.findOne({ where: { sku: sku } });

    if (!product) {
      return null;
    }
    return product.getData();
  } catch (err) {
    //**errorLog
    throw new HttpServerError("errMsg_dbErrorWhenRequestingProductBySku", err);
  }
};

module.exports = getProductBySku;
