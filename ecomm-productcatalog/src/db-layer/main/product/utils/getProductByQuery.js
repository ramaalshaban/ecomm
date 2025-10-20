const { HttpServerError, BadRequestError } = require("common");

const { Product } = require("models");
const { Op } = require("sequelize");
const { hexaLogger } = require("common");

const getProductByQuery = async (query) => {
  try {
    if (!query || typeof query !== "object") {
      throw new BadRequestError(
        "Invalid query provided. Query must be an object.",
      );
    }

    const product = await Product.findOne({
      where: query,
    });

    if (!product) return null;
    return product.getData();
  } catch (err) {
    throw new HttpServerError(
      "errMsg_dbErrorWhenRequestingProductByQuery",
      err,
    );
  }
};

module.exports = getProductByQuery;
