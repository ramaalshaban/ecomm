const { HttpServerError, NotFoundError } = require("common");
const { hexaLogger } = require("common");

const {
  UserNotificationPreferences,
  AdminNotificationConfig,
} = require("models");
const { Op } = require("sequelize");

const getAdminNotificationConfigAggById = async (adminNotificationConfigId) => {
  try {
    const forWhereClause = false;
    const includes = [];

    const adminNotificationConfig = Array.isArray(adminNotificationConfigId)
      ? await AdminNotificationConfig.findAll({
          where: {
            id: { [Op.in]: adminNotificationConfigId },
            isActive: true,
          },
          include: includes,
        })
      : await AdminNotificationConfig.findOne({
          where: {
            id: adminNotificationConfigId,
            isActive: true,
          },
          include: includes,
        });

    if (!adminNotificationConfig) {
      return null;
    }

    const adminNotificationConfigData =
      Array.isArray(adminNotificationConfigId) &&
      adminNotificationConfigId.length > 0
        ? adminNotificationConfig.map((item) => item.getData())
        : adminNotificationConfig.getData();
    await AdminNotificationConfig.getCqrsJoins(adminNotificationConfigData);
    return adminNotificationConfigData;
  } catch (err) {
    //**errorLog
    throw new HttpServerError(
      "errMsg_dbErrorWhenRequestingAdminNotificationConfigAggById",
      err,
    );
  }
};

module.exports = getAdminNotificationConfigAggById;
