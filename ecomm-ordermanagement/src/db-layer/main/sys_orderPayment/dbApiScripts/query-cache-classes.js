const { QueryCache, QueryCacheInvalidator } = require("common");

const { Op } = require("sequelize");

class Sys_orderPaymentQueryCache extends QueryCache {
  constructor(input, wClause) {
    super("sys_orderPayment", [], Op.and, Op.eq, input, wClause);
  }
}

class Sys_orderPaymentQueryCacheInvalidator extends QueryCacheInvalidator {
  constructor() {
    super("sys_orderPayment", []);
  }
}

module.exports = {
  Sys_orderPaymentQueryCache,
  Sys_orderPaymentQueryCacheInvalidator,
};
