const ApiManager = require("./ApiManager");

const { md5 } = require("common");

class OrderManagementServiceManager extends ApiManager {
  constructor(request, options) {
    super(request, options);
    this.serviceCodename = "ecomm-ordermanagement-service";
    this.membershipCache = new Map();
  }

  parametersToJson(jsonObj) {
    super.parametersToJson(jsonObj);
  }
}

module.exports = OrderManagementServiceManager;
