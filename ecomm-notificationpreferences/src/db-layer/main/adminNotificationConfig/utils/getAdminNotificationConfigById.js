const { HttpServerError } = require("common");

let { AdminNotificationConfig } = require("models");
const { hexaLogger } = require("common");
const { Op } = require("sequelize");

const getAdminNotificationConfigById = async (adminNotificationConfigId) => {
  try {
    const adminNotificationConfig = Array.isArray(adminNotificationConfigId)
      ? await AdminNotificationConfig.findAll({
          where: {
            id: { [Op.in]: adminNotificationConfigId },
            isActive: true,
          },
        })
      : await AdminNotificationConfig.findOne({
          where: {
            id: adminNotificationConfigId,
            isActive: true,
          },
        });

    if (!adminNotificationConfig) {
      return null;
    }
    return Array.isArray(adminNotificationConfigId)
      ? adminNotificationConfig.map((item) => item.getData())
      : adminNotificationConfig.getData();
  } catch (err) {
    console.log(err);
    //**errorLog
    throw new HttpServerError(
      "errMsg_dbErrorWhenRequestingAdminNotificationConfigById",
      err,
    );
  }
};

module.exports = getAdminNotificationConfigById;
