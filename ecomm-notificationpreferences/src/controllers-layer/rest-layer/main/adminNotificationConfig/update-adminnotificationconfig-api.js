const { UpdateAdminNotificationConfigManager } = require("apiLayer");

const NotificationPreferencesRestController = require("../../NotificationPreferencesServiceRestController");

class UpdateAdminNotificationConfigRestController extends NotificationPreferencesRestController {
  constructor(req, res) {
    super(
      "updateAdminNotificationConfig",
      "updateadminnotificationconfig",
      req,
      res,
    );
    this.dataName = "adminNotificationConfig";
    this.crudType = "update";
    this.status = 200;
    this.httpMethod = "PATCH";
  }

  createApiManager() {
    return new UpdateAdminNotificationConfigManager(this._req, "rest");
  }
}

const updateAdminNotificationConfig = async (req, res, next) => {
  const controller = new UpdateAdminNotificationConfigRestController(req, res);
  try {
    await controller.processRequest();
  } catch (err) {
    return next(err);
  }
};

module.exports = updateAdminNotificationConfig;
