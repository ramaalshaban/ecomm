const { QueryCache, QueryCacheInvalidator } = require("common");

const { Op } = require("sequelize");

class Sys_paymentCustomerQueryCache extends QueryCache {
  constructor(input, wClause) {
    super("sys_paymentCustomer", [], Op.and, Op.eq, input, wClause);
  }
}

class Sys_paymentCustomerQueryCacheInvalidator extends QueryCacheInvalidator {
  constructor() {
    super("sys_paymentCustomer", []);
  }
}

module.exports = {
  Sys_paymentCustomerQueryCache,
  Sys_paymentCustomerQueryCacheInvalidator,
};
