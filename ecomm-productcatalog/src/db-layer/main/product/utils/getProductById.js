const { HttpServerError } = require("common");

let { Product } = require("models");
const { hexaLogger } = require("common");
const { Op } = require("sequelize");

const getProductById = async (productId) => {
  try {
    const product = Array.isArray(productId)
      ? await Product.findAll({
          where: {
            id: { [Op.in]: productId },
          },
        })
      : await Product.findByPk(productId);

    if (!product) {
      return null;
    }
    return Array.isArray(productId)
      ? product.map((item) => item.getData())
      : product.getData();
  } catch (err) {
    console.log(err);
    //**errorLog
    throw new HttpServerError("errMsg_dbErrorWhenRequestingProductById", err);
  }
};

module.exports = getProductById;
