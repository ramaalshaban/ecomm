const { HttpServerError, NotFoundError, BadRequestError } = require("common");

const { UserNotificationPreferences } = require("models");
const { Op } = require("sequelize");

const getIdListOfUserNotificationPreferencesByField = async (
  fieldName,
  fieldValue,
  isArray,
) => {
  try {
    const options = {
      where: { isActive: true },
      attributes: ["id"],
    };
    if (fieldName) {
      options.where = isArray
        ? { [fieldName]: { [Op.contains]: [fieldValue] }, isActive: true }
        : { [fieldName]: fieldValue, isActive: true };
    }

    let userNotificationPreferencesIdList =
      await UserNotificationPreferences.findAll(options);

    if (!userNotificationPreferencesIdList) {
      throw new NotFoundError(
        `UserNotificationPreferences with the specified criteria not found`,
      );
    }

    userNotificationPreferencesIdList = userNotificationPreferencesIdList.map(
      (item) => item.id,
    );
    return userNotificationPreferencesIdList;
  } catch (err) {
    //**errorLog
    throw new HttpServerError(
      "errMsg_dbErrorWhenRequestingUserNotificationPreferencesIdListByField",
      err,
    );
  }
};

module.exports = getIdListOfUserNotificationPreferencesByField;
