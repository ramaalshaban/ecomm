const { CreateAdminNotificationConfigManager } = require("apiLayer");

const NotificationPreferencesRestController = require("../../NotificationPreferencesServiceRestController");

class CreateAdminNotificationConfigRestController extends NotificationPreferencesRestController {
  constructor(req, res) {
    super(
      "createAdminNotificationConfig",
      "createadminnotificationconfig",
      req,
      res,
    );
    this.dataName = "adminNotificationConfig";
    this.crudType = "create";
    this.status = 201;
    this.httpMethod = "POST";
  }

  createApiManager() {
    return new CreateAdminNotificationConfigManager(this._req, "rest");
  }
}

const createAdminNotificationConfig = async (req, res, next) => {
  const controller = new CreateAdminNotificationConfigRestController(req, res);
  try {
    await controller.processRequest();
  } catch (err) {
    return next(err);
  }
};

module.exports = createAdminNotificationConfig;
