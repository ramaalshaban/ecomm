const { UpdateUserNotificationPreferencesManager } = require("apiLayer");

const NotificationPreferencesRestController = require("../../NotificationPreferencesServiceRestController");

class UpdateUserNotificationPreferencesRestController extends NotificationPreferencesRestController {
  constructor(req, res) {
    super(
      "updateUserNotificationPreferences",
      "updateusernotificationpreferences",
      req,
      res,
    );
    this.dataName = "userNotificationPreferences";
    this.crudType = "update";
    this.status = 200;
    this.httpMethod = "PATCH";
  }

  createApiManager() {
    return new UpdateUserNotificationPreferencesManager(this._req, "rest");
  }
}

const updateUserNotificationPreferences = async (req, res, next) => {
  const controller = new UpdateUserNotificationPreferencesRestController(
    req,
    res,
  );
  try {
    await controller.processRequest();
  } catch (err) {
    return next(err);
  }
};

module.exports = updateUserNotificationPreferences;
