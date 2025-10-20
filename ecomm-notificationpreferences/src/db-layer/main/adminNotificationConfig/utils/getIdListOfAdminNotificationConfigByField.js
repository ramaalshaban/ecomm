const { HttpServerError, NotFoundError, BadRequestError } = require("common");

const { AdminNotificationConfig } = require("models");
const { Op } = require("sequelize");

const getIdListOfAdminNotificationConfigByField = async (
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

    let adminNotificationConfigIdList =
      await AdminNotificationConfig.findAll(options);

    if (!adminNotificationConfigIdList) {
      throw new NotFoundError(
        `AdminNotificationConfig with the specified criteria not found`,
      );
    }

    adminNotificationConfigIdList = adminNotificationConfigIdList.map(
      (item) => item.id,
    );
    return adminNotificationConfigIdList;
  } catch (err) {
    //**errorLog
    throw new HttpServerError(
      "errMsg_dbErrorWhenRequestingAdminNotificationConfigIdListByField",
      err,
    );
  }
};

module.exports = getIdListOfAdminNotificationConfigByField;
