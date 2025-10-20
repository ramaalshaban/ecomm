const { HttpServerError, NotFoundError } = require("common");
const { hexaLogger } = require("common");

const { Product } = require("models");
const { Op } = require("sequelize");

const getProductAggById = async (productId) => {
  try {
    const forWhereClause = false;
    const includes = [];

    const product = Array.isArray(productId)
      ? await Product.findAll({
          where: {
            id: { [Op.in]: productId },
          },
          include: includes,
        })
      : await Product.findByPk(productId, { include: includes });

    if (!product) {
      return null;
    }

    const productData =
      Array.isArray(productId) && productId.length > 0
        ? product.map((item) => item.getData())
        : product.getData();
    await Product.getCqrsJoins(productData);
    return productData;
  } catch (err) {
    //**errorLog
    throw new HttpServerError(
      "errMsg_dbErrorWhenRequestingProductAggById",
      err,
    );
  }
};

module.exports = getProductAggById;
