const { HttpServerError } = require("common");

const { Ko } = require("models");
const { Op } = require("sequelize");

const updateKoByIdList = async (idList, dataClause) => {
  try {
    let rowsCount = null;
    let rows = null;

    const options = {
      where: { id: { [Op.in]: idList }, isActive: true },
      returning: true,
    };

    [rowsCount, rows] = await Ko.update(dataClause, options);
    const koIdList = rows.map((item) => item.id);
    return koIdList;
  } catch (err) {
    //**errorLog
    throw new HttpServerError("errMsg_dbErrorWhenUpdatingKoByIdList", err);
  }
};

module.exports = updateKoByIdList;
