const ApiManager = require("./ApiManager");

const { md5 } = require("common");

class ProductCatalogServiceManager extends ApiManager {
  constructor(request, options) {
    super(request, options);
    this.serviceCodename = "ecomm-productcatalog-service";
    this.membershipCache = new Map();
  }

  parametersToJson(jsonObj) {
    super.parametersToJson(jsonObj);
  }
}

module.exports = ProductCatalogServiceManager;
