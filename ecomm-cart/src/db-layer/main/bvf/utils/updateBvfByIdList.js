const { HttpServerError } = require("common");

const { Bvf } = require("models");
const { Op } = require("sequelize");

const updateBvfByIdList = async (idList, dataClause) => {
  try {
    let rowsCount = null;
    let rows = null;

    const options = {
      where: { id: { [Op.in]: idList }, isActive: true },
      returning: true,
    };

    [rowsCount, rows] = await Bvf.update(dataClause, options);
    const bvfIdList = rows.map((item) => item.id);
    return bvfIdList;
  } catch (err) {
    //**errorLog
    throw new HttpServerError("errMsg_dbErrorWhenUpdatingBvfByIdList", err);
  }
};

module.exports = updateBvfByIdList;
