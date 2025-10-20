const { HttpServerError } = require("common");

const { AdminNotificationConfig } = require("models");
const { Op } = require("sequelize");

const updateAdminNotificationConfigByIdList = async (idList, dataClause) => {
  try {
    let rowsCount = null;
    let rows = null;

    const options = {
      where: { id: { [Op.in]: idList }, isActive: true },
      returning: true,
    };

    [rowsCount, rows] = await AdminNotificationConfig.update(
      dataClause,
      options,
    );
    const adminNotificationConfigIdList = rows.map((item) => item.id);
    return adminNotificationConfigIdList;
  } catch (err) {
    //**errorLog
    throw new HttpServerError(
      "errMsg_dbErrorWhenUpdatingAdminNotificationConfigByIdList",
      err,
    );
  }
};

module.exports = updateAdminNotificationConfigByIdList;
