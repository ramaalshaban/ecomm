const { HttpServerError } = require("common");

const { ExportJob } = require("models");
const { Op } = require("sequelize");

const updateExportJobByIdList = async (idList, dataClause) => {
  try {
    let rowsCount = null;
    let rows = null;

    const options = {
      where: { id: { [Op.in]: idList }, isActive: true },
      returning: true,
    };

    [rowsCount, rows] = await ExportJob.update(dataClause, options);
    const exportJobIdList = rows.map((item) => item.id);
    return exportJobIdList;
  } catch (err) {
    //**errorLog
    throw new HttpServerError(
      "errMsg_dbErrorWhenUpdatingExportJobByIdList",
      err,
    );
  }
};

module.exports = updateExportJobByIdList;
