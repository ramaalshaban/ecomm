const { HttpServerError, HttpError, PaymentGateError } = require("common");
const { hexaLogger } = require("common");
const { ElasticIndexer } = require("serviceCommon");

const NotificationPreferencesServiceManager = require("../../service-manager/NotificationPreferencesServiceManager");

/* Base Class For the Crud Routes Of DbObject UserNotificationPreferences */
class UserNotificationPreferencesManager extends NotificationPreferencesServiceManager {
  constructor(request, options) {
    super(request, options);
    this.objectName = "userNotificationPreferences";
    this.modelName = "UserNotificationPreferences";
  }

  toJSON() {
    const jsonObj = super.toJSON();

    return jsonObj;
  }
}

module.exports = UserNotificationPreferencesManager;
