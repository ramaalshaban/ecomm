const ApiManager = require("./ApiManager");

const { md5 } = require("common");

class NotificationPreferencesServiceManager extends ApiManager {
  constructor(request, options) {
    super(request, options);
    this.serviceCodename = "ecomm-notificationpreferences-service";
    this.membershipCache = new Map();
  }

  parametersToJson(jsonObj) {
    super.parametersToJson(jsonObj);
  }
}

module.exports = NotificationPreferencesServiceManager;
