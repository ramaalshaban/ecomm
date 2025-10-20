const { HttpServerError } = require("common");

const { SalesReport } = require("models");
const { Op } = require("sequelize");

const updateSalesReportByIdList = async (idList, dataClause) => {
  try {
    let rowsCount = null;
    let rows = null;

    const options = { where: { id: { [Op.in]: idList } }, returning: true };

    [rowsCount, rows] = await SalesReport.update(dataClause, options);
    const salesReportIdList = rows.map((item) => item.id);
    return salesReportIdList;
  } catch (err) {
    //**errorLog
    throw new HttpServerError(
      "errMsg_dbErrorWhenUpdatingSalesReportByIdList",
      err,
    );
  }
};

module.exports = updateSalesReportByIdList;
