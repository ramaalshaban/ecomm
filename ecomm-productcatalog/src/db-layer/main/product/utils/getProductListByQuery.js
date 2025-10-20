const { HttpServerError, BadRequestError } = require("common");

const { Product } = require("models");
const { Op } = require("sequelize");
const { hexaLogger } = require("common");

const getProductListByQuery = async (query) => {
  try {
    if (!query || typeof query !== "object") {
      throw new BadRequestError(
        "Invalid query provided. Query must be an object.",
      );
    }

    const product = await Product.findAll({
      where: query,
    });

    //should i add not found error or only return empty array?
    if (!product || product.length === 0) return [];

    //      if (!product || product.length === 0) {
    //      throw new NotFoundError(
    //      `Product with the specified criteria not found`
    //  );
    //}

    return product.map((item) => item.getData());
  } catch (err) {
    //**errorLog
    throw new HttpServerError(
      "errMsg_dbErrorWhenRequestingProductListByQuery",
      err,
    );
  }
};

module.exports = getProductListByQuery;
