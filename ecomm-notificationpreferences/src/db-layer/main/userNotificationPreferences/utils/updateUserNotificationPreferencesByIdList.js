const { HttpServerError } = require("common");

const { UserNotificationPreferences } = require("models");
const { Op } = require("sequelize");

const updateUserNotificationPreferencesByIdList = async (
  idList,
  dataClause,
) => {
  try {
    let rowsCount = null;
    let rows = null;

    const options = {
      where: { id: { [Op.in]: idList }, isActive: true },
      returning: true,
    };

    [rowsCount, rows] = await UserNotificationPreferences.update(
      dataClause,
      options,
    );
    const userNotificationPreferencesIdList = rows.map((item) => item.id);
    return userNotificationPreferencesIdList;
  } catch (err) {
    //**errorLog
    throw new HttpServerError(
      "errMsg_dbErrorWhenUpdatingUserNotificationPreferencesByIdList",
      err,
    );
  }
};

module.exports = updateUserNotificationPreferencesByIdList;
