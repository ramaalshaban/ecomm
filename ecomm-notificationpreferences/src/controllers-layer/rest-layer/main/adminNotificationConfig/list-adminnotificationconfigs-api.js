const { ListAdminNotificationConfigsManager } = require("apiLayer");

const NotificationPreferencesRestController = require("../../NotificationPreferencesServiceRestController");

class ListAdminNotificationConfigsRestController extends NotificationPreferencesRestController {
  constructor(req, res) {
    super(
      "listAdminNotificationConfigs",
      "listadminnotificationconfigs",
      req,
      res,
    );
    this.dataName = "adminNotificationConfigs";
    this.crudType = "list";
    this.status = 200;
    this.httpMethod = "GET";
  }

  createApiManager() {
    return new ListAdminNotificationConfigsManager(this._req, "rest");
  }
}

const listAdminNotificationConfigs = async (req, res, next) => {
  const controller = new ListAdminNotificationConfigsRestController(req, res);
  try {
    await controller.processRequest();
  } catch (err) {
    return next(err);
  }
};

module.exports = listAdminNotificationConfigs;
