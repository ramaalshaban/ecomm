const { DeleteUserNotificationPreferencesManager } = require("apiLayer");

const NotificationPreferencesRestController = require("../../NotificationPreferencesServiceRestController");

class DeleteUserNotificationPreferencesRestController extends NotificationPreferencesRestController {
  constructor(req, res) {
    super(
      "deleteUserNotificationPreferences",
      "deleteusernotificationpreferences",
      req,
      res,
    );
    this.dataName = "userNotificationPreferences";
    this.crudType = "delete";
    this.status = 200;
    this.httpMethod = "DELETE";
  }

  createApiManager() {
    return new DeleteUserNotificationPreferencesManager(this._req, "rest");
  }
}

const deleteUserNotificationPreferences = async (req, res, next) => {
  const controller = new DeleteUserNotificationPreferencesRestController(
    req,
    res,
  );
  try {
    await controller.processRequest();
  } catch (err) {
    return next(err);
  }
};

module.exports = deleteUserNotificationPreferences;
