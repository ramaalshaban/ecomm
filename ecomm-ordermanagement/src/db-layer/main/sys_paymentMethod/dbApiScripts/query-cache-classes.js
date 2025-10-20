const { QueryCache, QueryCacheInvalidator } = require("common");

const { Op } = require("sequelize");

class Sys_paymentMethodQueryCache extends QueryCache {
  constructor(input, wClause) {
    super("sys_paymentMethod", [], Op.and, Op.eq, input, wClause);
  }
}

class Sys_paymentMethodQueryCacheInvalidator extends QueryCacheInvalidator {
  constructor() {
    super("sys_paymentMethod", []);
  }
}

module.exports = {
  Sys_paymentMethodQueryCache,
  Sys_paymentMethodQueryCacheInvalidator,
};
