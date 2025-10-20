const { HttpServerError, HttpError, PaymentGateError } = require("common");
const { hexaLogger } = require("common");
const { ElasticIndexer } = require("serviceCommon");

const NotificationPreferencesServiceManager = require("../../service-manager/NotificationPreferencesServiceManager");

/* Base Class For the Crud Routes Of DbObject AdminNotificationConfig */
class AdminNotificationConfigManager extends NotificationPreferencesServiceManager {
  constructor(request, options) {
    super(request, options);
    this.objectName = "adminNotificationConfig";
    this.modelName = "AdminNotificationConfig";
  }

  toJSON() {
    const jsonObj = super.toJSON();

    return jsonObj;
  }
}

module.exports = AdminNotificationConfigManager;
