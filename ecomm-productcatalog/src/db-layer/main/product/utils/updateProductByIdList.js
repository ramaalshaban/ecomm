const { HttpServerError } = require("common");

const { Product } = require("models");
const { Op } = require("sequelize");

const updateProductByIdList = async (idList, dataClause) => {
  try {
    let rowsCount = null;
    let rows = null;

    const options = { where: { id: { [Op.in]: idList } }, returning: true };

    [rowsCount, rows] = await Product.update(dataClause, options);
    const productIdList = rows.map((item) => item.id);
    return productIdList;
  } catch (err) {
    //**errorLog
    throw new HttpServerError("errMsg_dbErrorWhenUpdatingProductByIdList", err);
  }
};

module.exports = updateProductByIdList;
