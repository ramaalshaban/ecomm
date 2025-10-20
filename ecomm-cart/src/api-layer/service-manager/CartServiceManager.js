const ApiManager = require("./ApiManager");

const { md5 } = require("common");

class CartServiceManager extends ApiManager {
  constructor(request, options) {
    super(request, options);
    this.serviceCodename = "ecomm-cart-service";
    this.membershipCache = new Map();
  }

  parametersToJson(jsonObj) {
    super.parametersToJson(jsonObj);
  }
}

module.exports = CartServiceManager;
