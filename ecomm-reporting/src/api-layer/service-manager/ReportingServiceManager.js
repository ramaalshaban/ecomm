const ApiManager = require("./ApiManager");

const { md5 } = require("common");

class ReportingServiceManager extends ApiManager {
  constructor(request, options) {
    super(request, options);
    this.serviceCodename = "ecomm-reporting-service";
    this.membershipCache = new Map();
  }

  parametersToJson(jsonObj) {
    super.parametersToJson(jsonObj);
  }
}

module.exports = ReportingServiceManager;
